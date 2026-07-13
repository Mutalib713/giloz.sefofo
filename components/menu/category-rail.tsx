"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildQuery } from "@/lib/query";
import { cn } from "@/lib/cn";

interface CategoryRailProps {
  categories: { slug: string; name: string }[];
  sp: Record<string, string | undefined>;
}

export function CategoryRail({ categories, sp }: CategoryRailProps) {
  const pathname = usePathname() ?? "";
  const active = sp.category ?? "all";
  const items = [{ slug: "all", name: "All dishes" }, ...categories];

  return (
    <div
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 py-1 sm:mx-0 sm:px-0"
      role="tablist"
      aria-label="Menu categories"
    >
      {items.map((c) => {
        const isActive = active === c.slug;
        const href = `${pathname}${buildQuery(sp, {
          category: c.slug === "all" ? undefined : c.slug,
        })}`;
        return (
          <Link
            key={c.slug}
            href={href}
            scroll={false}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              isActive
                ? "border-brand bg-brand text-on-brand"
                : "border-line text-muted hover:border-brand hover:text-ink",
            )}
          >
            {c.name}
          </Link>
        );
      })}
    </div>
  );
}
