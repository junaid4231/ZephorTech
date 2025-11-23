/**
 * CMS-enabled blog functions for Server Components
 * Uses React cache() for request deduplication and memoization
 * Falls back to static data if CMS is unavailable
 */

import { cache } from "react";
import {
  getAllBlogPostsFromCMS,
  getBlogPostBySlugFromCMS,
  getFeaturedBlogPostsFromCMS,
} from "./graphql/blog";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getFeaturedBlogPosts,
} from "./blog-fallback";
import type { BlogListItem, BlogPost } from "./blog";

// Feature flag: Use CMS if enabled
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === "true";

/**
 * Get all blog posts from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getAllBlogPostsCached = cache(async (): Promise<BlogListItem[]> => {
  if (USE_CMS) {
    try {
      const posts = await getAllBlogPostsFromCMS();
      if (posts.length > 0) {
        return posts;
      }
    } catch (error) {
      console.warn(
        "Failed to fetch blog posts from CMS, falling back to static data:",
        error
      );
    }
  }

  // Fallback to static data
  return getAllBlogPosts();
});

/**
 * Get blog post by slug from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getBlogPostBySlugCached = cache(
  async (slug: string): Promise<BlogPost | null> => {
    if (USE_CMS) {
      try {
        const post = await getBlogPostBySlugFromCMS(slug);
        if (post) {
          return post;
        }
      } catch (error) {
        console.warn(
          `Failed to fetch blog post "${slug}" from CMS, falling back to static data:`,
          error
        );
      }
    }

    // Fallback to static data
    return getBlogPostBySlug(slug);
  }
);

/**
 * Get featured blog posts from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getFeaturedBlogPostsCached = cache(
  async (limit: number = 3): Promise<BlogListItem[]> => {
    if (USE_CMS) {
      try {
        const posts = await getFeaturedBlogPostsFromCMS(limit);
        if (posts.length > 0) {
          return posts;
        }
      } catch (error) {
        console.warn(
          "Failed to fetch featured blog posts from CMS, falling back to static data:",
          error
        );
      }
    }

    // Fallback to static data
    return getFeaturedBlogPosts(limit);
  }
);

