# Portfolio Website - Setup Guide

## Quick Start (5 minutes)

### 1. Clone & Install
```bash
git clone <your-repo>
cd portfolio_website
npm install
```

### 2. Environment Variables
Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email (Contact Form)
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=no-reply@yourdomain.com
RESEND_API_KEY=your-resend-api-key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database Setup
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Run SQL from `SUPABASE_MIGRATIONS.sql` in SQL editor
4. Add your email to `admin_users` table with role='ADMIN'

### 4. Run Locally
```bash
npm run dev
```
Visit http://localhost:3000

### 5. Access Admin
- Go to http://localhost:3000/admin
- Use magic link or email/password to sign in
- Edit your portfolio content

---

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables (same as `.env.local`)
5. Click "Deploy"

### 3. Set Up Email (Resend)
1. Go to [Resend](https://resend.com)
2. Sign up for free account
3. Create API key
4. Add to Vercel environment variables as `RESEND_API_KEY`

### 4. Custom Domain (Optional)
1. In Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Admin Dashboard

### Login Methods
- **Magic Link**: Receive sign-in link via email (recommended)
- **Email & Password**: Use Supabase credentials

### Edit Content
- Hero Section: Title, subtitle, CTA buttons
- About: Personal bio and story
- Experience: Work history and roles
- Education: Degrees and institutions
- Skills: Technical skills by category
- Projects: Portfolio projects
- Resume: PDF upload
- Contact: Social links and collaboration roles

### Security
- Only users in `admin_users` table with role='ADMIN' can access
- Magic links redirect to your production domain (not localhost)
- All API requests require authentication token

---

## Contact Form Setup

### How It Works
1. User fills contact form on `/contact` page
2. Form submits to `/api/contact` endpoint
3. Email sent via Resend API
4. You receive email at `CONTACT_TO_EMAIL`

### Configure Email
1. Set `CONTACT_TO_EMAIL` to your email
2. Set `CONTACT_FROM_EMAIL` to your domain email
3. Get `RESEND_API_KEY` from [Resend](https://resend.com)
4. Add to environment variables

### Test Locally
```bash
npm run dev
# Go to http://localhost:3000/contact
# Fill form and submit
# Check your email
```

---

## Troubleshooting

### Magic Link Redirects to Localhost
- Set `NEXT_PUBLIC_SITE_URL` to your production domain
- In Vercel, add `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`

### Admin Access Denied
- Check `admin_users` table in Supabase
- Ensure your email is added with role='ADMIN'
- Try signing out and signing in again

### Contact Form Not Sending
- Check `RESEND_API_KEY` is set correctly
- Verify `CONTACT_TO_EMAIL` is valid
- Check Resend dashboard for errors

### Build Fails on Vercel
- Ensure all environment variables are set
- Check `SUPABASE_SERVICE_ROLE_KEY` is correct
- Review Vercel build logs

---

## File Structure

```
src/
├── components/          # React components
│   ├── sections/       # Page sections
│   ├── nav/            # Navigation
│   └── layout/         # Layout wrapper
├── pages/              # Next.js pages
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   └── [page].tsx      # Public pages
├── lib/                # Utilities
│   ├── supabaseClient.ts
│   ├── adminAuth.ts    # Admin auth utilities
│   ├── axiosClient.ts  # Authenticated axios
│   └── types.ts        # TypeScript types
├── hooks/              # React hooks
├── context/            # React context
└── styles/             # CSS files
```

---

## Key Features

✅ **Dark Mode Only** - Clean, modern dark theme
✅ **Supabase Backend** - Serverless database
✅ **Admin Dashboard** - Edit content without code
✅ **Magic Link Auth** - Secure, passwordless login
✅ **Contact Form** - Email integration with Resend
✅ **Responsive Design** - Works on all devices
✅ **TypeScript** - Type-safe code
✅ **Framer Motion** - Smooth animations

---

## Support

For issues or questions:
1. Check this guide
2. Review Supabase docs
3. Check Vercel deployment logs
4. Review browser console for errors

---

**Last Updated**: November 2024

