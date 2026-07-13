"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/** Masked, word-by-word display reveal. Falls back to plain text if reduced. */
export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span variants={word} style={{ display: "inline-block", willChange: "transform" }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
