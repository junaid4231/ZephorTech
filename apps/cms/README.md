# ZephorTech CMS (Strapi v5)

This directory is reserved for the Strapi v5 CMS backend.

## Status

⏳ **Setup Deferred to Phase 2**

The actual Strapi installation and configuration will be completed in a later phase after the frontend foundation is established.

## Planned Tech Stack

- **CMS:** Strapi v5 (self-hosted)
- **Database:** PostgreSQL (production), SQLite (development)
- **API:** REST & GraphQL endpoints
- **Auth:** Strapi built-in authentication
- **Media:** Cloudinary/Imgix integration

## Planned Content Types

### Collections

1. **Service**
   - title, slug, summary, body (rich text)
   - features (list), hero image, icons
   - SEO meta (title, description)
   - order

2. **Portfolio**
   - title, slug, client, industry
   - summary, problem, solution
   - techStack (relation), images (gallery)
   - date, outcome metrics

3. **BlogPost**
   - title, slug, author (relation)
   - category, tags, content
   - excerpt, featured image
   - publishedAt, SEO meta

4. **TeamMember**
   - name, role, bio, photo
   - social links

5. **Testimonial**
   - clientName, role, company
   - quote, logo (optional)

6. **Technology**
   - name, logo, category
   - description

7. **ContactSubmission**
   - name, email, company
   - message, serviceInterest
   - budgetRange, createdAt

### Singletons

8. **SiteSettings**
   - siteTitle, defaultMeta
   - socialLinks, footerText
   - contactEmail

## Future Setup Commands

```bash
# Install Strapi v5
npx create-strapi-app@latest . --quickstart

# Development
npm run develop

# Production build
npm run build
npm run start
```

## Environment Variables (Future)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=zephortech_cms
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false

CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

## Deployment Plan

- **Development:** Local SQLite
- **Production:** Render/DigitalOcean with PostgreSQL
- **Domain:** cms.zephortech.com (subdomain)
- **SSL:** Automatic via hosting provider

