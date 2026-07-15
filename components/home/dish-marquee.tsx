const DISHES = [
  "Akple & Ademe",
  "Tilapia & Hot Pepper",
  "Fufu & Light Soup",
  "Gbatakpã",
  "Waakye",
  "Totonyanya",
  "Abolo",
  "Jollof",
  "Fetri Toto",
  "Shawarma",
];

export function DishMarquee() {
  const row = [...DISHES, ...DISHES];
  return (
    <section aria-hidden className="overflow-hidden border-y border-line py-7">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform hover:[animation-play-state:paused]">
        {row.map((d, i) => (
          <span key={i} className="inline-flex items-center gap-10 font-serif text-2xl text-muted sm:text-3xl">
            <span>{d}</span>
            <span className="text-brand">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
