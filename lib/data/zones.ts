import type { BrandKey } from "@/lib/brands";

export interface DeliveryZone {
  id: string;
  name: string;
  /** fee in pesewas */
  fee: number;
  etaMin: number;
  etaMax: number;
}

/** Flat Accra delivery zones (demo). Real zones come from Supabase + Maps later. */
export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: "pigfarm", name: "Pig-Farm / Kokomlemle", fee: 1500, etaMin: 15, etaMax: 30 },
  { id: "dzorwulu", name: "Dzorwulu / Airport Res.", fee: 2000, etaMin: 20, etaMax: 35 },
  { id: "accra-central", name: "Accra Central / Adabraka", fee: 2200, etaMin: 25, etaMax: 45 },
  { id: "osu", name: "Osu / Labone / Cantonments", fee: 2500, etaMin: 25, etaMax: 45 },
  { id: "eastlegon", name: "East Legon / Legon", fee: 3000, etaMin: 30, etaMax: 55 },
  { id: "spintex", name: "Spintex / Teshie", fee: 3500, etaMin: 35, etaMax: 60 },
  { id: "tema", name: "Tema / Community 1–12", fee: 5000, etaMin: 45, etaMax: 80 },
];

export function getZone(id: string): DeliveryZone | undefined {
  return DELIVERY_ZONES.find((z) => z.id === id);
}

export const PICKUP_LOCATIONS: Record<BrandKey, { name: string; eta: string }> = {
  giloz: { name: "Giloz Restaurant — Pig-Farm, Accra", eta: "Ready in 20–30 min" },
  sefofo: { name: "Sefofo — Dzorwulu, Accra", eta: "Ready in 20–30 min" },
};
