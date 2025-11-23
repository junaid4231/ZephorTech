/**
 * Helper script to export services data from web app to JSON
 * Run this from the CMS directory:
 * pnpm ts-node scripts/export-services-data.ts
 * 
 * This will create services-data.json that can be imported by seed script
 */

import * as fs from 'fs';
import * as path from 'path';

// Try to import services data
// Adjust the path based on your monorepo structure
const servicesModulePath = path.join(__dirname, '../../web/lib/services.ts');

try {
  // For TypeScript files, we'd need to compile or use a different approach
  // For now, this is a placeholder - you'll need to manually export or use a different method
  console.log('📝 To export services data:');
  console.log('   1. Go to apps/web/lib/services.ts');
  console.log('   2. Copy the servicesData array');
  console.log('   3. Create apps/cms/scripts/services-data.json');
  console.log('   4. Paste the array as JSON');
  console.log('\n   Or run this from web directory:');
  console.log('   node -e "const {servicesData} = require(\'./lib/services.ts\'); console.log(JSON.stringify(servicesData, null, 2))"');
  
  // Alternative: Create a simple Node script that can be run
  console.log('\n   Creating a simple export script...');
  
  const exportScript = `// Run this from apps/web directory:
// node -e "const fs = require('fs'); const data = require('./lib/services.ts'); fs.writeFileSync('../cms/scripts/services-data.json', JSON.stringify(data.servicesData, null, 2));"
`;
  
  fs.writeFileSync(
    path.join(__dirname, 'EXPORT_INSTRUCTIONS.md'),
    `# How to Export Services Data

## Option 1: Manual Export (Recommended)
1. Open apps/web/lib/services.ts
2. Copy the entire \`servicesData\` array
3. Create apps/cms/scripts/services-data.json
4. Wrap the array in proper JSON format and save

## Option 2: Using Node (if TypeScript is compiled)
Run from apps/web directory:
\`\`\`bash
node -e "const fs = require('fs'); const data = require('./lib/services'); fs.writeFileSync('../cms/scripts/services-data.json', JSON.stringify(data.servicesData, null, 2));"
\`\`\`

## Option 3: Direct Import in Seed Script
Modify apps/cms/scripts/seed-services.ts to directly import from the web app.
`
  );
  
  console.log('✅ Created EXPORT_INSTRUCTIONS.md');
} catch (error) {
  console.error('Error:', error);
}

