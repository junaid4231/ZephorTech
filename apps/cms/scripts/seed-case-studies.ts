/**
 * Seed case studies to Strapi CMS
 * Uses the same proven approach as services, testimonials, and blogs seeding
 */

import * as fs from 'fs';
import * as path from 'path';

let caseStudiesData: any[] = [];

function loadCaseStudiesData() {
  const cwd = process.cwd();
  const possiblePaths = [
    path.join(cwd, 'scripts', 'case-studies-data.json'), // Primary: from cms/ directory
    path.join(__dirname, 'case-studies-data.json'), // When run directly from scripts/
    path.join(__dirname, '..', 'scripts', 'case-studies-data.json'), // From dist/scripts/ when compiled
    path.resolve(__dirname, '../../scripts/case-studies-data.json'), // Absolute path from dist
    path.join(cwd, 'apps', 'cms', 'scripts', 'case-studies-data.json'), // From monorepo root
  ];

  for (const jsonPath of possiblePaths) {
    const resolvedPath = path.resolve(jsonPath);
    if (fs.existsSync(resolvedPath)) {
      try {
        caseStudiesData = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
        console.log(`✅ Loaded ${caseStudiesData.length} case studies from: ${resolvedPath}`);
        return true;
      } catch (error: any) {
        console.error(`❌ Error reading JSON file ${resolvedPath}:`, error.message);
      }
    }
  }
  return false;
}

// Load case studies data
if (!loadCaseStudiesData()) {
  console.error('❌ Could not find case-studies-data.json');
  console.log('\n💡 To create the JSON file, you can:');
  console.log('   1. Create case-studies-data.json manually with case study data');
  console.log('   2. Or extract from existing case studies in apps/web/lib/case-studies.ts\n');
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(1);
  }
}

export default async function seedCaseStudies(strapi?: any) {
  const strapiInstance = strapi || (global as any).strapi;
  
  if (!strapiInstance) {
    throw new Error('Strapi instance not found.');
  }

  if (!caseStudiesData || caseStudiesData.length === 0) {
    throw new Error('No case studies data provided.');
  }

  console.log(`🚀 Starting case study seeding for ${caseStudiesData.length} case studies...`);

  try {
    const entityService = strapiInstance.entityService;
    
    if (!entityService) {
      throw new Error('Entity service not available');
    }
    
    // Get existing case studies to avoid duplicates
    const existingCaseStudies = await entityService.findMany('api::case-study.case-study', {
      fields: ['slug', 'title'],
    });

    const existingSlugs = new Set(
      existingCaseStudies.map((cs: any) => cs.slug)
    );

    let created = 0;
    let skipped = 0;
    let linked = 0;

    // Create all case studies as drafts first
    for (const caseStudy of caseStudiesData) {
      if (existingSlugs.has(caseStudy.slug)) {
        console.log(`⏭️  Skipping ${caseStudy.title} (slug: ${caseStudy.slug}) - already exists`);
        skipped++;
        continue;
      }

      try {
        // Map data to Strapi schema
        // All JSON fields need to be stringified
        const caseStudyData: any = {
          title: caseStudy.title,
          slug: caseStudy.slug,
          client: caseStudy.client,
          industry: caseStudy.industry,
          summary: caseStudy.summary,
          excerpt: caseStudy.excerpt,
          timeline: caseStudy.timeline || null,
          headquarters: caseStudy.headquarters || null,
          heroSubtitle: caseStudy.heroSubtitle || null,
          heroDescription: caseStudy.heroDescription || null,
          heroStats: caseStudy.heroStats ? JSON.stringify(caseStudy.heroStats) : null,
          highlights: caseStudy.highlights ? JSON.stringify(caseStudy.highlights) : null,
          metrics: caseStudy.metrics ? JSON.stringify(caseStudy.metrics) : null,
          challenge: caseStudy.challenge ? JSON.stringify(caseStudy.challenge) : null,
          strategy: caseStudy.strategy ? JSON.stringify(caseStudy.strategy) : null,
          outcome: caseStudy.outcome ? JSON.stringify(caseStudy.outcome) : null,
          testimonial: caseStudy.testimonial ? JSON.stringify(caseStudy.testimonial) : null,
          technologies: caseStudy.technologies ? JSON.stringify(caseStudy.technologies) : null,
          order: caseStudy.order || 0,
          featured: caseStudy.featured || false,
        };

        // Create as draft first
        const createdCaseStudy = await entityService.create('api::case-study.case-study', {
          data: caseStudyData,
        });

        // Link services if provided
        if (caseStudy.serviceSlugs && caseStudy.serviceSlugs.length > 0) {
          try {
            // Find services by slug
            const services = await entityService.findMany('api::service.service', {
              filters: {
                slug: {
                  $in: caseStudy.serviceSlugs,
                },
              },
              fields: ['id'],
            });

            if (services.length > 0) {
              await entityService.update('api::case-study.case-study', createdCaseStudy.id, {
                data: {
                  services: services.map((s: any) => s.id),
                },
              });
              linked += services.length;
              console.log(`   🔗 Linked ${services.length} service(s) to ${caseStudy.title}`);
            }
          } catch (linkError: any) {
            console.warn(`   ⚠️  Could not link services to ${caseStudy.title}:`, linkError.message);
          }
        }

        console.log(`✅ Created: ${caseStudy.title} (ID: ${createdCaseStudy.id}, slug: ${caseStudy.slug}) as draft`);
        created++;
      } catch (error: any) {
        console.error(`❌ Error creating ${caseStudy.title}:`, error.message);
        if (process.env.NODE_ENV !== 'production') {
          console.error('   Full error:', error);
          if (error.stack) {
            console.error('   Stack:', error.stack.split('\n').slice(0, 5).join('\n'));
          }
        }
      }
    }

    // Publish all case studies AFTER all are created
    console.log('\n📢 Publishing all case studies...');
    let published = 0;
    const allCaseStudies = await entityService.findMany('api::case-study.case-study', {
      fields: ['id'],
    });

    for (const caseStudy of allCaseStudies) {
      try {
        await entityService.update('api::case-study.case-study', caseStudy.id, {
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
    console.log(`   ✅ Published ${published} case studies`);

    console.log(`\n✨ Case study seeding complete!`);
    console.log(`   ✅ Created: ${created} case studies`);
    console.log(`   ⏭️  Skipped: ${skipped} case studies (already exist)`);
    console.log(`   🔗 Linked: ${linked} service relationships`);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

