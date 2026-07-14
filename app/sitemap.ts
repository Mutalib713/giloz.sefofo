import type { MetadataRoute } from "next";
import { BRAND_KEYS } from "@/lib/brands";
import { getAllProducts } from "@/lib/data/menu";
import { SITE } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  for (const brand of BRAND_KEYS) {
    entries.push(
      { url: `${base}/${brand}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      { url: `${base}/${brand}/menu`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    );
    const products = await getAllProducts(brand);
    for (const p of products) {
      entries.push({
        url: `${base}/${brand}/product/${p.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
