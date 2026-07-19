import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, MessageSquareHeart, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { SocialIcon } from "@/components/common/social-icons";
import { BRANDS, BRAND_KEYS, SOCIAL_LABELS, telLink, whatsappLink } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Giloz (Pig-Farm) and Sefofo (Dzorwulu) — call or WhatsApp, email, socials, hours and location.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Reveal>
        <p className="label text-brand">Talk to us</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-7xl">Contact</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          The fastest way to reach either kitchen is a call or WhatsApp — for orders, big-table
          bookings, or anything else.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {BRAND_KEYS.map((k, i) => {
          const b = BRANDS[k];
          return (
            <Reveal key={k} delay={i * 0.1}>
              <article
                data-brand={k}
                className="flex h-full flex-col rounded-3xl border border-line bg-paper p-7 text-ink"
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
                    <Phone className="size-4 shrink-0 text-brand" />
                    <a href={telLink(k)} className="hover:text-brand">
                      {b.phone}
                    </a>
                    <span className="text-muted">· call &amp; WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-brand" />
                    <a href={`mailto:${b.email}`} className="break-all hover:text-brand">
                      {b.email}
                    </a>
                  </li>
                </ul>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {b.socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${b.name} on ${SOCIAL_LABELS[s.platform]}`}
                      className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-brand hover:text-brand"
                    >
                      <SocialIcon platform={s.platform} className="size-[18px]" />
                    </a>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-7">
                  <a
                    href={whatsappLink(k, `Hi ${b.name}! I have a question.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-on-brand transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="size-4" /> WhatsApp {b.shortName}
                  </a>
                  <Link
                    href={`/feedback#${k}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    <MessageSquareHeart className="size-4 text-brand" /> Share your feedback
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
