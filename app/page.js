import { fetchEcoCountries } from "@/lib/api-client";
import CountryCard from "@/components/stats/CountryCard";
import SearchBar from "@/components/ui/SearchBar"; 
import Input from "@/components/ui/Input";
import EcoMetric from "@/components/stats/EcoMetric";
import { formatNumber } from "@/lib/utils";

export default async function Home(){
  const countries = await fetchEcoCountries();
  const featuredCountries = countries.slice(0, 395); //Here to change number of featured countries shown 

  const stats = {
    total: countries.length,
    population: countries.reduce((acc, curr) => acc + curr.population, 0),
    regions: new Set(countries.map(c => c.region)).size,
    islands: countries.filter(c => c.region === 'Oceania').length
  };

  return (
    <div className="space-y-12 pb-20">
      <section className="text-center space-y-4 pt-10">
        <h1 className="font-display text-4xl md:text-6xl font-black text-nature-950 tracking-tight">
          Monitoring the <span className="text-nature-500">Pulse</span> of our Planet
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Explore real-time environmental data, air quality, and sustainability metrics from over 200 countries.
        </p>
        
        <div className="flex justify-center pt-6">
          <Input 
            placeholder="Search for a country..." 
            className="max-w-md shadow-xl border-nature-500/30"
          />
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <EcoMetric 
          label="Nations Tracked" 
          value={stats.total} 
          icon="🌎" 
          trend={-2}
        />
        <EcoMetric 
          label="Global Reach" 
          value={formatNumber(stats.population)} 
          unit="People"
          icon="👥" 
        />
        <EcoMetric 
          label="Active Regions" 
          value={stats.regions} 
          icon="🗺️" 
        />
        <EcoMetric 
          label="Oceanic Zones" 
          value={stats.islands} 
          icon="🏝️" 
        />
      </section>

      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-nature-950">Featured Regions</h2>
            <p className="text-slate-500 text-sm">Real-time sustainability overview</p>
          </div>
          <button className="text-nature-500 font-bold text-sm hover:underline">View All &rarr;</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredCountries.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      </section>
    </div>
  );
}