"use client";
import { motion } from "framer-motion";
import CountryList from "../countries/CountryList";
import Badge from "../ui/Badge";

export default function LandingClient({ countries }) {
  const scrollToExplorer = () => {
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6">
        {/* Modern "Aura" Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-nature-300/20 rounded-full blur-[120px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-8"
        >
          <div className="flex justify-center">
            <Badge className="bg-nature-50 text-nature-700 border-nature-200 px-4 py-1.5 text-sm font-medium">
              🌍 Tracking 250+ Jurisdictions
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black text-nature-950 tracking-tight leading-[0.9]">
            The World’s <span className="text-nature-500 italic">Eco-Pulse</span>.
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Real-time environmental analytics and sustainability scores 
            visualized for every nation on Earth.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button 
              onClick={scrollToExplorer}
              className="bg-nature-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-nature-800 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-nature-900/20"
            >
              Start Exploring
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- DATA EXPLORER SECTION --- */}
      <section id="explorer" className="max-w-7xl mx-auto px-6 w-full space-y-12 scroll-mt-24">
        <div className="border-t border-slate-100 pt-20">
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-4xl font-display font-bold text-nature-950">Global Analytics</h2>
            <p className="text-slate-500 text-lg">Search, filter, and compare country environmental metrics.</p>
          </div>
          
          {/* Your original CountryList component */}
          <CountryList allCountries={countries} />
        </div>
      </section>
    </div>
  );
}