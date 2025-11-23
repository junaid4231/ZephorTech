# Contact Form Database Setup

## Issue
The contact/inquiry form is not working because the database tables may not exist in Supabase.

## Solution

### Step 1: Verify Tables Exist
Run the verification script in Supabase Dashboard → SQL Editor:
```sql
-- See VERIFY_CONTACT_TABLES.sql for the full verification script
```

### Step 2: Create Tables (if they don't exist)
Run the setup script in Supabase Dashboard → SQL Editor:
```sql
-- See CREATE_TABLE.sql for the full setup script
```

This will create:
- ✅ `contact_submissions` table
- ✅ `newsletter_subscribers` table  
- ✅ `career_applications` table

### Step 3: Verify Environment Variables
Ensure these are set in `apps/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
CONTACT_NOTIFICATION_EMAIL=your_email@example.com
RESEND_API_KEY=your_resend_api_key
```

### Step 4: Test the Form
1. Navigate to `/contact` or any page with the inquiry form
2. Fill out and submit the form
3. Check Supabase Dashboard → Table Editor → `contact_submissions` to verify the submission was saved

## Expected Behavior
- Form submissions are saved to `contact_submissions` table
- Email notifications are sent to `CONTACT_NOTIFICATION_EMAIL`
- Rate limiting prevents abuse (5 submissions per minute per IP)

## Troubleshooting
If the form still doesn't work after running the SQL:
1. Check browser console for errors
2. Check server logs for API errors
3. Verify Supabase connection in `.env.local`
4. Ensure RLS policies are correctly set (the SQL script handles this)

