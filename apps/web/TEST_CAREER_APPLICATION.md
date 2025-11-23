# ✅ Test Your Career Application System

## 🎉 Setup Complete!

You've successfully:
- ✅ Created `career_applications` table
- ✅ Created `applications` storage bucket
- ✅ Configured environment variables

Now let's test it!

---

## 🧪 Step-by-Step Testing

### **Step 1: Start Dev Server**

```bash
cd apps/web
pnpm dev
```

Wait for: `✓ Ready in X seconds`

---

### **Step 2: Visit Application Form**

Open browser: **http://localhost:3000/careers/apply**

You should see:
- Beautiful application form
- "Submit Your Profile" heading
- Form fields (name, email, skills, etc.)
- File upload area

---

### **Step 3: Fill Out Test Application**

**Fill in:**
- ✅ Full Name: `Test Candidate`
- ✅ Email: `test@example.com` (use your real email to test notifications)
- ✅ Phone: `+1 (555) 123-4567`
- ✅ Experience Level: Select any (e.g., "3-5 years")
- ✅ Skills: Click a few (e.g., "React/Next.js", "TypeScript")
- ✅ LinkedIn: `https://linkedin.com/in/test` (optional)
- ✅ Portfolio: `https://testportfolio.com` (optional)
- ✅ Resume: Upload a test PDF (any PDF file)
- ✅ Cover Letter: `This is a test application to verify the system works.`

---

### **Step 4: Submit Form**

1. Click **"Submit to Talent Network"** button
2. You should see:
   - Loading spinner ("Submitting...")
   - Then success screen with checkmark ✅
   - "Application Submitted Successfully!" message

---

### **Step 5: Verify in Supabase**

#### **A. Check Database Table**

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Click **"Table Editor"** (left sidebar)
3. Click **`career_applications`** table
4. You should see:
   - Your test application row
   - All the data you entered
   - Status: `new`
   - `resume_url` column with a URL

#### **B. Check Storage**

1. In Supabase, click **"Storage"** (left sidebar)
2. Click **`applications`** bucket
3. Navigate to **`career-resumes/2024/`** (or current year)
4. You should see:
   - Your uploaded PDF file
   - Named like: `1700000000-test-candidate.pdf`

#### **C. Download Resume**

1. Click on the file in Storage
2. Click **"Download"** or copy the URL
3. Open in browser - should download your PDF!

---

## ✅ Success Checklist

- [ ] Form loads correctly at `/careers/apply`
- [ ] Can fill out all fields
- [ ] File upload works (drag & drop or browse)
- [ ] Form submission shows loading state
- [ ] Success screen appears after submission
- [ ] Data appears in `career_applications` table
- [ ] Resume file appears in Storage bucket
- [ ] Can download resume from Storage

---

## 🐛 Troubleshooting

### **Form submission fails with error**

**Check:**
1. Browser console (F12 → Console tab) for errors
2. Terminal where `pnpm dev` is running for server errors
3. Verify `.env.local` has all 3 Supabase variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

**Common issues:**
- Missing `SUPABASE_SERVICE_ROLE_KEY` → Get from Supabase Dashboard → Settings → API
- Wrong bucket name → Should be exactly `applications`
- Bucket not public → Check bucket settings, enable public access

### **"Failed to upload resume" error**

**Check:**
1. Storage bucket exists and is named `applications`
2. Bucket is set to **public**
3. File is PDF/DOC/DOCX and under 5MB

### **"Failed to save application" error**

**Check:**
1. Table `career_applications` exists (verify in Table Editor)
2. RLS policies are created (check in SQL Editor)
3. `SUPABASE_SERVICE_ROLE_KEY` is correct (service_role, not anon key)

### **No data in table after submission**

**Check:**
1. Refresh Supabase Table Editor
2. Check browser console for API errors
3. Check terminal for server errors
4. Verify API route is working: Check Network tab in browser DevTools

---

## 📧 Test Email Notifications (Optional)

If you configured Resend:

1. Submit another test application
2. Check email at `info@zephortech.com` (or whatever you set)
3. You should receive email with:
   - Candidate details
   - Direct link to resume

**If no email:**
- Check `RESEND_API_KEY` in `.env.local`
- Verify domain in Resend dashboard
- Check Resend logs for errors

---

## 🎯 Next Steps After Testing

Once everything works:

1. **Update Email Addresses** (if needed):
   - File: `apps/web/app/api/careers/apply/route.ts`
   - Line ~105: Change `from: "careers@zephortech.com"`
   - Line ~106: Change `to: "info@zephortech.com"`

2. **Share with Team:**
   - Share `HOW_APPLICATIONS_WORK.md` with HR team
   - Show them how to access Supabase dashboard
   - Train them on viewing applications

3. **Go Live:**
   - Deploy to production
   - Update production environment variables
   - Test on production URL

---

## 📊 What You Should See

### **In Supabase Table:**
```
career_applications
├── id: uuid
├── full_name: "Test Candidate"
├── email: "test@example.com"
├── phone: "+1 (555) 123-4567"
├── skills: ["React/Next.js", "TypeScript"]
├── experience_level: "3-5 years"
├── resume_url: "https://supabase.co/storage/..."
├── status: "new"
└── submitted_at: "2024-11-20T..."
```

### **In Storage:**
```
applications/
└── career-resumes/
    └── 2024/
        └── 1700000000-test-candidate.pdf
```

---

## 🎉 You're Done!

If all tests pass, your career application system is **fully functional**!

**Test it now and let me know if you encounter any issues!** 🚀

