import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Leaf } from "lucide-react";
import { BRANDS, isBrandKey } from "@/lib/brands";
import {
  getAllProducts,
  getCategory,
  getPairings,
  getProduct,
  getRelated,
} from "@/lib/data/menu";
import { Container } from "@/components/layout/container";
import { Plate } from "@/components/common/plate";
import { OptionPicker } from "@/components/product/option-picker";
import { ProductCard } from "@/components/menu/product-card";
import { PriceTag, Rating, Spice, TagBadges } from "@/components/menu/product-meta";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/common/json-ld";
import { SITE } from "@/lib/constants";

export async function generateStaticParams({ params }: { params: { brand: string } }) {
  if (!isBrandKey(params.brand)) return [];
  const items = await getAllProducts(params.brand);
  return items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}): Promise<Metadata> {
  const { brand, slug } = await params;
  if (!isBrandKey(brand)) return {};
  const product = await getProduct(brand, slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/${brand}/product/${slug}` },
    openGraph: { title: product.name, description: product.description, type: "website" },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}) {
  const { brand, slug } = await params;
  if (!isBrandKey(brand)) notFound();
  const product = await getProduct(brand, slug);
  if (!product) notFound();

  const [category, pairings, related] = await Promise.all([
    getCategory(brand, product.categorySlug),
    Promise.resolve(getPairings(product)),
    Promise.resolve(getRelated(product)),
  ]);
  const b = BRANDS[brand];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: product.name,
    description: product.description,
    image: `${SITE.url}/og?slug=${product.slug}`,
    offers: {
      "@type": "Offer",
      price: (product.basePrice / 100).toFixed(2),
      priceCurrency: "GHS",
      availability: product.isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratingAvg,
      reviewCount: product.ratingCount,
    },
  };

  return (
    <Container className="py-8 sm:py-12">
      <JsonLd data={jsonLd} />

      <nav className="mb-6 flex items-center gap-2 text-sm text-muted" aria-label="Breadcrumb">
        <Link href={`/${brand}/menu`} className="inline-flex items-center gap-1.5 hover:text-brand">
          <ArrowLeft className="size-4" /> {b.name} menu
        </Link>
        {category && (
          <>
            <span aria-hidden>/</span>
            <Link href={`/${brand}/menu?category=${category.slug}`} className="hover:text-brand">
              {category.name}
            </Link>
          </>
        )}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-3xl border border-line">
            <Plate tone={product.imageTone} className="aspect-square" />
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.tags.includes("chefs-pick") && (
                <span className="w-fit rounded-full bg-black/45 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur">
                  Chef's pick
                </span>
              )}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Photography coming soon — this is a placeholder rendered from the dish's colour story.
          </p>
        </Reveal>

        <div>
          <Reveal>
            <p className="label text-brand">{product.eweName ?? b.name}</p>
            <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Rating value={product.ratingAvg} count={product.ratingCount} />
              <Spice level={product.spiceLevel} />
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Clock className="size-4" /> {product.prepMinutes} min
              </span>
              {product.tags.includes("vegan") && (
                <span className="inline-flex items-center gap-1.5 text-sm text-secondary">
                  <Leaf className="size-4" /> Vegan
                </span>
              )}
            </div>

            <p className="mt-5 max-w-prose text-lg text-muted">{product.description}</p>

            <div className="mt-5">
              <TagBadges tags={product.tags} />
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="label text-muted">From</span>
              <PriceTag pesewas={product.basePrice} className="font-serif text-3xl" />
            </div>

            <hr className="my-7 border-line" />

            <OptionPicker product={product} />
          </Reveal>
        </div>
      </div>

      {pairings.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <p className="label text-brand">Pairs well with</p>
            <h2 className="mt-2 font-serif text-3xl">Make it a feast</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {pairings.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <p className="label text-brand">More from {category?.name ?? "the menu"}</p>
            <h2 className="mt-2 font-serif text-3xl">You might also love</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
