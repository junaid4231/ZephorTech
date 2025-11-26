# 🚀 ZephorTech Deployment Guide

Complete guide for deploying the Next.js web app to Vercel and Strapi CMS to production.

---

## 📦 Part 1: Deploy Next.js Web App to Vercel

### Step 1: Prepare Your Repository

1. **Ensure all changes are committed and pushed:**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Verify build works locally:**
   ```bash
   cd apps/web
   pnpm build
   ```

### Step 2: Connect to Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Sign in with GitHub

2. **Import Project:**
   - Click **"Add New"** → **"Project"**
   - Select your repository: `junaid4231/ZephorTech`
   - Vercel will auto-detect it's a monorepo with Turborepo

3. **Configure Project Settings:**
   - **Root Directory:** Leave as root (`.`)
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `cd apps/web && pnpm build`
   - **Output Directory:** `apps/web/.next`
   - **Install Command:** `pnpm install`

### Step 3: Configure Environment Variables in Vercel

Go to **Project Settings** → **Environment Variables** and add:

#### **Required Variables:**

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://zephortech.com

# Strapi CMS (if using)
NEXT_PUBLIC_CMS_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_strapi_api_token
NEXT_PUBLIC_USE_CMS=true

# Newsletter System (REQUIRED)
RESEND_API_KEY=re_your_resend_api_key
NEWSLETTER_ADMIN_API_KEY=generate_secure_random_key_here
NEWSLETTER_FROM_EMAIL=newsletter@zephortech.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**⚠️ Important:**
- Set variables for **Production**, **Preview**, and **Development** environments
- Generate a NEW `NEWSLETTER_ADMIN_API_KEY` for production (different from dev)
- Never commit these values to git

### Step 4: Deploy

1. **Click "Deploy"**
2. **Monitor the build logs**
3. **Wait for deployment to complete** (usually 2-3 minutes)

### Step 5: Configure Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your domain: `zephortech.com`
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

---

## 🗄️ Part 2: Deploy Strapi CMS

Strapi CMS needs a Node.js hosting platform. Here are the best options:

### **Option A: Railway (Recommended - Easiest)**

Railway is the easiest way to deploy Strapi with PostgreSQL.

#### **Step 1: Create Railway Account**

1. Go to: https://railway.app
2. Sign up with GitHub
3. Click **"New Project"**

#### **Step 2: Deploy Strapi**

1. **Connect Repository:**
   - Click **"Deploy from GitHub repo"**
   - Select `ZephorTech` repository
   - Select **"apps/cms"** as root directory

2. **Configure Build Settings:**
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `pnpm start`
   - **Node Version:** 20.x

3. **Get Supabase PostgreSQL Connection String:**
   - Go to Supabase Dashboard → Settings → Database
   - Copy the connection string (URI format)
   - Replace `[YOUR-PASSWORD]` with your actual database password
   - **No need to create a new database** - use your existing Supabase PostgreSQL! ✅

4. **Set Environment Variables:**
   Go to **Variables** tab and add:

   ```env
   # Database (Use Your Existing Supabase PostgreSQL)
   DATABASE_CLIENT=postgres
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   
   # Note: Get DATABASE_URL from Supabase Dashboard → Settings → Database → Connection string

   # Strapi Admin Secrets (Generate new ones!)
   ADMIN_JWT_SECRET=your_random_secret_here
   API_TOKEN_SALT=your_random_salt_here
   TRANSFER_TOKEN_SALT=your_random_salt_here
   ENCRYPTION_KEY=your_random_encryption_key_here

   # App Configuration
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=1337

   # Supabase Storage (for file uploads)
   SUPABASE_API_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_BUCKET=strapi-uploads
   ```

   **Generate Secrets:**
   ```bash
   # Run these commands to generate secure random strings:
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   # Run 4 times for ADMIN_JWT_SECRET, API_TOKEN_SALT, TRANSFER_TOKEN_SALT, ENCRYPTION_KEY
   ```

5. **Deploy:**
   - Railway will automatically build and deploy
   - Wait for deployment to complete
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

6. **Create Admin User:**
   - Visit your Strapi URL
   - Complete the admin registration form
   - Save credentials securely

---

### **Option B: Render (Free Tier Available)**

#### **Step 1: Create Render Account**

1. Go to: https://render.com
2. Sign up with GitHub

#### **Step 2: Deploy Strapi**

1. **New Web Service:**
   - Click **"New"** → **"Web Service"**
   - Connect your GitHub repository
   - Select `ZephorTech` repo

2. **Configure Service:**
   - **Name:** `zephortech-cms`
   - **Root Directory:** `apps/cms`
   - **Environment:** `Node`
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `pnpm start`
   - **Node Version:** 20

3. **Add PostgreSQL Database:**
   - Click **"New"** → **"PostgreSQL"**
   - Create database
   - Copy connection string

4. **Set Environment Variables:**
   Same as Railway (see above)

5. **Deploy:**
   - Click **"Create Web Service"**
   - Wait for deployment

---

### **Option C: DigitalOcean App Platform**

1. Go to: https://cloud.digitalocean.com
2. Create new App
3. Connect GitHub repository
4. Configure similar to Railway/Render

---

### **Option D: Self-Hosted (VPS)**

If you have a VPS (DigitalOcean, Linode, AWS EC2):

1. **Install Node.js 20:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   ```

3. **Clone Repository:**
   ```bash
   git clone https://github.com/junaid4231/ZephorTech.git
   cd ZephorTech/apps/cms
   ```

4. **Install Dependencies:**
   ```bash
   pnpm install
   ```

5. **Build:**
   ```bash
   pnpm build
   ```

6. **Set Environment Variables:**
   Create `.env` file with all required variables

7. **Start with PM2:**
   ```bash
   pm2 start pnpm --name "strapi" -- start
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx (Reverse Proxy):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:1337;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🔗 Part 3: Connect Web App to Strapi CMS

After deploying Strapi:

1. **Get Strapi URL:**
   - Railway: `https://your-app.railway.app`
   - Render: `https://your-app.onrender.com`
   - Custom domain: `https://cms.zephortech.com`

2. **Create API Token in Strapi:**
   - Log into Strapi admin panel
   - Go to **Settings** → **API Tokens**
   - Create new token with **Full access**
   - Copy the token

3. **Update Vercel Environment Variables:**
   - Go to Vercel project settings
   - Update `NEXT_PUBLIC_CMS_URL` to your Strapi URL
   - Update `STRAPI_API_TOKEN` with the token you created
   - Redeploy

---

## ✅ Post-Deployment Checklist

### Web App (Vercel):
- [ ] All environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Test homepage loads
- [ ] Test contact form
- [ ] Test newsletter subscription
- [ ] Test search functionality
- [ ] Verify sitemap.xml accessible
- [ ] Check robots.txt

### Strapi CMS:
- [ ] Admin panel accessible
- [ ] Database connected (PostgreSQL)
- [ ] File uploads working (Supabase Storage)
- [ ] GraphQL endpoint accessible: `/graphql`
- [ ] API tokens created
- [ ] Content types configured
- [ ] Permissions set for public API
- [ ] Test API endpoint: `https://your-cms.com/api/services`

### Integration:
- [ ] Web app can fetch data from Strapi
- [ ] Images load correctly
- [ ] All pages render with CMS data
- [ ] Fallback data works if CMS is down

---

## 🔧 Troubleshooting

### Vercel Build Fails:
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `pnpm` is used (not npm)

### Strapi Won't Start:
- Check environment variables are correct
- Verify database connection string
- Check logs in hosting platform
- Ensure Node.js version is 20.x

### CMS Data Not Loading:
- Verify `NEXT_PUBLIC_CMS_URL` is correct
- Check `STRAPI_API_TOKEN` is valid
- Verify API permissions in Strapi
- Check CORS settings in Strapi

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)

---

## 🎯 Recommended Setup

**For Best Performance & Cost:**

1. **Web App:** Vercel (Free tier is excellent)
2. **Strapi CMS:** Railway (Easy setup, good free tier)
3. **Database:** Supabase PostgreSQL (Already using)
4. **File Storage:** Supabase Storage (Already configured)

**Total Cost:** $0/month (on free tiers) or ~$5-10/month for production scale

---

Need help? Check the deployment logs or review the error messages in your hosting platform's dashboard.

