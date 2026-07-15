import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { Container } from "./container";
import { BRANDS, HOUSE, whatsappLink } from "@/lib/brands";

const columns = [
  {
    title: "Kitchens",
    links: [
      { label: "Giloz Restaurant", href: "/giloz" },
      { label: "Giloz menu", href: "/giloz/menu" },
      { label: "Sefofo", href: "/sefofo" },
      { label: "Sefofo menu", href: "/sefofo/menu" },
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
                    <Link href={l.href} className="text-sm text-ink/80 transition-colors hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="label text-muted">Follow</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`https://instagram.com/${BRANDS.giloz.instagram}`}
                  className="inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-brand"
                >
                  <Instagram className="size-4" /> @{BRANDS.giloz.instagram}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${BRANDS.sefofo.instagram}`}
                  className="inline-flex items-center gap-2 text-sm text-ink/80 transition-colors hover:text-brand"
                >
                  <Instagram className="size-4" /> @{BRANDS.sefofo.instagram}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="label text-muted">Visit</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>Giloz · {BRANDS.giloz.city}</li>
              <li>Sefofo · {BRANDS.sefofo.city}</li>
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
