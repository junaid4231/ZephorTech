/**
 * Service-related GraphQL queries
 * Uses generated types and transforms responses to match application data structures
 */

import { fetchGraphQL } from './client';
import { transformGraphQLServiceToServiceDetail } from './transformers';
import type { ServiceDetail } from '../services';
import type { GetAllServicesQuery, GetServiceBySlugQuery } from './generated/operations';

// Import GraphQL query strings
const GET_ALL_SERVICES_QUERY = `
  query GetAllServices {
    services {
      documentId
      title
      slug
      shortDescription
      fullDescription
      iconName
      heroStats
      features {
        icon
        title
        description
      }
      useCases {
        industry
        title
        description
        examples
      }
      techStack
      process {
        step
        title
        description
        duration
      }
      faq {
        question
        answer
      }
      benefits
      seoTitle
      seoDescription
      order
      publishedAt
      relatedServices {
        documentId
        title
        slug
      }
    }
  }
`;

const GET_SERVICE_BY_SLUG_QUERY = `
  query GetServiceBySlug($slug: String!) {
    services(filters: { slug: { eq: $slug } }) {
      documentId
      title
      slug
      shortDescription
      fullDescription
      iconName
      heroStats
      features {
        icon
        title
        description
      }
      useCases {
        industry
        title
        description
        examples
      }
      techStack
      process {
        step
        title
        description
        duration
      }
      faq {
        question
        answer
      }
      benefits
      seoTitle
      seoDescription
      order
      publishedAt
      relatedServices {
        documentId
        title
        slug
        shortDescription
      }
    }
  }
`;

/**
 * Fetch all services from CMS
 * Returns services sorted by order, filtered to only published services
 */
export async function getAllServicesFromCMS(): Promise<ServiceDetail[]> {
  try {
    const result = await fetchGraphQL<GetAllServicesQuery>(GET_ALL_SERVICES_QUERY);
    
    if (!result.data?.services) {
      console.warn('No services data returned from CMS');
      return [];
    }

    if (!result.data?.services) {
      return [];
    }

    // Transform and filter services
    const services = result.data.services
      .map((service) => transformGraphQLServiceToServiceDetail(service))
      .filter((service): service is ServiceDetail => service !== null)
      // Only include published services
      .filter((service) => {
        // Check if service has publishedAt (means it's published)
        const graphQLService = result.data?.services?.find(
          (s) => s?.documentId === service.id
        );
        return graphQLService?.publishedAt != null;
      })
      // Sort by order
      .sort((a, b) => {
        const orderA = result.data?.services?.find((s) => s?.documentId === a.id)?.order || 0;
        const orderB = result.data?.services?.find((s) => s?.documentId === b.id)?.order || 0;
        return orderA - orderB;
      });

    return services;
  } catch (error) {
    console.error('Error fetching services from CMS:', error);
    throw error;
  }
}

/**
 * Fetch a single service by slug from CMS
 */
export async function getServiceBySlugFromCMS(slug: string): Promise<ServiceDetail | null> {
  try {
    const result = await fetchGraphQL<GetServiceBySlugQuery>(
      GET_SERVICE_BY_SLUG_QUERY,
      { slug }
    );

    if (!result.data?.services || result.data.services.length === 0) {
      return null;
    }

    const service = result.data.services[0];
    if (!service || !service.publishedAt) {
      return null; // Service not found or not published
    }

    return transformGraphQLServiceToServiceDetail(service);
  } catch (error) {
    console.error(`Error fetching service "${slug}" from CMS:`, error);
    throw error;
  }
}
