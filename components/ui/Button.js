/**
 * Button Component
 * 
 * A reusable button component with multiple style variants.
 * Used in CountryCard.js for the "View Analytics" action button.
 * 
 * Props:
 * @param {ReactNode} children - Button text/content
 * @param {Function} onClick - Click event handler
 * @param {String} variant - Style variant: "primary" (default), "outline", "ghost"
 * 
 * Variants:
 * - primary: Dark background with light text, hover opacity reduction
 * - outline: Transparent with border, hover fill animation
 * - ghost: Subtle text styling, hover background tint
 * 
 * Base Styles:
 * - Padding: 6 horizontal (24px), 2.5 vertical (10px)
 * - Rounded corners: xl
 * - Font: semibold, small size
 * - Transition: all properties smoothly
 * - Active state: scales down 95% (press feedback)
 * 
 * Location: CountryCard.js (navigation to country details)
 */

export default function Button({ children, onClick, variant = "primary" }) {
  const baseStyles = "px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95 text-sm";
  
  const variants = {
    primary: "bg-foreground text-background hover:opacity-90 shadow-sm",
    outline: "border-2 border-nature-500 text-nature-500 hover:bg-nature-500 hover:text-background",
    ghost: "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
  };

  return <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>{children}</button>;
}