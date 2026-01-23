"use client";

/**
 * CountryCard Component
 * 
 * This component renders an individual country card for display in the dashboard grid.
 * Each card provides a quick overview of a country's key information and serves as
 * a clickable entry point to view detailed sustainability analytics.
 * 
 * Card Layout:
 * 1. Flag Section (top):
 *    - Large country flag image as visual identifier
 *    - Region badge in top-right corner (different colors for Europe vs others)
 *    - Scales up on hover for visual feedback
 * 
 * 2. Content Section (below flag):
 *    - Country Name: Bold title (truncated if too long)
 *    - Capital City: With location emoji and fallback text
 *    - Data Grid (2 columns):
 *      * Population: Formatted number (e.g., 1,234,567)
 *      * Eco-Risk: Status indicator (currently static "Low")
 *    - View Analytics Button: Links to detailed country page
 * 
 * Props:
 * @param {Object} country - Country data object containing name, flag, capital, region, population
 * 
 * Animations:
 * - Framer Motion entrance: Fades in and scales from 95% on scroll into view
 * - Hover effect: Card lifts up (-translate-y-2) with enhanced shadow
 * - Flag zoom: Image scales 105% on hover
 * - Smooth transitions: All animations use 500ms duration for consistency
 * 
 * Styling:
 * - Glass-morphism card design with backdrop blur
 * - Nature-themed color palette (emerald, nature-950)
 * - Responsive grid layout
 * - Border transitions on hover for visual emphasis
 * 
 * Navigation:
 * - "View Analytics" button links to `/country/[country-name]` dynamic route
 * - Country name is URL-encoded to handle special characters
 * - Button spans full width for easy tapping on mobile
 * 
 * This card is the primary UI element for the countries list on the dashboard,
 * enabling users to discover and navigate to individual country sustainability data.
 */

import { formatNumber } from "@/lib/utils";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CountryCard({ country }) {
  const { name, flag, capital, region, population } = country;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="glass-card group overflow-hidden flex flex-col h-full cursor-pointer 
           transition-all duration-500 ease-out 
           hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(46,124,103,0.15)] 
           hover:border-nature-500/30"
      >
        {/* Flag Section */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={flag}
            alt={`${name} flag`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={region === "Europe" ? "default" : "accent"}>
              {region}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col grow">
          <div className="mb-4">
            <h3 className="font-display font-bold text-xl text-nature-950 truncate">
              {name}
            </h3>
            <p className="text-slate-500 text-sm flex items-center gap-1">
              <span className="opacity-70">📍</span> {capital || "No Capital"}
            </p>
          </div>

          {/* Data Points */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-nature-500/5 mb-5">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                Population
              </p>
              <p className="font-semibold text-nature-900">
                {formatNumber(population)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                Eco-Risk
              </p>
              <p className="font-semibold text-emerald-600">Low</p>
            </div>
          </div>

          {/* Action */}
          <div className="mt-auto">
            <Link href={`/country/${encodeURIComponent(country.name)}`}>
              <Button className="w-full justify-center text-xs py-2">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
