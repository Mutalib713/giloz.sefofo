# 01 · Product Strategy

## Vision

> Turn two beloved Accra kitchens into **one cinematic, effortless ordering experience** — the
> most beautiful way to eat Eʋe food, on any phone, in under two minutes.

We are not building "a restaurant website." We are building a **branded ordering product** that
happens to be gorgeous — the taste of home, delivered with the polish of Apple and the ease of
Uber Eats, grounded in the reality of ordering food in Ghana.

## Product principles

1. **Food is the hero.** Photography and motion serve the food; chrome recedes. Every screen
   should make you hungry.
2. **Two brands, one soul.** Switching between Giloz and Sefofo re-skins the world (color, tone,
   imagery) without ever losing the cart, the session, or the guest.
3. **Fast beats fancy where it counts.** Delight in the hero; ruthlessness in the funnel. The
   path from craving → order is short, obvious, and interruption-free.
4. **Meet guests where they are.** WhatsApp ordering and Mobile Money are first-class, not
   afterthoughts. Guest checkout before forced sign-up.
5. **Accessible luxury.** Premium *and* WCAG 2.2 AA. Motion respects `prefers-reduced-motion`.
6. **Real, not generic.** Ghana Cedis, Accra zones, Ewe dish names spelled correctly with
   helpful descriptions for newcomers.

## The brand model

```
                    ┌───────────────────────────┐
                    │   HOMEFIRE  (house brand)  │   ← neutral luxury shell
                    │  "Two kitchens. One heritage." │  account, cart, checkout,
                    └───────────┬───────────────┘     order history live here
                    ┌───────────┴───────────────┐
        ┌───────────▼──────────┐     ┌──────────▼───────────┐
        │  GILOZ RESTAURANT    │     │       SEFOFO         │
        │  refined · gold/dark │     │  nostalgic · warm    │
        │  Ewe + Ghanaian +    │     │  homestyle comfort   │
        │  Nigerian + conti.   │     │  "take you back home"│
        │  + Naturia Beverages │     │                      │
        └──────────────────────┘     └──────────────────────┘
```

- **Homefire** owns the account, cart, checkout, order history and cross-brand discovery.
- **Each brand** owns its menu, theme, story, imagery and voice.
- A **single cart** can hold items from one brand at a time (see fulfilment rule in
  `03-user-flows.md`) to keep delivery logistics honest.

## Target personas

| Persona | Who | Primary need | Design implication |
|---------|-----|--------------|--------------------|
| **"Homesick Ama"** | 24–35, diaspora-minded Accra professional | The comfort meal that tastes like home, delivered | Sefofo emotional storytelling; fast reorder; wishlist |
| **"Host Kojo"** | 30–50, ordering for a table/office | Range, quantity, reliability, pay by MoMo | Giloz breadth; group carts; clear delivery ETA |
| **"Discovery Efua"** | 18–28, TikTok-native foodie | Beautiful new dishes to try & share | Editorial menu, reels, image reveals, share cards |
| **"New-to-Ewe Nadia"** | Expat / non-Ewe Ghanaian | Understand unfamiliar dishes before ordering | Dish glossary, spice/heat tags, "what's in it" |
| **"Owner/Manager"** | Restaurant staff | Manage menu, prices, orders, availability fast | Admin dashboard; real-time order board |

## Positioning statement

> For food lovers in Accra who miss the taste of home, **Homefire** is the ordering platform
> that brings **Giloz** and **Sefofo's** authentic Eʋe cooking to your door with the beauty and
> ease of a world-class app — unlike static PDF menus and WhatsApp-only ordering, it's a living,
> photographed, effortless experience that still pays with MoMo and confirms on WhatsApp.

## Business goals & KPIs

| Goal | Metric | Target (first 90 days post-launch) |
|------|--------|-------------------------------------|
| Digital orders | Online orders / week | Establish baseline, +20% MoM |
| Funnel efficiency | Menu-view → cart → order conversion | Cart-add ≥ 25%; checkout completion ≥ 60% |
| Basket size | Avg. order value (₵) | +15% via pairings/Naturia upsell |
| Retention | Repeat-order rate (30-day) | ≥ 30% |
| Reach | WhatsApp-order share captured on-platform | Track & grow |
| Experience | Lighthouse (mobile) | **95+** Performance / A11y / Best-Practices / SEO |
| Loyalty | Registered accounts / wishlist saves | Grow week over week |

## Scope — MVP vs. later

**MVP (launch-critical)**
Landing · brand switcher · dynamic menu + categories + product pages · search & filters · cart ·
checkout (guest + auth) · delivery-fee calc · WhatsApp ordering · order confirmation & tracking ·
customer auth + dashboard · admin (menu + orders) · reviews · FAQ · contact · SEO · PWA · a11y.

**Fast-follow**
Coupons/promos engine · wishlist sync across devices · blog/journal · careers · loyalty points ·
scheduled orders · multi-address book · push notifications · advanced analytics.

**Guardrails**
Real payment capture and live Maps/Cloudinary/Supabase keys are wired via environment variables;
the build ships with typed mocks and seed data so it runs and demos without secrets, then swaps
to live services by adding keys — no code changes. See `07-api-architecture.md`.
