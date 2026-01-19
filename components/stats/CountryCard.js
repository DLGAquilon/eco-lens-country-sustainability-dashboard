import { formatNumber } from "@/lib/utils";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function CountryCard({ country }) {
  const { name, flag, capital, region, population } = country;

  return (
    <div className="glass-card group overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-nature-500/10 transition-all duration-300">
      {/* Flag Section */}
      <div className="relative h-44 w-full overflow-hidden">
        <img 
          src={flag} 
          alt={`${name} flag`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={region === "Europe" ? "default" : "accent"}>
            {region}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="font-display font-bold text-xl text-nature-950 truncate">
            {name}
          </h3>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            <span className="opacity-70">📍</span> {capital || "No Capital"}
          </p>
        </div>

        {/* Data Points */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-nature-500/5 mb-5">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Population</p>
            <p className="font-semibold text-nature-900">{formatNumber(population)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Eco-Risk</p>
            <p className="font-semibold text-emerald-600">Low</p> 
          </div>
        </div>

        {/* Action */}
        <div className="mt-auto">
          <Button className="w-full justify-center text-xs py-2">
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
}