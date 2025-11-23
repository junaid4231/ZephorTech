# 🚀 Add Career Applications to Your Existing Supabase

## ⏱️ Quick Setup (5 Minutes)

Since you **already have Supabase set up**, you just need to:
1. Add a new table to your database
2. Add a new storage bucket
3. Done! ✅

---

## Step 1: Add Database Table (2 minutes)

1. **Go to your Supabase Dashboard**
   - https://supabase.com/dashboard
   - Select your existing ZephorTech project

2. **Click "SQL Editor"** (left sidebar)

3. **Click "New query"**

4. **Copy & paste this script:**

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

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_career_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_career_applications_submitted_at ON career_applications(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Allow service role (API) to insert applications
DROP POLICY IF EXISTS "Service role can insert" ON career_applications;
CREATE POLICY "Service role can insert"
ON career_applications FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view (for future admin dashboard)
DROP POLICY IF EXISTS "Authenticated can view" ON career_applications;
CREATE POLICY "Authenticated can view"
ON career_applications FOR SELECT
USING (auth.role() = 'authenticated');
```

5. **Click "Run"** (bottom right)

6. ✅ You should see: **"Success. No rows returned"**

---

## Step 2: Add Storage Bucket (2 minutes)

1. **In Supabase Dashboard, click "Storage"** (left sidebar)

2. **Check if you already have a bucket named `applications`**
   - If yes, skip to Step 3
   - If no, continue below

3. **Click "New bucket"**

4. **Fill in:**
   ```
   Name: applications
   Public bucket: ✅ CHECK THIS BOX
   ```

5. **Click "Create bucket"**

6. ✅ Done!

---

## Step 3: Verify Environment Variables (1 minute)

Your `.env.local` file should already have these from your existing Supabase setup:

```bash
# These should already exist
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**If you don't have these yet:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the values
3. Add to `apps/web/.env.local`

---

## Step 4: Test It! (1 minute)

1. **Start your dev server** (if not already running):
   ```bash
   cd apps/web
   pnpm dev
   ```

2. **Visit:** http://localhost:3000/careers/apply

3. **Submit a test application:**
   - Fill out the form
   - Upload a test PDF
   - Click submit

4. **Verify it worked:**
   - Go to Supabase Dashboard
   - Click **"Table Editor"** → `career_applications`
   - You should see your test application! 🎉

5. **Check the resume:**
   - Click **"Storage"** → `applications` → `career-resumes`
   - You should see your uploaded file!

---

## ✅ That's It!

Since you already have Supabase set up, it was just:
- ✅ One SQL script (2 min)
- ✅ One storage bucket (2 min)
- ✅ Test (1 min)

**Total time: 5 minutes**

---

## 📊 How to View Applications

### **Supabase Dashboard:**
1. Login to your existing Supabase project
2. **Table Editor** → `career_applications` table
   - See all applications
   - Sort, filter, search
   - Update status
3. **Storage** → `applications` bucket
   - Download resumes
   - View all files

### **SQL Queries:**
```sql
-- Get new applications
SELECT * FROM career_applications 
WHERE status = 'new' 
ORDER BY submitted_at DESC;

-- Find candidates with specific skills
SELECT * FROM career_applications 
WHERE skills @> '["React/Next.js"]';

-- Get applications from last 7 days
SELECT * FROM career_applications 
WHERE submitted_at > NOW() - INTERVAL '7 days';
```

---

## 🔐 Security

The table has Row-Level Security (RLS) enabled:
- ✅ API can insert applications (service role)
- ✅ Authenticated users can view (for admin dashboard)
- ✅ Public cannot read/write directly

The storage bucket is public:
- ✅ Necessary so HR can download resumes
- ✅ Files only accessible if you have the exact URL
- ✅ URLs are not guessable (timestamp-based)

---

## 📧 Optional: Email Notifications

If you want email notifications when someone applies:

1. **Sign up at:** https://resend.com (free tier)
2. **Verify your domain**
3. **Generate API key**
4. **Add to `.env.local`:**
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```

5. **Update email addresses in API route:**
   - File: `apps/web/app/api/careers/apply/route.ts`
   - Line ~105: Change `from: "careers@zephortech.com"` to your verified email
   - Line ~106: Change `to: "info@zephortech.com"` to where you want notifications

---

## 🆘 Troubleshooting

### "Table already exists" error
- No problem! The script uses `IF NOT EXISTS`
- Just means the table was already created

### "Bucket already exists" error
- Perfect! You can use the existing bucket
- Make sure it's set to public

### "Cannot insert into table"
- Check RLS policies were created
- Verify `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

### Form submission fails
- Check all 3 Supabase environment variables are set
- Restart dev server: Stop (Ctrl+C) and `pnpm dev` again

---

## 📚 Full Documentation

For more details, see:
- **`README_CAREERS_SYSTEM.md`** - Complete overview
- **`HOW_APPLICATIONS_WORK.md`** - For HR team
- **`CAREERS_SYSTEM_SUMMARY.md`** - Technical details
- **`SYSTEM_FLOW_DIAGRAM.md`** - Visual flows

---

## ✅ Checklist

- [ ] Run SQL script in Supabase SQL Editor
- [ ] Create `applications` storage bucket (if doesn't exist)
- [ ] Verify environment variables in `.env.local`
- [ ] Test form submission
- [ ] Check data in Supabase table
- [ ] Download test resume from Storage
- [ ] Optional: Configure email notifications

---

## 🎉 You're Live!

Your career application system is now integrated with your existing Supabase setup!

Test it at: http://localhost:3000/careers/apply

---

**Questions?** Check the comprehensive docs in the `apps/web/` directory.

