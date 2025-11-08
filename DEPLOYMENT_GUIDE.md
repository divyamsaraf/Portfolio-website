# Deployment Guide

This guide covers deploying your portfolio website to Vercel with Supabase backend.

## Prerequisites

- **Node.js 20+** (required by Supabase)
- **npm 10+**
- GitHub account with repository pushed
- Supabase project created
- Vercel account
- Environment variables configured

## Step 1: Prepare Supabase

### 1.1 Create Tables

Run these SQL queries in your Supabase SQL editor:

```sql
-- Hero Table
CREATE TABLE hero (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta_github TEXT,
  cta_resume TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- About Table
CREATE TABLE about (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Experience Table
CREATE TABLE experience (
  id BIGSERIAL PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  bullets TEXT[],
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills Table
CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  proficiency INTEGER,
  icon_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects Table
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[],
  screenshot TEXT,
  github_url TEXT,
  live_url TEXT,
  date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Resume Table
CREATE TABLE resume (
  id BIGSERIAL PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 1.2 Enable Row Level Security (RLS)

For each table, enable RLS and add policies:

```sql
-- Enable RLS
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON hero FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON about FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON resume FOR SELECT USING (true);
```

### 1.3 Populate Data

Insert your portfolio data into the tables.

## Step 2: Deploy to Vercel

### 2.1 Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Paste: `https://github.com/divyamsaraf/Portfolio-website.git`
5. Click "Import"

### 2.2 Configure Environment Variables

In Vercel project settings, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=no-reply@yourdomain.com
RESEND_API_KEY=your-resend-api-key (optional)
```

### 2.3 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site is live at `https://your-project.vercel.app`

## Step 3: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)

## Step 4: Post-Deployment

### 4.1 Verify Functionality

- [ ] Homepage loads correctly
- [ ] All sections display content from Supabase
- [ ] Dark/light mode toggle works
- [ ] Social links are clickable
- [ ] Resume downloads properly
- [ ] Admin dashboard is accessible

### 4.2 Set Up Monitoring

1. Enable Vercel Analytics
2. Set up error tracking (Sentry optional)
3. Monitor Supabase usage

### 4.3 Configure CI/CD

The project includes GitHub Actions workflows for:
- Automated testing on pull requests
- Automatic deployment on push to main

## Troubleshooting

### Build Fails

- Check Node version (should be 18+)
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Environment Variables Not Working

- Verify variables are set in Vercel project settings
- Restart deployment after adding variables
- Check that variable names match exactly

### Supabase Connection Issues

- Verify URL and keys are correct
- Check RLS policies allow public read
- Ensure tables exist in database

### Performance Issues

- Enable Vercel Analytics
- Check Supabase query performance
- Optimize images
- Enable caching headers

## Maintenance

### Regular Tasks

- Monitor error logs
- Update dependencies monthly
- Backup Supabase data
- Review analytics

### Updating Content

1. Go to `/admin` dashboard
2. Log in with your email
3. Update content in respective tabs
4. Changes are live immediately

## Support

For issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review browser console for errors
4. Check GitHub Issues

## Admin Authentication (NEW)

The admin dashboard now uses Supabase authentication with two methods:

### Email & Password Login
- Use your Supabase auth credentials
- Email must be in `admin_users` table

### Magic Link Login
- Receive sign-in link via email
- No password required
- More secure option

**Setup:**
1. Add your email to `admin_users` table
2. Go to `/admin`
3. Choose login method
4. Sign in

## New Sections (v2.0)

### Education Section
- Display education history
- Shows institution, degree, GPA
- Formatted dates (Month/Year)
- Timeline design

### Collaboration Section
- Open source opportunities
- Collaboration requests
- Project partnerships
- Type-based icons

### Resume Section
- Increased PDF display height
- Google Drive integration
- Direct PDF file support
- Download functionality

### Go to Top Button
- Appears after scrolling 300px
- Smooth scroll animation
- Mobile-friendly

## Section Order

1. Hero
2. About
3. Experience
4. Projects
5. Skills
6. Education (NEW)
7. Resume (NEW)
8. Collaboration (NEW)
9. Contact

## Security Checklist

- [ ] Environment variables are secure
- [ ] RLS policies are configured
- [ ] Admin email is protected
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Backups are configured
- [ ] Node.js 20+ is installed
- [ ] Supabase auth is configured

