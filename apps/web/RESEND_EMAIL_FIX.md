# 🔧 Resend Email Fix - 403 Forbidden Error

## Problem

You're getting this error:
```
403 Forbidden: You can only send testing emails to your own email address (junaid.chudhry12@gmail.com)
```

## Why This Happens

Resend's **free tier** has a restriction:
- ✅ Can send to: **Your account email** (junaid.chudhry12@gmail.com)
- ❌ Cannot send to: **Other emails** (like info@zephortech.com)

This is a security feature to prevent spam.

---

## ✅ Quick Fix (For Testing)

### Option 1: Use Your Account Email

Add this to `apps/web/.env.local`:

```env
# Use your Resend account email for testing
RESEND_ACCOUNT_EMAIL=junaid.chudhry12@gmail.com
```

The code will automatically use this email for notifications.

**OR**

```env
# Direct override
CONTACT_NOTIFICATION_EMAIL=junaid.chudhry12@gmail.com
```

### Option 2: Verify Your Domain (For Production)

To send to `info@zephortech.com` or any email:

1. **Go to Resend Domains:** https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter:** `zephortech.com`
4. **Follow DNS Setup:**
   - Add the DNS records Resend provides
   - Wait for verification (5-10 minutes)
5. **Update Code:**
   ```typescript
   from: "hello@zephortech.com", // After domain verification
   ```

---

## 🚀 Recommended Setup

### For Development/Testing:

```env
# apps/web/.env.local
RESEND_ACCOUNT_EMAIL=junaid.chudhry12@gmail.com
RESEND_API_KEY=re_your_key_here
```

This will send all inquiry notifications to your email for testing.

### For Production:

1. **Verify domain** in Resend (see Option 2 above)
2. **Update `.env.local`:**
   ```env
   CONTACT_NOTIFICATION_EMAIL=info@zephortech.com
   ```
3. **Update code** to use verified domain:
   ```typescript
   from: "hello@zephortech.com", // Your verified domain
   ```

---

## 📋 Current Code Behavior

The code now checks in this order:
1. `CONTACT_NOTIFICATION_EMAIL` (if set)
2. `RESEND_ACCOUNT_EMAIL` (if set) ← **Use this for testing**
3. `info@zephortech.com` (default)

So you can set `RESEND_ACCOUNT_EMAIL=junaid.chudhry12@gmail.com` and it will work immediately!

---

## ✅ Quick Test

1. **Add to `.env.local`:**
   ```env
   RESEND_ACCOUNT_EMAIL=junaid.chudhry12@gmail.com
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Submit test form**

4. **Check your email:** junaid.chudhry12@gmail.com

5. **Check terminal:** Should see `✅ Email sent successfully`

---

## 🎯 Summary

**For Now (Testing):**
- Set `RESEND_ACCOUNT_EMAIL=junaid.chudhry12@gmail.com` in `.env.local`
- Emails will go to your account email ✅

**For Production:**
- Verify `zephortech.com` domain in Resend
- Update `from` address to use your domain
- Set `CONTACT_NOTIFICATION_EMAIL=info@zephortech.com`

---

**The form is working!** The data is being saved to Supabase. Once you set `RESEND_ACCOUNT_EMAIL`, emails will work too! 🎉

