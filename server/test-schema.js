import { db } from './db.ts';

async function testSchema() {
  try {
    console.log('🧪 Testing database schema...');
    
    // Test if we can connect to the database
    console.log('📡 Testing database connection...');
    const result = await db.execute('SELECT NOW() as current_time');
    console.log('✅ Database connection successful:', result.rows[0]);
    
    // Test users table structure
    console.log('\n📊 Checking users table structure...');
    const userColumns = await db.execute(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    console.log('Users table columns:', userColumns.rows);
    
    // Check if new columns exist
    const hasMobile = userColumns.rows.some(col => col.column_name === 'mobile');
    const hasIsGuest = userColumns.rows.some(col => col.column_name === 'is_guest');
    const hasGuestExpiresAt = userColumns.rows.some(col => col.column_name === 'guest_expires_at');
    
    console.log('\n🔍 Schema check results:');
    console.log('Has mobile column:', hasMobile);
    console.log('Has is_guest column:', hasIsGuest);
    console.log('Has guest_expires_at column:', hasGuestExpiresAt);
    
    // Test guest_sessions table
    console.log('\n📊 Checking guest_sessions table...');
    try {
      const guestSessionsColumns = await db.execute(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'guest_sessions' 
        ORDER BY ordinal_position
      `);
      console.log('Guest sessions table columns:', guestSessionsColumns.rows);
      
      if (guestSessionsColumns.rows.length > 0) {
        console.log('✅ Guest sessions table exists');
      } else {
        console.log('❌ Guest sessions table not found');
      }
    } catch (error) {
      console.log('❌ Guest sessions table does not exist yet');
    }
    
    console.log('\n✅ Schema test completed!');
    
  } catch (error) {
    console.error('❌ Schema test failed:', error);
  }
}

testSchema(); 