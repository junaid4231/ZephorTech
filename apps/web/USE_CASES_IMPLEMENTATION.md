# Use Cases CMS Implementation

## Overview
Use Cases content type has been implemented to fetch data from Strapi CMS, following the same pattern as Services, Testimonials, and Blogs.

## Implementation Status

✅ **Completed:**
- GraphQL query file: `lib/graphql/queries/use-cases.graphql`
- GraphQL TypeScript file: `lib/graphql/use-cases.ts`
- Transformer: `lib/graphql/use-case-transformer.ts`
- CMS functions: `lib/use-cases-cms.ts`

## Next Steps

### 1. Regenerate GraphQL Types ⚠️ REQUIRES CMS RUNNING
After the UseCase content type is created in Strapi and the CMS is running, regenerate the GraphQL types:

**Prerequisites:**
- Strapi CMS must be running on `http://localhost:1337`
- `STRAPI_API_TOKEN` must be set in `.env` (get from Strapi admin: Settings → API Tokens)

```bash
cd apps/web
npm run codegen
```

This will generate the proper TypeScript types for `GetAllUseCasesQuery`, `GetFeaturedUseCasesQuery`, and `GetUseCaseBySlugQuery` in `lib/graphql/generated/operations.ts`.

**Note:** The current implementation uses flexible types that will work until codegen is run. Once types are generated, you can optionally update the imports in:
- `lib/graphql/use-cases.ts` - Replace manual types with imports from `./generated/operations`
- `lib/graphql/use-case-transformer.ts` - Replace manual types with imports from `./generated/operations`

However, the current implementation will work fine as-is.

### 3. Seed Use Cases Data
A seed script has been created at `apps/cms/scripts/seed-use-cases.ts` with sample data in `apps/cms/scripts/use-cases-data.json`.

To seed use cases:
```bash
cd apps/cms
# Add to .env: SEED_USE_CASES=true
# Then restart Strapi, or run:
pnpm strapi ts scripts/seed-use-cases.ts
```

The seed script will:
- Create use cases from the JSON data
- Link them to related services (if service slugs are provided)
- Publish all use cases automatically

## Usage

### Fetch All Use Cases
```typescript
import { getAllUseCasesCached } from '@/lib/use-cases-cms';

const useCases = await getAllUseCasesCached();
```

### Fetch Featured Use Cases
```typescript
import { getFeaturedUseCasesCached } from '@/lib/use-cases-cms';

const featuredUseCases = await getFeaturedUseCasesCached();
```

### Fetch Use Case by Slug
```typescript
import { getUseCaseBySlugCached } from '@/lib/use-cases-cms';

const useCase = await getUseCaseBySlugCached('some-slug');
```

## Data Structure

The `AppUseCase` interface includes:
- `id`: Document ID from Strapi
- `title`: Use case title
- `slug`: URL-friendly slug
- `industry`: Industry category
- `description`: Full description
- `examples`: Array of example strings
- `icon`: Optional icon name
- `imageUrl`: Optional image URL
- `imageAlt`: Optional image alt text
- `order`: Display order
- `featured`: Whether it's featured
- `serviceIds`: Related service IDs
- `serviceSlugs`: Related service slugs

## Environment Variable

Make sure `NEXT_PUBLIC_USE_CMS=true` is set in your `.env` file to enable CMS fetching. The implementation will fall back to static data if CMS is disabled or unavailable.

