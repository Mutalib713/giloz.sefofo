import { Reveal } from "@/components/motion";
import { ProductCard } from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types";

export function MenuGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 7) * 0.05}>
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <div className="flex items-center justify-between pt-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="size-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function MenuGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
