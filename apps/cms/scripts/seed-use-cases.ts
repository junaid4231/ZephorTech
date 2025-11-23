/**
 * Seed use cases to Strapi CMS
 * Uses the same proven approach as services and testimonials seeding
 */

import * as fs from 'fs';
import * as path from 'path';

let useCasesData: any[] = [];

function loadUseCasesData() {
  const cwd = process.cwd();
  const possiblePaths = [
    path.join(cwd, 'scripts', 'use-cases-data.json'), // Primary: from cms/ directory
    path.join(__dirname, 'use-cases-data.json'), // When run directly from scripts/
    path.join(__dirname, '..', 'scripts', 'use-cases-data.json'), // From dist/scripts/ when compiled
    path.resolve(__dirname, '../../scripts/use-cases-data.json'), // Absolute path from dist
    path.join(cwd, 'apps', 'cms', 'scripts', 'use-cases-data.json'), // From monorepo root
  ];

  for (const jsonPath of possiblePaths) {
    const resolvedPath = path.resolve(jsonPath);
    if (fs.existsSync(resolvedPath)) {
      try {
        useCasesData = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
        console.log(`✅ Loaded ${useCasesData.length} use cases from: ${resolvedPath}`);
        return true;
      } catch (error: any) {
        console.error(`❌ Error reading JSON file ${resolvedPath}:`, error.message);
      }
    }
  }
  return false;
}

// Load use cases data
if (!loadUseCasesData()) {
  console.error('❌ Could not find use-cases-data.json');
  console.log('\n💡 To create the JSON file, you can:');
  console.log('   1. Create use-cases-data.json manually with use case data');
  console.log('   2. Or extract from existing services useCases components\n');
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(1);
  }
}

export default async function seedUseCases(strapi?: any) {
  const strapiInstance = strapi || (global as any).strapi;
  
  if (!strapiInstance) {
    throw new Error('Strapi instance not found.');
  }

  if (!useCasesData || useCasesData.length === 0) {
    throw new Error('No use cases data provided.');
  }

  console.log(`🚀 Starting use case seeding for ${useCasesData.length} use cases...`);

  try {
    const entityService = strapiInstance.entityService;
    
    if (!entityService) {
      throw new Error('Entity service not available');
    }
    
    // Get existing use cases to avoid duplicates
    const existingUseCases = await entityService.findMany('api::use-case.use-case', {
      fields: ['slug', 'title'],
    });

    const existingSlugs = new Set(
      existingUseCases.map((uc: any) => uc.slug)
    );

    let created = 0;
    let skipped = 0;
    let linked = 0;

    // Create all use cases as drafts first
    for (const useCase of useCasesData) {
      if (existingSlugs.has(useCase.slug)) {
        console.log(`⏭️  Skipping ${useCase.title} (slug: ${useCase.slug}) - already exists`);
        skipped++;
        continue;
      }

      try {
        // Map data to Strapi schema
        // Strapi schema: title, slug, industry, description, examples (JSON), icon, image, order, featured, services (relation)
        const useCaseData: any = {
          title: useCase.title,
          slug: useCase.slug,
          industry: useCase.industry,
          description: useCase.description,
          examples: useCase.examples || [],
          icon: useCase.icon || null,
          order: useCase.order || 0,
          featured: useCase.featured || false,
        };

        // Create as draft first
        const createdUseCase = await entityService.create('api::use-case.use-case', {
          data: useCaseData,
        });

        // Link services if provided
        if (useCase.serviceSlugs && useCase.serviceSlugs.length > 0) {
          try {
            // Find services by slug
            const services = await entityService.findMany('api::service.service', {
              filters: {
                slug: {
                  $in: useCase.serviceSlugs,
                },
              },
              fields: ['id'],
            });

            if (services.length > 0) {
              await entityService.update('api::use-case.use-case', createdUseCase.id, {
                data: {
                  services: services.map((s: any) => s.id),
                },
              });
              linked += services.length;
              console.log(`   🔗 Linked ${services.length} service(s) to ${useCase.title}`);
            }
          } catch (linkError: any) {
            console.warn(`   ⚠️  Could not link services to ${useCase.title}:`, linkError.message);
          }
        }

        console.log(`✅ Created: ${useCase.title} (ID: ${createdUseCase.id}, slug: ${useCase.slug}) as draft`);
        created++;
      } catch (error: any) {
        console.error(`❌ Error creating ${useCase.title}:`, error.message);
        if (process.env.NODE_ENV !== 'production') {
          console.error('   Full error:', error);
          if (error.stack) {
            console.error('   Stack:', error.stack.split('\n').slice(0, 5).join('\n'));
          }
        }
      }
    }

    // Publish all use cases AFTER all are created
    console.log('\n📢 Publishing all use cases...');
    let published = 0;
    const allUseCases = await entityService.findMany('api::use-case.use-case', {
      fields: ['id'],
    });

    for (const useCase of allUseCases) {
      try {
        await entityService.update('api::use-case.use-case', useCase.id, {
          data: {
            publishedAt: new Date().toISOString(),
          },
          populate: false,
        });
        published++;
      } catch (error: any) {
        // Continue if publish fails
      }
    }
    console.log(`   ✅ Published ${published} use cases`);

    console.log(`\n✨ Use case seeding complete!`);
    console.log(`   ✅ Created: ${created} use cases`);
    console.log(`   ⏭️  Skipped: ${skipped} use cases (already exist)`);
    console.log(`   🔗 Linked: ${linked} service relationships`);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

