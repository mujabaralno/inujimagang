import { Suspense } from "react";
import { getFacilities } from "@/actions/facility.actions";
import FacilityCardUser from "@/components/shared/FacilityCardUser";

export default async function FacilityCardSection() {
  const facilities = await getFacilities();

  return (
    <div className="wrapper space-y-6 px-4 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Fasilitas</h1>
          <p className="text-sm text-slate-600">
            Fasilitas yang kami miliki
          </p>
        </div>

      </div>

      <Suspense fallback={<GridSkeleton />}>
        {facilities.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.slice(0, 3).map((f) => (
              <FacilityCardUser
                key={f.id}
                id={f.id}
                name={f.name}
                photoUrl={f.photoUrl}
                addressText={f.addressText}
                capacity={f.capacity}
                status={f.status}
              />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-2xl bg-slate-100"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
      <p className="text-slate-700">Belum ada fasilitas.</p>
      <p className="text-sm text-slate-500">
        Klik tombol &quot;Tambah Fasilitas&quot; untuk membuat yang pertama.
      </p>
    </div>
  );
}
