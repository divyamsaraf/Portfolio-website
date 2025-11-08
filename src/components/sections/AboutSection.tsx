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
      className="max-w-4xl mx-auto py-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <motion.div
        className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 shadow-2xl hover:shadow-blue-500/20 transition-all backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Premium decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 -z-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
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
          className="text-lg leading-relaxed text-gray-300 relative z-10 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {about.content}
        </motion.p>

        {/* Premium stats section */}
        <motion.div
          className="mt-12 pt-12 border-t border-blue-500/20 grid grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-500/50 transition-all"
            whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
          >
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">3+</p>
            <p className="text-sm text-gray-400 mt-2">Years Experience</p>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/50 transition-all"
            whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
          >
            <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">10+</p>
            <p className="text-sm text-gray-400 mt-2">Projects Completed</p>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(34, 211, 238, 0.3)" }}
          >
            <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">20+</p>
            <p className="text-sm text-gray-400 mt-2">Technologies</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
