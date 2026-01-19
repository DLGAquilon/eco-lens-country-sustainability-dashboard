import { fetchEcoCountries, fetchAirQuality } from "@/lib/api-client";
import AirQualityCard from "@/components/stats/AirQualityCard";
import EcoMetric from "@/components/stats/EcoMetric";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";

export default async function CountryPage({ params }) {
  const { id } = await params; 
  const allCountries = await fetchEcoCountries();

  const country = allCountries.find(
    (c) => c.name.toLowerCase() === decodeURIComponent(id).toLowerCase()
  );

  if (!country) return <div className="py-20 text-center text-xl">Country data not found.</div>;
  const airData = await fetchAirQuality(country.coords.lat, country.coords.lng);

  const sustainabilityScore = airData 
  ? Math.max(0, 100 - (airData.main.aqi * 15) - (country.population / 100000000))
  : "Calculating...";

  return (
    <div className="space-y-8 pb-20">
      {/* Breadcrumb & Header */}
      <Link href="/" className="text-nature-500 hover:underline text-sm font-bold flex items-center gap-1">
        ← Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img src={country.flag} alt="" className="w-full md:w-1/3 rounded-2xl shadow-2xl" />
        <div className="space-y-4">
          <h1 className="text-5xl font-display font-black text-nature-950">{country.name}</h1>
          <p className="text-xl text-slate-500">Capital: <span className="text-nature-950 font-semibold">{country.capital}</span></p>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-nature-500/10 text-nature-500 rounded-full font-bold">
              Sustainability Score: {Math.round(sustainabilityScore)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Air Quality Innovation */}
        <div className="md:col-span-2">
          {airData ? (
            <AirQualityCard aqi={airData.main.aqi} city={country.capital} />
          ) : (
            <div className="glass-card p-10 text-center text-slate-400">
              OpenWeather API Key required for real-time Air Quality metrics.
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <EcoMetric label="Total Population" value={formatNumber(country.population)} icon="👥" />
          <EcoMetric label="Region" value={country.region} icon="🗺️" />
        </div>
      </div>
    </div>
  );
}
