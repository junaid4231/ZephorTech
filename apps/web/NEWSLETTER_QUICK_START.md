# 🚀 Newsletter System - Quick Start Guide

## ✅ You've Completed: Environment Setup
- [x] Added `NEWSLETTER_ADMIN_API_KEY` to `.env.local`

---

## 📋 **Complete Workflow Overview**

### **🔄 Three Main Flows:**

1. **User Subscribes** → Confirms → Receives Newsletters
2. **Admin Sends Newsletter** → All confirmed subscribers receive it
3. **User Unsubscribes** → No longer receives emails

---

## 🎯 **STEP-BY-STEP: Complete Workflow**

### **FLOW 1: User Subscription Journey**

```
┌─────────────────┐
│ User fills form │
│  (email input)  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ POST /api/newsletter/   │
│      subscribe          │
│ {email: "user@ex.com"} │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Server:                 │
│ • Validates email      │
│ • Checks database       │
│ • Generates tokens      │
│ • Saves to Supabase    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Confirmation Email Sent │
│ (via Resend API)        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ User clicks link        │
│ /api/newsletter/confirm │
│      ?token=xxx         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Status: pending →       │
│         confirmed ✅     │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Redirects to:           │
│ /newsletter/confirmed   │
└─────────────────────────┘
```

**Database State:**
- Email: `user@example.com`
- Status: `confirmed` ✅
- Ready to receive newsletters

---

### **FLOW 2: Admin Sends Newsletter**

```
┌─────────────────────────┐
│ Admin prepares content  │
│ (Strapi or direct)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ POST /api/newsletter/   │
│      send               │
│ Headers:                │
│ Authorization: Bearer    │
│   YOUR_ADMIN_API_KEY    │
│ Body: {subject, content} │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Server:                 │
│ • Validates admin key   │
│ • Fetches subscribers   │
│   (status='confirmed')  │
│ • Prepares emails       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Batch Send (50/batch)   │
│ • Adds unsubscribe link │
│ • Sends via Resend      │
│ • Tracks results        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Returns:                 │
│ {sent: 148, total: 150} │
└─────────────────────────┘
```

**What Subscribers Receive:**
- Newsletter content
- Professional HTML email
- Unsubscribe link in footer

---

### **FLOW 3: User Unsubscribes**

```
┌─────────────────────────┐
│ User clicks unsubscribe │
│ link in email footer    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ GET /api/newsletter/    │
│      unsubscribe        │
│      ?token=xxx         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Server:                 │
│ • Validates token       │
│ • Updates database      │
│   status → unsubscribed │
│ • Clears token          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Redirects to:           │
│ /newsletter/unsubscribed│
└─────────────────────────┘
```

**Database State:**
- Status: `unsubscribed` ❌
- `unsubscribed_at`: timestamp
- Will NOT receive future emails

---

## 🧪 **TESTING: Complete Workflow**

### **Test 1: User Subscription**

1. **Visit your website**
   - Go to newsletter form
   - Enter your email
   - Submit

2. **Check email**
   - Open confirmation email
   - Click "Confirm Subscription" button

3. **Verify**
   - Should redirect to `/newsletter/confirmed`
   - Check database: status should be `confirmed`

**Command to check database:**
```sql
SELECT email, status, confirmed_at 
FROM newsletter_subscribers 
WHERE email = 'your-email@example.com';
```

---

### **Test 2: Send Newsletter**

**Option A: Direct Content (Quick Test)**
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Test Newsletter",
    "content": "<h2>Hello!</h2><p>This is a test newsletter.</p>",
    "previewText": "Testing the newsletter system"
  }'
```

**Option B: Using Strapi**
1. Create newsletter in Strapi admin
2. Get the ID (e.g., "1")
3. Send:
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"newsletterId": "1"}'
```

**Expected Response:**
```json
{
  "message": "Newsletter sending completed",
  "results": {
    "total": 1,
    "sent": 1,
    "failed": 0,
    "errors": []
  }
}
```

---

### **Test 3: Unsubscribe**

1. **Check your email**
   - Open the newsletter you received
   - Scroll to bottom
   - Click "Unsubscribe" link

2. **Verify**
   - Should redirect to `/newsletter/unsubscribed`
   - Check database: status should be `unsubscribed`

**Command to verify:**
```sql
SELECT email, status, unsubscribed_at 
FROM newsletter_subscribers 
WHERE email = 'your-email@example.com';
```

---

## 📊 **Database States Reference**

| Status | Description | Receives Emails? | Can Unsubscribe? |
|--------|-------------|------------------|------------------|
| `pending` | Awaiting confirmation | ❌ No | ❌ No (not confirmed yet) |
| `confirmed` | Active subscriber | ✅ Yes | ✅ Yes |
| `unsubscribed` | Opted out | ❌ No | ❌ Already unsubscribed |

---

## 🔑 **Key Endpoints**

| Endpoint | Method | Purpose | Auth Required? |
|----------|--------|---------|----------------|
| `/api/newsletter/subscribe` | POST | User subscribes | ❌ No |
| `/api/newsletter/confirm` | GET | Confirm subscription | ❌ No (token-based) |
| `/api/newsletter/unsubscribe` | GET | Unsubscribe | ❌ No (token-based) |
| `/api/newsletter/send` | POST | Send newsletter | ✅ Yes (Admin key) |

---

## 📧 **Email Flow**

### **Confirmation Email:**
```
Subject: "Confirm your ZephorTech newsletter subscription"
Contains:
  ✅ Welcome message
  ✅ Confirmation button
  ✅ Unsubscribe link (safety)
```

### **Newsletter Email:**
```
Subject: [Your newsletter subject]
Contains:
  ✅ Newsletter content
  ✅ Professional header/footer
  ✅ Unsubscribe link (required)
```

---

## 🛠️ **Quick Commands**

### **Generate Admin Key:**
```bash
node scripts/generate-admin-key.js
```

### **Check Subscribers:**
```sql
-- All subscribers
SELECT email, status, subscribed_at, confirmed_at 
FROM newsletter_subscribers 
ORDER BY subscribed_at DESC;

-- Only confirmed (active)
SELECT COUNT(*) 
FROM newsletter_subscribers 
WHERE status = 'confirmed' 
AND unsubscribed_at IS NULL;
```

### **Test API (with curl):**
```bash
# Test subscribe
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Test send (requires admin key)
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"subject": "Test", "content": "<p>Test</p>"}'
```

---

## ✅ **Production Checklist**

Before going live:

- [x] `NEWSLETTER_ADMIN_API_KEY` in `.env.local` ✅
- [ ] `RESEND_API_KEY` configured
- [ ] Domain verified in Resend dashboard
- [ ] Database migration run (`unsubscribe_token` column)
- [ ] Test subscription flow
- [ ] Test newsletter sending
- [ ] Test unsubscribe flow
- [ ] Monitor logs for errors

---

## 🎯 **Next Steps**

1. **Test the subscription flow:**
   - Subscribe with your email
   - Confirm subscription
   - Verify in database

2. **Test sending a newsletter:**
   - Use the curl command above
   - Check your email
   - Verify unsubscribe link works

3. **Set up Strapi (optional):**
   - Create Newsletter content type
   - Add newsletter content
   - Send via Strapi ID

---

**You're all set!** 🎉

The system is ready to use. Start with testing the subscription flow, then try sending a test newsletter.

