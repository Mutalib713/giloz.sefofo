# 06 · Database Schema (Supabase / Postgres)

Postgres via Supabase, with Row Level Security on every table, `auth.users` for identity, Storage
for any non-Cloudinary assets, and Realtime on `orders` + `order_events`. Money is stored in
**minor units (pesewas, integer)** to avoid float errors; display as ₵.

## Entity-relationship overview

```
brands ─┬─< categories ─< products ─┬─< product_variants
        │                           ├─< product_images
        │                           ├─< product_tags >─ tags
        │                           ├─< pairings (self-ref via product)
        │                           └─< reviews
        ├─< collections >─ collection_products >─ products
        ├─< locations
        └─< delivery_zones

profiles (1:1 auth.users) ─┬─< addresses
                           ├─< orders ─┬─< order_items ─< order_item_options
                           │           └─< order_events   (realtime timeline)
                           ├─< reviews
                           ├─< wishlist_items >─ products
                           └─< coupon_redemptions >─ coupons

articles (journal) · jobs (careers) · job_applications · faqs · newsletter_subscribers
```

## Enums

```sql
create type brand_key      as enum ('giloz','sefofo');
create type user_role      as enum ('customer','staff','admin');
create type order_status   as enum ('pending','received','confirmed','preparing',
                                    'ready','out_for_delivery','completed','cancelled');
create type fulfilment_type as enum ('delivery','pickup');
create type payment_method as enum ('paystack','whatsapp','cash');
create type payment_status as enum ('unpaid','pending','paid','refunded','failed');
create type coupon_type    as enum ('percent','fixed','free_delivery');
```

## Core catalog tables

```sql
-- Brands (Giloz, Sefofo) — themeable content
create table brands (
  id uuid primary key default gen_random_uuid(),
  key brand_key unique not null,
  name text not null,
  tagline text,
  story text,
  theme jsonb not null default '{}',          -- accent, mood, tokens
  socials jsonb not null default '{}',        -- ig, tiktok, fb, x
  whatsapp_number text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table locations (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  name text not null,                         -- "Giloz — Pig-Farm"
  address text not null,
  lat double precision, lng double precision,
  hours jsonb not null default '{}',          -- per-day open/close
  phone text, whatsapp text,
  is_active boolean not null default true
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  image_url text,
  position int not null default 0,
  is_active boolean not null default true,
  unique (brand_id, slug)
);

create table products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  ewe_name text,                              -- authentic dish name
  slug text not null,
  description text,
  base_price int not null,                    -- pesewas
  currency text not null default 'GHS',
  image_url text,                             -- Cloudinary public id/url
  blur_data_url text,                         -- LQIP
  spice_level int check (spice_level between 0 and 3),
  prep_minutes int,
  calories int,
  is_available boolean not null default true, -- sold-out toggle
  is_featured boolean not null default false,
  rating_avg numeric(2,1) not null default 0, -- denormalized
  rating_count int not null default 0,
  position int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (brand_id, slug)
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null, blur_data_url text, alt text, position int not null default 0
);

-- Variants/options: e.g. Size(Regular/Large), Protein(Fish/Goat), Spice(Mild/Hot)
create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  group_name text not null,                   -- "Size", "Protein"
  option_name text not null,                  -- "Large", "Goat"
  price_delta int not null default 0,         -- pesewas +/-
  is_default boolean not null default false,
  position int not null default 0
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,                  -- vegan, spicy, contains-fish, chefs-pick, new
  kind text not null default 'diet'           -- diet | attribute | badge
);
create table product_tags (
  product_id uuid references products(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (product_id, tag_id)
);

-- Pairings (Naturia upsell etc.) — directional product→product
create table pairings (
  product_id uuid references products(id) on delete cascade,
  paired_product_id uuid references products(id) on delete cascade,
  primary key (product_id, paired_product_id)
);

create table collections (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade,  -- null = cross-brand
  title text not null, slug text not null, description text, image_url text,
  position int not null default 0, is_active boolean not null default true,
  unique (brand_id, slug)
);
create table collection_products (
  collection_id uuid references collections(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  position int not null default 0,
  primary key (collection_id, product_id)
);
```

## Customers, addresses, wishlist

```sql
-- 1:1 with auth.users; role gates admin
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, phone text,                 -- WhatsApp
  avatar_url text,
  role user_role not null default 'customer',
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

create table addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,                                 -- Home, Work
  line1 text not null, line2 text, city text default 'Accra',
  lat double precision, lng double precision,
  is_default boolean not null default false
);

create table wishlist_items (
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);
```

## Delivery zones & coupons

```sql
create table delivery_zones (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id) on delete cascade, -- null = all brands
  name text not null,                         -- "East Legon", "Osu"
  polygon jsonb,                              -- GeoJSON polygon (point-in-polygon)
  base_fee int not null,                      -- pesewas
  per_km_fee int not null default 0,
  min_order int not null default 0,
  eta_min int, eta_max int,
  is_active boolean not null default true
);

create table coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  type coupon_type not null,
  value int not null default 0,               -- percent (0-100) or pesewas
  min_spend int not null default 0,
  brand_id uuid references brands(id),        -- null = all brands
  max_redemptions int, per_user_limit int not null default 1,
  starts_at timestamptz, ends_at timestamptz,
  is_active boolean not null default true
);
create table coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid references coupons(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  order_id uuid,                              -- set on use
  redeemed_at timestamptz not null default now()
);
```

## Orders (the heart) + realtime timeline

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,          -- e.g. GZ-1042 / SF-2087 (generated)
  brand_id uuid not null references brands(id),
  user_id uuid references auth.users(id) on delete set null,  -- null = guest
  status order_status not null default 'received',
  fulfilment fulfilment_type not null,
  -- guest/contact snapshot
  contact_name text not null, contact_phone text not null, contact_email text,
  -- delivery snapshot
  address_line text, address_lat double precision, address_lng double precision,
  location_id uuid references locations(id),  -- pickup
  delivery_zone_id uuid references delivery_zones(id),
  -- money (pesewas)
  subtotal int not null, discount int not null default 0,
  delivery_fee int not null default 0, service_fee int not null default 0,
  total int not null,
  coupon_code text,
  payment_method payment_method not null,
  payment_status payment_status not null default 'unpaid',
  payment_ref text,                           -- Paystack reference
  note text,
  eta_min int, eta_max int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  name_snapshot text not null,                -- immutable at purchase time
  unit_price int not null, quantity int not null check (quantity > 0),
  line_total int not null
);
create table order_item_options (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references order_items(id) on delete cascade,
  group_name text not null, option_name text not null, price_delta int not null default 0
);

-- Realtime status timeline
create table order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  status order_status not null,
  note text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
```

## Reviews & content

```sql
create table reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  order_id uuid references orders(id),        -- verified-purchase link
  rating int not null check (rating between 1 and 5),
  title text, body text, image_url text,
  is_published boolean not null default false,-- moderation
  created_at timestamptz not null default now()
);

create table articles (            -- Journal
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brands(id),
  title text not null, slug text unique not null, excerpt text, body text,
  cover_url text, author text, tags text[],
  published_at timestamptz, is_published boolean not null default false
);
create table jobs (                -- Careers
  id uuid primary key default gen_random_uuid(),
  title text not null, slug text unique not null, location text, type text,
  description text, is_open boolean not null default true,
  created_at timestamptz not null default now()
);
create table job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  name text not null, email text not null, phone text, cv_url text, message text,
  created_at timestamptz not null default now()
);
create table faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null, question text not null, answer text not null,
  position int not null default 0, is_published boolean not null default true
);
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null, created_at timestamptz not null default now()
);
```

## Row Level Security (policy intent)

| Table | Public read | Customer write | Staff/Admin |
|-------|-------------|----------------|-------------|
| brands, categories, products, variants, images, tags, collections, pairings | ✅ where `is_active/is_available` | — | full CRUD |
| locations, delivery_zones, faqs, articles(published), jobs(open) | ✅ | — | full |
| profiles | own row | own row | read all |
| addresses, wishlist_items | own rows only | own rows | — |
| orders, order_items, order_item_options | own rows (or guest via signed token) | create own | read/update all |
| order_events | read for own order | — | insert (advance status) |
| reviews | published only | create own (verified) | moderate/all |
| coupons | validate via RPC only | — | full |

**Representative policies**

```sql
alter table orders enable row level security;

create policy "orders: owner reads own"
  on orders for select
  using (auth.uid() = user_id);

create policy "orders: customer creates own"
  on orders for insert
  with check (auth.uid() = user_id or user_id is null);   -- guest allowed

create policy "orders: staff full access"
  on orders for all
  using (exists (select 1 from profiles p
                 where p.id = auth.uid() and p.role in ('staff','admin')));

-- products readable to everyone when available; writable only by staff
create policy "products: public read available"
  on products for select using (is_available = true);
create policy "products: staff write"
  on products for all
  using (exists (select 1 from profiles p
                 where p.id = auth.uid() and p.role in ('staff','admin')));
```

Guest order tracking uses a **signed, unguessable order token** (in the URL) validated by an RPC/
route handler rather than broad public read on `orders`.

## Denormalization, triggers, RPCs

- `products.rating_avg/rating_count` updated by trigger on `reviews` insert/publish.
- `updated_at` maintained by a `moddatetime` trigger.
- `order_number` generated via sequence + brand prefix (`GZ-`, `SF-`).
- **RPCs (SECURITY DEFINER):** `validate_coupon(code,user,brand,subtotal)`,
  `quote_delivery(brand,lat,lng)`, `place_order(payload jsonb)` (atomic: create order + items +
  first event + coupon redemption), `advance_order_status(order,status)`.
- Realtime publication on `orders`, `order_events` for the tracking page & admin board.

## Seeding

`supabase/seed.sql` populates both brands, locations (Pig-Farm, Dzorwulu), ~6 categories/brand,
~30+ Ewe/Ghanaian dishes with placeholder Cloudinary images & ₵ prices, Naturia drinks, tags,
Accra delivery zones, sample coupons, FAQs, and a demo admin — so the app runs and demos with
**zero external secrets**.
