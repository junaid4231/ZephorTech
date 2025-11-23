# Strapi GraphQL Permissions Setup

## 🔴 Current Issue: "Forbidden access"

The GraphQL API is returning "Forbidden access" because Strapi requires permissions to be configured.

## ✅ Solution Options

### Option 1: Use API Token (Recommended - More Secure)

**Status**: ✅ Already configured in code!

The GraphQL client now automatically uses `STRAPI_API_TOKEN` from `.env.local`.

**To verify:**
1. Check `.env.local` has: `STRAPI_API_TOKEN=your_token_here`
2. Restart Next.js dev server
3. The token will be sent with every GraphQL request

**If token doesn't work:**
- Verify token has "Full access" type in Strapi Admin
- Or ensure token has permissions for `api::service.service.find` and `api::testimonial.testimonial.find`

### Option 2: Configure Public Permissions (Alternative)

If you prefer public access without tokens:

1. **Go to Strapi Admin**: http://localhost:1337/admin
2. **Navigate to**: Settings → Users & Permissions → Roles → **Public**
3. **Under Permissions**, find:
   - **Service** → Check `find` and `findOne`
   - **Testimonial** → Check `find` and `findOne`
4. **Click Save**

**Note**: This makes content publicly accessible (no authentication needed).

## 🧪 Testing After Fix

1. **Restart Next.js** (to load updated code with API token)
2. **Edit a service in Strapi**:
   - Go to Content Manager → Service
   - Edit "Web Development"
   - Change title or description
   - Save & Publish
3. **Restart Next.js again** (to clear React cache)
4. **Visit**: http://localhost:3002/services
5. **Verify**: Your changes appear!

## 🔍 Troubleshooting

### Still seeing "Forbidden access"?

1. **Check API Token**:
   ```bash
   # In .env.local
   STRAPI_API_TOKEN=your_actual_token_here
   ```

2. **Verify Token in Strapi**:
   - Settings → API Tokens
   - Ensure token type is "Full access" or has proper permissions

3. **Check Strapi is Running**:
   - Should be at http://localhost:1337
   - Admin panel should be accessible

4. **Alternative: Use Public Permissions** (Option 2 above)

### Changes not reflecting?

- **Restart Next.js dev server** (clears React cache)
- In production, use ISR revalidation or rebuild

