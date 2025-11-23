/**
 * CMS-enabled service functions for Server Components
 * Uses React cache() for request deduplication and memoization
 * Falls back to static data if CMS is unavailable
 */

import { cache } from 'react';
import { getAllServicesFromCMS, getServiceBySlugFromCMS } from './graphql/services';
import { getAllServices, getServiceBySlug } from './services';
import type { ServiceDetail } from './services';

// Feature flag: Use CMS if enabled
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';

/**
 * Get all services from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getAllServicesCached = cache(async (): Promise<ServiceDetail[]> => {
  if (USE_CMS) {
    try {
      const services = await getAllServicesFromCMS();
      if (services.length > 0) {
        return services;
      }
    } catch (error) {
      console.warn('Failed to fetch services from CMS, falling back to static data:', error);
    }
  }
  
  // Fallback to static data
  return getAllServices();
});

/**
 * Get service by slug from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getServiceBySlugCached = cache(async (slug: string): Promise<ServiceDetail | undefined> => {
  if (USE_CMS) {
    try {
      const service = await getServiceBySlugFromCMS(slug);
      if (service) {
        return service;
      }
    } catch (error) {
      console.warn(`Failed to fetch service "${slug}" from CMS, falling back to static data:`, error);
    }
  }
  
  // Fallback to static data
  return getServiceBySlug(slug);
});

/**
 * Get related services (uses cached service data)
 */
export async function getRelatedServicesCached(
  currentSlug: string,
  limit: number = 3
): Promise<ServiceDetail[]> {
  const currentService = await getServiceBySlugCached(currentSlug);
  if (!currentService) return [];

  const allServices = await getAllServicesCached();
  return allServices
    .filter((service) => currentService.relatedServices.includes(service.slug))
    .slice(0, limit);
}

