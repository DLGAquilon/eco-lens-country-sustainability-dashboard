// EcoMetric.js
export default function EcoMetric({ label, value, unit, trend, icon, theme }) { // Added theme prop
  const isTrendBad = trend > 0; 
  
  // Dynamic styles based on theme
  const iconBg = theme === 'dark' ? 'bg-white/10' : 'bg-slate-50';
  const labelColor = theme === 'dark' ? 'text-white/50' : 'text-slate-400';
  const valueColor = theme === 'dark' ? 'text-white' : 'text-nature-950';

  return (
    /* Removed glass-card class because the parent in CountryClientView already provides it */
    <div className="flex flex-col justify-between min-h-35 transition-colors">
      <div className="flex justify-between items-start">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-xl shadow-inner ${iconBg}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${
            isTrendBad 
              ? 'bg-red-500/20 text-red-400 border-red-500/20' 
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <p className={`${labelColor} text-[10px] font-black uppercase tracking-widest`}>{label}</p>
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-display font-bold tracking-tight ${valueColor}`}>{value}</span>
          {unit && <span className={`${labelColor} text-[10px] font-bold uppercase`}>{unit}</span>}
        </div>
      </div>
    </div>
  );
}