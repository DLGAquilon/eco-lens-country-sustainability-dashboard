import PageTransition from "@/components/layout/PageTransitions";

export default function About() {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
        <section className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-display font-black text-nature-950 tracking-tight">
            Engineering a{" "}
            <span className="text-nature-500 italic">Greener</span> Future.
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            EcoLens is an open-source initiative designed to transform raw
            environmental data into human-readable sustainability metrics.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card p-8 border-l-4 border-nature-500">
            <h3 className="font-display text-xl font-bold text-nature-950 mb-4">
              The Data Engine
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We aggregate data from the <strong>REST Countries API</strong> and
              <strong> OpenWeather Air Quality</strong> index to provide a
              holistic view of a nation's environmental footprint.
            </p>
          </div>

          <div className="glass-card p-8 border-l-4 border-nature-accent">
            <h3 className="font-display text-xl font-bold text-nature-950 mb-4">
              The Eco-Score
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Our proprietary calculation scales air quality against population
              density:
            </p>
            <code className="block bg-slate-900 text-nature-400 p-3 rounded-lg text-xs font-mono">
              Score = 100 - (AQI × 12) - (Pop / 200M)
            </code>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
