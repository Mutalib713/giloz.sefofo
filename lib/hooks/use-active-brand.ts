"use client";

import { usePathname } from "next/navigation";
import { isBrandKey, type BrandKey } from "@/lib/brands";

/** The brand implied by the current route, or null on house/marketing pages. */
export function useActiveBrand(): BrandKey | null {
  const pathname = usePathname() ?? "/";
  const seg = pathname.split("/")[1];
  return isBrandKey(seg) ? seg : null;
}
