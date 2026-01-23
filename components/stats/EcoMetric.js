/**
 * EcoMetric Component
 * 
 * This component is a small, reusable metric display unit that shows a single
 * environmental or weather measurement with optional trend indicators.
 * Used extensively on the country detail page to display weather and climate data.
 * 
 * Props:
 * @param {String} label - The name of the metric (e.g., "Temperature", "Humidity")
 * @param {String|Number} value - The current metric value to display
 * @param {String} unit - Optional unit of measurement (e.g., "°C", "%", "m/s")
 * @param {Number} trend - Optional percentage change (positive = increasing/bad, negative = decreasing/good)
 * @param {String} icon - Emoji or icon to visually represent the metric
 * @param {String} theme - Visual theme ("dark" or "light") for text color adaptation
 * 
 * Visual Layout:
 * - Top Row: Icon in rounded box + optional trend badge
 * - Bottom Row: Label (small uppercase) + Value (large bold) + Unit (small)
 * 
 * Trend Indicator:
 * - Shows percentage change with arrow (↑ for increase, ↓ for decrease)
 * - Red styling (danger) if trend > 0 (metric is increasing, which is bad)
 * - Green styling (success) if trend < 0 (metric is decreasing, which is good)
 * - Only displays if trend prop is provided
 * 
 * Theme Awareness:
 * - Dark theme: White text with opacity, subtle background for icon
 * - Light theme: Nature/slate colors for better contrast on light backgrounds
 * - Uses smooth transitions when theme changes
 * 
 * Typical Usage:
 * - Displayed in 2x2 grid on country detail pages
 * - Shows metrics like Temperature, Humidity, Wind Speed, Weather Condition
 * - Can also display other eco-metrics or environmental indicators
 * 
 * The compact size and reusable design makes this ideal for dashboards
 * where multiple metrics need to be displayed efficiently.
 */

export default function EcoMetric({ label, value, unit, trend, icon, theme }) { 
  const isTrendBad = trend > 0; 
  
  // Dynamic styles based on theme
  const iconBg = theme === 'dark' ? 'bg-white/10' : 'bg-slate-50';
  const labelColor = theme === 'dark' ? 'text-white/50' : 'text-slate-400';
  const valueColor = theme === 'dark' ? 'text-white' : 'text-nature-950';

  return (
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