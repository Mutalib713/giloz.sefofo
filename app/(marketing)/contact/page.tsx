import type { Metadata } from "next";
import { Clock, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { BRANDS, BRAND_KEYS, whatsappLink } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Giloz (Pig-Farm) and Sefofo (Dzorwulu) — WhatsApp, Instagram, email, hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Reveal>
        <p className="label text-brand">Talk to us</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-7xl">Contact</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          The fastest way to reach either kitchen is WhatsApp — for orders, big-table bookings, or
          anything else.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {BRAND_KEYS.map((k, i) => {
          const b = BRANDS[k];
          return (
            <Reveal key={k} delay={i * 0.1}>
              <article
                data-brand={k}
                className="rounded-3xl border border-line bg-paper p-7 text-ink"
              >
                <div className="flex items-center gap-3">
                  <BrandLogo brand={k} size={52} className="border border-line" />
                  <div>
                    <h2 className="font-serif text-2xl leading-tight">{b.name}</h2>
                    <p className="label text-muted">{b.tagline}</p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  <li className="flex items-center gap-3">
                    <MapPin className="size-4 shrink-0 text-brand" /> {b.city}, Ghana
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-brand" /> {b.hours}
                  </li>
                  <li className="flex items-center gap-3">
                    <Instagram className="size-4 shrink-0 text-brand" />
                    <a
                      href={`https://instagram.com/${b.instagram}`}
                      className="hover:text-brand"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{b.instagram}
                    </a>
                  </li>
                  {k === "giloz" && (
                    <li className="flex items-center gap-3">
                      <Mail className="size-4 shrink-0 text-brand" />
                      <a href="mailto:gilozrestaurant@gmail.com" className="hover:text-brand">
                        gilozrestaurant@gmail.com
                      </a>
                    </li>
                  )}
                </ul>

                <a
                  href={whatsappLink(k, `Hi ${b.name}! I have a question.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-on-brand transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-4" /> WhatsApp {b.shortName}
                </a>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="mt-10 text-center text-sm text-muted">
          Placeholder numbers in this demo — the owners' live WhatsApp lines drop in via environment
          variables.
        </p>
      </Reveal>
    </Container>
  );
}
