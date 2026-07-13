import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { FoodImage } from "@/components/common/food-image";
import { BRAND_HERO } from "@/lib/mock/images";

export function StorySplit() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <FoodImage
                src={BRAND_HERO.giloz}
                alt="Eʋe cooking from the Volta"
                tone={["#8A5A2B", "#241610"]}
                className="absolute inset-0"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="label text-brand">From the Volta, to your table</p>
            <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
              Food that tastes like home
            </h2>
            <p className="mt-5 text-lg text-muted">
              Eʋe cooking comes from Ghana's Volta Region — akple and ademe, banku and okro, fufu and
              light soup, abolo and one-man-thousand. Giloz brings it with a restaurant's polish;
              Sefofo brings it with a grandmother's memory.
            </p>
            <p className="mt-4 text-muted">One table, two ways home.</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
