"use client";

import { useEffect } from "react";
import { useActiveBrand } from "@/lib/hooks/use-active-brand";

/** Keeps <html data-brand> in sync with the route so page chrome + overscroll match. */
export function BrandThemeSync() {
  const brand = useActiveBrand();
  useEffect(() => {
    document.documentElement.dataset.brand = brand ?? "eve";
  }, [brand]);
  return null;
}
