# @zephortech/types

Shared TypeScript type definitions for the ZephorTech project.

## Usage

Import types from this package in your apps:

```tsx
import type { Service, Portfolio, BlogPost } from "@zephortech/types";
```

## Development

Types in this package should:

- **Be Accurate:** Match the CMS schema and API responses exactly
- **Be Documented:** Include JSDoc comments for complex types
- **Be Reusable:** Shared across frontend, backend, and packages
- **Be Maintainable:** Keep in sync with CMS content types

## Structure

```
packages/types/
├── src/
│   └── index.ts        # All type definitions
└── package.json
```

## Type Categories

### CMS Content Types
- `Service`: Service offering content
- `Portfolio`: Project case studies
- `BlogPost`: Blog articles
- `TeamMember`: Team member profiles
- `Testimonial`: Client testimonials
- `Technology`: Tech stack items

### API Types
- `ApiResponse<T>`: Standard API response wrapper
- `ApiError`: Error response format

### Form Types
- `ContactSubmission`: Contact form data
- `QuoteFormData`: Quote request form data

## Guidelines

1. **Naming:** Use PascalCase for interfaces (e.g., `BlogPost`)
2. **Exports:** Export all types from `src/index.ts`
3. **Documentation:** Add JSDoc comments for complex types
4. **Consistency:** Keep types in sync with Strapi schema
5. **Versioning:** Update types when CMS schema changes

