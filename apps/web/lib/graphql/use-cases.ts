/**
 * Use Case-related GraphQL queries
 * Uses generated types and transforms responses to match application data structures
 */

import { fetchGraphQL } from './client';
import type { GetAllUseCasesQuery, GetFeaturedUseCasesQuery, GetUseCaseBySlugQuery } from './generated/operations';

const GET_ALL_USE_CASES_QUERY = `
  query GetAllUseCases {
    useCases(sort: "order:asc") {
      documentId
      title
      slug
      industry
      description
      examples
      icon
      image {
        url
        alternativeText
      }
      order
      featured
      publishedAt
      services {
        documentId
        title
        slug
      }
    }
  }
`;

const GET_FEATURED_USE_CASES_QUERY = `
  query GetFeaturedUseCases {
    useCases(filters: { featured: { eq: true } }, sort: "order:asc") {
      documentId
      title
      slug
      industry
      description
      examples
      icon
      image {
        url
        alternativeText
      }
      order
      featured
      publishedAt
      services {
        documentId
        title
        slug
      }
    }
  }
`;

const GET_USE_CASE_BY_SLUG_QUERY = `
  query GetUseCaseBySlug($slug: String!) {
    useCases(filters: { slug: { eq: $slug } }) {
      documentId
      title
      slug
      industry
      description
      examples
      icon
      image {
        url
        alternativeText
      }
      order
      featured
      publishedAt
      services {
        documentId
        title
        slug
        shortDescription
      }
    }
  }
`;

/**
 * Fetch all use cases from CMS
 * Returns use cases sorted by order, filtered to only published use cases
 */
export async function getAllUseCasesFromCMS(): Promise<GetAllUseCasesQuery['useCases']> {
  try {
    const result = await fetchGraphQL<GetAllUseCasesQuery>(GET_ALL_USE_CASES_QUERY);
    
    if (!result.data?.useCases) {
      console.warn('No use cases data returned from CMS');
      return [];
    }

    // Filter out nulls and only return published use cases
    return result.data.useCases
      .filter((uc): uc is NonNullable<typeof uc> => uc !== null)
      .filter((uc) => uc.publishedAt != null);
  } catch (error) {
    console.error('Error fetching use cases from CMS:', error);
    throw error;
  }
}

/**
 * Fetch featured use cases from CMS
 */
export async function getFeaturedUseCasesFromCMS(): Promise<GetFeaturedUseCasesQuery['useCases']> {
  try {
    const result = await fetchGraphQL<GetFeaturedUseCasesQuery>(GET_FEATURED_USE_CASES_QUERY);
    
    if (!result.data?.useCases) {
      console.warn('No featured use cases data returned from CMS');
      return [];
    }

    // Filter out nulls and only return published use cases
    return result.data.useCases
      .filter((uc): uc is NonNullable<typeof uc> => uc !== null)
      .filter((uc) => uc.publishedAt != null);
  } catch (error) {
    console.error('Error fetching featured use cases from CMS:', error);
    throw error;
  }
}

/**
 * Fetch a single use case by slug from CMS
 */
export async function getUseCaseBySlugFromCMS(slug: string): Promise<GetUseCaseBySlugQuery['useCases'][number] | null> {
  try {
    const result = await fetchGraphQL<GetUseCaseBySlugQuery>(GET_USE_CASE_BY_SLUG_QUERY, { slug });
    
    if (!result.data?.useCases || result.data.useCases.length === 0) {
      return null;
    }

    const useCase = result.data.useCases[0];
    
    // Only return if published
    if (!useCase || !useCase.publishedAt) {
      return null;
    }

    return useCase;
  } catch (error) {
    console.error(`Error fetching use case "${slug}" from CMS:`, error);
    throw error;
  }
}

