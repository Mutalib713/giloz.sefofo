"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { TiltCard } from "@/components/motion";
import { FoodImage } from "@/components/common/food-image";
import { PriceTag, Rating } from "@/components/menu/product-meta";
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
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-brand">
        <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
          <FoodImage
            src={product.image}
            alt={product.name}
            tone={product.imageTone}
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />
          {badge && (
            <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-wider text-white backdrop-blur">
              {badge}
            </span>
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2 py-1 backdrop-blur">
            <Rating value={product.ratingAvg} className="text-white [&_.tnum]:text-white" />
          </span>
        </Link>

        <button
          type="button"
          onClick={() => toggle(product.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-line bg-surface/70 backdrop-blur transition-transform hover:scale-110"
        >
          <Heart className={cn("size-4 transition-colors", saved ? "fill-brand text-brand" : "text-ink")} />
        </button>

        <div className="flex flex-1 flex-col p-4">
          <span className="label text-muted">{product.eweName ?? "Eʋe kitchen"}</span>
          <Link href={href}>
            <h3 className="mt-1 font-serif text-lg leading-tight transition-colors group-hover:text-brand">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.description}</p>
          <div className="mt-auto flex items-center justify-between pt-4">
            <PriceTag pesewas={product.basePrice} className="text-lg font-semibold" />
            <Link
              href={href}
              aria-label={`View ${product.name}`}
              className="grid size-9 place-items-center rounded-full bg-brand text-on-brand transition-transform duration-200 hover:scale-110"
            >
              <Plus className="size-4" />
            </Link>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
