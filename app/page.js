import LandingClient from "@/components/layout/LandingClient";
import { fetchEcoCountries } from "@/lib/api-client";
import { calculateEcoScore } from "@/lib/utils";

export default async function Home() {
  // Fetching data on the server for speed and SEO
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