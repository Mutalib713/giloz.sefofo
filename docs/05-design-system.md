# 05 · Design System — "Ember"

The design language is **Ember**: warm, cinematic, editorial luxury rooted in Eʋe heritage.
Near-black canvases and cream paper let food photography glow like embers. One system, three
themes (house + two brands) driven entirely by CSS custom properties, so switching brands
retweens color live.

---

## 1 · Brand identity

### House — Homefire
- **Idea:** the hearth that unites two kitchens. "Two kitchens. One heritage."
- **Mark:** a minimal ember/flame glyph forming an "H" negative space; wordmark in high-contrast
  serif. Neutral, so it never competes with a brand theme.
- **Role:** shell chrome (nav, footer, account, checkout), the landing brand chooser.

> **Naming note:** "Homefire" is a working house name. It's defined once as `HOUSE.name` in
> `lib/brands.ts`; changing it renames the ecosystem everywhere. Alternatives on the table:
> *Volta Table, Duɔ̃, Kitchen of the Volta, The Ewe Table.*

### Giloz — "refined ember"
Established, upscale, cinematic. Dark stage, molten-gold accents, spotlight photography.

### Sefofo — "warm bloom"
Nostalgic, homey, botanical (*seƒoƒo* = flower). Sunlit cream, terracotta, marigold; food styled
like a family table.

---

## 2 · Color

### Foundation (shared neutrals)
| Token | Hex | Use |
|-------|-----|-----|
| `obsidian` | `#0E0E0F` | deepest bg (dark surfaces) |
| `charcoal` | `#17161A` | raised dark surface |
| `ink` | `#211F24` | dark card |
| `smoke` | `#6B6770` | muted text on light |
| `ash` | `#A8A2AD` | disabled / hint |
| `paper` | `#FBF8F2` | primary light bg (warm ivory) |
| `cream` | `#F3ECE0` | secondary light surface |
| `line` | `#E7DECF` / `#2A2830` | hairline borders (light / dark) |

### Giloz theme
| Token | Hex | Notes |
|-------|-----|-------|
| `--brand` (gold) | `#C9A24B` | molten gold — primary accent |
| `--brand-strong` | `#E0B84E` | highlight / hover |
| `--brand-deep` | `#7A5B1E` | pressed / shadow of gold |
| `--bg` | `#0E0E0F` | cinematic near-black canvas |
| `--surface` | `#17161A` | cards |
| `--fg` | `#F4EFE6` | text on dark |
| `--secondary` | `#1F3D2B` | deep leaf green (kontomire) |
| `--gradient` | `radial + conic gold→amber→ember` | animated hero mesh |

### Sefofo theme
| Token | Hex | Notes |
|-------|-----|-------|
| `--brand` (clay) | `#C4552D` | terracotta — primary accent |
| `--brand-strong` | `#E06A3A` | warm hover |
| `--brand-deep` | `#8F3A1E` | pressed |
| `--accent` (marigold) | `#E8A32C` | turmeric/marigold highlight |
| `--bg` | `#FBF4E9` | sunlit cream canvas |
| `--surface` | `#FFFFFF` | cards |
| `--fg` | `#241A14` | warm near-black text |
| `--secondary` | `#3E5C3A` | garden green |
| `--gradient` | `sun mesh clay→marigold→rose` | animated warm mesh |

### Semantic (both themes map these)
`success #3E8E5A · warning #E0A100 · danger #C0442E · info #3A6EA5`
Rating star: brand accent. Prices always in **GHS ₵**.

### Contrast rule
Every text/bg pairing meets **WCAG 2.2 AA** (≥4.5:1 body, ≥3:1 large/UI). Gold-on-dark and
clay-on-cream are pre-checked; gold is never used as small body text on light.

---

## 3 · Typography

Two typefaces, variable, self-hosted (`next/font`), subset — no layout shift, no external calls.

| Role | Typeface | Notes |
|------|----------|-------|
| **Display / editorial** | **Fraunces** (variable, high-contrast serif) | hero, dish names, headings; `opsz` + soft `wght`. Luxe & warm. |
| **UI / body** | **Geist Sans** (variable grotesque) | nav, buttons, body, prices, forms. Crisp & modern. |
| **Mono (accents)** | **Geist Mono** | order numbers, small labels, kbd |

**Type scale** (fluid, `clamp`, 1.2–1.25 ratio):
`display 3.5–6rem · h1 2.5–4 · h2 2–2.75 · h3 1.5–2 · h4 1.25–1.5 · body 1–1.125 · small .875 · caption .75`

Rules: display serif tracks tight (`-0.02em`); body sans normal; numerals tabular for prices;
line-length 60–72ch for editorial; balanced headings (`text-wrap: balance`).

---

## 4 · Spacing, grid, radius, elevation

- **Spacing scale** (4px base): `0,1,2,3,4,6,8,12,16,20,24,32,40,56,80,120` → Tailwind spacing.
- **Grid:** 12-col desktop (max-w 1280–1440, gutters 24–32), 4-col mobile; content rhythm on an
  8px vertical grid. Generous whitespace is part of the luxury.
- **Radius:** `sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · full`. Cards `lg–xl`, pills `full`.
- **Elevation:** soft, warm-tinted shadows (not gray). Dark theme uses glow + border over
  shadow. Glass surfaces (nav, cart) use `backdrop-blur` + translucent brand tint + hairline.

---

## 5 · Motion — the "highly animated" mandate

**Libraries & division of labour**
- **GSAP + ScrollTrigger** — scroll-driven cinema: pinned hero, parallax, image reveals,
  horizontal scroll sections, number counters, floating-food orbit.
- **Framer Motion** — component & page transitions, shared-layout (`layoutId`) fly-to-cart,
  micro-interactions, brand-switch retween, presence/exit.
- **Lenis** — smooth inertial scroll (disabled under reduced-motion).
- **View Transitions API** — native cross-page morphs where supported (progressive enhancement).

**Signature moments**
| Moment | Technique |
|--------|-----------|
| Loading screen | ember mark draws in (SVG stroke), house→brand reveal |
| Hero | word-by-word display reveal + floating dishes parallax orbit |
| Brand switch | color-wipe overlay + logo cross-fade + CSS var retween |
| Image reveal | clip-path/mask reveal + subtle scale as cards enter viewport |
| Add to cart | shared-layout image flies into cart; cart badge springs |
| PDP gallery | reveal + hover zoom + drag |
| 3D hover | pointer-tracked tilt/parallax on brand & dish cards (`rotateX/Y`) |
| Animated gradients | mesh-gradient hero + CTA that slowly drifts (GPU) |
| Glassmorphism | sticky nav, cart, filter sheet |
| Skeletons | shimmer skeletons for menu grid, PDP, orders |
| Micro-interactions | button press, qty stepper, heart pop, toast, tab underline |

**Motion tokens**
- Duration: `fast 150ms · base 250 · slow 400 · cinematic 700–1200`.
- Easing: `standard cubic-bezier(.2,.8,.2,1)` · `entrance (.16,1,.3,1)` · `spring` for playful.
- **Reduced motion:** `prefers-reduced-motion` → replace transforms with opacity fades, kill
  parallax/pin/marquee, keep functional feedback. A global `useReducedMotion` gate wraps all
  animation entry points.
- **Budget:** animate only `transform`/`opacity`; no layout thrash; `will-change` sparingly;
  `content-visibility` for offscreen sections; motion never blocks interaction or LCP.

---

## 6 · Iconography, imagery, texture

- **Icons:** Lucide (consistent 1.5px stroke), brand-accent on active.
- **Imagery:** Cloudinary-served, AVIF/WebP, responsive `srcset`, LQIP blur placeholder, art-
  directed crops. Giloz = low-key spotlight on dark; Sefofo = warm daylight on cream.
- **Texture:** subtle grain overlay on dark heroes; faint kente/adinkra-inspired line motifs used
  sparingly as section dividers (abstracted, never literal pattern-dumps).
- **Illustration:** warm line-art for empty states.

---

## 7 · Design tokens → code

Single source of truth in `styles/tokens.css` + `lib/brands.ts`. Themes are attribute-scoped so a
brand switch is one attribute flip; Tailwind v4 reads the CSS vars.

```css
/* styles/tokens.css (excerpt) */
:root {
  --radius-lg: 1rem;
  --ease-entrance: cubic-bezier(.16,1,.3,1);
  --dur-base: 250ms;
  /* neutral foundation */
  --paper:#FBF8F2; --obsidian:#0E0E0F; --ink:#211F24;
}
[data-brand="giloz"] {
  --bg:#0E0E0F; --surface:#17161A; --fg:#F4EFE6;
  --brand:#C9A24B; --brand-strong:#E0B84E; --secondary:#1F3D2B;
}
[data-brand="sefofo"] {
  --bg:#FBF4E9; --surface:#FFFFFF; --fg:#241A14;
  --brand:#C4552D; --brand-strong:#E06A3A; --accent:#E8A32C; --secondary:#3E5C3A;
}
```

```ts
// lib/brands.ts (shape)
export const HOUSE = { key: "homefire", name: "Homefire",
  tagline: "Two kitchens. One heritage." } as const;

export const BRANDS = {
  giloz:  { name: "Giloz Restaurant", theme: "giloz",
            city: "Pig-Farm, Accra", accent: "#C9A24B", mood: "refined ember",
            whatsapp: "233XXXXXXXXX", instagram: "giloz_restaurant" },
  sefofo: { name: "Sefofo", theme: "sefofo", tagline: "We take you back home",
            city: "Dzorwulu, Accra", accent: "#C4552D", mood: "warm bloom",
            whatsapp: "233XXXXXXXXX", instagram: "sefofo.rlg" },
} as const;
export type BrandKey = keyof typeof BRANDS;
```

## 8 · Accessibility baseline (non-negotiable)

- WCAG 2.2 AA contrast; visible focus rings (brand-accent, 2px, offset).
- Full keyboard operability incl. brand switcher, menus, cart, checkout, admin board.
- Semantic landmarks, labelled controls, `aria-live` for cart/toasts/order status.
- Reduced-motion honored everywhere; no motion-only meaning.
- Forms: label + description + error, `aria-invalid`, focus-to-error.
- Target size ≥ 44px; hit-slop on icon buttons. Tested with keyboard + screen reader.
