"use client";

/**
 * LiveClock Component
 * 
 * This component displays a real-time clock showing the current local time and date
 * for a specific city/timezone. It also automatically detects the time of day (dawn, day,
 * dusk, evening, night) to trigger dynamic theme changes throughout the application.
 * 
 * Props:
 * @param {Number} timezoneOffset - UTC timezone offset in seconds from the OpenWeather API
 *                 (e.g., 3600 for UTC+1, -18000 for UTC-5)
 * @param {String} cityName - Name of the city to display alongside the time
 * @param {Function} onThemeChange - Callback function invoked when time of day changes theme
 *                   Receives theme string: "night", "dawn", "day", "dusk", or "evening"
 * 
 * Time-of-Day Theme Detection:
 * - night: 22:00 - 04:59 (10 PM to 4:59 AM) - Dark mode
 * - dawn: 05:00 - 06:59 (5 AM to 6:59 AM) - Sunrise styling
 * - day: 07:00 - 17:59 (7 AM to 5:59 PM) - Standard light mode
 * - dusk: 18:00 - 19:59 (6 PM to 7:59 PM) - Sunset styling
 * - evening: 20:00 - 21:59 (8 PM to 9:59 PM) - Evening styling
 * 
 * Core Functionality:
 * 1. Real-Time Updates: Updates every 1 second via setInterval
 * 2. Timezone Conversion: Converts current UTC time to city's local timezone
 *    using the timezone offset from OpenWeather
 * 3. Time Formatting: 
 *    - Time: HH:MM:SS in 24-hour format with monospace font
 *    - Date: "Mon, January 15, 2026" using Intl.DateTimeFormat
 * 4. Theme Triggering: Calls onThemeChange callback when theme detection occurs
 * 
 * Cleanup:
 * - Clears interval on component unmount to prevent memory leaks
 * - Re-subscribes if timezoneOffset or onThemeChange props change
 * 
 * Loading State:
 * - Shows animated skeleton (pulse effect) until time data is available
 * - Prevents layout shift while component initializes
 * 
 * Display Layout:
 * - Label: "Local Perspective • [City Name]"
 * - Large time: 4xl monospace bold numbers (HH:MM:SS)
 * - Date badge: Smaller text in pill-shaped container below time
 * - Responsive: Time and date stack vertically on mobile, inline on desktop
 * 
 * Usage Context:
 * - Displayed on country detail pages in the hero section
 * - Used by CountryClientView to trigger temporal styling changes
 * - Helps users understand local time in the country they're viewing
 * - Theme changes affect page background gradients and component colors
 * 
 * The LiveClock creates an immersive experience by making the page visually
 * respond to the actual time of day in the country being viewed.
 */

import { useState, useEffect } from "react";

export default function LiveClock({ timezoneOffset, cityName, onThemeChange }) {
  const [dateTime, setDateTime] = useState({ time: null, date: null });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const localTimestamp = now.getTime() + timezoneOffset * 1000;
      const localDate = new Date(localTimestamp);
      const hour = localDate.getUTCHours();

      // 1. Determine Theme based on local hour
      let theme = "day";
      if (hour >= 22 || hour < 5) theme = "night";
      else if (hour >= 5 && hour < 7) theme = "dawn";
      else if (hour >= 18 && hour < 20) theme = "dusk";
      else if (hour >= 20 && hour < 22) theme = "evening";

      if (onThemeChange) onThemeChange(theme);

      // 2. Format displays
      const timeFormatted =
        localDate.getUTCHours().toString().padStart(2, "0") +
        ":" +
        localDate.getUTCMinutes().toString().padStart(2, "0") +
        ":" +
        localDate.getUTCSeconds().toString().padStart(2, "0");

      const dateOptions = {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      };
      const dateFormatted = new Intl.DateTimeFormat(
        "en-US",
        dateOptions,
      ).format(localDate);

      setDateTime({ time: timeFormatted, date: dateFormatted });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [timezoneOffset, onThemeChange]);

  if (!dateTime.time)
    return <div className="animate-pulse h-10 w-32 bg-slate-100 rounded-xl" />;

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
          Local Perspective • {cityName}
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-3">
        <span className="text-4xl font-mono font-bold tabular-nums tracking-tight">
          {dateTime.time}
        </span>
        <span className="text-xs font-bold px-3 py-1 rounded-full border border-current opacity-70">
          {dateTime.date}
        </span>
      </div>
    </div>
  );
}
