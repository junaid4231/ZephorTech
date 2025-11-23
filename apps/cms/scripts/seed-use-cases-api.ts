/**
 * Seed use cases using Strapi REST API
 * Run: pnpm ts-node scripts/seed-use-cases-api.ts
 * 
 * This script uses the Strapi API to create use cases.
 * Make sure Strapi is running on http://localhost:1337
 */

import * as fs from 'fs';
import * as path from 'path';

// You need to create an API token in Strapi admin first
// Settings → API Tokens → Create new API Token (Full access)
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''; // Get from Strapi admin

// Try to load use cases data
let useCasesData: any[] = [];

// Method 1: Try JSON file
try {
  const jsonPath = path.join(__dirname, 'use-cases-data.json');
  if (fs.existsSync(jsonPath)) {
    useCasesData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`✅ Loaded ${useCasesData.length} use cases from JSON`);
  }
} catch (error) {
  console.error('❌ Could not load JSON file');
}

if (useCasesData.length === 0) {
  console.error('\n❌ No use cases data found!');
  console.log('\n💡 The use-cases-data.json file should exist in apps/cms/scripts/');
  process.exit(1);
}

if (!API_TOKEN) {
  console.error('\n❌ STRAPI_API_TOKEN not set!');
  console.log('\n💡 Steps to get API token:');
  console.log('   1. Go to Strapi admin: http://localhost:1337/admin');
  console.log('   2. Settings → API Tokens → Create new API Token');
  console.log('   3. Name: "Seed Script", Type: "Full access"');
  console.log('   4. Copy the token and set: export STRAPI_API_TOKEN=your_token');
  console.log('   5. Or add to .env: STRAPI_API_TOKEN=your_token\n');
  process.exit(1);
}

async function seedUseCases() {
  // Test API connection first
  try {
    const testResponse = await fetch(`${STRAPI_URL}/api/use-cases?pagination[limit]=1`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!testResponse.ok && testResponse.status !== 404) {
      throw new Error(`API connection failed: ${testResponse.status} ${testResponse.statusText}`);
    }
    console.log('✅ Connected to Strapi API\n');
  } catch (error: any) {
    console.error('❌ Failed to connect to Strapi:', error.message);
    console.log('\n💡 Make sure Strapi is running on', STRAPI_URL);
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;
  let linked = 0;

  // Get existing use cases
  try {
    const existingResponse = await fetch(`${STRAPI_URL}/api/use-cases?pagination[limit]=1000`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const existingData = await existingResponse.json();
    const existingSlugs = new Set(
      (existingData.data || []).map((uc: any) => uc.attributes?.slug).filter(Boolean)
    );

    console.log(`🚀 Starting use case seeding for ${useCasesData.length} use cases...\n`);

    for (const useCase of useCasesData) {
      if (existingSlugs.has(useCase.slug)) {
        console.log(`⏭️  Skipping ${useCase.title} (slug: ${useCase.slug}) - already exists`);
        skipped++;
        continue;
      }

      try {
        // Prepare use case data
        const useCaseData: any = {
          data: {
            title: useCase.title,
            slug: useCase.slug,
            industry: useCase.industry,
            description: useCase.description,
            examples: useCase.examples || [],
            icon: useCase.icon || null,
            order: useCase.order || 0,
            featured: useCase.featured || false,
          },
        };

        // Create use case
        const createResponse = await fetch(`${STRAPI_URL}/api/use-cases`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(useCaseData),
        });

        if (!createResponse.ok) {
          const errorData = await createResponse.json();
          throw new Error(JSON.stringify(errorData));
        }

        const createdData = await createResponse.json();
        const useCaseId = createdData.data?.id;

        console.log(`✅ Created: ${useCase.title} (ID: ${useCaseId}, slug: ${useCase.slug})`);

        // Link services if provided
        if (useCase.serviceSlugs && useCase.serviceSlugs.length > 0 && useCaseId) {
          try {
            // Find services by slug
            const servicesResponse = await fetch(
              `${STRAPI_URL}/api/services?filters[slug][$in]=${useCase.serviceSlugs.join(',')}&pagination[limit]=100`,
              {
                headers: {
                  'Authorization': `Bearer ${API_TOKEN}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            const servicesData = await servicesResponse.json();
            const serviceIds = (servicesData.data || []).map((s: any) => s.id).filter(Boolean);

            if (serviceIds.length > 0) {
              // Update use case with service relationships
              const updateResponse = await fetch(`${STRAPI_URL}/api/use-cases/${useCaseId}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${API_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  data: {
                    services: serviceIds,
                  },
                }),
              });

              if (updateResponse.ok) {
                linked += serviceIds.length;
                console.log(`   🔗 Linked ${serviceIds.length} service(s) to ${useCase.title}`);
              }
            }
          } catch (linkError: any) {
            console.warn(`   ⚠️  Could not link services to ${useCase.title}:`, linkError.message);
          }
        }

        created++;
      } catch (error: any) {
        console.error(`❌ Error creating ${useCase.title}:`, error.message);
      }
    }

    // Publish all use cases
    console.log('\n📢 Publishing all use cases...');
    let published = 0;
    
    try {
      const allResponse = await fetch(`${STRAPI_URL}/api/use-cases?pagination[limit]=1000`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      const allData = await allResponse.json();
      const allUseCases = allData.data || [];

      for (const useCase of allUseCases) {
        try {
          await fetch(`${STRAPI_URL}/api/use-cases/${useCase.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: {
                publishedAt: new Date().toISOString(),
              },
            }),
          });
          published++;
        } catch (error) {
          // Continue if publish fails
        }
      }
    } catch (error) {
      console.warn('⚠️  Could not publish use cases:', error);
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

// Run the seeding
seedUseCases()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });

