export default function Button({ children, onClick, variant = "primary" }) {
  const baseStyles = "px-6 py-2.5 rounded-xl font-semibold transition-all active:scale-95 text-sm";
  
  const variants = {
    primary: "bg-foreground text-background hover:opacity-90 shadow-sm",
    outline: "border-2 border-nature-500 text-nature-500 hover:bg-nature-500 hover:text-background",
    ghost: "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
  };

  return <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>{children}</button>;
}