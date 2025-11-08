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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setError(null);
        const { data, error: supabaseError } = await supabase.from("about").select("*").single();
        if (supabaseError) {
          console.warn("Failed to fetch about from Supabase, using defaults:", supabaseError);
          setAbout(DEFAULT_ABOUT);
        } else if (data) {
          setAbout(data);
        }
      } catch (err) {
        console.error("Failed to fetch about:", err);
        setError("Failed to load about section");
        setAbout(DEFAULT_ABOUT);
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

  if (error) {
    return (
      <motion.section className="max-w-3xl mx-auto py-20 px-4 text-center">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Showing default content</p>
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
