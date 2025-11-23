# 📧 Email Configuration Notes

## ✅ Current Configuration

**Career Applications:**
- **From:** `careers@zephortech.com`
- **To:** `careers@zephortech.com`

**Status:** ✅ Updated and ready

---

## 📝 Future Email Profiles (To Be Added Later)

When we add other email profiles, we'll need to update:

### **File:** `apps/web/app/api/careers/apply/route.ts`

**Current:**
```typescript
from: "careers@zephortech.com",
to: "careers@zephortech.com",
```

**Future profiles to add:**
- Contact form submissions
- Newsletter signups
- Service inquiries
- Support requests
- etc.

**Note:** We'll configure these when implementing each feature.

---

## 🔧 How to Update Email Addresses

### **For Career Applications:**

**File:** `apps/web/app/api/careers/apply/route.ts`
**Line:** ~105-106

```typescript
from: "careers@zephortech.com",  // Sender email
to: "careers@zephortech.com",    // Recipient email
```

### **For Other Forms (Future):**

Each form will have its own API route with email configuration:
- Contact form → `/api/contact/route.ts`
- Newsletter → `/api/newsletter/route.ts`
- etc.

---

## 📋 Email Service Setup

**Current:** Using Resend API (optional)

**Configuration:**
- Add `RESEND_API_KEY` to `.env.local`
- Verify domain in Resend dashboard
- Update email addresses in respective API routes

**Alternative Services:**
- SendGrid
- AWS SES
- SMTP (direct)

---

## ✅ Remember

- ✅ Career applications email: `careers@zephortech.com` (DONE)
- ⏳ Other email profiles: To be configured later
- 📝 Each feature will have its own email configuration

---

**Last Updated:** 2024-11-21
**Status:** Career email configured ✅

