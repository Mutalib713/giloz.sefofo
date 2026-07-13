import { cn } from "@/lib/cn";

/**
 * Decorative floating "food orbs" for hero backgrounds — pure CSS drift,
 * automatically stilled under prefers-reduced-motion. Aria-hidden.
 */
export function FloatingFood({ className }: { className?: string }) {
  const orbs = [
    { c: "left-[8%] top-[18%] size-28 animate-float", from: "var(--brand)", to: "var(--brand-strong)" },
    { c: "right-[10%] top-[26%] size-20 animate-float-slow", from: "var(--secondary)", to: "var(--brand)" },
    { c: "left-[18%] bottom-[14%] size-16 animate-float-slow", from: "var(--brand-strong)", to: "var(--secondary)" },
    { c: "right-[16%] bottom-[20%] size-24 animate-float", from: "var(--brand)", to: "var(--secondary)" },
  ];
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {orbs.map((o, i) => (
        <span
          key={i}
          className={cn("absolute rounded-full blur-2xl opacity-40", o.c)}
          style={{
            background: `radial-gradient(circle at 38% 32%, ${o.from}, ${o.to})`,
            animationDelay: `${i * 1.3}s`,
          }}
        />
      ))}
    </div>
  );
}
