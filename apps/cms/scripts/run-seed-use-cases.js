/**
 * Standalone script to run use case seeding
 * Can be run with: node scripts/run-seed-use-cases.js
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 Running use case seeding...\n');

// Set the environment variable and run the seed script via bootstrap
// This requires Strapi to be running
process.env.SEED_USE_CASES = 'true';

console.log('⚠️  Note: This script requires Strapi to be running.');
console.log('💡 Alternative: Add SEED_USE_CASES=true to your .env file and restart Strapi.\n');

// Try to import and run directly if Strapi is available
try {
  // This will only work if run within Strapi context
  const seedScript = require('./seed-use-cases');
  if (global.strapi) {
    seedScript.default(global.strapi)
      .then(() => {
        console.log('✅ Use case seeding completed');
        process.exit(0);
      })
      .catch((error) => {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
      });
  } else {
    console.log('❌ Strapi instance not found.');
    console.log('💡 Please run this via Strapi bootstrap or set SEED_USE_CASES=true in .env');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 To seed use cases:');
  console.log('   1. Add SEED_USE_CASES=true to apps/cms/.env');
  console.log('   2. Restart Strapi');
  console.log('   OR');
  console.log('   3. Run via Strapi console when Strapi is running');
  process.exit(1);
}

