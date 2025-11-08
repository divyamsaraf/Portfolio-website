import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";
import type { Project } from "../../lib/types";

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single();
        if (!error && data) {
          setProject(data);
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Project not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.section
        className="max-w-4xl mx-auto py-20 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {project.screenshot && (
          <img
            src={project.screenshot}
            alt={project.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>
        {project.long_description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {project.long_description}
          </p>
        )}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:opacity-90 transition"
            >
              View on GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </motion.section>
    </main>
  );
}
