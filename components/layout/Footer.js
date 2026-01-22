"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentTheme, setCurrentTheme] = useState("day");

  useEffect(() => {
    // Sync with your ThemeToggle.js data-theme attribute
    const observer = new MutationObserver(() => {
      const theme = document.body.getAttribute("data-theme") || "day";
      setCurrentTheme(theme);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    // Initial check on mount
    setCurrentTheme(document.body.getAttribute("data-theme") || "day");

    return () => observer.disconnect();
  }, []);

  const isNight = currentTheme === "night";

  return (
    <footer 
      className={`w-full transition-all duration-300 pt-16 pb-8 border-t ${
        isNight 
          ? "bg-slate-950 border-slate-800 text-slate-400" 
          : "bg-white border-slate-100 text-slate-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column with Dynamic Logo */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="relative h-10 w-36 block">
              <Image
                src={isNight ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
                alt="EcoLens Logo"
                fill
                className={`object-contain transition-opacity duration-500 scale-800 object-center ${
                  isNight ? "mix-blend-screen" : "mix-blend-multiply"
                }`}
              />
            </Link>
            <p className={`max-w-sm leading-relaxed ${isNight ? "text-slate-400" : "text-slate-500"}`}>
              Empowering global citizens with real-time environmental data and
              sustainability metrics to visualize a cleaner future.
            </p>
          </div>

          {/* Data Sources */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-widest ${isNight ? "text-emerald-400" : "text-nature-950"}`}>
              Data Partners
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a href="https://openweathermap.org/" target="_blank" className="hover:text-emerald-500 transition-colors">
                  OpenWeather API
                </a>
              </li>
              <li>
                <a href="https://restcountries.com/" target="_blank" className="hover:text-emerald-500 transition-colors">
                  REST Countries
                </a>
              </li>
              <li>
                <a href="https://waqi.info/" target="_blank" className="hover:text-emerald-500 transition-colors">
                  World Air Quality Project
                </a>
              </li>
            </ul>
          </div>

          {/* System Links */}
          <div className="space-y-4">
            <h4 className={`text-sm font-bold uppercase tracking-widest ${isNight ? "text-emerald-400" : "text-nature-950"}`}>
              System
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/about" className="hover:text-emerald-500 transition-colors">
                  Score Methodology
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="https://github.com/DLGAquilon/eco-lens-country-sustainability-dashboard.git" className="hover:text-emerald-500 transition-colors">
                  Open Source Code
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest ${
          isNight ? "border-slate-800 text-slate-500" : "border-slate-50 text-slate-400"
        }`}>
          <p>© {currentYear} EcoLens Analytics. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built for the <span className="text-emerald-500">Planet</span> 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}