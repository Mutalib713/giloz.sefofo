"use client";

import { useMemo, useState } from "react";
import { Heart, Minus, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { itemWhatsappLink } from "@/lib/whatsapp";
import { formatCedis } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

export function OptionPicker({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();

  const initial = useMemo(() => {
    const s: Record<string, string> = {};
    for (const g of product.options) {
      const def = g.choices.find((c) => c.isDefault) ?? g.choices[0];
      if (def) s[g.name] = def.name;
    }
    return s;
  }, [product]);

  const [selected, setSelected] = useState<Record<string, string>>(initial);
  const [qty, setQty] = useState(1);

  const unitPrice = useMemo(() => {
    let price = product.basePrice;
    for (const g of product.options) {
      const choice = g.choices.find((c) => c.name === selected[g.name]);
      if (choice) price += choice.priceDelta;
    }
    return price;
  }, [product, selected]);

  const total = unitPrice * qty;
  const saved = has(product.slug);
  const selectedOptions = product.options
    .map((g) => ({ group: g.name, choice: selected[g.name] ?? "" }))
    .filter((o) => o.choice);
  const waHref = itemWhatsappLink(product.brand, {
    name: product.name,
    quantity: qty,
    unitPrice,
    options: selectedOptions,
  });

  return (
    <div className="flex flex-col gap-6">
      {product.options.map((g) => (
        <fieldset key={g.name}>
          <legend className="label mb-2 text-muted">{g.name}</legend>
          <div className="flex flex-wrap gap-2">
            {g.choices.map((c) => {
              const active = selected[g.name] === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelected((s) => ({ ...s, [g.name]: c.name }))}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    active
                      ? "border-brand bg-brand text-on-brand"
                      : "border-line text-ink hover:border-brand",
                  )}
                >
                  {c.name}
                  {c.priceDelta ? ` · +${formatCedis(c.priceDelta)}` : ""}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:text-brand disabled:opacity-40"
            aria-label="Decrease quantity"
            disabled={qty <= 1}
          >
            <Minus className="size-4" />
          </button>
          <span className="tnum w-8 text-center" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:text-brand"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="tnum font-serif text-3xl">{formatCedis(total)}</div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <AddToCartButton
            product={product}
            options={selectedOptions}
            quantity={qty}
            label={`Add to cart · ${formatCedis(total)}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => toggle(product.slug)}
            aria-pressed={saved}
            aria-label={saved ? "Saved to wishlist" : "Save to wishlist"}
          >
            <Heart className={cn("size-4", saved && "fill-brand text-brand")} />
          </Button>
        </div>
        <Button asChild variant="outline" size="lg">
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" /> Order on WhatsApp
          </a>
        </Button>
      </div>

      <p className="text-xs text-muted">
        Pay with Mobile Money or card at checkout, or send your order straight to WhatsApp.
      </p>
    </div>
  );
}
