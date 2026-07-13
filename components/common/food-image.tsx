"use client";

import { useState } from "react";
import { Plate } from "./plate";
import { cn } from "@/lib/cn";

interface FoodImageProps {
  src?: string;
  alt: string;
  tone: [string, string];
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

/**
 * Real food photo layered over the brand's gradient "plate". If the photo is
 * missing or fails to load (e.g. an expired Instagram URL), the gradient shows
 * through — so a card is never broken or empty.
 */
export function FoodImage({ src, alt, tone, className, imgClassName, priority }: FoodImageProps) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      <Plate tone={tone} ring={!showImg} className="absolute inset-0" />
      {showImg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
