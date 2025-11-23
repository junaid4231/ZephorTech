# Blog CMS Setup Guide

## Current Status

✅ **Blog infrastructure is complete:**
- Strapi content types (Blog Post, Author) created
- GraphQL queries configured
- Frontend pages and components ready
- Seed data files exist (`authors-data.json`, `blog-posts-data.json`)

❌ **Blog entries not seeded yet** - Need to run the seed script

---

## Step 1: Verify Strapi is Running

Make sure Strapi is running on port 1337:

```bash
cd apps/cms
pnpm dev
```

You should see Strapi admin at: `http://localhost:1337/admin`

---

## Step 2: Enable Blog Seeding

Add this to `apps/cms/.env`:

```bash
SEED_BLOG=true
```

**Important:** This will seed blog data automatically when Strapi starts.

---

## Step 3: Restart Strapi

After adding `SEED_BLOG=true` to `.env`, restart Strapi:

1. Stop Strapi (Ctrl+C)
2. Start again: `pnpm dev`
3. Watch the console for: `🌱 Running blog seed script...`
4. You should see: `✅ Blog seeding completed`

---

## Step 4: Verify Blog Data in Strapi

1. Go to Strapi admin: `http://localhost:1337/admin`
2. Navigate to **Content Manager**
3. You should see:
   - **Author** collection with 3 authors
   - **Blog Post** collection with blog posts

---

## Step 5: Verify Web Connection

### Option A: Test Connection Script

```bash
cd apps/web
pnpm tsx scripts/test-blog-connection.ts
```

This will test if:
- Strapi is reachable
- GraphQL endpoint works
- Blog posts and authors are accessible

### Option B: Check Web App

1. Make sure `apps/web/.env.local` has:
   ```bash
   NEXT_PUBLIC_USE_CMS=true
   NEXT_PUBLIC_CMS_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_token_here
   ```

2. Start web app:
   ```bash
   cd apps/web
   pnpm dev
   ```

3. Visit: `http://localhost:3000/blog`
   - Should show blog posts from CMS
   - If no posts, will show fallback data

---

## Step 6: Get API Token (If Needed)

If you see "Forbidden" errors:

1. Go to Strapi admin: `http://localhost:1337/admin`
2. Navigate to **Settings** → **API Tokens**
3. Click **Create new API Token**
4. Name: `GraphQL Token`
5. Token type: **Read-only**
6. Token duration: **Unlimited**
7. Click **Save**
8. Copy the token
9. Add to `apps/web/.env.local`:
   ```bash
   STRAPI_API_TOKEN=paste_token_here
   ```

---

## Troubleshooting

### No blog posts after seeding?

1. Check Strapi console for errors
2. Verify `SEED_BLOG=true` is in `apps/cms/.env` (not `.env.local`)
3. Check that seed data files exist:
   - `apps/cms/scripts/authors-data.json`
   - `apps/cms/scripts/blog-posts-data.json`

### Connection errors?

1. Verify Strapi is running: `http://localhost:1337/admin`
2. Check GraphQL endpoint: `http://localhost:1337/graphql`
3. Verify `NEXT_PUBLIC_CMS_URL` in web `.env.local`
4. Check API token is valid

### Still seeing fallback data?

1. Verify `NEXT_PUBLIC_USE_CMS=true` in `apps/web/.env.local`
2. Check browser console for CMS errors
3. Run test script: `pnpm tsx scripts/test-blog-connection.ts`

---

## Manual Seeding (Alternative)

If automatic seeding doesn't work, you can seed manually:

```bash
cd apps/cms
pnpm strapi ts scripts/seed-blog.ts
```

---

## Verify Everything Works

✅ **Checklist:**

- [ ] Strapi running on port 1337
- [ ] `SEED_BLOG=true` in `apps/cms/.env`
- [ ] Blog posts visible in Strapi admin
- [ ] Authors visible in Strapi admin
- [ ] `NEXT_PUBLIC_USE_CMS=true` in `apps/web/.env.local`
- [ ] `STRAPI_API_TOKEN` set in `apps/web/.env.local`
- [ ] Web app shows blog posts from CMS (not fallback)
- [ ] `/blog` page loads without errors
- [ ] Individual blog post pages work

---

## Next Steps

Once blog is seeded and connected:

1. **Add more content** via Strapi admin
2. **Customize blog posts** with images, videos, etc.
3. **Test all blog features:**
   - Tag filtering
   - Featured posts
   - Related posts
   - Content sections
   - Impact stats

---

**Need help?** Check the console logs for specific error messages.

