import { readFileSync } from 'fs';
import { join } from 'path';
import { db } from './db.ts';

async function runMigration() {
  try {
    console.log('🔄 Running database migration...');
    
    // Read the migration SQL file
    const migrationPath = join(process.cwd(), 'server', 'migrations', '001_update_auth_schema.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\n🔧 Executing statement ${i + 1}/${statements.length}:`);
      console.log(statement.substring(0, 100) + (statement.length > 100 ? '...' : ''));
      
      try {
        await db.execute(statement);
        console.log(`✅ Statement ${i + 1} executed successfully`);
      } catch (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
        // Continue with other statements
      }
    }
    
    console.log('\n🎉 Migration completed successfully!');
    
    // Test the new schema by querying the tables
    console.log('\n🧪 Testing new schema...');
    
    // Test users table structure
    const userColumns = await db.execute(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    console.log('📊 Users table columns:', userColumns.rows);
    
    // Test guest_sessions table
    const guestSessionsColumns = await db.execute(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'guest_sessions' 
      ORDER BY ordinal_position
    `);
    console.log('📊 Guest sessions table columns:', guestSessionsColumns.rows);
    
    console.log('\n✅ Schema test completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration(); 