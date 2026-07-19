"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, MessageCircle, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { selectSubtotal, useCart } from "@/lib/cart/store";
import { cartWhatsAppLink } from "@/lib/cart/helpers";
import { BRANDS } from "@/lib/brands";
import { Button } from "@/components/ui/button";
import { formatCedis } from "@/lib/format";

export function CartSheet() {
  const isOpen = useCart((s) => s.isOpen);
  const setOpen = useCart((s) => s.setOpen);
  const items = useCart((s) => s.items);
  const brand = useCart((s) => s.brand);
  const setQty = useCart((s) => s.setQty);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectSubtotal);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.aside
            data-brand={brand ?? "eve"}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper text-ink shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            role="dialog"
            aria-label="Your cart"
          >
            <header className="flex items-center justify-between border-b border-line p-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-brand" />
                <h2 className="font-serif text-xl">Your order</h2>
                {brand && <span className="label text-muted">· {BRANDS[brand].shortName}</span>}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="grid size-9 place-items-center rounded-full border border-line"
              >
                <X className="size-4" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <ShoppingBag className="size-10 text-muted" />
                <p className="font-serif text-2xl">Your cart is empty</p>
                <p className="text-sm text-muted">Add something delicious from the menu.</p>
                <Button asChild variant="secondary" onClick={() => setOpen(false)}>
                  <Link href="/giloz/menu">Browse the menu</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  <ul className="flex flex-col gap-4">
                    {items.map((i) => (
                      <li key={i.key} className="flex gap-3">
                        <div
                          className="size-20 shrink-0 overflow-hidden rounded-xl"
                          style={{ background: `linear-gradient(150deg, ${i.tone[0]}, ${i.tone[1]})` }}
                        >
                          {i.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={i.image}
                              alt={i.name}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <span className="font-medium leading-tight">{i.name}</span>
                            <button
                              type="button"
                              onClick={() => removeItem(i.key)}
                              aria-label={`Remove ${i.name}`}
                              className="-m-3 grid size-11 place-items-center text-muted transition-colors hover:text-brand"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                          {i.options.length > 0 && (
                            <span className="text-xs text-muted">
                              {i.options.map((o) => o.choice).join(" · ")}
                            </span>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="inline-flex items-center rounded-full border border-line">
                              <button
                                type="button"
                                onClick={() => setQty(i.key, i.quantity - 1)}
                                className="grid size-11 place-items-center"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="size-4" />
                              </button>
                              <span className="tnum w-7 text-center text-sm">{i.quantity}</span>
                              <button
                                type="button"
                                onClick={() => setQty(i.key, i.quantity + 1)}
                                className="grid size-11 place-items-center"
                                aria-label="Increase quantity"
                              >
                                <Plus className="size-4" />
                              </button>
                            </div>
                            <span className="tnum font-semibold">
                              {formatCedis(i.unitPrice * i.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="border-t border-line p-5">
                  <div className="flex items-center justify-between pb-3">
                    <span className="text-muted">Subtotal</span>
                    <span className="tnum font-serif text-2xl">{formatCedis(subtotal)}</span>
                  </div>
                  <p className="pb-4 text-xs text-muted">Delivery &amp; fees calculated at checkout.</p>
                  <div className="flex flex-col gap-3">
                    <Button asChild size="lg" onClick={() => setOpen(false)}>
                      <Link href="/checkout">Checkout · {formatCedis(subtotal)}</Link>
                    </Button>
                    {brand && (
                      <Button asChild variant="outline" onClick={() => setOpen(false)}>
                        <a href={cartWhatsAppLink(brand, items)} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="size-4" /> Order on WhatsApp
                        </a>
                      </Button>
                    )}
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
