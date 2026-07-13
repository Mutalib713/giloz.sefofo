# 09 · Component Library

Built on **shadcn/ui** (Radix primitives, "new-york" style) as the accessible base, extended with
brand-aware, motion-rich components. Every component: typed props, all states (default/hover/
focus/active/disabled/loading/empty/error), keyboard-operable, reduced-motion aware, themed via
CSS vars (no hard-coded brand colors).

## Primitives (shadcn/ui — `components/ui`)

`button · badge · card · dialog · sheet · drawer · dropdown-menu · popover · tooltip · tabs ·
accordion · input · textarea · select · radio-group · checkbox · switch · slider · label ·
form · toast/sonner · skeleton · avatar · separator · scroll-area · command · carousel · progress`

Extended button variants: `primary · secondary · ghost · outline · link · magnetic` ×
sizes `sm/md/lg/icon`, with `loading` (spinner + disabled) and `asChild`.

## Brand system (`components/brand`)

| Component | Props | Notes |
|-----------|-------|-------|
| `BrandProvider` | `brand, children` | sets `data-brand`, exposes context + cookie sync |
| `BrandSwitcher` | `variant: pill \| drawer` | segmented Giloz⇄Sefofo; triggers themed transition; keyboard + `aria` |
| `BrandBadge` | `brand, size` | small brand lockup |
| `ThemeVars` | `brand` | injects the CSS-var theme block |

## Layout (`components/layout`)

`Header` (transparent→glass on scroll, brand switcher, search, wishlist, cart badge) ·
`Footer` (brand columns, socials, newsletter, "Made in Accra") · `MobileTabBar` (Home/Menu/
Search/Cart/Account) · `Container` (max-width rhythm) · `PageTransition` (route-level Framer/
View-Transitions) · `Announcement` (promo bar).

## Menu & product

| Component | Purpose | Key states |
|-----------|---------|-----------|
| `ProductCard` | dish card (image, name, ₵, ♥, +add) | skeleton→reveal, hover 3D tilt, sold-out, adding |
| `MenuGrid` | responsive grid + stagger reveal | loading skeletons, empty |
| `CategoryRail` | sticky pill category nav | active, scroll-spy |
| `Filters` | diet/spice/price facets (sheet/rail) | applied count, clear, URL-synced |
| `SortMenu` | recommended/price/popularity/new | — |
| `ProductGallery` | PDP image reveal + zoom + drag | loading, single/multi |
| `OptionPicker` | size/protein/spice → price delta | default, invalid combo |
| `QtyStepper` | − n + | min/max, disabled |
| `AddToCartBar` | sticky PDP CTA (add + WhatsApp) | idle, adding, added ✓ |
| `Pairings` | Naturia/side upsell rail | — |
| `PriceTag` | tabular ₵ w/ optional strike | promo |
| `Rating` / `Stars` | display + input | readOnly/interactive |

## Cart & checkout

`CartSheet` (slide-over, glass, live totals, `aria-live`) · `CartLine` (qty, remove, options) ·
`CartSummary` (subtotal/discount/delivery/total) · `CouponInput` (apply/validate/error) ·
`FulfilmentStep` (delivery/pickup) · `AddressForm` (Maps autocomplete → lat/lng, zone+fee) ·
`PaymentStep` (Paystack MoMo/card ⋁ WhatsApp) · `OrderSummary` (sticky) · `EmptyCart`.

## Orders & reviews

`StatusTimeline` (animated, realtime) · `TrackMap` (store→destination, ETA) · `OrderCard` ·
`ReorderButton` · `ReviewList` · `ReviewForm` (rating+photo+text, verified badge).

## Home / marketing (`components/home`)

`Hero` (GSAP pinned, text reveal, floating food) · `BrandChooser` (two 3D-tilt cards) ·
`SignatureDishes` (horizontal snap + parallax) · `StorySplit` (editorial image/text) ·
`HowItWorks` (animated 3-step) · `NaturiaStrip` (beverage pairing) · `ReviewsMarquee` ·
`LocationsMap` · `Newsletter` · `StatCounter`.

## Motion toolkit (`components/motion`)

| Component / hook | Does |
|------------------|------|
| `Reveal` | in-view mask/opacity/translate reveal (IntersectionObserver + Framer) |
| `TextReveal` | word/line staggered display reveal |
| `Parallax` | scroll-linked translate (GSAP ScrollTrigger) |
| `FloatingFood` | orbiting/floating hero dishes |
| `TiltCard` | pointer-tracked 3D tilt + glare |
| `MagneticButton` | cursor-magnetic CTA |
| `MarqueeRow` | infinite marquee (pauses on hover/reduced-motion) |
| `PageTransition` | enter/exit route morphs |
| `SmoothScroll` | Lenis provider |
| `useReducedMotionSafe` | gate that no-ops animations when reduced motion |
| `LoadingScreen` | ember-mark draw-in intro |

## Media (`components/media`)

`CloudinaryImage` (auto format/quality, responsive `sizes`, LQIP blur, art-directed crop) ·
`BlurImage` (next/image + blurDataURL) · `VideoLoop` (muted, lazy, reduced-motion poster).

## Common (`components/common`)

`SearchCommand` (⌘K, cross-brand, facets, recents) · `EmptyState` (illustrated + action) ·
`Skeletons` (card/grid/pdp/timeline) · `Toaster` (sonner) · `JsonLd`/`Seo` (structured data) ·
`ShareCard` · `Pagination` · `ErrorState`.

## Admin (`components/admin`)

`OrderBoard` (realtime kanban, drag/advance status) · `OrderTicket` · `ProductTable` +
`ProductForm` (Cloudinary upload, variants, tags, availability) · `CouponForm` · `MetricCard` ·
`ZoneEditor` (map polygon) · `ReviewModeration`.

## Quality bar per component

- Typed props + sensible defaults; `className` passthrough via `cn()`.
- Loading & empty & error states designed, not afterthoughts.
- Focus-visible ring, ARIA roles/labels, keyboard paths, 44px targets.
- Reduced-motion variant. Storybook-style states documented in `docs` where useful.
- Zero brand hard-coding — themed only through tokens.
