export default function AirQualityCard({ aqi, city }) {
  // OpenWeather AQI levels: 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
  const aqiConfig = {
    1: { label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500", desc: "Air is clean and poses little risk." },
    2: { label: "Fair", color: "text-green-400", bg: "bg-green-400", desc: "Quality is acceptable for most." },
    3: { label: "Moderate", color: "text-nature-accent", bg: "bg-nature-accent", desc: "Sensitive groups should limit outdoor time." },
    4: { label: "Poor", color: "text-orange-500", bg: "bg-orange-500", desc: "Health effects may be felt by everyone." },
    5: { label: "Very Poor", color: "text-red-600", bg: "bg-red-600", desc: "Health alert: everyone may experience effects." }
  };

  const status = aqiConfig[aqi] || aqiConfig[1];

  return (
    <div className="glass-card overflow-hidden border-l-4 border-l-current" style={{ borderLeftColor: `var(--${status.bg})` }}>
      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-display font-bold text-slate-900">Local Air Quality</h4>
          <span className={`text-xs font-black uppercase tracking-widest ${status.color}`}>
            {status.label}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${status.bg}`}>
            {aqi}
          </div>
          <div>
            <p className="text-sm font-bold text-nature-950">{city}</p>
            <p className="text-xs text-slate-500 italic">Index Level</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
          {status.desc}
        </p>
      </div>
    </div>
  );
}