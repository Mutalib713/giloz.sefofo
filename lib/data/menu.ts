/**
 * Menu data-access layer. Currently backed by typed mock fixtures so the app
 * runs with zero secrets; the async signatures match the eventual Supabase
 * implementation, so swapping the body for real queries is a drop-in change.
 */
import type { BrandKey } from "@/lib/brands";
import type { Category, MenuFilters, Product, Tag } from "@/lib/types";
import { CATEGORIES, PRODUCTS, TAGS } from "@/lib/mock/menu";

export async function getCategories(brand: BrandKey): Promise<Category[]> {
  return CATEGORIES.filter((c) => c.brand === brand).sort((a, b) => a.position - b.position);
}

export async function getCategory(brand: BrandKey, slug: string): Promise<Category | null> {
  return CATEGORIES.find((c) => c.brand === brand && c.slug === slug) ?? null;
}

export async function getProduct(brand: BrandKey, slug: string): Promise<Product | null> {
  return PRODUCTS.find((p) => p.brand === brand && p.slug === slug) ?? null;
}

export async function getAllProducts(brand: BrandKey): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.brand === brand);
}

export async function getMenu(brand: BrandKey, filters: MenuFilters = {}): Promise<Product[]> {
  let items = PRODUCTS.filter((p) => p.brand === brand && p.isAvailable);

  if (filters.category && filters.category !== "all") {
    items = items.filter((p) => p.categorySlug === filters.category);
  }
  if (filters.diet) {
    items = items.filter((p) => p.tags.includes(filters.diet as string));
  }
  if (filters.q) {
    const q = filters.q.toLowerCase().trim();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.eweName?.toLowerCase().includes(q) ?? false),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      items = [...items].sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price-desc":
      items = [...items].sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "popular":
      items = [...items].sort((a, b) => b.ratingCount - a.ratingCount);
      break;
    default:
      items = [...items].sort((a, b) => {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return b.ratingAvg - a.ratingAvg;
      });
  }
  return items;
}

export async function getFeatured(brand?: BrandKey, limit = 6): Promise<Product[]> {
  const items = PRODUCTS.filter((p) => p.isFeatured && (!brand || p.brand === brand));
  return items.sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, limit);
}

export async function searchProducts(q: string, brand?: BrandKey): Promise<Product[]> {
  const needle = q.toLowerCase().trim();
  if (!needle) return [];
  return PRODUCTS.filter(
    (p) =>
      (!brand || p.brand === brand) &&
      (p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        (p.eweName?.toLowerCase().includes(needle) ?? false)),
  );
}

/** Synchronous derivations over an already-loaded product. */
export function getPairings(product: Product): Product[] {
  return product.pairings
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

export function getRelated(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.brand === product.brand &&
      p.categorySlug === product.categorySlug &&
      p.slug !== product.slug,
  ).slice(0, limit);
}

export function getTag(slug: string): Tag | undefined {
  return TAGS.find((t) => t.slug === slug);
}

export function dietTags(): Tag[] {
  return TAGS.filter((t) => t.kind === "diet" || t.kind === "attribute");
}
