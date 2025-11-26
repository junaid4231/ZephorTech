# 🔗 How to Get Supabase PostgreSQL Connection String

Quick guide to get your Supabase database connection string for Strapi CMS deployment.

---

## Step-by-Step

### 1. Go to Supabase Dashboard

1. Visit: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project

### 2. Navigate to Database Settings

1. Click **"Settings"** (gear icon) in the left sidebar
2. Click **"Database"** in the settings menu

### 3. Get Connection String

You'll see a section called **"Connection string"** with multiple tabs:

#### **Option A: Direct Connection (Port 5432) - Recommended for Development**

1. Click the **"URI"** tab
2. You'll see a connection string like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
3. **Replace `[YOUR-PASSWORD]`** with your actual database password
   - Find password: Scroll down to **"Database password"** section
   - Click **"Reset database password"** if you don't know it
   - Copy the password

4. **Final connection string:**
   ```
   postgresql://postgres:your_actual_password@db.xxxxx.supabase.co:5432/postgres
   ```

#### **Option B: Connection Pooling (Port 6543) - Recommended for Production**

1. Click the **"Connection pooling"** tab
2. Select **"Session"** mode (for Strapi)
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your database password

**Why use connection pooling?**
- Better for production apps
- Handles multiple connections efficiently
- More stable under load

---

## Example Connection Strings

### Direct Connection:
```env
DATABASE_URL=postgresql://postgres:MySecurePassword123@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### Connection Pooling:
```env
DATABASE_URL=postgresql://postgres:MySecurePassword123@db.abcdefghijklmnop.supabase.co:6543/postgres?pgbouncer=true
```

---

## Important Notes

⚠️ **Security:**
- Never commit connection strings to git
- Use environment variables only
- Keep your database password secure

✅ **For Railway Deployment:**
- Use the connection string in Railway environment variables
- Set `DATABASE_CLIENT=postgres`
- Set `DATABASE_SSL=true`
- Set `DATABASE_SSL_REJECT_UNAUTHORIZED=false`

---

## Troubleshooting

### "Connection refused" error:
- Check your Supabase project is **not paused**
- Verify the password is correct
- Try connection pooling port (6543) instead

### "SSL required" error:
- Ensure `DATABASE_SSL=true`
- Set `DATABASE_SSL_REJECT_UNAUTHORIZED=false` (Supabase uses self-signed certs)

### "Password authentication failed":
- Reset your database password in Supabase dashboard
- Update the connection string with new password

---

**That's it!** Use this connection string in your Railway environment variables.


