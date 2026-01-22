"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("day");

  // Run ONCE when the app starts
  useEffect(() => {
    const savedTheme = localStorage.getItem("user-theme") || "day";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = (specificTheme) => {
    // If a specific theme (like dawn/dusk) is passed, use it, 
    // otherwise just toggle day/night.
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