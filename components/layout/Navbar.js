// components/layout/Navbar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Global Rankings", href: "/rankings" },
    { name: "Our Mission", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-nature-500/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link href="/" className="text-2xl font-black text-nature-950 tracking-tighter hover:opacity-80 transition-opacity">
          ECO<span className="text-nature-500">LENS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium text-[11px] uppercase tracking-[0.2em]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 relative py-1 ${
                  isActive 
                    ? "text-nature-950" 
                    : "text-slate-400 hover:text-nature-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-nature-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:block">
          <button className="bg-nature-950 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-nature-800 transition-colors">
            Get Alerts
          </button>
        </div>
      </div>
    </header>
  );
}