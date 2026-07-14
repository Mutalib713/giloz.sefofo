import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { FoodImage } from "@/components/common/food-image";
import { BrandLogo } from "@/components/brand/brand-logo";
import { BRANDS, BRAND_KEYS, HOUSE } from "@/lib/brands";
import { BRAND_VENUE } from "@/lib/mock/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of The Eʋe Table — two Accra kitchens, Giloz and Sefofo, united by Eʋe/Volta heritage.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Heritage first",
    body: "Akple, ademe, abolo, fetri detsi — dishes with names, histories and homes. We spell them right and cook them righter.",
  },
  {
    title: "Fresh, always",
    body: "Soups simmered daily, dough fermented in-house, drinks brewed from real hibiscus and ginger — nothing from a packet.",
  },
  {
    title: "Hospitality is the recipe",
    body: "Whether it's a table for twelve at Giloz or a delivery to your desk from Sefofo, you're a guest, not an order number.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-16 sm:py-24">
        <Reveal>
          <p className="label text-brand">{HOUSE.tagline}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl tracking-tight sm:text-7xl">
            Two kitchens, one heritage, one table.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            The Eʋe people of Ghana's Volta Region cook food that tastes like belonging. {HOUSE.name}{" "}
            brings two Accra kitchens that carry that flame — <b className="text-ink">Giloz</b> in
            Pig-Farm and <b className="text-ink">Sefofo</b> in Dzorwulu — into one place, so the
            taste of home is never more than a few taps away.
          </p>
        </Reveal>
      </Container>

      <Container className="pb-16 sm:pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {BRAND_KEYS.map((k, i) => {
            const b = BRANDS[k];
            return (
              <Reveal key={k} delay={i * 0.1}>
                <article
                  data-brand={k}
                  className="overflow-hidden rounded-3xl border border-line bg-paper text-ink"
                >
                  <FoodImage src={BRAND_VENUE[k]} alt={`Inside ${b.name}`} tone={["#8A5A2B", "#241610"]} className="aspect-[16/9]" />
                  <div className="p-7">
                    <div className="flex items-center gap-3">
                      <BrandLogo brand={k} size={44} className="border border-line" />
                      <div>
                        <h2 className="font-serif text-2xl leading-tight">{b.name}</h2>
                        <p className="label text-muted">{b.city}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-muted">{b.story}</p>
                    <Button asChild variant="secondary" className="mt-5">
                      <Link href={`/${k}`}>Visit {b.shortName}</Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container className="pb-20 sm:pb-28">
        <Reveal>
          <h2 className="font-serif text-4xl tracking-tight">What we stand for</h2>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="border-t border-line pt-5">
                <h3 className="font-serif text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
