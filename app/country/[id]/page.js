// app/country/[id]/page.js
import { fetchEcoCountries, fetchAirQuality, fetchCurrentWeather } from "@/lib/api-client";
import { calculateEcoScore } from "@/lib/utils";
import CountryClientView from "./CountryClientView";

export default async function CountryPage({ params }) {
  const { id } = await params;
  const allCountries = await fetchEcoCountries();
  const country = allCountries.find(
    (c) => c.name.toLowerCase() === decodeURIComponent(id).toLowerCase()
  );

  if (!country) return <div className="py-20 text-center">Country not found.</div>;

  const [airData, weatherData] = await Promise.all([
    fetchAirQuality(country.coords.lat, country.coords.lng),
    fetchCurrentWeather(country.coords.lat, country.coords.lng),
  ]);

  const score = calculateEcoScore(country, airData?.main?.aqi);

  // Pass everything to the Client Component
  return (
    <CountryClientView 
      country={country} 
      airData={airData} 
      weatherData={weatherData} 
      sustainabilityScore={score} 
    />
  );
}