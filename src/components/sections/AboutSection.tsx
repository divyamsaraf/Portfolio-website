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
      <motion.div
        className="relative p-8 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border border-blue-100 dark:border-gray-700"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">About Me</h2>
        </motion.div>

        <motion.p
          className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {about.content}
        </motion.p>

        {/* Highlight stats or key points */}
        <motion.div
          className="mt-8 pt-8 border-t border-blue-200 dark:border-gray-700 grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">3+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Years Experience</p>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">10+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</p>
          </motion.div>
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">20+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Technologies</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
