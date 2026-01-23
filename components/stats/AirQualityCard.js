
/**
 * AirQualityCard Component
 * 
 * This component displays the real-time Air Quality Index (AQI) for a specific city.
 * It provides a visual and textual representation of atmospheric conditions and their
 * health implications for the population.
 * 
 * AQI Levels (1-5):
 * 1. Optimal (success - green): Minimal health risk
 * 2. Satisfactory (success - green): Minor risk for sensitive groups only
 * 3. Degraded (warning - amber): Outdoor exertion should be limited
 * 4. Unhealthy (danger - red): General population experiences effects
 * 5. Critical (danger - red): Emergency conditions affecting everyone
 * 
 * Props:
 * @param {Number} aqi - Air Quality Index value (1-5) from OpenWeather API
 * @param {String} city - City name to display (usually capital city)
 * @param {String} theme - Visual theme ("dark" or "light") for text color adaptation
 * 
 * Visual Components:
 * - Header: City name and real-time air quality label
 * - Badge: Colored status label (Optimal, Satisfactory, Degraded, Unhealthy, Critical)
 * - AQI Number: Large circular display showing the numeric AQI value with color coding
 * - Description: Italicized explanation of what the AQI level means for health
 * 
 * Color Scheme:
 * - Danger (4-5): Red with red-tinted background
 * - Warning (3): Amber/orange with amber-tinted background
 * - Success (1-2): Emerald/green with green-tinted background
 * 
 * Theme Awareness:
 * - Text colors adapt based on "dark" or "light" theme prop
 * - Dark theme: White text with opacity variations
 * - Light theme: Nature-950/slate text colors
 * - Uses smooth transitions when theme changes
 * 
 * This card is typically displayed in the country detail page's capital metrics section
 * to help users understand atmospheric quality at a glance.
 */

import Badge from "../ui/Badge";

export default function AirQualityCard({ aqi, city, theme }) {
  const aqiConfig = {
    1: {
      label: "Optimal",
      variant: "success",
      desc: "Atmospheric conditions are optimal; air quality presents minimal to no health risk to the general population.",
    },

    2: {
      label: "Satisfactory",
      variant: "success",
      desc: "Air quality is considered satisfactory; however, certain pollutants may pose a minor risk to highly sensitive individuals.",
    },

    3: {
      label: "Degraded",
      variant: "warning",
      desc: "Atmospheric degradation detected. Members of sensitive groups may experience minor health effects; outdoor exertion should be limited.",
    },

    4: {
      label: "Unhealthy",
      variant: "danger",
      desc: "Adverse air quality conditions. The general population is likely to experience physiological effects; prolonged outdoor exposure is discouraged.",
    },

    5: {
      label: "Critical",
      variant: "danger",
      desc: "Severe atmospheric contamination. Health alert level reached; emergency conditions may occur, affecting all individuals regardless of sensitivity.",
    },
  };
  const status = aqiConfig[aqi] || aqiConfig[1];

  // Dynamic Text Colors based on the theme sent by CountryClientView
  const mainTextColor = theme === "dark" ? "text-white" : "text-nature-950";
  const secondaryTextColor =
    theme === "dark" ? "text-white/60" : "text-slate-400";
  const descTextColor = theme === "dark" ? "text-white/80" : "text-slate-600";

  return (
    <div
      className={`glass-card p-6 border-l-4 transition-all duration-500 ${
        status.variant === "danger"
          ? "border-red-500 bg-red-500/10"
          : status.variant === "warning"
            ? "border-amber-500 bg-amber-500/10"
            : "border-emerald-500 bg-emerald-500/10"
      }`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4
            className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${secondaryTextColor}`}
          >
            Real-Time Air Quality
          </h4>
          <p
            className={`text-2xl font-display font-black transition-colors duration-500 ${mainTextColor}`}
          >
            {city}
          </p>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="flex items-center gap-6">
        <div
          className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg transition-transform duration-500 ${
            status.variant === "danger"
              ? "bg-red-500 shadow-red-900/20"
              : status.variant === "warning"
                ? "bg-amber-500 shadow-amber-900/20"
                : "bg-emerald-500 shadow-emerald-900/20"
          }`}
        >
          {aqi}
        </div>

        <div className="flex-1">
          <p
            className={`text-sm leading-relaxed font-medium italic transition-colors duration-500 ${descTextColor}`}
          >
            "{status.desc}"
          </p>
        </div>
      </div>
    </div>
  );
}
