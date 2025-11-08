import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import type { Experience } from "../../../lib/types";

const emptyExperience: Experience = {
  id: 0,
  company: "",
  role: "",
  start_date: "",
  end_date: "",
  description: "",
  bullets: [],
  tech: [],
  location: "",
};

export default function ExperienceForm() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<Experience[]>("/api/admin/experience");
        if (data) {
          setExperiences(data);
        }
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    setExperiences([...experiences, { ...emptyExperience, id: Date.now() }]);
  };

  const handleDelete = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post("/api/admin/experience", { experiences });
      alert("Experience updated successfully!");
    } catch (err) {
      console.error("Failed to save experiences:", err);
      alert("Failed to save experiences");
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
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(idx, "company", e.target.value)}
                  placeholder="Company name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleChange(idx, "role", e.target.value)}
                  placeholder="Job title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  value={exp.start_date}
                  onChange={(e) => handleChange(idx, "start_date", e.target.value)}
                  placeholder="Jan 2020"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  value={exp.end_date || ""}
                  onChange={(e) => handleChange(idx, "end_date", e.target.value)}
                  placeholder="Present"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="Job description"
                rows={2}
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
          Add Experience
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
