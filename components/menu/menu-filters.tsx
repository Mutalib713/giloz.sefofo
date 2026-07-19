"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { buildQuery } from "@/lib/query";

interface MenuFiltersProps {
  sp: Record<string, string | undefined>;
  diets: { slug: string; label: string }[];
}

const selectCls =
  "w-full min-w-0 rounded-full border border-line bg-surface px-3 py-2.5 text-sm text-ink transition-colors hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:w-auto sm:px-4";

export function MenuFilters({ sp, diets }: MenuFiltersProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [q, setQ] = useState(sp.q ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQ(sp.q ?? "");
  }, [sp.q]);

  function push(changes: Record<string, string | undefined>) {
    router.replace(`${pathname}${buildQuery(sp, changes)}`, { scroll: false });
  }

  function onSearch(value: string) {
    setQ(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => push({ q: value || undefined }), 300);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative w-full sm:min-w-[220px] sm:flex-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={q}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search dishes, e.g. jollof…"
          aria-label="Search dishes"
          className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
      </div>
      {/* On mobile the two selects sit 2-up in a grid; sm+ they flow inline
          in the flex row via `display: contents`. */}
      <div className="grid grid-cols-2 gap-3 sm:contents">
      <select
        aria-label="Dietary filter"
        value={sp.diet ?? ""}
        onChange={(e) => push({ diet: e.target.value || undefined })}
        className={selectCls}
      >
        <option value="">All diets</option>
        {diets.map((d) => (
          <option key={d.slug} value={d.slug}>
            {d.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Sort dishes"
        value={sp.sort ?? ""}
        onChange={(e) => push({ sort: e.target.value || undefined })}
        className={selectCls}
      >
        <option value="">Recommended</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
      </div>
    </div>
  );
}
