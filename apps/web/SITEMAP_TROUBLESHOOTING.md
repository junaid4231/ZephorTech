# 🔧 Sitemap Troubleshooting Guide

If Google Search Console shows **"Sitemap could not be read"** or **"error fetch"**, follow these steps:

---

## ✅ **Step 1: Verify Sitemap is Accessible**

1. **Open in browser:**

   ```
   https://zephortech.com/sitemap.xml
   ```

2. **What you should see:**
   - XML content starting with `<?xml version="1.0" encoding="UTF-8"?>`
   - List of URLs with `<url>`, `<loc>`, `<lastmod>` tags
   - No error messages

3. **If you see an error:**
   - Check Vercel deployment logs
   - Verify the site is deployed correctly
   - Check if there are build errors

---

## ✅ **Step 2: Check Sitemap Format**

The sitemap should be valid XML. Common issues:

### **Issue: Empty or Invalid XML**

- **Cause:** Data fetching errors
- **Fix:** I've added error handling to the sitemap - it will always return at least static pages

### **Issue: Timeout**

- **Cause:** CMS calls taking too long
- **Fix:** Sitemap now has try-catch blocks - it will skip failed data sources

### **Issue: Wrong Content-Type**

- **Cause:** Server not returning XML
- **Fix:** Next.js automatically sets correct headers for `sitemap.ts`

---

## ✅ **Step 3: Test Sitemap Locally**

1. **Build and run locally:**

   ```bash
   cd apps/web
   pnpm build
   pnpm start
   ```

2. **Visit:** `http://localhost:3000/sitemap.xml`

3. **Verify it loads correctly**

---

## ✅ **Step 4: Check Vercel Deployment**

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project
   - Check **"Deployments"** tab

2. **Verify latest deployment:**
   - Should be successful (green checkmark)
   - Check build logs for errors

3. **Redeploy if needed:**
   - Click **"Redeploy"** on latest deployment
   - Or push a new commit to trigger rebuild

---

## ✅ **Step 5: Validate Sitemap Format**

Use online validators:

1. **XML Sitemap Validator:**
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - Paste: `https://zephortech.com/sitemap.xml`

2. **Google's Sitemap Tester:**
   - In Google Search Console → Sitemaps
   - Click on your sitemap
   - Check for specific errors

---

## ✅ **Step 6: Common Fixes**

### **Fix 1: Wait and Retry**

- Sometimes Google's fetch fails temporarily
- Wait 10-15 minutes and try submitting again
- Google will retry automatically

### **Fix 2: Check robots.txt**

- Verify: `https://zephortech.com/robots.txt`
- Ensure sitemap is not blocked
- Should contain: `Sitemap: https://zephortech.com/sitemap.xml`

### **Fix 3: Use Full URL**

- In Google Search Console, submit: `https://zephortech.com/sitemap.xml`
- Not just: `sitemap.xml`

### **Fix 4: Check CMS Connection**

- If CMS is down, sitemap will still work (uses fallback data)
- But dynamic pages might be missing
- Check `NEXT_PUBLIC_USE_CMS` environment variable

---

## ✅ **Step 7: Force Regeneration**

1. **Make a small change to trigger rebuild:**

   ```bash
   # Add a comment to sitemap.ts or any file
   git add .
   git commit -m "Trigger sitemap regeneration"
   git push origin main
   ```

2. **Wait for Vercel to deploy** (1-2 minutes)

3. **Try submitting sitemap again** in Google Search Console

---

## ✅ **Step 8: Alternative - Manual Sitemap**

If automatic sitemap keeps failing, you can create a static one:

1. **Create:** `apps/web/public/sitemap.xml`
2. **Add your URLs manually**
3. **Commit and push**

But this is **not recommended** - the dynamic sitemap is better!

---

## 🔍 **Debugging Steps**

### **Check Server Logs:**

1. **Vercel Function Logs:**
   - Vercel Dashboard → Your Project → Functions
   - Check for sitemap errors

2. **Browser Console:**
   - Open DevTools → Network tab
   - Visit `https://zephortech.com/sitemap.xml`
   - Check response status (should be 200)
   - Check response headers (should be `text/xml` or `application/xml`)

### **Test with curl:**

```bash
curl -I https://zephortech.com/sitemap.xml
```

Should return:

```
HTTP/2 200
content-type: application/xml
```

---

## 📋 **Quick Checklist**

- [ ] Sitemap accessible at `https://zephortech.com/sitemap.xml`
- [ ] Sitemap shows valid XML content
- [ ] No errors in Vercel deployment logs
- [ ] robots.txt references sitemap
- [ ] Using full URL in Google Search Console
- [ ] Waited 10-15 minutes after deployment
- [ ] Tried submitting sitemap again

---

## 🆘 **Still Not Working?**

1. **Check Google Search Console for specific error message**
2. **Share the exact error** you see
3. **Check Vercel logs** for build/runtime errors
4. **Verify environment variables** are set correctly

---

## ✅ **What I Fixed**

I've updated `apps/web/app/sitemap.ts` to:

- ✅ Add error handling for all data fetching
- ✅ Always return at least static pages (even if CMS fails)
- ✅ Log errors to console for debugging
- ✅ Prevent sitemap from crashing

**Next Steps:**

1. Commit and push the updated sitemap
2. Wait for Vercel to deploy
3. Try submitting sitemap again in Google Search Console

---

**The sitemap should now work reliably!** 🚀
