"use client";

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
    /* FIXED: Removed ${styles.card} because styles is not defined here.
       The background and padding are handled by the parent div in CountryClientView.
    */
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
