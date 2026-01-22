"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("day");

  // Load saved preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("user-theme") || "day";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "day" ? "night" : "day";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("user-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 
                 bg-[var(--foreground)] text-[var(--background)] hover:scale-110 active:scale-90 
                 border border-[var(--card-border)] backdrop-blur-md"
      aria-label="Toggle Theme"
    >
      {theme === "day" ? (
        <Moon className="w-6 h-6 transition-transform rotate-0" />
      ) : (
        <Sun className="w-6 h-6 transition-transform rotate-0" />
      )}
    </button>
  );
}