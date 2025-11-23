/**
 * CMS-enabled case study functions for Server Components
 * Uses React cache() for request deduplication and memoization
 * Falls back to static data if CMS is unavailable
 */

import { cache } from "react";
import {
  getAllCaseStudiesFromCMS,
  getFeaturedCaseStudiesFromCMS,
  getCaseStudyBySlugFromCMS,
} from "./graphql/case-studies";
import { transformGraphQLCaseStudy } from "./graphql/case-study-transformer";
import { getAllCaseStudies, getCaseStudyBySlug } from "./case-studies";
import type { CaseStudy } from "./case-studies";

// Feature flag: Use CMS if enabled
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === "true";

/**
 * Get all case studies from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getAllCaseStudiesCached = cache(async (): Promise<CaseStudy[]> => {
  if (USE_CMS) {
    try {
      const caseStudies = await getAllCaseStudiesFromCMS();
      if (caseStudies.length > 0) {
        return caseStudies
          .map(transformGraphQLCaseStudy)
          .filter((cs): cs is CaseStudy => cs !== null);
      }
    } catch (error) {
      console.warn("Failed to fetch case studies from CMS, falling back to static data:", error);
    }
  }
  
  // Fallback to static data
  return getAllCaseStudies();
});

/**
 * Get featured case studies from CMS (cached for request deduplication)
 * Falls back to all static case studies if CMS is disabled or unavailable
 */
export const getFeaturedCaseStudiesCached = cache(async (): Promise<CaseStudy[]> => {
  if (USE_CMS) {
    try {
      const caseStudies = await getFeaturedCaseStudiesFromCMS();
      if (caseStudies.length > 0) {
        return caseStudies
          .map(transformGraphQLCaseStudy)
          .filter((cs): cs is CaseStudy => cs !== null);
      }
    } catch (error) {
      console.warn("Failed to fetch featured case studies from CMS, falling back to static data:", error);
    }
  }
  
  // Fallback to all static case studies
  return getAllCaseStudies();
});

/**
 * Get case study by slug from CMS (cached for request deduplication)
 * Falls back to static data if CMS is disabled or unavailable
 */
export const getCaseStudyBySlugCached = cache(async (slug: string): Promise<CaseStudy | undefined> => {
  if (USE_CMS) {
    try {
      const caseStudy = await getCaseStudyBySlugFromCMS(slug);
      if (caseStudy) {
        return transformGraphQLCaseStudy(caseStudy) || undefined;
      }
    } catch (error) {
      console.warn(`Failed to fetch case study "${slug}" from CMS, falling back to static data:`, error);
    }
  }
  
  // Fallback to static data
  return getCaseStudyBySlug(slug);
});

