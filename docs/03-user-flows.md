# 03 · User Flows

Notation: `→` step, `⤷` branch, `⟳` realtime, `★` delight moment.

## Flow 1 — First visit → first order (the golden path)

```
Land on / ★ cinematic hero, floating food, brand chooser
  → Choose brand (Giloz or Sefofo) ★ themed page transition (color+logo morph)
  → Brand home: featured collections, chef's picks, "Taste of Home"
  → Tap "See full menu" → Menu (categories rail + grid) ★ staggered image reveals
  → Filter/search (optional) → Tap a dish → PDP
      ★ hero image reveal, ingredients, Ewe name, pairings (Naturia upsell)
  → Choose options (size / protein / spice) → Add to cart ★ fly-to-cart micro-interaction
  → Cart slide-over: see items, suggested pairing, subtotal
  → Checkout
      → Fulfilment: Delivery or Pickup
          ⤷ Delivery → address (Maps autocomplete) → zone + fee computed live
          ⤷ Pickup   → choose location (Pig-Farm / Dzorwulu) → time
      → Contact details (guest allowed) + optional coupon
      → Pay: Paystack (MoMo / card)  — OR — "Order on WhatsApp" (prefilled order)
  → Success ★ confetti-restraint animation, order number, ETA
  → Order tracking ⟳ live status timeline; "Add to WhatsApp updates"
```

**Guardrail — single-brand cart.** If the cart holds Giloz items and the guest adds a Sefofo
item, show a graceful dialog: *"Start a Sefofo order? Your Giloz cart will be saved."* — never a
silent wipe. Saved carts are restorable from the account/cart.

## Flow 2 — Brand switching (the signature interaction)

```
Any page → open Brand switcher (segmented pill in header / drawer)
  → Select the other brand
  → ★ Transition: overlay wipe in new brand color, logo cross-fade, hero imagery swap,
     CSS theme variables retween (Framer Motion + View Transitions API where supported)
  → Route to equivalent page (menu↔menu, home↔home); cart & session preserved
  → Reduced-motion: instant theme swap, no wipe
```

## Flow 3 — Authentication (progressive, never a wall)

```
Guest can browse, add to cart, and check out without an account.
At checkout / on "Save to wishlist" / "Track & reorder":
  → Offer sign-in/up (email OTP + Google OAuth via Supabase)
      ⤷ Email → magic link / OTP → session
      ⤷ Google → OAuth → callback → session
  → On first sign-up: capture name + phone (WhatsApp) → merge guest cart & wishlist
  → Return to exactly where they were (post-auth redirect)
```

## Flow 4 — Checkout & delivery-fee logic

```
Cart subtotal known
  → Fulfilment = Delivery:
      → Address entered (Google Places autocomplete → lat/lng)
      → Point-in-polygon against Accra delivery zones (or Haversine distance from store)
          ⤷ In zone  → fee = zone.baseFee (+ optional distance surcharge)
          ⤷ Out zone → "Sorry, outside delivery area — try Pickup or WhatsApp"
      → Free-delivery threshold check (e.g. ₵0 fee over ₵X, if promo active)
  → Fulfilment = Pickup: fee = 0, show location + ready-time
  → Coupon applied → validate (active, not expired, min-spend, per-user cap) → discount
  → Totals: subtotal − discount + delivery + service = grand total (₵)
  → Pay (Paystack) or hand off to WhatsApp with full itemised summary
```

## Flow 5 — WhatsApp ordering (parallel, first-class)

```
From cart or PDP → "Order on WhatsApp"
  → Build a formatted message:
     brand, items (qty × name, options), subtotal, fulfilment, address/pickup, total (₵), note
  → Deep link wa.me/<brand number>?text=<encoded order>
  → Opens WhatsApp with the order pre-filled → guest hits send
  → (Optional) also persist a "pending-whatsapp" order for the admin board
```

## Flow 6 — Order tracking (realtime)

```
/orders/[id] (or from account)
  → Status timeline: Received → Confirmed → Preparing → Ready/Out for delivery → Completed
  ⟳ Supabase Realtime subscription updates the timeline live as admin advances status
  → Map for delivery (store → destination), ETA, rider/contact where available
  → Actions: reorder, contact via WhatsApp, leave a review (after Completed)
```

## Flow 7 — Reviews

```
After an order is Completed → prompt "Rate your meal"
  → Star rating + optional photo + text, tied to product + order (verified badge)
  → Moderation queue in admin → publish → shows on PDP + aggregate rating (JSON-LD)
```

## Flow 8 — Wishlist & reorder

```
Tap ♥ on any card/PDP → saved (guest: local; auth: synced)
  → /wishlist or /account/wishlist → move-to-cart, share
Reorder → from order history or tracking → re-adds items (respecting current availability/price)
```

## Flow 9 — Admin (staff)

```
/admin (role-gated: staff/admin)
  → Live order board ⟳ new orders animate in; drag/advance status → customer sees it live
  → Menu manager: create/edit product, upload image (Cloudinary), set price/availability,
     toggle sold-out, reorder categories
  → Coupons: create code, type (%/₵/free-delivery), limits, window
  → Reviews moderation · Customers · Settings (hours, zones, delivery fees, brand content)
```

## Cross-cutting states (every flow)

- **Loading** — skeleton loaders (menu grids, PDP), route-transition progress.
- **Empty** — cart empty, no wishlist, no results → warm illustrated states with a next action.
- **Error** — payment failed, out of zone, item sold out mid-checkout → recover, never dead-end.
- **Offline (PWA)** — cached menu browsing; queue actions; "you're offline" banner.
- **Reduced motion** — all `★` moments degrade to fades/instant.
