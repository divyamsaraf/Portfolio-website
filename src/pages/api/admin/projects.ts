import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";
import { requireAdminAuth } from "../../../lib/adminAuth";
import type { Project } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | Project | { error: string }>
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
          .from("projects")
          .select("*")
          .order("date", { ascending: false });

        if (getError) {
          return res.status(400).json({ error: getError.message });
        }

        res.status(200).json(data || []);
        break;

      case "POST":
        const { projects } = req.body;

        if (!Array.isArray(projects)) {
          return res.status(400).json({ error: "Projects must be an array" });
        }

        // Delete all existing projects and insert new ones
        await supabase.from("projects").delete().neq("id", 0);

        const { data: inserted, error: insertError } = await supabase
          .from("projects")
          .insert(projects)
          .select();

        if (insertError) {
          return res.status(400).json({ error: insertError.message });
        }

        res.status(200).json(inserted || projects);
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

