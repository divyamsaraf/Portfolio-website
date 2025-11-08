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
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-lg transition"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {project.screenshot && (
            <img
              src={project.screenshot}
              alt={project.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{project.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">{project.description}</p>
          {project.long_description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs">{project.long_description}</p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
              >
                GitHub
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:underline text-sm font-semibold"
              >
                Live Demo
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
