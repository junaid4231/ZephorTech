# 📧 Newsletter System Documentation

## Overview

Complete newsletter subscription and sending system with unsubscribe functionality, integrated with Strapi CMS for content management.

---

## ✅ What's Implemented

### 1. **Subscription Flow**
- ✅ User subscribes via form
- ✅ Confirmation email sent with unsubscribe link
- ✅ Double opt-in confirmation required
- ✅ Database stores subscriber with tokens

### 2. **Unsubscribe Functionality**
- ✅ Unsubscribe API endpoint (`/api/newsletter/unsubscribe`)
- ✅ Unsubscribe confirmation page (`/newsletter/unsubscribed`)
- ✅ Token-based security
- ✅ Database status update

### 3. **Newsletter Sending**
- ✅ Admin API endpoint (`/api/newsletter/send`)
- ✅ Batch email sending (50 per batch)
- ✅ Strapi CMS integration for content
- ✅ Automatic unsubscribe link in every email
- ✅ Error handling and logging

### 4. **Strapi CMS Integration**
- ✅ Newsletter content type created
- ✅ Fields: title, subject, previewText, content, scheduledDate, status
- ✅ GraphQL API support

---

## 🗄️ Database Schema

### Required Column: `unsubscribe_token`

If your database doesn't have this column, run the migration:

```sql
-- See: apps/web/ADD_UNSUBSCRIBE_TOKEN.sql
ALTER TABLE newsletter_subscribers 
ADD COLUMN unsubscribe_token TEXT;

CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token 
ON newsletter_subscribers(unsubscribe_token);
```

---

## 🔧 Environment Variables

### Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend Email
RESEND_API_KEY=re_your_key_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional (for Strapi integration)

```env
# Strapi CMS
NEXT_PUBLIC_CMS_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token

# Newsletter Admin (for sending)
NEWSLETTER_ADMIN_API_KEY=your_secure_admin_key
```

---

## 📋 API Endpoints

### 1. Subscribe
**POST** `/api/newsletter/subscribe`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Thanks! Please check your email to confirm your subscription."
}
```

---

### 2. Confirm Subscription
**GET** `/api/newsletter/confirm?token=xxx`

Redirects to `/newsletter/confirmed` on success.

---

### 3. Unsubscribe
**GET** `/api/newsletter/unsubscribe?token=xxx`

Redirects to `/newsletter/unsubscribed` on success.

---

### 4. Send Newsletter (Admin)
**POST** `/api/newsletter/send`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_API_KEY
```

**Request (Option 1 - Direct Content):**
```json
{
  "subject": "Monthly Newsletter - January 2024",
  "content": "<p>Your newsletter content here...</p>",
  "previewText": "Preview text for email clients"
}
```

**Request (Option 2 - From Strapi):**
```json
{
  "newsletterId": "1",
  "subject": "Override subject (optional)",
  "content": "Override content (optional)"
}
```

**Response:**
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

---

## 🎨 Pages

### `/newsletter/confirmed`
- Success page after subscription confirmation
- Dark theme matching site design

### `/newsletter/unsubscribed`
- Confirmation page after unsubscribing
- Shows what happens next

### `/newsletter/error`
- Error page for various failure scenarios
- Handles: missing-token, invalid-token, config, database-error, etc.

---

## 📝 How to Use

### Step 1: Database Migration

Run the SQL migration to add `unsubscribe_token` column:

```sql
-- In Supabase SQL Editor
-- See: apps/web/ADD_UNSUBSCRIBE_TOKEN.sql
```

### Step 2: Environment Setup

Add required environment variables to `.env.local`:

```env
RESEND_API_KEY=re_your_key_here
NEWSLETTER_ADMIN_API_KEY=generate_secure_random_string
```

### Step 3: Restart Strapi (if using CMS)

After creating the Newsletter content type, restart Strapi:

```bash
cd apps/cms
pnpm dev
```

### Step 4: Test Subscription Flow

1. User fills newsletter form
2. Receives confirmation email
3. Clicks confirmation link
4. Sees confirmation page

### Step 5: Send Newsletter

**Using cURL:**
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Monthly Newsletter",
    "content": "<p>Hello subscribers!</p>",
    "previewText": "Monthly insights from ZephorTech"
  }'
```

**Using Strapi Content:**
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "newsletterId": "1"
  }'
```

---

## 🔒 Security Features

1. **Rate Limiting**
   - Subscribe: 10 requests/minute per IP
   - Unsubscribe: 10 requests/minute per IP

2. **Token-Based Security**
   - Unique tokens for confirmation and unsubscribe
   - Tokens cleared after use
   - 32-byte random tokens

3. **Admin Authentication**
   - Newsletter sending requires `NEWSLETTER_ADMIN_API_KEY`
   - Bearer token authentication

4. **Input Validation**
   - Email format validation
   - SQL injection protection (Supabase handles this)
   - XSS protection in email templates

---

## 📊 Error Handling

All endpoints include comprehensive error handling:

- ✅ Configuration validation
- ✅ Database error handling
- ✅ Email service error handling
- ✅ Rate limiting
- ✅ User-friendly error messages
- ✅ Detailed logging for debugging

---

## 🧪 Testing Checklist

- [ ] Subscribe with valid email
- [ ] Receive confirmation email
- [ ] Click confirmation link
- [ ] See confirmation page
- [ ] Unsubscribe link in confirmation email works
- [ ] Unsubscribe redirects to confirmation page
- [ ] Send newsletter to all subscribers
- [ ] Newsletter emails include unsubscribe links
- [ ] Unsubscribe links in newsletters work
- [ ] Error pages display correctly
- [ ] Rate limiting works

---

## 📈 Future Enhancements

Potential improvements:
- Scheduled newsletter sending (cron job)
- Newsletter analytics (open rates, click rates)
- Email templates in Strapi
- A/B testing support
- Segmentation (target specific subscriber groups)

---

## 🐛 Troubleshooting

### Emails not sending?
- Check `RESEND_API_KEY` is set
- Verify domain is verified in Resend
- Check server logs for errors

### Unsubscribe not working?
- Verify `unsubscribe_token` column exists
- Check database migration was run
- Verify tokens are being generated

### Newsletter send fails?
- Check `NEWSLETTER_ADMIN_API_KEY` is set
- Verify admin key matches in request header
- Check Resend API limits
- Review error logs

---

**Last Updated:** 2024-12-19
**Status:** ✅ Production Ready

