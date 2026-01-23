/**
 * Loading components if fetching of data becomes too long.
 *
 */

export default function LoadingCountry() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-6 w-32 bg-slate-200 rounded" />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 h-64 bg-slate-200 rounded-2xl" />
        <div className="flex-1 space-y-4">
          <div className="h-12 w-3/4 bg-slate-200 rounded" />
          <div className="h-6 w-1/2 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-64 bg-slate-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-32 bg-slate-200 rounded-2xl" />
          <div className="h-32 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}