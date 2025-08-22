-- Migration: Update authentication schema for guest mode support
-- Date: 2025-07-30

-- Step 1: Add new columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS mobile VARCHAR(20) UNIQUE,
ADD COLUMN IF NOT EXISTS grade VARCHAR(10),
ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS guest_expires_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Step 2: Update existing users to have proper email field
-- (assuming username was used as email before)
UPDATE users 
SET email = username 
WHERE email IS NULL AND username IS NOT NULL;

-- Step 3: Make password optional for guest accounts
ALTER TABLE users 
ALTER COLUMN password DROP NOT NULL;

-- Step 4: Create guest_sessions table
CREATE TABLE IF NOT EXISTS guest_sessions (
  id SERIAL PRIMARY KEY,
  session_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Step 5: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_users_is_guest ON users(is_guest);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_token ON guest_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_guest_sessions_expires ON guest_sessions(expires_at);

-- Step 6: Add comments for documentation
COMMENT ON COLUMN users.mobile IS 'Mobile phone number for authentication';
COMMENT ON COLUMN users.grade IS 'Student grade level';
COMMENT ON COLUMN users.is_guest IS 'Whether this is a guest account';
COMMENT ON COLUMN users.guest_expires_at IS 'Expiration time for guest accounts';
COMMENT ON COLUMN users.last_login IS 'Last login timestamp';
COMMENT ON COLUMN users.updated_at IS 'Last update timestamp';

COMMENT ON TABLE guest_sessions IS 'Anonymous session tracking for guest users';
COMMENT ON COLUMN guest_sessions.session_token IS 'JWT token for guest session';
COMMENT ON COLUMN guest_sessions.expires_at IS 'Session expiration time';
COMMENT ON COLUMN guest_sessions.ip_address IS 'IP address for session tracking';
COMMENT ON COLUMN guest_sessions.user_agent IS 'Browser user agent for session tracking'; 