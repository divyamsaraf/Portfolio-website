# Complete Setup Guide - Portfolio Website

## 📋 Table of Contents
1. [Environment Variables](#environment-variables)
2. [Supabase Configuration](#supabase-configuration)
3. [Contact Form Setup](#contact-form-setup)
4. [Hero Section Roles](#hero-section-roles)
5. [Admin Authentication](#admin-authentication)
6. [Deployment](#deployment)

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Contact Form (EmailJS)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Admin Authentication
ADMIN_PASSWORD=your_secure_password
```

### Getting Supabase Keys:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy `Project URL` and `anon public` key
5. Paste into `.env.local`

---

## 🗄️ Supabase Configuration

### Database Tables Setup

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Hero Table
CREATE TABLE IF NOT EXISTS hero (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Your Name',
  subtitle TEXT NOT NULL DEFAULT 'Your subtitle',
  roles TEXT[] DEFAULT ARRAY['Role 1', 'Role 2', 'Role 3'],
  cta_github VARCHAR(500) DEFAULT 'https://github.com/yourusername',
  cta_resume VARCHAR(500) DEFAULT 'https://your-resume-link.com',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- About Table
CREATE TABLE IF NOT EXISTS about (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  description TEXT,
  achievements TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  icon_url VARCHAR(500),
  proficiency INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] DEFAULT '{}'::text[],
  tags TEXT[] DEFAULT '{}'::text[],
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  screenshot VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Resume Table
CREATE TABLE IF NOT EXISTS resume (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT,
  file_name TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Adding Array Data in Supabase

**For TEXT[] fields (roles, achievements, tech_stack, tags):**

Use PostgreSQL array syntax:
```
{"value1", "value2", "value3"}
```

**Examples:**
- Roles: `{"Full Stack Developer", "Backend Engineer", "DevOps Specialist"}`
- Tech Stack: `{"React", "Node.js", "PostgreSQL", "Docker"}`
- Achievements: `{"Led team of 5 developers", "Reduced load time by 40%", "Implemented CI/CD pipeline"}`

---

## 📧 Contact Form Setup

### Using EmailJS (Recommended)

1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Create an email service:
   - Click "Add Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
4. Create an email template:
   - Click "Create Template"
   - Use these template variables:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Message: {{message}}
     ```
5. Get your credentials:
   - Service ID: From "Email Services"
   - Template ID: From "Email Templates"
   - Public Key: From "Account" → "API Keys"
6. Add to `.env.local`

---

## 🎯 Hero Section Roles

### Adding Roles in Admin Dashboard

1. Go to `/admin` (password: `admin123` by default)
2. Click "Hero" tab
3. In the "Roles" field, enter roles in this format:

```
Full Stack Developer
Backend Engineer
DevOps Specialist
Cloud Architect
```

**Or use Supabase directly:**
```
{"Full Stack Developer", "Backend Engineer", "DevOps Specialist"}
```

---

## 🔑 Admin Authentication

### Default Credentials
- **Email**: Any email (for Supabase magic link)
- **Password**: `admin123` (change in `.env.local`)

### Changing Admin Password
1. Edit `.env.local`
2. Change `ADMIN_PASSWORD` value
3. Restart the development server

### Using Supabase Magic Link
1. Set up Supabase authentication
2. Add your email to `admin_users` table
3. Use magic link login on admin page

---

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `ADMIN_PASSWORD`
6. Click "Deploy"

---

## ✅ Verification Checklist

- [ ] `.env.local` file created with all variables
- [ ] Supabase tables created
- [ ] Hero data added to Supabase
- [ ] EmailJS configured (if using contact form)
- [ ] Admin password set
- [ ] Build successful: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Local testing complete: `npm run dev`
- [ ] Deployed to Vercel

---

## 🆘 Troubleshooting

**"Cannot read properties of null" error:**
- Ensure all Supabase tables are created
- Check that `.env.local` has correct URLs and keys

**Contact form not sending:**
- Verify EmailJS credentials in `.env.local`
- Check EmailJS dashboard for errors
- Ensure email template variables match

**Admin login not working:**
- Verify `ADMIN_PASSWORD` in `.env.local`
- Clear browser cache and cookies
- Try incognito/private mode

**Array data not saving in Supabase:**
- Use PostgreSQL syntax: `{"item1", "item2"}`
- Don't use JSON format: `["item1", "item2"]`
- Ensure field type is `TEXT[]`

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [EmailJS Documentation](https://www.emailjs.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)

---

**Last Updated**: 2025-11-08
**Version**: 2.0

