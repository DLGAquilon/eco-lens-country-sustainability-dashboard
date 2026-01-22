import Badge from "../ui/Badge";

export default function AirQualityCard({ aqi, city }) {
  const aqiConfig = {
    1: { 
      label: "Optimal", 
      variant: "success", 
      desc: "Atmospheric conditions are optimal; air quality presents minimal to no health risk to the general population." 
    },
    2: { 
      label: "Satisfactory", 
      variant: "success", 
      desc: "Air quality is considered satisfactory; however, certain pollutants may pose a minor risk to highly sensitive individuals." 
    },
    3: { 
      label: "Degraded", 
      variant: "warning", 
      desc: "Atmospheric degradation detected. Members of sensitive groups may experience minor health effects; outdoor exertion should be limited." 
    },
    4: { 
      label: "Unhealthy", 
      variant: "danger", 
      desc: "Adverse air quality conditions. The general population is likely to experience physiological effects; prolonged outdoor exposure is discouraged." 
    },
    5: { 
      label: "Critical", 
      variant: "danger", 
      desc: "Severe atmospheric contamination. Health alert level reached; emergency conditions may occur, affecting all individuals regardless of sensitivity." 
    }
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