import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Server-side admin authentication utility
 * Used to verify admin access in API routes
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

/**
 * Check if a user is an admin
 * @param email - User email to check
 * @returns true if user is admin, false otherwise
 */
export async function isAdminUser(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("email, role")
      .eq("email", email)
      .eq("role", "ADMIN")
      .single();

    if (error) {
      console.warn("Admin check failed:", error);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error("Error checking admin access:", err);
    return false;
  }
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
    const { data, error } = await supabase.auth.getUser(token);

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

