import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import SkillBadge from "./SkillBadge";
import { motion } from "framer-motion";
import type { Skill } from "../../lib/types";

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
      className="max-w-5xl mx-auto py-20 px-4 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {categories.map((category, categoryIdx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: categoryIdx * 0.1 }}
        >
          <motion.h3
            className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: categoryIdx * 0.1 + 0.1 }}
          >
            <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
            {category}
          </motion.h3>
          <motion.div
            className="flex flex-wrap gap-4 justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIdx * 0.1 + 0.2 }}
          >
            {skillsByCategory[category].map((skill, skillIdx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIdx * 0.1 + 0.2 + skillIdx * 0.05 }}
              >
                <SkillBadge {...skill} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.section>
  );
}
