export default function EcoMetric({ label, value, unit, trend, icon }) {
  const isPositive = trend > 0;

  return (
    <div className="glass-card p-4 flex flex-col justify-between min-h-30">
      <div className="flex justify-between items-start">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-display font-bold text-nature-950">{value}</span>
          <span className="text-slate-400 text-xs font-medium">{unit}</span>
        </div>
      </div>
    </div>
  );
}