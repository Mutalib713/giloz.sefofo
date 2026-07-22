"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bike, CheckCircle2, Clock, MessageCircle, RotateCcw, Store } from "lucide-react";
import { ORDER_STEPS, getOrder, statusIndexFor, type Order } from "@/lib/orders/store";
import { useCart } from "@/lib/cart/store";
import { BRANDS, whatsappLink } from "@/lib/brands";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/common/empty-state";
import { useMounted } from "@/lib/hooks/use-mounted";
import { formatCedis } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Full-bleed shell that paints the page in a brand theme. Sefofo is a light
 * world, so a confirmed Sefofo order needs its own light background — otherwise
 * the light-theme text renders on the dark house background and washes out.
 */
function TrackerShell({ brand, children }: { brand: string; children: React.ReactNode }) {
  return (
    <div data-brand={brand} className="bg-paper text-ink min-h-dvh">
      <Container className="py-12 sm:py-16">{children}</Container>
    </div>
  );
}

export function OrderTracker({ id }: { id: string }) {
  const mounted = useMounted();
  const router = useRouter();
  const addItem = useCart((s) => s.addItem);
  const [order, setOrder] = useState<Order | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    setOrder(getOrder(id));
  }, [id]);

  useEffect(() => {
    if (!order) return;
    const tick = () => setStepIndex(statusIndexFor(order));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [order]);

  if (!mounted) {
    return (
      <TrackerShell brand="eve">
        <p className="text-muted py-20 text-center">Loading your order…</p>
      </TrackerShell>
    );
  }

  if (!order) {
    return (
      <TrackerShell brand="eve">
        <EmptyState
          icon={Clock}
          title="Order not found"
          description="We couldn't find that order on this device — in this demo, orders are stored locally in your browser."
          actionHref="/giloz/menu"
          actionLabel="Back to the menu"
        />
      </TrackerShell>
    );
  }

  const b = BRANDS[order.brand];

  const reorder = () => {
    order.items.forEach((i) =>
      addItem(
        {
          slug: i.slug,
          brand: i.brand,
          name: i.name,
          image: i.image,
          tone: i.tone,
          unitPrice: i.unitPrice,
          options: i.options,
          quantity: i.quantity,
        },
        { force: true },
      ),
    );
    router.push("/checkout");
  };

  return (
    <TrackerShell brand={order.brand}>
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <CheckCircle2 className="text-brand mx-auto size-12" />
          <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">Order confirmed</h1>
          <p className="text-muted mt-3">
            Thank you, {order.contact.name.split(" ")[0]}! Your {b.shortName} order is headed to the
            kitchen.
          </p>
          <p className="label text-brand mt-3">#{order.number}</p>
        </div>

        <div className="border-line bg-surface mt-10 rounded-2xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Status</h2>
            <span className="text-muted inline-flex items-center gap-1.5 text-sm">
              <Clock className="size-4" /> {order.etaMin}–{order.etaMax} min
            </span>
          </div>
          <ol className="mt-5">
            {ORDER_STEPS.map((s, idx) => {
              const done = idx < stepIndex;
              const active = idx === stepIndex;
              const label =
                order.fulfilment === "delivery" && s.deliveryLabel ? s.deliveryLabel : s.label;
              return (
                <li key={s.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full border transition-colors",
                        done || active
                          ? "border-brand bg-brand text-on-brand"
                          : "border-line text-muted",
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <span className="size-2 rounded-full bg-current" />
                      )}
                    </span>
                    {idx < ORDER_STEPS.length - 1 && (
                      <span
                        className={cn(
                          "min-h-6 w-px flex-1",
                          idx < stepIndex ? "bg-brand" : "bg-line",
                        )}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className={cn(
                        active || done ? "text-ink" : "text-muted",
                        active && "font-medium",
                      )}
                    >
                      {label}
                    </p>
                    {active && <p className="text-brand text-xs">In progress…</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="border-line bg-surface rounded-2xl border p-5 text-sm">
            <h3 className="label text-muted">
              {order.fulfilment === "delivery" ? "Delivery" : "Pickup"}
            </h3>
            <div className="mt-3 flex items-start gap-2">
              {order.fulfilment === "delivery" ? (
                <Bike className="text-brand mt-0.5 size-4 shrink-0" />
              ) : (
                <Store className="text-brand mt-0.5 size-4 shrink-0" />
              )}
              <span>
                {order.fulfilment === "delivery" ? (
                  <>
                    {order.address}
                    <span className="text-muted block">{order.zoneName}</span>
                  </>
                ) : (
                  order.pickupLocation
                )}
              </span>
            </div>
            <p className="text-muted mt-3">
              {order.contact.name} · {order.contact.phone}
            </p>
          </div>

          <div className="border-line bg-surface rounded-2xl border p-5">
            <h3 className="label text-muted">Items</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {order.items.map((i) => (
                <li key={i.key} className="flex justify-between gap-2">
                  <span>
                    {i.quantity}× {i.name}
                  </span>
                  <span className="tnum">{formatCedis(i.unitPrice * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="border-line mt-3 flex justify-between border-t pt-3 font-medium">
              <span>Total</span>
              <span className="tnum">{formatCedis(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" onClick={reorder} className="flex-1">
            <RotateCcw className="size-4" /> Reorder
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <a
              href={whatsappLink(order.brand, `Hi ${b.name}, about my order ${order.number}:`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" /> Contact {b.shortName}
            </a>
          </Button>
        </div>

        <p className="text-muted mt-6 text-center text-sm">
          <Link href={`/${order.brand}/menu`} className="hover:text-brand">
            Back to the {b.shortName} menu
          </Link>
        </p>
      </div>
    </TrackerShell>
  );
}
