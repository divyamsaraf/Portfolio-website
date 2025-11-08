import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import type { Project } from "../../../lib/types";

const emptyProject: Project = {
  id: 0,
  title: "",
  slug: "",
  description: "",
  long_description: "",
  tech_stack: [],
  tags: [],
  github_url: "",
  live_url: "",
  screenshot: "",
  featured: false,
  date: new Date().toISOString().split("T")[0],
};

export default function ProjectsForm() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<Project[]>("/api/admin/projects");
        if (data) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    setProjects([...projects, { ...emptyProject, id: Date.now() }]);
  };

  const handleDelete = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, field: keyof Project, value: any) => {
    const updated = [...projects];
    updated[idx] = { ...updated[idx], [field]: value };
    setProjects(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post("/api/admin/projects", { projects });
      alert("Projects updated successfully!");
    } catch (err) {
      console.error("Failed to save projects:", err);
      alert("Failed to save projects");
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
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h2>
      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                  placeholder="Project title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={proj.slug}
                  onChange={(e) => handleChange(idx, "slug", e.target.value)}
                  placeholder="project-slug"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={proj.description}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
                placeholder="Short description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Long Description
              </label>
              <textarea
                value={proj.long_description || ""}
                onChange={(e) => handleChange(idx, "long_description", e.target.value)}
                placeholder="Detailed description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={proj.github_url || ""}
                  onChange={(e) => handleChange(idx, "github_url", e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={proj.live_url || ""}
                  onChange={(e) => handleChange(idx, "live_url", e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                value={proj.tech_stack.join(", ")}
                onChange={(e) =>
                  handleChange(
                    idx,
                    "tech_stack",
                    e.target.value.split(",").map((t) => t.trim())
                  )
                }
                placeholder="React, Node.js, PostgreSQL"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Screenshot URL
              </label>
              <input
                type="url"
                value={proj.screenshot || ""}
                onChange={(e) => handleChange(idx, "screenshot", e.target.value)}
                placeholder="https://example.com/screenshot.png"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={proj.featured || false}
                onChange={(e) => handleChange(idx, "featured", e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
            </label>
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
          Add Project
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
