/**
 * Robust extraction of services data from TypeScript file
 * Uses string manipulation to extract the array and convert to JSON
 */

const fs = require('fs');
const path = require('path');

const servicesFilePath = path.join(__dirname, '../../web/lib/services.ts');
const outputPath = path.join(__dirname, 'services-data.json');

console.log('📖 Reading services.ts...');

try {
  const content = fs.readFileSync(servicesFilePath, 'utf-8');
  
  // Find the start of the array
  const startMarker = 'export const servicesData: ServiceDetail[] = [';
  const startIndex = content.indexOf(startMarker);
  
  if (startIndex === -1) {
    throw new Error('Could not find servicesData array');
  }
  
  // Find the matching closing bracket by counting brackets
  let bracketCount = 0;
  let inString = false;
  let stringChar = null;
  let escapeNext = false;
  let endIndex = -1;
  
  // Start from the opening bracket
  for (let i = startIndex + startMarker.length - 1; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';
    
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    
    // Handle string literals
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar) {
      inString = false;
      stringChar = null;
    }
    
    if (!inString) {
      if (char === '[') {
        bracketCount++;
      } else if (char === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          endIndex = i + 1;
          break;
        }
      }
    }
  }
  
  if (endIndex === -1) {
    throw new Error('Could not find matching closing bracket');
  }
  
  // Extract the array content
  const arrayContent = content.substring(startIndex + startMarker.length - 1, endIndex);
  
  // Clean up the content - remove TypeScript-specific syntax
  let cleaned = arrayContent
    // Remove single-line comments
    .replace(/\/\/.*$/gm, '')
    // Remove multi-line comments (simple version)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove trailing commas before closing brackets/braces
    .replace(/,(\s*[}\]])/g, '$1');
  
  // Try to parse as JSON
  let servicesData;
  try {
    // Use Function constructor to safely evaluate (since we control the source)
    servicesData = new Function('return ' + cleaned)();
  } catch (error) {
    console.error('❌ Could not parse array:', error.message);
    console.log('\n💡 The TypeScript file contains syntax that cannot be directly converted.');
    console.log('   Please manually create services-data.json or use Strapi admin to add services.');
    process.exit(1);
  }
  
  // Validate it's an array
  if (!Array.isArray(servicesData)) {
    throw new Error('Extracted data is not an array');
  }
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(servicesData, null, 2), 'utf-8');
  
  console.log(`✅ Successfully extracted ${servicesData.length} services`);
  console.log(`   Saved to: ${outputPath}`);
  console.log('\n📋 Next step: Run seed script');
  console.log('   pnpm seed:services');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Alternative: Use Strapi admin to manually add services');
  console.log('   Or create services-data.json manually');
  process.exit(1);
}

