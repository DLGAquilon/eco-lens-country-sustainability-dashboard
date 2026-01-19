import { fetchEcoCountries } from "@/lib/api-client";
import Badge from "@/components/ui/Badge";
import PageTransition from "@/components/layout/PageTransitions";

export default async function RankingsPage() {
  const countries = await fetchEcoCountries();

  const ranked = countries
    .map((c) => ({
      ...c,
      ecoScore: Math.round(95 - c.population / 50000000),
    }))
    .sort((a, b) => b.ecoScore - a.ecoScore);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <header>
          <h1 className="text-4xl font-display font-black text-nature-950">
            Sustainability Rankings
          </h1>
          <p className="text-slate-500 mt-2">
            Nations ranked by our proprietary Eco-Lens metrics.
          </p>
        </header>

        <div className="glass-card overflow-hidden border border-nature-500/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Rank
                  </th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Nation
                  </th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Eco-Score
                  </th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {ranked.slice(0, 50).map((country, i) => (
                  <tr
                    key={country.name}
                    className="border-b border-slate-50 hover:bg-nature-50/30 transition-colors group"
                  >
                    <td className="p-5 font-display font-bold text-slate-300 group-hover:text-nature-500">
                      #{i + 1}
                    </td>
                    <td className="p-5 flex items-center gap-3">
                      <img
                        src={country.flag}
                        className="w-8 h-5 rounded-sm object-cover shadow-sm"
                        alt=""
                      />
                      <span className="font-bold text-nature-950">
                        {country.name}
                      </span>
                    </td>
                    <td className="p-5 font-mono font-bold text-nature-600">
                      {country.ecoScore}%
                    </td>
                    <td className="p-5">
                      <Badge
                        variant={country.ecoScore > 80 ? "success" : "warning"}
                      >
                        {country.ecoScore > 80 ? "Leader" : "Advancing"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
