import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import SkillBadge from "./SkillBadge";
import { motion } from "framer-motion";
import type { Skill } from "../../lib/types";

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("name", { ascending: true });
        if (!error && data) {
          setSkills(data);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
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

  if (skills.length === 0) {
    return (
      <motion.section className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">No skills found.</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="max-w-5xl mx-auto py-20 px-4 flex flex-wrap gap-3 justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {skills.map((skill) => (
        <SkillBadge key={skill.id} {...skill} />
      ))}
    </motion.section>
  );
}
