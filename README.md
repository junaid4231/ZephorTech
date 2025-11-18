# ZephorTech Corporate Website

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-1.11-red.svg)](https://turbo.build/repo)

Professional, CMS-driven, SEO-optimized corporate website for ZephorTech - delivering cutting-edge IT solutions and digital transformation services.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Rules](#development-rules)
- [Available Commands](#available-commands)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [Contributing](#contributing)

## 🎯 Project Overview

ZephorTech offers comprehensive IT services including:
- Web & Mobile App Development
- AI Agents & Machine Learning
- SaaS Solutions
- E-commerce (Shopify, WooCommerce, WordPress)
- Digital Marketing & SEO
- Cloud & DevOps Services

This website serves as:
- Professional corporate presence
- Lead generation platform
- Portfolio showcase
- Technical blog and insights
- CMS-driven content management

## 🛠 Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.3 (Strict Mode)
- **Styling:** Tailwind CSS 3.4
- **Fonts:** Poppins (headings), Inter (body)
- **Package Manager:** pnpm 8+
- **Build System:** Turborepo

### Backend (Phase 2)
- **CMS:** Strapi v5 (self-hosted)
- **Database:** PostgreSQL (production), SQLite (dev)
- **API:** REST & GraphQL endpoints

### Infrastructure
- **Hosting:** Vercel (frontend), Render/DigitalOcean (CMS)
- **CDN:** Cloudinary for media
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry (errors), UptimeRobot (availability)

## 📁 Project Structure

```
zephortech/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── app/               # App Router pages
│   │   │   ├── layout.tsx     # Root layout with fonts
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── error.tsx      # Error boundary
│   │   │   ├── not-found.tsx  # 404 page
│   │   │   └── globals.css    # Global styles
│   │   ├── components/        # React components
│   │   ├── lib/               # Utils, types, constants
│   │   │   ├── utils.ts       # Helper functions
│   │   │   ├── constants.ts   # App constants
│   │   │   └── types.ts       # TypeScript types
│   │   ├── public/            # Static assets
│   │   └── package.json
│   │
│   └── cms/                    # Strapi CMS (Phase 2)
│       ├── package.json       # Placeholder
│       └── README.md          # Setup instructions
│
├── packages/
│   ├── ui/                     # Shared React components
│   │   ├── src/
│   │   │   └── index.ts       # Component exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── types/                  # Shared TypeScript types
│       ├── src/
│       │   └── index.ts       # Type definitions
│       ├── package.json
│       └── tsconfig.json
│
├── .github/
│   └── workflows/             # CI/CD pipelines (future)
│
├── .husky/                     # Git hooks
│   └── pre-commit             # Lint & type-check before commit
│
├── package.json               # Root package.json
├── turbo.json                 # Turborepo configuration
├── pnpm-workspace.yaml        # pnpm workspace definition
├── .eslintrc.json             # ESLint configuration
├── .prettierrc                # Prettier configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js:** >= 18.0.0
- **pnpm:** >= 8.0.0
- **Git:** Latest version

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zephortech/website.git
   cd website
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy example env file in web app
   cd apps/web
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server:**
   ```bash
   # From root directory
   pnpm dev
   
   # Or run specific app
   pnpm dev:web
   ```

5. **Open browser:**
   - Web app: http://localhost:3000

## 📜 Development Rules

### 🔒 Mandatory Rules (NO EXCEPTIONS)

#### 1. **Strict Commits**
- ✅ All commits must have meaningful messages
- ✅ Follow conventional commits format:
  ```
  feat: add contact form validation
  fix: resolve mobile menu overlay issue
  docs: update API documentation
  style: format code with prettier
  refactor: optimize image loading
  test: add unit tests for utils
  chore: update dependencies
  ```
- ❌ No generic commits like "fix", "update", "changes"

#### 2. **Feature Branches**
- ✅ Create feature branches from `main`
- ✅ Branch naming: `feature/description` or `fix/description`
  ```bash
  git checkout -b feature/add-portfolio-section
  git checkout -b fix/mobile-navigation
  ```
- ✅ One feature per branch
- ❌ Never commit directly to `main`

#### 3. **Mandatory Tests**
- ✅ All new features must include tests
- ✅ All bug fixes must include regression tests
- ✅ Maintain > 80% code coverage
- ❌ No untested code merged to `main`

#### 4. **CI Must Always Pass**
- ✅ All CI checks must pass before merge
- ✅ No linting errors
- ✅ No TypeScript errors
- ✅ All tests passing
- ❌ No bypassing CI checks

#### 5. **Code Quality Standards**
- ✅ TypeScript strict mode enabled
- ✅ All code must pass ESLint
- ✅ All code must be formatted with Prettier
- ✅ No `any` types without justification
- ✅ Proper error handling and logging
- ✅ Accessibility compliance (WCAG AA)

#### 6. **Security & Performance**
- ✅ No hardcoded secrets or API keys
- ✅ Input sanitization for all forms
- ✅ Lighthouse performance score >= 90 (desktop), >= 70 (mobile)
- ✅ Proper authentication and authorization
- ❌ No unvalidated user input

### 📝 Pull Request Process

1. Create feature branch
2. Make changes with proper commits
3. Run tests and linting locally
4. Push to remote branch
5. Create Pull Request with:
   - Clear description of changes
   - Screenshots (for UI changes)
   - Test coverage report
   - Breaking changes noted
6. Wait for CI to pass
7. Request code review
8. Address review comments
9. Merge after approval

## 💻 Available Commands

### Root Level Commands

```bash
# Install all dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Run specific app
pnpm dev:web          # Run only web app
pnpm dev:cms          # Run only CMS (Phase 2)

# Build all apps for production
pnpm build

# Build specific app
pnpm build:web        # Build only web app

# Run linting
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix linting issues

# Type checking
pnpm type-check       # Check TypeScript types

# Code formatting
pnpm format           # Format all files
pnpm format:check     # Check formatting

# Run tests (future)
pnpm test             # Run all tests

# Clean build artifacts
pnpm clean            # Remove all node_modules and build files
```

### Web App Commands (apps/web)

```bash
cd apps/web

# Development
pnpm dev              # Start dev server (http://localhost:3000)

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Quality
pnpm lint             # Lint code
pnpm lint:fix         # Fix linting issues
pnpm type-check       # Check TypeScript

# Cleanup
pnpm clean            # Remove build artifacts
```

## 🔐 Environment Variables

### Web App (.env.local)

```env
# CMS API Configuration
NEXT_PUBLIC_CMS_URL=http://localhost:1337
CMS_API_TOKEN=your_cms_api_token

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@zephortech.com
SMTP_PASSWORD=your_smtp_password
CONTACT_EMAIL=info@zephortech.com

# reCAPTCHA (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

## 🏗 Architecture

### Design System

#### Colors
- **Primary:** `#0076D1`
- **Gradient:** `#004E8F` → `#0076D1`
- **Dark:** `#0A0A0A`
- **Text Dark:** `#111827`
- **Secondary:** `#6B7280`
- **Background:** `#F9FAFB`

#### Typography
- **Headings:** Poppins (600, 700)
- **Body:** Inter (400, 500)
- **Letter Spacing:** Wide spacing for headings
- **Line Height:** 1.6 for body, 1.2 for headings

#### Spacing & Layout
- **Container Max Width:** 1280px
- **Border Radius:** 1rem (2xl), 1.5rem (3xl)
- **Shadows:** Soft blue-tinted shadows
- **Transitions:** 200ms ease-in-out

### API Integration (Phase 2)

```typescript
// Example: Fetching services from CMS
import type { Service } from '@zephortech/types';

const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/services`);
const data: Service[] = await response.json();
```

### Performance Targets

- **Lighthouse Performance:** >= 90 (desktop), >= 70 (mobile)
- **First Contentful Paint:** < 1.8s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1
- **Largest Contentful Paint:** < 2.5s

## 🤝 Contributing

### For Team Members

1. **Before Starting Work:**
   - Pull latest changes: `git pull origin main`
   - Create feature branch: `git checkout -b feature/your-feature`
   - Ensure dependencies are up to date: `pnpm install`

2. **During Development:**
   - Follow coding standards
   - Write meaningful commit messages
   - Test your changes locally
   - Run linting and type checking

3. **Before Submitting:**
   - Ensure all tests pass
   - Run `pnpm lint` and fix any issues
   - Run `pnpm type-check` to verify TypeScript
   - Update documentation if needed

4. **Submitting PR:**
   - Push to your branch
   - Create Pull Request with clear description
   - Link related issues
   - Request review from team lead

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] No TypeScript or ESLint errors
- [ ] Tests included and passing
- [ ] Documentation updated
- [ ] Performance impact considered
- [ ] Accessibility requirements met
- [ ] Security implications reviewed

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Strapi Documentation](https://docs.strapi.io/)

## 📞 Support

For questions or issues:
- **Technical Lead:** Muhammad Junaid
- **Email:** info@zephortech.com
- **GitHub Issues:** [Create an issue](https://github.com/zephortech/website/issues)

## 📄 License

UNLICENSED - Proprietary software for ZephorTech

---

**Built with ❤️ by the ZephorTech Team**

