import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, MapPin, Smartphone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Magnetic, Reveal, TextReveal } from "@/components/motion";

const CHIPS = [
  { icon: Leaf, label: "Fresh & made to order" },
  { icon: Smartphone, label: "Mobile Money & WhatsApp" },
  { icon: MapPin, label: "Delivered across Accra" },
];

export function Hero() {
  return (
    <section data-brand="eve" className="relative isolate overflow-hidden bg-paper">
      {/* Full-bleed showpiece: Giloz's own wok-fired shrimp fried rice. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/food/hero-fried-rice.jpg"
          alt="Wok-fired shrimp fried rice at Giloz Restaurant"
          fill
          priority
          quality={74}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Legibility scrims: an overall veil on mobile (text sits over the
            photo) and a dark-left gradient on desktop (food stays vivid on
            the right). A bottom fade blends into the next section. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/55 to-paper/90 sm:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-r from-paper via-paper/75 to-transparent sm:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-paper/75 via-transparent to-paper/25"
        />
      </div>

      <Container className="relative flex min-h-[92vh] flex-col justify-center py-24">
        <div className="max-w-2xl">
          <Reveal>
            <p className="label text-brand">The Eʋe Table · Accra, Ghana</p>
          </Reveal>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.25rem]">
            <TextReveal text="Two kitchens." />
            <br />
            <span className="text-brand">
              <TextReveal text="One heritage." delay={0.18} />
            </span>
          </h1>
          <Reveal delay={0.32}>
            <p className="mt-6 max-w-xl text-lg text-ink/85">
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
          <Reveal delay={0.5}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {CHIPS.map((c) => (
                <li
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-2 text-sm text-ink/85 backdrop-blur-sm"
                >
                  <c.icon className="size-4 text-brand" /> {c.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>

      {/* Honest attribution for the hero dish */}
      <div className="pointer-events-none absolute bottom-6 right-6 hidden text-right sm:block">
        <p className="label text-brand">Giloz · signature</p>
        <p className="font-serif text-lg text-ink/90">Super Fried Rice</p>
      </div>
    </section>
  );
}
