import { useEffect, useState } from "react";
import axiosWithAuth from "../../../lib/axiosClient";
import { motion } from "framer-motion";
import type { Hero } from "../../../lib/types";

export default function HeroForm() {
  const [hero, setHero] = useState<Hero>({
    title: "",
    subtitle: "",
    cta_github: "",
    cta_resume: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosWithAuth.get<Hero>("/api/admin/hero");
        if (data) {
          setHero(data);
        }
      } catch (err) {
        console.error("Failed to fetch hero:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field: keyof Hero, value: string) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axiosWithAuth.post("/api/admin/hero", hero);
      alert("Hero section updated successfully!");
    } catch (err) {
      console.error("Failed to save hero:", err);
      alert("Failed to save hero section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Hero Section</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={hero.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Your name or headline"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subtitle
        </label>
        <textarea
          value={hero.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          placeholder="Your tagline or description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          GitHub URL
        </label>
        <input
          type="url"
          value={hero.cta_github}
          onChange={(e) => handleChange("cta_github", e.target.value)}
          placeholder="https://github.com/yourname"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Resume URL
        </label>
        <input
          type="url"
          value={hero.cta_resume}
          onChange={(e) => handleChange("cta_resume", e.target.value)}
          placeholder="https://example.com/resume.pdf"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-md transition"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </motion.div>
  );
}
