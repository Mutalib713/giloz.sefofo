import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, MessageCircle } from "lucide-react";
import { BRANDS, isBrandKey, whatsappLink } from "@/lib/brands";
import { getCategories, getFeatured } from "@/lib/data/menu";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/menu/product-card";
import { FloatingFood, Reveal, TextReveal } from "@/components/motion";
import { FoodImage } from "@/components/common/food-image";
import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_HERO } from "@/lib/mock/images";

export default async function BrandHome({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  if (!isBrandKey(brand)) notFound();
  const b = BRANDS[brand];
  const [categories, featured] = await Promise.all([getCategories(brand), getFeatured(brand, 4)]);

  return (
    <>
      <section className="grain relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND_HERO[brand]} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/85 to-paper/55" />
        </div>
        <div className="mesh absolute inset-0 animate-gradient opacity-40" aria-hidden />
        <FloatingFood />
        <Container className="relative z-10 py-24 sm:py-32">
          <Reveal>
            <BrandLogo brand={brand} size={72} className="mb-6 border border-line" />
            <p className="label text-brand">
              {b.mood} · {b.neighbourhood}
            </p>
          </Reveal>
          <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-7xl">
            <TextReveal text={b.name} />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-xl text-lg text-muted">{b.story}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href={`/${brand}/menu`}>
                  See the menu <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href={whatsappLink(brand, `Hi ${b.name}! I'd like to place an order.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" /> Order on WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-brand" /> {b.city}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-brand" /> {b.hours}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-12">
        <Reveal>
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">Explore the menu</h2>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${brand}/menu?category=${c.slug}`}
              className="rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </Container>

      <Container className="py-12">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="label text-brand">Chef's picks</p>
            <h2 className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">Start here</h2>
          </div>
          <Link href={`/${brand}/menu`} className="hidden text-sm text-brand hover:underline sm:inline">
            View all →
          </Link>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <FoodImage
                src={featured[0]?.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt={featured[0]?.name ?? b.name}
                tone={featured[0]?.imageTone ?? ["#8A5A2B", "#241610"]}
                className="absolute inset-0"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label text-brand">Our story</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">{b.tagline}</h2>
            <p className="mt-5 text-lg text-muted">{b.story}</p>
            <Button asChild variant="secondary" className="mt-6">
              <Link href={`/${brand}/menu`}>Order from {b.shortName}</Link>
            </Button>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
