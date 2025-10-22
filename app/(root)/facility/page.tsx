/* eslint-disable @typescript-eslint/no-explicit-any */
import FilterBar from "@/components/shared/FilterBar";
import Pagination from "@/components/shared/Pagination";
import EmptyState from "@/components/shared/EmptyState";
import { listFacilities } from "@/actions/facility.actions";
import { getAllCategories } from "@/actions/category.actions";
import FacilityCardUser from "@/components/shared/FacilityCardUser";
import { Filter, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

type Props = { searchParams: { q?: string; categoryId?: string; page?: string } };

function toNum(s: string | undefined, d: number) {
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : d;
}

export default async function AllFacilityPage({ searchParams }: Props) {
  const q = (searchParams.q ?? "").trim();
  const categoryId = searchParams.categoryId ?? "all";
  const page = toNum(searchParams.page, 1);

  const [categories, data] = await Promise.all([
    getAllCategories(),
    listFacilities({ q, categoryId, page, limit: 12 }),
  ]);

  const makeHref = (p: number) => {
    const usp = new URLSearchParams();
    if (q) usp.set("q", q);
    if (categoryId && categoryId !== "all") usp.set("categoryId", categoryId);
    usp.set("page", String(p));
    return `/all-facility?${usp.toString()}`;
  };

  // Get active category name
  const activeCategoryName = categoryId !== "all" 
    ? categories?.find((c: any) => c._id === categoryId)?.name 
    : null;

  // Check if filters are active
  const hasActiveFilters = q || categoryId !== "all";

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section with Breadcrumb */}
      <section className="border-b border-slate-200 bg-white">
        <div className="wrapper px-4 py-8 md:py-12 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Beranda
            </Link>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-slate-900">Semua Fasilitas</span>
          </nav>

          {/* Page Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <MapPin className="h-3.5 w-3.5" />
              Kabupaten Garut
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Jelajahi{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Fasilitas Umum
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Temukan berbagai fasilitas umum yang tersedia di Kabupaten Garut untuk kebutuhan acara, kegiatan, dan keperluan Anda
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Content Section */}
      <section className="wrapper px-4 py-8 space-y-6">
        {/* Filter Bar with Enhanced Layout */}
        <div className="sticky top-4 z-20 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm backdrop-blur-sm bg-white/95">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50">
              <Filter className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Filter & Pencarian</h2>
              <p className="text-xs text-slate-500">Temukan fasilitas sesuai kebutuhan Anda</p>
            </div>
          </div>
          
          <FilterBar
            q={q}
            categoryId={categoryId}
            categories={categories?.map((c: any) => ({ id: c._id, name: c.name })) ?? []}
          />
        </div>

        {/* Results Summary with Active Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm text-slate-600">Menampilkan</span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-indigo-600 ring-1 ring-indigo-100">
                <Sparkles className="h-3.5 w-3.5" />
                {data.items.length}
              </span>
              <span className="text-sm text-slate-600">dari</span>
              <span className="text-sm font-bold text-slate-900">{data.total}</span>
              <span className="text-sm text-slate-600">fasilitas</span>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                {q && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    Pencarian: <span className="font-semibold text-slate-900">&quot;{q}&quot;</span>
                  </span>
                )}
                {activeCategoryName && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    Kategori: <span className="font-semibold text-slate-900">{activeCategoryName}</span>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <a
              href="/all-facility"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-900 hover:ring-1 hover:ring-slate-200"
            >
              Reset Filter
            </a>
          )}
        </div>

        {/* Grid Layout with Enhanced Spacing */}
        {data.items.length === 0 ? (
          <div className="py-12">
            <EmptyState resetHref="/all-facility" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-8">
              {data.items.map((f) => (
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

            {/* Load More Indicator for Better UX */}
            {data.pageCount > 1 && (
              <div className="pt-4 text-center">
                <p className="text-sm text-slate-500">
                  Halaman {data.page} dari {data.pageCount}
                </p>
              </div>
            )}
          </>
        )}

        {/* Pagination with Accessible Design */}
        {data.pageCount > 1 && (
          <div className="pt-8">
            <Pagination page={data.page} pageCount={data.pageCount} makeHref={makeHref} />
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      {data.items.length > 0 && (
        <section className="wrapper px-4 py-12 md:py-16">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-blue-600 to-indigo-700 p-8 md:p-12 text-center">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Tidak Menemukan Fasilitas yang Anda Cari?
              </h2>
              <p className="text-indigo-100 text-base md:text-lg leading-relaxed">
                Hubungi kami untuk informasi lebih lanjut tentang ketersediaan fasilitas atau ajukan permintaan khusus
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-100"
                >
                  Hubungi Kami
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
