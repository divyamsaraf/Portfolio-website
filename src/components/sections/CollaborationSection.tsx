import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import type { Collaboration } from "../../lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

const typeIcons = {
  open_source: "🔓",
  collaboration: "🤝",
  project: "💼",
};

export default function CollaborationSection() {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollaborations = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("collaboration")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        setCollaborations(data || []);
      } catch (err) {
        console.error("Error fetching collaborations:", err);
        setError("Failed to load collaboration data");
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (collaborations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No collaboration opportunities available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collaborations.map((collab, index) => (
        <motion.div
          key={collab.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -8 }}
          className="group relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />

          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 border border-slate-700 dark:border-slate-700 hover:border-blue-500/50 transition-all h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">
                {typeIcons[collab.type as keyof typeof typeIcons] || "✨"}
              </span>
              <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full capitalize">
                {collab.type.replace("_", " ")}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{collab.title}</h3>
            <p className="text-gray-300 text-sm flex-grow mb-4">
              {collab.description}
            </p>

            {collab.link && (
              <motion.a
                href={collab.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
                whileHover={{ x: 5 }}
              >
                Learn More →
              </motion.a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

