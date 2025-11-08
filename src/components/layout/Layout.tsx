import { ReactNode, useEffect } from "react";
import Navbar from "../nav/Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <main className="transition-all">{children}</main>
      <footer className="text-center py-6 text-gray-400">
        © {new Date().getFullYear()} Divyam Saraf
      </footer>
    </div>
  );
}
