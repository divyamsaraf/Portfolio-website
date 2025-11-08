import { ReactNode, useEffect, useState } from "react";
import Navbar from "../nav/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors min-h-screen">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="transition-all">{children}</main>
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Divyam Saraf
      </footer>
    </div>
  );
}
