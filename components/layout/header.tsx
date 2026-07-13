"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { BrandSwitcher } from "@/components/brand/brand-switcher";
import { Button } from "@/components/ui/button";
import { useActiveBrand } from "@/lib/hooks/use-active-brand";
import { BRANDS } from "@/lib/brands";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Giloz", href: "/giloz" },
  { label: "Sefofo", href: "/sefofo" },
];

export function Header() {
  const brand = useActiveBrand();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuHref = `/${brand ?? "giloz"}/menu`;

  return (
    <header
      data-brand={brand ?? "eve"}
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled ? "glass border-b border-line" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo compact />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <Link href={menuHref} className="text-sm text-muted transition-colors hover:text-ink">
            Menu
          </Link>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <BrandSwitcher className="hidden sm:inline-flex" />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={menuHref}>See the menu</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-brand={brand ?? "eve"}
            className="fixed inset-0 z-[60] bg-paper text-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-line"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-5 pt-6" aria-label="Mobile">
              {[
                { label: "Home", href: "/" },
                { label: "Giloz Restaurant", href: "/giloz" },
                { label: "Sefofo", href: "/sefofo" },
                { label: "Menu", href: menuHref },
              ].map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 font-serif text-3xl tracking-tight"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex flex-col gap-4 px-5 pt-8">
              <BrandSwitcher />
              <Button asChild size="lg">
                <Link href={menuHref} onClick={() => setOpen(false)}>
                  Start your order
                </Link>
              </Button>
              <p className="label text-muted">
                {BRANDS.giloz.city} · {BRANDS.sefofo.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
