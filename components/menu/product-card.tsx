"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { TiltCard } from "@/components/motion";
import { FoodImage } from "@/components/common/food-image";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { PriceTag } from "@/components/menu/product-meta";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const saved = has(product.slug);
  const href = `/${product.brand}/product/${product.slug}`;
  const badge = product.tags.includes("chefs-pick")
    ? "Chef's pick"
    : product.tags.includes("new")
      ? "New"
      : null;

  return (
    <TiltCard className="group h-full" intensity={6}>
      <article className="border-line bg-surface hover:border-brand relative flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-300">
        <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
          <FoodImage
            src={product.image}
            alt={product.name}
            tone={product.imageTone}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
          {badge && (
            <span className="bg-brand text-on-brand absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.68rem] font-medium tracking-wider uppercase shadow-sm">
              {badge}
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          className="border-line bg-surface/70 absolute top-2 right-2 grid size-11 place-items-center rounded-full border backdrop-blur transition-transform hover:scale-110"
        >
          <Heart
            className={cn("size-4 transition-colors", saved ? "fill-brand text-brand" : "text-ink")}
          />
        </button>

        <div className="flex flex-1 flex-col p-4">
          {/* Eyebrow only when the Eʋe name adds information beyond the title */}
          {product.eweName &&
            product.eweName.localeCompare(product.name, undefined, { sensitivity: "base" }) !==
              0 && <span className="label text-muted">{product.eweName}</span>}
          <Link href={href}>
            <h3 className="group-hover:text-brand mt-1 font-serif text-lg leading-tight transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-muted mt-1.5 line-clamp-2 text-sm">{product.description}</p>
          <div className="mt-auto flex items-center justify-between pt-4">
            <PriceTag pesewas={product.basePrice} className="text-lg font-semibold" />
            <AddToCartButton product={product} variant="icon" />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
