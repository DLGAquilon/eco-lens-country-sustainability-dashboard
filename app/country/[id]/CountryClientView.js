
"use client";

/**
 * CountryClientView Component
 * 
 * This is the main client-side component for displaying detailed country sustainability data.
 * It serves as a dynamic single-country dashboard that provides comprehensive environmental
 * and climatic information about a specific nation.
 * 
 * Key Features:
 * - Dynamic Temporal Styling: The page background and component styles change based on the local
 *   time of the capital city (sunrise, day, sunset, night modes) for an immersive experience
 * - Eco-Score Gauge: Displays the country's sustainability score with visual feedback
 * - Capital City Metrics: Shows real-time air quality, temperature, humidity, wind speed, and weather
 * - Regional Breakdown: Fetches and displays environmental data for major cities and provinces
 * - Regional Data Fallback: Uses pre-configured major hubs or API-fetched cities as fallback
 * 
 * Props:
 * @param {Object} country - Country data including name, flag, capital, and location codes
 * @param {Object} airData - Air quality index data from OpenWeather API
 * @param {Object} weatherData - Weather data including temperature, timezone, humidity, wind speed
 * @param {Number} sustainabilityScore - Calculated sustainability score (0-100)
 * 
 * State Management:
 * - provinces: Array of regional cities for the regional breakdown section
 * - loadingRegions: Loading state for regional data fetching
 * 
 * The component uses Framer Motion for animations and responsive grid layouts to adapt
 * across mobile, tablet, and desktop viewports.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import LiveClock from "@/components/stats/LiveClock";
import ScoreGauge from "@/components/stats/ScoreGauge";
import AirQualityCard from "@/components/stats/AirQualityCard";
import EcoMetric from "@/components/stats/EcoMetric";
import { useTheme } from "@/context/ThemeContext";
import RegionalMetricCard from "@/components/stats/RegionalMetricCard";
import { fetchMajorCities } from "@/lib/api-client";
import { MAJOR_HUBS } from "@/lib/regional-data";

export default function CountryClientView({
  country,
  airData,
  weatherData,
  sustainabilityScore,
}) {
  const { theme, toggleTheme } = useTheme();
  const [provinces, setProvinces] = useState([]);
  const [loadingRegions, setLoadingRegions] = useState(true);

  useEffect(() => {
    const getRegionalHubs = async () => {
      if (!country?.name) return;
      setLoadingRegions(true);
      try {
        const staticCities = MAJOR_HUBS[country.name];
        if (staticCities && staticCities.length > 0) {
          setProvinces(staticCities);
        } else {
          const code = country.cca2 || country.alpha2Code || "";
          const apiCities = await fetchMajorCities(country.name, code);
          setProvinces(apiCities);
        }
      } catch (error) {
        console.error("Regional fetch failed:", error);
      } finally {
        setLoadingRegions(false);
      }
    };
    getRegionalHubs();
  }, [country.name, country.cca2]);

  const getTemporalStyles = (weatherData) => {
    if (!weatherData)
      return {
        bg: "bg-background",
        card: "bg-card border-border-eco",
        button: "bg-foreground text-background",
        text: "text-foreground",
      };

    const utcTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(utcTime + weatherData.timezone * 1000);
    const hour = localDate.getHours();

    // SUNRISE (5 AM - 8 AM)
    if (hour >= 5 && hour < 9) {
      return {
        mode: "sunrise",
        bg: "bg-gradient-to-br from-orange-200 via-rose-100 to-amber-50",
        card: "bg-white/60 backdrop-blur-md border-orange-200/50 shadow-lg shadow-orange-100",
        button: "bg-orange-600 text-white shadow-orange-200",
        text: "text-orange-950",
        accent: "border-orange-200",
      };
    }

    // DAY (9 AM - 5 PM)
    if (hour >= 9 && hour < 17) {
      return {
        mode: "day",
        bg: "bg-[#f0fdf4]", 
        card: "bg-white/70 backdrop-blur-md border-[rgba(5,150,105,0.1)]",
        button: "bg-[#022c22] text-[#f0fdf4]",
        text: "text-[#022c22]",
        accent: "border-[rgba(5,150,105,0.1)]",
      };
    }

    // SUNSET (5 PM - 8 PM)
    if (hour >= 17 && hour < 20) {
      return {
        mode: "sunset",
        bg: "bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400",
        card: "bg-indigo-900/40 backdrop-blur-xl border-white/20 text-white",
        button: "bg-pink-500 text-white shadow-pink-500/40",
        text: "text-white",
        accent: "border-pink-300/30",
      };
    }

    // NIGHT (8 PM - 4 AM)
    return {
      mode: "night",
      bg: "bg-[#0a0f1e]",
      card: "bg-[#161d31]/60 backdrop-blur-2xl border-white/10 shadow-2xl",
      button: "bg-[#f1f5f9] text-[#0a0f1e]",
      text: "text-[#f1f5f9]",
      accent: "border-white/10",
    };
  };

  const styles = getTemporalStyles(weatherData);

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden transition-all duration-1000 ${styles.bg} ${styles.text}`}
    >
      <div className="max-w-7xl mx-auto px-6 space-y-12 pb-20 pt-28">
        {/* 1. Navigation */}
        <Link
          href="/"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl transition-all font-bold text-sm shadow-xl active:scale-95 ${styles.button}`}
        >
          ← Return to Dashboard
        </Link>

        {/* 2. Hero Identity Section */}
        <section className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
            <img
              src={country.flag}
              alt={`${country.name} Flag`}
              className={`w-48 h-32 md:w-64 md:h-44 object-cover rounded-[2.5rem] shadow-2xl ring-8 ${styles.mode === "night" ? "ring-white/5" : "ring-black/5"}`}
            />
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter">
                {country.name}
              </h1>
              {weatherData && (
                <LiveClock
                  timezoneOffset={weatherData.timezone}
                  cityName={country.capital}
                  onThemeChange={(newTheme) => toggleTheme(newTheme)}
                />
              )}
            </div>
          </div>

          <div
            className={`p-10 rounded-[3.5rem] shadow-2xl border transition-all duration-1000 ${styles.card}`}
          >
            <ScoreGauge
              score={Math.round(sustainabilityScore)}
              /* Pass the specific temporal mode instead of just 'dark'/'light' */
              temporalMode={styles.mode}
              theme={
                styles.mode === "night" || styles.mode === "sunset"
                  ? "dark"
                  : "light"
              }
            />
          </div>
        </section>

        {/* 3. Primary Capital Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <div
              className={`h-full p-2 rounded-[3rem] transition-all duration-1000 ${styles.card}`}
            >
              <AirQualityCard
                aqi={airData?.main?.aqi}
                city={`${country.capital} (Capital)`}
                theme={
                  styles.mode === "night" || styles.mode === "sunset"
                    ? "dark"
                    : "light"
                }
              />
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {weatherData ? (
              <>
                {[
                  {
                    label: "Temperature",
                    value: `${Math.round(weatherData.main.temp)}°C`,
                    icon: "🌡️",
                  },
                  {
                    label: "Humidity",
                    value: `${weatherData.main.humidity}%`,
                    icon: "💧",
                  },
                  {
                    label: "Wind Speed",
                    value: `${weatherData.wind.speed} m/s`,
                    icon: "💨",
                  },
                  {
                    label: "Condition",
                    value: weatherData.weather[0].main,
                    icon: "☁️",
                  },
                ].map((metric, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-[2.5rem] border shadow-md transition-all duration-1000 ${styles.card}`}
                  >
                    <EcoMetric
                      label={metric.label}
                      value={metric.value}
                      icon={metric.icon}
                      theme={
                        styles.mode === "night" || styles.mode === "sunset"
                          ? "dark"
                          : "light"
                      }
                    />
                  </div>
                ))}
              </>
            ) : (
              <div
                className={`col-span-2 p-10 rounded-[2.5rem] border border-dashed flex items-center justify-center opacity-50 italic ${styles.accent}`}
              >
                Weather systems offline
              </div>
            )}
          </div>
        </div>

        {/* 4. Regional Breakdown Section */}
        <section
          className={`pt-12 space-y-8 border-t transition-all duration-1000 ${styles.accent}`}
        >
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight">
              Regional Breakdown
            </h2>
            <p className="opacity-60 font-medium">
              Live environmental data across major provinces and territories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loadingRegions &&
              provinces.map((city, idx) => (
                <div
                  key={`${city.lat}-${city.lon}`}
                  className={`rounded-[3rem] transition-all duration-1000 ${styles.card} 
          shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] 
          ${styles.mode === "night" ? "shadow-black/40" : "shadow-nature-900/10"}
        `}
                >
                  <RegionalMetricCard
                    city={city}
                    theme={
                      styles.mode === "night" || styles.mode === "sunset"
                        ? "dark"
                        : "light"
                    }
                  />
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
