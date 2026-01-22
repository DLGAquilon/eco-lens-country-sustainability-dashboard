"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="initial"
      animate="animate"
      className="max-w-5xl mx-auto px-6 py-20 space-y-24 transition-colors duration-500"
    >
      {/* SECTION 1: THE VISION */}
      <motion.section variants={itemVars} className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-6xl font-black text-foreground tracking-tighter italic">
          Visualizing <span className="text-nature-500">Global Health</span>.
        </h1>
        <p className="text-xl text-foreground/60 leading-relaxed font-medium">
          EcoLens was born from a simple question: How do we turn abstract climate data 
          into an intuitive, human-readable index? We believe that by visualizing 
          sustainability, we make accountability inevitable.
        </p>
      </motion.section>

      {/* SECTION 2: THE ECO-SCORE ALGORITHM */}
      <motion.section variants={itemVars} className="space-y-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">The Intelligence Engine</h2>
            <p className="text-foreground/70 leading-relaxed">
              Our Eco-Score is not a static number. It is a live-calculated index that 
              synthesizes multiple data streams to provide a snapshot of a nation's 
              current environmental standing.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Atmospheric Weight (35%)", text: "Real-time PM2.5 and AQI data from our meteorological partners." },
                { title: "Regional Policy Baseline (40%)", text: "Multipliers based on continental environmental protection treaties." },
                { title: "Demographic Stress (25%)", text: "A calculation of population density vs. total land area available." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-2xl bg-card border border-border-eco shadow-sm">
                  <span className="text-nature-500 font-black">0{i+1}.</span>
                  <div>
                    <h4 className="font-bold text-foreground uppercase text-xs tracking-widest">{item.title}</h4>
                    <p className="text-sm text-foreground/50">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Card - Uses nature-500 consistently */}
          <div className="flex-1 bg-foreground/5 p-1 rounded-[3rem] shadow-2xl border border-border-eco">
            <div className="bg-nature-500 p-10 rounded-[2.8rem] border border-white/5 space-y-6">
              <h3 className="text-white font-bold italic text-lg tracking-tight">Technical Architecture</h3>
              <p className="text-white/90 text-sm leading-loose font-medium">
                Built on Next.js 14, EcoLens utilizes Server-Side Rendering (SSR) for initial data 
                fetches to ensure high performance. Client-side state management handles 
                real-time filtering across 250+ jurisdictions, while Framer Motion 
                orchestrates the layout transitions.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js 14", "Tailwind CSS", "Framer Motion"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white/20 rounded text-[10px] text-white font-bold uppercase tracking-widest backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: CORE DATA SOURCES */}
      <motion.section variants={itemVars} className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border-eco pt-16">
        {[
          { title: "REST Countries", text: "Provides fundamental demographic data, territorial coordinates, and sovereignty information for every tracked jurisdiction." },
          { title: "OpenWeather API", text: "Feeds our atmospheric dashboard with real-time Air Quality Index (AQI) data for global capital cities." },
          { title: "Community Focused", text: "EcoLens is an open platform designed for researchers, travelers, and global citizens committed to climate transparency." }
        ].map((source) => (
          <div key={source.title}>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-nature-500 mb-4">{source.title}</h3>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {source.text}
            </p>
          </div>
        ))}
      </motion.section>

      {/* SECTION 4: CALL TO ACTION */}
      <motion.section 
        variants={itemVars} 
        className="bg-card rounded-[3rem] p-12 text-center space-y-6 border border-border-eco shadow-xl"
      >
        <h3 className="text-3xl font-black text-foreground tracking-tight">Ready to Explore?</h3>
        <p className="text-foreground/50 max-w-xl mx-auto font-medium leading-relaxed">
          Navigate back to the dashboard to begin filtering nations by sustainability 
          rank, population, or name.
        </p>
        <div className="pt-4">
          <a href="/" className="inline-block bg-foreground text-background px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-foreground/10">
            Back to Global Dashboard
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
}