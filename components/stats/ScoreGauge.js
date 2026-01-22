"use client";

import { motion } from "framer-motion";

export default function ScoreGauge({ score }) {
  // SVG Constants for the circle math
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
      {/* Background Glow Effect */}
      <div 
        className="absolute w-32 h-32 blur-[50px] opacity-20 -z-10 transition-colors duration-1000"
        style={{ backgroundColor: getColor(score) }}
      />

      <svg className="w-48 h-48 transform -rotate-90">
        {/* Gray Background Circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-slate-100"
        />
        
        {/* Animated Progress Circle */}
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