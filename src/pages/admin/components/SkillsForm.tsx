import { useEffect, useState } from "react";
import axiosWithAuth from "../../../lib/axiosClient";
import { motion } from "framer-motion";
import type { Skill } from "../../../lib/types";

const emptySkill: Skill = {
  id: 0,
  name: "",
  category: "",
  icon_url: "",
  proficiency: 3,
};

export default function SkillsForm() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosWithAuth.get<Skill[]>("/api/admin/skills");
        if (data) {
          setSkills(data);
        }
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    setSkills([...skills, { ...emptySkill, id: Date.now() }]);
  };

  const handleDelete = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, field: keyof Skill, value: string | number) => {
    const updated = [...skills];
    updated[idx] = { ...updated[idx], [field]: value };
    setSkills(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axiosWithAuth.post("/api/admin/skills", { skills });
      alert("Skills updated successfully!");
    } catch (err) {
      console.error("Failed to save skills:", err);
      alert("Failed to save skills");
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
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills</h2>
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleChange(idx, "name", e.target.value)}
                  placeholder="e.g., React"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={skill.category || ""}
                  onChange={(e) => handleChange(idx, "category", e.target.value)}
                  placeholder="e.g., Frontend"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icon URL
              </label>
              <input
                type="url"
                value={skill.icon_url || ""}
                onChange={(e) => handleChange(idx, "icon_url", e.target.value)}
                placeholder="https://example.com/icon.png"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Proficiency (1-5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={skill.proficiency || 3}
                onChange={(e) => handleChange(idx, "proficiency", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={() => handleDelete(idx)}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          Add Skill
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          {saving ? "Saving..." : "Save All"}
        </button>
      </div>
    </motion.div>
  );
}
