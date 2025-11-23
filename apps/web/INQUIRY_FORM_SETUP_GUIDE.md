# 📋 Inquiry Form Setup Guide

## Step 1: Create Supabase Tables

### Location of SQL File
**File Path:** `apps/web/CREATE_TABLE.sql`

### How to Run in Supabase SQL Editor

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in to your account
   - Select your project

2. **Open SQL Editor**
   - In the left sidebar, click **"SQL Editor"**
   - Or go directly to: `https://supabase.com/dashboard/project/[your-project-id]/sql`

3. **Create New Query**
   - Click **"New query"** button (top right)
   - Or use the `+` icon

4. **Copy and Paste SQL**
   - Open `apps/web/CREATE_TABLE.sql` in your code editor
   - Copy the **entire contents** of the file
   - Paste into the SQL Editor

5. **Run the Query**
   - Click **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
   - Wait for execution (should take ~30 seconds)

6. **Verify Success**
   - You should see: **"Success. No rows returned"**
   - This means all tables were created successfully!

### Alternative: Verify Tables First

If you want to check if tables already exist:

1. Open `apps/web/VERIFY_CONTACT_TABLES.sql`
2. Copy and paste into SQL Editor
3. Run it
4. Check the results - it will tell you which tables exist

---

## Step 2: Get Resend API Key

### Quick Setup (5 minutes)

1. **Sign Up for Resend**
   - Go to: https://resend.com
   - Click **"Sign Up"** (top right)
   - Use your email or GitHub account

2. **Verify Your Email**
   - Check your inbox for verification email
   - Click the verification link

3. **Create API Key**
   - After logging in, go to: https://resend.com/api-keys
   - Click **"Create API Key"** button
   - Give it a name: `ZephorTech Inquiry Form`
   - Select permission: **"Sending access"**
   - Click **"Add"**

4. **Copy Your API Key**
   - ⚠️ **IMPORTANT:** Copy the key immediately!
   - It will look like: `re_1234567890abcdefghijklmnopqrstuvwxyz`
   - You won't be able to see it again after closing the modal
   - Format: `re_` followed by random characters

5. **Add to Environment Variables**
   - Open `apps/web/.env.local`
   - Add this line:
   ```env
   RESEND_API_KEY=re_your_actual_key_here
   ```
   - Replace `re_your_actual_key_here` with your actual key
   - Save the file

6. **Restart Your Dev Server**
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   npm run dev
   ```

### Free Tier Limits

- **3,000 emails per month** (FREE)
- Perfect for inquiry forms and notifications
- No credit card required

### Production Setup (Optional)

For production, you'll need to verify your domain:

1. Go to: https://resend.com/domains
2. Click **"Add Domain"**
3. Follow DNS setup instructions
4. Update your `from` email in the code to use your domain

---

## Step 3: Complete Environment Setup

### Required Variables

Make sure `apps/web/.env.local` contains:

```env
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend (RECOMMENDED for email notifications)
RESEND_API_KEY=re_your_key_here

# Notification Email (OPTIONAL - defaults to info@zephortech.com)
CONTACT_NOTIFICATION_EMAIL=info@zephortech.com
```

### How to Get Supabase Keys

If you don't have Supabase keys yet:

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ Use `service_role`, NOT `anon` key!

---

## Step 4: Test the Form

1. **Start Your Dev Server**
   ```bash
   cd apps/web
   npm run dev
   ```

2. **Navigate to Contact Page**
   - Go to: http://localhost:3000/contact
   - Or any page with the inquiry form

3. **Fill Out and Submit**
   - Fill all required fields
   - Click "Submit"

4. **Verify Success**
   - ✅ Form shows success message
   - ✅ Check Supabase Dashboard → Table Editor → `contact_submissions`
   - ✅ Check your email inbox (if RESEND_API_KEY is set)

---

## Troubleshooting

### ❌ "Table doesn't exist" Error

**Solution:**
- Make sure you ran `CREATE_TABLE.sql` in Supabase SQL Editor
- Verify tables exist using `VERIFY_CONTACT_TABLES.sql`

### ❌ "supabaseUrl is required" Error

**Solution:**
- Check `.env.local` file exists
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set correctly
- Restart dev server after adding env variables

### ❌ "Email notification failed" (but form works)

**Solution:**
- This is OK! Form still saves to database
- To enable emails: Add `RESEND_API_KEY` to `.env.local`
- Restart dev server

### ❌ "Too many requests" Error

**Solution:**
- Rate limiting is working (5 requests per minute)
- Wait 60 seconds and try again
- This prevents spam/abuse

---

## File Locations Summary

| File | Location | Purpose |
|------|----------|---------|
| SQL Setup | `apps/web/CREATE_TABLE.sql` | Creates all database tables |
| SQL Verify | `apps/web/VERIFY_CONTACT_TABLES.sql` | Checks if tables exist |
| API Route | `apps/web/app/api/contact/route.ts` | Handles form submissions |
| Form Component | `apps/web/components/InquiryForm.tsx` | Frontend form UI |
| Env Template | `apps/web/.env.local` | Environment variables |

---

## Quick Reference Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Supabase SQL Editor:** https://supabase.com/dashboard/project/[id]/sql
- **Resend Sign Up:** https://resend.com
- **Resend API Keys:** https://resend.com/api-keys
- **Resend Domains:** https://resend.com/domains

---

## ✅ Setup Checklist

- [ ] Created Supabase tables (ran CREATE_TABLE.sql)
- [ ] Verified tables exist (ran VERIFY_CONTACT_TABLES.sql)
- [ ] Got Resend API key
- [ ] Added RESEND_API_KEY to .env.local
- [ ] Added Supabase keys to .env.local
- [ ] Set CONTACT_NOTIFICATION_EMAIL (optional)
- [ ] Restarted dev server
- [ ] Tested form submission
- [ ] Verified data in Supabase
- [ ] Received email notification (if API key set)

---

**Need Help?** Check the troubleshooting section above or review the error messages in your terminal/browser console.

