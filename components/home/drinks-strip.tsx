import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { ProductCard } from "@/components/menu/product-card";
import { getMenu } from "@/lib/data/menu";

export async function DrinksStrip() {
  const drinks = await getMenu("sefofo", { category: "drinks" });
  const picks = drinks.filter((d) => d.basePrice >= 7000).slice(0, 2);
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-surface p-8 sm:p-12 lg:grid-cols-2">
          <Reveal>
            <p className="label text-brand">Liquids &amp; Grill</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
              Cocktails, mocktails &amp; cold ones
            </h2>
            <p className="mt-4 max-w-md text-muted">
              The Sefofo bar pours Sefotini, mojitos, ciders, malts and minerals — made to sit
              beside this food. Add one to any order.
            </p>
            <Button asChild className="mt-6">
              <Link href="/sefofo/menu?category=drinks">Explore the bar</Link>
            </Button>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {picks.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
