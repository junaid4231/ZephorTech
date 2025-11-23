/**
 * Transformers to convert GraphQL responses to application data structures
 * Ensures compatibility with existing components
 */

import type { GetAllServicesQuery, GetServiceBySlugQuery } from './generated/operations';
import type { ServiceDetail, ServiceFeature, UseCase, ProcessStep, FAQ } from '../services';

/**
 * Transform a GraphQL Service to ServiceDetail format
 */
export function transformGraphQLServiceToServiceDetail(
  service: GetAllServicesQuery['services'][number] | GetServiceBySlugQuery['services'][number]
): ServiceDetail | null {
  if (!service) return null;

  // Transform heroStats from JSON to typed structure
  const heroStats = service.heroStats as {
    projects?: number;
    successRate?: number;
    satisfaction?: number;
    deliveryTime?: string;
  };

  // Transform techStack from JSON to typed structure
  const techStack = (service.techStack as {
    frontend?: string[];
    backend?: string[];
    tools?: string[];
    cloud?: string[];
  }) || {
    frontend: [],
    backend: [],
    tools: [],
    cloud: [],
  };

  // Transform benefits from JSON to string array
  const benefits = Array.isArray(service.benefits)
    ? (service.benefits as string[])
    : service.benefits
      ? [String(service.benefits)]
      : [];

  // Transform features, filtering out nulls
  const features: ServiceFeature[] =
    service.features
      ?.filter((f): f is NonNullable<typeof f> => f !== null)
      .map((f) => ({
        icon: f.icon,
        title: f.title,
        description: f.description,
      })) || [];

  // Transform useCases, filtering out nulls and handling examples
  const useCases: UseCase[] =
    service.useCases
      ?.filter((uc): uc is NonNullable<typeof uc> => uc !== null)
      .map((uc) => ({
        industry: uc.industry,
        title: uc.title,
        description: uc.description,
        examples: Array.isArray(uc.examples)
          ? (uc.examples as string[])
          : uc.examples
            ? [String(uc.examples)]
            : [],
      })) || [];

  // Transform process, filtering out nulls
  const process: ProcessStep[] =
    service.process
      ?.filter((p): p is NonNullable<typeof p> => p !== null)
      .map((p) => ({
        step: p.step,
        title: p.title,
        description: p.description,
        duration: p.duration || undefined,
      })) || [];

  // Transform FAQ, filtering out nulls
  const faq: FAQ[] =
    service.faq
      ?.filter((f): f is NonNullable<typeof f> => f !== null)
      .map((f) => ({
        question: f.question,
        answer: f.answer,
      })) || [];

  // Extract related service slugs
  const relatedServices: string[] =
    service.relatedServices
      ?.filter((rs): rs is NonNullable<typeof rs> => rs !== null && rs !== undefined)
      .map((rs) => {
        if (!rs || !rs.slug) return '';
        return rs.slug;
      })
      .filter((slug): slug is string => slug !== '') || [];

  // Ensure heroStats has all required fields with defaults
  const transformedHeroStats = {
    projects: heroStats?.projects || 0,
    successRate: heroStats?.successRate || 0,
    satisfaction: heroStats?.satisfaction || 0,
    deliveryTime: heroStats?.deliveryTime || 'N/A',
  };

  return {
    id: service.documentId,
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    iconName: service.iconName,
    heroStats: transformedHeroStats,
    features,
    useCases,
    techStack: {
      frontend: techStack.frontend || [],
      backend: techStack.backend || [],
      tools: techStack.tools || [],
      cloud: techStack.cloud || [],
    },
    process,
    faq,
    relatedServices,
    benefits,
    seoTitle: service.seoTitle || undefined,
    seoDescription: service.seoDescription || undefined,
  };
}

