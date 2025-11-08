import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";
import { requireAdminAuth } from "../../../lib/adminAuth";
import type { Hero } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Hero | { error: string }>
) {
  const { method } = req;

  try {
    // GET requests don't need auth (public data)
    // POST requests require admin auth
    if (method === "POST") {
      const isAdmin = await requireAdminAuth(req, res);
      if (!isAdmin) return;
    }

    switch (method) {
      case "GET":
        const { data, error: getError } = await supabase
          .from("hero")
          .select("*")
          .limit(1)
          .single();

        if (getError) {
          return res.status(400).json({ error: getError.message });
        }

        res.status(200).json(data);
        break;

      case "POST":
        const { title, subtitle, cta_github, cta_resume } = req.body;

        if (!title || !subtitle) {
          return res.status(400).json({ error: "Title and subtitle are required" });
        }

        const { data: inserted, error: insertError } = await supabase
          .from("hero")
          .upsert({ title, subtitle, cta_github, cta_resume })
          .select()
          .single();

        if (insertError) {
          return res.status(400).json({ error: insertError.message });
        }

        res.status(200).json(inserted || { title, subtitle, cta_github, cta_resume });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
