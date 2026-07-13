"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "eve.wishlist";
const EVENT = "eve:wishlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Local, cross-device-later wishlist. Persists to localStorage and syncs tabs. */
export function useWishlist() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(read());
    const handler = () => setItems(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const has = useCallback((slug: string) => items.includes(slug), [items]);

  return { items, toggle, has, count: items.length };
}
