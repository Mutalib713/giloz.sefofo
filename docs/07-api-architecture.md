# 07 · API Architecture

**Principle:** Server-first. Next.js 15 App Router with **React Server Components** for reads and
**Server Actions** for mutations. Route Handlers exist only where an external system must call *us*
(payment webhooks, WhatsApp, sitemaps). Supabase is accessed through typed server/browser clients;
secrets never reach the client.

## Layers

```
UI (RSC + client islands)
   │  server actions (mutations)     RSC data fns (reads)
   ▼                                   ▼
lib/data/*  (typed data-access layer, Zod-validated) ─── Supabase (Postgres, RLS, Realtime)
   │
   ├─ integrations/paystack   (payments)
   ├─ integrations/whatsapp   (deep links + Cloud API optional)
   ├─ integrations/cloudinary (signed uploads, URL builder)
   └─ integrations/maps       (Places autocomplete, geocode, zones)
```

## Supabase clients

- `lib/supabase/server.ts` — RSC/action client (cookies, RLS as the signed-in user).
- `lib/supabase/admin.ts` — service-role client, **server-only**, for webhooks/admin RPCs.
- `lib/supabase/client.ts` — browser client for Realtime subscriptions only.
- `lib/supabase/types.ts` — types generated from the DB (`supabase gen types`).

## Data-access layer (reads) — `lib/data/*`

Pure, cached, typed functions consumed by Server Components. Tagged for on-demand revalidation.

```ts
getBrand(key)                         // brand + theme + locations
getCategories(brand)                  // ordered, active
getMenu(brand, { category, filters, sort, q, page })
getProduct(brand, slug)               // + variants, images, tags, pairings, reviews
getCollections(brand)
searchProducts(q, { brand?, facets })
getFaqs() · getArticles() · getArticle(slug) · getJobs()
getMyOrders() · getOrder(idOrToken)   // RLS or signed token
getWishlist() · getAddresses()
// admin
adminListOrders(filter) · adminListProducts() · adminMetrics()
```

Caching: static-ish catalog uses `unstable_cache`/`revalidateTag('menu:giloz')`; per-user data is
dynamic (no cache). Admin edits call `revalidateTag`/`revalidatePath` so the storefront updates.

## Server Actions (mutations) — `app/**/actions.ts`

Every action: `'use server'` → Zod-parse input → authorize → data layer → revalidate → typed
result `{ ok, data } | { ok:false, error }`.

| Action | Purpose |
|--------|---------|
| `addToCart / updateQty / removeItem` | cart (server-persisted for auth; store for guest) |
| `applyCoupon(code)` | RPC `validate_coupon` |
| `quoteDelivery(brand, address)` | RPC `quote_delivery` (zone + fee + ETA) |
| `placeOrder(payload)` | RPC `place_order` (atomic) → returns order + payment intent |
| `createPaystackTx(orderId)` | init Paystack transaction, return authorization URL |
| `buildWhatsappOrder(payload)` | returns `wa.me` deep link with itemised text |
| `toggleWishlist(productId)` | wishlist |
| `submitReview(payload)` | verified review (moderated) |
| `saveAddress / setDefaultAddress` | address book |
| `subscribeNewsletter / submitContact / applyToJob` | forms |
| **admin** `upsertProduct, toggleAvailability, upsertCategory, reorder, upsertCoupon, advanceOrderStatus, moderateReview, upsertZone` | management |

## Route Handlers (`app/api/*`) — only for inbound/edge

| Route | Method | Why a handler |
|-------|--------|---------------|
| `/api/webhooks/paystack` | POST | verify `x-paystack-signature`; mark order paid; emit event |
| `/api/whatsapp/webhook` | GET/POST | (optional) WhatsApp Cloud API verify + inbound |
| `/api/cloudinary/sign` | POST | signed upload params for admin image uploads |
| `/api/maps/autocomplete` | GET | proxy Places (keeps key server-side, rate-limits) |
| `/api/og/[...]` | GET | dynamic OpenGraph images (brand-themed) |
| `/api/health` | GET | uptime |
| `sitemap.ts`, `robots.ts`, `manifest.ts` | — | SEO/PWA framework files |

## Integrations

### Paystack (Ghana payments — MoMo + card)
- Initialize transaction server-side (amount in pesewas, `GHS`, `channels:['mobile_money','card']`),
  redirect to `authorization_url`; verify via **webhook** (source of truth) + callback.
- Never trust client success; order flips to `paid` only on verified webhook.
- Refunds via admin action → Paystack refund API.
- Swap-friendly: `integrations/payments` interface so Flutterwave can drop in.

### WhatsApp
- **Baseline:** `wa.me/<brand>?text=<urlencoded order>` deep link — works today, no API.
- **Optional upgrade:** WhatsApp Cloud API for order confirmations/status via templates.

### Cloudinary
- `lib/cloudinary.ts` URL builder (format `auto`, quality `auto`, responsive widths, LQIP).
- Admin uploads use **signed** params from `/api/cloudinary/sign` (secret stays server-side).

### Google Maps
- Places Autocomplete (address → lat/lng) via server proxy; geocode; point-in-polygon against
  `delivery_zones`; static/dynamic map on tracking & contact. `@react-google-maps/api` client, key
  restricted by referrer + proxied where possible.

## Validation, errors, security

- **Zod** schemas in `lib/validators/*` shared by forms (RHF resolver) and actions.
- Uniform `ActionResult<T>`; toasts on the client; never leak internals.
- Authz helper `requireRole('staff')` in every admin action; RLS is the backstop.
- Webhooks: signature-verified, idempotent (dedupe by event id/reference).
- Rate-limit sensitive routes (coupon, contact, autocomplete).
- Security headers/CSP via middleware; secrets only in env; service role never shipped to client.

## Environment variables (all optional for local mock mode)

```
NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
PAYSTACK_SECRET_KEY / NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
NEXT_PUBLIC_WHATSAPP_GILOZ / NEXT_PUBLIC_WHATSAPP_SEFOFO
NEXT_PUBLIC_SITE_URL
```

**Mock mode:** if Supabase env is absent, the data layer serves typed fixtures from
`lib/mock/*` (mirrors the schema) so the entire app runs, demos, and passes Lighthouse without
any secret. Adding real keys switches to live services with no code change.
