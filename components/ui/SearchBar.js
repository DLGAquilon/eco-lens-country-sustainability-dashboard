export default function SearchBar({ onSearch }) {
  return (
    <div className="glass-card flex items-center gap-3 px-4 py-2 w-full max-w-md border-emerald-500/20">
      <span className="text-xl">🔍</span>
      <input 
        type="text" 
        placeholder="Search countries or capitals..." 
        className="bg-transparent border-none outline-none w-full text-sm font-medium"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}