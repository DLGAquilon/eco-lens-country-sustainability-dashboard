export default function EcoMetric({ label, value, unit, trend, icon }) {
  const isTrendBad = trend > 0; 

  return (
    <div className="glass-card p-4 flex flex-col justify-between min-h-35 hover:border-nature-500/30 transition-colors">
      <div className="flex justify-between items-start">
        <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${
            isTrendBad 
              ? 'bg-red-50 text-red-600 border-red-100' 
              : 'bg-emerald-50 text-emerald-600 border-emerald-100'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold text-nature-950 tracking-tight">{value}</span>
          {unit && <span className="text-slate-400 text-[10px] font-bold uppercase">{unit}</span>}
        </div>
      </div>
    </div>
  );
}