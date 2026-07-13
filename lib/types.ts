import type { BrandKey } from "@/lib/brands";

export type TagKind = "diet" | "attribute" | "badge";

export interface Tag {
  slug: string;
  label: string;
  kind: TagKind;
}

export interface Category {
  id: string;
  brand: BrandKey;
  name: string;
  slug: string;
  description: string;
  position: number;
}

export interface OptionChoice {
  name: string;
  /** price change in pesewas (can be negative) */
  priceDelta: number;
  isDefault?: boolean;
}

export interface OptionGroup {
  name: string;
  choices: OptionChoice[];
}

export interface Product {
  id: string;
  brand: BrandKey;
  categorySlug: string;
  name: string;
  eweName?: string;
  slug: string;
  description: string;
  /** base price in pesewas */
  basePrice: number;
  spiceLevel: 0 | 1 | 2 | 3;
  tags: string[];
  prepMinutes: number;
  calories?: number;
  isAvailable: boolean;
  isFeatured: boolean;
  ratingAvg: number;
  ratingCount: number;
  /** real photo (from the brand's Instagram / stock); falls back to imageTone */
  image?: string;
  /** two hex colors for the CSS "plate" placeholder shown while/if no photo */
  imageTone: [string, string];
  options: OptionGroup[];
  /** slugs of paired products (Naturia drinks, sides) */
  pairings: string[];
}

export interface MenuFilters {
  category?: string;
  q?: string;
  diet?: string;
  sort?: "recommended" | "price-asc" | "price-desc" | "popular";
}
