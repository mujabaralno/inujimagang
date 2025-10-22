import Link from "next/link";

export default function EmptyState({ resetHref = "/all-facility" }: { resetHref?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
      <h3 className="text-slate-800 font-semibold">Tidak ada hasil</h3>
      <p className="text-sm text-slate-600">Coba ubah kata kunci atau pilih kategori lain.</p>
      <Link
        href={resetHref}
        className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border-2 border-slate-200 px-4 text-sm font-semibold hover:bg-slate-50"
      >
        Reset filter
      </Link>
    </div>
  );
}