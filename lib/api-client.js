
/**
 * API Client Module
 * 
 * This file contains all API calls to external services. It acts as a centralized
 * hub for fetching country data, weather, air quality, and geographic information.
 * 
 * FUNCTIONS:
 * 
 * 1. fetchEcoCountries()
 *    - Fetches all countries from REST Countries API
 *    - Extracts: name, flag, capital, region, coordinates, population
 *    - Returns alphabetically sorted array
 *    - Caches results for 1 hour (revalidate: 3600)
 *    - Used on home page to populate country grid
 * 
 * 2. fetchAirQuality(lat, lon)
 *    - Fetches Air Quality Index (AQI) from OpenWeather API
 *    - Requires coordinates (latitude, longitude)
 *    - Returns AQI data for a specific location
 *    - Caches for 1 hour
 *    - Used on country detail pages for capital city air quality
 * 
 * 3. fetchCurrentWeather(lat, lon)
 *    - Fetches real-time weather data from OpenWeather API
 *    - Returns: temperature, humidity, wind speed, weather conditions
 *    - Uses metric units (Celsius, m/s)
 *    - Handles rate limiting (429) and auth errors (401)
 *    - Used for weather display on country pages
 * 
 * 4. fetchMajorCities(countryName, countryCode)
 *    - Fetches list of major cities in a country using OpenWeather Geocoding
 *    - Filters results by country code to ensure accuracy
 *    - Removes duplicates automatically
 *    - Returns max 6 cities per country
 *    - Used for Regional Breakdown section on country pages
 * 
 * ERROR HANDLING:
 * - All functions have try-catch blocks
 * - Failed requests return null or empty arrays (graceful degradation)
 * - Errors logged to console for debugging
 * 
 * API KEYS:
 * - REST Countries: No key required (public API)
 * - OpenWeather: Requires NEXT_PUBLIC_OPENWEATHER_KEY environment variable
 * 
 * CACHING:
 * - Uses Next.js revalidate option for ISR (Incremental Static Regeneration)
 * - Data refreshes every 1 hour automatically
 */

const BASE_URL = "https://restcountries.com/v3.1";

export async function fetchEcoCountries() {
  try {
    const response = await fetch(
      `${BASE_URL}/all?fields=name,flags,capital,region,latlng,population`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data
      .map((country) => ({
        name: country.name.common,
        flag: country.flags.svg,
        capital: country.capital?.[0] || "N/A",
        region: country.region,
        coords: {
          lat: country.latlng?.[0],
          lng: country.latlng?.[1],
        },
        population: country.population,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Could not fetch countries:", error);
    return [];
  }
}

export async function fetchAirQuality(lat, lon) {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
  if (!API_KEY) return null;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Air Quality API error:", errorData.message);
      return null;
    }

    const data = await res.json();
    return data.list[0];
  } catch (error) {
    console.error("Air Quality fetch error:", error);
    return null;
  }
}

export async function fetchCurrentWeather(lat, lon) {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
  if (!API_KEY) return null;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      //Error handling for specific statuses.
      if (res.status === 429) console.error("Rate limit exceeded");
      if (res.status === 401) console.error("Invalid API Key");
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

export async function fetchMajorCities(countryName, countryCode) {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
  if (!API_KEY || !countryName) return [];

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(countryName)}&limit=20&appid=${API_KEY}`
    );
    const data = await response.json();

    // STRICT FILTERING SCHEME
    const validRegions = data.filter(item => {
      // 1. Must match the country code (e.g., "AR" for Argentina)
      const matchesCountry = item.country?.toLowerCase() === countryCode?.toLowerCase();
      
      // 2. Avoid duplicates if the API returns the same city twice
      return matchesCountry;
    });

    // Duplication removal
    const unique = validRegions.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);

    return unique.slice(0, 6);
  } catch (error) {
    console.error("Geocoding Error:", error);
    return [];
  }
}