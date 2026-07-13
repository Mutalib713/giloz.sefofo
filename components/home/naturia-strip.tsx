import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { ProductCard } from "@/components/menu/product-card";
import { getMenu } from "@/lib/data/menu";

export async function NaturiaStrip() {
  const drinks = await getMenu("giloz", { category: "drinks" });
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-surface p-8 sm:p-12 lg:grid-cols-2">
          <Reveal>
            <p className="label text-brand">Naturia Beverages</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
              Natural drinks, brewed fresh
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Sobolo, pineapple-ginger, tamarind — the Ghanaian drinks made to sit beside this food.
              Pair one with any order from either kitchen.
            </p>
            <Button asChild className="mt-6">
              <Link href="/giloz/menu?category=drinks">Explore Naturia</Link>
            </Button>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {drinks.slice(0, 2).map((p, i) => (
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
