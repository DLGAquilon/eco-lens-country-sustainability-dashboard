export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-nature-500/10 text-nature-500 border-nature-500/20",
    accent: "bg-nature-accent/10 text-nature-accent border-nature-accent/20",
    danger: "bg-red-500/10 text-red-600 border-red-500/20 animate-pulse",
    warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[variant]}`}>
      {children}
    </span>
  );
}