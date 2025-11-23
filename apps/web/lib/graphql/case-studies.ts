/**
 * Case Study-related GraphQL queries
 * Uses generated types and transforms responses to match application data structures
 */

import { fetchGraphQL } from './client';
import type { GetAllCaseStudiesQuery, GetFeaturedCaseStudiesQuery, GetCaseStudyBySlugQuery } from './generated/operations';

const GET_ALL_CASE_STUDIES_QUERY = `
  query GetAllCaseStudies {
    caseStudies(sort: "order:asc") {
      documentId
      title
      slug
      client
      industry
      summary
      excerpt
      timeline
      headquarters
      heroSubtitle
      heroDescription
      heroStats
      highlights
      metrics
      challenge
      strategy
      outcome
      testimonial
      technologies
      order
      featured
      publishedAt
      seoTitle
      seoDescription
      services {
        documentId
        title
        slug
      }
    }
  }
`;

const GET_FEATURED_CASE_STUDIES_QUERY = `
  query GetFeaturedCaseStudies {
    caseStudies(filters: { featured: { eq: true } }, sort: "order:asc") {
      documentId
      title
      slug
      client
      industry
      summary
      excerpt
      timeline
      headquarters
      heroSubtitle
      heroDescription
      heroStats
      highlights
      metrics
      challenge
      strategy
      outcome
      testimonial
      technologies
      order
      featured
      publishedAt
      seoTitle
      seoDescription
      services {
        documentId
        title
        slug
      }
    }
  }
`;

const GET_CASE_STUDY_BY_SLUG_QUERY = `
  query GetCaseStudyBySlug($slug: String!) {
    caseStudies(filters: { slug: { eq: $slug } }) {
      documentId
      title
      slug
      client
      industry
      summary
      excerpt
      timeline
      headquarters
      heroSubtitle
      heroDescription
      heroStats
      highlights
      metrics
      challenge
      strategy
      outcome
      testimonial
      technologies
      order
      featured
      publishedAt
      seoTitle
      seoDescription
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
 * Fetch all case studies from CMS
 * Returns case studies sorted by order, filtered to only published case studies
 */
export async function getAllCaseStudiesFromCMS(): Promise<GetAllCaseStudiesQuery['caseStudies']> {
  try {
    const result = await fetchGraphQL<GetAllCaseStudiesQuery>(GET_ALL_CASE_STUDIES_QUERY);
    
    if (!result.data?.caseStudies) {
      console.warn('No case studies data returned from CMS');
      return [];
    }

    // Filter out nulls and only return published case studies
    return result.data.caseStudies
      .filter((cs): cs is NonNullable<typeof cs> => cs !== null)
      .filter((cs) => cs.publishedAt != null);
  } catch (error) {
    console.error('Error fetching case studies from CMS:', error);
    throw error;
  }
}

/**
 * Fetch featured case studies from CMS
 */
export async function getFeaturedCaseStudiesFromCMS(): Promise<GetFeaturedCaseStudiesQuery['caseStudies']> {
  try {
    const result = await fetchGraphQL<GetFeaturedCaseStudiesQuery>(GET_FEATURED_CASE_STUDIES_QUERY);
    
    if (!result.data?.caseStudies) {
      console.warn('No featured case studies data returned from CMS');
      return [];
    }

    // Filter out nulls and only return published case studies
    return result.data.caseStudies
      .filter((cs): cs is NonNullable<typeof cs> => cs !== null)
      .filter((cs) => cs.publishedAt != null);
  } catch (error) {
    console.error('Error fetching featured case studies from CMS:', error);
    throw error;
  }
}

/**
 * Fetch a single case study by slug from CMS
 */
export async function getCaseStudyBySlugFromCMS(slug: string): Promise<GetCaseStudyBySlugQuery['caseStudies'][number] | null> {
  try {
    const result = await fetchGraphQL<GetCaseStudyBySlugQuery>(GET_CASE_STUDY_BY_SLUG_QUERY, { slug });
    
    if (!result.data?.caseStudies || result.data.caseStudies.length === 0) {
      return null;
    }

    const caseStudy = result.data.caseStudies[0];
    
    // Only return if published
    if (!caseStudy || !caseStudy.publishedAt) {
      return null;
    }

    return caseStudy;
  } catch (error) {
    console.error(`Error fetching case study "${slug}" from CMS:`, error);
    throw error;
  }
}

