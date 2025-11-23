/**
 * Seed testimonials to Strapi CMS
 * Uses the same proven approach as services seeding
 */

import * as fs from 'fs';
import * as path from 'path';

let testimonialsData: any[] = [];

function loadTestimonialsData() {
  const cwd = process.cwd();
  const possiblePaths = [
    path.join(cwd, 'scripts', 'testimonials-data.json'), // Primary: from cms/ directory
    path.join(__dirname, 'testimonials-data.json'), // When run directly from scripts/
    path.join(__dirname, '..', 'scripts', 'testimonials-data.json'), // From dist/scripts/ when compiled
    path.resolve(__dirname, '../../scripts/testimonials-data.json'), // Absolute path from dist
    path.join(cwd, 'apps', 'cms', 'scripts', 'testimonials-data.json'), // From monorepo root
  ];

  for (const jsonPath of possiblePaths) {
    const resolvedPath = path.resolve(jsonPath);
    if (fs.existsSync(resolvedPath)) {
      try {
        testimonialsData = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
        console.log(`✅ Loaded ${testimonialsData.length} testimonials from: ${resolvedPath}`);
        return true;
      } catch (error: any) {
        console.error(`❌ Error reading JSON file ${resolvedPath}:`, error.message);
      }
    }
  }
  return false;
}

// Load testimonials data
if (!loadTestimonialsData()) {
  console.error('❌ Could not find testimonials-data.json');
  console.log('\n💡 To create the JSON file, run:');
  console.log('   cd apps/cms && node scripts/extract-testimonials-robust.js\n');
  if (typeof process !== 'undefined' && process.exit) {
    process.exit(1);
  }
}

export default async function seedTestimonials(strapi?: any) {
  const strapiInstance = strapi || (global as any).strapi;
  
  if (!strapiInstance) {
    throw new Error('Strapi instance not found.');
  }

  if (!testimonialsData || testimonialsData.length === 0) {
    throw new Error('No testimonials data provided.');
  }

  console.log(`🚀 Starting testimonial seeding for ${testimonialsData.length} testimonials...`);

  try {
    const entityService = strapiInstance.entityService;
    
    if (!entityService) {
      throw new Error('Entity service not available');
    }
    
    // Get existing testimonials to avoid duplicates
    const existingTestimonials = await entityService.findMany('api::testimonial.testimonial', {
      fields: ['clientName', 'company'],
    });

    const existingKeys = new Set(
      existingTestimonials.map((t: any) => `${t.clientName}-${t.company}`)
    );

    let created = 0;
    let skipped = 0;

    // Create all testimonials as drafts first
    for (const testimonial of testimonialsData) {
      const key = `${testimonial.name}-${testimonial.company}`;
      if (existingKeys.has(key)) {
        console.log(`⏭️  Skipping ${testimonial.name} from ${testimonial.company} (already exists)`);
        skipped++;
        continue;
      }

      try {
        // Map frontend fields to Strapi schema
        // Frontend: name, image (string), role, company, quote, rating
        // Strapi: clientName, avatar (media), role, company, quote, rating
        const minimalData = {
          clientName: testimonial.name,
          role: testimonial.role,
          company: testimonial.company,
          quote: testimonial.quote,
          rating: testimonial.rating || 5,
          // image is just initials like "SC" - we'll skip avatar for now
          // Can be added later via Strapi admin
        };

        // Create as draft first
        const createdTestimonial = await entityService.create('api::testimonial.testimonial', {
          data: minimalData,
        });

        // Update with optional fields (order, featured)
        await entityService.update('api::testimonial.testimonial', createdTestimonial.id, {
          data: {
            order: parseInt(testimonial.id) || 0,
            featured: false, // Can be set to true for featured testimonials
          },
        });

        console.log(`✅ Created: ${testimonial.name} from ${testimonial.company} (ID: ${createdTestimonial.id}) as draft`);
        created++;
      } catch (error: any) {
        console.error(`❌ Error creating ${testimonial.name}:`, error.message);
        if (process.env.NODE_ENV !== 'production') {
          console.error('   Full error:', error);
          if (error.stack) {
            console.error('   Stack:', error.stack.split('\n').slice(0, 5).join('\n'));
          }
        }
      }
    }

    // Publish all testimonials AFTER all are created
    console.log('\n📢 Publishing all testimonials...');
    let published = 0;
    const allTestimonials = await entityService.findMany('api::testimonial.testimonial', {
      fields: ['id'],
    });

    for (const testimonial of allTestimonials) {
      try {
        await entityService.update('api::testimonial.testimonial', testimonial.id, {
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
    console.log(`   ✅ Published ${published} testimonials`);

    console.log(`\n✨ Testimonial seeding complete!`);
    console.log(`   ✅ Created: ${created} testimonials`);
    console.log(`   ⏭️  Skipped: ${skipped} testimonials (already exist)`);
  } catch (error: any) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

