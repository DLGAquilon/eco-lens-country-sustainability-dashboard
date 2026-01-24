"use client";

/**
 * LandingClient Component
 *
 * This is the main client-side layout component for the homepage/landing page.
 * It orchestrates the complete user experience with a hero section and data explorer.
 *
 * Component Structure:
 * 1. Hero Section:
 *    - Full-screen background image (hero-earth.avif) with gradient overlay
 *    - Animated glow effects for visual impact
 *    - Badge showing "Tracking 250+ Jurisdictions"
 *    - Large headline: "The World's Eco-Pulse"
 *    - Subheading explaining real-time environmental analytics
 *    - "Start Exploring" button that scrolls to the explorer section
 *
 * 2. Global Analytics Section:
 *    - Contains the CountryList component for searching/filtering countries
 *    - Header with title and description
 *    - Smooth scroll target (id="explorer") for the CTA button
 *
 * Key Features:
 * - Mounted state check: Prevents hydration mismatch by only rendering image after mount
 * - Framer Motion animations: Hero content fades in and slides up on page load
 * - Smooth scroll behavior: "Start Exploring" button smoothly scrolls to the countries list
 * - Responsive design: Adapts typography and spacing from mobile to desktop
 * - Visual effects: Glow overlays, gradient overlays, drop shadows for depth
 *
 * Props:
 * @param {Array} countries - Array of country objects with sustainability data
 *
 * This component bridges the server-rendered data from the home page with client-side
 * interactivity, providing an engaging entry point to the EcoLens dashboard.
 */

import { motion } from "framer-motion";
import CountryList from "../countries/CountryList";
import Badge from "../ui/Badge";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function LandingClient({ countries }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToExplorer = () => {
    document.getElementById("explorer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-20 pb-20 w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 z-0">
          {mounted && (
            <Image
              src="/images/hero-earth.avif"
              alt="EcoLens Earth Hero"
              fill
              priority
              fetchPriority="high"
              className="object-cover scale-105 transition-opacity duration-700"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-background z-1" />
        </div>

        {/* GLOW EFFECTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-100 bg-nature-300/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-125 bg-white/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-8 relative z-10"
        >
          <div className="flex justify-center">
            <Badge
              className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.3)] 
              hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all duration-500 px-4 py-1.5 text-sm font-medium"
            >
              🌍 Tracking 250+ Jurisdictions
            </Badge>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tight leading-[0.9] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            The World’s{" "}
            <span className="text-emerald-400 italic drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]">
              Eco-Pulse.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Real-time environmental analytics and sustainability scores
            visualized for every nation on Earth.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button
              onClick={scrollToExplorer}
              className="bg-nature-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-nature-400 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-nature-900/40"
            >
              Start Exploring
            </button>
          </div>
        </motion.div>
      </section>

      {/* DATA EXPLORER SECTION */}
      <section
        id="explorer"
        className="max-w-7xl mx-auto px-6 w-full space-y-12 scroll-mt-24 relative z-10"
      >
        <div className="border-t border-slate-100 pt-20">
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-4xl font-display font-bold text-nature-950">
              Global Analytics
            </h2>
            <p className="text-slate-500 text-lg">
              Search, filter, and compare country environmental metrics.
            </p>
          </div>
          <CountryList allCountries={countries} />
        </div>
      </section>
    </div>
  );
}
