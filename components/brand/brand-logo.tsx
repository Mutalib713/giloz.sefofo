"use client";

import { useState } from "react";
import { BRANDS, type BrandKey } from "@/lib/brands";
import { BRAND_LOGOS } from "@/lib/mock/images";
import { cn } from "@/lib/cn";

/** Circular brand avatar/logo, falling back to the brand initial if it fails. */
export function BrandLogo({
  brand,
  size = 48,
  className,
}: {
  brand: BrandKey;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = BRAND_LOGOS[brand];
  const b = BRANDS[brand];

  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 text-brand",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${b.name} logo`}
          onError={() => setFailed(true)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-serif text-lg">{b.shortName.charAt(0)}</span>
      )}
    </span>
  );
}
