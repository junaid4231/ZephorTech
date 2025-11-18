# @zephortech/ui

Shared React component library for the ZephorTech project.

## Usage

Import components from this package in your apps:

```tsx
import { Button, Card } from "@zephortech/ui";
```

## Development

Components in this package should be:

- **Reusable:** Generic enough to be used across different apps
- **Typed:** Full TypeScript support with proper prop types
- **Tested:** Include unit tests for components (future)
- **Documented:** JSDoc comments for props and usage examples

## Structure

```
packages/ui/
├── src/
│   ├── index.ts        # Main export file
│   ├── Button.tsx      # Example component
│   └── Card.tsx        # Example component
└── package.json
```

## Guidelines

1. **Component Naming:** Use PascalCase (e.g., `Button`, `ServiceCard`)
2. **File Structure:** One component per file
3. **Exports:** Export all components from `src/index.ts`
4. **Props:** Use TypeScript interfaces for component props
5. **Styling:** Use Tailwind CSS classes (Tailwind configured in consuming apps)

