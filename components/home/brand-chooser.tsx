import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, TiltCard } from "@/components/motion";
import { Plate } from "@/components/common/plate";
import { BrandLogo } from "@/components/brand/brand-logo";
import { BRAND_KEYS, BRANDS, type BrandKey } from "@/lib/brands";

const tones: Record<BrandKey, [string, string]> = {
  giloz: ["#C9A24B", "#2A1E0E"],
  sefofo: ["#C4552D", "#F4E3C9"],
};

export function BrandChooser() {
  return (
    <section id="kitchens" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="label text-brand">Two worlds, one table</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Choose your kitchen</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {BRAND_KEYS.map((k, i) => {
            const b = BRANDS[k];
            return (
              <Reveal key={k} delay={i * 0.1}>
                <Link href={`/${k}`} className="group block">
                  <TiltCard intensity={7}>
                    <article
                      data-brand={k}
                      className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-paper p-8 text-ink"
                    >
                      <Plate
                        tone={tones[k]}
                        ring={false}
                        className="absolute -right-16 -top-20 size-72 rounded-full opacity-70 blur-[2px]"
                      />
                      <div className="relative">
                        <BrandLogo brand={k} size={56} className="mb-5 border border-line" />
                        <p className="label text-brand">{b.mood}</p>
                        <h3 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{b.name}</h3>
                        <p className="mt-3 max-w-xs text-muted">{b.tagline}</p>
                      </div>
                      <div className="relative mt-8 flex items-center justify-between">
                        <span className="text-sm text-muted">{b.city}</span>
                        <span className="inline-flex items-center gap-1 font-medium text-brand">
                          Explore
                          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </article>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
