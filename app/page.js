/**
 * Home Page (Root Page - Server Component)
 * 
 * This is the main landing page and dashboard of the EcoLens application. It serves as a
 * server-side rendered page that prepares all necessary data before handing off to the
 * client-side landing component.
 * 
 * Server-Side Operations:
 * - Fetches the complete list of countries from the REST Countries API
 * - Calculates the Eco-Score for each country using the sustainability algorithm
 * - Enriches the country data with computed scores
 * 
 * Data Flow:
 * 1. fetchEcoCountries() retrieves all countries with basic data (name, flag, region, coords, etc.)
 * 2. calculateEcoScore() processes each country and generates an environmental sustainability score
 * 3. The enriched countries array is passed to the LandingClient component
 * 
 * Client Handoff:
 * - All processed data (countries with their eco-scores) is passed as props to LandingClient (/components/LandingClient.js)
 * - LandingClient handles rendering the interactive dashboard with search, filtering, grid display,
 *   and navigation capabilities
 * 
 * This page leverages Next.js server components for optimal performance by computing
 * expensive operations on the server and caching the results before sending to the client.
 */

import LandingClient from "@/components/layout/LandingClient";
import { fetchEcoCountries } from "@/lib/api-client";
import { calculateEcoScore } from "@/lib/utils";

export default async function Home() {
  const rawCountries = await fetchEcoCountries();

  const countries = rawCountries.map((country) => ({
    ...country,
    ecoScore: calculateEcoScore(country),
  }));

  return (
    <main>
      <LandingClient countries={countries} />
    </main>
  );
}