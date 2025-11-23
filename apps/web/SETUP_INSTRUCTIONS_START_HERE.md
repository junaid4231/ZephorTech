# 🚀 START HERE - Career Application System Setup

## 📍 You Are Here

Your career application system is **100% built and ready**. You just need to connect it to a database (Supabase) to start receiving applications.

---

## ⏱️ Quick Setup (15 Minutes Total)

```
Step 1: Create Supabase Account    → 5 minutes
Step 2: Run SQL Scripts             → 3 minutes  
Step 3: Add Environment Variables   → 2 minutes
Step 4: Test the Form               → 5 minutes
─────────────────────────────────────────────
TOTAL TIME:                         15 minutes
```

---

## 📋 What You Need

- [ ] Supabase account (free - we'll create this)
- [ ] 15 minutes of your time
- [ ] That's it!

---

## 🎯 Step-by-Step Instructions

### **STEP 1: Create Supabase Project (5 min)**

1. **Go to:** https://supabase.com/dashboard
2. **Sign up** with GitHub or email
3. Click **"New Project"**
4. Fill in:
   ```
   Name: zephortech-careers
   Database Password: [Generate strong password - SAVE THIS!]
   Region: [Choose closest to your users]
   ```
5. Click **"Create new project"**
6. Wait 2-3 minutes while it sets up ☕

---

### **STEP 2: Create Storage Bucket (2 min)**

1. In your project, click **"Storage"** (left sidebar)
2. Click **"New bucket"**
3. Fill in:
   ```
   Name: applications
   Public bucket: ✅ CHECK THIS BOX
   ```
4. Click **"Create bucket"**

Done! This is where resumes will be stored.

---

### **STEP 3: Create Database Table (3 min)**

1. Click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. **Copy & paste this entire script:**

```sql
-- Create career_applications table
CREATE TABLE career_applications (
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
CREATE INDEX idx_career_applications_status ON career_applications(status);
CREATE INDEX idx_career_applications_submitted_at ON career_applications(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Allow API to insert applications
CREATE POLICY "Service role can insert"
ON career_applications FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view (for future admin dashboard)
CREATE POLICY "Authenticated can view"
ON career_applications FOR SELECT
USING (auth.role() = 'authenticated');
```

4. Click **"Run"** button (bottom right)
5. You should see: ✅ "Success. No rows returned"

---

### **STEP 4: Get Your API Keys (1 min)**

1. Click **"Settings"** → **"API"** (left sidebar)
2. You'll see this information:

**Copy these 3 things:**

✅ **Project URL**
```
https://xxxxxxxxxxxxx.supabase.co
```

✅ **anon public key** (starts with `eyJhbGc...`)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
```

✅ **service_role secret key** (starts with `eyJhbGc...`)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
```

---

### **STEP 5: Add Environment Variables (2 min)**

1. In your project, create file: **`apps/web/.env.local`**

2. **Paste this** and replace with YOUR keys:

```bash
# Strapi CMS (existing)
NEXT_PUBLIC_CMS_URL=http://localhost:1337
NEXT_PUBLIC_USE_CMS=false
STRAPI_API_TOKEN=your_strapi_token

# Supabase (NEW - for Career Applications)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Notifications (Optional - skip for now)
# RESEND_API_KEY=re_xxxxx
```

3. **Save the file**

---

### **STEP 6: Test It! (5 min)**

1. **Start your dev server:**
   ```bash
   cd apps/web
   pnpm dev
   ```

2. **Visit:** http://localhost:3000/careers/apply

3. **Fill out the form:**
   - Use your real email
   - Upload a test PDF
   - Select some skills
   - Submit!

4. **Check if it worked:**
   - Go back to Supabase Dashboard
   - Click **"Table Editor"** → `career_applications`
   - You should see your test application! 🎉

5. **Check the resume:**
   - Click **"Storage"** → `applications` → `career-resumes`
   - You should see your uploaded file!

---

## ✅ You're Done!

### **Now When Someone Applies:**

1. **They visit:** zephortech.com/careers
2. **They click:** "Join Our Talent Network"
3. **They fill out** the professional form
4. **Their application is saved** to Supabase
5. **You can view it anytime** in Supabase Dashboard

---

## 📊 How to View Applications

### **Method 1: Supabase Dashboard**
1. Login to https://supabase.com/dashboard
2. Select your project
3. Click **"Table Editor"** → `career_applications`
4. See all applications with sorting, filtering, search
5. Click **"Storage"** → `applications` to download resumes

### **Method 2: SQL Queries**
```sql
-- Get new applications
SELECT * FROM career_applications 
WHERE status = 'new' 
ORDER BY submitted_at DESC;

-- Search by skill
SELECT * FROM career_applications 
WHERE skills @> '["React/Next.js"]';
```

---

## 🎨 What the Form Looks Like

The application form (`/careers/apply`) includes:

**Personal Information:**
- Full Name, Email, Phone
- Experience Level dropdown

**Professional Links:**
- LinkedIn URL
- Portfolio/Website URL

**Skills & Expertise:**
- Multi-select from 12 predefined skills:
  - React/Next.js, TypeScript, Node.js
  - Python, AI/ML, DevOps
  - AWS/GCP/Azure, Mobile Development
  - UI/UX Design, Product Management
  - Data Engineering, Blockchain

**Resume Upload:**
- Drag & drop or browse
- Accepts PDF, DOC, DOCX (max 5MB)
- Visual file preview

**Cover Letter:**
- Optional text area

**Features:**
- ✅ Real-time validation
- ✅ Beautiful success screen
- ✅ Mobile responsive
- ✅ Fully accessible
- ✅ Professional design

---

## 📧 Optional: Email Notifications

**Want to receive emails when someone applies?**

1. Sign up at https://resend.com (free)
2. Verify your domain
3. Generate API key
4. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```

**Email will include:**
- Candidate name, email, phone
- Skills and experience
- Direct link to resume
- Sent to: info@zephortech.com

---

## 🆘 Troubleshooting

### "Form submission failed"
- Check `.env.local` file exists in `apps/web/`
- Verify all 3 Supabase keys are correct
- Restart dev server: Stop (Ctrl+C) and run `pnpm dev` again

### "File upload failed"
- Check storage bucket is named exactly `applications`
- Verify bucket is set to **public** ✅
- Check file is under 5MB and is PDF/DOC/DOCX

### "Can't see applications in Supabase"
- Check table is named exactly `career_applications`
- Verify SQL script ran successfully
- Try refreshing the Supabase page

### "Getting errors in console"
- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console for specific error message

---

## 📚 More Documentation

**For detailed info, see:**

- **`CAREERS_SYSTEM_SUMMARY.md`** - Complete overview
- **`SUPABASE_QUICKSTART.md`** - Detailed setup guide
- **`CAREERS_SETUP.md`** - Technical documentation
- **`HOW_APPLICATIONS_WORK.md`** - For your HR team

---

## 🎉 That's It!

**Your career application system is live!** 

Test it yourself at `/careers/apply` and start receiving applications! 🚀

**Questions?** Check the docs above or ask me directly!

---

## 🔗 Quick Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Your Application Form:** http://localhost:3000/careers/apply
- **Careers Page:** http://localhost:3000/careers
- **Resend (for emails):** https://resend.com

---

**Status: ✅ READY TO USE**

Just follow the 6 steps above and you're live in 15 minutes!

