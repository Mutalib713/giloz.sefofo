"use client";

import Link from "next/link";
import { Clock, Heart, MapPin, Package, User } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { listOrders, statusIndexFor, ORDER_STEPS, type Order } from "@/lib/orders/store";
import { BRANDS } from "@/lib/brands";
import { formatCedis } from "@/lib/format";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const mounted = useMounted();
  const { count } = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(listOrders());
  }, []);

  const lastName = orders[0]?.contact.name.split(" ")[0];

  return (
    <Container className="py-10 sm:py-14">
      <p className="label text-brand">Your table</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-6xl">
        {lastName ? `Akwaaba, ${lastName}` : "Akwaaba"}
      </h1>
      <p className="mt-3 max-w-xl text-muted">
        This is a demo dashboard — your orders and wishlist live in this browser. Accounts with
        sign-in, synced wishlists and saved addresses arrive with Supabase.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Package} label="Orders on this device" value={mounted ? String(orders.length) : "—"} />
        <StatCard icon={Heart} label="Saved dishes" value={mounted ? String(count) : "—"} href="/wishlist" />
        <StatCard icon={MapPin} label="Kitchens" value="Giloz · Sefofo" />
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl">Recent orders</h2>
          <Link href="/giloz/menu" className="text-sm text-brand hover:underline">
            Order again →
          </Link>
        </div>

        {mounted && orders.length === 0 && (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-8 text-center">
            <User className="mx-auto size-8 text-muted" />
            <p className="mt-3 font-serif text-xl">No orders yet</p>
            <p className="mt-1 text-sm text-muted">Your first order will appear here.</p>
            <Button asChild variant="secondary" className="mt-5">
              <Link href="/giloz/menu">Browse the menu</Link>
            </Button>
          </div>
        )}

        <ul className="mt-6 flex flex-col gap-3">
          {orders.map((o) => {
            const idx = statusIndexFor(o);
            const step = ORDER_STEPS[idx];
            const done = idx >= ORDER_STEPS.length - 1;
            const label =
              o.fulfilment === "delivery" && step?.deliveryLabel ? step.deliveryLabel : (step?.label ?? "");
            return (
              <li key={o.id}>
                <Link
                  href={`/orders/${o.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand"
                >
                  <div className="flex items-center gap-4">
                    <span className="label text-brand">#{o.number}</span>
                    <span className="text-sm text-muted">{BRANDS[o.brand].shortName}</span>
                    <span className="text-sm text-muted">
                      {o.items.reduce((n, i) => n + i.quantity, 0)} items
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={done ? "brand" : "outline"}>
                      <Clock className="size-3" /> {label}
                    </Badge>
                    <span className="tnum font-semibold">{formatCedis(o.total)}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Container>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Package;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-brand">
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block font-serif text-2xl leading-tight">{value}</span>
        <span className="block text-sm text-muted">{label}</span>
      </span>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
