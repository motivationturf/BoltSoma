import { z } from 'zod';

// User registration schema
export const registerSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number format').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  firstName: z.string().min(1, 'First name is required').max(100, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name too long'),
  grade: z.string().optional(),
  avatar: z.string().optional(),
}).refine((data) => {
  // Either email or mobile must be provided for non-guest accounts
  return (data.email || data.mobile) && data.password;
}, {
  message: 'Email or mobile and password are required for registration',
  path: ['email']
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number format').optional(),
  password: z.string().min(1, 'Password is required'),
}).refine((data) => {
  // Either email or mobile must be provided
  return data.email || data.mobile;
}, {
  message: 'Email or mobile is required',
  path: ['email']
});

// Guest session creation schema
export const guestSessionSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name too long'),
  grade: z.string().optional(),
});

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name too long').optional(),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name too long').optional(),
  grade: z.string().optional(),
  avatar: z.string().optional(),
});

// Guest upgrade schema
export const guestUpgradeSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number format').optional(),
});

// Response types
export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type GuestSessionRequest = z.infer<typeof guestSessionSchema>;
export type ProfileUpdateRequest = z.infer<typeof profileUpdateSchema>;
export type GuestUpgradeRequest = z.infer<typeof guestUpgradeSchema>; 