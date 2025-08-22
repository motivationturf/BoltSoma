import { db } from './db.ts';

async function migrateDatabase() {
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
    } catch (error) {
      console.log('⚠️ Some columns may already exist:', error.message);
    }
    
    // Step 2: Make password optional for guest accounts
    try {
      await db.execute(`
        ALTER TABLE users 
        ALTER COLUMN password DROP NOT NULL
      `);
      console.log('✅ Password column made optional');
    } catch (error) {
      console.log('⚠️ Password column may already be optional:', error.message);
    }
    
    // Step 3: Create guest_sessions table
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
    } catch (error) {
      console.log('⚠️ Guest sessions table may already exist:', error.message);
    }
    
    // Step 4: Create indexes
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
    } catch (error) {
      console.log('⚠️ Some indexes may already exist:', error.message);
    }
    
    // Step 5: Test the schema
    console.log('🧪 Testing updated schema...');
    
    const userColumns = await db.execute(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    console.log('📊 Users table columns:');
    userColumns.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });
    
    // Check for guest_sessions table
    try {
      const guestSessionsColumns = await db.execute(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'guest_sessions' 
        ORDER BY ordinal_position
      `);
      
      console.log('📊 Guest sessions table columns:');
      guestSessionsColumns.rows.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
      });
    } catch (error) {
      console.log('❌ Guest sessions table not found');
    }
    
    console.log('\n🎉 Database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateDatabase(); 