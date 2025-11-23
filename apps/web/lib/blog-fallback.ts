/**
 * Static fallback blog data
 * Used when CMS is disabled or unavailable
 */

import type { BlogListItem, BlogPost, BlogAuthor } from "./blog";

const fallbackAuthor: BlogAuthor = {
  id: "author-1",
  name: "ZephorTech Team",
  slug: "zephortech-team",
  role: "Engineering Team",
  bio: "The ZephorTech engineering team shares insights from building production systems.",
};

export const fallbackBlogPosts: BlogListItem[] = [
  {
    id: "fallback-1",
    slug: "future-of-ai-business-automation",
    title: "The Future of AI in Business Automation",
    excerpt:
      "Discover how AI agents are revolutionizing business processes and creating unprecedented efficiency gains.",
    heroKicker: "AI & Machine Learning",
    heroDescription: "Exploring the transformative power of AI in modern business",
    readingTime: 5,
    featured: true,
    tags: ["AI", "Automation", "Business"],
    keyTakeaways: [
      "AI agents can automate complex workflows",
      "ROI improvements of 300%+ are achievable",
      "Integration strategies for existing systems",
    ],
    publishedAt: "2024-01-15T00:00:00Z",
    author: fallbackAuthor,
  },
  {
    id: "fallback-2",
    slug: "scalable-saas-platforms-best-practices",
    title: "Building Scalable SaaS Platforms: Best Practices",
    excerpt:
      "Learn the architectural patterns and strategies for building SaaS products that scale from startup to enterprise.",
    heroKicker: "SaaS Development",
    heroDescription: "Architectural patterns for high-growth SaaS products",
    readingTime: 8,
    featured: true,
    tags: ["SaaS", "Architecture", "Scaling"],
    keyTakeaways: [
      "Multi-tenant architecture patterns",
      "Database scaling strategies",
      "API design for scale",
    ],
    publishedAt: "2024-01-10T00:00:00Z",
    author: fallbackAuthor,
  },
  {
    id: "fallback-3",
    slug: "nextjs-15-whats-new",
    title: "Next.js 15: What's New and Why It Matters",
    excerpt:
      "Exploring the latest features in Next.js 15 and how they can improve your web development workflow.",
    heroKicker: "Web Development",
    heroDescription: "Deep dive into Next.js 15 features and improvements",
    readingTime: 6,
    featured: true,
    tags: ["Next.js", "React", "Web Development"],
    keyTakeaways: [
      "Server Components improvements",
      "Performance optimizations",
      "Developer experience enhancements",
    ],
    publishedAt: "2024-01-05T00:00:00Z",
    author: fallbackAuthor,
  },
];

/**
 * Get all blog posts (static fallback)
 */
export function getAllBlogPosts(): BlogListItem[] {
  return fallbackBlogPosts;
}

/**
 * Get blog post by slug (static fallback)
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const post = fallbackBlogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  // Convert to full BlogPost with content
  return {
    ...post,
    content: `<p>${post.excerpt}</p><p>This is a fallback blog post. Enable CMS to see full content.</p>`,
    contentSections: [],
    impactStats: [],
    relatedPosts: fallbackBlogPosts.filter((p) => p.id !== post.id).slice(0, 3),
  };
}

/**
 * Get featured blog posts (static fallback)
 */
export function getFeaturedBlogPosts(limit = 3): BlogListItem[] {
  return fallbackBlogPosts.filter((p) => p.featured).slice(0, limit);
}

