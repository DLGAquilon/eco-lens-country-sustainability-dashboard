import { fetchEcoCountries } from "@/lib/api-client";
import Badge from "@/components/ui/Badge";

export default async function RankingsPage() {
  const countries = await fetchEcoCountries();
  
  // Logic: Sort by Population (as a proxy for size/impact)
  const rankedCountries = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 20);

  return (
    <div className="space-y-10 py-10">
      <section>
        <h1 className="text-4xl font-display font-black text-nature-950">Global Rankings</h1>
        <p className="text-slate-500">Top 20 nations by demographic environmental footprint.</p>
      </section>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 text-xs font-bold uppercase text-slate-400">Rank</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-400">Country</th>
              <th className="p-4 text-xs font-bold uppercase text-slate-400 text-right">Population</th>
            </tr>
          </thead>
          <tbody>
            {rankedCountries.map((country, index) => (
              <tr key={country.name} className="border-b border-slate-50 hover:bg-nature-50/50 transition-colors">
                <td className="p-4 font-display font-bold text-slate-400">#{index + 1}</td>
                <td className="p-4 flex items-center gap-3">
                  <img src={country.flag} className="w-6 h-4 rounded-sm object-cover" alt="" />
                  <span className="font-semibold text-nature-950">{country.name}</span>
                </td>
                <td className="p-4 text-right font-mono text-sm text-slate-600">
                  {country.population.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}