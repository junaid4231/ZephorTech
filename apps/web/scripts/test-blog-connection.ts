/**
 * Test script to verify blog CMS connection
 * Run with: pnpm tsx scripts/test-blog-connection.ts
 */

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

const TEST_QUERY = `
  query TestBlogConnection {
    blogPosts(pagination: { limit: 3 }) {
      documentId
      title
      slug
      relatedPosts {
        documentId
        title
        slug
      }
    }
    authors(pagination: { limit: 1 }) {
      documentId
      name
      slug
    }
  }
`;

async function testConnection() {
  console.log('🔍 Testing blog CMS connection...\n');
  console.log(`CMS URL: ${CMS_URL}`);
  console.log(`API Token: ${API_TOKEN ? '✅ Set' : '❌ Missing'}\n`);

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const response = await fetch(`${CMS_URL}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: TEST_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('❌ GraphQL Errors:');
      result.errors.forEach((err: any) => {
        console.error(`   - ${err.message}`);
      });
      return false;
    }

    const blogCount = result.data?.blogPosts?.length || 0;
    const authorCount = result.data?.authors?.length || 0;
    const postsWithRelations = result.data?.blogPosts?.filter((post: any) => 
      post.relatedPosts && post.relatedPosts.length > 0
    ).length || 0;

    console.log('✅ Connection successful!\n');
    console.log(`📝 Blog Posts: ${blogCount}`);
    console.log(`👤 Authors: ${authorCount}`);
    console.log(`🔗 Posts with related posts: ${postsWithRelations}\n`);
    
    if (blogCount > 0) {
      console.log('📋 Sample blog posts:');
      result.data.blogPosts.slice(0, 3).forEach((post: any) => {
        console.log(`   - ${post.title}`);
        if (post.relatedPosts && post.relatedPosts.length > 0) {
          console.log(`     Related: ${post.relatedPosts.map((r: any) => r.title).join(', ')}`);
        }
      });
      console.log('');
    }

    if (blogCount === 0) {
      console.log('⚠️  No blog posts found. You need to seed the blog data.');
      console.log('\nTo seed blog data:');
      console.log('1. Add SEED_BLOG=true to apps/cms/.env');
      console.log('2. Restart Strapi (pnpm dev in apps/cms)');
      console.log('3. The seed script will run automatically on startup\n');
    }

    if (authorCount === 0) {
      console.log('⚠️  No authors found. Blog seeding will create authors automatically.\n');
    }

    return true;
  } catch (error: any) {
    console.error('❌ Connection failed:');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
      console.log('💡 Make sure Strapi is running:');
      console.log('   cd apps/cms && pnpm dev\n');
    }

    return false;
  }
}

testConnection().then((success) => {
  process.exit(success ? 0 : 1);
});

