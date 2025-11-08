import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";
import { requireAdminAuth } from "../../../lib/adminAuth";
import type { Experience } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Experience[] | Experience | { error: string }>
) {
  const { method } = req;

  try {
    // POST requests require admin auth
    if (method === "POST") {
      const isAdmin = await requireAdminAuth(req, res);
      if (!isAdmin) return;
    }

    switch (method) {
      case "GET":
        const { data, error: getError } = await supabase
          .from("experience")
          .select("*")
          .order("start_date", { ascending: false });

        if (getError) {
          return res.status(400).json({ error: getError.message });
        }

        res.status(200).json(data || []);
        break;

      case "POST":
        const { experiences } = req.body;

        if (!Array.isArray(experiences)) {
          return res.status(400).json({ error: "Experiences must be an array" });
        }

        // Delete all existing experiences and insert new ones
        await supabase.from("experience").delete().neq("id", 0);

        const { data: inserted, error: insertError } = await supabase
          .from("experience")
          .insert(experiences)
          .select();

        if (insertError) {
          return res.status(400).json({ error: insertError.message });
        }

        res.status(200).json(inserted || experiences);
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

