"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BrandKey } from "@/lib/brands";

export interface CartOption {
  group: string;
  choice: string;
}

export interface CartItem {
  key: string;
  slug: string;
  brand: BrandKey;
  name: string;
  image?: string;
  tone: [string, string];
  unitPrice: number;
  quantity: number;
  options: CartOption[];
}

export type AddInput = Omit<CartItem, "quantity" | "key"> & { quantity?: number };

interface CartState {
  items: CartItem[];
  brand: BrandKey | null;
  isOpen: boolean;
  addItem: (input: AddInput, opts?: { force?: boolean }) => { conflict: boolean };
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setOpen: (v: boolean) => void;
}

function makeKey(slug: string, options: CartOption[]) {
  return `${slug}::${options.map((o) => `${o.group}:${o.choice}`).join("|")}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      brand: null,
      isOpen: false,

      addItem: (input, opts) => {
        const state = get();
        const options = input.options ?? [];
        const key = makeKey(input.slug, options);
        const differentBrand = state.brand !== null && state.brand !== input.brand;

        if (differentBrand && state.items.length > 0 && !opts?.force) {
          return { conflict: true };
        }

        let items = differentBrand ? [] : [...state.items];
        const qty = input.quantity ?? 1;
        const existing = items.find((i) => i.key === key);
        if (existing) {
          items = items.map((i) => (i.key === key ? { ...i, quantity: i.quantity + qty } : i));
        } else {
          items = [...items, { ...input, options, quantity: qty, key }];
        }
        set({ items, brand: input.brand, isOpen: true });
        return { conflict: false };
      },

      setQty: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity: qty } : i)),
        })),

      removeItem: (key) =>
        set((state) => {
          const items = state.items.filter((i) => i.key !== key);
          return { items, brand: items.length ? state.brand : null };
        }),

      clear: () => set({ items: [], brand: null }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setOpen: (v) => set({ isOpen: v }),
    }),
    {
      name: "eve.cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, brand: s.brand }),
      skipHydration: true,
    },
  ),
);

export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s: CartState) =>
  s.items.reduce((n, i) => n + i.unitPrice * i.quantity, 0);
