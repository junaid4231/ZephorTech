/**
 * Test database connection script
 * Run: pnpm ts-node scripts/test-db-connection.ts
 */

import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

async function testConnection() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.DATABASE_SSL === 'true' ? {
      rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
    } : false,
  });

  try {
    console.log('🔌 Attempting to connect to database...');
    console.log(`   Host: ${process.env.DATABASE_HOST}`);
    console.log(`   Port: ${process.env.DATABASE_PORT}`);
    console.log(`   Database: ${process.env.DATABASE_NAME}`);
    
    await client.connect();
    console.log('✅ Successfully connected to database!');
    
    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL version:', result.rows[0].version);
    
    await client.end();
    console.log('✅ Connection test passed!');
  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Verify your Supabase project is active (not paused)');
    console.error('   2. Check the connection string in Supabase dashboard');
    console.error('   3. Verify network/firewall allows connections to Supabase');
    console.error('   4. Ensure DATABASE_HOST is correct in .env file');
    process.exit(1);
  }
}

testConnection();

