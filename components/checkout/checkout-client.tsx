"use client";

import { useRef, useState } from "react";
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
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/common/empty-state";
import { formatCedis } from "@/lib/format";
import { cn } from "@/lib/cn";

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";
const inputErrCls = "border-[#c0442e] focus-visible:ring-[#c0442e]";

/** Ghana mobile numbers: 0XXXXXXXXX or +233XXXXXXXXX (spaces/dashes ignored). */
function isGhanaPhone(raw: string): boolean {
  const v = raw.replace(/[\s-]/g, "");
  return /^(?:\+?233|0)[235]\d{8}$/.test(v);
}

type FieldKey = "name" | "phone" | "email" | "zone" | "address";
type FieldErrors = Partial<Record<FieldKey, string>>;

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
  const [errors, setErrors] = useState<FieldErrors>({});

  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    zone: useRef<HTMLSelectElement>(null),
    address: useRef<HTMLTextAreaElement>(null),
  };

  const zone = getZone(zoneId);
  const deliveryFee = fulfilment === "pickup" ? 0 : coupon?.freeDelivery ? 0 : (zone?.fee ?? 0);
  const discount = coupon?.discount ?? 0;
  const total = Math.max(0, subtotal - discount) + deliveryFee;
  const eta =
    fulfilment === "pickup"
      ? { min: 20, max: 30 }
      : { min: zone?.etaMin ?? 25, max: zone?.etaMax ?? 45 };

  const clearError = (key: FieldKey) => setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));

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

  /** Validate every field at once; focus + scroll to the first problem. */
  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    else if (!isGhanaPhone(phone))
      next.phone = "Enter a valid Ghana number, e.g. 024 123 4567 or +233 24 123 4567.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "That email doesn't look right — check it or leave it empty.";
    if (fulfilment === "delivery") {
      if (!zoneId) next.zone = "Choose your delivery area.";
      if (!address.trim()) next.address = "Add your address so the rider can find you.";
    }
    setErrors(next);
    const first = (["name", "phone", "email", "zone", "address"] as FieldKey[]).find(
      (k) => next[k],
    );
    if (first) {
      const el = refs[first].current;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return false;
    }
    return true;
  };

  const placeOrder = (method: "paystack" | "cash" | "whatsapp") => {
    if (!brand) return;
    if (!validate()) return;

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
      <div data-brand={brand ?? "eve"} className="bg-paper text-ink min-h-dvh">
        <Container className="py-10 sm:py-14">
          <div className="mx-auto max-w-md py-10">
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Add a few dishes and they'll show up here, ready to check out."
              actionHref="/giloz/menu"
              actionLabel="Browse the menu"
            />
          </div>
        </Container>
      </div>
    );
  }

  const b = BRANDS[brand];
  const hasErrors = Object.values(errors).some(Boolean);

  // Paint the page in the cart's brand theme. Sefofo is a *light* world, so
  // without an explicit brand-scoped background the light-theme text landed on
  // the dark house background and washed out — this keeps every surface legible.
  return (
    <div data-brand={brand} className="bg-paper text-ink min-h-dvh">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
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
                      fulfilment === f.key
                        ? "border-brand bg-brand/10"
                        : "border-line hover:border-brand",
                    )}
                  >
                    <f.icon className="text-brand size-5" />
                    <span className="font-medium">{f.label}</span>
                  </button>
                ))}
              </div>

              {fulfilment === "delivery" ? (
                <div className="mt-4 flex flex-col gap-4">
                  <Field
                    label="Delivery area"
                    htmlFor="co-zone"
                    error={errors.zone}
                    errorId="co-zone-err"
                  >
                    <select
                      id="co-zone"
                      ref={refs.zone}
                      value={zoneId}
                      onChange={(e) => {
                        setZoneId(e.target.value);
                        clearError("zone");
                      }}
                      aria-invalid={Boolean(errors.zone)}
                      aria-describedby={errors.zone ? "co-zone-err" : undefined}
                      className={cn(inputCls, errors.zone && inputErrCls)}
                    >
                      <option value="">Select your area…</option>
                      {DELIVERY_ZONES.map((z) => (
                        <option key={z.id} value={z.id}>
                          {z.name} — {formatCedis(z.fee)}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label="Delivery address"
                    htmlFor="co-address"
                    error={errors.address}
                    errorId="co-address-err"
                  >
                    <textarea
                      id="co-address"
                      ref={refs.address}
                      placeholder="Street, landmark, directions…"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        clearError("address");
                      }}
                      rows={2}
                      aria-invalid={Boolean(errors.address)}
                      aria-describedby={errors.address ? "co-address-err" : undefined}
                      className={cn(inputCls, errors.address && inputErrCls)}
                    />
                  </Field>
                </div>
              ) : (
                <div className="border-line bg-surface mt-4 flex items-center gap-3 rounded-xl border p-4 text-sm">
                  <MapPin className="text-brand size-5 shrink-0" />
                  <span>{PICKUP_LOCATIONS[brand].name}</span>
                </div>
              )}
            </section>

            {/* details */}
            <section>
              <h2 className="mb-3 font-serif text-xl">Your details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Full name"
                  htmlFor="co-name"
                  error={errors.name}
                  errorId="co-name-err"
                >
                  <input
                    id="co-name"
                    ref={refs.name}
                    className={cn(inputCls, errors.name && inputErrCls)}
                    placeholder="e.g. Ama Mensah"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearError("name");
                    }}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "co-name-err" : undefined}
                  />
                </Field>
                <Field
                  label="Phone / WhatsApp"
                  htmlFor="co-phone"
                  error={errors.phone}
                  errorId="co-phone-err"
                >
                  <input
                    id="co-phone"
                    ref={refs.phone}
                    className={cn(inputCls, errors.phone && inputErrCls)}
                    placeholder="e.g. 024 123 4567"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      clearError("phone");
                    }}
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "co-phone-err" : undefined}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field
                    label="Email (optional)"
                    htmlFor="co-email"
                    error={errors.email}
                    errorId="co-email-err"
                  >
                    <input
                      id="co-email"
                      ref={refs.email}
                      className={cn(inputCls, errors.email && inputErrCls)}
                      placeholder="For your receipt"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearError("email");
                      }}
                      autoComplete="email"
                      type="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "co-email-err" : undefined}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Order note (optional)" htmlFor="co-note">
                    <textarea
                      id="co-note"
                      className={inputCls}
                      placeholder="Allergies, preferences…"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={2}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* payment */}
            <section>
              <h2 className="mb-3 font-serif text-xl">Payment</h2>
              <div className="flex flex-col gap-3">
                {(
                  [
                    {
                      key: "paystack",
                      label: "Mobile Money / Card",
                      sub: "Paystack · MTN, Telecel, Visa",
                    },
                    {
                      key: "cash",
                      label: "Cash",
                      sub: fulfilment === "pickup" ? "Pay at pickup" : "Pay on delivery",
                    },
                  ] as const
                ).map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPayment(p.key)}
                    aria-pressed={payment === p.key}
                    className={cn(
                      "flex items-center justify-between rounded-xl border p-4 text-left transition-colors",
                      payment === p.key
                        ? "border-brand bg-brand/10"
                        : "border-line hover:border-brand",
                    )}
                  >
                    <span>
                      <span className="block font-medium">{p.label}</span>
                      <span className="text-muted block text-xs">{p.sub}</span>
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
              <p className="text-muted mt-3 text-xs">
                Demo checkout — no real payment is processed. Live Paystack (Mobile Money + card)
                wires in with API keys.
              </p>
            </section>
          </div>

          {/* summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border-line bg-surface rounded-2xl border p-5">
              <h2 className="font-serif text-xl">Order summary</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {items.map((i) => (
                  <li key={i.key} className="flex justify-between gap-3 text-sm">
                    <span className="text-ink">
                      {i.quantity}× {i.name}
                      {i.options.length > 0 && (
                        <span className="text-muted block text-xs">
                          {i.options.map((o) => o.choice).join(" · ")}
                        </span>
                      )}
                    </span>
                    <span className="tnum shrink-0">{formatCedis(i.unitPrice * i.quantity)}</span>
                  </li>
                ))}
              </ul>

              {/* coupon */}
              <div className="border-line mt-5 border-t pt-4">
                {coupon ? (
                  <div className="bg-brand/10 flex items-center justify-between rounded-lg px-3 py-2 text-sm">
                    <span className="text-brand inline-flex items-center gap-2">
                      <Tag className="size-4" /> {coupon.code} · {coupon.label}
                    </span>
                    <button
                      type="button"
                      className="text-muted hover:text-ink text-xs"
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
                      aria-label="Promo code"
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
                {couponError && (
                  <p role="alert" className="mt-2 text-xs text-[#c0442e]">
                    {couponError}
                  </p>
                )}
              </div>

              {/* totals */}
              <div className="border-line mt-4 flex flex-col gap-2 border-t pt-4 text-sm">
                <Row label="Subtotal" value={formatCedis(subtotal)} />
                {discount > 0 && (
                  <Row label="Discount" value={`− ${formatCedis(discount)}`} accent />
                )}
                <Row
                  label={fulfilment === "pickup" ? "Pickup" : "Delivery"}
                  value={deliveryFee === 0 ? "Free" : formatCedis(deliveryFee)}
                />
                <div className="border-line mt-1 flex items-center justify-between border-t pt-3">
                  <span className="font-medium">Total</span>
                  <span className="tnum font-serif text-2xl">{formatCedis(total)}</span>
                </div>
                <p className="text-muted text-xs">
                  Est. {eta.min}–{eta.max} min · {b.city}
                </p>
              </div>

              {hasErrors && (
                <p role="alert" className="mt-3 text-sm text-[#c0442e]">
                  Almost — fix the highlighted fields above and try again.
                </p>
              )}

              <div className="mt-5 flex flex-col gap-3">
                <Button size="lg" onClick={() => placeOrder(payment)}>
                  Place order · {formatCedis(total)}
                </Button>
                <Button variant="outline" size="lg" onClick={() => placeOrder("whatsapp")}>
                  <MessageCircle className="size-4" /> Order on WhatsApp
                </Button>
                <Link
                  href="/giloz/menu"
                  className="text-muted hover:text-brand text-center text-sm"
                >
                  Add more items
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-ink mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && errorId && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#c0442e]">
          {error}
        </p>
      )}
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
