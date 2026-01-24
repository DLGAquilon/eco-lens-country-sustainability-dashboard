"use client";

/**
 * Navbar Component
 *
 * This is the fixed navigation bar that appears at the top of every page.
 * It provides primary navigation and adapts to scroll position and theme changes.
 *
 * State Management:
 * - isOpen: Controls mobile menu visibility
 * - scrolled: Tracks if user has scrolled more than 20px down
 * - currentTheme: Monitors real-time theme changes via MutationObserver
 *
 * Theme & Scroll Detection:
 * - Uses MutationObserver to detect data-theme attribute changes (day/night)
 * - Listens to scroll events to trigger dark mode styling when scrolled
 * - Logo switches between light and dark versions based on theme or scroll state
 * - Background becomes semi-transparent with blur effect when scrolled
 *
 * Navigation Links:
 * - Dashboard: Links to home page (/)
 * - Rankings: Links to global sustainability rankings (/rankings)
 * - Our Mission: Links to about page with methodology (/about)
 *
 * Desktop Navigation:
 * - Three main links displayed horizontally
 * - Hover effects with animated underline (scales in from left)
 * - Text color adapts based on dark/light mode
 *
 * Mobile Navigation:
 * - Hamburger menu icon (Menu/X from lucide-react)
 * - Animated dropdown menu using Framer Motion
 * - Menu links stack vertically with full width styling
 * - Closing menu resets isOpen state
 *
 * Logo Behavior:
 * - Always visible and clickable (links to home)
 * - Uses blend modes for proper overlaying (mix-blend-screen for dark, multiply for light)
 * - Scales on hover for interactive feedback
 * - Switches images based on showDarkModeLogo condition
 *
 * Visual Effects:
 * - Fixed positioning with z-index 100
 * - Smooth transitions between dark/light modes
 * - Backdrop blur effect on scroll
 * - Shadow depth when scrolled or menu is open
 */

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
    // Select the correct target (documentElement matches your ThemeToggle)
    const targetNode = document.documentElement;

    const observer = new MutationObserver(() => {
      const theme = targetNode.getAttribute("data-theme") || "day";
      setCurrentTheme(theme);
    });

    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Set initial state correctly
    setCurrentTheme(targetNode.getAttribute("data-theme") || "day");

    return () => observer.disconnect();
  }, []);
  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Rankings", href: "/rankings" },
    { name: "Our Mission", href: "/about" },
  ];

  const isNight = currentTheme === "night";
  const showDarkModeLogo = isNight || scrolled || isOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 font-roboto uppercase tracking-[0.2em] ${
        showDarkModeLogo
          ? "bg-[#0f172a]/90 shadow-2xl py-3 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* LOGO SECTION */}
        <Link
          href="/"
          className="relative z-[110] transition-transform duration-300 hover:scale-105"
        >
          <div className="relative w-24 h-20 md:w-44 md:h-36 -my-8 md:-my-12">
            <Image
              src={
                showDarkModeLogo
                  ? "/logo/logo-dark.png"
                  : "/logo/logo-light.png"
              }
              alt="EcoLens Logo"
              fill
              className={`object-contain transition-opacity duration-500 ${
                showDarkModeLogo ? "mix-blend-screen" : "mix-blend-multiply"
              }`}
              priority
            />
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative group text-sm transition-all duration-300 ${
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
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={`lg:hidden p-2 rounded-xl transition-colors relative z-[110] ${
            showDarkModeLogo
              ? "text-white bg-white/10"
              : "text-slate-900 bg-slate-900/10"
          }`}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-slate-950 shadow-2xl lg:hidden z-[100] border-t border-white/10"
          >
            <div className="flex flex-col p-8 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xl text-white hover:text-emerald-400 transition-colors py-2 border-b border-white/5"
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
