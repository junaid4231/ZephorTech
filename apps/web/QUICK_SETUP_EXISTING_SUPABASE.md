# ⚡ 3-Minute Setup - Using Your Existing Supabase

Since you **already have Supabase configured for your CMS**, this is super simple!

---

## ✅ What You Already Have

Your `apps/cms/config/plugins.ts` shows you're using Supabase for:
- Strapi file uploads
- With environment variables:
  - `SUPABASE_API_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_BUCKET` (currently `strapi-uploads`)

---

## 🚀 3-Minute Setup

### Step 1: Add Environment Variables to Web App (1 minute)

You need to copy your Supabase credentials from the CMS to the Web app.

**Create:** `apps/web/.env.local`

```bash
# Strapi CMS (existing)
NEXT_PUBLIC_CMS_URL=http://localhost:1337
NEXT_PUBLIC_USE_CMS=false
STRAPI_API_TOKEN=your_strapi_token

# Supabase (NEW - copy from apps/cms/.env)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url        # Same as SUPABASE_API_URL from CMS
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key   # Same as SUPABASE_ANON_KEY from CMS
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Get from Supabase Dashboard → Settings → API

# Optional: Email Notifications
# RESEND_API_KEY=re_xxxxx
```

**Where to find `SUPABASE_SERVICE_ROLE_KEY`:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy the `service_role` secret key

---

### Step 2: Add Storage Bucket (1 minute)

1. **Login to Supabase Dashboard:** https://supabase.com/dashboard
2. Click **"Storage"** (left sidebar)
3. You'll see your existing `strapi-uploads` bucket
4. Click **"New bucket"**
5. Fill in:
   ```
   Name: applications
   Public bucket: ✅ CHECK THIS BOX
   ```
6. Click **"Create bucket"**

✅ Done! This bucket will store career application resumes (separate from CMS uploads).

---

### Step 3: Add Database Table (1 minute)

1. In Supabase Dashboard, click **"SQL Editor"**
2. Click **"New query"**
3. **Paste this script:**

```sql
-- Create career_applications table
CREATE TABLE IF NOT EXISTS career_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  skills JSONB DEFAULT '[]',
  experience_level TEXT NOT NULL,
  cover_letter TEXT,
  resume_url TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_career_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_career_applications_submitted_at ON career_applications(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Allow API to insert
DROP POLICY IF EXISTS "Service role can insert" ON career_applications;
CREATE POLICY "Service role can insert"
ON career_applications FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view
DROP POLICY IF EXISTS "Authenticated can view" ON career_applications;
CREATE POLICY "Authenticated can view"
ON career_applications FOR SELECT
USING (auth.role() = 'authenticated');
```

4. Click **"Run"**
5. ✅ Should see: "Success. No rows returned"

---

## ✅ That's It! Test It

### 1. Start Dev Server:
```bash
cd apps/web
pnpm dev
```

### 2. Visit Application Page:
http://localhost:3000/careers/apply

### 3. Submit Test Application:
- Fill out form
- Upload a PDF
- Click submit

### 4. Verify in Supabase:
- Go to **Table Editor** → `career_applications`
- See your test application!
- Go to **Storage** → `applications` → `career-resumes`
- See your uploaded file!

---

## 📊 How Your Supabase is Now Organized

```
YOUR SUPABASE PROJECT
│
├── Storage Buckets
│   ├── strapi-uploads/          (Existing - CMS files)
│   └── applications/             (New - Career resumes)
│       └── career-resumes/
│           ├── 2024/
│           │   ├── john-doe.pdf
│           │   └── jane-smith.docx
│           └── 2025/
│
└── Database Tables
    ├── (Your existing Strapi tables)
    └── career_applications      (New)
```

---

## 🔐 Security Note

**Storage Buckets:**
- `strapi-uploads` → Your CMS files (images, etc.)
- `applications` → Career resumes (public for HR access)

**Both are in the same Supabase project but separate buckets** - no conflicts!

---

## 📧 Optional: Email Notifications

Want emails when someone applies?

1. Sign up at https://resend.com (free)
2. Get API key
3. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_api_key
   ```
4. Update email addresses in `apps/web/app/api/careers/apply/route.ts`:
   - Line ~105: `from: "careers@zephortech.com"`
   - Line ~106: `to: "info@zephortech.com"`

---

## 🆘 Troubleshooting

### "Cannot connect to Supabase"
→ Check `.env.local` has all 3 Supabase variables  
→ Restart dev server

### "Bucket already exists"
→ Perfect! Someone already created it. Just use it.

### "Table already exists"
→ Great! The script uses `IF NOT EXISTS` so it's safe to rerun.

### Form submission fails
→ Verify `SUPABASE_SERVICE_ROLE_KEY` is the **service_role** key (not anon key)  
→ Check bucket is set to **public**

---

## 📚 More Info

See these docs in `apps/web/`:
- **`README_CAREERS_SYSTEM.md`** - Complete overview
- **`HOW_APPLICATIONS_WORK.md`** - For your HR team
- **`SYSTEM_FLOW_DIAGRAM.md`** - Visual flows

---

## ✅ Checklist

- [ ] Copy Supabase credentials to `apps/web/.env.local`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` from Dashboard
- [ ] Create `applications` storage bucket
- [ ] Run SQL script to create table
- [ ] Test form submission
- [ ] Verify data in Supabase table
- [ ] Download test resume from Storage
- [ ] Optional: Configure email notifications

---

**Total Time: 3 minutes** ⚡

Your existing Supabase + 1 bucket + 1 table = Done! 🎉

