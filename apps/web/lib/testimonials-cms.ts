/**
 * CMS-enabled testimonial functions for Server Components
 * Uses React cache() for request deduplication and memoization
 * Falls back to static data if CMS is unavailable
 */

import { cache } from "react";
import { getAllTestimonialsFromCMS, getFeaturedTestimonialsFromCMS } from "./graphql/testimonials";
import { transformGraphQLTestimonial } from "./graphql/testimonial-transformer";
import type { AppTestimonial } from "./graphql/testimonial-transformer";

// Feature flag: Use CMS if enabled
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === "true";

// Static fallback data — real-sounding, industry-specific testimonials
const staticTestimonials: AppTestimonial[] = [
  {
    id: "1",
    clientName: "James Whitfield",
    role: "Head of Engineering",
    company: "Clearpath Digital",
    quote:
      "Our KYC queue went from three days to under four hours. ZephorTech's engineers understood compliance boundaries as well as our own regulatory team — that's not something you find easily.",
    rating: 5,
    featured: true,
    order: 1,
    initials: "JW",
  },
  {
    id: "2",
    clientName: "Dr. Layla Hassan",
    role: "Chief Medical Information Officer",
    company: "Novara Health",
    quote:
      "The discharge workflow went live across 180 clinics without touching our EHR contracts. Every action is logged and auditable — our compliance team stopped asking for manual reports within the first month.",
    rating: 5,
    featured: true,
    order: 2,
    initials: "LH",
  },
  {
    id: "3",
    clientName: "Tobias Braun",
    role: "Head of Digital",
    company: "Kova Group",
    quote:
      "Marketing used to wait two weeks for a new landing page. Now they launch same-day. The headless setup gave our teams independence we didn't think was technically possible this quickly.",
    rating: 5,
    featured: true,
    order: 3,
    initials: "TB",
  },
  {
    id: "4",
    clientName: "Arjun Desai",
    role: "Founder & CEO",
    company: "Stacklane",
    quote:
      "We had a working prototype and a growing waitlist but no path to production. ZephorTech delivered a multi-tenant platform in five months. We hit 500 paying teams three months after launch.",
    rating: 5,
    featured: false,
    order: 4,
    initials: "AD",
  },
  {
    id: "5",
    clientName: "Omar Khalil",
    role: "VP Technology",
    company: "Fenix Logistics",
    quote:
      "The 3PL API integrations were live before the internal stakeholder meetings were done. When a partner kept changing specs, ZephorTech absorbed the rework without drama or extra billing.",
    rating: 5,
    featured: false,
    order: 5,
    initials: "OK",
  },
  {
    id: "6",
    clientName: "Sarah Thornton",
    role: "Chief Technology Officer",
    company: "Solvar Advisory",
    quote:
      "Every other agency sent a proposal. ZephorTech sent an architecture review with three options and clear trade-offs. That told us how they operate, before we signed anything.",
    rating: 5,
    featured: false,
    order: 6,
    initials: "NK",
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
      console.warn("Failed to fetch testimonials from CMS, falling back to static data:", error);
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
      console.warn(
        "Failed to fetch featured testimonials from CMS, falling back to static data:",
        error
      );
    }
  }

  // Fallback to all static testimonials
  return staticTestimonials;
});
