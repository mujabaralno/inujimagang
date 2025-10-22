export function FacilityCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="h-40 w-full rounded-xl bg-slate-200 animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-5 w-3/4 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-slate-200 animate-pulse" />
      </div>
      <div className="mt-4 h-9 w-full rounded-lg bg-slate-200 animate-pulse" />
    </div>
  );
}

export function FacilityGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <FacilityCardSkeleton key={i} />
      ))}
    </div>
  );
}
