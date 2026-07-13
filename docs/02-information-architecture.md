# 02 · Information Architecture

## Sitemap

```
/                                   Landing (house) — brand chooser + editorial hero
│
├── /giloz                          Brand home — Giloz (themed)
├── /sefofo                         Brand home — Sefofo (themed)
│
├── /[brand]/menu                   Full menu (categories, filters, search)
│   └── /[brand]/menu/[category]    Category view (e.g. /giloz/menu/soups)
├── /[brand]/product/[slug]         Product detail page (PDP)
│
├── /cart                           Cart (slide-over everywhere + full page)
├── /checkout                       Checkout (address, fulfilment, pay)
│   └── /checkout/success           Confirmation
├── /orders/[orderId]               Order tracking (realtime)
│
├── /search                         Global search results
├── /wishlist                       Saved items
│
├── /account                        Customer dashboard (auth)
│   ├── /account/orders             Order history
│   ├── /account/addresses          Saved addresses
│   ├── /account/wishlist           Saved items
│   ├── /account/reviews            My reviews
│   └── /account/settings           Profile & preferences
│
├── /admin                          Admin dashboard (role-gated)
│   ├── /admin/orders               Live order board (realtime)
│   ├── /admin/menu                 Products / categories / availability
│   ├── /admin/coupons              Promotions
│   ├── /admin/customers            Customers
│   ├── /admin/reviews              Moderation
│   └── /admin/settings             Brands, zones, delivery fees, hours
│
├── /journal                        Blog / stories index
│   └── /journal/[slug]             Article
├── /about                          Story of the two kitchens + Eʋe heritage
├── /careers                        Careers index
│   └── /careers/[slug]             Role detail + apply
├── /contact                        Contact + map + WhatsApp
├── /faq                            FAQ (accordion, searchable)
│
├── /auth/sign-in  /auth/sign-up  /auth/callback  /auth/reset
│
└── legal: /privacy  /terms  /refunds  /accessibility
```

### Route conventions

- `[brand]` is a dynamic segment validated against `{ giloz | sefofo }`; unknown brands → 404.
- The **active brand** is also held in a cookie + store so brand-agnostic pages (cart, account)
  keep the right theme. URL is the source of truth on brand pages; cookie is the fallback.
- Menus are keyed by brand; a category slug is unique per brand.

## Navigation model

**Global header (sticky, glass on scroll)**
`[Homefire mark] · [Brand switcher ⌄] · Menu · About · Journal · Contact · [Search] · [Wishlist] · [Account] · [Cart •n]`

- **Brand switcher** — the signature control. A segmented pill (Giloz ⇄ Sefofo) that, on change,
  runs a themed page transition (color, logo, imagery morph) and routes to that brand's home
  or the equivalent page.
- On mobile: condensed header + bottom **tab bar** `Home · Menu · Search · Cart · Account` and a
  full-screen menu drawer holding the brand switcher.

**Footer (house)**
Brand columns (Giloz · Sefofo · Naturia) · Company (About, Journal, Careers, Contact) ·
Support (FAQ, Order tracking, Contact) · Legal · Socials (IG/TikTok/FB/X) · WhatsApp CTA ·
newsletter · language/locale · "Made in Accra 🇬🇭".

## Content model (entities)

The menu is **data-driven** (Supabase), never hard-coded. Core content entities:

- **Brand** — identity, theme tokens, story, hours, locations, socials.
- **Category** — per brand, ordered, with hero image (e.g. Soups, Rice & Grains, Grills,
  Swallows/Akple & Banku, Small Chops, Drinks/Naturia).
- **Product** — dish: name, Ewe name, description, price (₵), images, tags (spicy, vegan, chef's
  pick, contains-fish…), options/variants (size, protein, spice level), pairings, availability.
- **Collection** — editorial groupings for merchandising ("Taste of Home", "Chef's Table",
  "Under ₵50", "Naturia Pairings").
- **Review** — rating + body + photos, tied to product & verified order.
- **Article** (Journal) · **Job** (Careers) · **FAQ item** · **Coupon** · **Delivery zone**.

See `06-database-schema.md` for full schema.

## URL & SEO strategy

- Human-readable slugs: `/giloz/product/akple-and-ademe-soup`.
- Canonical URLs per page; brand pages carry brand-scoped OpenGraph + JSON-LD.
- Structured data: `Restaurant`, `Menu`, `MenuItem`, `Offer`, `AggregateRating`,
  `BreadcrumbList`, `FAQPage`, `Article`, `LocalBusiness` (per location).
- Per-brand `sitemap-[brand].xml` + root `sitemap.xml`; `robots.ts`.
- Localised currency (GHS) and `en-GH` locale hints.

## Search & filtering IA

- **Global search** (`⌘K` / tap): products across both brands, grouped by brand, with category
  and dietary facets. Instant results, recent & trending queries, "no results" recovery.
- **Menu filters:** category, dietary (vegan/veg/contains fish/gluten-sensitive), spice level,
  price range, "chef's picks", "new", availability. Sort: recommended, price, popularity, newest.
- Filters are URL-encoded (`?diet=vegan&spice=mild&sort=price`) → shareable & SSR-friendly.
