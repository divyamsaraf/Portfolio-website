import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";
import SocialLinks from "../SocialLinks";
import { NAV_ITEMS } from "../../constants";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = NAV_ITEMS;

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const elementId = href.substring(2);
      // If we're on the home page, just scroll to the element
      if (router.pathname === "/") {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If we're on a different page, navigate to home with the hash
        router.push(`/?section=${elementId}`).then(() => {
          // After navigation, scroll to the element
          setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800 fixed w-full z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Divyam Saraf
        </Link>
      </motion.div>

      {/* Desktop Menu */}
      <motion.div
        className="hidden md:flex items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navItems.map((item) => (
          <motion.div key={item.href} variants={itemVariants}>
            {item.href.startsWith("/#") ? (
              <button
                onClick={() => handleNavClick(item.href)}
                className="relative group flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium cursor-pointer bg-none border-none"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </button>
            ) : (
              <Link
                href={item.href}
                className="relative group flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
              </Link>
            )}
          </motion.div>
        ))}

        <motion.div variants={itemVariants} className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-700">
          <SocialLinks size="md" />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link
            href="/admin"
            className="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition font-semibold"
          >
            Admin
          </Link>
        </motion.div>

        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="ml-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
      </motion.div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </motion.button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            item.href.startsWith("/#") ? (
              <button
                key={item.href}
                onClick={() => {
                  handleNavClick(item.href);
                  setIsOpen(false);
                }}
                className="px-4 py-2 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-left bg-none border-none cursor-pointer"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            )
          ))}
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition font-semibold"
          >
            Admin
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
