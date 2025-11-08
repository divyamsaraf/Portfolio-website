import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import SkillBadge from "./SkillBadge";
import { motion, AnimatePresence } from "framer-motion";
import type { Skill } from "../../lib/types";

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

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
      <motion.section className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading skills...</p>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Please try refreshing the page</p>
      </motion.section>
    );
  }

  if (skills.length === 0) {
    return (
      <motion.section className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">No skills found.</p>
      </motion.section>
    );
  }

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  const categories = Object.keys(skillsByCategory).sort();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <motion.section
      className="max-w-5xl mx-auto px-4 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {categories.map((category, categoryIdx) => {
        const isExpanded = expandedCategories.has(category);
        const categorySkills = skillsByCategory[category];

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIdx * 0.05 }}
            className="border border-gray-700/50 dark:border-gray-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition-colors"
          >
            {/* Category Header - Collapsible */}
            <motion.button
              onClick={() => toggleCategory(category)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all"
              whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.3)" }}
            >
              <div className="flex items-center gap-3">
                <span className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                <h3 className="text-lg font-bold text-gray-100">
                  {category}
                </h3>
                <span className="text-sm text-gray-400 ml-2">
                  ({categorySkills.length})
                </span>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400"
              >
                ▼
              </motion.div>
            </motion.button>

            {/* Category Content - Collapsible */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 bg-gray-900/30 border-t border-gray-700/50"
                >
                  <motion.div
                    className="flex flex-wrap gap-3 justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {categorySkills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIdx * 0.03 }}
                      >
                        <SkillBadge {...skill} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
