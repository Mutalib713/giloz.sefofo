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

export type SocialPlatform = "instagram" | "tiktok" | "facebook" | "x" | "linktree";

export interface BrandSocial {
  platform: SocialPlatform;
  label: string;
  href: string;
}

/** Human-readable name for each social platform. */
export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  x: "X",
  linktree: "Linktree",
};

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
  /** Instagram handle (kept for convenience; also present in `socials`) */
  instagram: string;
  /** call & WhatsApp line, in local Ghana format for display */
  phone: string;
  email: string;
  /** the brand's Linktree / link hub */
  linktree: string;
  /** optional customer-feedback form (lives on the Linktree) */
  feedbackUrl?: string;
  /** every social platform the brand is actually on */
  socials: BrandSocial[];
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
    hours: "Mon – Sun · 11:00 – 23:00",
    story:
      "A proud, full-service kitchen in Pig-Farm. Traditional Eʋe cuisine alongside Ghanaian, Nigerian and continental dishes — a range wide enough for any table.",
    menuPdf: "/menus/giloz-menu.pdf",
    instagram: "giloz_restaurant",
    phone: "0256844456",
    email: "gilozrestaurant@gmail.com",
    linktree: "https://linktr.ee/giloz.restaurant",
    socials: [
      { platform: "instagram", label: "@giloz_restaurant", href: "https://instagram.com/giloz_restaurant" },
      { platform: "linktree", label: "linktr.ee/giloz.restaurant", href: "https://linktr.ee/giloz.restaurant" },
    ],
    whatsappEnv: "NEXT_PUBLIC_WHATSAPP_GILOZ",
    whatsappFallback: "233256844456",
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
    hours: "Mon – Sat · 11:00 – 21:00",
    story:
      "Seƒoƒo means ‘flower’ in Eʋe. A homestyle kitchen in Dzorwulu serving the meals that bring back memories — comfort food styled like a family table.",
    menuPdf: "/menus/sefofo-menu.pdf",
    instagram: "sefofo.rlg",
    phone: "0554177031",
    email: "sefofo.rlg@gmail.com",
    linktree: "https://linktr.ee/sefofo",
    feedbackUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdDo23TO67Rnb_jC8MsmUtJ4cX6xTxNoR6HKVILtXmp_Yj8Iw/viewform",
    socials: [
      { platform: "instagram", label: "@sefofo.rlg", href: "https://instagram.com/sefofo.rlg" },
      { platform: "tiktok", label: "@sefofo.rlg", href: "https://tiktok.com/@sefofo.rlg" },
      { platform: "facebook", label: "Sefofo on Facebook", href: "https://facebook.com/p/Sefofo-61568651235806/" },
      { platform: "x", label: "@SefofoRLG", href: "https://x.com/SefofoRLG" },
      { platform: "linktree", label: "linktr.ee/sefofo", href: "https://linktr.ee/sefofo" },
    ],
    whatsappEnv: "NEXT_PUBLIC_WHATSAPP_SEFOFO",
    whatsappFallback: "233554177031",
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

/** International `tel:` link (e.g. +233256844456) for the brand's call line. */
export function telLink(key: BrandKey): string {
  return `tel:+${whatsappNumber(key)}`;
}
