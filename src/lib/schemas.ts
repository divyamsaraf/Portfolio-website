/**
 * Zod Validation Schemas
 * Runtime type checking for all data structures
 */

import { z } from "zod";

// ============================================================================
// HERO SCHEMA
// ============================================================================
export const HeroSchema = z.object({
  id: z.string().or(z.number()).optional(),
  title: z.string().min(1, "Title is required").max(200),
  subtitle: z.string().min(1, "Subtitle is required").max(500),
  cta_github: z.string().url("Invalid GitHub URL"),
  cta_resume: z.string().url("Invalid resume URL"),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type HeroInput = z.infer<typeof HeroSchema>;

// ============================================================================
// ABOUT SCHEMA
// ============================================================================
export const AboutSchema = z.object({
  id: z.string().or(z.number()).optional(),
  content: z.string().min(10, "Content must be at least 10 characters").max(5000),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type AboutInput = z.infer<typeof AboutSchema>;

// ============================================================================
// EXPERIENCE SCHEMA
// ============================================================================
export const ExperienceSchema = z.object({
  id: z.string().or(z.number()),
  company: z.string().min(1, "Company is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().nullable().optional(),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  bullets: z.array(z.string()).optional(),
  tech: z.array(z.string()).optional(),
  location: z.string().max(100).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ExperienceInput = z.infer<typeof ExperienceSchema>;

// ============================================================================
// SKILL SCHEMA
// ============================================================================
export const SkillSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1, "Skill name is required").max(100),
  category: z.string().max(50).optional(),
  icon_url: z.string().url("Invalid icon URL").optional(),
  proficiency: z.number().min(1).max(100).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type SkillInput = z.infer<typeof SkillSchema>;

// ============================================================================
// PROJECT SCHEMA
// ============================================================================
export const ProjectSchema = z.object({
  id: z.string().or(z.number()),
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  long_description: z.string().max(5000).optional(),
  tech_stack: z.array(z.string()).min(1, "At least one technology is required"),
  tags: z.array(z.string()).optional(),
  github_url: z.string().url("Invalid GitHub URL").optional(),
  live_url: z.string().url("Invalid live URL").optional(),
  screenshot: z.string().url("Invalid screenshot URL").optional(),
  featured: z.boolean().optional(),
  date: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

// ============================================================================
// RESUME SCHEMA
// ============================================================================
export const ResumeSchema = z.object({
  id: z.string().or(z.number()).optional(),
  file_url: z.string().url("Invalid file URL"),
  file_name: z.string().min(1, "File name is required").max(255),
  uploaded_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type ResumeInput = z.infer<typeof ResumeSchema>;

// ============================================================================
// CONTACT FORM SCHEMA
// ============================================================================
export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export function validateHero(data: unknown) {
  return HeroSchema.safeParse(data);
}

export function validateAbout(data: unknown) {
  return AboutSchema.safeParse(data);
}

export function validateExperience(data: unknown) {
  return ExperienceSchema.safeParse(data);
}

export function validateSkill(data: unknown) {
  return SkillSchema.safeParse(data);
}

export function validateProject(data: unknown) {
  return ProjectSchema.safeParse(data);
}

export function validateResume(data: unknown) {
  return ResumeSchema.safeParse(data);
}

export function validateContactForm(data: unknown) {
  return ContactFormSchema.safeParse(data);
}

