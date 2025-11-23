/**
 * Testimonial-related GraphQL queries
 * Uses generated types and transforms responses to match application data structures
 */

import { fetchGraphQL } from './client';
import type { GetAllTestimonialsQuery, GetFeaturedTestimonialsQuery } from './generated/operations';

const GET_ALL_TESTIMONIALS_QUERY = `
  query GetAllTestimonials {
    testimonials(sort: "order:asc") {
      documentId
      clientName
      role
      company
      quote
      rating
      featured
      order
      avatar {
        url
        alternativeText
      }
      companyLogo {
        url
        alternativeText
      }
    }
  }
`;

const GET_FEATURED_TESTIMONIALS_QUERY = `
  query GetFeaturedTestimonials {
    testimonials(filters: { featured: { eq: true } }, sort: "order:asc") {
      documentId
      clientName
      role
      company
      quote
      rating
      featured
      order
      avatar {
        url
        alternativeText
      }
      companyLogo {
        url
        alternativeText
      }
    }
  }
`;

/**
 * Fetch all testimonials from CMS
 * Returns testimonials sorted by order
 */
export async function getAllTestimonialsFromCMS(): Promise<GetAllTestimonialsQuery['testimonials']> {
  try {
    const result = await fetchGraphQL<GetAllTestimonialsQuery>(GET_ALL_TESTIMONIALS_QUERY);
    
    if (!result.data?.testimonials) {
      console.warn('No testimonials data returned from CMS');
      return [];
    }

    // Filter out nulls and return
    return result.data.testimonials.filter(
      (t): t is NonNullable<typeof t> => t !== null
    );
  } catch (error) {
    console.error('Error fetching testimonials from CMS:', error);
    throw error;
  }
}

/**
 * Fetch featured testimonials from CMS
 */
export async function getFeaturedTestimonialsFromCMS(): Promise<GetFeaturedTestimonialsQuery['testimonials']> {
  try {
    const result = await fetchGraphQL<GetFeaturedTestimonialsQuery>(GET_FEATURED_TESTIMONIALS_QUERY);
    
    if (!result.data?.testimonials) {
      console.warn('No featured testimonials data returned from CMS');
      return [];
    }

    // Filter out nulls and return
    return result.data.testimonials.filter(
      (t): t is NonNullable<typeof t> => t !== null
    );
  } catch (error) {
    console.error('Error fetching featured testimonials from CMS:', error);
    throw error;
  }
}
