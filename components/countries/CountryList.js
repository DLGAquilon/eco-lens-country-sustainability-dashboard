"use client";

import { useState } from "react";
import CountryCard from "../stats/CountryCard";
import Input from "../ui/Input";
import { motion } from "framer-motion";

export default function CountryList({ allCountries }) {
  const [query, setQuery] = useState("");

  // Filtering logic happens on every keystroke
  const filtered = allCountries.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.region.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search Bar Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full max-w-md">
          <Input
            placeholder="Search by country or region..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="text-sm text-slate-500 font-medium">
          Showing {filtered.length} results
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((country) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <CountryCard key={country.name} country={country} />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">
            No countries found matching "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
