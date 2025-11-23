/**
 * Transform GraphQL Case Study data to application format
 */

import type {
  GetAllCaseStudiesQuery,
  GetFeaturedCaseStudiesQuery,
  GetCaseStudyBySlugQuery,
} from './generated/operations';
import type {
  CaseStudy,
  CaseStudyStat,
  CaseStudyMetric,
  CaseStudySection,
  CaseStudyTestimonial,
} from '../case-studies';

/**
 * Transform a GraphQL case study to application format
 */
export function transformGraphQLCaseStudy(
  caseStudy:
    | GetAllCaseStudiesQuery['caseStudies'][number]
    | GetFeaturedCaseStudiesQuery['caseStudies'][number]
    | GetCaseStudyBySlugQuery['caseStudies'][number]
): CaseStudy | null {
  if (!caseStudy) {
    return null;
  }

  // Parse heroStats from JSON
  let heroStats: CaseStudyStat[] = [];
  if (caseStudy.heroStats) {
    if (typeof caseStudy.heroStats === 'string') {
      try {
        heroStats = JSON.parse(caseStudy.heroStats);
      } catch {
        heroStats = [];
      }
    } else if (Array.isArray(caseStudy.heroStats)) {
      heroStats = caseStudy.heroStats as CaseStudyStat[];
    }
  }

  // Parse highlights from JSON
  let highlights: string[] = [];
  if (caseStudy.highlights) {
    if (typeof caseStudy.highlights === 'string') {
      try {
        highlights = JSON.parse(caseStudy.highlights);
      } catch {
        highlights = [];
      }
    } else if (Array.isArray(caseStudy.highlights)) {
      highlights = caseStudy.highlights as string[];
    }
  }

  // Parse metrics from JSON
  let metrics: CaseStudyMetric[] = [];
  if (caseStudy.metrics) {
    if (typeof caseStudy.metrics === 'string') {
      try {
        metrics = JSON.parse(caseStudy.metrics);
      } catch {
        metrics = [];
      }
    } else if (Array.isArray(caseStudy.metrics)) {
      metrics = caseStudy.metrics as CaseStudyMetric[];
    }
  }

  // Parse challenge from JSON
  let challenge: CaseStudySection = {
    title: '',
    description: '',
    bullets: [],
  };
  if (caseStudy.challenge) {
    if (typeof caseStudy.challenge === 'string') {
      try {
        challenge = JSON.parse(caseStudy.challenge);
      } catch {
        // Keep default
      }
    } else if (typeof caseStudy.challenge === 'object') {
      challenge = caseStudy.challenge as CaseStudySection;
    }
  }

  // Parse strategy from JSON
  let strategy: CaseStudySection = {
    title: '',
    description: '',
    bullets: [],
  };
  if (caseStudy.strategy) {
    if (typeof caseStudy.strategy === 'string') {
      try {
        strategy = JSON.parse(caseStudy.strategy);
      } catch {
        // Keep default
      }
    } else if (typeof caseStudy.strategy === 'object') {
      strategy = caseStudy.strategy as CaseStudySection;
    }
  }

  // Parse outcome from JSON
  let outcome: CaseStudySection & { highlights?: string[] } = {
    title: '',
    description: '',
    bullets: [],
  };
  if (caseStudy.outcome) {
    if (typeof caseStudy.outcome === 'string') {
      try {
        outcome = JSON.parse(caseStudy.outcome);
      } catch {
        // Keep default
      }
    } else if (typeof caseStudy.outcome === 'object') {
      outcome = caseStudy.outcome as CaseStudySection & { highlights?: string[] };
    }
  }

  // Parse testimonial from JSON
  let testimonial: CaseStudyTestimonial = {
    quote: '',
    author: '',
    role: '',
    company: '',
  };
  if (caseStudy.testimonial) {
    if (typeof caseStudy.testimonial === 'string') {
      try {
        testimonial = JSON.parse(caseStudy.testimonial);
      } catch {
        // Keep default
      }
    } else if (typeof caseStudy.testimonial === 'object') {
      testimonial = caseStudy.testimonial as CaseStudyTestimonial;
    }
  }

  // Parse technologies from JSON
  let technologies: string[] = [];
  if (caseStudy.technologies) {
    if (typeof caseStudy.technologies === 'string') {
      try {
        technologies = JSON.parse(caseStudy.technologies);
      } catch {
        technologies = [];
      }
    } else if (Array.isArray(caseStudy.technologies)) {
      technologies = caseStudy.technologies as string[];
    }
  }

  // Parse services - get service titles
  const services: string[] = caseStudy.services
    ?.map((s) => s?.title || '')
    .filter(Boolean) || [];

  return {
    id: caseStudy.documentId || '',
    slug: caseStudy.slug || '',
    title: caseStudy.title || '',
    client: caseStudy.client || '',
    industry: caseStudy.industry || '',
    summary: caseStudy.summary || '',
    excerpt: caseStudy.excerpt || '',
    services,
    timeline: caseStudy.timeline || '',
    headquarters: caseStudy.headquarters || '',
    hero: {
      subtitle: caseStudy.heroSubtitle || '',
      description: caseStudy.heroDescription || '',
      stats: heroStats,
    },
    highlights,
    metrics,
    challenge,
    strategy,
    outcome,
    testimonial,
    technologies,
  };
}

