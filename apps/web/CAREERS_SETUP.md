# Careers Application System Setup Guide

## Overview
The careers application system allows candidates to submit their profiles to join ZephorTech's talent network. Applications include resume upload, skills selection, and professional links.

---

## Architecture

### Frontend
- **Application Form**: `/careers/apply`
- **Form Component**: `CareerApplicationForm.tsx`
- Features:
  - File upload (drag & drop + browse)
  - Skills multi-select
  - Form validation
  - Success/error states
  - Mobile responsive

### Backend
- **API Endpoint**: `/api/careers/apply`
- Handles:
  - File upload to Supabase Storage
  - Data saving to Supabase Database
  - Email notifications (optional)

### Data Storage
- **Supabase Storage**: `applications/career-resumes/YEAR/filename.pdf`
- **Supabase Database**: `career_applications` table

---

## Setup Instructions

### 1. Supabase Configuration

#### A. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and keys

#### B. Create Storage Bucket
```sql
-- In Supabase SQL Editor, create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true);

-- Set storage policies (allow public read, authenticated write)
CREATE POLICY "Public can view applications"
ON storage.objects FOR SELECT
USING (bucket_id = 'applications');

CREATE POLICY "Authenticated can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'applications');
```

#### C. Create Database Table
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

-- Create index for faster queries
CREATE INDEX idx_career_applications_status ON career_applications(status);
CREATE INDEX idx_career_applications_submitted_at ON career_applications(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (API can insert)
CREATE POLICY "Service role can insert applications"
ON career_applications FOR INSERT
WITH CHECK (true);

-- Create policy for authenticated users to view (for admin dashboard)
CREATE POLICY "Authenticated can view applications"
ON career_applications FOR SELECT
USING (auth.role() = 'authenticated');
```

### 2. Environment Variables

Add to `apps/web/.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Email Notifications (Optional)
RESEND_API_KEY=re_your_resend_api_key
```

**Where to find Supabase keys:**
1. Go to your Supabase project
2. Settings → API
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Email Notifications (Optional)

Using [Resend](https://resend.com) for email notifications:

1. Sign up at resend.com
2. Verify your domain (or use testing domain)
3. Generate API key
4. Add `RESEND_API_KEY` to `.env.local`

**Email will be sent to**: `info@zephortech.com`
**Email will be from**: `careers@zephortech.com`

---

## How It Works

### User Journey:
1. User visits `/careers` page
2. Clicks "Join Our Talent Network"
3. Lands on `/careers/apply` form
4. Fills out information:
   - Personal details
   - Skills selection
   - Uploads resume (PDF/DOC/DOCX, max 5MB)
   - Optional cover letter
5. Submits form
6. Sees success confirmation

### Backend Process:
1. Form data received at `/api/careers/apply`
2. Resume uploaded to Supabase Storage:
   - Path: `applications/career-resumes/2024/john-doe-resume.pdf`
   - Public URL generated
3. Application data saved to database
4. Email notification sent to `info@zephortech.com` (if configured)
5. Success response returned to frontend

---

## Accessing Applications

### Method 1: Supabase Dashboard (Recommended)

1. **View Applications**:
   - Login to Supabase
   - Go to "Table Editor"
   - Select `career_applications` table
   - Sort, filter, search applications

2. **Download Resumes**:
   - Go to "Storage"
   - Navigate to `applications/career-resumes/`
   - Download any resume

3. **Update Status**:
   - Click on any row to edit
   - Change `status` field: `new` → `reviewed` → `contacted`

### Method 2: SQL Queries

```sql
-- Get all new applications
SELECT 
  full_name,
  email,
  experience_level,
  skills,
  resume_url,
  submitted_at
FROM career_applications
WHERE status = 'new'
ORDER BY submitted_at DESC;

-- Search by skills
SELECT *
FROM career_applications
WHERE skills @> '["React/Next.js"]'
ORDER BY submitted_at DESC;

-- Get applications from last 30 days
SELECT *
FROM career_applications
WHERE submitted_at > NOW() - INTERVAL '30 days'
ORDER BY submitted_at DESC;
```

### Method 3: Email Notifications

If email is configured, you'll receive instant notifications at `info@zephortech.com` with:
- Candidate details
- Skills
- Direct link to resume
- Link to LinkedIn/Portfolio

---

## Database Schema

```typescript
interface CareerApplication {
  id: string;                    // UUID
  full_name: string;             // Required
  email: string;                 // Required
  phone: string | null;          // Optional
  linkedin_url: string | null;   // Optional
  portfolio_url: string | null;  // Optional
  skills: string[];              // Array of selected skills
  experience_level: string;      // Required: "0-1 years", "1-3 years", etc.
  cover_letter: string | null;   // Optional
  resume_url: string;            // Required: Public URL to resume
  status: "new" | "reviewed" | "contacted" | "rejected";
  submitted_at: Date;            // Timestamp
  created_at: Date;              // Auto-generated
  updated_at: Date;              // Auto-generated
}
```

---

## File Storage Structure

```
applications/
└── career-resumes/
    ├── 2024/
    │   ├── 1700000000-john-doe.pdf
    │   ├── 1700000001-jane-smith.docx
    │   └── ...
    └── 2025/
        └── ...
```

---

## Troubleshooting

### Resume upload fails
- Check Supabase storage bucket exists: `applications`
- Verify bucket is set to `public`
- Check storage policies allow uploads
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set correctly

### Database insert fails
- Verify table `career_applications` exists
- Check RLS policies allow service role inserts
- Ensure all required fields are provided

### No email notifications
- Email is optional, application will still save
- Check `RESEND_API_KEY` is set
- Verify sending domain in Resend dashboard
- Check API logs for email errors

### Applications not visible in dashboard
- Check Supabase RLS policies
- Ensure you're logged into correct project
- Verify table name is `career_applications`

---

## Future Enhancements

Potential additions:
1. **Admin Dashboard**: `/admin/applications` with filtering, export
2. **Applicant Tracking**: Status updates, notes, interviews
3. **Email Templates**: Automated responses to applicants
4. **Analytics**: Track application sources, conversion rates
5. **Search/Filter**: Advanced search by skills, experience
6. **Bulk Actions**: Bulk status updates, exports

---

## Security Considerations

- ✅ File upload validation (type, size)
- ✅ Supabase RLS policies
- ✅ Service role key (server-side only)
- ✅ Email validation
- ✅ SQL injection prevention (parameterized queries)
- ✅ Public storage for resumes (necessary for HR review)

**Note**: Resumes are publicly accessible by URL. This is intentional for easy HR access. Store sensitive data separately if needed.

---

## Support

For issues or questions:
- Check Supabase logs: Project → Logs
- Check Next.js logs: Terminal where `pnpm dev` runs
- Review API errors in browser console (Network tab)

