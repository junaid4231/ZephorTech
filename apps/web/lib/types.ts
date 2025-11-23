/**
 * Application-specific type definitions
 */

export interface Service {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  features: string[];
  icon?: string;
  heroImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  order?: number;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  images: string[];
  date: string;
  outcomeMetrics?: Record<string, string>;
}

// Legacy BlogPost interface - use BlogPost from ./blog instead
// export interface BlogPost {
//   id: string;
//   title: string;
//   slug: string;
//   author: string;
//   category: string;
//   tags: string[];
//   content: string;
//   excerpt: string;
//   featuredImage: string;
//   publishedAt: string;
//   seoTitle?: string;
//   seoDescription?: string;
// }

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
  serviceInterest?: string;
  budgetRange?: string;
}

