import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import type { Skill } from "../../lib/types";

// Harmonized category mappings for cleaner layout
const CATEGORY_MAP: Record<string, string> = {
  "Programming Language": "Languages",
  "Framework/Library": "Frameworks",
  "Cloud": "Cloud & DevOps",
  "DevOps": "Cloud & DevOps",
  "Database": "Databases",
  "API Tool": "Tools & Testing",
  "Testing Framework": "Tools & Testing",
  "Soft Skill": "Soft Skills"
};

const CATEGORY_ICONS: Record<string, string> = {
  "Languages": "⚡️",
  "Frameworks": "🧩",
  "Cloud & DevOps": "☁️",
  "Databases": "🗄️",
  "Tools & Testing": "🔧",
  "Soft Skills": "🤝",
  "Other": "📁"
};

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setError(null);
        const { data, error: supabaseError } = await supabase
          .from("skills")
          .select("*")
          .order("name", { ascending: true });
        if (supabaseError) {
          console.error("Failed to fetch skills:", supabaseError);
          setError("Failed to load skills");
          setSkills([]);
        } else if (data) {
          setSkills(data);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setError("An error occurred while loading skills");
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <motion.div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">Loading skills...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="text-center py-10">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Please try refreshing the page</p>
      </motion.div>
    );
  }

  if (skills.length === 0) {
    return (
      <motion.div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No skills found.</p>
      </motion.div>
    );
  }

  // Group skills by dynamically mapped harmonized categories
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const rawCategory = skill.category || "Other";
      const category = CATEGORY_MAP[rawCategory] || rawCategory;
      
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  // Pre-defined sort order matching the ideal layout
  const PREFERRED_ORDER = ["Languages", "Frameworks", "Cloud & DevOps", "Databases", "Tools & Testing", "Soft Skills", "Other"];
  
  const categories = Object.keys(skillsByCategory).sort((a, b) => {
    const indexA = PREFERRED_ORDER.indexOf(a);
    const indexB = PREFERRED_ORDER.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <motion.div
      className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {categories.map((category, categoryIdx) => {
        const categorySkills = skillsByCategory[category];
        const icon = CATEGORY_ICONS[category] || "📂";

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIdx * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-xl shadow-xl backdrop-blur-xl flex flex-col hover:shadow-2xl hover:border-blue-500/50 transition-all break-inside-avoid"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{icon}</span>
              <h3 className="text-xl font-bold text-gray-100">{category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categorySkills.map((skill, skillIdx) => (
                <motion.span
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIdx * 0.1 + skillIdx * 0.05 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
                  className="px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-slate-800 to-slate-900 text-blue-300 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-all flex items-center gap-2"
                >
                  {skill.icon_url && (
                    <img src={skill.icon_url} alt="" className="w-4 h-4 object-contain" />
                  )}
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
