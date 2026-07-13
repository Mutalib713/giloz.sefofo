import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { FloatingFood, Magnetic, Reveal, TextReveal } from "@/components/motion";

export function Hero() {
  return (
    <section data-brand="eve" className="grain relative overflow-hidden bg-paper">
      <div className="mesh absolute inset-0 animate-gradient opacity-70" aria-hidden />
      <FloatingFood />
      <Container className="relative z-10 flex min-h-[92vh] flex-col justify-center py-24">
        <Reveal>
          <p className="label text-brand">The Eʋe Table · Accra, Ghana</p>
        </Reveal>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]">
          <TextReveal text="Two kitchens." />
          <br />
          <span className="text-brand">
            <TextReveal text="One heritage." delay={0.18} />
          </span>
        </h1>
        <Reveal delay={0.32}>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Giloz and Sefofo — authentic Eʋe cooking from Accra, delivered beautifully. Order in
            cedis, pay with Mobile Money, or send it straight to WhatsApp.
          </p>
        </Reveal>
        <Reveal delay={0.42}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/giloz/menu">
                  See the menu <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg">
              <Link href="#kitchens">Choose a kitchen</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
