"use client";

import { useState } from "react";
import Image from "next/image";
import { Plate } from "./plate";
import { cn } from "@/lib/cn";

interface FoodImageProps {
  src?: string;
  alt: string;
  tone: [string, string];
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /**
   * Rendered width hint for srcset selection (next/image `sizes`).
   * Pass the real layout fraction — e.g. "(max-width: 640px) 50vw, 25vw"
   * for a 2-up/4-up card grid. Defaults to full width.
   */
  sizes?: string;
}

/**
 * Real food photo layered over the brand's gradient "plate". Served through
 * next/image (AVIF/WebP, responsive srcset) so phones never download the
 * full 1200px original. If the photo is missing or fails to load, the
 * gradient shows through — a card is never broken or empty.
 */
export function FoodImage({
  src,
  alt,
  tone,
  className,
  imgClassName,
  priority,
  sizes = "100vw",
}: FoodImageProps) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      <Plate tone={tone} ring={!showImg} className="absolute inset-0" />
      {showImg && (
        <Image
          src={src as string}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={70}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
