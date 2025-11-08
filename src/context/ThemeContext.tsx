import { createContext, useEffect, ReactNode } from "react";

export const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Always use dark mode
  const theme = "dark";

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // No-op toggle function (kept for compatibility)
  const toggleTheme = () => {
    // Dark mode only - no toggle
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
