import Link from "next/link";
import { motion } from "framer-motion";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800 fixed w-full z-50"
    >
      <Link href="/" className="text-2xl font-bold">
        Divyam
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/about" className="hover:text-blue-500 transition">
          About
        </Link>
        <Link href="/experience" className="hover:text-blue-500 transition">
          Experience
        </Link>
        <Link href="/skills" className="hover:text-blue-500 transition">
          Skills
        </Link>
        <Link href="/projects" className="hover:text-blue-500 transition">
          Projects
        </Link>
        <Link href="/resume" className="hover:text-blue-500 transition">
          Resume
        </Link>
        <Link href="/admin" className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          Admin
        </Link>
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
      </div>
    </motion.nav>
  );
}
