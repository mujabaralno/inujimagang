import { Suspense } from "react";
import { getFacilities } from "@/actions/facility.actions";
import FacilityCard from "@/components/shared/FacilityCard";
import { Plus, Layers, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function AllFacilityPage() {
  const facilities = await getFacilities();

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white px-4 py-10 space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
            <Layers className="h-3.5 w-3.5" />
            Manajemen Fasilitas
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Semua Fasilitas
          </h1>
          <p className="text-slate-600 leading-relaxed">
            Kelola data fasilitas umum dan pantau ketersediaannya di seluruh wilayah Garut.
          </p>
        </div>

        {/* Add Facility Button */}
        <Link
          href="/dashboard/create-facility"
          className="inline-flex items-center gap-2 h-12 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 px-6 font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" />
          Tambah Fasilitas
        </Link>
      </header>

      {/* Facilities Section */}
      <Suspense fallback={<GridSkeleton />}>
        {facilities.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-8">
            {facilities.map((f) => (
              <FacilityCard
                key={f.id}
                id={f.id}
                name={f.name}
                photoUrl={f.photoUrl}
                addressText={f.addressText}
                capacity={f.capacity}
                status={f.status}
              />
            ))}
          </section>
        )}
      </Suspense>
    </main>
  );
}

/* Enhanced Skeleton Loader */
export  function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-44 w-full animate-pulse bg-linear-to-r from-slate-100 via-slate-50 to-slate-100 bg-size-[200%_100%]">
          </div>
          <div className="p-5 space-y-3">
            <div className="h-5 w-3/4 rounded-md bg-slate-100 animate-pulse" />
            <div className="h-4 w-2/3 rounded-md bg-slate-100 animate-pulse" />
            <div className="mt-4 h-9 w-28 rounded-xl bg-slate-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Refined Empty State */
export function EmptyState() {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-linear-to-br from-slate-50 via-white to-slate-50 p-16 text-center shadow-inner">
      {/* Soft Background Blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-40 w-40 bg-indigo-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-40 w-40 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-indigo-50 to-blue-50 shadow-sm mb-6">
        <Sparkles className="h-10 w-10 text-indigo-600" />
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Belum Ada Fasilitas
      </h2>
      <p className="text-slate-600 mb-6 max-w-md leading-relaxed">
        Kamu belum menambahkan fasilitas apapun. Klik tombol di atas untuk membuat fasilitas baru dan mulai mengelola datanya.
      </p>
      <Link
        href="/dashboard/create-facility"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all active:scale-[0.98]"
      >
        <Plus className="h-4 w-4" />
        Tambah Fasilitas Sekarang
      </Link>
    </div>
  );
}
