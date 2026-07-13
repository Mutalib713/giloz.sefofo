# 10 · Implementation Plan

Phased, demo-able at every step. Each phase ends in a working, committed, deployable state. The
app runs from **Phase 1 onward with zero secrets** (mock data), then swaps to live Supabase/
Paystack/Cloudinary/Maps by adding env keys — no rewrites.

## Guiding rules

- Ship vertical slices (a real screen working end-to-end) over horizontal stubs.
- Design tokens + motion primitives land early so every later screen inherits the premium feel.
- Accessibility & performance are acceptance criteria, not a final "pass".
- Commit per milestone with clear messages; keep `main` green.

---

### Phase 0 — Foundation & design system  ⏱ setup
- Scaffold Next.js 15 + React 19 + TS (strict) + Tailwind v4 + shadcn/ui.
- `styles/tokens.css` themes (house/giloz/sefofo), `next/font` (Fraunces, Geist), `lib/brands.ts`.
- Providers: Brand, Theme, SmoothScroll (Lenis), Toaster, React Query (if used), motion gates.
- Base layout: Header, Footer, MobileTabBar, Container, PageTransition, LoadingScreen.
- Motion toolkit (`Reveal, TextReveal, Parallax, TiltCard, MagneticButton, FloatingFood`).
- Mock data layer + fixtures mirroring the schema.
- **DoD:** app boots, brand switch flips theme live, reduced-motion respected, Lighthouse ≥95 on a blank themed page.

### Phase 1 — Landing + brand ecosystem  ⏱
- Landing `/`: cinematic hero (GSAP pin + text reveal + floating food), brand chooser (3D tilt),
  signature dishes, "Taste of Home" split, how-it-works, Naturia strip, reviews marquee, locations,
  newsletter, footer.
- Brand homes `/giloz` `/sefofo`: themed hero, category rail, chef's picks, collections, story.
- **BrandSwitcher** signature transition (color wipe + logo cross-fade + View Transitions).
- **DoD:** landing + both brand homes complete, animated, responsive, a11y-clean.

### Phase 2 — Menu, categories, product pages  ⏱
- `menu` with category rail, URL-synced filters/sort, search box, skeletons, reveal grid, pagination.
- `product/[slug]` PDP: gallery reveal/zoom, option picker (price deltas), qty, sticky add-to-cart,
  pairings (Naturia), reviews, JSON-LD.
- Wishlist (♥) local + (later) synced.
- **DoD:** browse → filter → open dish → choose options end-to-end; SEO structured data valid.

### Phase 3 — Cart & checkout & WhatsApp  ⏱
- Cart store (Zustand, persisted) + `CartSheet` + `/cart`; single-brand-cart guardrail dialog.
- Coupon input (validate), pairing upsell.
- Checkout: fulfilment (delivery/pickup), address + Maps autocomplete, **delivery-fee calc**
  (zones/Haversine), order summary, guest allowed.
- Payment step: **Paystack** (MoMo/card) init + **"Order on WhatsApp"** deep link.
- Success page + order number + ETA.
- **DoD:** full golden path completes (mock payment) and produces an order; WhatsApp message correct.

### Phase 4 — Auth, customer dashboard, order tracking  ⏱
- Supabase Auth (email OTP + Google), post-auth redirect, guest cart/wishlist merge.
- `/account`: orders, addresses, wishlist, reviews, settings.
- `/orders/[id]` realtime tracking (Supabase Realtime timeline + map + reorder).
- **DoD:** sign in, see history, track an order live as status changes.

### Phase 5 — Admin dashboard  ⏱
- Role-gated `/admin`: realtime **order board** (advance status → customer sees live), menu
  manager (CRUD, Cloudinary upload, availability), coupons, reviews moderation, customers,
  settings (hours/zones/fees/brand content), metrics.
- **DoD:** staff can manage menu + drive an order through every status; storefront revalidates.

### Phase 6 — Content, reviews, supporting pages  ⏱
- Journal (blog) index+article, About (Ewe heritage story), Careers + apply, Contact + map +
  WhatsApp, FAQ (searchable accordion), legal pages.
- Reviews submission + moderation surfaced on PDP + aggregate rating.
- **DoD:** all navigation destinations real; no dead links.

### Phase 7 — PWA, SEO, performance, a11y hardening  ⏱
- PWA (Serwist): manifest, icons, offline menu browsing, install prompt.
- SEO: metadata, per-brand OG images, JSON-LD everywhere, sitemaps, robots.
- Perf: image strategy (Cloudinary AVIF/LQIP), code-split motion, `content-visibility`, font
  subset, route prefetch, bundle audit.
- A11y: keyboard/SR audit, focus management, contrast, reduced-motion sweep.
- **DoD:** **Lighthouse 95+** (Perf/A11y/BP/SEO) mobile on key routes; installable; axe-clean.

### Phase 8 — Data, tests, deploy  ⏱
- Supabase migrations + RLS + RPCs + `seed.sql`; generate types; wire live data path.
- Playwright golden-path + a11y smoke; unit tests for fees/coupons/formatting.
- Deploy (Vercel) + Supabase project; env wiring; webhook config.
- **DoD:** live build passes CI, deploys, real order flow works with test Paystack keys.

---

## Definition of Done (every feature)

- [ ] Responsive (360 → 1440+), mobile-first
- [ ] Loading / empty / error states designed
- [ ] Keyboard + screen-reader operable; visible focus; AA contrast
- [ ] `prefers-reduced-motion` honored
- [ ] Themed via tokens (works in both brands)
- [ ] Typed (no `any`), Zod-validated inputs, lint/format clean
- [ ] No console errors; no layout shift (CLS≈0); animates only transform/opacity
- [ ] SEO metadata / JSON-LD where relevant

## Risks & mitigations

| Risk | Mitigation |
|------|-----------|
| No live keys in this environment | Mock-mode data layer → runs & demos without secrets |
| Heavy animation vs. 95+ Lighthouse | GPU-only transforms, lazy/deferred GSAP, reduced-motion, code-split |
| Real menu/prices/photos pending | Seed placeholders (correct dish names/₵); trivial swap when provided |
| Ghana payments specifics | Paystack MoMo abstracted behind a payments interface (Flutterwave-ready) |
| Scope breadth | Vertical slices; MVP vs fast-follow split (see strategy) |

## What I need from you to go live (not to start)

1. Confirm/replace house brand name (**"Homefire"** working).
2. Real WhatsApp numbers + addresses + hours per brand.
3. Menu items, prices (₵), and photography (or approve placeholders for now).
4. Paystack (or Flutterwave) + Supabase + Cloudinary + Google Maps keys.

None of the above blocks building — the whole platform is developed against mocks and wired to
live services at the end.
