"use client";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const lastUpdated = "January 2024";

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 transition-colors duration-500">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 border-b border-border-eco pb-10"
      >
        <h1 className="text-5xl font-black text-foreground tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-foreground/50 font-medium uppercase tracking-widest text-[10px]">
          Last Updated: {lastUpdated}
        </p>
      </motion.div>

      {/* Content Sections */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-12"
      >
        {/* 1. Data Transparency */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="text-nature-500 text-sm font-black">01.</span>
            Data Transparency
          </h2>
          <p className="text-foreground/70 leading-relaxed max-w-3xl">
            At EcoLens, we prioritize environmental transparency. We want to be equally transparent 
            about how we handle your data. This platform is designed as an informational dashboard 
            and does not require user accounts or personal identification to access global 
            sustainability metrics.
          </p>
        </section>

        {/* 2. Information Collection Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="text-nature-500 text-sm font-black">02.</span>
            Information We Collect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-[2rem] bg-card border border-border-eco backdrop-blur-md shadow-sm">
              <div className="w-10 h-10 bg-nature-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="font-bold text-foreground mb-2">Technical Data</h4>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Standard log information such as IP address and browser type are processed 
                to optimize our server-side rendering performance.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-card border border-border-eco backdrop-blur-md shadow-sm">
              <div className="w-10 h-10 bg-nature-500/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-xl">🌗</span>
              </div>
              <h4 className="font-bold text-foreground mb-2">Theme Preferences</h4>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Your preference for Light or Dark mode is stored locally on your device 
                via LocalStorage to ensure a consistent experience.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Partners */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="text-nature-500 text-sm font-black">03.</span>
            Third-Party Data Partners
          </h2>
          <p className="text-foreground/70 leading-relaxed max-w-3xl">
            Our dashboard fetches real-time data from <span className="text-nature-500 font-semibold">OpenWeather API</span> and 
            <span className="text-nature-500 font-semibold"> REST Countries</span>. We do not share unique user identifiers 
            with these partners; requests are proxied or handled as standard metadata requests.
          </p>
        </section>

        {/* 4. Functional Cookies Highlight */}
        <section className="p-8 rounded-[2.5rem] bg-nature-500/5 border border-nature-500/20 relative overflow-hidden">
          {/* Subtle decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-nature-500/10 blur-3xl -mr-10 -mt-10" />
          
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <span>🍪</span> 4. Cookies
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
            EcoLens uses minimal cookies solely for functional purposes (such as maintaining your 
            search queries during a session). We do not use tracking, advertising, or marketing cookies.
          </p>
        </section>

        {/* Footer Contact */}
        <section className="pt-10 border-t border-border-eco text-center">
          <p className="text-foreground/40 text-sm italic font-medium">
            Questions regarding our policy? <br className="md:hidden" />
            Contact us via our <a href="https://github.com/DLGAquilon/eco-lens-country-sustainability-dashboard.git" className="text-nature-500 hover:underline">GitHub repository</a>.
          </p>
        </section>
      </motion.div>
    </div>
  );
}