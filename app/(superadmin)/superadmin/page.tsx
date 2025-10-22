import { Users, Users2 } from "lucide-react";
import { getAllUser } from "@/actions/user.actions";
import { Suspense } from "react";
import TableAllUser from "@/components/superadmin/AllUser";

export default async function DashboardPage() {
  const user = await getAllUser();

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white p-6 md:p-10 space-y-10">
      {/* Header Section */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Dasbor Utama Super Admin
          </h1>
          <p className="text-slate-600">
            Pantau aktivitas, dan pengguna Fasum Garut dalam satu tempat.
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
              <p className="text-sm font-medium text-slate-500">Total Admin</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {user.length}
              </h2>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-400/30`}
            >
              <Users2 className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="w-full space-y-4">
        <div className="p-6 space-y-6 min-h-screen">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-[#25388C] p-6">
                <div className="flex items-center gap-3 text-white">
                  <Users className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">Semua Anggota</h2>
                  <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {user.length} anggota
                  </span>
                </div>
              </div>
              <div className="p-6">
                <TableAllUser users={user} />
              </div>
            </div>
          </Suspense>
        </div>
      </section>

      {/* Footer Notice */}
      <footer className="pt-6 text-center text-sm text-slate-500">
        © 2025 Fasum Garut — Data diperbarui setiap 10 menit.
      </footer>
    </main>
  );
}
