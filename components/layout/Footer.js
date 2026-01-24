"use client";

/**
 * Footer Component
 *
 * This component renders the application footer, providing key information about EcoLens
 * and navigation links to important resources, data partners, and policies.
 *
 * Theme Awareness:
 * - Uses MutationObserver to detect real-time changes to the document's data-theme attribute
 * - Applies different styles for "day" and "night" modes
 * - Switches between light and dark logo images based on current theme
 * - Uses blend modes (mix-blend-screen for dark, mix-blend-multiply for light) for logo integration
 *
 * Layout Structure:
 * - Brand Column (2 columns on desktop): Displays EcoLens logo and mission statement
 * - Data Partners Column: Links to OpenWeather API, REST Countries, and World Air Quality Project
 * - System Links Column: Navigation to About/Score Methodology, Privacy Policy, and GitHub repo
 * - Bottom Bar: Copyright notice and "Built for the Planet" tagline
 *
 * Key Features:
 * - Responsive grid that adapts from 1 column (mobile) to 4 columns (desktop)
 * - Dynamic year in copyright notice using currentYear state
 * - External links to data partners and GitHub open-source repository
 * - Hover effects on all links (color transitions to emerald-500)
 * - Theme-aware styling with conditional colors and borders
 *
 * This footer serves as both informational and navigational, helping users discover
 * data sources, understand methodology, access privacy information, and find the open-source code.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentTheme, setCurrentTheme] = useState("day");

  useEffect(() => {
    // Select the correct target (documentElement matches your ThemeToggle)
    const targetNode = document.documentElement;

    const observer = new MutationObserver(() => {
      const theme = targetNode.getAttribute("data-theme") || "day";
      setCurrentTheme(theme);
    });

    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Set initial state correctly
    setCurrentTheme(targetNode.getAttribute("data-theme") || "day");

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
          {/* Brand Column */}
          <div className="md:col-span-2 relative flex flex-col items-start justify-end min-h-[200px] overflow-hidden">
            {/* LOGO */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <Link href="/" className="relative block h-full w-full">
                <Image
                  src={isNight ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
                  alt="EcoLens Logo"
                  fill
                  className={`object-contain object-left -mt-10 -mx-2 transition-all duration-700 hover:scale-110 ${
                    isNight ? "mix-blend-screen" : "mix-blend-multiply"
                  }`}
                  priority
                />
              </Link>
            </div>

            {/* Short Desc about EcoLens*/}
            <div className="relative z-10 p-2">
              <p
                className={`max-w-sm leading-relaxed text-left tracking-tight text-md md:text-lg ${
                  isNight ? "text-white" : "text-slate-500"
                }`}
              >
                Empowering global citizens with real-time environmental data and
                sustainability metrics to visualize a cleaner future.
              </p>
            </div>
          </div>

          {/* Data Sources */}
          <div className="space-y-4">
            <h4
              className={`text-sm font-bold uppercase tracking-widest ${isNight ? "text-emerald-400" : "text-nature-950"}`}
            >
              Data Partners
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a
                  href="https://openweathermap.org/"
                  target="_blank"
                  className="hover:text-emerald-500 transition-colors"
                >
                  OpenWeather API
                </a>
              </li>
              <li>
                <a
                  href="https://restcountries.com/"
                  target="_blank"
                  className="hover:text-emerald-500 transition-colors"
                >
                  REST Countries
                </a>
              </li>
              <li>
                <a
                  href="https://waqi.info/"
                  target="_blank"
                  className="hover:text-emerald-500 transition-colors"
                >
                  World Air Quality Project
                </a>
              </li>
            </ul>
          </div>

          {/* System Links */}
          <div className="space-y-4">
            <h4
              className={`text-sm font-bold uppercase tracking-widest ${isNight ? "text-emerald-400" : "text-nature-950"}`}
            >
              System
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Score Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/DLGAquilon/eco-lens-country-sustainability-dashboard.git"
                  className="hover:text-emerald-500 transition-colors"
                >
                  Open Source Code
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest ${
            isNight
              ? "border-slate-800 text-slate-500"
              : "border-slate-50 text-slate-400"
          }`}
        >
          <p>© {currentYear} EcoLens by Vin Belandres. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built for the <span className="text-emerald-500">Planet</span> 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
