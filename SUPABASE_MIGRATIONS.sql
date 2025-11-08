-- ============================================================================
-- SUPABASE MIGRATIONS FOR PORTFOLIO WEBSITE
-- ============================================================================
-- Run these SQL commands in Supabase SQL Editor to set up all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ADMIN USERS TABLE (for authentication)
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add your admin email
INSERT INTO admin_users (email) VALUES ('your-email@example.com')
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- HERO TABLE
-- ============================================================================
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

-- ============================================================================
-- ABOUT TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS about (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- EXPERIENCE TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  achievements TEXT[],
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- SKILLS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS skills (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  icon_url VARCHAR(500),
  proficiency INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- PROJECTS TABLE
-- ============================================================================
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- EDUCATION TABLE (NEW)
-- ============================================================================
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  gpa NUMERIC(3,2),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- COLLABORATION TABLE (NEW)
-- ============================================================================
CREATE TABLE IF NOT EXISTS collaboration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('open_source', 'collaboration', 'project')),
  link VARCHAR(500),
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- RESUME TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS resume (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_url TEXT NOT NULL,
  file_name TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume ENABLE ROW LEVEL SECURITY;

-- Public read access for all content tables
CREATE POLICY "public_read_hero" ON hero FOR SELECT USING (true);
CREATE POLICY "public_read_about" ON about FOR SELECT USING (true);
CREATE POLICY "public_read_experience" ON experience FOR SELECT USING (true);
CREATE POLICY "public_read_skills" ON skills FOR SELECT USING (true);
CREATE POLICY "public_read_projects" ON projects FOR SELECT USING (true);
CREATE POLICY "public_read_education" ON education FOR SELECT USING (true);
CREATE POLICY "public_read_collaboration" ON collaboration FOR SELECT USING (true);
CREATE POLICY "public_read_resume" ON resume FOR SELECT USING (true);

-- Admin-only write access
CREATE POLICY "admin_write_hero" ON hero FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));
CREATE POLICY "admin_write_about" ON about FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));
CREATE POLICY "admin_write_experience" ON experience FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));
CREATE POLICY "admin_write_skills" ON skills FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));
CREATE POLICY "admin_write_projects" ON projects FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));
CREATE POLICY "admin_write_education" ON education FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));
CREATE POLICY "admin_write_collaboration" ON collaboration FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));
CREATE POLICY "admin_write_resume" ON resume FOR ALL USING (auth.email() IN (SELECT email FROM admin_users));

-- ============================================================================
-- SAMPLE DATA (Optional - uncomment to use)
-- ============================================================================

-- INSERT INTO hero (title, subtitle, roles, cta_github, cta_resume) VALUES (
--   'Your Name',
--   'Your professional tagline',
--   ARRAY['Full Stack Developer', 'Backend Engineer', 'DevOps Specialist'],
--   'https://github.com/yourusername',
--   'https://your-resume-link.com'
-- ) ON CONFLICT DO NOTHING;

-- INSERT INTO about (content) VALUES (
--   'I am a passionate software engineer with expertise in building scalable systems.'
-- ) ON CONFLICT DO NOTHING;

