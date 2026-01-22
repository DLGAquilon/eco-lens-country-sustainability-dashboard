"use client";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content: "EcoLens does not require user registration or personal identification. We use anonymous geolocation data (latitude and longitude) provided by your browser to fetch local air quality metrics from OpenWeather API."
    },
    {
      title: "Third-Party Services",
      content: "Our environmental analytics are powered by REST Countries and OpenWeather. When you view a country's profile, a secure request is sent to these providers. They do not receive any identifying information about you."
    },
    {
      title: "Cookies & Tracking",
      content: "We use essential session cookies to remember your sorting preferences and 'Load More' state. We do not use advertising or cross-site tracking cookies."
    },
    {
      title: "Environmental Commitment",
      content: "True to our mission, our digital footprint is minimized through optimized data fetching to reduce server-side energy consumption."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-6 py-20"
    >
      <header className="mb-16 border-b border-slate-100 pb-10">
        <h1 className="text-4xl font-black text-nature-950 mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 font-medium italic">Last updated: January 2026</p>
      </header>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <h2 className="text-lg font-bold text-nature-700 uppercase tracking-widest">
              {section.title}
            </h2>
            <p className="md:col-span-2 text-slate-600 leading-relaxed">
              {section.content}
            </p>
          </motion.section>
        ))}
      </div>

      <footer className="mt-20 p-8 bg-nature-50 rounded-3xl border border-nature-100">
        <p className="text-sm text-nature-800 text-center font-medium">
          Questions about our data usage? Contact us at 
          <span className="font-bold ml-1">privacy@ecolens.earth</span>
        </p>
      </footer>
    </motion.div>
  );
}