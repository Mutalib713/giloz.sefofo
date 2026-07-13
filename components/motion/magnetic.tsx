"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Cursor-magnetic wrapper for CTAs. Inert under reduced motion. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const x = useSpring(mvx, { stiffness: 220, damping: 16 });
  const y = useSpring(mvy, { stiffness: 220, damping: 16 });

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mvx.set((e.clientX - r.left - r.width / 2) * strength);
        mvy.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        mvx.set(0);
        mvy.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
