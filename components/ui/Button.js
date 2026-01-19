export default function Button({ children, onClick, className = "", variant = "primary" }) {
  const baseStyles = "px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95 text-sm";
  const variants = {
    primary: "bg-nature-500 text-white hover:bg-nature-950 shadow-sm shadow-emerald-200",
    outline: "border-2 border-nature-500 text-nature-500 hover:bg-nature-50",
    ghost: "text-slate-500 hover:bg-slate-100"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}