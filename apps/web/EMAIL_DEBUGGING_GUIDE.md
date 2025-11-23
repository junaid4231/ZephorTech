# 🔍 Email Debugging Guide

## Problem: Emails Not Sending

If inquiry form data is saved to Supabase but emails aren't being sent, follow these steps:

---

## Step 1: Check Environment Variables

### Verify RESEND_API_KEY is Set

1. **Check your `.env.local` file:**
   ```bash
   # Location: apps/web/.env.local
   RESEND_API_KEY=re_your_key_here
   ```

2. **Verify it's loaded:**
   - Restart your dev server after adding the key
   - Check terminal for warnings: `⚠️ RESEND_API_KEY not configured`

3. **Test if it's accessible:**
   ```bash
   # In your terminal (from apps/web directory)
   node -e "console.log(process.env.RESEND_API_KEY ? '✅ Key exists' : '❌ Key missing')"
   ```

---

## Step 2: Check Server Logs

### Look for Email-Related Logs

When you submit the form, check your **terminal/console** for:

**✅ Success:**
```
✅ Email sent successfully: { id: 'xxx', to: 'info@zephortech.com' }
```

**❌ Errors:**
```
⚠️ RESEND_API_KEY not configured. Email notifications disabled.
❌ Resend API error: 401 Unauthorized
❌ Failed to send email via Resend: [error details]
```

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| `RESEND_API_KEY not configured` | Key missing from .env | Add key to `.env.local` |
| `401 Unauthorized` | Invalid API key | Regenerate key in Resend dashboard |
| `422 Unprocessable Entity` | Domain not verified | Use `onboarding@resend.dev` for testing |
| `403 Forbidden` | Domain not verified | Verify domain or use test domain |

---

## Step 3: Test Resend API Key

### Manual API Test

1. **Get your API key** from: https://resend.com/api-keys

2. **Test in terminal:**
   ```bash
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer re_YOUR_KEY_HERE" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "your-email@example.com",
       "subject": "Test Email",
       "html": "<p>This is a test</p>"
     }'
   ```

3. **Check response:**
   - ✅ `200 OK` = Key works!
   - ❌ `401 Unauthorized` = Invalid key
   - ❌ `422` = Domain issue

---

## Step 4: Domain Verification Issue

### Problem: Using Unverified Domain

The code currently uses `hello@zephortech.com` which might not be verified in Resend.

### Solution: Use Resend's Test Domain

**For Development/Testing:**
- Use: `onboarding@resend.dev` (already updated in code)
- This works immediately, no verification needed
- Perfect for testing

**For Production:**
1. Go to: https://resend.com/domains
2. Click **"Add Domain"**
3. Add `zephortech.com`
4. Follow DNS setup instructions
5. Wait for verification (usually 5-10 minutes)
6. Update code to use: `hello@zephortech.com`

---

## Step 5: Check Resend Dashboard

### View Email Activity

1. **Go to:** https://resend.com/emails
2. **Check:**
   - Are emails being sent?
   - What's the status? (delivered, bounced, failed)
   - Any error messages?

### Check API Usage

1. **Go to:** https://resend.com/dashboard
2. **Check:**
   - Free tier limit: 3,000/month
   - Current usage
   - Any rate limits hit?

---

## Step 6: Debug the Code

### Add Temporary Logging

If emails still don't work, add this to `apps/web/app/api/contact/route.ts`:

```typescript
// Before the email send
console.log("📧 Attempting to send email:", {
  hasApiKey: !!process.env.RESEND_API_KEY,
  apiKeyLength: process.env.RESEND_API_KEY?.length,
  to: notificationEmail,
  from: "onboarding@resend.dev",
});
```

### Check Response Details

The updated code now logs:
- ✅ Success with email ID
- ❌ Errors with full details
- ⚠️ Warnings for missing config

---

## Quick Fixes

### Fix 1: Missing API Key
```bash
# Add to apps/web/.env.local
RESEND_API_KEY=re_your_actual_key_here

# Restart server
npm run dev
```

### Fix 2: Invalid API Key
1. Go to: https://resend.com/api-keys
2. Delete old key
3. Create new key
4. Update `.env.local`
5. Restart server

### Fix 3: Domain Not Verified
- **For testing:** Code now uses `onboarding@resend.dev` ✅
- **For production:** Verify your domain in Resend dashboard

### Fix 4: Check Email Spam Folder
- Sometimes emails go to spam
- Check `info@zephortech.com` spam folder
- Whitelist `onboarding@resend.dev` if needed

---

## Testing Checklist

- [ ] `RESEND_API_KEY` is in `.env.local`
- [ ] Dev server restarted after adding key
- [ ] Terminal shows: `✅ Email sent successfully`
- [ ] Check Resend dashboard: https://resend.com/emails
- [ ] Check email inbox (and spam folder)
- [ ] API key is valid (test with curl)
- [ ] Using test domain `onboarding@resend.dev` for development

---

## Still Not Working?

### Enable Detailed Logging

Check your terminal when submitting the form. You should see:

```
📧 Attempting to send email: { hasApiKey: true, to: 'info@zephortech.com', ... }
✅ Email sent successfully: { id: 'xxx', to: 'info@zephortech.com' }
```

If you see errors, copy the full error message and:
1. Check the error code
2. Look up in Resend docs: https://resend.com/docs
3. Check Resend status: https://status.resend.com

---

## Production Setup

Once everything works in development:

1. **Verify your domain:**
   - Add `zephortech.com` in Resend
   - Complete DNS verification

2. **Update from address:**
   ```typescript
   from: "hello@zephortech.com", // After domain verification
   ```

3. **Test in production:**
   - Submit form on live site
   - Verify email received
   - Check Resend dashboard

---

**Need More Help?**
- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
- Check server logs for detailed error messages

