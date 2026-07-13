"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type CartOption } from "@/lib/cart/store";
import { defaultOptions, toCartInput } from "@/lib/cart/helpers";
import { BRANDS, type BrandKey } from "@/lib/brands";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  options?: CartOption[];
  quantity?: number;
  variant?: "full" | "icon";
  label?: string;
  className?: string;
}

export function AddToCartButton({
  product,
  options,
  quantity = 1,
  variant = "full",
  label = "Add to cart",
  className,
}: AddToCartButtonProps) {
  const addItem = useCart((s) => s.addItem);
  const currentBrand = useCart((s) => s.brand);
  const [added, setAdded] = useState(false);
  const [conflict, setConflict] = useState(false);
  const opts = options ?? defaultOptions(product);

  function add(force = false) {
    const res = addItem(toCartInput(product, opts, quantity), { force });
    if (res.conflict) {
      setConflict(true);
      return;
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => add()}
          aria-label={`Add ${product.name} to cart`}
          className={cn(
            "grid size-9 place-items-center rounded-full bg-brand text-on-brand transition-transform duration-200 hover:scale-110",
            className,
          )}
        >
          {added ? <Check className="size-4" /> : <Plus className="size-4" />}
        </button>
      ) : (
        <Button type="button" size="lg" onClick={() => add()} className={className}>
          {added ? (
            <>
              <Check className="size-4" /> Added to cart
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" /> {label}
            </>
          )}
        </Button>
      )}

      <AnimatePresence>
        {conflict && (
          <BrandConflictModal
            currentBrand={currentBrand}
            targetBrand={product.brand}
            onCancel={() => setConflict(false)}
            onConfirm={() => {
              setConflict(false);
              add(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function BrandConflictModal({
  currentBrand,
  targetBrand,
  onCancel,
  onConfirm,
}: {
  currentBrand: BrandKey | null;
  targetBrand: BrandKey;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const current = currentBrand ? BRANDS[currentBrand].shortName : "current";
  const target = BRANDS[targetBrand].shortName;
  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        className="relative w-full max-w-sm rounded-2xl border border-line bg-surface p-6 text-ink"
        initial={{ scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="font-serif text-2xl">Start a {target} order?</h3>
        <p className="mt-2 text-sm text-muted">
          Your cart has {current} items. We keep one kitchen per order, so starting a {target} order
          will clear it.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Keep {current}
          </Button>
          <Button className="flex-1" onClick={onConfirm}>
            Start {target}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
