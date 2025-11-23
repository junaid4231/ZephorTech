/**
 * Extract testimonials data from TypeScript file to JSON
 * Run: node scripts/extract-testimonials-robust.js
 */

const fs = require('fs');
const path = require('path');

const testimonialsFilePath = path.join(__dirname, '../../web/sections/Testimonials.tsx');
const outputPath = path.join(__dirname, 'testimonials-data.json');

console.log('📖 Reading Testimonials.tsx file...');

try {
  const content = fs.readFileSync(testimonialsFilePath, 'utf-8');
  
  // Find the testimonials array
  const startMarker = 'const testimonials: Testimonial[] = [';
  const startIndex = content.indexOf(startMarker);
  
  if (startIndex === -1) {
    throw new Error('Could not find testimonials array');
  }
  
  // Find the matching closing bracket
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
  
  // Clean up the content
  let cleaned = arrayContent
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/,(\s*[}\]])/g, '$1');
  
  // Try to parse as JavaScript
  let testimonialsData;
  try {
    testimonialsData = new Function('return ' + cleaned)();
  } catch (error) {
    console.error('❌ Could not parse array:', error.message);
    process.exit(1);
  }
  
  // Validate it's an array
  if (!Array.isArray(testimonialsData)) {
    throw new Error('Extracted data is not an array');
  }
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(testimonialsData, null, 2), 'utf-8');
  
  console.log(`✅ Successfully extracted ${testimonialsData.length} testimonials`);
  console.log(`   Saved to: ${outputPath}`);
  console.log('\n📋 Next step: Run seed script');
  console.log('   Add SEED_TESTIMONIALS=true to .env and restart Strapi');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

