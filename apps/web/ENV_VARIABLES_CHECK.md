# 🔍 Environment Variables Check

## ❌ Error: "supabaseUrl is required"

This means your `.env.local` file is missing or not loading the Supabase variables.

---

## ✅ Quick Fix

### **Step 1: Check Your `.env.local` File**

Make sure `apps/web/.env.local` exists and contains:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your anon/public key
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Your service_role secret key (NOT the anon key!)

---

### **Step 2: Get Your Supabase Keys**

1. **Go to:** https://supabase.com/dashboard
2. **Select your project**
3. **Click:** Settings → API
4. **Copy these 3 values:**

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
→ This is NEXT_PUBLIC_SUPABASE_URL
```

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
→ This is NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**service_role secret key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
→ This is SUPABASE_SERVICE_ROLE_KEY (IMPORTANT: Use service_role, not anon!)
```

---

### **Step 3: Create/Update `.env.local`**

**Location:** `apps/web/.env.local`

**Full example:**
```bash
# Strapi CMS (if you have it)
NEXT_PUBLIC_CMS_URL=http://localhost:1337
NEXT_PUBLIC_USE_CMS=false
STRAPI_API_TOKEN=your_strapi_token

# Supabase Configuration (REQUIRED FOR CAREER APPLICATIONS)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_service_role_key_here

# Contact Notifications (Optional but recommended)
CONTACT_NOTIFICATION_EMAIL=info@zephortech.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Email Notifications
# RESEND_API_KEY=re_xxxxx
```

---

### **Step 4: Restart Dev Server**

**IMPORTANT:** After updating `.env.local`, you MUST restart the dev server:

1. **Stop the server:** Press `Ctrl+C` in the terminal
2. **Start again:**
   ```bash
   pnpm dev
   ```

**Why?** Next.js only loads environment variables when the server starts!

---

## 🔍 Verify Environment Variables Are Loaded

After restarting, the error should be gone. If you still get errors:

### **Check 1: File Location**
- ✅ File is at: `apps/web/.env.local` (not `.env` or `.env.example`)
- ✅ File is in the `apps/web/` directory (same level as `package.json`)

### **Check 2: Variable Names**
- ✅ `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (exact name, no `NEXT_PUBLIC_` prefix)

### **Check 3: No Spaces or Quotes**
```bash
# ✅ CORRECT
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co

# ❌ WRONG (quotes not needed)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"

# ❌ WRONG (spaces around =)
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
```

### **Check 4: Service Role Key**
- ✅ Make sure you're using the **service_role** key (secret)
- ❌ NOT the anon key (public)

**How to tell:**
- `anon` key → Starts with `eyJ...` (shorter)
- `service_role` key → Also starts with `eyJ...` but longer (different value)

---

## 🧪 Test After Fix

1. **Restart dev server:**
   ```bash
   # Stop: Ctrl+C
   pnpm dev
   ```

2. **Visit:** http://localhost:3000/careers/apply

3. **Submit test form**

4. **Check terminal** - should NOT see "supabaseUrl is required" error

---

## 🆘 Still Having Issues?

### **Debug: Check What's Loaded**

Add this temporarily to see what's being loaded:

**File:** `apps/web/app/api/careers/apply/route.ts`

Add at the top of the `POST` function:
```typescript
console.log("Env check:", {
  hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  urlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0
});
```

**Then check terminal output** when you submit the form.

---

## ✅ Success Indicators

When everything is correct:
- ✅ No "supabaseUrl is required" error
- ✅ Form submission works
- ✅ Data appears in Supabase table
- ✅ Resume uploads to Storage
- ✅ Contact form submissions appear in `contact_submissions`

---

## 📝 Quick Checklist

- [ ] `.env.local` file exists in `apps/web/`
- [ ] Contains `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Contains `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Contains `SUPABASE_SERVICE_ROLE_KEY` (service_role, not anon!)
- [ ] (Optional) `CONTACT_NOTIFICATION_EMAIL` set to your inbox
- [ ] No quotes around values
- [ ] No spaces around `=`
- [ ] Dev server restarted after adding variables
- [ ] Career & contact forms successfully submit test entries

---

**After fixing, restart the dev server and try again!** 🚀

