import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function getEcoColor(score) {
  if (score <= 1) return "text-emerald-500"; // Good
  if (score <= 3) return "text-nature-accent"; // Moderate
  return "text-red-500"; // Poor
}