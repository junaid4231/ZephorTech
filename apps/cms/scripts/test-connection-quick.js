/**
 * Quick connection test
 * Run: node scripts/test-connection-quick.js
 */

const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

const client = new Client({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  ssl: process.env.DATABASE_SSL === 'true' ? {
    rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
  } : false,
});

console.log('🔌 Testing connection...');
console.log('Connection String:', process.env.DATABASE_URL ? 'Using DATABASE_URL' : 'Using individual params');
console.log('Host:', process.env.DATABASE_HOST);
console.log('User:', process.env.DATABASE_USERNAME);
console.log('Password length:', process.env.DATABASE_PASSWORD?.length || 0);

client.connect()
  .then(() => {
    console.log('✅ Connection successful!');
    return client.query('SELECT current_user, version()');
  })
  .then((result) => {
    console.log('Current user:', result.rows[0].current_user);
    console.log('PostgreSQL version:', result.rows[0].version);
    client.end();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection failed:', error.message);
    console.error('\n💡 Please verify:');
    console.error('   1. Password is correct in Supabase dashboard');
    console.error('   2. Username matches: postgres.oszteplnclhzwmbaznjf');
    console.error('   3. Database is accessible');
    process.exit(1);
  });

