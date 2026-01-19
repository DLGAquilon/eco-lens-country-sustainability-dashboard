export default function Footer() {
  return (
    <footer className="mt-20 border-t border-nature-500/10 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display font-bold text-lg mb-4">EcoLens</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Empowering global citizens with real-time environmental data to foster a sustainable future.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Data Sources</h4>
          <ul className="text-sm space-y-2 text-slate-500">
            <li>REST Countries API</li>
            <li>OpenWeather Air Pollution</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Platform</h4>
          <p className="text-xs text-slate-400">
            Built with Next.js 15, Tailwind v4, and hosted on Vercel. 
            <br />© {new Date().getFullYear()} EcoLens Initiative.
          </p>
        </div>
      </div>
    </footer>
  );
}