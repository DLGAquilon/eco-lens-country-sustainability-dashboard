
/**
 * CountryPage Component (Server Component)
 * 
 * This is a server-side rendering (SSR) page component for displaying individual country details.
 * It handles the data fetching at build/request time before rendering the interactive client view.
 * 
 * Server-Side Operations:
 * - Extracts the country ID from the URL parameter (dynamic route: [id])
 * - Fetches complete list of countries from REST Countries API
 * - Finds the matching country by name (case-insensitive)
 * - Concurrently fetches real-time air quality and weather data from OpenWeather API
 * - Calculates the country's sustainability score based on eco factors and air quality
 * 
 * Error Handling:
 * - Returns a simple error message if the country is not found in the database
 * 
 * Client Handoff:
 * - Passes all fetched data to CountryClientView component for rendering the interactive UI
 * - Uses client component for state management, animations, and user interactions
 */

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

  // Passing to Client Component - CountryClientView.js
  return (
    <CountryClientView 
      country={country} 
      airData={airData} 
      weatherData={weatherData} 
      sustainabilityScore={score} 
    />
  );
}