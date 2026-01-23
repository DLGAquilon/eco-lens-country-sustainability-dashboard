/**
 * Badge Component
 * 
 * A simple, reusable UI component for displaying labeled status badges or tags.
 * Used throughout the app for highlighting categorical information.
 * 
 * Props:
 * @param {ReactNode} children - Text or content to display inside the badge
 * @param {String} variant - Style variant: "default", "accent", "danger", "warning", "success"
 * 
 * Variants:
 * - default: Green (nature-500) background with nature color theme
 * - accent: Accent color variant (nature-accent) 
 * - danger: Red background with pulse animation for alerts
 * - warning: Amber/orange for cautionary information
 * - success: Emerald/green for positive status
 * 
 * Styling:
 * - Rounded pill shape (rounded-full)
 * - Bold uppercase text with letter spacing
 * - Semi-transparent background with matching border
 * - Compact padding (px-2 py-0.5)
 * 
 * USAGE IN APP (CONFIRMED):
 * ✓ LandingClient.js - "Tracking 250+ Jurisdictions" badge on hero section
 * ✓ AirQualityCard.js - Air quality status badges (Optimal, Satisfactory, Degraded, etc.)
 * ✓ CountryCard.js - Region badges (shows continent/region name)
 * 
 * The Badge component is actively used 3+ times across the application for
 * displaying status information, tags, and categorical labels.
 */

export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-nature-500/10 text-nature-500 border-nature-500/20",
    accent: "bg-nature-accent/10 text-nature-accent border-nature-accent/20",
    danger: "bg-red-500/10 text-red-600 border-red-500/20 animate-pulse",
    warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[12px] font-bold uppercase tracking-wider border ${styles[variant]}`}>
      {children}
    </span>
  );
}