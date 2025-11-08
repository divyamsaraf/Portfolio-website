import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import type { About } from "../../../lib/types";

export default function AboutForm() {
  const [about, setAbout] = useState<About>({ content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<About>("/api/admin/about");
        if (data) {
          setAbout(data);
        }
      } catch (err) {
        console.error("Failed to fetch about:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post("/api/admin/about", about);
      alert("About section updated successfully!");
    } catch (err) {
      console.error("Failed to save about:", err);
      alert("Failed to save about section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">About Section</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          About Content
        </label>
        <textarea
          value={about.content}
          onChange={(e) => setAbout({ ...about, content: e.target.value })}
          placeholder="Write about yourself..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-md transition"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </motion.div>
  );
}
