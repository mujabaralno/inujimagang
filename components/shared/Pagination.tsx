// components/facility/Pagination.tsx
import Link from "next/link";

type Props = { page: number; pageCount: number; makeHref: (p: number) => string };

export default function Pagination({ page, pageCount, makeHref }: Props) {
  if (pageCount <= 1) return null;

  const prev = Math.max(1, page - 1);
  const next = Math.min(pageCount, page + 1);

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 2
  );

  const seq: (number | "...")[] = [];
  for (let i = 0; i < pages.length; i++) {
    const cur = pages[i];
    const prevV = pages[i - 1];
    if (i && prevV !== undefined && cur - prevV > 1) seq.push("...");
    seq.push(cur);
  }

  return (
    <nav className="flex items-center justify-center gap-2 pt-4">
      <Link
        href={makeHref(prev)}
        aria-disabled={page === 1}
        className={`h-10 rounded-lg border px-3 text-sm font-medium ${
          page === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"
        }`}
      >
        ← Prev
      </Link>

      {seq.map((p, i) =>
        p === "..." ? (
          <span key={`e-${i}`} className="px-2 text-slate-500">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={makeHref(p)}
            className={`h-10 min-w-[40px] grid place-items-center rounded-lg border px-3 text-sm font-semibold ${
              p === page ? "bg-slate-900 text-white border-slate-900" : "hover:bg-slate-50"
            }`}
          >
            {p}
          </Link>
        )
      )}

      <Link
        href={makeHref(next)}
        aria-disabled={page === pageCount}
        className={`h-10 rounded-lg border px-3 text-sm font-medium ${
          page === pageCount ? "pointer-events-none opacity-50" : "hover:bg-slate-50"
        }`}
      >
        Next →
      </Link>
    </nav>
  );
}
