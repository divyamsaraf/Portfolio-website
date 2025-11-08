import { motion } from "framer-motion";
import ResumeSection from "../components/sections/ResumeSection";

export default function Resume() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <motion.section
        className="max-w-4xl mx-auto py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Download my resume or view it below
          </p>
        </motion.div>

        <ResumeSection />
      </motion.section>
    </main>
  );
}
