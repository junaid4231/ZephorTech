/**
 * Transform GraphQL Use Case data to application format
 */

import type {
  GetAllUseCasesQuery,
  GetFeaturedUseCasesQuery,
  GetUseCaseBySlugQuery,
} from './generated/operations';

export interface AppUseCase {
  id: string;
  title: string;
  slug: string;
  industry: string;
  description: string;
  examples: string[];
  icon?: string;
  imageUrl?: string;
  imageAlt?: string;
  order: number;
  featured: boolean;
  serviceIds: string[];
  serviceSlugs: string[];
}

/**
 * Transform a GraphQL use case to application format
 */
export function transformGraphQLUseCase(
  useCase:
    | GetAllUseCasesQuery['useCases'][number]
    | GetFeaturedUseCasesQuery['useCases'][number]
    | GetUseCaseBySlugQuery['useCases'][number]
): AppUseCase | null {
  if (!useCase) {
    return null;
  }

  // Parse examples from JSON if it's a string
  let examples: string[] = [];
  if (useCase.examples) {
    if (typeof useCase.examples === 'string') {
      try {
        examples = JSON.parse(useCase.examples);
      } catch {
        examples = [];
      }
    } else if (Array.isArray(useCase.examples)) {
      examples = useCase.examples as string[];
    }
  }

  return {
    id: useCase.documentId || '',
    title: useCase.title || '',
    slug: useCase.slug || '',
    industry: useCase.industry || '',
    description: useCase.description || '',
    examples,
    icon: useCase.icon || undefined,
    imageUrl: useCase.image?.url || undefined,
    imageAlt: useCase.image?.alternativeText || undefined,
    order: useCase.order ?? 0,
    featured: useCase.featured ?? false,
    serviceIds: useCase.services?.map((s) => s?.documentId || '').filter(Boolean) || [],
    serviceSlugs: useCase.services?.map((s) => s?.slug || '').filter(Boolean) || [],
  };
}

