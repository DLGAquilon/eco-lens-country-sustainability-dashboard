"use client";

/**
 * ThemeToggle Component
 * 
 * A floating button (bottom-right corner) that allows users to manually toggle
 * between "day" and "night" themes throughout the application.
 * 
 * Features:
 * - Fixed position button (z-index: 50) that stays visible while scrolling
 * - Loads saved theme preference from localStorage on mount
 * - Shows Moon icon in day mode, Sun icon in night mode
 * - Updates document body data-theme attribute for CSS theming
 * - Persists theme preference across page reloads
 * - Hover scale animation (110%) and click feedback (90%)
 * 
 * Theme State:
 * - "day": Light theme (foreground/background colors from CSS variables)
 * - "night": Dark theme
 * 
 * Unlike LiveClock (which auto-detects time-of-day), this provides manual control
 * for users who prefer a specific theme regardless of local time.
 */

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