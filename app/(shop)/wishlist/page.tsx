"use client";

import { Heart } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/menu/product-card";
import { EmptyState } from "@/components/common/empty-state";
import { useWishlist } from "@/lib/hooks/use-wishlist";
import { useMounted } from "@/lib/hooks/use-mounted";
import { PRODUCTS } from "@/lib/mock/menu";
import { pluralize } from "@/lib/format";

export default function WishlistPage() {
  const mounted = useMounted();
  const { items } = useWishlist();
  const saved = PRODUCTS.filter((p) => items.includes(p.slug));

  return (
    <Container className="py-10 sm:py-14">
      <p className="label text-brand">Saved for later</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-6xl">Your wishlist</h1>

      {!mounted ? null : saved.length === 0 ? (
        <div className="mx-auto mt-10 max-w-md">
          <EmptyState
            icon={Heart}
            title="Nothing saved yet"
            description="Tap the heart on any dish and it will wait for you here."
            actionHref="/giloz/menu"
            actionLabel="Browse the menu"
          />
        </div>
      ) : (
        <>
          <p className="label mt-4 text-muted">
            {saved.length} {pluralize(saved.length, "dish", "dishes")}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {saved.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
