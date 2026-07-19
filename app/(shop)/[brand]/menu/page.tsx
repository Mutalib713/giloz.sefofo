import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, UtensilsCrossed } from "lucide-react";
import { BRANDS, isBrandKey } from "@/lib/brands";
import { dietTags, getCategories, getMenu } from "@/lib/data/menu";
import { Container } from "@/components/layout/container";
import { CategoryRail } from "@/components/menu/category-rail";
import { MenuFilters } from "@/components/menu/menu-filters";
import { MenuGrid } from "@/components/menu/menu-grid";
import { EmptyState } from "@/components/common/empty-state";
import { Reveal } from "@/components/motion";
import { pluralize } from "@/lib/format";
import type { MenuFilters as MF } from "@/lib/types";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const SORTS = new Set(["price-asc", "price-desc", "popular"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand } = await params;
  if (!isBrandKey(brand)) return {};
  const b = BRANDS[brand];
  return {
    title: `Menu — ${b.name}`,
    description: `Order ${b.name}'s Eʋe & Ghanaian dishes online. ${b.story}`,
    alternates: { canonical: `/${brand}/menu` },
  };
}

export default async function MenuPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>;
  searchParams: Promise<SP>;
}) {
  const { brand } = await params;
  if (!isBrandKey(brand)) notFound();
  const sp = await searchParams;

  const clean: Record<string, string | undefined> = {
    category: one(sp.category),
    q: one(sp.q),
    diet: one(sp.diet),
    sort: one(sp.sort),
  };
  const sort = clean.sort && SORTS.has(clean.sort) ? (clean.sort as MF["sort"]) : undefined;
  const filters: MF = { category: clean.category, q: clean.q, diet: clean.diet, sort };

  const [categories, products] = await Promise.all([
    getCategories(brand),
    getMenu(brand, filters),
  ]);
  const b = BRANDS[brand];

  return (
    <>
      <Container className="pb-6 pt-10 sm:pt-14">
        <Reveal>
          <p className="label text-brand">{b.name}</p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-6xl">The menu</h1>
          <p className="mt-3 max-w-xl text-muted">{b.story}</p>
          <Link
            href={b.menuPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <FileText className="size-4" />
            View {b.shortName}&apos;s printed menu (PDF)
          </Link>
        </Reveal>
      </Container>

      {/* Non-sticky on mobile so it scrolls away and doesn't cover the dishes;
          sticky from sm up, where there's room for a pinned toolbar. */}
      <div className="z-30 border-y border-line glass sm:sticky sm:top-16">
        <Container className="flex flex-col gap-3 py-4">
          <CategoryRail categories={categories} sp={clean} />
          <MenuFilters sp={clean} diets={dietTags().map((t) => ({ slug: t.slug, label: t.label }))} />
        </Container>
      </div>

      <Container className="py-8 sm:py-10">
        <p className="label mb-6 text-muted">
          {products.length} {pluralize(products.length, "dish", "dishes")}
        </p>
        {products.length > 0 ? (
          <MenuGrid products={products} />
        ) : (
          <EmptyState
            icon={UtensilsCrossed}
            title="No dishes match that."
            description="Try clearing your filters or searching for something else — like jollof, banku or shawarma."
            actionHref={`/${brand}/menu`}
            actionLabel="Clear filters"
          />
        )}
      </Container>
    </>
  );
}
