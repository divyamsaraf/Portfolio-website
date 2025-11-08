import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabaseClient";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ url?: string; error?: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const form = formidable({ multiples: false });
    const [, files] = await form.parse(req);

    const fileArray = Array.isArray(files.file) ? files.file : [files.file];
    const file = fileArray?.[0];

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = `resume_${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("resume")
      .upload(fileName, fileBuffer, { upsert: true });

    if (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }

    const { data } = supabase.storage.from("resume").getPublicUrl(fileName);

    // Update resume in database
    await supabase.from("resume").upsert({
      file_url: data.publicUrl,
      file_name: fileName,
    });

    res.status(200).json({ url: data.publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload resume" });
  }
}
