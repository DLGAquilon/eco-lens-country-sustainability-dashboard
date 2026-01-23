"use client";

/**
 * RegionalMetricCard Component
 * 
 * This component displays real-time environmental and weather data for a specific
 * regional city or province. It is used in the "Regional Breakdown" section of the
 * country detail page to show localized environmental conditions across major cities
 * and jurisdictions within a country.
 * 
 * Props:
 * @param {Object} city - City object containing:
 *        - name: City name to display
 *        - state: State/province name
 *        - lat: Latitude coordinate for API queries
 *        - lon: Longitude coordinate for API queries
 * @param {String} theme - Visual theme ("dark" or "light") for text color adaptation
 * 
 * Data Fetching:
 * - Fetches weather data from OpenWeather Current Weather API
 * - Fetches air pollution data from OpenWeather Air Pollution API
 * - Runs both API calls in parallel using Promise.all for efficiency
 * - Extracts: temperature, weather condition, AQI, humidity
 * - Includes error handling with console logging (silent failure)
 * 
 * Loading State:
 * - Shows animated skeleton placeholder while data loads
 * - Prevents layout shift with h-64 height constraint
 * 
 * Data Display:
 * - City Header: City name (bold, large) and state/province (small uppercase)
 * - 2x2 Grid of Metrics using EcoMetric component:
 *   * Temperature: Current temp in Celsius (🌡️)
 *   * AQI Index: Air Quality Index level (🍃)
 *   * Humidity: Relative humidity percentage (💧)
 *   * Sky: Weather condition description (☁️)
 * - Air Quality Badge: Shows AQI level (1-5) with color coding
 *   * Level 1-2 (Good): Green styling
 *   * Level 3-5 (Poor): Orange styling
 * 
 * Theme Awareness:
 * - Adapts text colors based on "dark" or "light" theme prop
 * - Dark theme: White text with opacity
 * - Light theme: Nature-950/slate colors
 * - Border colors also adapt to theme
 * 
 * Usage Context:
 * - Displayed in a 3-column responsive grid on country detail pages
 * - Shows data for up to 20 major cities/provinces per country
 * - Allows users to compare environmental conditions across regions
 * - Provides localized insights into air quality and weather patterns
 * 
 * This card is essential for understanding geographic variation in environmental
 * conditions within a country, helping users identify regions with better or worse
 * air quality and weather conditions.
 */

import { useState, useEffect } from "react";
import EcoMetric from "./EcoMetric";

export default function RegionalMetricCard({ city, theme }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegionalData = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

        const [weatherRes, airRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`,
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`,
          ),
        ]);

        const weather = await weatherRes.json();
        const air = await airRes.json();

        setData({
          temp: Math.round(weather.main.temp),
          condition: weather.weather[0].main,
          aqi: air.list[0].main.aqi,
          humidity: weather.main.humidity,
        });
      } catch (error) {
        console.error("Failed to fetch regional stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionalData();
  }, [city.lat, city.lon]);

  if (loading)
    return <div className="h-64 animate-pulse bg-white/5 rounded-[3rem]" />;

  const isDark = theme === "dark";

  return (
    <div className="p-8 space-y-6">
      <div>
        <h3
          className={`text-2xl font-black transition-colors duration-500 ${isDark ? "text-white" : "text-nature-950"}`}
        >
          {city.name}
        </h3>
        <p
          className={`text-sm font-bold uppercase tracking-widest opacity-50 ${
            isDark ? "text-white" : "text-slate-500"
          }`}
        >
          {city.state}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <EcoMetric
          label="Temp"
          value={`${data?.temp ?? "--"}°C`}
          icon="🌡️"
          theme={theme}
        />
        <EcoMetric
          label="AQI Index"
          value={data?.aqi ?? "--"}
          icon="🍃"
          theme={theme}
        />
        <EcoMetric
          label="Humidity"
          value={`${data?.humidity ?? "--"}%`}
          icon="💧"
          theme={theme}
        />
        <EcoMetric
          label="Sky"
          value={data?.condition ?? "--"}
          icon="☁️"
          theme={theme}
        />
      </div>

      <div
        className={`pt-4 border-t ${
          isDark ? "border-white/10" : "border-nature-500/10"
        }`}
      >
        <div className="flex justify-between items-center">
          <span
            className={`text-xs font-bold opacity-50 ${
              isDark ? "text-white" : "text-slate-400"
            }`}
          >
            AIR QUALITY
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
              data?.aqi <= 2
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-orange-500/20 text-orange-400"
            }`}
          >
            Level {data?.aqi || 1}
          </span>
        </div>
      </div>
    </div>
  );
}
