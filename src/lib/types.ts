// ============================================================================
// CORE TYPES FOR PORTFOLIO
// ============================================================================

export type ID = string | number;

// ============================================================================
// HERO SECTION
// ============================================================================
export interface Hero {
  id?: ID;
  title: string;
  subtitle: string;
  roles?: string[];
  collaboration_roles?: string[];
  cta_github: string;
  cta_resume: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// ABOUT SECTION
// ============================================================================
export interface About {
  id?: ID;
  content: string;
  personal_touch?: string;
  quotes?: string[];
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// QUOTE
// ============================================================================
export interface Quote {
  id: ID;
  text: string;
  author: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// EXPERIENCE
// ============================================================================
export interface Experience {
  id: ID;
  company: string;
  role: string;
  start_date: string;
  end_date?: string | null;
  description: string;
  achievements?: string[];
  bullets?: string[];
  tech?: string[];
  location?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// SKILLS
// ============================================================================
export interface Skill {
  id: ID;
  name: string;
  category?: string;
  icon_url?: string;
  proficiency?: number; // 1-5
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// PROJECTS
// ============================================================================
export interface Project {
  id: ID;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  tech_stack: string[];
  tags?: string[];
  github_url?: string;
  live_url?: string;
  screenshot?: string;
  featured?: boolean;
  date?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// RESUME
// ============================================================================
export interface Resume {
  id?: ID;
  file_url: string;
  file_name: string;
  uploaded_at?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// EDUCATION
// ============================================================================
export interface Education {
  id: ID;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string | null;
  gpa?: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// COLLABORATION
// ============================================================================
export interface Collaboration {
  id: ID;
  title: string;
  description: string;
  type: "open_source" | "collaboration" | "project";
  link?: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// CONTACT
// ============================================================================
export interface Contact {
  id?: ID;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  collaboration_text?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================================================
// USER (for admin auth)
// ============================================================================
export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}
