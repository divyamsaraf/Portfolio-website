import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import type { Project } from "../../lib/types";

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const { data, error: supabaseError } = await supabase
          .from("projects")
          .select("*")
          .order("date", { ascending: false });
        if (supabaseError) {
          console.error("Failed to fetch projects:", supabaseError);
          setError("Failed to load projects");
          setProjects([]);
        } else if (data) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("An error occurred while loading projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <motion.section className="max-w-6xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading projects...</p>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section className="max-w-6xl mx-auto py-20 px-4 text-center">
        <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Please try refreshing the page</p>
      </motion.section>
    );
  }

  if (projects.length === 0) {
    return (
      <motion.section className="max-w-6xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">No projects found.</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="max-w-6xl mx-auto py-20 px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          className="group relative p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-2xl transition-all overflow-hidden"
          whileHover={{ scale: 1.05, y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />

          <div className="relative z-10">
            {project.screenshot && (
              <motion.div
                className="relative overflow-hidden rounded-md mb-4 h-40"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={project.screenshot}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{project.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">{project.description}</p>
            {project.long_description && (
              <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs line-clamp-2">{project.long_description}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack.map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.github_url && (
                <motion.a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold transition"
                  whileHover={{ x: 2 }}
                >
                  GitHub →
                </motion.a>
              )}
              {project.live_url && (
                <motion.a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-semibold transition"
                  whileHover={{ x: 2 }}
                >
                  Live Demo →
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
