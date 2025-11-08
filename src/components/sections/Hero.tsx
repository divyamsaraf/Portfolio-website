import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data, error } = await supabase.from("hero").select("*").single();
        if (!error && data) {
          setHero(data);
        }
      } catch (err) {
        console.error("Failed to fetch hero:", err);
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

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {hero.title}
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {hero.subtitle}
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <a
          href={hero.cta_github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          GitHub
        </a>
        <a
          href={hero.cta_resume}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-lg border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Resume
        </a>
      </motion.div>
    </motion.section>
  );
}
