"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * The hero's food imagery: one signature dish per kitchen, overlapped so the
 * composition itself says "two kitchens, one table". Real photos from the
 * brands (Sefofo's grilled tilapia tray, Giloz-style jollof with grilled
 * chicken). Slow float on capable devices; static for reduced motion.
 */
export function HeroPlates({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -12, 0] },
          transition: { duration: 7, delay, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div className={cn("pointer-events-none relative select-none", className)}>
      {/* Sefofo — grilled tilapia & hot pepper tray (the showpiece) */}
      <motion.div
        {...float(0)}
        className="absolute right-0 top-1/2 aspect-[4/5] w-[68%] max-w-[430px] -translate-y-1/2 rotate-2 overflow-hidden rounded-[2.5rem] border border-line shadow-2xl shadow-black/40"
      >
        <Image
          src="/food/tilapia-hot-pepper.jpg"
          alt="Grilled tilapia with hot pepper and banku at Sefofo"
          fill
          sizes="(max-width: 1024px) 60vw, 430px"
          quality={72}
          priority
          className="object-cover"
        />
      </motion.div>
      {/* Giloz — jollof with grilled chicken */}
      <motion.div
        {...float(1.6)}
        className="absolute bottom-[6%] left-0 aspect-square w-[44%] max-w-[260px] -rotate-3 overflow-hidden rounded-3xl border border-line shadow-xl shadow-black/40"
      >
        <Image
          src="/food/jollof-chicken.jpg"
          alt="Jollof rice with grilled chicken at Giloz"
          fill
          sizes="(max-width: 1024px) 40vw, 260px"
          quality={72}
          priority
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

/** Compact mobile variant: the same two dishes as a slightly overlapping pair. */
export function HeroPlatesMobile({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-end gap-0", className)} aria-hidden>
      <div className="relative z-10 aspect-[4/5] w-[54%] overflow-hidden rounded-3xl border border-line shadow-xl shadow-black/40">
        <Image
          src="/food/tilapia-hot-pepper.jpg"
          alt=""
          fill
          sizes="55vw"
          quality={70}
          className="object-cover"
        />
      </div>
      <div className="relative -ml-6 mb-4 aspect-square w-[46%] rotate-2 overflow-hidden rounded-2xl border border-line shadow-lg shadow-black/40">
        <Image
          src="/food/jollof-chicken.jpg"
          alt=""
          fill
          sizes="45vw"
          quality={70}
          className="object-cover"
        />
      </div>
    </div>
  );
}
