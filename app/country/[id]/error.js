'use client';

/**
 * A fallback error page if data connections are interrupted
 * Or API couldn't connect to the server
 *   
 */ 


export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="text-6xl">📡</div>
      <h2 className="text-2xl font-black text-nature-950 tracking-tight">
        Data Connection Interrupted
      </h2>
      <p className="text-slate-500 max-w-xs">
        We couldn't reach the environmental servers. This might be a temporary API outage.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-nature-950 text-white rounded-2xl font-bold hover:scale-105 transition-transform"
      >
        Retry Connection
      </button>
    </div>
  );
}