"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRANDS, BRAND_KEYS, type BrandKey } from "@/lib/brands";
import { cn } from "@/lib/cn";

/** The signature Giloz ⇄ Sefofo control. Navigates to the equivalent page. */
export function BrandSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const seg = pathname.split("/")[1];
  const active: BrandKey | null = seg === "giloz" || seg === "sefofo" ? seg : null;
  const onMenu = pathname.includes("/menu");

  const target = (k: BrandKey) => (onMenu ? `/${k}/menu` : `/${k}`);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur",
        className,
      )}
      role="group"
      aria-label="Switch between Giloz and Sefofo"
    >
      {BRAND_KEYS.map((k) => {
        const brand = BRANDS[k];
        const isActive = active === k;
        return (
          <Link
            key={k}
            href={target(k)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors sm:text-[0.8rem]",
              isActive ? "text-on-brand" : "text-muted hover:text-ink",
            )}
          >
            {isActive && (
              <span
                className="absolute inset-0 -z-10 rounded-full"
                style={{ backgroundColor: brand.accent }}
                aria-hidden
              />
            )}
            {brand.shortName}
          </Link>
        );
      })}
    </div>
  );
}
