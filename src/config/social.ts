/**
 * Social Links Configuration
 * Centralized management of all social media and external links
 */

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export const SOCIAL_LINKS: Record<string, SocialLink> = {
  github: {
    name: "GitHub",
    url: "https://github.com/divyamsaraf",
    icon: "github",
    label: "Visit GitHub profile",
  },
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/divyam-saraf",
    icon: "linkedin",
    label: "Visit LinkedIn profile",
  },
  // email: {
  //   name: "Email",
  //   url: "mailto:divyam@example.com",
  //   icon: "mail",
  //   label: "Send an email",
  // },
  // twitter: {
  //   name: "Twitter",
  //   url: "https://twitter.com/divyamsaraf",
  //   icon: "twitter",
  //   label: "Visit Twitter profile",
  // },
};

export const PRIMARY_SOCIAL_LINKS = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
];

export const ALL_SOCIAL_LINKS = Object.values(SOCIAL_LINKS);

/**
 * Get social link by name
 */
export function getSocialLink(name: keyof typeof SOCIAL_LINKS): SocialLink {
  return SOCIAL_LINKS[name];
}

/**
 * Get all social links as array
 */
export function getAllSocialLinks(): SocialLink[] {
  return ALL_SOCIAL_LINKS;
}

