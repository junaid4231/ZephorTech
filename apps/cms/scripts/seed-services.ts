/**
 * Seed script to migrate services to Strapi CMS
 * 
 * IMPORTANT: Before running, ensure you have the services data.
 * 
 * Option 1 (Recommended): Run this via Strapi CLI:
 *   pnpm strapi ts scripts/seed-services.ts
 * 
 * Option 2: If you have services data in a JSON file:
 *   Update the servicesData import below
 */

// Load services data from JSON file
// The JSON file is created by running: node scripts/extract-services-robust.js
import * as fs from 'fs';
import * as path from 'path';

let servicesData: any[] = [];

function loadServicesData() {
  // Try multiple paths to find the JSON file
  // When Strapi runs, process.cwd() is usually the cms/ directory
  const cwd = process.cwd();
  const possiblePaths = [
    path.join(cwd, 'scripts', 'services-data.json'), // Primary: from cms/ directory (most likely)
    path.join(__dirname, 'services-data.json'), // When run directly from scripts/
    path.join(__dirname, '..', 'scripts', 'services-data.json'), // From dist/scripts/ when compiled
    path.resolve(__dirname, '../../scripts/services-data.json'), // Absolute path from dist
    path.join(cwd, 'apps', 'cms', 'scripts', 'services-data.json'), // From monorepo root
  ];

  // Debug: Log paths being checked (only in development)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔍 Checking paths for services-data.json:');
    console.log(`   __dirname: ${__dirname}`);
    console.log(`   cwd: ${cwd}`);
  }

  for (const jsonPath of possiblePaths) {
    const resolvedPath = path.resolve(jsonPath);
    if (fs.existsSync(resolvedPath)) {
      try {
        servicesData = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
        console.log(`✅ Loaded ${servicesData.length} services from: ${resolvedPath}`);
        return true;
      } catch (error: any) {
        console.error(`❌ Error reading JSON file ${resolvedPath}:`, error.message);
      }
    } else if (process.env.NODE_ENV !== 'production') {
      console.log(`   ❌ Not found: ${resolvedPath}`);
    }
  }
  return false;
}

// Load services data
if (!loadServicesData()) {
  console.error('❌ Could not find services-data.json');
  console.log('\n💡 To create the JSON file, run:');
  console.log('   cd apps/cms && node scripts/extract-services-robust.js\n');
  // Don't exit in bootstrap context, just log the error
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(1);
  }
}

export default async function seedServices(strapi?: any) {
  // Get strapi instance from parameter or global
  const strapiInstance = strapi || (global as any).strapi;
  
  if (!strapiInstance) {
    throw new Error(
      'Strapi instance not found.\n' +
      'This script should be run via Strapi bootstrap or with strapi instance.\n' +
      'To run manually: Add SEED_SERVICES=true to .env and restart Strapi'
    );
  }

  if (!servicesData || servicesData.length === 0) {
    throw new Error(
      'No services data provided.\n' +
      'Please import or provide servicesData array in this script.\n' +
      'You can copy the servicesData from apps/web/lib/services.ts'
    );
  }

  console.log(`🚀 Starting service seeding for ${servicesData.length} services...`);

  try {
    const entityService = strapiInstance.entityService;
    const db = strapiInstance.db;
    
    if (!entityService) {
      throw new Error('Entity service not available');
    }
    
    if (!db) {
      throw new Error('Database service not available');
    }
    
    // Get existing services to avoid duplicates
    const existingServices = await entityService.findMany('api::service.service', {
      fields: ['slug'],
    });

    const existingSlugs = new Set(existingServices.map((s: any) => s.slug));

    let created = 0;
    let skipped = 0;
    const serviceIdMap = new Map<string, number>(); // slug -> id mapping

    // First pass: Create all services
    for (const service of servicesData) {
      if (existingSlugs.has(service.slug)) {
        console.log(`⏭️  Skipping ${service.title} (already exists)`);
        const existing = await entityService.findMany('api::service.service', {
          filters: { slug: service.slug },
          fields: ['id'],
        });
        if (existing && existing.length > 0) {
          serviceIdMap.set(service.slug, existing[0].id);
        }
        skipped++;
        continue;
      }

      try {
        // Helper function to convert plain text to Strapi richtext format
        // In Strapi v5, richtext can accept plain strings
        const toRichtext = (text: string) => {
          if (!text || typeof text !== 'string') return '';
          return text; // Strapi v5 auto-converts plain strings to richtext
        };

        // Step 1: Create service with ONLY required fields first
        // This avoids relation processing issues during initial creation
        const minimalData = {
          title: service.title,
          slug: service.slug,
          shortDescription: service.shortDescription,
          fullDescription: toRichtext(service.fullDescription),
          iconName: service.iconName,
          heroStats: service.heroStats || {},
        };

        const createdService = await entityService.create('api::service.service', {
          data: minimalData,
        });

        // Step 2: Update with components and optional fields
        // This separates component creation from entity creation
        const fullData: any = {
          // Components - format as plain objects
          features: (service.features || []).map((f: any) => ({
            icon: String(f.icon || ''),
            title: String(f.title || ''),
            description: String(f.description || ''),
          })),
          useCases: (service.useCases || []).map((uc: any) => ({
            industry: String(uc.industry || ''),
            title: String(uc.title || ''),
            description: String(uc.description || ''),
            examples: Array.isArray(uc.examples) ? uc.examples : [],
          })),
          techStack: service.techStack || {},
          process: (service.process || []).map((p: any) => ({
            step: Number(p.step) || 0,
            title: String(p.title || ''),
            description: String(p.description || ''),
            duration: p.duration ? String(p.duration) : null,
          })),
          faq: (service.faq || []).map((f: any) => ({
            question: String(f.question || ''),
            answer: String(f.answer || ''),
          })),
          benefits: Array.isArray(service.benefits) ? service.benefits : [],
          seoTitle: service.seoTitle ? String(service.seoTitle) : null,
          seoDescription: service.seoDescription ? String(service.seoDescription) : null,
          order: parseInt(service.id) || 0,
          publishedAt: new Date().toISOString(),
        };

        // Update with full data (but DON'T publish yet - that triggers relation population)
        // Remove publishedAt from the update to keep it as draft
        const { publishedAt, ...dataWithoutPublish } = fullData;
        await entityService.update('api::service.service', createdService.id, {
          data: dataWithoutPublish,
        });

        serviceIdMap.set(service.slug, createdService.id);
        console.log(`✅ Created: ${service.title} (ID: ${createdService.id}) as draft`);
        created++;
      } catch (error: any) {
        console.error(`❌ Error creating ${service.title}:`, error.message);
        // Log full error in development for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.error('   Full error:', error);
          if (error.stack) {
            console.error('   Stack:', error.stack.split('\n').slice(0, 5).join('\n'));
          }
        }
      }
    }

    // Second pass: Link related services (still as drafts)
    console.log('\n🔗 Setting up related services relationships...');
    for (const service of servicesData) {
      if (!service.relatedServices || service.relatedServices.length === 0) {
        continue;
      }

      const serviceId = serviceIdMap.get(service.slug);
      if (!serviceId) continue;

      try {
        const relatedServiceIds = service.relatedServices
          .map((slug: string) => serviceIdMap.get(slug))
          .filter((id: number | undefined): id is number => id !== undefined);

        if (relatedServiceIds.length > 0) {
          await entityService.update('api::service.service', serviceId, {
            data: {
              relatedServices: relatedServiceIds,
            },
          });
          console.log(`🔗 Linked ${relatedServiceIds.length} related services for ${service.title}`);
        }
      } catch (error: any) {
        console.error(`❌ Error linking services for ${service.title}:`, error.message);
      }
    }

    // Third pass: Publish all services AFTER relations are set
    // This ensures relation metadata is fully initialized
    console.log('\n📢 Publishing all services...');
    let published = 0;
    for (const service of servicesData) {
      const serviceId = serviceIdMap.get(service.slug);
      if (!serviceId) continue;

      try {
        await entityService.update('api::service.service', serviceId, {
          data: {
            publishedAt: new Date().toISOString(),
          },
        });
        published++;
      } catch (error: any) {
        console.error(`❌ Error publishing ${service.title}:`, error.message);
      }
    }
    console.log(`   ✅ Published ${published} services`);

    console.log(`\n✨ Seeding complete!`);
    console.log(`   ✅ Created: ${created} services`);
    console.log(`   ⏭️  Skipped: ${skipped} services (already exist)`);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

// Export the function for use in bootstrap
// To run manually, uncomment below:
// seedServices().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
