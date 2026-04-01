import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { isEmailRegisteredAsAdmin } from "@/lib/isAdminEmail";
import { getAdminMagicLinkRedirectUrl } from "@/lib/adminRedirectUrl";

type Body = { email?: string };

/** Same response whether or not the email is authorized (avoid admin email enumeration). */
const OK_RESPONSE = {
  ok: true,
  message: "If that email is authorized, you will receive a magic link shortly.",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Body;
  const email = typeof body.email === "string" ? body.email : "";

  if (!email.trim()) {
    return res.status(400).json({ error: "Email is required" });
  }

  const allowed = await isEmailRegisteredAsAdmin(email);
  if (!allowed) {
    return res.status(200).json(OK_RESPONSE);
  }

  const redirectTo = getAdminMagicLinkRedirectUrl(req);
  if (!redirectTo) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anonKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const supabaseAnon = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabaseAnon.auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: redirectTo },
  });

  if (error) {
    console.error("request-magic-link:", error.message);
  }

  return res.status(200).json(OK_RESPONSE);
}
