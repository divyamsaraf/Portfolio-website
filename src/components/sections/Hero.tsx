import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import SocialLinks from "../SocialLinks";
import type { Hero as HeroType } from "../../lib/types";

const DEFAULT_ROLES = [
  "Full Stack Developer",
  "Backend Engineer",
  "Software Architect",
  "Cloud Engineer",
  "DevOps Specialist",
  "Open to SDE Roles (STEM OPT)",
];

const DEFAULT_COLLABORATION_ROLES = [
  "Open Source Contribution",
  "Collaboration Projects",
  "Technical Mentoring",
];

const DEFAULT_HERO: HeroType = {
  title: "Divyam Saraf",
  subtitle: "Building scalable, maintainable systems with Java, Python, and modern React stacks. Open to SDE roles (STEM OPT).",
  roles: DEFAULT_ROLES,
  collaboration_roles: DEFAULT_COLLABORATION_ROLES,
  cta_github: "https://github.com/divyamsaraf",
  cta_resume: "https://example.com/resume.pdf",
};

export default function Hero() {
  const [hero, setHero] = useState<HeroType>(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Get roles from hero data, ensuring it's an array
  const roles = Array.isArray(hero?.roles) && hero.roles.length > 0
    ? hero.roles
    : DEFAULT_ROLES;

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

  // Rotate roles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

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
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Premium animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"
        animate={{ y: [0, -30, 0], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10">
        {/* Main Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {hero.title}
        </motion.h1>

        {/* Rotating Roles with Premium Styling */}
        <motion.div
          className="h-16 md:h-20 flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            key={currentRoleIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            {roles[currentRoleIndex]}
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* Collaboration Roles */}
        {hero.collaboration_roles && hero.collaboration_roles.length > 0 && (
          <motion.div
            className="mb-12 flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {hero.collaboration_roles.map((role, idx) => (
              <motion.span
                key={idx}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.6)" }}
              >
                ✨ {role}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.a
            href={hero.cta_github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold hover:shadow-2xl transition-all backdrop-blur-sm border border-blue-400/30"
          >
            ✨ GitHub
          </motion.a>
          <motion.a
            href={hero.cta_resume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-xl border-2 border-purple-500/50 text-white font-bold hover:bg-purple-500/10 transition-all backdrop-blur-sm"
          >
            📄 Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-sm text-gray-400 mb-6 font-medium tracking-widest uppercase">Connect with me</p>
          <SocialLinks size="lg" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-400 text-2xl">↓</div>
        </motion.div>
      </div>
    </motion.section>
  );
}
