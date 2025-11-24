# 📧 Complete Newsletter System Workflow

## 🎯 Overview

This document explains the complete workflow of the newsletter system from subscription to sending newsletters.

---

## 📥 **WORKFLOW 1: User Subscription**

### Step-by-Step Flow

```
User fills form → API validates → Database check → Email sent → User confirms → Active subscriber
```

### Detailed Steps

#### 1. **User Subscribes** (`/api/newsletter/subscribe`)
- User enters email in newsletter form
- Frontend sends POST request to `/api/newsletter/subscribe`
- Request body: `{ "email": "user@example.com" }`

#### 2. **Server Processing**
- ✅ Rate limiting check (10 requests/minute per IP)
- ✅ Email validation (format check)
- ✅ Database check:
  - If email exists and is **confirmed** → Return "Already subscribed"
  - If email exists but **pending** → Update with new token
  - If new email → Create new record

#### 3. **Token Generation**
- Generates **confirmation_token** (32 bytes hex)
- Generates **unsubscribe_token** (32 bytes hex)
- Stores in database with status: `pending`

#### 4. **Confirmation Email Sent**
- Email sent via Resend API
- Contains:
  - Confirmation button/link
  - Unsubscribe link (for safety)
- Email template: Professional HTML with branding

#### 5. **User Confirms** (`/api/newsletter/confirm`)
- User clicks confirmation link in email
- Link format: `/api/newsletter/confirm?token=xxx`
- Server:
  - Validates token
  - Updates status: `pending` → `confirmed`
  - Sets `confirmed_at` timestamp
  - Ensures `unsubscribe_token` exists
- Redirects to: `/newsletter/confirmed` ✅

#### 6. **User is Now Active Subscriber**
- Status: `confirmed`
- Will receive future newsletters
- Can unsubscribe anytime

---

## 📤 **WORKFLOW 2: Sending Newsletter (Admin)**

### Step-by-Step Flow

```
Admin creates content → API call with auth → Fetch subscribers → Batch send → Track results
```

### Detailed Steps

#### 1. **Admin Prepares Content**

**Option A: Direct Content (No Strapi)**
```json
{
  "subject": "Monthly Newsletter - January 2024",
  "content": "<p>Hello subscribers! This is our monthly update...</p>",
  "previewText": "Monthly insights from ZephorTech"
}
```

**Option B: From Strapi CMS**
```json
{
  "newsletterId": "1"
}
```

#### 2. **Admin Sends Request**
```bash
POST /api/newsletter/send
Headers:
  Authorization: Bearer YOUR_ADMIN_API_KEY
  Content-Type: application/json
Body: { ... }
```

#### 3. **Server Authentication**
- ✅ Validates `NEWSLETTER_ADMIN_API_KEY`
- ✅ Returns 401 if key missing/invalid

#### 4. **Content Fetching**
- If `newsletterId` provided:
  - Fetches from Strapi CMS via GraphQL
  - Extracts: subject, content, previewText
- If direct content provided:
  - Uses provided subject/content

#### 5. **Subscriber Fetching**
- Queries Supabase database
- Filters: `status = 'confirmed'` AND `unsubscribed_at IS NULL`
- Gets: email, unsubscribe_token

#### 6. **Batch Email Sending**
- Splits subscribers into batches of 50
- For each subscriber:
  - Generates unsubscribe link: `/api/newsletter/unsubscribe?token=xxx`
  - Creates HTML email with:
    - Newsletter content
    - Unsubscribe footer
    - Professional styling
  - Sends via Resend API
- Waits 1 second between batches (rate limiting)

#### 7. **Result Tracking**
- Tracks: sent, failed, errors
- Returns summary:
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

## 🚫 **WORKFLOW 3: User Unsubscribes**

### Step-by-Step Flow

```
User clicks unsubscribe → Token validated → Status updated → Confirmation page
```

### Detailed Steps

#### 1. **User Clicks Unsubscribe Link**
- Link in every newsletter email footer
- Format: `/api/newsletter/unsubscribe?token=xxx`
- Also available in confirmation email

#### 2. **Server Processing** (`/api/newsletter/unsubscribe`)
- ✅ Rate limiting check
- ✅ Validates token in database
- ✅ Checks if already unsubscribed

#### 3. **Database Update**
- Updates status: `confirmed` → `unsubscribed`
- Sets `unsubscribed_at` timestamp
- Clears `unsubscribe_token` (security)

#### 4. **Redirect**
- If already unsubscribed → `/newsletter/unsubscribed?already=true`
- If successful → `/newsletter/unsubscribed`

#### 5. **User Sees Confirmation**
- Professional confirmation page
- Explains what happens next
- Option to return to homepage

---

## 🔄 **Complete End-to-End Example**

### Scenario: Monthly Newsletter Campaign

#### **Day 1: User Subscribes**
1. User visits homepage
2. Fills newsletter form: `john@example.com`
3. Receives confirmation email
4. Clicks confirmation link
5. ✅ Now a confirmed subscriber

#### **Day 15: Admin Sends Newsletter**

**Admin Action:**
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Monthly Newsletter - January 2024",
    "content": "<h2>Welcome to our January Newsletter!</h2><p>This month we have exciting updates...</p>",
    "previewText": "Monthly insights and updates from ZephorTech"
  }'
```

**What Happens:**
1. ✅ Admin key validated
2. ✅ Fetches all confirmed subscribers (including john@example.com)
3. ✅ Sends email to john@example.com with:
   - Newsletter content
   - Unsubscribe link at bottom
4. ✅ Returns: `{"sent": 1, "total": 1}`

**User Receives:**
- Professional HTML email
- Newsletter content
- Unsubscribe link in footer

#### **Day 20: User Unsubscribes**
1. User clicks unsubscribe link in email
2. Server validates token
3. Updates database: `status = 'unsubscribed'`
4. User sees confirmation page
5. ✅ No more emails will be sent

#### **Day 30: Admin Sends Next Newsletter**
- john@example.com is **NOT** included (status = unsubscribed)
- Only active confirmed subscribers receive it

---

## 📊 **Database States**

### Subscriber Lifecycle

```
NEW SUBSCRIBER
    ↓
[pending] → Confirmation email sent
    ↓
[confirmed] → Active, receives newsletters
    ↓
[unsubscribed] → No longer receives emails
```

### Status Values

| Status | Description | Receives Emails? |
|--------|-------------|------------------|
| `pending` | Awaiting confirmation | ❌ No |
| `confirmed` | Active subscriber | ✅ Yes |
| `unsubscribed` | Opted out | ❌ No |

---

## 🔐 **Security Flow**

### Token System

```
Subscription:
  confirmation_token (one-time use)
  unsubscribe_token (persistent, per subscriber)

Confirmation:
  Uses confirmation_token → Cleared after use

Unsubscribe:
  Uses unsubscribe_token → Cleared after use

Newsletter:
  Each email includes unique unsubscribe_token link
```

### Rate Limiting

- **Subscribe**: 10 requests/minute per IP
- **Unsubscribe**: 10 requests/minute per IP
- **Send**: Admin key required (no rate limit, but batch processing)

---

## 🛠️ **Practical Usage Examples**

### Example 1: Quick Test Newsletter

```bash
# Send test newsletter
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Test Newsletter",
    "content": "<p>This is a test email.</p>",
    "previewText": "Testing the newsletter system"
  }'
```

### Example 2: Using Strapi Content

1. **Create Newsletter in Strapi:**
   - Go to Strapi Admin
   - Content Manager → Newsletter
   - Create new entry:
     - Title: "January 2024 Newsletter"
     - Subject: "Monthly Update - January"
     - Content: (Rich text editor)
     - Status: Published

2. **Send via API:**
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"newsletterId": "1"}'
```

### Example 3: Check Subscriber Status

```sql
-- In Supabase SQL Editor
SELECT 
  email, 
  status, 
  subscribed_at, 
  confirmed_at, 
  unsubscribed_at
FROM newsletter_subscribers
ORDER BY subscribed_at DESC;
```

---

## 📝 **Email Templates**

### Confirmation Email Contains:
- ✅ Welcome message
- ✅ Confirmation button
- ✅ Unsubscribe link (safety)
- ✅ Professional branding

### Newsletter Email Contains:
- ✅ Newsletter content (from Strapi or direct)
- ✅ Professional header/footer
- ✅ Unsubscribe link (required by law)
- ✅ Company branding

---

## ✅ **Verification Checklist**

### Test Subscription Flow:
- [ ] User can subscribe
- [ ] Confirmation email received
- [ ] Confirmation link works
- [ ] Status changes to `confirmed`
- [ ] Unsubscribe link in confirmation email works

### Test Newsletter Sending:
- [ ] Admin key authentication works
- [ ] Newsletter sends to confirmed subscribers
- [ ] Unsubscribed users don't receive emails
- [ ] Email includes unsubscribe link
- [ ] Batch processing works (if >50 subscribers)

### Test Unsubscribe:
- [ ] Unsubscribe link in newsletter works
- [ ] Status changes to `unsubscribed`
- [ ] Confirmation page displays
- [ ] No more emails sent after unsubscribe

---

## 🚀 **Production Checklist**

Before going live:

- [ ] `NEWSLETTER_ADMIN_API_KEY` set in production env
- [ ] `RESEND_API_KEY` configured
- [ ] Domain verified in Resend
- [ ] Database migration run (`unsubscribe_token` column)
- [ ] Strapi Newsletter content type created
- [ ] Test subscription flow end-to-end
- [ ] Test newsletter sending
- [ ] Test unsubscribe flow
- [ ] Monitor error logs

---

## 📞 **Support & Troubleshooting**

### Common Issues:

1. **Emails not sending?**
   - Check `RESEND_API_KEY` in `.env.local`
   - Verify domain in Resend dashboard
   - Check server logs

2. **Unsubscribe not working?**
   - Verify `unsubscribe_token` column exists
   - Check database migration was run
   - Verify tokens are generated

3. **Admin API returns 401?**
   - Check `NEWSLETTER_ADMIN_API_KEY` in `.env.local`
   - Verify key matches in request header
   - Restart dev server after adding env var

---

**Last Updated:** 2024-12-19
**Status:** ✅ Complete Workflow Documentation

