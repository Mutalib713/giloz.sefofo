import type { Product } from "@/lib/types";
import type { AddInput, CartItem, CartOption } from "@/lib/cart/store";
import { BRANDS, whatsappLink, type BrandKey } from "@/lib/brands";
import { formatCedis } from "@/lib/format";

/** Default option choices for a product (used by quick-add). */
export function defaultOptions(product: Product): CartOption[] {
  return product.options
    .map((g) => {
      const def = g.choices.find((c) => c.isDefault) ?? g.choices[0];
      return def ? { group: g.name, choice: def.name } : null;
    })
    .filter((o): o is CartOption => o !== null);
}

/** Unit price given selected option choices. */
export function priceFor(product: Product, options: CartOption[]): number {
  let price = product.basePrice;
  for (const g of product.options) {
    const selected = options.find((o) => o.group === g.name);
    const choice = g.choices.find((c) => c.name === selected?.choice);
    if (choice) price += choice.priceDelta;
  }
  return price;
}

/** Build an AddInput from a product + chosen options. */
export function toCartInput(product: Product, options: CartOption[], quantity = 1): AddInput {
  return {
    slug: product.slug,
    brand: product.brand,
    name: product.name,
    image: product.image,
    tone: product.imageTone,
    unitPrice: priceFor(product, options),
    options,
    quantity,
  };
}

/** Format the whole cart as a WhatsApp order message. */
export function cartWhatsAppLink(brand: BrandKey, items: CartItem[], note?: string): string {
  const b = BRANDS[brand];
  const lines = items.map((i) => {
    const opts = i.options.length ? ` (${i.options.map((o) => o.choice).join(", ")})` : "";
    return `• ${i.quantity}× ${i.name}${opts} — ${formatCedis(i.unitPrice * i.quantity)}`;
  });
  const total = items.reduce((n, i) => n + i.unitPrice * i.quantity, 0);
  const msg = [
    `Hi ${b.name}! I'd like to order:`,
    ``,
    ...lines,
    ``,
    `Subtotal: ${formatCedis(total)}`,
    note ? `Note: ${note}` : "",
    ``,
    `Name:`,
    `Delivery address / pickup:`,
  ]
    .filter(Boolean)
    .join("\n");
  return whatsappLink(brand, msg);
}
