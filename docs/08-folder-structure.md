# 08 · Folder Structure

Next.js 15 App Router, feature-oriented, colocation-friendly, `@/*` path alias. Route groups keep
URLs clean while separating concerns: `(marketing)`, `(shop)`, `(account)`, `(admin)`, `(auth)`.

```
restaurant/
├── app/
│   ├── layout.tsx                  # root: fonts, providers, theme, PWA meta
│   ├── page.tsx                    # landing "/" (house, brand chooser)
│   ├── globals.css                 # tailwind entry + tokens import
│   ├── manifest.ts  robots.ts  sitemap.ts
│   ├── loading.tsx  error.tsx  not-found.tsx
│   │
│   ├── (marketing)/                # about, journal, careers, contact, faq
│   │   ├── about/page.tsx
│   │   ├── journal/page.tsx
│   │   ├── journal/[slug]/page.tsx
│   │   ├── careers/page.tsx  careers/[slug]/page.tsx
│   │   ├── contact/page.tsx  contact/actions.ts
│   │   └── faq/page.tsx
│   │
│   ├── (shop)/
│   │   ├── [brand]/
│   │   │   ├── page.tsx             # brand home
│   │   │   ├── menu/page.tsx        # menu (filters/search/sort via searchParams)
│   │   │   ├── menu/[category]/page.tsx
│   │   │   └── product/[slug]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx  checkout/actions.ts  checkout/success/page.tsx
│   │   ├── orders/[id]/page.tsx     # realtime tracking (signed token or auth)
│   │   ├── search/page.tsx
│   │   └── wishlist/page.tsx
│   │
│   ├── (account)/account/
│   │   ├── layout.tsx  page.tsx
│   │   ├── orders/page.tsx  addresses/page.tsx
│   │   ├── wishlist/page.tsx  reviews/page.tsx  settings/page.tsx
│   │   └── actions.ts
│   │
│   ├── (admin)/admin/
│   │   ├── layout.tsx               # role guard
│   │   ├── page.tsx                 # dashboard/metrics
│   │   ├── orders/page.tsx          # realtime board
│   │   ├── menu/page.tsx  coupons/page.tsx
│   │   ├── customers/page.tsx  reviews/page.tsx  settings/page.tsx
│   │   └── actions.ts
│   │
│   ├── (auth)/
│   │   ├── sign-in/page.tsx  sign-up/page.tsx  reset/page.tsx
│   │   └── callback/route.ts        # OAuth/OTP callback
│   │
│   └── api/
│       ├── webhooks/paystack/route.ts
│       ├── whatsapp/webhook/route.ts
│       ├── cloudinary/sign/route.ts
│       ├── maps/autocomplete/route.ts
│       ├── og/[...params]/route.tsx
│       └── health/route.ts
│
├── components/
│   ├── ui/                          # shadcn/ui primitives (button, dialog, sheet, …)
│   ├── brand/                       # BrandSwitcher, BrandProvider, BrandBadge, ThemeVars
│   ├── layout/                      # Header, Footer, MobileTabBar, Container, PageTransition
│   ├── menu/                        # MenuGrid, ProductCard, CategoryRail, Filters, SortMenu
│   ├── product/                     # Gallery, OptionPicker, QtyStepper, AddToCartBar, Pairings
│   ├── cart/                        # CartSheet, CartLine, CartSummary, CouponInput
│   ├── checkout/                    # FulfilmentStep, AddressForm, PaymentStep, OrderSummary
│   ├── orders/                      # StatusTimeline, TrackMap, ReorderButton
│   ├── reviews/                     # ReviewList, ReviewForm, Stars
│   ├── home/                        # Hero, BrandChooser, SignatureDishes, HowItWorks, Marquee
│   ├── admin/                       # OrderBoard, ProductTable, ProductForm, MetricCard
│   ├── motion/                      # Reveal, Parallax, FloatingFood, TiltCard, MagneticButton,
│   │                                #   TextReveal, PageTransition, useReducedMotionSafe
│   ├── media/                       # CloudinaryImage, BlurImage, VideoLoop
│   └── common/                      # SearchCommand(⌘K), Rating, PriceTag, EmptyState,
│                                    #   Skeletons, Toaster, Newsletter, Seo/JsonLd
│
├── lib/
│   ├── brands.ts                    # HOUSE + BRANDS config (single source)
│   ├── supabase/{server,client,admin,types}.ts
│   ├── data/*.ts                    # typed read layer (getMenu, getProduct, …)
│   ├── integrations/{paystack,whatsapp,cloudinary,maps}.ts
│   ├── validators/*.ts              # Zod schemas
│   ├── mock/*.ts                    # fixtures for secret-free run
│   ├── cart/                        # zustand store + server sync
│   ├── hooks/                       # useBrand, useCart, useWishlist, useMediaQuery, useLenis
│   ├── seo.ts  jsonld.ts  fees.ts  format.ts (₵/GHS)  cn.ts  constants.ts
│
├── styles/
│   ├── tokens.css                   # CSS custom-property themes (house/giloz/sefofo)
│   └── fonts.ts                     # next/font (Fraunces, Geist)
│
├── supabase/
│   ├── migrations/                  # SQL (schema + RLS + RPCs + triggers)
│   ├── seed.sql
│   └── config.toml
│
├── public/                          # icons, manifest icons, og fallback, illustrations
├── e2e/                             # Playwright (golden-path, a11y)
├── middleware.ts                    # auth/session, security headers, brand cookie
├── next.config.ts  tailwind (v4 via css)  postcss.config.mjs
├── tsconfig.json  .eslintrc  .prettierrc  components.json (shadcn)
├── .env.example
└── docs/                            # this architecture
```

### Conventions

- **Server by default.** Add `'use client'` only for interactive islands (switcher, cart, motion,
  forms, admin board). Keep client bundles lean for the 95+ Lighthouse target.
- **Colocation.** A route's `actions.ts` lives beside its `page.tsx`.
- **One import barrel per domain** (`components/menu/index.ts`) for tidy imports.
- **No business logic in components** — it lives in `lib/data`, actions, and RPCs.
- **Naming:** components `PascalCase`, hooks `useX`, utils `camelCase`, routes lowercase.
