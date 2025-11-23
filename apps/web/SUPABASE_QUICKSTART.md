# Supabase Quick Setup for Career Applications

## 1. Create a Supabase Project (5 minutes)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `zephortech-careers` (or any name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** (takes 2-3 minutes)

---

## 2. Create Storage Bucket (2 minutes)

1. In your project, go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Fill in:
   - **Name**: `applications`
   - **Public bucket**: ✅ Check this (so HR can access resumes)
4. Click **"Create bucket"**

### Set Storage Policies:
1. Click on the `applications` bucket
2. Go to **Policies** tab
3. Click **"New policy"**
4. For **SELECT** (view):
   ```
   Name: Public can view applications
   Policy: (bucket_id = 'applications')
   ```
   Click "Review" → "Save policy"

5. Click **"New policy"** again
6. For **INSERT** (upload):
   ```
   Name: Service can upload
   Policy: true
   ```
   Click "Review" → "Save policy"

---

## 3. Create Database Table (3 minutes)

1. Go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Paste this SQL:

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

-- Create indexes
CREATE INDEX idx_career_applications_status ON career_applications(status);
CREATE INDEX idx_career_applications_submitted_at ON career_applications(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert
CREATE POLICY "Service role can insert"
ON career_applications FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view (for future admin dashboard)
CREATE POLICY "Authenticated can view"
ON career_applications FOR SELECT
USING (auth.role() = 'authenticated');
```

4. Click **"Run"** (bottom right)
5. You should see "Success. No rows returned"

---

## 4. Get Your API Keys (1 minute)

1. Go to **Settings** → **API** (left sidebar)
2. You'll see:

**Project URL**: `https://xxxxxxxxx.supabase.co`
Copy this → This is your `NEXT_PUBLIC_SUPABASE_URL`

**API Keys**:
- **`anon` `public`**: Copy this → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **`service_role` `secret`**: Copy this → This is your `SUPABASE_SERVICE_ROLE_KEY`

---

## 5. Add Environment Variables (2 minutes)

1. Open `apps/web/.env.local` (create if doesn't exist)
2. Add these lines:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Notifications (Optional - skip for now)
# RESEND_API_KEY=re_xxxxx
```

3. Replace the values with your actual keys from Step 4
4. Save the file

---

## 6. Install Dependencies & Test (2 minutes)

```bash
# In apps/web directory
pnpm install

# Start the dev server
pnpm dev
```

Visit `http://localhost:3000/careers/apply` and test the form!

---

## ✅ You're Done!

### To View Applications:

1. **In Supabase Dashboard**:
   - Go to **Table Editor** → `career_applications`
   - You'll see all submissions here

2. **To Download Resumes**:
   - Go to **Storage** → `applications` → `career-resumes`
   - Click on any file to download

---

## Optional: Email Notifications (5 minutes)

Want to receive emails when someone applies?

1. Sign up at [https://resend.com](https://resend.com)
2. Verify your domain (or use their test domain `onboarding.resend.dev`)
3. Generate an API key
4. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   ```
5. Update email addresses in `apps/web/app/api/careers/apply/route.ts`:
   - Line ~105: Change `from: "careers@zephortech.com"` to your verified email
   - Line ~106: Change `to: "info@zephortech.com"` to where you want to receive applications

---

## Troubleshooting

### "Upload failed"
- Check storage bucket is named exactly `applications`
- Verify bucket is public
- Check storage policies allow inserts

### "Database insert failed"
- Verify table is named exactly `career_applications`
- Check RLS policies are created
- Ensure all required fields in form are filled

### "Cannot connect to Supabase"
- Double-check environment variables
- Make sure `.env.local` is in `apps/web/` directory
- Restart dev server after adding env vars

---

## Need Help?

Check the full documentation in `CAREERS_SETUP.md` or:
- [Supabase Docs](https://supabase.com/docs)
- [Resend Docs](https://resend.com/docs)

