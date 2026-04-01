import type { NextApiRequest, NextApiResponse } from "next";
import { isEmailRegisteredAsAdmin } from "./isAdminEmail";
import { getSupabaseAdmin } from "./supabaseAdmin";

/**
 * Server-side admin authentication utility
 * Used to verify admin access in API routes
 */

/**
 * Check if a user is an admin (same rules as login: row in admin_users, case-insensitive email).
 */
export async function isAdminUser(email: string): Promise<boolean> {
  return isEmailRegisteredAsAdmin(email);
}

/**
 * Get user from Supabase auth token
 * @param authHeader - Authorization header from request
 * @returns User object or null
 */
export async function getUserFromToken(authHeader?: string) {
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const { data, error } = await getSupabaseAdmin().auth.getUser(token);

    if (error || !data.user) {
      return null;
    }

    return data.user;
  } catch (err) {
    console.error("Error getting user from token:", err);
    return null;
  }
}

/**
 * Middleware to protect admin API routes
 * @param req - Next.js API request
 * @param res - Next.js API response
 * @returns true if user is authenticated admin, false otherwise
 */
export async function requireAdminAuth(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> {
  try {
    // Get auth header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Unauthorized: No auth token" });
      return false;
    }

    // Get user from token
    const user = await getUserFromToken(authHeader);
    if (!user || !user.email) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return false;
    }

    // Check if user is admin
    const isAdmin = await isAdminUser(user.email);
    if (!isAdmin) {
      res.status(403).json({ error: "Forbidden: Admin access required" });
      return false;
    }

    return true;
  } catch (err) {
    console.error("Admin auth middleware error:", err);
    res.status(500).json({ error: "Internal server error" });
    return false;
  }
}

/**
 * Get admin user from request
 * Combines token verification and admin check
 * @param req - Next.js API request
 * @returns User object if admin, null otherwise
 */
export async function getAdminUser(req: NextApiRequest) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const user = await getUserFromToken(authHeader);
    if (!user || !user.email) {
      return null;
    }

    const isAdmin = await isAdminUser(user.email);
    if (!isAdmin) {
      return null;
    }

    return user;
  } catch (err) {
    console.error("Error getting admin user:", err);
    return null;
  }
}

