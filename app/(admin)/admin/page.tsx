"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChefHat, Package, Star, Wallet } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMounted } from "@/lib/hooks/use-mounted";
import {
  ORDER_STEPS,
  advanceOrder,
  listOrders,
  statusIndexFor,
  type Order,
} from "@/lib/orders/store";
import { PRODUCTS } from "@/lib/mock/menu";
import { BRANDS } from "@/lib/brands";
import { formatCedis } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function AdminPage() {
  const mounted = useMounted();
  const [orders, setOrders] = useState<Order[]>([]);
  const [, forceTick] = useState(0);

  const refresh = () => setOrders(listOrders());

  useEffect(() => {
    refresh();
    const t = window.setInterval(() => forceTick((n) => n + 1), 2000);
    return () => window.clearInterval(t);
  }, []);

  const revenue = orders.reduce((n, o) => n + o.total, 0);
  const avgRating = PRODUCTS.reduce((n, p) => n + p.ratingAvg, 0) / PRODUCTS.length;
  const active = orders.filter((o) => statusIndexFor(o) < ORDER_STEPS.length - 1);
  const completed = orders.filter((o) => statusIndexFor(o) >= ORDER_STEPS.length - 1);

  return (
    <Container size="wide" className="py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-brand">Back of house</p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Admin</h1>
        </div>
        <Badge variant="outline">Demo mode · orders from this browser</Badge>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={Package} label="Orders" value={mounted ? String(orders.length) : "—"} />
        <Stat icon={Wallet} label="Revenue" value={mounted ? formatCedis(revenue) : "—"} />
        <Stat icon={ChefHat} label="Dishes live" value={String(PRODUCTS.length)} />
        <Stat icon={Star} label="Avg rating" value={avgRating.toFixed(1)} />
      </div>

      {/* Order board */}
      <section className="mt-12">
        <h2 className="font-serif text-3xl">Order board</h2>
        {mounted && orders.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-line bg-surface p-8 text-center text-muted">
            No orders yet on this device — place one from the{" "}
            <Link href="/giloz/menu" className="text-brand hover:underline">
              menu
            </Link>{" "}
            and it lands here live.
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-8">
            <BoardSection
              title="In progress"
              orders={active}
              onAdvance={(id) => {
                advanceOrder(id);
                refresh();
              }}
            />
            <BoardSection title="Completed" orders={completed} muted />
          </div>
        )}
      </section>

      {/* Menu manager */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl">Menu</h2>
          <span className="text-sm text-muted">{PRODUCTS.length} dishes · both kitchens</span>
        </div>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="label px-4 py-3 font-normal text-muted">Dish</th>
                <th className="label px-4 py-3 font-normal text-muted">Kitchen</th>
                <th className="label px-4 py-3 font-normal text-muted">Category</th>
                <th className="label px-4 py-3 font-normal text-muted">Price</th>
                <th className="label px-4 py-3 font-normal text-muted">Rating</th>
                <th className="label px-4 py-3 font-normal text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0 hover:bg-surface">
                  <td className="px-4 py-3">
                    <Link href={`/${p.brand}/product/${p.slug}`} className="font-medium hover:text-brand">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{BRANDS[p.brand].shortName}</td>
                  <td className="px-4 py-3 text-muted">{p.categorySlug}</td>
                  <td className="tnum px-4 py-3">{formatCedis(p.basePrice)}</td>
                  <td className="tnum px-4 py-3">
                    {p.ratingAvg.toFixed(1)} <span className="text-muted">({p.ratingCount})</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={p.isAvailable ? "brand" : "outline"}>
                      {p.isAvailable ? "Available" : "Sold out"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">
          Full menu editing (prices, availability, photos via Cloudinary) wires in with Supabase.
        </p>
      </section>
    </Container>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <Icon className="size-5 text-brand" />
      <p className="tnum mt-3 font-serif text-3xl leading-none">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

function BoardSection({
  title,
  orders,
  onAdvance,
  muted,
}: {
  title: string;
  orders: Order[];
  onAdvance?: (id: string) => void;
  muted?: boolean;
}) {
  if (orders.length === 0) return null;
  return (
    <div>
      <h3 className="label text-muted">{title}</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {orders.map((o) => {
          const idx = statusIndexFor(o);
          const step = ORDER_STEPS[idx];
          const label =
            o.fulfilment === "delivery" && step?.deliveryLabel ? step.deliveryLabel : (step?.label ?? "");
          const isLast = idx >= ORDER_STEPS.length - 1;
          return (
            <div
              key={o.id}
              className={cn(
                "rounded-2xl border border-line bg-surface p-5",
                muted && "opacity-70",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="label text-brand">#{o.number}</span>
                <span className="text-xs text-muted">{BRANDS[o.brand].shortName}</span>
              </div>
              <ul className="mt-3 flex flex-col gap-1 text-sm">
                {o.items.slice(0, 3).map((i) => (
                  <li key={i.key} className="flex justify-between gap-2">
                    <span className="truncate">
                      {i.quantity}× {i.name}
                    </span>
                    <span className="tnum shrink-0 text-muted">{formatCedis(i.unitPrice * i.quantity)}</span>
                  </li>
                ))}
                {o.items.length > 3 && (
                  <li className="text-xs text-muted">+ {o.items.length - 3} more…</li>
                )}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <Badge variant={isLast ? "brand" : "outline"}>{label}</Badge>
                <span className="tnum font-semibold">{formatCedis(o.total)}</span>
              </div>
              {!isLast && onAdvance && (
                <Button size="sm" variant="secondary" className="mt-4 w-full" onClick={() => onAdvance(o.id)}>
                  Advance status <ArrowRight className="size-3.5" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
