import Link from "next/link";
import { HOUSE } from "@/lib/brands";
import { cn } from "@/lib/cn";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${HOUSE.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-brand">
        <svg
          width="15"
          height="18"
          viewBox="0 0 20 24"
          aria-hidden
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <path
            d="M10 1C11 6 15 7.5 15 13a5 5 0 0 1-10 0c0-2 1-3.2 1.8-4.2C7 11 8.4 11.6 9 13c.7-3-1.2-4.6 1-12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={cn("font-serif text-lg tracking-tight", compact && "hidden sm:inline")}>
        The Eʋe Table
      </span>
    </Link>
  );
}
