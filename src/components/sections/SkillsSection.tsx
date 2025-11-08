import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import type { Skill } from "../../lib/types";

// Star rating component
const StarRating = ({ rating }: { rating?: number }) => {
  const stars = rating || 3;
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < stars ? "text-yellow-400" : "text-gray-600"}>
          ★
        </span>
      ))}
    </div>
  );
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

  return (
    <motion.section
      className="max-w-6xl mx-auto px-4 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {categories.map((category, categoryIdx) => {
        const categorySkills = skillsByCategory[category];

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIdx * 0.1 }}
          >
            {/* Category Header */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIdx * 0.1 }}
            >
              <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
              <h3 className="text-2xl font-bold text-gray-100">{category}</h3>
              <span className="text-sm text-gray-400 ml-2">
                ({categorySkills.length})
              </span>
            </motion.div>

            {/* Skills Grid - Always Visible */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIdx * 0.1 + 0.1 }}
            >
              {categorySkills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: skillIdx * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)" }}
                  className="p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-100 mb-2">
                        {skill.name}
                      </h4>
                      {skill.proficiency && (
                        <StarRating rating={skill.proficiency} />
                      )}
                    </div>
                    {skill.icon_url && (
                      <img
                        src={skill.icon_url}
                        alt={skill.name}
                        className="w-8 h-8 ml-2 flex-shrink-0"
                      />
                    )}
                  </div>
                  {skill.proficiency && (
                    <div className="text-xs text-gray-400 mt-2">
                      Proficiency: {skill.proficiency}/5
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
