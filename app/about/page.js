export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-display font-black text-nature-950">Our Mission</h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          EcoLens was built to democratize environmental data, turning complex API numbers into actionable insights.
        </p>
      </section>

      <div className="grid gap-8">
        <div className="glass-card p-8 space-y-4">
          <h2 className="text-2xl font-bold text-nature-950 italic underline decoration-nature-500">The Eco-Score Formula</h2>
          <p className="text-slate-600 leading-relaxed">
            Our proprietary algorithm analyzes real-time Air Quality (AQI) from OpenWeather and cross-references it with national population density. 
          </p>
          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-sm">
            Score = 100 - (AQI * 12) - (Population / 200M)
          </div>
        </div>
      </div>
    </div>
  );
}