import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import type { Project } from "../../lib/types";

// Fallback projects data
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "RetailOps Pro",
    slug: "retailops-pro",
    description: "Inventory & order management platform.",
    long_description: "Built microservices for inventory, orders and invoices.",
    tech_stack: ["Java", "Spring Boot", "AWS", "React"],
    tags: ["Full Stack"],
    github_url: "https://github.com/divyamsaraf",
    live_url: "",
    screenshot: "",
    featured: true,
    date: "2023-06-15",
  },
  {
    id: 2,
    title: "LYKAS Chat",
    slug: "lykas-chat",
    description: "Real-time chat for advisory platform.",
    long_description: "Real-time messaging with WebSocket support.",
    tech_stack: ["Python", "Django", "Vue"],
    tags: ["Realtime"],
    github_url: "https://github.com/divyamsaraf",
    live_url: "",
    screenshot: "",
    featured: false,
    date: "2023-01-10",
  },
];

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from("projects")
          .select("*")
          .order("date", { ascending: false });

        if (supabaseError) {
          console.warn("Failed to fetch projects from Supabase:", supabaseError);
          console.log("Using fallback projects data");
          setProjects(FALLBACK_PROJECTS);
        } else if (data && data.length > 0) {
          setProjects(data);
        } else {
          console.log("No projects found in Supabase, using fallback data");
          setProjects(FALLBACK_PROJECTS);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        console.log("Using fallback projects data due to error");
        setProjects(FALLBACK_PROJECTS);
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

  if (projects.length === 0) {
    return (
      <motion.section className="max-w-6xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">No projects found.</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="max-w-6xl mx-auto py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Featured Projects
      </motion.h2>

      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
      >
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          className="group relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden backdrop-blur-xl"
          whileHover={{ scale: 1.08, y: -12 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          {/* Premium gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
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
            <h3 className="font-bold text-xl mb-2 text-gray-100 dark:text-white group-hover:text-blue-300 dark:group-hover:text-blue-300 transition">{project.title}</h3>
            <p className="text-gray-300 dark:text-gray-200 mb-3 text-sm">{project.description}</p>
            {project.long_description && (
              <p className="text-gray-400 dark:text-gray-300 mb-3 text-xs line-clamp-2">{project.long_description}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack && Array.isArray(project.tech_stack) && project.tech_stack.map((tech, idx) => (
                <motion.span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/30 hover:border-blue-500/60 transition-all"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }}
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
                  className="text-blue-300 dark:text-blue-300 hover:text-blue-200 dark:hover:text-blue-200 text-sm font-semibold transition"
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
                  className="text-cyan-300 dark:text-cyan-300 hover:text-cyan-200 dark:hover:text-cyan-200 text-sm font-semibold transition"
                  whileHover={{ x: 2 }}
                >
                  Live Demo →
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      </motion.div>
    </motion.section>
  );
}
