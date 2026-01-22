"use client";

import { useState } from "react";
import CountryCard from "../stats/CountryCard";
import Input from "../ui/Input";
import { motion, AnimatePresence } from "framer-motion";

export default function CountryList({ allCountries }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [visibleCount, setVisibleCount] = useState(12);

  // 1. Filtering logic
  const filtered = allCountries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.region.toLowerCase().includes(query.toLowerCase()),
  );

  // 2. Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "population") return b.population - a.population;
    if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
    if (sortBy === "eco-score") return (b.ecoScore || 0) - (a.ecoScore || 0);
    return 0;
  });

  // 3. Pagination logic (This is what displayList is for!)
  const displayList = sorted.slice(0, visibleCount);

  // Reset pagination when searching or sorting
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setVisibleCount(12); // Reset to first page
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setVisibleCount(12); // Reset to first page
  };

  return (
    <div className="space-y-8">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="w-full max-w-md">
          <Input
            placeholder="Search country or region..."
            value={query}
            onChange={handleSearchChange}
            className="bg-card text-foreground border-border-eco placeholder:text-foreground/40 focus:ring-nature-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">

          <label
            htmlFor="sort-select"
            className="text-sm font-bold text-foreground uppercase tracking-tight whitespace-nowrap cursor-pointer"
          >
            Sort By:
          </label>

          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="w-full md:w-48 p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-nature-500/20 focus:border-nature-500 transition-all cursor-pointer"
          >
            <option value="alphabetical">Name (A-Z)</option>
            <option value="population">Largest Population</option>
            <option value="eco-score">Highest Eco-Score</option>
          </select>
        </div>
      </div>

      {/* --- GRID (Now using displayList) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {displayList.map((country) => (
            <motion.div
              key={country.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CountryCard country={country} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- LOAD MORE SECTION --- */}
      {visibleCount < sorted.length ? (
        <div className="flex flex-col items-center justify-center gap-4 pt-12 pb-10">
          <p className="text-sm text-slate-400 font-medium">
            Viewing {displayList.length} of {sorted.length} nations
          </p>
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="group px-8 py-4 bg-card border border-border-eco rounded-2xl font-bold text-foreground hover:border-nature-500 hover:text-nature-500 
            transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-nature-500/10 active:scale-95"
          >
            Load More Nations
          </button>
        </div>
      ) : (
        sorted.length > 0 && (
          <div className="text-center pt-12 pb-10">
            <p className="text-slate-400 text-sm italic">
              You've reached the end of the world. 🌍
            </p>
          </div>
        )
      )}

      {/* --- EMPTY STATE --- */}
      {sorted.length === 0 && (
        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium font-display text-lg">
            No countries found matching "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
