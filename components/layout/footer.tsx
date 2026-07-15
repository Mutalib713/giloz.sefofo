import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "./container";
import { BRANDS, BRAND_KEYS, HOUSE, SOCIAL_LABELS, telLink, whatsappLink } from "@/lib/brands";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Kitchens",
    links: [
      { label: "Giloz Restaurant", href: "/giloz" },
      { label: "Giloz menu", href: "/giloz/menu" },
      { label: "Giloz menu (PDF)", href: BRANDS.giloz.menuPdf, external: true },
      { label: "Sefofo", href: "/sefofo" },
      { label: "Sefofo menu", href: "/sefofo/menu" },
      { label: "Sefofo menu (PDF)", href: BRANDS.sefofo.menuPdf, external: true },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "My orders", href: "/account" },
      { label: "Drinks & cocktails", href: "/sefofo/menu?category=drinks" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-brand="eve" className="grain relative overflow-hidden bg-paper text-ink">
      <Container className="relative z-10 py-16 sm:py-20">
        <div className="flex flex-col gap-10 border-b border-line pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="label text-brand">{HOUSE.tagline}</p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{HOUSE.name}</h2>
            <p className="mt-4 text-muted">
              Two Eʋe kitchens in Accra, one table. Order in cedis, pay with Mobile Money, or send
              it straight to WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={whatsappLink("giloz", "Hi Giloz! I'd like to place an order.")}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-brand"
            >
              <MessageCircle className="size-4 text-brand" /> Giloz on WhatsApp
            </Link>
            <Link
              href={whatsappLink("sefofo", "Hi Sefofo! I'd like to place an order.")}
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-brand"
            >
              <MessageCircle className="size-4 text-brand" /> Sefofo on WhatsApp
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="label text-muted">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-ink/80 transition-colors hover:text-brand"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="label text-muted">Follow</h3>
            <div className="mt-4 space-y-4">
              {BRAND_KEYS.map((k) => (
                <div key={k}>
                  <p className="text-sm font-medium text-ink">{BRANDS[k].shortName}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {BRANDS[k].socials.map((s) => (
                      <a
                        key={s.platform}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-ink/80 transition-colors hover:border-brand hover:text-brand"
                      >
                        {SOCIAL_LABELS[s.platform]}
                      </a>
                    ))}
                    {BRANDS[k].feedbackUrl && (
                      <a
                        href={BRANDS[k].feedbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-ink/80 transition-colors hover:border-brand hover:text-brand"
                      >
                        Feedback
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="label text-muted">Visit &amp; contact</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {BRAND_KEYS.map((k) => (
                <li key={k}>
                  <p className="font-medium text-ink">{BRANDS[k].shortName}</p>
                  <p className="text-muted">{BRANDS[k].city}</p>
                  <a href={telLink(k)} className="inline-flex items-center gap-1.5 text-ink/80 transition-colors hover:text-brand">
                    <Phone className="size-3.5" /> {BRANDS[k].phone}
                  </a>
                  <br />
                  <a
                    href={`mailto:${BRANDS[k].email}`}
                    className="inline-flex items-center gap-1.5 break-all text-ink/80 transition-colors hover:text-brand"
                  >
                    <Mail className="size-3.5" /> {BRANDS[k].email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
