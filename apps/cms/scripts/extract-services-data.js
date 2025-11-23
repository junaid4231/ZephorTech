/**
 * Extract services data from web app to JSON
 * Run from CMS directory: node scripts/extract-services-data.js
 */

const fs = require('fs');
const path = require('path');

// Read the services.ts file
const servicesFilePath = path.join(__dirname, '../../web/lib/services.ts');
const outputPath = path.join(__dirname, 'services-data.json');

try {
  const content = fs.readFileSync(servicesFilePath, 'utf-8');
  
  // Extract the servicesData array using regex
  // This is a simple approach - for production, use a proper TypeScript parser
  const arrayMatch = content.match(/export const servicesData: ServiceDetail\[\] = (\[[\s\S]*?\]);/);
  
  if (!arrayMatch) {
    console.error('❌ Could not find servicesData array in services.ts');
    console.log('\n💡 Manual approach:');
    console.log('   1. Open apps/web/lib/services.ts');
    console.log('   2. Copy the entire servicesData array (from [ to ])');
    console.log('   3. Create apps/cms/scripts/services-data.json');
    console.log('   4. Paste and format as JSON');
    process.exit(1);
  }
  
  // Try to parse as JSON (might need manual cleanup)
  let servicesData;
  try {
    servicesData = eval('(' + arrayMatch[1] + ')');
  } catch (error) {
    console.error('❌ Could not parse servicesData:', error.message);
    console.log('\n💡 The data contains TypeScript-specific syntax.');
    console.log('   Please manually create services-data.json');
    console.log('   Copy the servicesData array and convert to JSON format');
    process.exit(1);
  }
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(servicesData, null, 2), 'utf-8');
  console.log(`✅ Extracted ${servicesData.length} services to ${outputPath}`);
  console.log('   You can now run: pnpm seed:services');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Alternative: Manually create services-data.json');
  console.log('   Copy servicesData from apps/web/lib/services.ts');
  process.exit(1);
}

