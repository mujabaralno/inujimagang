import Link from "next/link";
import { getFacilities } from "@/actions/facility.actions";
import { FacilityGridSkeleton } from "./FacilitySkeleton";
import FacilityCardUser from "./FacilityCardUser";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function FacilitySection() {
  // Biar skeleton kelihatan 1 detik
  await sleep(1000);

  const facilities = await getFacilities();

  if (!facilities || facilities.length === 0) {
    return (
      <section className="wrapper px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Belum ada fasilitas</h2>
          <p className="text-sm text-slate-600">
            Admin dapat menambahkan fasilitas dari dashboard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="wrapper px-4 py-8 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Fasilitas Populer</h2>
          <p className="text-sm text-slate-600">Beberapa fasilitas yang tersedia saat ini</p>
        </div>
        <Link
          href="/facility"
          className="text-sm font-semibold text-indigo-700 hover:underline"
        >
          Lihat semua →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.slice(0, 6).map((f) => (
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
    </section>
  );
}

// Fallback untuk Suspense (kalau mau dipakai di page)
export function FacilitySectionFallback() {
  return (
    <section className="wrapper px-4 py-8 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="h-7 w-48 rounded bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-56 rounded bg-slate-200 animate-pulse" />
        </div>
        <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
      </div>
      <FacilityGridSkeleton count={6} />
    </section>
  );
}
