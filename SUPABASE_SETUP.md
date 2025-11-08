# Supabase Setup Guide

This guide covers setting up Supabase for the portfolio website.

## Prerequisites

- Supabase account (free tier available at https://supabase.com)
- PostgreSQL knowledge (basic)

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign in or create account
3. Click "New Project"
4. Enter project name: "portfolio-website"
5. Set a strong database password
6. Select region closest to you
7. Click "Create new project"
8. Wait for project to initialize (2-3 minutes)

## Step 2: Get API Keys

1. Go to Project Settings > API
2. Copy these values:
   - `NEXT_PUBLIC_SUPABASE_URL` - Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - anon public key
   - `SUPABASE_SERVICE_ROLE_KEY` - service_role key (keep secret)

3. Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 3: Create Database Tables

Go to SQL Editor and run these queries:

### Hero Table
```sql
CREATE TABLE hero (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL DEFAULT 'Divyam Saraf',
  subtitle TEXT NOT NULL DEFAULT 'Building scalable, maintainable systems with Java, Python, and modern React stacks. Open to SDE roles (STEM OPT).',
  roles TEXT[] DEFAULT ARRAY['Full Stack Developer', 'Backend Developer', 'Software Engineer', 'Cloud Architect', 'DevOps Engineer'],
  cta_github VARCHAR(500) DEFAULT 'https://github.com/divyamsaraf',
  cta_resume VARCHAR(500) DEFAULT 'https://example.com/resume.pdf',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO hero (title, subtitle, roles, cta_github, cta_resume) VALUES (
  'Divyam Saraf',
  'Building scalable, maintainable systems with Java, Python, and modern React stacks. Open to SDE roles (STEM OPT).',
  ARRAY['Full Stack Developer', 'Backend Developer', 'Software Engineer', 'Cloud Architect', 'DevOps Engineer'],
  'https://github.com/divyamsaraf',
  'https://example.com/resume.pdf'
);
```

**Fields:**
- `title` - Your name (string)
- `subtitle` - Main tagline/description (text)
- `roles` - Array of rotating roles to display (text array)
- `cta_github` - GitHub profile URL (string)
- `cta_resume` - Resume download URL (string)

### About Table
```sql
CREATE TABLE about (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO about (content) VALUES (
  'I am a passionate full-stack engineer with expertise in building scalable systems and modern web applications.'
);
```

### Experience Table
```sql
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
```

### Skills Table
```sql
CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO skills (name, category) VALUES
  ('JavaScript', 'Language'),
  ('TypeScript', 'Language'),
  ('Python', 'Language'),
  ('Java', 'Language'),
  ('React', 'Frontend'),
  ('Next.js', 'Frontend'),
  ('TailwindCSS', 'Frontend'),
  ('Node.js', 'Backend'),
  ('PostgreSQL', 'Database'),
  ('Supabase', 'Backend');
```

### Projects Table
```sql
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] DEFAULT ARRAY[],
  tags TEXT[] DEFAULT ARRAY[],
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  screenshot VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Example insert
INSERT INTO projects (title, slug, description, long_description, tech_stack, tags, github_url, featured, date) VALUES (
  'RetailOps Pro',
  'retailops-pro',
  'Inventory & order management platform',
  'Built microservices for inventory, orders and invoices with real-time updates',
  ARRAY['Java', 'Spring Boot', 'AWS', 'React'],
  ARRAY['Full Stack', 'Microservices'],
  'https://github.com/divyamsaraf/retailops-pro',
  TRUE,
  '2023-06-15'
);
```

**Fields:**
- `title` - Project name (string)
- `slug` - URL-friendly identifier (string, unique)
- `description` - Short description (text)
- `long_description` - Detailed description (text)
- `tech_stack` - Technologies used (text array)
- `tags` - Project tags (text array)
- `github_url` - GitHub repository link (string)
- `live_url` - Live project URL (string)
- `screenshot` - Project screenshot URL (string)
- `featured` - Whether to feature on homepage (boolean)
- `date` - Project completion date (date)

### Resume Table
```sql
CREATE TABLE resume (
  id BIGSERIAL PRIMARY KEY,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Step 4: Enable Row Level Security (RLS)

For each table, enable RLS:

1. Go to Authentication > Policies
2. For each table, click "Enable RLS"
3. Add policy for public read access:

```sql
CREATE POLICY "Enable read access for all users" ON hero
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON about
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON experience
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON resume
  FOR SELECT USING (true);
```

## Step 5: Set Up Authentication

1. Go to Authentication > Providers
2. Enable Email provider
3. Go to Authentication > URL Configuration
4. Add your domain to "Redirect URLs":
   - http://localhost:3000/admin
   - https://yourdomain.com/admin

## Step 6: Test Connection

1. Run development server: `npm run dev`
2. Open http://localhost:3000
3. Check browser console for errors
4. Verify data loads from Supabase

## Troubleshooting

### 404 Error on Table Query
- Table doesn't exist
- Check table name spelling
- Verify table was created successfully

### 406 Error
- RLS policy issue
- Verify public read policy is enabled
- Check authentication headers

### Connection Refused
- Verify SUPABASE_URL is correct
- Check ANON_KEY is valid
- Verify network connectivity

### Data Not Loading
- Check browser console for errors
- Verify RLS policies allow read access
- Check table has data inserted

## Next Steps

1. Add sample data to tables
2. Test admin dashboard login
3. Test CRUD operations
4. Verify all pages load correctly
5. Deploy to Vercel with environment variables

