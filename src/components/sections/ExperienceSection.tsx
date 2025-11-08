import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ExperienceCard from "./ExperienceCard";
import { motion } from "framer-motion";
import type { Experience } from "../../lib/types";

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from("experience")
          .select("*")
          .order("start_date", { ascending: false });
        if (!error && data) {
          setExperiences(data);
        }
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <motion.section className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading experiences...</p>
      </motion.section>
    );
  }

  if (experiences.length === 0) {
    return (
      <motion.section className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">No experiences found.</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="max-w-5xl mx-auto py-20 px-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} {...exp} />
      ))}
    </motion.section>
  );
}
