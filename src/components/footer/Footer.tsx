import { motion } from "framer-motion";
import SocialLinks from "../SocialLinks";
import { SITE_NAME } from "../../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-t border-gray-200 dark:border-gray-700 mt-20 py-12 bg-white dark:bg-gray-800 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {SITE_NAME}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Building scalable web applications and solving complex problems.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/#projects" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="/resume" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
            <SocialLinks size="md" />
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <p>© {currentYear} {SITE_NAME}. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Designed & built with{" "}
              <span className="text-red-500">❤️</span> using Next.js, React & TailwindCSS
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
