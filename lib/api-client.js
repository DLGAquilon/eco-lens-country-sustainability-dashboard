const BASE_URL = "https://restcountries.com/v3.1";

export async function fetchEcoCountries() {
  try {
    const response = await fetch(
      `${BASE_URL}/all?fields=name,flags,capital,region,latlng,population`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.map((country) => ({
      name: country.name.common,
      flag: country.flags.svg,
      capital: country.capital?.[0] || "N/A",
      region: country.region,
      coords: {
        lat: country.latlng?.[0],
        lng: country.latlng?.[1],
      },
      population: country.population,
    })).sort((a, b) => a.name.localeCompare(b.name));
    
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
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await res.json();
    return data.list[0];
  } catch (error) {
    console.error("Air Quality fetch error:", error);
    return null;
  }
}