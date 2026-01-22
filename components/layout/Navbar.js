import Link from "next/link";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border-eco">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-foreground tracking-tighter">
          ECO<span className="text-nature-500">LENS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-foreground/60 font-medium text-[11px] uppercase tracking-[0.2em]">
          {/* Use text-foreground/60 for subtle links that brighten on hover */}
          <Link href="/" className="hover:text-foreground transition-colors">Dashboard</Link>
          <Link href="/rankings" className="hover:text-foreground transition-colors">Rankings</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">Our Mission</Link>
        </nav>

        {/* This button automatically inverts: Dark in Light mode, Light in Dark mode */}
        <button className="bg-foreground text-background px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all">
          Get Alerts
        </button>
      </div>
    </header>
  );
}