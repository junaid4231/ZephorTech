/**
 * Seed services using Strapi REST API
 * Run: pnpm ts-node scripts/seed-services-api.ts
 * 
 * This script uses the Strapi API to create services.
 * Make sure Strapi is running on http://localhost:1337
 */

import * as fs from 'fs';
import * as path from 'path';

// You need to create an API token in Strapi admin first
// Settings → API Tokens → Create new API Token (Full access)
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || ''; // Get from Strapi admin

// Try to load services data
let servicesData: any[] = [];

// Method 1: Try JSON file
try {
  const jsonPath = path.join(__dirname, 'services-data.json');
  if (fs.existsSync(jsonPath)) {
    servicesData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    console.log(`✅ Loaded ${servicesData.length} services from JSON`);
  }
} catch (error) {
  console.error('❌ Could not load JSON file');
}

if (servicesData.length === 0) {
  console.error('\n❌ No services data found!');
  console.log('\n💡 Create apps/cms/scripts/services-data.json');
  console.log('   Copy servicesData array from apps/web/lib/services.ts');
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

async function seedServices() {
  // Test API connection first
  console.log('🔍 Testing API connection...');
  try {
    const testResponse = await fetch(`${STRAPI_URL}/api/service`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error(`❌ API test failed: ${testResponse.status} ${testResponse.statusText}`);
      console.error(`   Response: ${errorText.substring(0, 200)}`);
      throw new Error(`API connection failed: ${testResponse.status}`);
    }
    
    console.log('✅ API connection successful\n');
  } catch (error: any) {
    console.error('❌ API connection test failed:', error.message);
    console.log('\n💡 Please verify:');
    console.log('   1. Strapi is running on', STRAPI_URL);
    console.log('   2. API token has "Full access" permissions');
    console.log('   3. API token is correctly set in STRAPI_API_TOKEN env variable');
    process.exit(1);
  }

  console.log(`🚀 Seeding ${servicesData.length} services to Strapi...\n`);

  let created = 0;
  let skipped = 0;
  const serviceIdMap = new Map<string, number>();

  for (const service of servicesData) {
    try {
      // Check if service already exists
      const checkResponse = await fetch(
        `${STRAPI_URL}/api/service?filters[slug][$eq]=${service.slug}`,
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const checkData = await checkResponse.json();
      if (checkData.data && checkData.data.length > 0) {
        console.log(`⏭️  Skipping ${service.title} (already exists)`);
        serviceIdMap.set(service.slug, checkData.data[0].id);
        skipped++;
        continue;
      }

      // Transform data for Strapi API
      // Note: fullDescription is a richtext field in Strapi v5
      // For now, we'll convert it to a simple string format that Strapi can handle
      const strapiData = {
        data: {
          title: service.title,
          slug: service.slug,
          shortDescription: service.shortDescription,
          // Convert string to Strapi richtext format (simplified)
          fullDescription: typeof service.fullDescription === 'string' 
            ? service.fullDescription // Strapi will auto-convert simple strings
            : service.fullDescription,
          iconName: service.iconName,
          heroStats: service.heroStats,
          features: service.features || [],
          useCases: service.useCases || [],
          techStack: service.techStack || {},
          process: service.process || [],
          faq: service.faq || [],
          benefits: service.benefits || [],
          seoTitle: service.seoTitle || null,
          seoDescription: service.seoDescription || null,
        },
      };

      // Create service
      const createResponse = await fetch(`${STRAPI_URL}/api/service`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(strapiData),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        let errorMessage = 'Unknown error';
        try {
          const error = JSON.parse(errorText);
          errorMessage = error.error?.message || error.message || errorText;
        } catch {
          errorMessage = errorText;
        }
        throw new Error(errorMessage);
      }

      const createdData = await createResponse.json();
      const serviceId = createdData.data.id;
      serviceIdMap.set(service.slug, serviceId);
      
      console.log(`✅ Created: ${service.title} (ID: ${serviceId})`);
      created++;
    } catch (error: any) {
      console.error(`❌ Error creating ${service.title}:`, error.message);
    }
  }

  // Link related services
  console.log('\n🔗 Linking related services...');
  for (const service of servicesData) {
    if (!service.relatedServices || service.relatedServices.length === 0) continue;

    const serviceId = serviceIdMap.get(service.slug);
    if (!serviceId) continue;

    try {
      const relatedIds = service.relatedServices
        .map((slug: string) => serviceIdMap.get(slug))
        .filter((id: number | undefined): id is number => id !== undefined);

      if (relatedIds.length > 0) {
        const updateResponse = await fetch(`${STRAPI_URL}/api/service/${serviceId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              relatedServices: relatedIds,
            },
          }),
        });

        if (updateResponse.ok) {
          console.log(`🔗 Linked ${relatedIds.length} services for ${service.title}`);
        }
      }
    } catch (error: any) {
      console.error(`❌ Error linking services for ${service.title}:`, error.message);
    }
  }

  console.log(`\n✨ Seeding complete!`);
  console.log(`   ✅ Created: ${created} services`);
  console.log(`   ⏭️  Skipped: ${skipped} services`);
}

seedServices()
  .then(() => {
    console.log('\n✅ Seed script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed script failed:', error);
    process.exit(1);
  });

