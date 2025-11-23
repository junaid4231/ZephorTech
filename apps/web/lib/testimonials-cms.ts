/**
 * CMS-enabled testimonial functions for Server Components
 * Uses React cache() for request deduplication and memoization
 * Falls back to static data if CMS is unavailable
 */

import { cache } from 'react';
import { getAllTestimonialsFromCMS, getFeaturedTestimonialsFromCMS } from './graphql/testimonials';
import { transformGraphQLTestimonial } from './graphql/testimonial-transformer';
import type { AppTestimonial } from './graphql/testimonial-transformer';

// Feature flag: Use CMS if enabled
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';

// Static fallback data (from sections/Testimonials.tsx)
const staticTestimonials: AppTestimonial[] = [
  {
    id: "1",
    clientName: "Sarah Chen",
    role: "CEO",
    company: "TechCorp",
    quote:
      "ZephorTech transformed our entire digital infrastructure. Their AI-powered solutions increased our efficiency by 300% and reduced costs significantly. Exceptional team!",
    rating: 5,
    featured: true,
    order: 1,
    initials: "SC",
  },
  {
    id: "2",
    clientName: "Michael Rodriguez",
    role: "CTO",
    company: "InnovateLab",
    quote:
      "Working with ZephorTech was a game-changer. They delivered a cutting-edge SaaS platform that scaled perfectly with our growth. Professional, innovative, and results-driven.",
    rating: 5,
    featured: true,
    order: 2,
    initials: "MR",
  },
  {
    id: "3",
    clientName: "Emily Watson",
    role: "Product Director",
    company: "DigitalFlow",
    quote:
      "The mobile app they built exceeded all expectations. User engagement skyrocketed, and the technical execution was flawless. Highly recommend their services!",
    rating: 5,
    featured: true,
    order: 3,
    initials: "EW",
  },
  {
    id: "4",
    clientName: "David Kim",
    role: "Founder",
    company: "CloudScale",
    quote:
      "Outstanding cloud infrastructure setup. The team's expertise in DevOps and automation saved us months of development time. Highly professional!",
    rating: 5,
    featured: false,
    order: 4,
    initials: "DK",
  },
  {
    id: "5",
    clientName: "Lisa Anderson",
    role: "CMO",
    company: "DataVault",
    quote:
      "Their e-commerce solution transformed our online presence. Sales increased dramatically and the user experience is exceptional. Best investment we made!",
    rating: 5,
    featured: false,
    order: 5,
    initials: "LA",
  },
  {
    id: "6",
    clientName: "James Wilson",
    role: "CTO",
    company: "NextGen",
    quote:
      "ZephorTech's web development team delivered beyond expectations. The platform is fast, scalable, and beautifully designed. Couldn't be happier!",
    rating: 5,
    featured: false,
    order: 6,
    initials: "JW",
  },
];

/**
 * Get all testimonials from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getAllTestimonialsCached = cache(async (): Promise<AppTestimonial[]> => {
  if (USE_CMS) {
    try {
      const testimonials = await getAllTestimonialsFromCMS();
      if (testimonials.length > 0) {
        return testimonials
          .map(transformGraphQLTestimonial)
          .filter((t): t is AppTestimonial => t !== null);
      }
    } catch (error) {
      console.warn('Failed to fetch testimonials from CMS, falling back to static data:', error);
    }
  }
  
  // Fallback to static data
  return staticTestimonials;
});

/**
 * Get featured testimonials from CMS (cached for request deduplication)
 * Falls back to all static testimonials if CMS is disabled or unavailable
 */
export const getFeaturedTestimonialsCached = cache(async (): Promise<AppTestimonial[]> => {
  if (USE_CMS) {
    try {
      const testimonials = await getFeaturedTestimonialsFromCMS();
      if (testimonials.length > 0) {
        return testimonials
          .map(transformGraphQLTestimonial)
          .filter((t): t is AppTestimonial => t !== null);
      }
    } catch (error) {
      console.warn('Failed to fetch featured testimonials from CMS, falling back to static data:', error);
    }
  }
  
  // Fallback to all static testimonials
  return staticTestimonials;
});

