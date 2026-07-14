import type { BrandKey } from "@/lib/brands";
import type { CartItem } from "@/lib/cart/store";

export type OrderStatus = "received" | "confirmed" | "preparing" | "on_the_way" | "completed";

export const ORDER_STEPS: { key: OrderStatus; label: string; deliveryLabel?: string }[] = [
  { key: "received", label: "Order received" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing your food" },
  { key: "on_the_way", label: "Ready for pickup", deliveryLabel: "Out for delivery" },
  { key: "completed", label: "Completed" },
];

export interface Order {
  id: string;
  number: string;
  brand: BrandKey;
  createdAt: number;
  items: CartItem[];
  fulfilment: "delivery" | "pickup";
  contact: { name: string; phone: string; email?: string };
  address?: string;
  zoneName?: string;
  pickupLocation?: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  note?: string;
  paymentMethod: "paystack" | "whatsapp" | "cash";
  etaMin: number;
  etaMax: number;
  /** manual status floor set from the admin board (demo) */
  statusOverride?: number;
}

const KEY = "eve.orders";

function readAll(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  const all = [order, ...readAll().filter((o) => o.id !== order.id)].slice(0, 20);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function getOrder(id: string): Order | null {
  return readAll().find((o) => o.id === id) ?? null;
}

export function listOrders(): Order[] {
  return readAll();
}

/** Admin (demo): bump an order's status floor by one step. */
export function advanceOrder(id: string): Order | null {
  const order = getOrder(id);
  if (!order) return null;
  const current = statusIndexFor(order);
  const next = Math.min(current + 1, ORDER_STEPS.length - 1);
  const updated: Order = { ...order, statusOverride: next };
  saveOrder(updated);
  return updated;
}

export function makeOrderNumber(brand: BrandKey): string {
  const prefix = brand === "giloz" ? "GZ" : "SF";
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

/** Demo status derived from elapsed time so tracking "advances" and survives refresh. */
export function statusIndexFor(order: Order, now = Date.now()): number {
  const elapsedSec = (now - order.createdAt) / 1000;
  const perStep = 10; // seconds per step (demo)
  const derived = Math.min(Math.floor(elapsedSec / perStep), ORDER_STEPS.length - 1);
  return Math.max(derived, order.statusOverride ?? 0);
}
