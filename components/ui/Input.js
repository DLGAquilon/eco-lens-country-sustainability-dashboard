/**
 * Input Component
 *
 * A styled input field component with nature-themed styling and focus effects.
 * Used in CountryList.js for the search input.
 * 
 * Features:
 * - Rounded corners (rounded-xl)
 * - Glass-morphism styling with semi-transparent white background
 * - Nature-500 border color with reduced opacity
 * - Focus ring effect (2px emerald ring with offset)
 * - Smooth transitions (200ms)
 * - Disabled state styling (opacity reduction)
 * - Accepts all standard HTML input props via spread operator
 * 
 * Usage:
 * <Input placeholder="Search country or region..." value={query} onChange={handleChange} />
 * 
 * Styling Highlights:
 * - Uses cn() utility to merge custom and default classes
 * - Focus-visible ring: nature-500 color with 2px offset
 * - Height: 10 (40px)
 * - Padding: 4px horizontal, 8px vertical
 * - File input styling: transparent border/background
 * 
 * Location: CountryList.js (search functionality on dashboard)
 */

import { cn } from "@/lib/utils";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-xl border border-nature-500/20 bg-white/50 px-4 py-2",
        "text-sm ring-offset-white file:border-0 file:bg-transparent",
        "placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-nature-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200 glass-card",
        className
      )}
      {...props}
    />
  );
}