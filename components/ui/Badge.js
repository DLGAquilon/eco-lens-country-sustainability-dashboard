export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-nature-500/10 text-nature-500 border-nature-500/20",
    accent: "bg-nature-accent/10 text-nature-accent border-nature-accent/20",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[variant]}`}>
      {children}
    </span>
  );
}