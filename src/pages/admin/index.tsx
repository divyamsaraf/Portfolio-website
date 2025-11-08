import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import type { User } from "../../lib/types";
import HeroForm from "./components/HeroForm";
import AboutForm from "./components/AboutForm";
import ExperienceForm from "./components/ExperienceForm";
import SkillsForm from "./components/SkillsForm";
import ProjectsForm from "./components/ProjectsForm";
import ResumeForm from "./components/ResumeForm";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user as User);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tabs = [
    { id: "hero", label: "Hero", icon: "🎯" },
    { id: "about", label: "About", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "skills", label: "Skills", icon: "🛠️" },
    { id: "projects", label: "Projects", icon: "📁" },
    { id: "resume", label: "Resume", icon: "📄" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header
        className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your portfolio content</p>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
            <motion.button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Tabs */}
      <motion.div
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab, idx) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 font-semibold transition whitespace-nowrap relative group ${
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <span className="text-lg mr-2">{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.main
        className="max-w-7xl mx-auto px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "hero" && <HeroForm />}
        {activeTab === "about" && <AboutForm />}
        {activeTab === "experience" && <ExperienceForm />}
        {activeTab === "skills" && <SkillsForm />}
        {activeTab === "projects" && <ProjectsForm />}
        {activeTab === "resume" && <ResumeForm />}
      </motion.main>
    </div>
  );
}
