# 🚀 Newsletter System - Production Deployment Guide

## Overview

This guide explains how to deploy and use the newsletter system in production.

---

## 🔧 **Production Setup Checklist**

### 1. **Environment Variables (Production)**

Set these in your production environment (Vercel, Netlify, etc.):

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
RESEND_API_KEY=re_your_production_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Newsletter Admin (CRITICAL - Use different key than dev!)
NEWSLETTER_ADMIN_API_KEY=generate_new_secure_key_for_production

# Newsletter Email (Use your verified domain)
NEWSLETTER_FROM_EMAIL=newsletter@yourdomain.com

# Optional (if using Strapi)
NEXT_PUBLIC_CMS_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_production_strapi_token
```

**⚠️ IMPORTANT:**
- Generate a **NEW** admin key for production (different from dev)
- Never commit production keys to git
- Use your hosting platform's environment variable settings

---

## 🗄️ **Database Migration (Production)**

### Step 1: Run Migration in Production Supabase

1. Go to your **production Supabase** project
2. Open **SQL Editor**
3. Run this migration:

```sql
-- Add unsubscribe_token column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'newsletter_subscribers' 
    AND column_name = 'unsubscribe_token'
  ) THEN
    ALTER TABLE newsletter_subscribers 
    ADD COLUMN unsubscribe_token TEXT;
    
    CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token 
    ON newsletter_subscribers(unsubscribe_token);
    
    RAISE NOTICE '✅ unsubscribe_token column added successfully';
  ELSE
    RAISE NOTICE 'ℹ️ unsubscribe_token column already exists';
  END IF;
END $$;
```

### Step 2: Verify Table Structure

```sql
SELECT column_name, data_type 
FROM information_schema.columns
WHERE table_name = 'newsletter_subscribers'
ORDER BY ordinal_position;
```

Should show:
- `id`
- `email`
- `status`
- `confirmation_token`
- `unsubscribe_token` ✅
- `source`
- `subscribed_at`
- `confirmed_at`
- `unsubscribed_at`

---

## 📧 **Resend Email Configuration (Production)**

### Step 1: Verify Domain

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your production domain (e.g., `yourdomain.com`)
3. Add DNS records (SPF, DKIM, DMARC)
4. Wait for verification (usually 5-10 minutes)

### Step 2: Configure From Address

Set the `NEWSLETTER_FROM_EMAIL` environment variable:

```env
NEWSLETTER_FROM_EMAIL=newsletter@yourdomain.com
```

**Default:** `newsletter@zephortech.com` (development)
**Production:** `newsletter@yourdomain.com` (your verified domain)

The system will automatically use this address for all newsletter emails.

---

## 🔑 **Generate Production Admin Key**

### Option 1: Using Node.js

```bash
node -e "console.log('NEWSLETTER_ADMIN_API_KEY=' + require('crypto').randomBytes(32).toString('hex'))"
```

### Option 2: Using Script

```bash
node scripts/generate-admin-key.js
```

**⚠️ Save this key securely!** You'll need it to send newsletters in production.

---

## 🌐 **Production API Endpoints**

### Base URL Changes

| Environment | Base URL |
|-------------|----------|
| **Development** | `http://localhost:3000` |
| **Production** | `https://yourdomain.com` |

### Endpoints (Same in both environments)

- `POST /api/newsletter/subscribe`
- `GET /api/newsletter/confirm?token=xxx`
- `GET /api/newsletter/unsubscribe?token=xxx`
- `POST /api/newsletter/send` (Admin only)

---

## 📤 **Sending Newsletters in Production**

### Method 1: PowerShell Script (Update for Production)

Create `scripts/send-newsletter-production.ps1`:

```powershell
# Production Newsletter Sender
$ADMIN_KEY = "YOUR_PRODUCTION_ADMIN_KEY"
$API_URL = "https://yourdomain.com"

$body = @{
    subject = "Your Newsletter Subject"
    content = "<h2>Hello!</h2><p>Your newsletter content...</p>"
    previewText = "Preview text"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $ADMIN_KEY"
    "Content-Type" = "application/json"
}

$response = Invoke-RestMethod -Uri "$API_URL/api/newsletter/send" -Method Post -Headers $headers -Body $body
$response | ConvertTo-Json -Depth 3
```

### Method 2: cURL Command

```bash
curl -X POST https://yourdomain.com/api/newsletter/send \
  -H "Authorization: Bearer YOUR_PRODUCTION_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Monthly Newsletter",
    "content": "<p>Your content here...</p>",
    "previewText": "Preview text"
  }'
```

### Method 3: From Strapi (Production)

```bash
curl -X POST https://yourdomain.com/api/newsletter/send \
  -H "Authorization: Bearer YOUR_PRODUCTION_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"newsletterId": "1"}'
```

---

## 🔒 **Security Best Practices (Production)**

### 1. **Admin Key Security**

- ✅ Use different key for production vs development
- ✅ Store in environment variables (never in code)
- ✅ Rotate keys periodically
- ✅ Use strong, random keys (64 hex characters)

### 2. **API Security**

- ✅ HTTPS only in production
- ✅ Rate limiting enabled (already implemented)
- ✅ Token-based unsubscribe (secure)
- ✅ Input validation (already implemented)

### 3. **Email Security**

- ✅ Domain verification in Resend
- ✅ SPF/DKIM records configured
- ✅ Unsubscribe links in every email (legal requirement)

---

## 🧪 **Testing Production Setup**

### Test 1: Subscription Flow

1. Visit `https://yourdomain.com`
2. Subscribe with your email
3. Check email for confirmation
4. Click confirmation link
5. Verify redirect to `https://yourdomain.com/newsletter/confirmed`

### Test 2: Newsletter Sending

```bash
# Test with your production admin key
curl -X POST https://yourdomain.com/api/newsletter/send \
  -H "Authorization: Bearer YOUR_PRODUCTION_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Production Test",
    "content": "<p>Testing production setup</p>",
    "previewText": "Test"
  }'
```

### Test 3: Unsubscribe Flow

1. Receive newsletter email
2. Click unsubscribe link
3. Verify redirect to `https://yourdomain.com/newsletter/unsubscribed`
4. Check database: status should be `unsubscribed`

---

## 📊 **Monitoring & Logging**

### Check Send Results

The API returns detailed results:

```json
{
  "message": "Newsletter sending completed",
  "results": {
    "total": 150,
    "sent": 148,
    "failed": 2,
    "errors": ["error@example.com: Invalid email"]
  }
}
```

### Monitor in Production

1. **Check Server Logs**
   - Look for: `✅ Newsletter sending completed`
   - Check for errors: `❌ Failed to send`

2. **Check Resend Dashboard**
   - View sent emails
   - Check delivery rates
   - Monitor bounces

3. **Check Database**
   ```sql
   -- Active subscribers
   SELECT COUNT(*) FROM newsletter_subscribers 
   WHERE status = 'confirmed' AND unsubscribed_at IS NULL;
   
   -- Recent subscriptions
   SELECT email, subscribed_at, confirmed_at 
   FROM newsletter_subscribers 
   ORDER BY subscribed_at DESC 
   LIMIT 10;
   ```

---

## 🚨 **Common Production Issues**

### Issue 1: Emails Not Sending

**Symptoms:** API returns success but no emails received

**Solutions:**
- ✅ Verify `RESEND_API_KEY` in production env
- ✅ Check domain verification in Resend
- ✅ Verify DNS records (SPF, DKIM)
- ✅ Check Resend dashboard for errors

### Issue 2: 401 Unauthorized

**Symptoms:** `{"message": "Unauthorized. Admin API key required."}`

**Solutions:**
- ✅ Verify `NEWSLETTER_ADMIN_API_KEY` in production env
- ✅ Check key matches in request header
- ✅ Restart application after adding env var
- ✅ Verify no extra spaces in key

### Issue 3: Database Errors

**Symptoms:** `"Server configuration error. Supabase not configured."`

**Solutions:**
- ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` in production
- ✅ Verify `SUPABASE_SERVICE_ROLE_KEY` in production
- ✅ Check Supabase project is active
- ✅ Verify table exists: `newsletter_subscribers`

### Issue 4: Unsubscribe Not Working

**Symptoms:** Unsubscribe link doesn't work

**Solutions:**
- ✅ Verify `unsubscribe_token` column exists
- ✅ Check migration was run
- ✅ Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- ✅ Check unsubscribe endpoint is accessible

---

## 📝 **Production Checklist**

Before going live:

- [ ] Production environment variables set
- [ ] Database migration run (`unsubscribe_token` column)
- [ ] Production admin key generated and saved securely
- [ ] Resend domain verified
- [ ] DNS records (SPF, DKIM) configured
- [ ] `NEXT_PUBLIC_SITE_URL` set to production domain
- [ ] Test subscription flow end-to-end
- [ ] Test newsletter sending
- [ ] Test unsubscribe flow
- [ ] Monitor first newsletter send
- [ ] Set up error alerts (optional)

---

## 🔄 **Deployment Platforms**

### Vercel

1. Go to **Project Settings** → **Environment Variables**
2. Add all required variables
3. Redeploy after adding variables

### Netlify

1. Go to **Site Settings** → **Environment Variables**
2. Add all required variables
3. Trigger redeploy

### Other Platforms

- Add environment variables in platform settings
- Ensure `NEXT_PUBLIC_*` vars are available at build time
- Restart application after adding variables

---

## 🎯 **Quick Production Commands**

### Generate Production Admin Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Production API
```bash
curl -X POST https://yourdomain.com/api/newsletter/send \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"subject": "Test", "content": "<p>Test</p>"}'
```

### Check Subscribers
```sql
SELECT COUNT(*) FROM newsletter_subscribers 
WHERE status = 'confirmed';
```

---

## 📞 **Support**

If you encounter issues:

1. Check server logs
2. Verify environment variables
3. Test API endpoints
4. Check Resend dashboard
5. Verify database structure

---

**Last Updated:** 2024-12-19
**Status:** ✅ Production Ready

