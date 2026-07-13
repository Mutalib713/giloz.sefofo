import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { ProductCard } from "@/components/menu/product-card";
import { getFeatured } from "@/lib/data/menu";

export async function SignatureDishes() {
  const dishes = await getFeatured(undefined, 8);
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="label text-brand">Signature dishes</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
            Loved across both kitchens
          </h2>
        </Reveal>
      </Container>
      <div className="no-scrollbar mt-10 flex snap-x gap-5 overflow-x-auto px-5 pb-2 sm:px-8">
        {dishes.map((p, i) => (
          <div key={p.id} className="w-64 shrink-0 snap-start sm:w-72">
            <Reveal delay={Math.min(i, 6) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
