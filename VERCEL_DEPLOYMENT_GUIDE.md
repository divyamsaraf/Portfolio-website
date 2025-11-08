# 🚀 Vercel Deployment Guide

## Issue Fixed

**Error**: `supabaseUrl is required` during Vercel build

**Root Cause**: Supabase environment variables were missing from `vercel.json`

**Solution**: Restored environment variables configuration

---

## What Was Fixed

✅ Added `nodeVersion: "20.x"` (matches package.json requirement)
✅ Restored `NEXT_PUBLIC_SUPABASE_URL` environment variable
✅ Restored `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable
✅ Restored `SUPABASE_SERVICE_ROLE_KEY` environment variable

---

## Updated vercel.json

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "nodeVersion": "20.x",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@next_public_supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@next_public_supabase_anon_key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase_service_role_key"
  },
  "headers": [ ... ],
  "redirects": [ ... ]
}
```

---

## Deployment Steps

### Step 1: Set Environment Variables in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add these three variables:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Your Supabase Project URL
- **Environments**: Production, Preview, Development

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Your Supabase Anon Key
- **Environments**: Production, Preview, Development

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Your Supabase Service Role Key
- **Environments**: Production, Preview, Development

### Step 2: Get Your Supabase Credentials

1. Go to **Supabase Dashboard** → Your Project → **Settings** → **API**

2. Copy these values:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → Use for `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Push to GitHub

```bash
git push origin main
```

Vercel will automatically trigger a new build.

### Step 4: Monitor the Build

1. Go to **Vercel Dashboard** → Your Project → **Deployments**
2. Watch for:
   - ✅ Build successful
   - ✅ Deployment complete
   - ✅ No "supabaseUrl is required" error

---

## How the @ Syntax Works

In `vercel.json`:
```json
"NEXT_PUBLIC_SUPABASE_URL": "@next_public_supabase_url"
```

The `@` prefix tells Vercel to reference an environment variable from your Vercel project settings.

**Mapping**:
- `@next_public_supabase_url` → `NEXT_PUBLIC_SUPABASE_URL` (from Vercel settings)

**Benefits**:
- ✅ Keeps sensitive values out of version control
- ✅ Use different values per environment (dev, preview, production)
- ✅ Manage secrets securely in Vercel dashboard

---

## Important Security Notes

### ✅ DO:
- Use `@` syntax to reference Vercel environment variables
- Set environment variables in Vercel dashboard
- Test locally with `.env.local` before deploying
- Keep Supabase keys private

### ❌ DON'T:
- Hardcode sensitive values in `vercel.json`
- Commit actual Supabase keys to version control
- Share Supabase keys publicly
- Skip setting environment variables in Vercel

---

## Environment Variables Reference

| Variable | Purpose | Visibility |
|----------|---------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Public (browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Public (browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role | Private (server-side) |

**Note**: `NEXT_PUBLIC_*` variables are safe to expose in the browser. `SUPABASE_SERVICE_ROLE_KEY` is private and should never be exposed to the client.

---

## Deployment Checklist

### Before Deploying:
- [ ] `vercel.json` has environment variables configured
- [ ] Vercel project has environment variables set
- [ ] Supabase credentials are correct
- [ ] Local build works: `npm run build`
- [ ] No TypeScript errors: `npm run lint`

### During Deployment:
- [ ] `git push origin main`
- [ ] Monitor Vercel build
- [ ] Check for "supabaseUrl is required" error
- [ ] Verify deployment is successful

### After Deployment:
- [ ] Test portfolio on Vercel URL
- [ ] Verify Supabase data loads
- [ ] Check all sections display correctly

---

## Troubleshooting

### Error: "supabaseUrl is required"
- **Cause**: Environment variables not set in Vercel
- **Solution**: Add environment variables to Vercel project settings

### Error: "NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined"
- **Cause**: Environment variable name mismatch
- **Solution**: Verify variable names match exactly in Vercel settings

### Build fails with "Cannot find module"
- **Cause**: Dependencies not installed
- **Solution**: Vercel should auto-install, but check `npm install` works locally

### Deployment successful but Supabase data not loading
- **Cause**: Incorrect Supabase credentials
- **Solution**: Verify credentials in Vercel environment variables

---

## Git Commit

```
Commit: 794bc19
Message: fix: restore Supabase environment variables in vercel.json
```

---

## Status

✨ **READY FOR DEPLOYMENT** ✨

Your `vercel.json` has been fixed and committed. Environment variables are now properly configured. Ready to push to GitHub and deploy!

