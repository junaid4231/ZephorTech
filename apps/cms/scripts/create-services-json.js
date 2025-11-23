/**
 * Extract services data from TypeScript file to JSON
 * Run: node scripts/create-services-json.js
 */

const fs = require('fs');
const path = require('path');

const servicesFilePath = path.join(__dirname, '../../web/lib/services.ts');
const outputPath = path.join(__dirname, 'services-data.json');

console.log('📖 Reading services.ts file...');

try {
  const content = fs.readFileSync(servicesFilePath, 'utf-8');
  
  // Find the servicesData array
  // Look for: export const servicesData: ServiceDetail[] = [...]
  const startMarker = 'export const servicesData: ServiceDetail[] = [';
  const startIndex = content.indexOf(startMarker);
  
  if (startIndex === -1) {
    throw new Error('Could not find servicesData array');
  }
  
  // Find the matching closing bracket
  let bracketCount = 0;
  let inString = false;
  let stringChar = null;
  let endIndex = startIndex + startMarker.length;
  
  for (let i = startIndex + startMarker.length; i < content.length; i++) {
    const char = content[i];
    const prevChar = content[i - 1];
    
    // Handle string literals
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && prevChar !== '\\') {
      inString = false;
      stringChar = null;
    }
    
    if (!inString) {
      if (char === '[') bracketCount++;
      if (char === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          endIndex = i + 1;
          break;
        }
      }
    }
  }
  
  // Extract the array content
  const arrayContent = content.substring(startIndex + startMarker.length - 1, endIndex);
  
  // Try to evaluate it as JavaScript (safe in this context since it's our own file)
  // Replace TypeScript-specific syntax
  let jsContent = arrayContent
    .replace(/:\s*ServiceDetail\[\]/g, '') // Remove type annotation
    .replace(/\/\/.*$/gm, '') // Remove comments
    .trim();
  
  // Evaluate to get the actual data
  const servicesData = eval('(' + jsContent + ')');
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(servicesData, null, 2), 'utf-8');
  
  console.log(`✅ Successfully extracted ${servicesData.length} services`);
  console.log(`   Saved to: ${outputPath}`);
  console.log('\n📋 Next step: Run seed script');
  console.log('   pnpm seed:services');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Manual approach:');
  console.log('   1. Open apps/web/lib/services.ts');
  console.log('   2. Copy the entire servicesData array (from [ to ])');
  console.log('   3. Create apps/cms/scripts/services-data.json');
  console.log('   4. Paste and ensure valid JSON format');
  process.exit(1);
}

