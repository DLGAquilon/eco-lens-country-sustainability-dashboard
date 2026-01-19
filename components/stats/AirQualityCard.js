import Badge from "../ui/Badge";

export default function AirQualityCard({ aqi, city }) {
  const aqiConfig = {
    1: { label: "Excellent", variant: "success", desc: "Air is clean and poses little risk." },
    2: { label: "Fair", variant: "success", desc: "Air quality is acceptable for most." },
    3: { label: "Moderate", variant: "warning", desc: "Sensitive groups should limit outdoor time." },
    4: { label: "Poor", variant: "danger", desc: "Health effects may be felt by everyone." },
    5: { label: "Very Poor", variant: "danger", desc: "Health alert: everyone may experience effects." }
  };

  const status = aqiConfig[aqi] || aqiConfig[1];

  return (
    <div className={`glass-card p-6 border-l-4 transition-all duration-500 ${
      status.variant === 'danger' ? 'border-red-500 bg-red-50/30' : 
      status.variant === 'warning' ? 'border-amber-500 bg-amber-50/30' : 'border-emerald-500'
    }`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
            Real-Time Air Quality
          </h4>
          <p className="text-2xl font-display font-black text-nature-950">{city}</p>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="flex items-center gap-6">
        {/* Visual AQI Number Circle */}
        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg ${
          status.variant === 'danger' ? 'bg-red-500 shadow-red-200' : 
          status.variant === 'warning' ? 'bg-amber-500 shadow-amber-200' : 'bg-emerald-500 shadow-emerald-200'
        }`}>
          {aqi}
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-slate-600 leading-relaxed font-medium italic">
            "{status.desc}"
          </p>
        </div>
      </div>
    </div>
  );
}