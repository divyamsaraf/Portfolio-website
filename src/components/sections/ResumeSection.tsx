import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import type { Resume } from "../../lib/types";

export default function ResumeSection() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data, error } = await supabase.from("resume").select("*").single();
        if (!error && data) {
          setResume(data);
        }
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  if (loading) {
    return (
      <motion.section className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="text-center py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Resume</h2>
      {resume?.file_url ? (
        <motion.a
          href={resume.file_url}
          download={resume.file_name}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Resume
        </motion.a>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Resume not uploaded yet.</p>
      )}
    </motion.section>
  );
}
