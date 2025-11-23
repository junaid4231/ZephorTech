/**
 * Export services data to JSON for CMS seeding
 * Run from web directory: pnpm ts-node scripts/export-services-to-json.ts
 */

import { servicesData } from '../lib/services';
import * as fs from 'fs';
import * as path from 'path';

const outputPath = path.join(__dirname, '../../cms/scripts/services-data.json');

try {
  // Convert to JSON (removes functions, keeps data)
  const jsonData = JSON.stringify(servicesData, null, 2);
  
  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, jsonData, 'utf-8');
  
  console.log(`✅ Exported ${servicesData.length} services to:`);
  console.log(`   ${outputPath}`);
  console.log('\n📋 Next step: Run seed script in CMS');
  console.log('   cd apps/cms && pnpm seed:services');
} catch (error: any) {
  console.error('❌ Export failed:', error.message);
  process.exit(1);
}

