import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import type { Resume } from "../../lib/types";

// Helper function to extract Google Drive file ID from URL
function extractGoogleDriveId(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : "";
}

export default function ResumeSection() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setError(null);
        const { data, error: supabaseError } = await supabase.from("resume").select("*").single();
        if (supabaseError) {
          console.warn("Failed to fetch resume:", supabaseError);
          setError("Resume not available");
        } else if (data) {
          setResume(data);
        }
      } catch (err) {
        console.error("Failed to fetch resume:", err);
        setError("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading resume...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {resume?.file_url ? (
        <>
          {/* Download Section */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              href={resume.file_url}
              download={resume.file_name || "resume.pdf"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </motion.a>

            <motion.a
              href={resume.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Online
            </motion.a>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {resume.file_url.includes('drive.google.com') ? (
              // Google Drive PDF
              <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                <iframe
                  src={`https://drive.google.com/file/d/${extractGoogleDriveId(resume.file_url)}/preview`}
                  className="w-full h-full"
                  allow="autoplay"
                  title="Resume Preview"
                />
              </div>
            ) : resume.file_url.endsWith('.pdf') ? (
              // Direct PDF file
              <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                <iframe
                  src={`${resume.file_url}#toolbar=0`}
                  className="w-full h-full"
                  title="Resume Preview"
                />
              </div>
            ) : (
              // Fallback
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-400">PDF Preview</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{resume.file_name || "resume.pdf"}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="text-center text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>Last updated: {resume.uploaded_at ? new Date(resume.uploaded_at).toLocaleDateString() : "Recently"}</p>
          </motion.div>
        </>
      ) : (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 text-lg">{error || "Resume not available yet"}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Please check back soon or contact me directly</p>
        </motion.div>
      )}
    </motion.div>
  );
}
