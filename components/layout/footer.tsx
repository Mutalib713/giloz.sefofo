"use client";

import Link from "next/link";
import { FileText, Mail, MessageCircle, MessageSquareHeart, Phone } from "lucide-react";
import { Container } from "./container";
import { SocialIcon } from "@/components/common/social-icons";
import {
  BRANDS,
  BRAND_KEYS,
  HOUSE,
  SOCIAL_LABELS,
  telLink,
  whatsappLink,
  type BrandKey,
} from "@/lib/brands";
import { useActiveBrand } from "@/lib/hooks/use-active-brand";
import { cn } from "@/lib/cn";

const EXPLORE = [
  { label: "About us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Feedback", href: "/feedback" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "My orders", href: "/account" },
];

/** One brand's complete footer block: contact, menu, socials and an order CTA. */
function BrandBlock({ brand, showName }: { brand: BrandKey; showName: boolean }) {
  const b = BRANDS[brand];
  return (
    <div>
      {showName ? (
        <h3 className="font-serif text-2xl leading-tight" style={{ color: b.accent }}>
          {b.name}
        </h3>
      ) : (
        <h3 className="label text-muted">Visit &amp; order</h3>
      )}
      <p className="mt-2 text-sm text-muted">
        {b.city} · {b.hours}
      </p>

      <ul className="mt-4 space-y-2 text-sm">
        <li>
          <a
            href={telLink(brand)}
            className="inline-flex items-center gap-2 text-ink/85 transition-colors hover:text-brand"
          >
            <Phone className="size-4 shrink-0 text-brand" /> {b.phone}
            <span className="text-muted">· call &amp; WhatsApp</span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${b.email}`}
            className="inline-flex items-center gap-2 break-all text-ink/85 transition-colors hover:text-brand"
          >
            <Mail className="size-4 shrink-0 text-brand" /> {b.email}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Link href={`/${brand}/menu`} className="text-ink/85 transition-colors hover:text-brand">
            Menu
          </Link>
          <span className="text-muted">·</span>
          <a
            href={b.menuPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink/85 transition-colors hover:text-brand"
          >
            <FileText className="size-4" /> Printed menu (PDF)
          </a>
        </li>
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {b.socials.map((s) => (
          <a
            key={s.platform}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${b.name} on ${SOCIAL_LABELS[s.platform]}`}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <SocialIcon platform={s.platform} className="size-[17px]" />
          </a>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href={whatsappLink(brand, `Hi ${b.name}! I'd like to place an order.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-on-brand transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="size-4" /> WhatsApp {b.shortName}
        </Link>
        <Link
          href={`/feedback#${brand}`}
          className="inline-flex items-center gap-1.5 text-sm text-ink/80 transition-colors hover:text-brand"
        >
          <MessageSquareHeart className="size-4 text-brand" /> Give feedback
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  const activeBrand = useActiveBrand();
  const year = new Date().getFullYear();
  const brandsToShow = activeBrand ? [activeBrand] : BRAND_KEYS;

  return (
    <footer
      data-brand={activeBrand ?? "eve"}
      className="grain relative overflow-hidden bg-paper text-ink"
    >
      <Container className="relative z-10 py-16 sm:py-20">
        {/* Identity — the house on shared pages, the kitchen on brand pages */}
        <div className="border-b border-line pb-10">
          <p className="label text-brand">
            {activeBrand ? BRANDS[activeBrand].tagline : HOUSE.tagline}
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            {activeBrand ? BRANDS[activeBrand].name : HOUSE.name}
          </h2>
          <p className="mt-4 max-w-md text-muted">
            {activeBrand
              ? BRANDS[activeBrand].story
              : "Two Eʋe kitchens in Accra, one table. Order in cedis, pay with Mobile Money, or send it straight to WhatsApp."}
          </p>
        </div>

        {/* Content — one brand block per kitchen, plus site links */}
        <div
          className={cn(
            "grid gap-x-8 gap-y-10 py-12",
            activeBrand ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {brandsToShow.map((k) => (
            <BrandBlock key={k} brand={k} showName={!activeBrand} />
          ))}
          <div>
            <h3 className="label text-muted">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink/80 transition-colors hover:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {HOUSE.name}. All rights reserved.
          </p>
          <p className="label">Made in Accra 🇬🇭</p>
        </div>
      </Container>
    </footer>
  );
}
