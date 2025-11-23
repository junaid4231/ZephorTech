/**
 * CMS-enabled use case functions for Server Components
 * Uses React cache() for request deduplication and memoization
 * Falls back to static data if CMS is unavailable
 */

import { cache } from 'react';
import {
  getAllUseCasesFromCMS,
  getFeaturedUseCasesFromCMS,
  getUseCaseBySlugFromCMS,
} from './graphql/use-cases';
import { transformGraphQLUseCase } from './graphql/use-case-transformer';
import type { AppUseCase } from './graphql/use-case-transformer';

// Feature flag: Use CMS if enabled
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';

// Static fallback data (empty array - use cases will be populated from CMS)
const staticUseCases: AppUseCase[] = [];

/**
 * Get all use cases from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getAllUseCasesCached = cache(async (): Promise<AppUseCase[]> => {
  if (USE_CMS) {
    try {
      const useCases = await getAllUseCasesFromCMS();
      if (useCases.length > 0) {
        return useCases
          .map(transformGraphQLUseCase)
          .filter((uc): uc is AppUseCase => uc !== null);
      }
    } catch (error) {
      console.warn('Failed to fetch use cases from CMS, falling back to static data:', error);
    }
  }
  
  // Fallback to static data
  return staticUseCases;
});

/**
 * Get featured use cases from CMS (cached for request deduplication)
 * Falls back to all static use cases if CMS is disabled or unavailable
 */
export const getFeaturedUseCasesCached = cache(async (): Promise<AppUseCase[]> => {
  if (USE_CMS) {
    try {
      const useCases = await getFeaturedUseCasesFromCMS();
      if (useCases.length > 0) {
        return useCases
          .map(transformGraphQLUseCase)
          .filter((uc): uc is AppUseCase => uc !== null);
      }
    } catch (error) {
      console.warn('Failed to fetch featured use cases from CMS, falling back to static data:', error);
    }
  }
  
  // Fallback to all static use cases
  return staticUseCases;
});

/**
 * Get use case by slug from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getUseCaseBySlugCached = cache(async (slug: string): Promise<AppUseCase | null> => {
  if (USE_CMS) {
    try {
      const useCase = await getUseCaseBySlugFromCMS(slug);
      if (useCase) {
        return transformGraphQLUseCase(useCase);
      }
    } catch (error) {
      console.warn(`Failed to fetch use case "${slug}" from CMS, falling back to static data:`, error);
    }
  }
  
  // Fallback to static data
  return staticUseCases.find((uc) => uc.slug === slug) || null;
});

