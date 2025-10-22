export default function Loading() {
  return (
    <main className="wrapper px-4 py-8 space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="h-8 w-48 rounded bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-64 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-flow-col gap-3">
          <div className="h-11 w-56 rounded-xl bg-slate-200 animate-pulse" />
          <div className="h-11 w-52 rounded-xl bg-slate-200 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="h-40 w-full rounded-xl bg-slate-200 animate-pulse" />
            <div className="mt-3 space-y-2">
              <div className="h-5 w-3/4 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
            </div>
            <div className="mt-4 h-9 w-full rounded-lg bg-slate-200 animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}
