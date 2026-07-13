import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS, BRAND_KEYS, isBrandKey } from "@/lib/brands";

export function generateStaticParams() {
  return BRAND_KEYS.map((brand) => ({ brand }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  if (!isBrandKey(brand)) return {};
  const b = BRANDS[brand];
  const title = `${b.name} — ${b.tagline}`;
  return {
    title,
    description: b.story,
    alternates: { canonical: `/${brand}` },
    openGraph: { title, description: b.story, url: `/${brand}` },
  };
}

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;
  if (!isBrandKey(brand)) notFound();
  return (
    <div data-brand={brand} className="min-h-dvh bg-paper text-ink">
      {children}
    </div>
  );
}
