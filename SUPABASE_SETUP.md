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
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  cta_github TEXT,
  cta_resume TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO hero (title, subtitle, cta_github, cta_resume) VALUES (
  'Divyam Saraf',
  'Building scalable, maintainable systems with Java, Python, and modern React stacks. Open to SDE roles (STEM OPT).',
  'https://github.com/divyamsaraf',
  'https://example.com/resume.pdf'
);
```

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
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  tech_stack TEXT[] NOT NULL,
  screenshot TEXT,
  github_url TEXT,
  live_url TEXT,
  date TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

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

