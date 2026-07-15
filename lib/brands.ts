/**
 * The Eʋe Table — brand ecosystem configuration (single source of truth).
 *
 * The house brand ("The Eʋe Table") is the neutral luxury shell that unites two
 * Eʋe/Volta-heritage kitchens in Accra: Giloz Restaurant and Sefofo. Each brand is
 * a themed "world"; switching brand re-lights the UI via CSS custom properties.
 *
 * To rename the ecosystem, change HOUSE.name — it flows everywhere.
 */

export const HOUSE = {
  key: "eve",
  name: "The Eʋe Table",
  shortName: "Eʋe Table",
  tagline: "Two kitchens. One heritage.",
  description:
    "One table for two Accra kitchens. Giloz and Sefofo — authentic Eʋe cooking, delivered beautifully.",
} as const;

export type BrandKey = "giloz" | "sefofo";

export interface Brand {
  key: BrandKey;
  name: string;
  shortName: string;
  tagline: string;
  mood: string;
  /** value used for the `data-brand` theme attribute */
  theme: BrandKey;
  accent: string;
  accentSoft: string;
  neighbourhood: string;
  city: string;
  hours: string;
  story: string;
  /** path to the restaurant's own printed menu, served from public/ */
  menuPdf: string;
  instagram: string;
  tiktok: string;
  /** env var that holds the live WhatsApp number, with a safe fallback */
  whatsappEnv: string;
  whatsappFallback: string;
}

export const BRANDS: Record<BrandKey, Brand> = {
  giloz: {
    key: "giloz",
    name: "Giloz Restaurant",
    shortName: "Giloz",
    tagline: "Where Eʋe tradition meets the table.",
    mood: "Refined ember",
    theme: "giloz",
    accent: "#C9A24B",
    accentSoft: "#E7C46A",
    neighbourhood: "Pig-Farm",
    city: "Pig-Farm, Accra",
    hours: "Daily · 11:00 – 23:00",
    story:
      "A proud, full-service kitchen in Pig-Farm. Authentic Eʋe cooking under spotlight — with a range wide enough for any table, and Naturia natural drinks to pair.",
    menuPdf: "/menus/giloz-menu.pdf",
    instagram: "giloz_restaurant",
    tiktok: "giloz_restaurant",
    whatsappEnv: "NEXT_PUBLIC_WHATSAPP_GILOZ",
    whatsappFallback: "233200000000",
  },
  sefofo: {
    key: "sefofo",
    name: "Sefofo",
    shortName: "Sefofo",
    tagline: "We take you back home.",
    mood: "Warm bloom",
    theme: "sefofo",
    accent: "#C4552D",
    accentSoft: "#E8A32C",
    neighbourhood: "Dzorwulu",
    city: "Dzorwulu, Accra",
    hours: "Daily · 11:00 – 22:00",
    story:
      "Seƒoƒo means ‘flower’ in Eʋe. A homestyle kitchen in Dzorwulu serving the meals that bring back memories — comfort food styled like a family table.",
    menuPdf: "/menus/sefofo-menu.pdf",
    instagram: "sefofo.rlg",
    tiktok: "sefofo.rlg",
    whatsappEnv: "NEXT_PUBLIC_WHATSAPP_SEFOFO",
    whatsappFallback: "233200000000",
  },
};

export const BRAND_KEYS = Object.keys(BRANDS) as BrandKey[];

export function isBrandKey(value: string | undefined | null): value is BrandKey {
  return value === "giloz" || value === "sefofo";
}

export function getBrand(key: BrandKey): Brand {
  return BRANDS[key];
}

export function otherBrand(key: BrandKey): Brand {
  return BRANDS[key === "giloz" ? "sefofo" : "giloz"];
}

/** Build a wa.me deep link for a brand, using the env number when present. */
export function whatsappNumber(key: BrandKey): string {
  const brand = BRANDS[key];
  const fromEnv =
    key === "giloz"
      ? process.env.NEXT_PUBLIC_WHATSAPP_GILOZ
      : process.env.NEXT_PUBLIC_WHATSAPP_SEFOFO;
  return (fromEnv && fromEnv.trim()) || brand.whatsappFallback;
}

export function whatsappLink(key: BrandKey, message: string): string {
  return `https://wa.me/${whatsappNumber(key)}?text=${encodeURIComponent(message)}`;
}
