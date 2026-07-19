"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChefHat } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The hero's showpiece: one breathtaking plated dish — Giloz's wok-fired
 * shrimp fried rice (their own marketing shot) — presented large with a warm
 * glow, a floating "freshly wok-fired" seal and a dish label, restaurant-style.
 * Its near-black plate edges melt into the hero so it reads as one composition.
 */
export function HeroShowpiece({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const floaty = (opts: { y?: number; d?: number; delay?: number }) =>
    reduce
      ? {}
      : {
          animate: { y: [0, opts.y ?? -14, 0] },
          transition: {
            duration: opts.d ?? 8,
            delay: opts.delay ?? 0,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div className={cn("relative", className)}>
      {/* warm glow behind the plate */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(210,166,78,0.30),transparent_60%)] blur-2xl"
      />

      <motion.div {...floaty({ y: -14, d: 8 })}>
        <Link
          href="/giloz/menu"
          aria-label="See the Giloz menu — wok-fired shrimp fried rice"
          className="group block overflow-hidden rounded-[2.75rem] border border-brand/25 shadow-2xl shadow-black/50 ring-1 ring-white/5"
        >
          <div className="relative aspect-[5/4] w-full sm:aspect-[4/5]">
            <Image
              src="/food/hero-fried-rice.jpg"
              alt="Wok-fired shrimp fried rice at Giloz Restaurant"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              quality={74}
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
            />
          </div>
        </Link>
      </motion.div>

      {/* "freshly wok-fired" seal, top-right */}
      <motion.div
        {...floaty({ y: -9, d: 6, delay: 0.4 })}
        className="pointer-events-none absolute -right-2 -top-3 grid size-24 place-items-center rounded-full border border-brand/40 bg-paper/90 text-center shadow-lg backdrop-blur sm:-right-4"
      >
        <div className="text-brand">
          <ChefHat className="mx-auto size-5" />
          <p className="mt-1 text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.14em]">
            Freshly
            <br />
            wok-fired
          </p>
        </div>
      </motion.div>

      {/* dish label chip, bottom-left */}
      <motion.div
        {...floaty({ y: 10, d: 7, delay: 1 })}
        className="pointer-events-none absolute -bottom-4 -left-3 rounded-2xl border border-line bg-paper/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-5"
      >
        <p className="label text-brand">Giloz · signature</p>
        <p className="font-serif text-lg leading-tight">Super Fried Rice</p>
      </motion.div>
    </div>
  );
}
