import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import type { About } from "../../lib/types";

const DEFAULT_ABOUT: About = {
  content: "I'm a passionate full-stack engineer with expertise in building scalable systems and modern web applications.",
};

export default function AboutSection() {
  const [about, setAbout] = useState<About>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data, error } = await supabase.from("about").select("*").single();
        if (!error && data) {
          setAbout(data);
        }
      } catch (err) {
        console.error("Failed to fetch about:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <motion.section className="max-w-3xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="max-w-3xl mx-auto py-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h2>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{about.content}</p>
    </motion.section>
  );
}
