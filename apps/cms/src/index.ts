async function ensurePublicAPIReadPermissions(strapi: any) {
  try {
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      console.warn('⚠️  Public role not found while configuring permissions');
      return;
    }

    const permissionsToEnable = [
      'api::service.service.find',
      'api::service.service.findOne',
      'api::testimonial.testimonial.find',
      'api::testimonial.testimonial.findOne',
      'api::blog-post.blog-post.find',
      'api::blog-post.blog-post.findOne',
      'api::author.author.find',
      'api::author.author.findOne',
      'api::use-case.use-case.find',
      'api::use-case.use-case.findOne',
      'api::case-study.case-study.find',
      'api::case-study.case-study.findOne',
      'api::newsletter.newsletter.find',
      'api::newsletter.newsletter.findOne',
    ];

    for (const action of permissionsToEnable) {
      const existingPermission = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({
          where: {
            action,
            role: publicRole.id,
          },
        });

      if (existingPermission) {
        if (!existingPermission.enabled) {
          await strapi.db.query('plugin::users-permissions.permission').update({
            where: { id: existingPermission.id },
            data: { enabled: true },
          });
          console.log(`🔓 Enabled existing permission: ${action}`);
        }
      } else {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
            enabled: true,
            policy: null,
            subject: null,
            conditions: [],
          },
        });
        console.log(`🔓 Created permission: ${action}`);
      }
    }

    console.log('✅ Public API permissions ensured for services, testimonials, blog posts, use cases, case studies, and newsletters');
  } catch (error) {
    console.error('❌ Failed to configure public API permissions:', error);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Check if we should run seed script
    const shouldSeed = process.env.SEED_SERVICES === 'true';
    
    if (shouldSeed) {
      console.log('🌱 Running service seed script...');
      // Wait a bit for Strapi to fully initialize all models and relations
      await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        const seedScript = require('../scripts/seed-services');
        await seedScript.default(strapi);
        console.log('✅ Service seeding completed');
      } catch (error: any) {
        console.error('❌ Service seeding failed:', error.message);
        if (error.stack) {
          console.error('Stack:', error.stack);
        }
      }
    }

    // Seed testimonials if enabled
    const shouldSeedTestimonials = process.env.SEED_TESTIMONIALS === 'true';
    if (shouldSeedTestimonials) {
      console.log('🌱 Running testimonial seed script...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const seedTestimonialsScript = require('../scripts/seed-testimonials');
        await seedTestimonialsScript.default(strapi);
        console.log('✅ Testimonial seeding completed');
      } catch (error: any) {
        console.error('❌ Testimonial seeding failed:', error.message);
        if (error.stack) {
          console.error('Stack:', error.stack);
        }
      }
    }

    const shouldSeedBlog = process.env.SEED_BLOG === 'true';
    if (shouldSeedBlog) {
      console.log('🌱 Running blog seed script...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const seedBlogScript = require('../scripts/seed-blog');
        await seedBlogScript.default(strapi);
        console.log('✅ Blog seeding completed');
      } catch (error: any) {
        console.error('❌ Blog seeding failed:', error.message);
        if (error.stack) {
          console.error('Stack:', error.stack);
        }
      }
    }

    // Seed use cases if enabled OR if no use cases exist
    const shouldSeedUseCases = process.env.SEED_USE_CASES === 'true';
    if (shouldSeedUseCases) {
      console.log('🌱 Running use case seed script...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const seedUseCasesScript = require('../scripts/seed-use-cases');
        await seedUseCasesScript.default(strapi);
        console.log('✅ Use case seeding completed');
      } catch (error: any) {
        console.error('❌ Use case seeding failed:', error.message);
        if (error.stack) {
          console.error('Stack:', error.stack);
        }
      }
    } else {
      // Auto-seed if no use cases exist (one-time setup)
      try {
        const existingUseCases = await strapi.entityService.findMany('api::use-case.use-case', {
          limit: 1,
        });
        if (!existingUseCases || existingUseCases.length === 0) {
          console.log('🌱 No use cases found, auto-seeding...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          try {
            const seedUseCasesScript = require('../scripts/seed-use-cases');
            await seedUseCasesScript.default(strapi);
            console.log('✅ Use case auto-seeding completed');
          } catch (error: any) {
            console.warn('⚠️  Use case auto-seeding failed (this is okay if data file is missing):', error.message);
          }
        }
      } catch (error: any) {
        // Silently fail if use-case content type doesn't exist yet
      }
    }

    // Seed case studies if enabled
    const shouldSeedCaseStudies = process.env.SEED_CASE_STUDIES === 'true';
    if (shouldSeedCaseStudies) {
      console.log('🌱 Running case study seed script...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const seedCaseStudiesScript = require('../scripts/seed-case-studies');
        await seedCaseStudiesScript.default(strapi);
        console.log('✅ Case study seeding completed');
      } catch (error: any) {
        console.error('❌ Case study seeding failed:', error.message);
        if (error.stack) {
          console.error('Stack:', error.stack);
        }
      }
    } else {
      // Auto-seed if no case studies exist (one-time setup)
      try {
        const existingCaseStudies = await strapi.entityService.findMany('api::case-study.case-study', {
          limit: 1,
        });
        if (!existingCaseStudies || existingCaseStudies.length === 0) {
          console.log('🌱 No case studies found, auto-seeding...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          try {
            const seedCaseStudiesScript = require('../scripts/seed-case-studies');
            await seedCaseStudiesScript.default(strapi);
            console.log('✅ Case study auto-seeding completed');
          } catch (error: any) {
            console.warn('⚠️  Case study auto-seeding failed (this is okay if data file is missing):', error.message);
          }
        }
      } catch (error: any) {
        // Silently fail if case-study content type doesn't exist yet
      }
    }

    await ensurePublicAPIReadPermissions(strapi);
  },
};
