# How Career Applications Work - For ZephorTech Team

## Quick Overview
When someone applies through your website at `/careers/apply`, here's exactly what happens:

---

## Step-by-Step Process

### 1. **Candidate Visits `/careers` Page**
- Sees "Join Our Talent Network" button
- Clicks to go to `/careers/apply`

### 2. **Candidate Fills Application Form**
Form includes:
- ✅ Full Name (required)
- ✅ Email (required)
- ✅ Phone (optional)
- ✅ Experience Level (required dropdown)
- ✅ Skills (multi-select from 12 options)
- ✅ LinkedIn URL (optional)
- ✅ Portfolio URL (optional)
- ✅ Resume/CV (required - PDF/DOC/DOCX, max 5MB)
- ✅ Cover Letter (optional text area)

### 3. **Form Validation**
Before submission:
- File type checked (PDF, DOC, DOCX only)
- File size checked (max 5MB)
- Required fields validated
- Real-time error messages shown

### 4. **Submission Process**
When "Submit to Talent Network" is clicked:

**A. Resume Upload to Cloud Storage**
- File uploaded to Supabase Storage
- Path: `applications/career-resumes/2024/timestamp-john-doe.pdf`
- Public URL generated (for HR team access)

**B. Data Saved to Database**
All information stored in `career_applications` table:
```
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  full_name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  skills: ["React/Next.js", "TypeScript", "Node.js"],
  experience_level: "3-5 years",
  linkedin_url: "https://linkedin.com/in/johndoe",
  portfolio_url: "https://johnportfolio.com",
  cover_letter: "I'm passionate about...",
  resume_url: "https://supabase.co/storage/.../john-doe.pdf",
  status: "new",
  submitted_at: "2024-11-20T15:30:00Z"
}
```

**C. Email Notification Sent (Optional)**
If configured, email sent to `info@zephortech.com`:
```
Subject: New Talent Network Application - John Doe

Name: John Doe
Email: john@example.com
Phone: +1 (555) 123-4567
Experience: 3-5 years
Skills: React/Next.js, TypeScript, Node.js
LinkedIn: https://linkedin.com/in/johndoe
Portfolio: https://johnportfolio.com

Resume: [Download Link]
```

### 5. **Candidate Sees Success Message**
Beautiful confirmation screen with:
- Success icon
- "Application Submitted Successfully" message
- Options to go back to careers page or homepage

---

## How to Access Applications

### Option 1: Supabase Dashboard (Easiest)

**To View Applications:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **"Table Editor"** in left sidebar
4. Click on **`career_applications`** table
5. You'll see all applications with:
   - Name, email, phone
   - Skills, experience level
   - Submission date
   - Status (new/reviewed/contacted/rejected)
   - Resume URL (clickable link)

**To Download Resumes:**
1. In Supabase Dashboard, go to **"Storage"**
2. Click **`applications`** bucket
3. Navigate to **`career-resumes/2024/`**
4. See all resumes
5. Click any file to:
   - Preview (PDFs)
   - Download
   - Get shareable link

**To Search/Filter:**
- Use table filters: status = "new"
- Sort by: submitted_at (newest first)
- Search by: email, name
- Export to CSV

### Option 2: Email Notifications (If Configured)
- Instant email to `info@zephortech.com`
- Contains all candidate details
- Direct link to resume
- Just reply to candidate's email

---

## Application Status Management

You can update the status of applications:

**Status Values:**
- **`new`** - Just submitted (default)
- **`reviewed`** - You've looked at it
- **`contacted`** - You've reached out to candidate
- **`rejected`** - Not a fit

**How to Update:**
1. In Supabase Table Editor
2. Click on any row
3. Change `status` field
4. Add notes (future feature)

---

## Security & Privacy

✅ **Secure:**
- All data encrypted in transit (HTTPS)
- Resume storage is public by design (necessary for HR access)
- Supabase has enterprise-grade security
- Row-level security enabled on database

⚠️ **Note:** Resumes are publicly accessible if you have the URL. This is intentional so HR team can easily access them. If you need additional security, we can implement:
- Signed URLs with expiration
- Authentication required for downloads
- Admin-only access

---

## Useful SQL Queries

If you want to run custom queries in Supabase SQL Editor:

```sql
-- Get all new applications from last 7 days
SELECT full_name, email, skills, submitted_at, resume_url
FROM career_applications
WHERE status = 'new'
AND submitted_at > NOW() - INTERVAL '7 days'
ORDER BY submitted_at DESC;

-- Find candidates with specific skills
SELECT full_name, email, skills, experience_level
FROM career_applications
WHERE skills @> '["React/Next.js"]'
ORDER BY submitted_at DESC;

-- Get count by status
SELECT status, COUNT(*) as count
FROM career_applications
GROUP BY status;

-- Get applications by experience level
SELECT experience_level, COUNT(*) as count
FROM career_applications
GROUP BY experience_level
ORDER BY count DESC;
```

---

## Troubleshooting

### "I can't see any applications"
- Check you're logged into correct Supabase project
- Verify table name is `career_applications`
- Check if any submissions were actually made (test the form)

### "Resume download link doesn't work"
- Check storage bucket is set to public
- Verify file was uploaded (check Storage → applications)
- Check file permissions

### "No email notifications"
- Email is optional - applications still save without it
- Check if `RESEND_API_KEY` is configured
- Check email settings in Resend dashboard
- Check API logs for errors

---

## Future Enhancements

We can add:
- 📊 **Admin Dashboard** - Dedicated UI at `/admin/applications`
- 📧 **Auto-responses** - Send confirmation emails to candidates
- 🔍 **Advanced Search** - Filter by multiple criteria
- 📈 **Analytics** - Track application sources, conversion rates
- 📁 **Bulk Actions** - Export multiple resumes at once
- 💬 **Notes & Comments** - Team collaboration on candidates
- 📅 **Interview Scheduling** - Integrated calendar
- 🔔 **Slack/Discord Notifications** - Real-time alerts

---

## Contact & Support

For technical issues:
- Check server logs: `pnpm dev` terminal output
- Check browser console: Right-click → Inspect → Console
- Check Supabase logs: Project → Logs → All logs

Need changes or enhancements? Just ask! 🚀

