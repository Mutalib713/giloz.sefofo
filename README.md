# Homefire — The Giloz & Sefofo Ordering Platform

> **Two kitchens. One heritage.**
> A world-class, mobile-first ordering platform uniting **Giloz Restaurant** and
> **Sefofo** — two Eʋe (Volta-region) Ghanaian food brands in Accra — into a single,
> luxurious digital ecosystem where guests can switch brands, browse a living menu,
> and order by cart, checkout, or WhatsApp.

---

## Status

🟢 **In development.** The app runs locally end-to-end on typed mock data — no keys needed
(see [Run it locally](#run-it-locally)). The architecture documents in [`/docs`](./docs)
remain the source of truth for what's being built.

## Run it locally

The app is fully self-sufficient in development: **no API keys are required**. With an
empty environment it serves typed mock data (menu, brands, imagery) and every page works.

**Prerequisites** [Node.js](https://nodejs.org) ≥ 18.18 (22 LTS recommended — see `.nvmrc`) and git.

```bash
# 1. Clone
git clone https://github.com/Mutalib713/giloz.sefofo.git
cd giloz.sefofo

# 2. Install dependencies (uses package-lock.json)
npm ci

# 3. Environment (optional — the app runs without it)
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

Then open <http://localhost:3000>. Key routes to explore:

| Route | What it is |
|-------|------------|
| `/` | Brand gateway — choose Giloz or Sefofo |
| `/giloz` · `/sefofo` | Brand home pages |
| `/giloz/menu` · `/sefofo/menu` | Living menus (with a "View printed menu (PDF)" link) |
| `/checkout`, `/wishlist`, `/account` | Ordering flow |
| `/admin` | Admin dashboard |
| `/menus/giloz-menu.pdf` · `/menus/sefofo-menu.pdf` | The restaurants' own printed menus |

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (strict, no emit) |
| `npm run format` | Prettier |

To connect live services (Supabase, Paystack, Cloudinary, Google Maps, WhatsApp), fill in
the corresponding keys in `.env.local` — see [`.env.example`](./.env.example) for the full list.

## Menu content & imagery

The menu data is transcribed from the restaurants' **actual printed menus** — real
categories, dishes and prices for both kitchens (Giloz: Fried Rice Combo, Jollof Zone,
Mixed Corner, Local Cuisine, The Salads; Sefofo: Locals, Continentals, Platters, Drinks &
Cocktails, Extras). Lines that print one row per variant (e.g. "Ademe with Akple / with
Banku") are modelled as a single dish with an option group whose price deltas reproduce
every printed combination.

- **Printed menus (PDF):** the originals live in [`public/menus/`](./public/menus) and are
  linked from each menu page and the footer. Guests can view the real thing alongside the
  interactive menu.
- **Food photography:** each dish is matched to the brands' own photos (their Instagram and
  Google Maps listings), compressed for the web. Dishes without a verified photo fall back
  to a designed colour gradient rather than a wrong picture. The mapping lives in
  [`lib/mock/images.ts`](./lib/mock/images.ts); candidate sources are recorded in
  [`scripts/image-candidates.json`](./scripts/image-candidates.json).
- **Restaurant entrances:** the "Visit" cards use real storefront photos of each kitchen.

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
