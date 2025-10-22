// components/facility/FilterBar.tsx
"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  q?: string;
  categoryId?: string;
  categories: { id: string; name: string }[];
};

export default function FilterBar({ q = "", categoryId = "all", categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (name: string, value?: string) => {
    const usp = new URLSearchParams(searchParams.toString());
    if (value && value.trim() !== "" && value !== "all") usp.set(name, value);
    else usp.delete(name);
    usp.delete("page"); // reset ke page 1 saat filter berubah
    router.replace(`${pathname}?${usp.toString()}`);
  };

  const onSearch = useDebouncedCallback((v: string) => setParam("q", v), 350);

  return (
    <div className="grid grid-cols-1 sm:grid-flow-col sm:auto-cols-fr gap-3">
      <input
        defaultValue={q}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Cari nama / deskripsi…"
        className="h-11 rounded-xl border-2 border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <select
        defaultValue={categoryId}
        onChange={(e) => setParam("categoryId", e.target.value)}
        className="h-11 rounded-xl border-2 border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      >
        <option value="all">Semua Kategori</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
