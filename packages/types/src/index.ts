/**
 * Shared TypeScript Types for ZephorTech
 * Export all shared type definitions from this file
 */

// CMS Content Types

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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: Author;
  category: string;
  tags: string[];
  content: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order?: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  logo?: string;
  rating?: number;
  createdAt: string;
}

export interface Technology {
  id: string;
  name: string;
  logo: string;
  category: "frontend" | "backend" | "cloud" | "database" | "tool";
  description?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
  serviceInterest?: string;
  budgetRange?: string;
  phone?: string;
}

export interface SiteSettings {
  id: string;
  siteTitle: string;
  siteDescription: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
  footerText: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
}

// API Response Types

export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// Form Types

export interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  serviceInterest: string;
  budgetRange: string;
  timeline: string;
  description: string;
  file?: File;
}

