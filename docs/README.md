# Architecture — Homefire (Giloz × Sefofo)

This folder is the complete architecture for the Giloz & Sefofo ordering platform, produced
**before any application code** per the project brief. Read top to bottom.

| # | Document | Deliverable |
|---|----------|-------------|
| 00 | [Brand Research](./00-brand-research.md) | Verified findings — source of truth |
| 01 | [Product Strategy](./01-product-strategy.md) | Vision, brand model, personas, KPIs |
| 02 | [Information Architecture](./02-information-architecture.md) | Sitemap, routes, nav, content model |
| 03 | [User Flows](./03-user-flows.md) | Golden path, brand switch, checkout, tracking, admin |
| 04 | [Wireframes](./04-wireframes.md) | Low-fi layouts for every key screen |
| 05 | [Design System — "Ember"](./05-design-system.md) | Identity, color, type, motion, tokens |
| 06 | [Database Schema](./06-database-schema.md) | Supabase Postgres, RLS, RPCs |
| 07 | [API Architecture](./07-api-architecture.md) | Server actions, handlers, integrations |
| 08 | [Folder Structure](./08-folder-structure.md) | Next.js 15 project layout |
| 09 | [Component Library](./09-component-library.md) | Component inventory & states |
| 10 | [Implementation Plan](./10-implementation-plan.md) | Phased build, DoD, risks |

## TL;DR

- **Two brands, one ecosystem** under a house brand (working name **Homefire**). Live brand
  switching re-themes the whole UI via CSS custom properties.
- **Design language "Ember"** — warm, cinematic, editorial luxury rooted in **Eʋe/Volta
  heritage**; Giloz = refined gold-on-dark, Sefofo = warm terracotta-on-cream.
- **Ghana-first commerce** — prices in **₵ (GHS)**, **Paystack** (Mobile Money + card),
  **WhatsApp** ordering, **Accra** delivery zones. Authentic, not generic.
- **Stack** — Next.js 15 · React 19 · TS · Tailwind v4 · shadcn/ui · Framer Motion · GSAP ·
  Lenis · Supabase · Cloudinary · PWA. Server-first; 95+ Lighthouse target.
- **Runs without secrets** — mock-mode data layer means it builds, demos, and passes Lighthouse
  before any keys exist; adding env keys switches to live services with no code change.

## Open decisions (for approval)

1. **House brand name** — "Homefire" vs. alternatives (Volta Table, The Eʋe Table, …).
2. **Naturia Beverages** — beverage category across brands (assumed) vs. full third brand.
3. **Build scope now** — full phased build vs. a specific first slice.

_Nothing here is locked; it's the plan to react to._
