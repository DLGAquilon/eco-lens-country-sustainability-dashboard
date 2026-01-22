"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-nature-500 rounded-lg" />
              <span className="text-2xl font-black text-nature-950 tracking-tighter">
                EcoLens
              </span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Empowering global citizens with real-time environmental data and
              sustainability metrics to visualize a cleaner future.
            </p>
          </div>

          {/* Data Sources */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-nature-950">
              Data Partners
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li>
                <a
                  href="https://openweathermap.org/"
                  target="_blank"
                  className="hover:text-nature-500 transition-colors"
                >
                  OpenWeather API
                </a>
              </li>
              <li>
                <a
                  href="https://restcountries.com/"
                  target="_blank"
                  className="hover:text-nature-500 transition-colors"
                >
                  REST Countries
                </a>
              </li>
              <li>
                <a
                  href="https://waqi.info/"
                  target="_blank"
                  className="hover:text-nature-500 transition-colors"
                >
                  World Air Quality Project
                </a>
              </li>
            </ul>
          </div>

          {/* Methodology Quick Link */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-nature-950">
              System
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li>
                <Link
                  href="/about"
                  className="hover:text-nature-500 transition-colors"
                >
                  Score Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-nature-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/DLGAquilon/eco-lens-country-sustainability-dashboard.git"
                  className="hover:text-nature-500 transition-colors"
                >
                  Open Source Code
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© {currentYear} EcoLens Analytics. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built for the <span className="text-nature-500">Planet</span> 🌍
          </p>
        </div>
      </div>
    </footer>
  );
}
