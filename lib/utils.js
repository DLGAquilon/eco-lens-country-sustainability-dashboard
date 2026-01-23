/**
 * Utility Functions Module
 * 
 * Central hub for reusable helper functions used across EcoLens.
 * 
 * EXPORTS:
 * • cn() - Merges Tailwind CSS classes (removes conflicts)
 * • formatNumber() - Converts numbers to compact format (1.2M, 5K)
 * • getEcoColor() - Returns Tailwind color class for eco-scores (unused)
 * • calculateEcoScore() - Computes 15-98 sustainability score based on:
 *   - Regional environmental baseline
 *   - Population density penalties
 *   - Deterministic variance for diversity
 * 
 * USAGE LOCATIONS:
 * ✓ calculateEcoScore: app/page.js, rankings/page.js, country/[id]/page.js
 * ✓ formatNumber: CountryCard.js (population display)
 * ✓ cn: Input.js, Skeleton.js (class merging)
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function getEcoColor(score) {
  if (score <= 1) return "text-emerald-500"; // Good
  if (score <= 3) return "text-nature-accent"; // Moderate
  return "text-red-500"; // Poor
}

export function calculateEcoScore(country) {
  const { population, area, region } = country;
  
  // 1. Density Calculation (People per sq km)
  const density = area > 0 ? population / area : 0;
  
  // 2. Baseline by Region (Standard environmental policy trends)
  const regionalBaselines = {
    Europe: 75,
    Americas: 65,
    Asia: 55,
    Africa: 60,
    Oceania: 80,
  };

  let score = regionalBaselines[region] || 60;

  // 3. Adjust for Density
  if (density > 500) score -= 15;
  else if (density > 150) score -= 5;
  else score += 5;

  // 4. Add a "Deterministic Random" factor
  const variance = (population % 10); 
  return Math.min(98, Math.max(15, score + variance));
}