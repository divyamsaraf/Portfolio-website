import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { isEmailRegisteredAsAdmin } from "@/lib/isAdminEmail";

type Body = { email?: string; password?: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Body;
  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email.trim() || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const genericError = { error: "Invalid email or password" };

  const allowed = await isEmailRegisteredAsAdmin(email);
  if (!allowed) {
    return res.status(401).json(genericError);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !anonKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const supabaseAnon = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabaseAnon.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error || !data.session) {
    return res.status(401).json(genericError);
  }

  return res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in: data.session.expires_in,
    expires_at: data.session.expires_at,
    token_type: data.session.token_type,
  });
}
