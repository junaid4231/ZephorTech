import { fetchGraphQL } from "./client";
import {
  transformBlogPostDetail,
  transformBlogPostListItem,
} from "./blog-transformer";
import type {
  GetAllBlogPostsQuery,
  GetBlogPostBySlugQuery,
  GetFeaturedBlogPostsQuery,
} from "./generated/operations";
import type { BlogListItem, BlogPost } from "../blog";

const GET_ALL_BLOG_POSTS = `
  query GetAllBlogPosts {
    blogPosts(sort: ["publishedAt:desc"]) {
      documentId
      title
      slug
      excerpt
      heroKicker
      heroDescription
      readingTime
      featured
      tags
      keyTakeaways
      publishedAt
      heroVideoUrl
      seoTitle
      seoDescription
      ctaLabel
      ctaLink
      author {
        documentId
        name
        slug
        role
        bio
        avatar {
          url
        }
        linkedinUrl
        twitterUrl
        websiteUrl
      }
    }
  }
`;

const GET_BLOG_POST_BY_SLUG = `
  query GetBlogPostBySlug($slug: String!) {
    blogPosts(filters: { slug: { eq: $slug } }, pagination: { pageSize: 1 }) {
      documentId
      title
      slug
      excerpt
      heroKicker
      heroDescription
      readingTime
      featured
      tags
      keyTakeaways
      publishedAt
      heroVideoUrl
      seoTitle
      seoDescription
      ctaLabel
      ctaLink
      content
      contentSections {
        eyebrow
        title
        description
        bullets
        mediaUrl
        mediaCaption
        layout
        highlight
      }
      pullQuote {
        quote
        attribution
        title
      }
      impactStats {
        label
        value
        description
      }
      author {
        documentId
        name
        slug
        role
        bio
        avatar {
          url
        }
        linkedinUrl
        twitterUrl
        websiteUrl
      }
      relatedPosts {
        documentId
        title
        slug
        excerpt
        heroKicker
        readingTime
        tags
        keyTakeaways
        author {
          documentId
          name
          role
        }
      }
    }
  }
`;

const GET_FEATURED_BLOG_POSTS = `
  query GetFeaturedBlogPosts($limit: Int = 3) {
    blogPosts(
      filters: { featured: { eq: true } }
      pagination: { pageSize: $limit }
      sort: ["publishedAt:desc"]
    ) {
      documentId
      title
      slug
      excerpt
      heroKicker
      heroDescription
      readingTime
      featured
      tags
      keyTakeaways
      publishedAt
      heroVideoUrl
      seoTitle
      seoDescription
      ctaLabel
      ctaLink
      author {
        documentId
        name
        slug
        role
        bio
        avatar {
          url
        }
        linkedinUrl
        twitterUrl
        websiteUrl
      }
    }
  }
`;

export async function getAllBlogPostsFromCMS(): Promise<BlogListItem[]> {
  const result = await fetchGraphQL<GetAllBlogPostsQuery>(GET_ALL_BLOG_POSTS);
  const posts = result.data?.blogPosts ?? [];
  return posts
    .filter((post) => Boolean(post?.publishedAt))
    .map((post) => transformBlogPostListItem(post))
    .filter((post): post is BlogListItem => post !== null);
}

export async function getBlogPostBySlugFromCMS(slug: string): Promise<BlogPost | null> {
  const result = await fetchGraphQL<GetBlogPostBySlugQuery>(GET_BLOG_POST_BY_SLUG, { slug });
  const post = result.data?.blogPosts?.[0];
  if (!post || !post.publishedAt) {
    return null;
  }
  return transformBlogPostDetail(post);
}

export async function getFeaturedBlogPostsFromCMS(limit = 3): Promise<BlogListItem[]> {
  const result = await fetchGraphQL<GetFeaturedBlogPostsQuery>(GET_FEATURED_BLOG_POSTS, {
    limit,
  });
  const posts = result.data?.blogPosts ?? [];
  return posts
    .filter((post) => Boolean(post?.publishedAt))
    .map((post) => transformBlogPostListItem(post))
    .filter((post): post is BlogListItem => post !== null);
}


