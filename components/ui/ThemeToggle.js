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

  "use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * ThemeToggle Component
 * Fixed logic for hydration stability and icon visibility.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState("day");
  const [mounted, setMounted] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("user-theme") || "day";
    setTheme(savedTheme);
    // Unified with layout.js head script
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "day" ? "night" : "day";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("user-theme", newTheme);
  };

  // Prevent hydration mismatch flicker
  if (!mounted) {
    return (
      <div className="fixed bottom-8 right-8 p-4 rounded-full w-14 h-14 bg-foreground/20 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 
                 bg-foreground text-background hover:scale-110 active:scale-95 
                 border border-border-eco backdrop-blur-md flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {theme === "day" ? (
        <Moon key="moon" className="w-6 h-6 animate-in fade-in zoom-in duration-300" />
      ) : (
        <Sun key="sun" className="w-6 h-6 animate-in fade-in zoom-in duration-300" />
      )}
    </button>
  );
}