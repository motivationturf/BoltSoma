import express from 'express';
import { db } from './db';
import { users, guestSessions } from '../shared/schema';
import { eq, and, or } from 'drizzle-orm';
import { 
  authenticateToken, 
  hashPassword, 
  comparePassword, 
  generateToken, 
  generateGuestToken,
  createGuestSession,
  cleanupExpiredGuestSessions,
  createRateLimiter
} from './auth-utils';
import { 
  registerSchema, 
  loginSchema, 
  guestSessionSchema,
  profileUpdateSchema,
  guestUpgradeSchema
} from './auth-schemas';

const router = express.Router();

// Rate limiters
const loginRateLimiter = createRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
const registerRateLimiter = createRateLimiter(3, 60 * 60 * 1000); // 3 attempts per hour

  // Health check endpoint
router.get('/health', async (req, res) => {
    try {
    const result = await db.execute('SELECT NOW() as current_time');
      res.json({ 
      status: 'healthy',
      database: 'connected',
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      res.status(500).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error?.message
      });
    }
  });

  // Authentication routes
router.post('/auth/register', async (req, res) => {
  try {
    // Rate limiting
    const clientIP = (req.ip || (req.connection as any)?.remoteAddress || 'unknown') as string;
    if (!registerRateLimiter(clientIP)) {
      return res.status(429).json({
        success: false,
        error: 'Too many registration attempts. Please try again later.'
      });
    }

    // Validate input
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      });
    }

    const { email, mobile, password, firstName, lastName, grade, avatar } = validation.data;

    // Check if user already exists
    const existingUser = await db.select().from(users).where(
      or(
        email ? eq(users.email, email) : undefined,
        mobile ? eq(users.mobile, mobile) : undefined
      )
    ).limit(1);

      if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'User already exists with this email or mobile number'
      });
      }

      // Hash password
    const hashedPassword = await hashPassword(password as string);
      
    // Create user
      const newUser = await db.insert(users).values({
      email,
      mobile,
      password: hashedPassword,
      firstName,
      lastName,
      grade,
      avatar,
      isGuest: false,
      }).returning();

      const user = newUser[0];

    // Generate token
    const token = generateToken({
      userId: user.id,
      isGuest: false,
      email: user.email ?? undefined,
      mobile: user.mobile ?? undefined
    });

    res.status(201).json({
        success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        grade: user.grade,
        avatar: user.avatar,
        isGuest: user.isGuest,
        createdAt: (user.createdAt instanceof Date ? user.createdAt : new Date()).toISOString(),
      }
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed'
    });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    // Rate limiting
    const clientIP = (req.ip || (req.connection as any)?.remoteAddress || 'unknown') as string;
    if (!loginRateLimiter(clientIP)) {
      return res.status(429).json({
        success: false,
        error: 'Too many login attempts. Please try again later.'
      });
    }

    // Validate input
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      });
    }

    const { email, mobile, password } = validation.data;

    // Find user
    const user = await db.select().from(users).where(
      or(
        email ? eq(users.email, email) : undefined,
        mobile ? eq(users.mobile, mobile) : undefined
      )
    ).limit(1);

    if (user.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const userData = user[0];

    // Check password
    const isValidPassword = await comparePassword(password as string, userData.password as string);
      if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    await db.update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, userData.id));

    // Generate token
    const token = generateToken({
      userId: userData.id,
      isGuest: Boolean(userData.isGuest),
      email: userData.email ?? undefined,
      mobile: userData.mobile ?? undefined
    });
      
      res.json({
        success: true,
      token,
      user: {
        id: userData.id,
        email: userData.email,
        mobile: userData.mobile,
        firstName: userData.firstName,
        lastName: userData.lastName,
        grade: userData.grade,
        avatar: userData.avatar,
        isGuest: userData.isGuest,
        createdAt: (userData.createdAt instanceof Date ? userData.createdAt : new Date()).toISOString(),
        lastLogin: userData.lastLogin?.toISOString(),
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

router.post('/auth/guest', async (req, res) => {
  try {
    // Validate input
    const validation = guestSessionSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      });
    }

    const { firstName, lastName, grade } = validation.data;
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Create guest session
    const { user, token } = await createGuestSession(
      firstName,
      lastName,
      grade,
      clientIP,
      userAgent
    );

    res.status(201).json({
      success: true,
      token,
      user
    });

  } catch (error: any) {
    console.error('Guest session creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Guest session creation failed'
    });
  }
});

router.get('/auth/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      user: (req as any).user
    });
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
});

router.put('/auth/profile', authenticateToken, async (req, res) => {
  try {
    // Validate input
    const validation = profileUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      });
    }

    const updateData = validation.data;

    // Update user
    const updatedUser = await db.update(users)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(users.id, (req as any).user!.id))
      .returning();

    const user = updatedUser[0];
      
      res.json({
        success: true,
      user: {
        id: user.id,
        email: user.email,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        grade: user.grade,
        avatar: user.avatar,
        isGuest: user.isGuest,
        createdAt: (user.createdAt instanceof Date ? user.createdAt : new Date()).toISOString(),
        lastLogin: user.lastLogin?.toISOString(),
      }
    });

  } catch (error: any) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Profile update failed'
    });
  }
});

router.post('/auth/guest/upgrade', authenticateToken, async (req, res) => {
  try {
    // Check if user is a guest
    if (!(req as any).user!.isGuest) {
      return res.status(400).json({
        success: false,
        error: 'Only guest users can upgrade their account'
      });
    }

    // Validate input
    const validation = guestUpgradeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: validation.error.errors
      });
    }

    const { email, password, mobile } = validation.data;

    // Check if email/mobile already exists
    const existingUser = await db.select().from(users).where(
      or(
        eq(users.email, email),
        mobile ? eq(users.mobile, mobile) : undefined
      )
    ).limit(1);

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Email or mobile number already exists'
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Upgrade guest to full account
    const upgradedUser = await db.update(users)
      .set({
        email,
        mobile,
        password: hashedPassword,
        isGuest: false,
        guestExpiresAt: null,
        updatedAt: new Date()
      })
      .where(eq(users.id, (req as any).user!.id))
      .returning();

    const user = upgradedUser[0];

    // Generate new token for full account
    const token = generateToken({
      userId: user.id,
      isGuest: false,
      email: user.email ?? undefined,
      mobile: user.mobile ?? undefined
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        mobile: user.mobile,
        firstName: user.firstName,
        lastName: user.lastName,
        grade: user.grade,
        avatar: user.avatar,
        isGuest: user.isGuest,
        createdAt: (user.createdAt instanceof Date ? user.createdAt : new Date()).toISOString(),
        lastLogin: user.lastLogin?.toISOString(),
      }
    });

  } catch (error: any) {
    console.error('Guest upgrade error:', error);
    res.status(500).json({
      success: false,
      error: 'Account upgrade failed'
    });
  }
});

router.post('/auth/logout', authenticateToken, async (req, res) => {
  try {
    // For guest users, clean up their session
    if ((req as any).user!.isGuest) {
      await db.delete(guestSessions)
        .where(eq(guestSessions.sessionToken, req.headers.authorization?.split(' ')[1] || ''));
    }

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    });
  }
});

// Cleanup expired guest sessions (can be called periodically)
router.post('/auth/cleanup', async (req, res) => {
  try {
    await cleanupExpiredGuestSessions();
    res.json({
      success: true,
      message: 'Cleanup completed'
    });
  } catch (error: any) {
    console.error('Cleanup error:', error);
    res.status(500).json({
      success: false,
      error: 'Cleanup failed'
    });
  }
});

// Debug endpoint to check database schema
router.get('/debug/schema', async (req, res) => {
  try {
    console.log('🔍 Checking database schema...');
    
    // Check users table structure
    const userColumns = await db.execute(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    console.log('📊 Users table columns:', userColumns.rows);
    
    // Check guest_sessions table
    let guestSessionsColumns = null;
    try {
      guestSessionsColumns = await db.execute(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'guest_sessions' 
        ORDER BY ordinal_position
      `);
      console.log('📊 Guest sessions table columns:', guestSessionsColumns.rows);
    } catch (error: any) {
      console.log('❌ Guest sessions table not found:', error?.message);
    }
    
    res.json({
      success: true,
      users: userColumns.rows,
      guestSessions: guestSessionsColumns?.rows || []
    });
    
  } catch (error: any) {
    console.error('❌ Schema check failed:', error);
    res.status(500).json({
      success: false,
      error: 'Schema check failed',
      details: error?.message
    });
  }
});

// Migration endpoint (for development only)
router.post('/migrate', async (req, res) => {
  try {
    console.log('🔄 Starting database migration...');
    
    // Step 1: Add new columns to users table
    console.log('📝 Adding new columns to users table...');
    
    try {
      await db.execute(`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS mobile VARCHAR(20) UNIQUE,
        ADD COLUMN IF NOT EXISTS grade VARCHAR(10),
        ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS guest_expires_at TIMESTAMP,
        ADD COLUMN IF NOT EXISTS last_login TIMESTAMP,
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW()
      `);
      console.log('✅ Users table columns added successfully');
    } catch (error: any) {
      console.log('⚠️ Some columns may already exist:', error?.message);
    }
    
    // Step 2: Handle username column - make it optional or remove it
    try {
      // First check if username column exists and has data
      const usernameCheck = await db.execute(`
        SELECT column_name, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'username'
      `);
      
      if (usernameCheck.rows.length > 0) {
        // If username column exists, make it nullable
        await db.execute(`
          ALTER TABLE users 
          ALTER COLUMN username DROP NOT NULL
        `);
        console.log('✅ Username column made optional');
      }
    } catch (error: any) {
      console.log('⚠️ Username column may already be optional:', error?.message);
    }
    
    // Step 3: Make password optional for guest accounts
    try {
      await db.execute(`
        ALTER TABLE users 
        ALTER COLUMN password DROP NOT NULL
      `);
      console.log('✅ Password column made optional');
    } catch (error: any) {
      console.log('⚠️ Password column may already be optional:', error?.message);
    }
    
    // Step 4: Create guest_sessions table
    console.log('📝 Creating guest_sessions table...');
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS guest_sessions (
          id SERIAL PRIMARY KEY,
          session_token TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT NOW(),
          expires_at TIMESTAMP NOT NULL,
          ip_address VARCHAR(45),
          user_agent TEXT
        )
      `);
      console.log('✅ Guest sessions table created successfully');
    } catch (error: any) {
      console.log('⚠️ Guest sessions table may already exist:', error?.message);
    }
    
    // Step 5: Create indexes
    console.log('📝 Creating indexes...');
    try {
      await db.execute(`
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
        CREATE INDEX IF NOT EXISTS idx_users_is_guest ON users(is_guest);
        CREATE INDEX IF NOT EXISTS idx_guest_sessions_token ON guest_sessions(session_token);
        CREATE INDEX IF NOT EXISTS idx_guest_sessions_expires ON guest_sessions(expires_at)
      `);
      console.log('✅ Indexes created successfully');
    } catch (error: any) {
      console.log('⚠️ Some indexes may already exist:', error?.message);
    }
    
    res.json({
      success: true,
      message: 'Database migration completed successfully'
    });
    
  } catch (error: any) {
    console.error('❌ Migration failed:', error);
    res.status(500).json({
      success: false,
      error: 'Migration failed',
      details: error?.message
    });
  }
});

export default router;
