# ZephorTech Web App

Next.js 15 frontend application for the ZephorTech corporate website.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Fonts:** Poppins (headings), Inter (body)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
apps/web/
├── app/                # Next.js App Router pages
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Home page
│   ├── error.tsx       # Error boundary
│   ├── not-found.tsx   # 404 page
│   └── globals.css     # Global styles
├── components/         # React components
├── lib/                # Utilities, types, constants
│   ├── utils.ts        # Helper functions
│   ├── constants.ts    # App constants
│   └── types.ts        # TypeScript types
├── public/             # Static assets
└── styles/             # Additional styles
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_CMS_URL`: CMS API endpoint
- `NEXT_PUBLIC_GA_ID`: Google Analytics ID
- Email and reCAPTCHA configuration

## Design System

- **Primary Color:** #0076D1
- **Gradient:** #004E8F → #0076D1
- **Typography:** Poppins (headings), Inter (body)
- **Spacing:** Tailwind default scale
- **Border Radius:** 2xl (1rem), 3xl (1.5rem)

## Development Guidelines

- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Write accessible, semantic HTML
- Optimize images using Next.js Image component
- Use Server Components by default, Client Components only when needed

