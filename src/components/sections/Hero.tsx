import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import SocialLinks from "../SocialLinks";
import type { Hero as HeroType } from "../../lib/types";

const DEFAULT_HERO: HeroType = {
  title: "Divyam Saraf",
  subtitle: "Building scalable, maintainable systems with Java, Python, and modern React stacks. Open to SDE roles (STEM OPT).",
  cta_github: "https://github.com",
  cta_resume: "#",
};

export default function Hero() {
  const [hero, setHero] = useState<HeroType>(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setError(null);
        const { data, error: supabaseError } = await supabase.from("hero").select("*").single();
        if (supabaseError) {
          console.warn("Failed to fetch hero from Supabase, using defaults:", supabaseError);
          setHero(DEFAULT_HERO);
        } else if (data) {
          setHero(data);
        }
      } catch (err) {
        console.error("Failed to fetch hero:", err);
        setError("Failed to load hero section");
        setHero(DEFAULT_HERO);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  if (loading) {
    return (
      <motion.section
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section
        className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <p className="text-gray-500 dark:text-gray-400">Showing default content</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      <div className="relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {hero.title}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {hero.subtitle}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.a
            href={hero.cta_github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
          >
            GitHub
          </motion.a>
          <motion.a
            href={hero.cta_resume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Connect with me</p>
          <SocialLinks size="lg" />
        </motion.div>
      </div>
    </motion.section>
  );
}
