"use client";
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
