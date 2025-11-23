import * as fs from 'fs';
import * as path from 'path';

interface AuthorSeed {
  name: string;
  slug?: string;
  role: string;
  bio?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
}

interface BlogPostSeed {
  title: string;
  slug?: string;
  excerpt: string;
  heroKicker?: string;
  heroDescription?: string;
  content: string;
  contentSections?: any[];
  pullQuote?: any;
  impactStats?: any[];
  tags?: string[];
  readingTime?: number;
  featured?: boolean;
  heroVideoUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  ctaLabel?: string;
  ctaLink?: string;
  keyTakeaways?: string[];
  authorSlug: string;
  relatedSlugs?: string[];
}

function loadJson<T = any>(fileName: string): T[] {
  const cwd = process.cwd();
  const possiblePaths = [
    path.join(cwd, 'scripts', fileName),
    path.join(__dirname, fileName),
    path.join(__dirname, '..', 'scripts', fileName),
    path.resolve(__dirname, '../../scripts', fileName),
    path.join(cwd, 'apps', 'cms', 'scripts', fileName),
  ];

  for (const jsonPath of possiblePaths) {
    const resolved = path.resolve(jsonPath);
    if (fs.existsSync(resolved)) {
      const data = JSON.parse(fs.readFileSync(resolved, 'utf-8'));
      console.log(`✅ Loaded ${data.length} records from ${resolved}`);
      return data;
    }
  }

  throw new Error(`Could not locate ${fileName} in known paths.`);
}

const authorsData = loadJson<AuthorSeed>('authors-data.json');
const blogPostsData = loadJson<BlogPostSeed>('blog-posts-data.json');

export default async function seedBlog(strapi?: any) {
  const strapiInstance = strapi || (global as any).strapi;

  if (!strapiInstance) {
    throw new Error(
      'Strapi instance not found. Run via bootstrap or provide strapi context.'
    );
  }

  const entityService = strapiInstance.entityService;

  if (!entityService) {
    throw new Error('Entity service not available.');
  }

  console.log(`🚀 Seeding ${authorsData.length} authors and ${blogPostsData.length} blog posts...`);

  const authorIdMap = new Map<string, number>();

  // Seed authors first
  for (const author of authorsData) {
    const slugSource = author.slug || author.name;
    const slug = slugSource.toLowerCase().replace(/\s+/g, '-');

    const existing = await entityService.findMany('api::author.author', {
      filters: { slug },
      fields: ['id'],
    });

    if (existing && existing.length > 0) {
      authorIdMap.set(slug, existing[0].id);
      console.log(`⏭️  Author ${author.name} already exists`);
      continue;
    }

    const created = await entityService.create('api::author.author', {
      data: {
        name: author.name,
        slug,
        role: author.role,
        bio: author.bio || '',
        linkedinUrl: author.linkedinUrl || null,
        twitterUrl: author.twitterUrl || null,
        websiteUrl: author.websiteUrl || null,
        publishedAt: new Date().toISOString(),
      },
    });

    authorIdMap.set(slug, created.id);
    console.log(`✅ Created author ${author.name}`);
  }

  // Seed posts
  const postIdMap = new Map<string, number>();

  for (const post of blogPostsData) {
    const slugSource = post.slug || post.title;
    const slug = slugSource.toLowerCase().replace(/\s+/g, '-');

    const existing = await entityService.findMany('api::blog-post.blog-post', {
      filters: { slug },
      fields: ['id'],
    });

    if (existing && existing.length > 0) {
      postIdMap.set(slug, existing[0].id);
      console.log(`⏭️  Blog post ${post.title} already exists`);
      continue;
    }

    const authorId = authorIdMap.get(post.authorSlug);

    if (!authorId) {
      console.warn(`⚠️  Skipping ${post.title}; author ${post.authorSlug} not found`);
      continue;
    }

    const minimalData: Record<string, any> = {
      title: post.title,
      slug,
      excerpt: post.excerpt,
      content: post.content,
      heroKicker: post.heroKicker || null,
      heroDescription: post.heroDescription || null,
      readingTime: post.readingTime || 6,
      featured: Boolean(post.featured),
      tags: post.tags || [],
      heroVideoUrl: post.heroVideoUrl || null,
      seoTitle: post.seoTitle || post.title,
      seoDescription: post.seoDescription || post.excerpt,
      ctaLabel: post.ctaLabel || null,
      ctaLink: post.ctaLink || null,
      keyTakeaways: post.keyTakeaways || [],
      author: authorId,
      contentSections: (post.contentSections || []).map((section) => ({
        ...section,
      })),
      pullQuote: post.pullQuote || null,
      impactStats: (post.impactStats || []).map((stat) => ({
        ...stat,
      })),
      // Don't publish yet - we'll publish after linking relations
    };

    const createdPost = await entityService.create('api::blog-post.blog-post', {
      data: minimalData,
    });

    postIdMap.set(slug, createdPost.id);
    console.log(`✅ Created blog post ${post.title} (as draft)`);
  }

  // Link related posts (while still drafts, like services seed)
  console.log('\n🔗 Linking related posts...');
  for (const post of blogPostsData) {
    const slug = (post.slug || post.title).toLowerCase().replace(/\s+/g, '-');
    const postId = postIdMap.get(slug);
    if (!postId || !post.relatedSlugs || post.relatedSlugs.length === 0) continue;

    // Normalize related slugs the same way we normalize main post slugs
    const relatedIds: number[] = [];
    for (const relatedSlug of post.relatedSlugs) {
      const normalizedSlug = relatedSlug.toLowerCase().replace(/\s+/g, '-');
      const relatedId = postIdMap.get(normalizedSlug);
      
      if (!relatedId) {
        console.warn(`⚠️  Related post "${relatedSlug}" (normalized: "${normalizedSlug}") not found for "${post.title}"`);
        continue;
      }

      // Verify the related post actually exists in the database
      try {
        const existing = await entityService.findOne('api::blog-post.blog-post', relatedId, {
          fields: ['id'],
        });
        if (existing) {
          relatedIds.push(relatedId);
        } else {
          console.warn(`⚠️  Related post ID ${relatedId} (slug: "${normalizedSlug}") does not exist in database`);
        }
      } catch (error: any) {
        console.warn(`⚠️  Could not verify related post ID ${relatedId} (slug: "${normalizedSlug}"):`, error.message);
      }
    }

    if (relatedIds.length === 0) {
      console.log(`⏭️  No valid related posts to link for "${post.title}"`);
      continue;
    }

    try {
      await entityService.update('api::blog-post.blog-post', postId, {
        data: {
          relatedPosts: relatedIds,
        },
      });
      console.log(`🔗 Linked ${relatedIds.length} related posts for "${post.title}"`);
    } catch (error: any) {
      console.error(`❌ Failed to link related posts for "${post.title}":`, error.message);
      // Continue with other posts even if one fails
    }
  }

  // Publish all posts AFTER relations are set (like services seed)
  console.log('\n📢 Publishing all blog posts...');
  let published = 0;
  let alreadyPublished = 0;
  for (const post of blogPostsData) {
    const slug = (post.slug || post.title).toLowerCase().replace(/\s+/g, '-');
    const postId = postIdMap.get(slug);
    if (!postId) continue;

    try {
      // Check if already published
      const existing = await entityService.findOne('api::blog-post.blog-post', postId, {
        fields: ['id', 'publishedAt'],
      });
      
      if (existing?.publishedAt) {
        alreadyPublished++;
        continue;
      }

      await entityService.update('api::blog-post.blog-post', postId, {
        data: {
          publishedAt: new Date().toISOString(),
        },
      });
      published++;
    } catch (error: any) {
      console.error(`❌ Error publishing "${post.title}":`, error.message);
    }
  }
  if (published > 0) {
    console.log(`   ✅ Published ${published} blog posts`);
  }
  if (alreadyPublished > 0) {
    console.log(`   ⏭️  ${alreadyPublished} posts were already published`);
  }

  console.log('\n✨ Blog seeding complete!');
}


