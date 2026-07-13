# 04 · Wireframes (low-fidelity)

Text wireframes for the launch-critical screens. Layout intent only — visual design lives in
`05-design-system.md`. All screens are **mobile-first**; desktop notes follow each.

Legend: `▓` image/media · `[ ]` button · `( )` input · `•` icon · `┈` divider

---

## 1 · Landing `/` (house)

```
┌───────────────────────────────────────────┐
│ ≡   HOMEFIRE            •search ♥ • cart(0) │  sticky, transparent→glass on scroll
├───────────────────────────────────────────┤
│                                             │
│   ▓▓▓▓▓  full-bleed cinematic food  ▓▓▓▓▓   │  GSAP hero: parallax + floating dishes
│                                             │
│      Two kitchens. One heritage.            │  oversized serif, word-by-word reveal
│      Eʋe food, delivered beautifully.       │
│                                             │
│      ┌───────────┐   ┌───────────┐          │
│      │  GILOZ  → │   │  SEFOFO → │          │  brand chooser cards (hover: 3D tilt)
│      │ ▓ dark/gold│   │ ▓ warm/clay│         │
│      └───────────┘   └───────────┘          │
├───────────────────────────────────────────┤
│  ● ● ●  Signature dishes (horizontal snap)  │  scroll-reveal, image parallax
├───────────────────────────────────────────┤
│  "Taste of Home"  editorial split ▓ | text  │
├───────────────────────────────────────────┤
│  How it works · Menu → Cart → MoMo/WhatsApp │  3-step, animated line
├───────────────────────────────────────────┤
│  Naturia Beverages pairing strip ▓▓▓        │
├───────────────────────────────────────────┤
│  Reviews marquee · Locations map · Newsletter│
├───────────────────────────────────────────┤
│  FOOTER (brands · company · support · legal)│
└───────────────────────────────────────────┘
Desktop: two-column brand chooser overlapping a wide hero; sticky mini-nav.
```

## 2 · Brand home `/[brand]`

```
┌───────────────────────────────────────────┐
│ ≡  [ Giloz ⇄ Sefofo ]   •search ♥ cart(2)  │  ← brand switcher pill
├───────────────────────────────────────────┤
│  ▓ brand hero (themed) · logo · tagline     │
│  [ See full menu ]   [ Order on WhatsApp ]  │
├───────────────────────────────────────────┤
│  Categories rail:  Soups Grills Rice Swallows Drinks →
├───────────────────────────────────────────┤
│  Chef's picks (cards)  ▓ ▓ ▓                 │
│  Collections: Taste of Home · Under ₵50      │
├───────────────────────────────────────────┤
│  Story block (Ewe heritage) ▓ | text        │
│  Location + hours + map                      │
└───────────────────────────────────────────┘
```

## 3 · Menu `/[brand]/menu`

```
┌───────────────────────────────────────────┐
│ [ Giloz ⇄ Sefofo ]        ( search dishes )│
├───────────────────────────────────────────┤
│ Categories: [All][Soups][Grills][Rice][…]  │  sticky pill rail, active underline
│ Filters ▾  Sort ▾   ·  32 dishes            │  filters open a sheet (mobile)/rail (desktop)
├───────────────────────────────────────────┤
│  ┌───────┐ ┌───────┐                        │
│  │ ▓ img │ │ ▓ img │   2-col mobile grid    │  skeleton→image reveal, ♥, "+ add"
│  │ Name  │ │ Name  │   3–4 col desktop      │
│  │ ₵ 45  │ │ ₵ 60  │                        │
│  │ ♥  [+]│ │ ♥  [+]│                        │
│  └───────┘ └───────┘                        │
│            … infinite / paginated …          │
└───────────────────────────────────────────┘
Empty/no-results: warm illustration + "clear filters".
```

## 4 · Product detail `/[brand]/product/[slug]`

```
┌───────────────────────────────────────────┐
│ ‹ back                         ♥   • share │
│  ▓▓▓▓▓ gallery (reveal + zoom) ▓▓▓▓▓        │
├───────────────────────────────────────────┤
│  Akple & Ademe Soup        ★★★★★ (128)      │
│  Eʋe name · tags: [spicy][contains fish]    │
│  ₵ 55                                        │
│  Description (what's in it, for newcomers)  │
├───────────────────────────────────────────┤
│  Options:  Size ( )  Protein ( )  Spice ( ) │  segmented / radio, updates price
│  Qty  [ − 1 + ]                              │
│  [  Add to cart · ₵55  ]  [ WhatsApp ]      │  sticky bottom bar on mobile
├───────────────────────────────────────────┤
│  Pairs well with →  Naturia Sobolo ▓ [+]    │  upsell rail
│  Reviews (list + photos)  ·  Nutrition      │
└───────────────────────────────────────────┘
```

## 5 · Cart (slide-over + `/cart`)

```
┌───────────────── Cart · Giloz ────────────┐
│  ▓ item  Akple & Ademe   ₵55   [− 1 +]  ✕ │
│  ▓ item  Grilled Tilapia ₵90   [− 1 +]  ✕ │
│  ┈                                         │
│  + Add a drink?  Naturia Sobolo ₵15  [+]   │  pairing upsell
│  ( promo code )                    [apply] │
│  Subtotal                          ₵160    │
│  Delivery (est.)                   ₵20     │
│  ─────────────────────────────────────     │
│  Total                             ₵180    │
│  [  Checkout  ]   [ Order on WhatsApp ]    │
└────────────────────────────────────────────┘
```

## 6 · Checkout `/checkout`

```
┌───────────────────────────────────────────┐
│  Checkout                    (3-step rail) │
│  ① Fulfilment   ② Details   ③ Pay          │
├───────────────────────────────────────────┤
│  ( ) Delivery   ( ) Pickup                  │
│  Delivery → ( address, Maps autocomplete )  │
│            zone: East Legon · fee ₵20       │
│  Pickup   → ○ Pig-Farm  ○ Dzorwulu · time   │
├───────────────────────────────────────────┤
│  ( name ) ( phone/WhatsApp ) ( email )      │
│  ( delivery note )                          │
├───────────────────────────────────────────┤
│  Order summary  ·  ₵180                     │
│  ( ) Pay with Paystack (MoMo/card)          │
│  ( ) Order on WhatsApp                       │
│  [  Place order · ₵180  ]                   │
└───────────────────────────────────────────┘
Desktop: two columns — form left, sticky order summary right.
```

## 7 · Order tracking `/orders/[id]`

```
┌───────────────────────────────────────────┐
│  Order #GZ-1042 · Giloz            ⟳ live  │
│  ●───●───◐───○───○                          │  animated timeline
│  Received Confirmed Preparing Out Completed │
│  ETA 25–35 min                              │
│  ▓ map: store → your address                │
│  Items · Total ₵180                         │
│  [ Reorder ]  [ Contact on WhatsApp ]       │
└───────────────────────────────────────────┘
```

## 8 · Customer dashboard `/account`

```
┌───────────────────────────────────────────┐
│  Hi, Ama 👋            [Giloz ⇄ Sefofo]     │
│  ┌ Orders ┐ ┌ Wishlist ┐ ┌ Addresses ┐     │  card nav
│  ┌ Reviews┐ ┌ Settings ┐                    │
│  Recent orders (status chips, reorder)      │
│  Saved items grid                           │
└───────────────────────────────────────────┘
```

## 9 · Admin `/admin` (desktop-first)

```
┌── sidebar ──┬─────────────────────────────┐
│ Orders  ⟳   │  LIVE ORDER BOARD            │
│ Menu        │  [New] [Confirmed] [Prep] …  │  kanban columns, cards animate in
│ Coupons     │  ┌ #1042 Giloz ₵180 ▸ ┐      │
│ Customers   │  └ advance status      ┘     │
│ Reviews     │                             │
│ Settings    │  Menu tab: table + drawer    │
└─────────────┴─────────────────────────────┘
```

## 10 · Supporting pages

- **About** — full-bleed story of the two kitchens + Eʋe heritage, timeline, founders, locations.
- **Journal** — editorial grid → article (rich text, hero, share).
- **Careers** — roles list → detail + apply form.
- **Contact** — map, WhatsApp/phone/email, hours, form.
- **FAQ** — searchable accordion grouped by topic (ordering, delivery, payment, allergens).
- **Auth** — minimal, centered, brand-neutral, OTP + Google.
