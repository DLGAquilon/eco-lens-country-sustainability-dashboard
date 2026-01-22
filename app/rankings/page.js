"use client";
import { useState, useEffect } from "react";
import { fetchEcoCountries } from "@/lib/api-client";
import { calculateEcoScore } from "@/lib/utils";
import { motion } from "framer-motion";

export default function RankingsPage() {
  const [ranked, setRanked] = useState([]);

  useEffect(() => {
    async function loadData() {
      const countries = await fetchEcoCountries();
      const processed = countries
        .map(c => ({ ...c, score: calculateEcoScore(c) }))
        .sort((a, b) => b.score - a.score);
      setRanked(processed);
    }
    loadData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 transition-colors duration-500">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-black text-foreground tracking-tight">
          Global Eco-Rankings
        </h1>
        <p className="text-foreground/60">
          The world's top performing nations based on current environmental data.
        </p>
      </motion.div>

      {/* Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-[2.5rem] border border-border-eco overflow-hidden shadow-sm backdrop-blur-md"
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-foreground/5 text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">
              <th className="px-8 py-5">Rank</th>
              <th className="px-8 py-5">Country</th>
              <th className="px-8 py-5">Region</th>
              <th className="px-8 py-5 text-right">Eco-Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-eco">
            {ranked.slice(0, 20).map((country, index) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                key={country.name} 
                className="hover:bg-nature-500/5 transition-colors group"
              >
                {/* Rank Number */}
                <td className="px-8 py-5 font-bold text-foreground/30">
                  #{index + 1}
                </td>

                {/* Country Name and Flag */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={country.flag} 
                      alt="" 
                      className="w-8 h-5 object-cover rounded shadow-sm border border-border-eco" 
                    />
                    <span className="font-bold text-foreground">
                      {country.name}
                    </span>
                  </div>
                </td>

                {/* Region */}
                <td className="px-8 py-5 text-foreground/60 text-sm">
                  {country.region}
                </td>

                {/* Score Badge */}
                <td className="px-8 py-5 text-right">
                  <span className="px-3 py-1 bg-nature-500/10 text-nature-500 rounded-lg font-black text-sm">
                    {Math.round(country.score)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}