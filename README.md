# Homefire — The Giloz & Sefofo Ordering Platform

> **Two kitchens. One heritage.**
> A world-class, mobile-first ordering platform uniting **Giloz Restaurant** and
> **Sefofo** — two Eʋe (Volta-region) Ghanaian food brands in Accra — into a single,
> luxurious digital ecosystem where guests can switch brands, browse a living menu,
> and order by cart, checkout, or WhatsApp.

---

## Status

🟡 **Architecture phase — awaiting approval before implementation.**

Per the project brief, no application code is written until the architecture below is
reviewed and approved. Everything in [`/docs`](./docs) is the plan.

## The architecture (read in order)

| #  | Document | What it covers |
|----|----------|----------------|
| 00 | [Brand Research](./docs/00-brand-research.md) | Verified findings on Giloz & Sefofo — the source of truth |
| 01 | [Product Strategy](./docs/01-product-strategy.md) | Vision, brand model, personas, positioning, KPIs |
| 02 | [Information Architecture](./docs/02-information-architecture.md) | Sitemap, routes, navigation, content model |
| 03 | [User Flows](./docs/03-user-flows.md) | Ordering, brand-switch, auth, checkout, tracking, admin |
| 04 | [Wireframes](./docs/04-wireframes.md) | Low-fidelity layouts for every key screen |
| 05 | [Design System](./docs/05-design-system.md) | Identity, color, type, spacing, motion, tokens |
| 06 | [Database Schema](./docs/06-database-schema.md) | Supabase Postgres schema, relationships, RLS |
| 07 | [API Architecture](./docs/07-api-architecture.md) | Server actions, route handlers, integrations |
| 08 | [Folder Structure](./docs/08-folder-structure.md) | Next.js 15 App-Router project layout |
| 09 | [Component Library](./docs/09-component-library.md) | Component inventory, props, states |
| 10 | [Implementation Plan](./docs/10-implementation-plan.md) | Phased build, milestones, definition of done |

## Tech stack (proposed)

**Frontend** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui · Framer Motion · GSAP + ScrollTrigger · Lenis
**Backend / data** Supabase (Postgres · Auth · Storage · Realtime · RLS) · Server Actions · Zod
**Media** Cloudinary (AVIF/WebP, blur placeholders, transformations)
**Commerce (Ghana-first)** Paystack (GHS, Mobile Money / MTN MoMo, cards) · WhatsApp Cloud ordering · Google Maps (delivery zones)
**Platform** PWA (Serwist) · SEO (metadata, JSON-LD, sitemaps) · WCAG 2.2 AA · Vercel

## Why "Ghana-first" matters

Both brands live in Accra. Generic "premium restaurant" clichés were rejected in favour of
choices that are *actually true* for these guests: prices in **Ghana Cedis (₵)**, payment by
**Mobile Money** and card via **Paystack**, ordering via **WhatsApp** (the dominant channel),
and **Accra delivery zones**. The luxury is in the craft and the food photography — not in
pretending to be a New York steakhouse.

---

_Design-led. Every section premium. Every interaction considered._
