"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("day");

  useEffect(() => {
    // 1. Handle Scroll
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // 2. Sync with your ThemeToggle.js
    // We observe changes to the 'data-theme' attribute on the document body
    const observer = new MutationObserver(() => {
      const theme = document.body.getAttribute("data-theme") || "day";
      setCurrentTheme(theme);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    // Initial check
    setCurrentTheme(document.body.getAttribute("data-theme") || "day");

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Rankings", href: "/rankings" },
    { name: "Our Mission", href: "/about" },
  ];

  // LOGIC: Show dark mode logo (light colors) if theme is night OR scrolled OR menu open
  const showDarkModeLogo = currentTheme === "night" || scrolled || isOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-100 mb-5 pb-5 transition-all duration-300 font-roboto uppercase tracking-[0.2em] ${
        showDarkModeLogo
          ? "bg-[#0f172a]/90 shadow-2xl py-4 backdrop-blur-md" // Dark background for dark logo
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* DYNAMIC LOGO SECTION */}
        <Link
          href="/"
          className="relative h-10 w-36 transition-all duration-300 scale-500 origin-center"
        >
          <Image
            src={showDarkModeLogo ? "/logo/logo-dark.png" : "/logo/logo-light.png"}
            alt="EcoLens Logo"
            fill
            className={`object-contain transition-opacity duration-500 ${
              // mix-blend-multiply erases white backgrounds from logo-light.png
              // mix-blend-screen erases dark backgrounds from logo-dark.png
              showDarkModeLogo ? "mix-blend-screen" : "mix-blend-multiply"
            }`}
            priority
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative group text-sm font-roboto uppercase tracking-[0.2em] transition-all duration-300 ${
                showDarkModeLogo ? "text-white" : "text-slate-900"
              } hover:text-emerald-400`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 rounded-lg backdrop-blur-md transition-colors ${
            showDarkModeLogo ? "text-white bg-white/10" : "text-slate-900 bg-slate-900/10"
          }`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-750/25 border-t border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-white hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}