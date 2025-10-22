import { getFacilities } from "@/actions/facility.actions";
import { FacilityGridSkeleton } from "@/components/shared/FacilitySkeleton";
import { Activity, Building2, Layers, Plus } from "lucide-react";
import { Suspense } from "react";
import { EmptyState } from "./all-facility/page";
import FacilityCard from "@/components/shared/FacilityCard";
import { getAllCategories } from "@/actions/category.actions";
import Link from "next/link";

export default async function DashboardPage() {
  const facilities = await getFacilities();
  const category = await getAllCategories();

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white p-6 md:p-10 space-y-10">
      {/* Header Section */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Dasbor Utama
          </h1>
          <p className="text-slate-600">
            Pantau aktivitas, fasilitas, dan data penting Fasum Garut dalam satu
            tempat.
          </p>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-slate-300 hover:-translate-y-1">
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 opacity-10 bg-linear-to-br from-indigo-500 to-blue-500`}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Fasilitas
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {facilities.length}
              </h2>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-400/30`}
            >
              <Building2 className="h-6 w-6" />
            </div>
          </div>
        </div>
        {/* category stats */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-slate-300 hover:-translate-y-1">
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 opacity-10 bg-linear-to-br from-emerald-500 to-teal-500`}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Category
              </p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {category.length}
              </h2>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-400/30`}
            >
              <Activity className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="w-full space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <Layers className="h-3.5 w-3.5" />
              Manajemen Fasilitas
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Semua Fasilitas
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Kelola data fasilitas umum dan pantau ketersediaannya di seluruh
              wilayah Garut.
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
        </div>
        {/* Facilities Section */}
        <Suspense fallback={<FacilityGridSkeleton />}>
          {facilities.length === 0 ? (
            <EmptyState />
          ) : (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-8">
              {facilities.slice(0, 3).map((f) => (
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
      </section>

      {/* Footer Notice */}
      <footer className="pt-6 text-center text-sm text-slate-500">
        © 2025 Fasum Garut — Data diperbarui setiap 10 menit.
      </footer>
    </main>
  );
}
