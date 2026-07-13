import { HOUSE } from "@/lib/brands";

export const SITE = {
  name: HOUSE.name,
  shortName: HOUSE.shortName,
  tagline: HOUSE.tagline,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "The Eʋe Table brings Giloz Restaurant and Sefofo — two Eʋe kitchens in Accra — into one beautiful ordering experience. Order in cedis, pay with Mobile Money, or order on WhatsApp.",
  locale: "en_GH",
} as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/giloz_restaurant" },
  { label: "TikTok", href: "https://tiktok.com/@sefofo.rlg" },
] as const;

export const HOW_IT_WORKS = [
  {
    title: "Choose your kitchen",
    body: "Switch between Giloz and Sefofo — two worlds, one table.",
  },
  {
    title: "Build your order",
    body: "Browse a living, photographed menu. Add sides and Naturia drinks.",
  },
  {
    title: "Pay your way",
    body: "Checkout with Mobile Money or card — or send it straight to WhatsApp.",
  },
] as const;
