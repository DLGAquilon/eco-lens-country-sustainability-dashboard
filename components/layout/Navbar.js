"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Rankings", href: "/rankings" },
    { name: "Our Mission", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-100 transition-all duration-300 font-roboto uppercase tracking-[0.2em] ${
        /* 1. FORCE SOLID DARK ON MOBILE/TABLET (md & sm) */
        /* 2. TRANSPARENT ONLY ON LARGE (lg) UNLESS SCROLLED */
        isOpen || scrolled
          ? "bg-slate-500/75 shadow-2xl py-4"
          : "bg-slate-500/75 lg:bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO - Brighter White for Contrast */}
        <Link
          href="/"
          className="text-xl font-black text-foreground tracking-tighter"
        >
          ECO<span className="text-emerald-400">LENS</span>
        </Link>

        {/* DESKTOP LINKS - Shown on lg only */}
        <div className="hidden lg:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              /* 'relative' allows the line to anchor, 'group' triggers the hover */
              className="relative group text-[11px] font-roboto uppercase tracking-[0.2em]
               text-foreground hover:text-emerald-400 transition-all duration-300"
            >
              {link.name}

              {/* THE SLIDING LINE */}
              <span
                className="
        absolute -bottom-1 left-0 
        w-full h-0.5
        bg-emerald-400 
        origin-left 
        scale-x-0 
        transition-transform duration-300 ease-out 
        group-hover:scale-x-100
      "
              />
            </Link>
          ))}
        </div>
        {/* MOBILE TOGGLE - Accessible on bright backgrounds */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-white bg-white/10 rounded-lg backdrop-blur-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN - Solid Slate for perfect readability */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-500/75 border-t border-white/5 overflow-hidden"
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
