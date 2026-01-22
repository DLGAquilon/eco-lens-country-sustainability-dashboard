"use client";

import { useEffect } from "react";
import Link from "next/link";
import LiveClock from "@/components/stats/LiveClock";
import ScoreGauge from "@/components/stats/ScoreGauge";
import AirQualityCard from "@/components/stats/AirQualityCard";
import EcoMetric from "@/components/stats/EcoMetric";
import { useTheme } from "@/context/ThemeContext";

export default function CountryClientView({
  country,
  airData,
  weatherData,
  sustainabilityScore,
}) {
  // Use the global toggleTheme function to ensure 
  // the clock updates the WHOLE app, not just this page.
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen transition-all duration-1000">
      <div className="max-w-7xl mx-auto px-6 space-y-12 pb-20 pt-10">
        {/* 1. Navigation - Updated to use theme variables */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-foreground text-background hover:opacity-90 transition-all font-bold text-sm shadow-xl active:scale-95"
        >
          ← Return to Dashboard
        </Link>

        {/* 2. Hero Identity Section */}
        <section className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
            <img
              src={country.flag}
              alt={`${country.name} Flag`}
              className="w-48 h-32 md:w-64 md:h-44 object-cover rounded-[2.5rem] shadow-2xl ring-8 ring-white/10"
            />
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-foreground">
                {country.name}
              </h1>
              {weatherData && (
                <LiveClock
                  timezoneOffset={weatherData.timezone}
                  cityName={country.capital}
                  // This ensures the clock updates the Global Theme Context
                  onThemeChange={(newTheme) => toggleTheme(newTheme)}
                />
              )}
            </div>
          </div>

          {/* Gauge Section */}
          <div className="p-10 rounded-[3.5rem] bg-card backdrop-blur-xl shadow-2xl border border-border-eco">
            <ScoreGauge score={Math.round(sustainabilityScore)} theme={theme} />
          </div>
        </section>

        {/* 3. Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <div className="h-full p-2 rounded-[3rem] backdrop-blur-md">
              <AirQualityCard
                aqi={airData?.main?.aqi}
                city={country.capital}
                theme={theme}
              />
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {weatherData ? (
              <>
                <div className="p-6 rounded-[2.5rem] bg-card border border-border-eco backdrop-blur-md shadow-md">
                  <EcoMetric
                    label="Temperature"
                    value={`${Math.round(weatherData.main.temp)}°C`}
                    icon="🌡️"
                  />
                </div>
                <div className="p-6 rounded-[2.5rem] bg-card border border-border-eco backdrop-blur-md shadow-md">
                  <EcoMetric
                    label="Humidity"
                    value={`${weatherData.main.humidity}%`}
                    icon="💧"
                  />
                </div>
                <div className="p-6 rounded-[2.5rem] bg-card border border-border-eco backdrop-blur-md shadow-md">
                  <EcoMetric
                    label="Wind Speed"
                    value={`${weatherData.wind.speed} m/s`}
                    icon="💨"
                  />
                </div>
                <div className="p-6 rounded-[2.5rem] bg-card border border-border-eco backdrop-blur-md shadow-md">
                  <EcoMetric
                    label="Condition"
                    value={weatherData.weather[0].main}
                    icon="☁️"
                  />
                </div>
              </>
            ) : (
              <div className="col-span-2 p-10 rounded-[2.5rem] bg-card border border-dashed border-border-eco flex items-center justify-center text-foreground opacity-50 italic">
                Weather systems offline
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}