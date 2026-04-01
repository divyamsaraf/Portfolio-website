import type { NextApiRequest } from "next";

/**
 * Build magic-link redirect URL. Prefer request Origin when it matches a known deployment URL
 * (avoids open redirects). Falls back to NEXT_PUBLIC_SITE_URL.
 */
export function getAdminMagicLinkRedirectUrl(req: NextApiRequest): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const allowedOrigins = new Set<string>();

  if (siteUrl) {
    try {
      allowedOrigins.add(new URL(siteUrl).origin);
    } catch {
      /* ignore invalid SITE_URL */
    }
  }

  if (process.env.VERCEL_URL) {
    allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.NODE_ENV === "development") {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }

  const originHeader = req.headers.origin;
  if (originHeader && allowedOrigins.has(originHeader)) {
    return `${originHeader}/admin/`;
  }

  if (siteUrl) {
    return `${siteUrl}/admin/`;
  }

  return null;
}
