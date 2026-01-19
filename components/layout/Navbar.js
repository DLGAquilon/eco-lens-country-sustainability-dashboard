import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="glass-card w-full max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold flex items-center gap-2">
          <span className="text-nature-500">🌱</span>
          <span className="tracking-tight">Eco<span className="text-nature-500">Lens</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-medium text-sm uppercase tracking-wider">
          <Link href="/" className="hover:text-nature-500 transition-colors">Dashboard</Link>
          <Link href="/rankings" className="hover:text-nature-500 transition-colors">Global Rankings</Link>
          <Link href="/about" className="hover:text-nature-500 transition-colors">Our Mission</Link>
        </div>

        <button className="bg-nature-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-nature-950 transition-all shadow-md shadow-emerald-200">
          Live AQI
        </button>
      </nav>
    </header>
  );
}