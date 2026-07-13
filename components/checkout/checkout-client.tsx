"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bike, MapPin, MessageCircle, ShoppingBag, Store, Tag } from "lucide-react";
import { selectSubtotal, useCart } from "@/lib/cart/store";
import { cartWhatsAppLink } from "@/lib/cart/helpers";
import { BRANDS } from "@/lib/brands";
import { DELIVERY_ZONES, PICKUP_LOCATIONS, getZone } from "@/lib/data/zones";
import { validateCoupon, type CouponOk } from "@/lib/data/coupons";
import { makeOrderNumber, saveOrder, type Order } from "@/lib/orders/store";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { formatCedis } from "@/lib/format";
import { cn } from "@/lib/cn";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";

export function CheckoutClient() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const brand = useCart((s) => s.brand);
  const subtotal = useCart(selectSubtotal);
  const clear = useCart((s) => s.clear);

  const [fulfilment, setFulfilment] = useState<"delivery" | "pickup">("delivery");
  const [zoneId, setZoneId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState<"paystack" | "cash">("paystack");

  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<CouponOk | null>(null);
  const [couponError, setCouponError] = useState("");
  const [error, setError] = useState("");

  const zone = getZone(zoneId);
  const deliveryFee = fulfilment === "pickup" ? 0 : coupon?.freeDelivery ? 0 : (zone?.fee ?? 0);
  const discount = coupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount) + deliveryFee;
  const eta =
    fulfilment === "pickup" ? { min: 20, max: 30 } : { min: zone?.etaMin ?? 25, max: zone?.etaMax ?? 45 };

  const applyCoupon = () => {
    const res = validateCoupon(couponInput, subtotal);
    if (res.ok) {
      setCoupon(res);
      setCouponError("");
    } else {
      setCoupon(null);
      setCouponError(res.error);
    }
  };

  const placeOrder = (method: "paystack" | "cash" | "whatsapp") => {
    if (!brand) return;
    if (!name.trim() || !phone.trim()) {
      setError("Please add your name and phone number.");
      return;
    }
    if (fulfilment === "delivery" && (!zoneId || !address.trim())) {
      setError("Please choose a delivery zone and enter your address.");
      return;
    }
    setError("");

    const order: Order = {
      id: crypto.randomUUID(),
      number: makeOrderNumber(brand),
      brand,
      createdAt: Date.now(),
      items,
      fulfilment,
      contact: { name: name.trim(), phone: phone.trim(), email: email.trim() || undefined },
      address: fulfilment === "delivery" ? address.trim() : undefined,
      zoneName: fulfilment === "delivery" ? zone?.name : undefined,
      pickupLocation: fulfilment === "pickup" ? PICKUP_LOCATIONS[brand].name : undefined,
      subtotal,
      discount,
      deliveryFee,
      total,
      couponCode: coupon?.code,
      note: note.trim() || undefined,
      paymentMethod: method,
      etaMin: eta.min,
      etaMax: eta.max,
    };

    if (method === "whatsapp") {
      window.open(cartWhatsAppLink(brand, items, note.trim() || undefined), "_blank", "noopener");
    }
    saveOrder(order);
    clear();
    router.push(`/orders/${order.id}`);
  };

  if (items.length === 0 || !brand) {
    return (
      <div className="mx-auto max-w-md py-10">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add a few dishes and they'll show up here, ready to check out."
          actionHref="/giloz/menu"
          actionLabel="Browse the menu"
        />
      </div>
    );
  }

  const b = BRANDS[brand];

  return (
    <div data-brand={brand} className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
      {/* form */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="label text-brand">Checkout · {b.shortName}</p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Almost there</h1>
        </div>

        {/* fulfilment */}
        <section>
          <h2 className="mb-3 font-serif text-xl">How would you like it?</h2>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { key: "delivery", label: "Delivery", icon: Bike },
                { key: "pickup", label: "Pickup", icon: Store },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFulfilment(f.key)}
                aria-pressed={fulfilment === f.key}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                  fulfilment === f.key ? "border-brand bg-brand/10" : "border-line hover:border-brand",
                )}
              >
                <f.icon className="size-5 text-brand" />
                <span className="font-medium">{f.label}</span>
              </button>
            ))}
          </div>

          {fulfilment === "delivery" ? (
            <div className="mt-4 flex flex-col gap-3">
              <select
                aria-label="Delivery zone"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className={inputCls}
              >
                <option value="">Select your area…</option>
                {DELIVERY_ZONES.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} — {formatCedis(z.fee)}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Delivery address (street, landmark, directions)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className={inputCls}
              />
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface p-4 text-sm">
              <MapPin className="size-5 shrink-0 text-brand" />
              <span>{PICKUP_LOCATIONS[brand].name}</span>
            </div>
          )}
        </section>

        {/* details */}
        <section>
          <h2 className="mb-3 font-serif text-xl">Your details</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={inputCls}
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <input
              className={inputCls}
              placeholder="Phone / WhatsApp (e.g. 024…)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              inputMode="tel"
            />
            <input
              className={cn(inputCls, "sm:col-span-2")}
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              type="email"
            />
            <textarea
              className={cn(inputCls, "sm:col-span-2")}
              placeholder="Order note (allergies, preferences)…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
          </div>
        </section>

        {/* payment */}
        <section>
          <h2 className="mb-3 font-serif text-xl">Payment</h2>
          <div className="flex flex-col gap-3">
            {(
              [
                { key: "paystack", label: "Mobile Money / Card", sub: "Paystack · MTN, Telecel, Visa" },
                { key: "cash", label: "Cash", sub: fulfilment === "pickup" ? "Pay at pickup" : "Pay on delivery" },
              ] as const
            ).map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPayment(p.key)}
                aria-pressed={payment === p.key}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-4 text-left transition-colors",
                  payment === p.key ? "border-brand bg-brand/10" : "border-line hover:border-brand",
                )}
              >
                <span>
                  <span className="block font-medium">{p.label}</span>
                  <span className="block text-xs text-muted">{p.sub}</span>
                </span>
                <span
                  className={cn(
                    "size-4 rounded-full border-2",
                    payment === p.key ? "border-brand bg-brand" : "border-line",
                  )}
                />
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            Demo checkout — no real payment is processed. Live Paystack (Mobile Money + card) wires
            in with API keys.
          </p>
        </section>
      </div>

      {/* summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-serif text-xl">Order summary</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((i) => (
              <li key={i.key} className="flex justify-between gap-3 text-sm">
                <span className="text-ink">
                  {i.quantity}× {i.name}
                  {i.options.length > 0 && (
                    <span className="block text-xs text-muted">{i.options.map((o) => o.choice).join(" · ")}</span>
                  )}
                </span>
                <span className="tnum shrink-0">{formatCedis(i.unitPrice * i.quantity)}</span>
              </li>
            ))}
          </ul>

          {/* coupon */}
          <div className="mt-5 border-t border-line pt-4">
            {coupon ? (
              <div className="flex items-center justify-between rounded-lg bg-brand/10 px-3 py-2 text-sm">
                <span className="inline-flex items-center gap-2 text-brand">
                  <Tag className="size-4" /> {coupon.code} · {coupon.label}
                </span>
                <button
                  type="button"
                  className="text-xs text-muted hover:text-ink"
                  onClick={() => {
                    setCoupon(null);
                    setCouponInput("");
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  className={inputCls}
                  placeholder="Promo code (try WELCOME10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <Button type="button" variant="secondary" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>
            )}
            {couponError && <p className="mt-2 text-xs text-[#c0442e]">{couponError}</p>}
          </div>

          {/* totals */}
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <Row label="Subtotal" value={formatCedis(subtotal)} />
            {discount > 0 && <Row label="Discount" value={`− ${formatCedis(discount)}`} accent />}
            <Row
              label={fulfilment === "pickup" ? "Pickup" : "Delivery"}
              value={deliveryFee === 0 ? "Free" : formatCedis(deliveryFee)}
            />
            <div className="mt-1 flex items-center justify-between border-t border-line pt-3">
              <span className="font-medium">Total</span>
              <span className="tnum font-serif text-2xl">{formatCedis(total)}</span>
            </div>
            <p className="text-xs text-muted">
              Est. {eta.min}–{eta.max} min · {b.city}
            </p>
          </div>

          {error && <p className="mt-3 text-sm text-[#c0442e]">{error}</p>}

          <div className="mt-5 flex flex-col gap-3">
            <Button size="lg" onClick={() => placeOrder(payment)}>
              Place order · {formatCedis(total)}
            </Button>
            <Button variant="outline" size="lg" onClick={() => placeOrder("whatsapp")}>
              <MessageCircle className="size-4" /> Order on WhatsApp
            </Button>
            <Link href="/giloz/menu" className="text-center text-sm text-muted hover:text-brand">
              Add more items
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={cn("tnum", accent && "text-brand")}>{value}</span>
    </div>
  );
}
