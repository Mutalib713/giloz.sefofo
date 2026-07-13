import { BRANDS, whatsappLink, type BrandKey } from "@/lib/brands";
import { formatCedis } from "@/lib/format";

export interface OrderLine {
  name: string;
  quantity: number;
  unitPrice: number;
  options: { group: string; choice: string }[];
}

/** Human-readable WhatsApp order text for a single item. */
export function buildItemMessage(brand: BrandKey, line: OrderLine): string {
  const b = BRANDS[brand];
  const opts = line.options.length
    ? ` (${line.options.map((o) => `${o.group}: ${o.choice}`).join(", ")})`
    : "";
  const total = line.unitPrice * line.quantity;
  return [
    `Hi ${b.name}! I'd like to order:`,
    ``,
    `${line.quantity}× ${line.name}${opts}`,
    `Total: ${formatCedis(total)}`,
    ``,
    `Name:`,
    `Delivery address / pickup:`,
  ].join("\n");
}

export function itemWhatsappLink(brand: BrandKey, line: OrderLine): string {
  return whatsappLink(brand, buildItemMessage(brand, line));
}
