"use client";

/**
 * ScoreGauge Component
 * 
 * This component displays a country's sustainability/eco-score as an animated circular
 * progress gauge. It provides a visually striking, at-a-glance indicator of environmental
 * performance and is prominently featured on country detail pages.
 * 
 * Props:
 * @param {Number} score - Eco-Score value from 0-100 representing sustainability performance
 * 
 * Visual Design:
 * - Circular SVG gauge with animated stroke-dash progression
 * - Background circle (light gray) shows the full 100% scale
 * - Foreground circle animates from 0% to the actual score percentage
 * - Center text displays the numeric score (0-100)
 * - Status text below score ("High", "Moderate", or "Low")
 * 
 * Score Performance Color Mapping:
 * - 80-100: Emerald-500 (#10b981) - Excellent/High performance
 * - 60-79: Lime-500 (#84cc16) - Good performance
 * - 40-59: Amber-500 (#f59e0b) - Moderate performance
 * - 0-39: Red-500 (#ef4444) - Poor/Low performance
 * 
 * Status Labels:
 * - "High": score >= 70 (green, good)
 * - "Moderate": score >= 40 (orange, acceptable)
 * - "Low": score < 40 (red, poor)
 * 
 * Animation Details:
 * - SVG Circle Animation:
 *   * Uses stroke-dasharray and stroke-dashoffset for circular progress
 *   * Animates from 0% filled to the actual score percentage
 *   * Duration: 2 seconds with easeOut timing
 *   * Rounded line caps for smooth appearance
 * - Number Animation:
 *   * Score number fades in and scales from 0.5x to 1x
 *   * Synchronized with circle animation
 * - Color Animation:
 *   * Background glow color smoothly transitions when score changes
 * 
 * Visual Effects:
 * - Blur glow effect behind gauge (opacity 20%) using the score color
 * - Smooth color transitions (1000ms duration) when score changes
 * - Rotated -90 degrees to start gauge at top (12 o'clock position)
 * 
 * Usage Context:
 * - Displayed on country detail pages in the hero section
 * - Positioned to the right of country identity information
 * - Large prominent size (w-48 h-48) for maximum visual impact
 * - Serves as the primary indicator of a country's sustainability ranking
 * 
 * The ScoreGauge provides immediate visual feedback about a country's environmental
 * performance, allowing users to quickly understand sustainability levels at a glance.
 */

import { motion } from "framer-motion";

export default function ScoreGauge({ score }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  
  // Color mapping based on score performance
  const getColor = (s) => {
    if (s >= 80) return "#10b981"; // Emerald-500 (Excellent)
    if (s >= 60) return "#84cc16"; // Lime-500 (Good)
    if (s >= 40) return "#f59e0b"; // Amber-500 (Moderate)
    return "#ef4444"; // Red-500 (Poor)
  };

  const statusText = score >= 70 ? "High" : score >= 40 ? "Moderate" : "Low";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div 
        className="absolute w-32 h-32 blur-[50px] opacity-20 -z-10 transition-colors duration-1000"
        style={{ backgroundColor: getColor(score) }}
      />

      <svg className="w-48 h-48 transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-slate-100"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          stroke={getColor(score)}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Text Labels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-black text-nature-950 leading-none"
        >
          {score}
        </motion.span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
          {statusText}
        </span >
      </div>
    </div>
  );
}