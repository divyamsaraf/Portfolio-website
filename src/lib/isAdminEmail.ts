import { getSupabaseAdmin } from "./supabaseAdmin";

/** Escape `%`, `_`, `\` for use in PostgREST `ilike` (exact match, case-insensitive). */
function escapeForILike(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

/**
 * True if `email` matches a row in `admin_users` (case-insensitive).
 * Uses service role; call only from server-side API routes.
 */
export async function isEmailRegisteredAsAdmin(email: string): Promise<boolean> {
  const trimmed = email.trim();
  if (!trimmed) return false;

  const { data, error } = await getSupabaseAdmin()
    .from("admin_users")
    .select("email")
    .ilike("email", escapeForILike(trimmed))
    .limit(1)
    .maybeSingle();

  if (error) return false;
  return !!data;
}
