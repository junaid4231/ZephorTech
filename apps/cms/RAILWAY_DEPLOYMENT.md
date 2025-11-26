# 🚂 Deploy Strapi CMS to Railway

Quick guide for deploying Strapi CMS to Railway (recommended).

---

## Prerequisites

- GitHub account
- Railway account (free tier available)
- **Supabase project** (already configured - for database AND file storage)

---

## Step-by-Step Deployment

### 1. Create Railway Account

1. Go to: https://railway.app
2. Click **"Start a New Project"**
3. Sign in with GitHub

### 2. Deploy from GitHub

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `ZephorTech` repository
4. Railway will detect the project

### 3. Configure Service

1. **Set Root Directory:**
   - Click on the service
   - Go to **Settings** → **Root Directory**
   - Set to: `apps/cms`

2. **Configure Build:**
   - Railway auto-detects Node.js
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm start`

### 4. Get Supabase PostgreSQL Connection String

Since you're already using Supabase PostgreSQL, you don't need to create a new database!

1. **Go to Supabase Dashboard:** https://supabase.com/dashboard
2. **Select your project**
3. **Go to:** Settings → Database
4. **Scroll to:** Connection string
5. **Select:** "URI" tab
6. **Copy the connection string** (looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`)
7. **Replace `[YOUR-PASSWORD]`** with your actual database password (found in Settings → Database → Database password)

**Alternative:** You can also use the connection pooling string (recommended for production):

- Select **"Connection pooling"** tab
- Copy the connection string (port 6543 instead of 5432)

### 5. Set Environment Variables

Go to your Strapi service → **Variables** tab and add:

#### **Database Configuration (Using Your Existing Supabase PostgreSQL):**

```env
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
```

**Important Notes:**

- Replace `YOUR_PASSWORD` with your Supabase database password
- Replace `xxxxx` with your Supabase project reference ID
- Use port `5432` for direct connection or `6543` for connection pooling
- The connection string format: `postgresql://postgres:PASSWORD@HOST:PORT/database`

#### **Strapi Secrets (Generate New Ones!):**

Generate secure random strings:

```bash
# Run these 4 commands to generate secrets:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add to Railway:

```env
ADMIN_JWT_SECRET=<generated_secret_1>
API_TOKEN_SALT=<generated_secret_2>
TRANSFER_TOKEN_SALT=<generated_secret_3>
ENCRYPTION_KEY=<generated_secret_4>
```

#### **App Configuration:**

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

#### **Supabase Storage (File Uploads):**

```env
SUPABASE_API_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_BUCKET=strapi-uploads
SUPABASE_DIRECTORY=
```

### 6. Deploy

1. Railway automatically starts building
2. Monitor the **Deployments** tab
3. Wait for build to complete (2-5 minutes)
4. Copy the generated URL (e.g., `https://your-app.railway.app`)

### 7. Create Admin User

1. Visit your Railway URL
2. Complete the admin registration form:
   - First name
   - Last name
   - Email
   - Password
3. Save credentials securely!

### 8. Configure Permissions

1. Log into Strapi admin
2. Go to **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Enable permissions for:
   - `blog-post`: `find`, `findOne`
   - `service`: `find`, `findOne`
   - `case-study`: `find`, `findOne`
   - `testimonial`: `find`, `findOne`
   - `author`: `find`, `findOne`

### 9. Create API Token

1. Go to **Settings** → **API Tokens**
2. Click **"Create new API Token"**
3. Name: `Production API Token`
4. Token type: `Full access`
5. Token duration: `Unlimited`
6. Click **"Save"**
7. **Copy the token immediately** (you won't see it again!)

### 10. Update Web App

1. Go to Vercel project settings
2. Add/Update environment variables:
   ```env
   NEXT_PUBLIC_CMS_URL=https://your-app.railway.app
   STRAPI_API_TOKEN=<token_from_step_9>
   ```
3. Redeploy web app

---

## Custom Domain (Optional)

1. Go to Railway service → **Settings** → **Networking**
2. Click **"Generate Domain"** or **"Custom Domain"**
3. Add your domain: `cms.zephortech.com`
4. Configure DNS:
   - Add CNAME record: `cms` → Railway provided domain
5. Railway automatically provisions SSL

---

## Monitoring

- **Logs:** View in Railway dashboard → **Deployments** → Click deployment
- **Metrics:** CPU, Memory usage in dashboard
- **Restart:** Click **"Redeploy"** if needed

---

## Troubleshooting

### Build Fails:

- Check logs in Railway dashboard
- Verify `pnpm` is available (Railway auto-installs)
- Ensure Node.js version is 20.x

### Database Connection Error:

- Verify `DATABASE_URL` is set correctly (check password and host)
- Verify your Supabase project is **not paused** (check Supabase dashboard)
- Check Supabase database password is correct
- Verify SSL settings (`DATABASE_SSL=true` and `DATABASE_SSL_REJECT_UNAUTHORIZED=false`)
- Try using connection pooling port (6543) instead of direct port (5432)

### Admin Panel Not Loading:

- Check service is running (green status)
- Verify all environment variables are set
- Check logs for errors

### File Uploads Not Working:

- Verify Supabase environment variables
- Check Supabase Storage bucket exists
- Verify bucket permissions

---

## Cost

**Railway Free Tier:**

- $5 credit/month
- Enough for small-medium Strapi instance
- **No database cost** (using your existing Supabase PostgreSQL) ✅

**Paid Plans:**

- Start at $5/month for more resources
- Pay-as-you-go pricing
- **Database:** Free (Supabase handles it) 🎉

**Total Cost:** Only Railway hosting ($5-10/month), no database fees!

---

## Next Steps

1. ✅ Strapi deployed
2. ✅ Admin user created
3. ✅ Permissions configured
4. ✅ API token created
5. ✅ Web app connected
6. 🎉 Ready to use!

---

Need help? Check Railway logs or Strapi documentation.
