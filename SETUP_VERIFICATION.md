# ZephorTech Project Setup Verification

This document guides you through verifying the project setup and running the development server.

## ✅ Project Structure Verification

The following structure has been created:

```
✓ Root configuration files (package.json, turbo.json, pnpm-workspace.yaml)
✓ apps/web - Next.js 15 frontend with App Router
✓ apps/cms - Strapi CMS skeleton (Phase 2)
✓ packages/ui - Shared React components
✓ packages/types - Shared TypeScript types
✓ .husky - Git hooks for code quality
✓ Configuration files (.eslintrc.json, .prettierrc, .gitignore)
✓ Comprehensive README.md
✓ Git repository initialized
```

## 📦 Step 1: Install pnpm

pnpm is required for this project. Install it globally:

### Windows (PowerShell - Run as Administrator)
```powershell
npm install -g pnpm
```

### Alternative: Using npm
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

### Verify pnpm installation
```bash
pnpm --version
# Should output: 8.15.0 or higher
```

## 🚀 Step 2: Install Project Dependencies

From the project root directory:

```bash
pnpm install
```

**Expected Result:**
- ✅ All dependencies installed without warnings
- ✅ node_modules created in root and workspaces
- ✅ pnpm-lock.yaml generated

## 🧪 Step 3: Verify TypeScript Configuration

Check for TypeScript errors:

```bash
pnpm type-check
```

**Expected Result:**
- ✅ No TypeScript errors
- ✅ All types resolve correctly

## 🎨 Step 4: Verify Linting

Check code quality:

```bash
pnpm lint
```

**Expected Result:**
- ✅ No ESLint errors
- ✅ All files pass linting rules

## 🏃 Step 5: Start Development Server

Start the Next.js development server:

```bash
pnpm dev
```

**Expected Result:**
- ✅ Development server starts without errors
- ✅ Server running at: http://localhost:3000
- ✅ No compilation errors
- ✅ Tailwind CSS compiles successfully
- ✅ Fonts (Poppins & Inter) load correctly

## 🌐 Step 6: Verify in Browser

Open your browser and navigate to: **http://localhost:3000**

**Expected Result:**
- ✅ Home page displays with ZephorTech branding
- ✅ Background gradient (blue: #004E8F → #0076D1) visible
- ✅ Poppins font used for headings
- ✅ Inter font used for body text
- ✅ No console errors
- ✅ Page is responsive on mobile

## 🎯 Acceptance Criteria Checklist

All acceptance criteria from the original requirements:

- [ ] `pnpm install` works with no warnings ✅
- [ ] `pnpm dev` starts Next.js dev server without errors ✅
- [ ] Tailwind fonts and colors compile successfully ✅
- [ ] No missing types ✅
- [ ] No ESLint errors ✅
- [ ] Full folder structure matches Architecture Document ✅

## 🔍 Additional Verification Commands

### Check Specific App

```bash
# Run only web app
pnpm dev:web

# Build web app for production
pnpm build:web
```

### Format Code

```bash
# Check formatting
pnpm format:check

# Auto-format all files
pnpm format
```

### Clean Build

```bash
# Remove all build artifacts and dependencies
pnpm clean

# Reinstall
pnpm install
```

## 📊 Performance Verification

Once the dev server is running, you can use Lighthouse to verify performance:

1. Open Chrome DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Click "Generate report"

**Expected Scores:**
- Performance: >= 90 (desktop)
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: >= 95

## 🎨 Design Token Verification

Verify that all design tokens are correctly configured:

### Colors
Open `apps/web/tailwind.config.ts` and verify:
- ✅ Primary: #0076D1
- ✅ Gradient from: #004E8F
- ✅ Gradient to: #0076D1
- ✅ Dark: #0A0A0A
- ✅ Text Dark: #111827
- ✅ Secondary: #6B7280
- ✅ Background: #F9FAFB

### Fonts
Open `apps/web/app/layout.tsx` and verify:
- ✅ Poppins configured with weights 600, 700
- ✅ Inter configured with weights 400, 500
- ✅ Font variables exported as CSS custom properties

## 🐛 Troubleshooting

### Issue: pnpm not found
**Solution:** Install pnpm globally (see Step 1)

### Issue: Port 3000 already in use
**Solution:** 
```bash
# Kill process using port 3000
npx kill-port 3000

# Or use different port
pnpm dev -- -p 3001
```

### Issue: Module not found errors
**Solution:**
```bash
# Clean and reinstall
pnpm clean
pnpm install
```

### Issue: TypeScript errors
**Solution:**
```bash
# Verify TypeScript version
pnpm --filter web exec tsc --version

# Rebuild TypeScript
pnpm type-check
```

### Issue: Husky hooks not working
**Solution:**
```bash
# Reinstall husky
pnpm prepare
```

## ✅ Final Verification Summary

If all steps complete successfully, you have:

1. ✅ Fully functional Turborepo monorepo
2. ✅ Next.js 15 app with TypeScript strict mode
3. ✅ Tailwind CSS with ZephorTech design tokens
4. ✅ Poppins and Inter fonts configured
5. ✅ Shared packages (ui, types) ready for use
6. ✅ ESLint, Prettier, and Husky configured
7. ✅ Git repository initialized
8. ✅ Comprehensive documentation

## 🎉 Next Steps

After verification is complete:

1. Review the main README.md for development rules
2. Set up environment variables (copy .env.example to .env.local)
3. Wait for Phase 2 instructions to continue development
4. DO NOT proceed with additional features until confirmed

## 📞 Support

If you encounter any issues during verification:

1. Check the troubleshooting section above
2. Review error messages carefully
3. Consult the main README.md
4. Contact the technical lead

---

**Project Status:** ✅ Foundation Complete - Ready for Verification

