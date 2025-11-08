import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";
import type { About } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<About | { error: string }>
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const { data, error: getError } = await supabase
          .from("about")
          .select("*")
          .limit(1)
          .single();

        if (getError) {
          return res.status(400).json({ error: getError.message });
        }

        res.status(200).json(data);
        break;

      case "POST":
        const { content } = req.body;

        if (!content) {
          return res.status(400).json({ error: "Content is required" });
        }

        const { data: inserted, error: insertError } = await supabase
          .from("about")
          .upsert({ content })
          .select()
          .single();

        if (insertError) {
          return res.status(400).json({ error: insertError.message });
        }

        res.status(200).json(inserted || { content });
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

