import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";
import type { Skill } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Skill[] | Skill | { error: string }>
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const { data, error: getError } = await supabase
          .from("skills")
          .select("*")
          .order("name", { ascending: true });

        if (getError) {
          return res.status(400).json({ error: getError.message });
        }

        res.status(200).json(data || []);
        break;

      case "POST":
        const { skills } = req.body;

        if (!Array.isArray(skills)) {
          return res.status(400).json({ error: "Skills must be an array" });
        }

        // Delete all existing skills and insert new ones
        await supabase.from("skills").delete().neq("id", 0);

        const { data: inserted, error: insertError } = await supabase
          .from("skills")
          .insert(skills)
          .select();

        if (insertError) {
          return res.status(400).json({ error: insertError.message });
        }

        res.status(200).json(inserted || skills);
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

