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