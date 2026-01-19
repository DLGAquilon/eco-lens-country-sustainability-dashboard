import { fetchEcoCountries } from "@/lib/api-client";
import { formatNumber } from "@/lib/utils";
import EcoMetric from "@/components/stats/EcoMetric";
import CountryList from "@/components/countries/CountryList";
import CountryGridSkeleton from "@/components/countries/CountryGridSkeleton";
import { Suspense } from "react";

export default async function Home() {
  // Fetch data on the server
  const countries = await fetchEcoCountries();

  // Dynamic Statistics
  const stats = {
    total: countries.length,
    population: countries.reduce((acc, curr) => acc + curr.population, 0),
    regions: new Set(countries.map((c) => c.region)).size,
    islands: countries.filter((c) => c.region === "Oceania").length,
  };

  return (
    <div className="space-y-12 pb-20">
      {/* 1. HERO SECTION */}
      <section className="text-center space-y-4 pt-10">
        <h1 className="font-display text-4xl md:text-6xl font-black text-nature-950 tracking-tight">
          Monitoring the <span className="text-nature-500">Pulse</span> of our
          Planet
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg italic">
          Explore real-time environmental data, air quality, and sustainability
          metrics from over 200 countries.
        </p>
      </section>

      {/* 2. STATS SECTION */}
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
        <EcoMetric label="Active Regions" value={stats.regions} icon="🗺️" />
        <EcoMetric label="Oceanic Zones" value={stats.islands} icon="🏝️" />
      </section>

      {/* 3. INTERACTIVE LIST SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col border-b border-nature-500/10 pb-4">
          <h2 className="font-display text-2xl font-bold text-nature-950">
            Global Directory
          </h2>
          <p className="text-slate-500 text-sm italic">
            Search and filter live country data
          </p>
        </div>
        <Suspense fallback={<CountryGridSkeleton />}>
          <CountryList allCountries={countries} />
        </Suspense>
      </section>
    </div>
  );
}
