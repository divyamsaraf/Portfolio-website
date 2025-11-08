# Admin Setup & Security Guide

## Overview

Your portfolio website now has a secure admin dashboard with:
- ✅ Magic link authentication (no password needed)
- ✅ Admin role-based access control
- ✅ Secure API endpoints with authentication
- ✅ Dark mode only (no theme toggle)
- ✅ Correct navigation sequence
- ✅ Contact form email setup

---

## 1. Admin Authentication Setup

### Magic Link Login (No Password)

1. Go to `/admin` page
2. Enter your email address
3. Check your email for magic link
4. Click the link to login

**Important**: The magic link will redirect to your production domain (not localhost).

### Setting Up Your Admin Account

You need to add yourself to the `admin_users` table in Supabase:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Run this SQL:

```sql
INSERT INTO admin_users (email, role)
VALUES ('your-email@example.com', 'ADMIN')
ON CONFLICT (email) DO UPDATE SET role = 'ADMIN';
```

Replace `your-email@example.com` with your actual email.

### Verifying Admin Access

After adding yourself to `admin_users`:
1. Go to `/admin`
2. Enter your email
3. Check your email for magic link
4. Click the link
5. You should now have access to the admin dashboard

---

## 2. Environment Variables (Vercel)

Make sure these are set in your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com
RESEND_API_KEY=your_resend_api_key
```

**Critical**: `NEXT_PUBLIC_SITE_URL` must be your production domain for magic links to work correctly.

---

## 3. Security Features

### What's Protected

- ✅ All admin API endpoints require authentication
- ✅ All admin mutations require ADMIN role
- ✅ JWT tokens verified server-side
- ✅ Unauthorized requests return 401/403 errors

### How It Works

1. **Client-side**: Forms use `axiosWithAuth` which automatically adds JWT token
2. **Server-side**: API routes check token and admin role with `requireAdminAuth`
3. **Unauthorized**: Non-admin users get 403 Forbidden error

### Admin API Routes

All these routes require admin authentication:
- `POST /api/admin/hero` - Update hero section
- `POST /api/admin/about` - Update about section
- `POST /api/admin/experience` - Update experience
- `POST /api/admin/skills` - Update skills
- `POST /api/admin/projects` - Update projects
- `POST /api/admin/uploadResume` - Upload resume PDF

---

## 4. Contact Form Email Setup

### Using Resend (Recommended)

1. Sign up at [Resend.com](https://resend.com)
2. Get your API key
3. Add to Vercel environment variables:
   - `RESEND_API_KEY=your_key`
   - `CONTACT_TO_EMAIL=your-email@example.com`
   - `CONTACT_FROM_EMAIL=noreply@yourdomain.com`

### How It Works

When someone submits the contact form:
1. Form data sent to `/api/contact`
2. Email sent via Resend API
3. You receive email at `CONTACT_TO_EMAIL`

---

## 5. Navigation Bar

Current sequence (correct order):
1. Home
2. About
3. Experience
4. Education
5. Skills
6. Projects
7. Resume
8. Contact

---

## 6. Dark Mode

- ✅ Dark mode is now the only theme
- ✅ Theme toggle button removed
- ✅ All components use dark mode styling

---

## 7. Troubleshooting

### Magic Link Not Working

**Problem**: Magic link redirects to localhost
- **Solution**: Set `NEXT_PUBLIC_SITE_URL` in Vercel to your production domain

### Can't Access Admin Dashboard

**Problem**: Getting 403 Forbidden error
- **Solution**: Make sure your email is in `admin_users` table with `role='ADMIN'`

### Contact Form Not Sending Emails

**Problem**: Form submits but no email received
- **Solution**: Check that `RESEND_API_KEY` is set in Vercel environment variables

### Build Fails

**Problem**: Build error with admin routes
- **Solution**: Make sure all environment variables are set in Vercel

---

## 8. Adding More Admin Users

To add another admin user:

```sql
INSERT INTO admin_users (email, role)
VALUES ('another-email@example.com', 'ADMIN');
```

---

## 9. Removing Admin Access

To remove admin access:

```sql
DELETE FROM admin_users WHERE email = 'email@example.com';
```

---

## 10. Deployment Checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel
- [ ] Add your email to `admin_users` table
- [ ] Set `RESEND_API_KEY` in Vercel
- [ ] Test magic link login
- [ ] Test admin dashboard access
- [ ] Test contact form email
- [ ] Verify dark mode works
- [ ] Check navigation sequence

---

## Support

For issues or questions, check:
1. Vercel deployment logs
2. Supabase logs
3. Browser console for errors
4. Network tab for API responses


