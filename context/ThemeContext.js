"use client";

/**
 * ThemeContext & ThemeProvider
 * 
 * This context manages the global theme state for the EcoLens application, allowing users
 * to toggle between "day" and "night" modes throughout the entire application.
 * 
 * ThemeProvider Component:
 * - Initializes theme state with "day" as the default
 * - On mount, retrieves the saved theme preference from localStorage (key: "user-theme")
 * - Sets the data-theme attribute on the document root element to enable CSS-based theming
 * 
 * toggleTheme Function:
 * - Accepts an optional specificTheme parameter for programmatic theme changes
 * - If no specific theme is provided, toggles between "day" and "night"
 * - Updates the React state, localStorage persistence, and DOM data-attribute
 * - Allows components to trigger theme changes with or without forcing a specific theme
 * 
 * useTheme Hook:
 * - Custom hook that provides access to the context from any child component
 * - Returns an object with { theme, toggleTheme } for reading and updating theme state
 * 
 * Key Features:
 * - Persistent theme selection: User's preference is saved in localStorage
 * - CSS integration: The data-theme attribute allows Tailwind to apply theme-specific styles
 * - Global context: All components can access and modify theme without prop drilling
 * 
 * Usage: Wrap your app with <ThemeProvider> at the root, then use useTheme() in any component
 */

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    const savedTheme = localStorage.getItem("user-theme") || "day";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = (specificTheme) => {
    const nextTheme = specificTheme || (theme === "day" ? "night" : "day");
    
    setTheme(nextTheme);
    localStorage.setItem("user-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);