#!/usr/bin/env node
/**
 * Generate a secure random API key for newsletter admin
 * Usage: node scripts/generate-admin-key.js
 */

const crypto = require('crypto');

// Generate 32 bytes (64 hex characters) - cryptographically secure
const apiKey = crypto.randomBytes(32).toString('hex');

console.log('\n✅ Generated secure admin API key:\n');
console.log(`NEWSLETTER_ADMIN_API_KEY=${apiKey}\n`);
console.log('📋 Copy this to your .env.local file\n');
console.log('⚠️  Keep this key secret and never commit it to git!\n');

