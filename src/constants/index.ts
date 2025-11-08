/**
 * Global Constants
 * Centralized configuration for the entire application
 */

// ============================================================================
// SITE METADATA
// ============================================================================
export const SITE_NAME = "Divyam Saraf";
export const SITE_TITLE = "Divyam Saraf - Software Developer";
export const SITE_DESCRIPTION =
  "Results-driven software developer with 3+ years of experience building scalable web applications, optimizing cloud infrastructure, and creating secure APIs.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://divyamsaraf.com";
export const SITE_AUTHOR = "Divyam Saraf";

// ============================================================================
// NAVIGATION
// ============================================================================
export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/#about", label: "About", icon: "👤" },
  { href: "/#experience", label: "Experience", icon: "💼" },
  { href: "/#education", label: "Education", icon: "🎓" },
  { href: "/#skills", label: "Skills", icon: "🛠️" },
  { href: "/#projects", label: "Projects", icon: "📁" },
  { href: "/#resume", label: "Resume", icon: "📄" },
  { href: "/#contact", label: "Contact", icon: "✉️" },
] as const;

// ============================================================================
// ANIMATION DEFAULTS
// ============================================================================
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

export const ANIMATION_DELAY = {
  none: 0,
  xs: 0.1,
  sm: 0.2,
  md: 0.3,
  lg: 0.4,
  xl: 0.5,
} as const;

// ============================================================================
// COLORS
// ============================================================================
export const COLORS = {
  primary: "#2563eb", // blue-600
  secondary: "#9333ea", // purple-600
  accent: "#06b6d4", // cyan-500
  success: "#10b981", // emerald-500
  warning: "#f59e0b", // amber-500
  error: "#ef4444", // red-500
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ============================================================================
// PAGINATION
// ============================================================================
export const ITEMS_PER_PAGE = 12;
export const MAX_ITEMS_PER_PAGE = 100;

// ============================================================================
// VALIDATION
// ============================================================================
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_EMAIL_LENGTH: 5,
  MAX_EMAIL_LENGTH: 255,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 5000,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
} as const;

// ============================================================================
// FILE UPLOAD
// ============================================================================
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: ["application/pdf"],
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm"],
} as const;

// ============================================================================
// API
// ============================================================================
export const API_ENDPOINTS = {
  HERO: "/api/admin/hero",
  ABOUT: "/api/admin/about",
  EXPERIENCE: "/api/admin/experience",
  SKILLS: "/api/admin/skills",
  PROJECTS: "/api/admin/projects",
  RESUME: "/api/admin/resume",
} as const;

// ============================================================================
// CACHE
// ============================================================================
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const;

// ============================================================================
// EXTERNAL LINKS
// ============================================================================
export const EXTERNAL_LINKS = {
  GITHUB_PROFILE: "https://github.com/divyamsaraf",
  LINKEDIN_PROFILE: "https://www.linkedin.com/in/divyam-saraf",
  TWITTER_PROFILE: "https://twitter.com/divyamsaraf",
  EMAIL: "divyam@example.com",
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================
export const FEATURES = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  ENABLE_COMMENTS: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === "true",
  ENABLE_NEWSLETTER: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === "true",
  MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true",
} as const;

