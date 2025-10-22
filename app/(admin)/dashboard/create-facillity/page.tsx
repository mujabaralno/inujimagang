import FacilityForm from "@/components/shared/FacilityForm";
import { Plus } from "lucide-react";

export default function CreateFacilityPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] px-4 py-10 w-full">
      {/* Page header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
            <Plus className="h-3.5 w-3.5" />
            Tambah Fasilitas
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Semua Fasilitas
          </h1>
          <p className="text-slate-600 leading-relaxed">
            Kelola data fasilitas umum dan pantau ketersediaannya di seluruh wilayah Garut.
          </p>
        </div>

        
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <FacilityForm type="Create" revalidatePath="/dashboard/all-facility" />
          </div>
        </div>
      </div>
    </div>
  );
}
