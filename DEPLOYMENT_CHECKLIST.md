# ✅ Production Deployment Checklist

Quick reference checklist for deploying ZephorTech to production.

---

## 📦 Web App (Vercel) - Pre-Deployment

### Repository
- [ ] All code committed and pushed to GitHub
- [ ] Build passes locally (`pnpm build`)
- [ ] TypeScript checks pass (`pnpm type-check`)
- [ ] Linting passes (`pnpm lint`)

### Vercel Setup
- [ ] Vercel account created and connected to GitHub
- [ ] Project imported from GitHub repository
- [ ] Root directory: `.` (monorepo root)
- [ ] Build command: `cd apps/web && pnpm build`
- [ ] Output directory: `apps/web/.next`
- [ ] Install command: `pnpm install`

### Environment Variables (Vercel)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- [ ] `NEXT_PUBLIC_SITE_URL` - Production site URL (https://zephortech.com)
- [ ] `NEXT_PUBLIC_CMS_URL` - Strapi CMS URL (after CMS is deployed)
- [ ] `STRAPI_API_TOKEN` - Strapi API token (after CMS is deployed)
- [ ] `RESEND_API_KEY` - Resend API key for emails
- [ ] `NEWSLETTER_ADMIN_API_KEY` - Secure random key (generate new!)
- [ ] `NEWSLETTER_FROM_EMAIL` - Verified email address
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

### Domain & SSL
- [ ] Custom domain added in Vercel
- [ ] DNS records configured
- [ ] SSL certificate active (automatic with Vercel)

---

## 🗄️ Strapi CMS - Pre-Deployment

### Choose Hosting Platform
- [ ] Railway (Recommended - Easiest)
- [ ] Render (Free tier available)
- [ ] DigitalOcean App Platform
- [ ] Self-hosted VPS

### Database Setup (Using Existing Supabase)
- [ ] Supabase PostgreSQL connection string obtained
- [ ] Database password retrieved from Supabase dashboard
- [ ] Connection string formatted correctly (with password)
- [ ] Database migrations ready (if any)
- [ ] **No new database needed** - using existing Supabase PostgreSQL ✅

### Environment Variables (Strapi)
- [ ] `DATABASE_CLIENT=postgres`
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `DATABASE_SSL=true`
- [ ] `DATABASE_SSL_REJECT_UNAUTHORIZED=false`
- [ ] `ADMIN_JWT_SECRET` - Generated secure random string
- [ ] `API_TOKEN_SALT` - Generated secure random string
- [ ] `TRANSFER_TOKEN_SALT` - Generated secure random string
- [ ] `ENCRYPTION_KEY` - Generated secure random string
- [ ] `NODE_ENV=production`
- [ ] `HOST=0.0.0.0`
- [ ] `PORT=1337`
- [ ] `SUPABASE_API_URL` - Supabase project URL
- [ ] `SUPABASE_ANON_KEY` - Supabase anon key
- [ ] `SUPABASE_BUCKET=strapi-uploads`

### Strapi Configuration
- [ ] Root directory set to `apps/cms`
- [ ] Build command: `pnpm install && pnpm build`
- [ ] Start command: `pnpm start`
- [ ] Node.js version: 20.x

---

## 🚀 Deployment Steps

### Step 1: Deploy Strapi CMS
- [ ] Deploy Strapi to chosen platform
- [ ] Wait for build to complete
- [ ] Verify Strapi URL is accessible
- [ ] Create admin user account
- [ ] Configure API permissions (Public role)
- [ ] Create API token (Full access)
- [ ] Copy API token securely

### Step 2: Deploy Web App
- [ ] Update Vercel env vars with Strapi URL and token
- [ ] Deploy to Vercel
- [ ] Wait for build to complete
- [ ] Verify deployment URL works

### Step 3: Connect Everything
- [ ] Update `NEXT_PUBLIC_CMS_URL` in Vercel
- [ ] Update `STRAPI_API_TOKEN` in Vercel
- [ ] Redeploy web app
- [ ] Verify web app can fetch from Strapi

---

## ✅ Post-Deployment Testing

### Web App Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Services page displays data from Strapi
- [ ] Case studies page displays data
- [ ] Blog page displays posts
- [ ] Contact form submits successfully
- [ ] Newsletter subscription works
- [ ] Search functionality works
- [ ] 404 page displays correctly
- [ ] Mobile responsive design works

### Strapi CMS
- [ ] Admin panel accessible
- [ ] Can log in with admin credentials
- [ ] GraphQL endpoint accessible: `/graphql`
- [ ] REST API accessible: `/api/services`
- [ ] File uploads work (Supabase Storage)
- [ ] Can create/edit content
- [ ] Permissions configured correctly

### Integration
- [ ] Web app fetches data from Strapi
- [ ] Images load from Supabase Storage
- [ ] All pages render with CMS data
- [ ] Fallback data works if CMS is down

### SEO & Performance
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Meta tags present on all pages
- [ ] OpenGraph tags working
- [ ] Page load speed acceptable
- [ ] Images optimized

### Security
- [ ] HTTPS enabled (SSL certificate active)
- [ ] Security headers configured
- [ ] Environment variables not exposed
- [ ] API tokens secured
- [ ] No sensitive data in client-side code

---

## 🔧 Post-Launch Tasks

### Monitoring
- [ ] Set up error tracking (optional: Sentry)
- [ ] Monitor Vercel analytics
- [ ] Monitor Strapi logs
- [ ] Set up uptime monitoring (optional)

### Backup
- [ ] Database backup configured
- [ ] Strapi content export scheduled (optional)
- [ ] Environment variables documented securely

### Documentation
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Admin credentials stored securely
- [ ] Team access configured

---

## 🆘 Troubleshooting

### If Web App Build Fails:
- [ ] Check Vercel build logs
- [ ] Verify all environment variables are set
- [ ] Ensure `pnpm` is used (not npm)
- [ ] Check for TypeScript errors

### If Strapi Won't Start:
- [ ] Check hosting platform logs
- [ ] Verify all environment variables
- [ ] Check database connection
- [ ] Verify Node.js version is 20.x

### If CMS Data Not Loading:
- [ ] Verify `NEXT_PUBLIC_CMS_URL` is correct
- [ ] Check `STRAPI_API_TOKEN` is valid
- [ ] Verify API permissions in Strapi
- [ ] Check CORS settings
- [ ] Test API endpoint directly

---

## 📊 Success Criteria

✅ All checklist items completed  
✅ Web app deployed and accessible  
✅ Strapi CMS deployed and accessible  
✅ Integration working correctly  
✅ All features tested and working  
✅ SEO configured  
✅ Security headers in place  
✅ Monitoring set up  

**🎉 Ready for Production!**

---

**Last Updated:** 2024  
**Maintained by:** ZephorTech Team

