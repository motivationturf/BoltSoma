import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { users, guestSessions } from '../shared/schema';
import { eq, and, lt } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';
const GUEST_TOKEN_EXPIRES_IN = '24h';

export interface JWTPayload {
  userId: number;
  isGuest: boolean;
  email?: string;
  mobile?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email?: string;
    mobile?: string;
    firstName: string;
    lastName: string;
    grade?: string;
    avatar?: string;
    isGuest: boolean;
    createdAt: string;
    lastLogin?: string;
  };
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT token generation
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function generateGuestToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: GUEST_TOKEN_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Authentication middleware
export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, error: 'Access token required' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
    return;
  }

  try {
    // Get user from database
    const user = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    
    if (user.length === 0) {
      res.status(401).json({ success: false, error: 'User not found' });
      return;
    }

    const userData = user[0];
    
    // Check if guest session has expired
    if (userData.isGuest && userData.guestExpiresAt && new Date() > userData.guestExpiresAt) {
      res.status(401).json({ success: false, error: 'Guest session expired' });
      return;
    }

    const createdAt = userData.createdAt instanceof Date ? userData.createdAt : new Date();
    const lastLogin = userData.lastLogin instanceof Date ? userData.lastLogin : undefined;

    req.user = {
      id: userData.id,
      email: userData.email ?? undefined,
      mobile: userData.mobile ?? undefined,
      firstName: userData.firstName,
      lastName: userData.lastName,
      grade: userData.grade ?? undefined,
      avatar: userData.avatar ?? undefined,
      isGuest: Boolean(userData.isGuest),
      createdAt: createdAt?.toISOString?.() ?? new Date().toISOString(),
      lastLogin: lastLogin ? lastLogin.toISOString() : undefined,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
}

// Guest session management
export async function createGuestSession(
  firstName: string,
  lastName: string,
  grade?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<{ user: any; token: string }> {
  // Create guest user
  const guestUser = await db.insert(users).values({
    firstName,
    lastName,
    grade,
    isGuest: true,
    guestExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  }).returning();

  const user = guestUser[0];

  // Create guest session
  const sessionToken = generateGuestToken({ userId: user.id, isGuest: true });
  
  await db.insert(guestSessions).values({
    sessionToken,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    ipAddress,
    userAgent,
  });

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      grade: user.grade,
      isGuest: true,
      createdAt: (user.createdAt instanceof Date ? user.createdAt : new Date()).toISOString(),
    },
    token: sessionToken,
  };
}

// Clean up expired guest sessions
export async function cleanupExpiredGuestSessions(): Promise<void> {
  try {
    // Delete expired guest sessions
    await db.delete(guestSessions).where(lt(guestSessions.expiresAt, new Date()));
    
    // Update expired guest users
    await db.update(users)
      .set({ isGuest: false, guestExpiresAt: null })
      .where(and(eq(users.isGuest, true), lt(users.guestExpiresAt!, new Date())));
  } catch (error) {
    console.error('Error cleaning up expired guest sessions:', error);
  }
}

// Rate limiting helper
export function createRateLimiter(maxAttempts: number, windowMs: number) {
  const attempts = new Map<string, { count: number; resetTime: number }>();

  return (identifier: string): boolean => {
    const now = Date.now();
    const record = attempts.get(identifier);

    if (!record || now > record.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  };
} 