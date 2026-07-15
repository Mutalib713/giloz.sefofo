import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/common/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Ordering, delivery, payment and food questions — answered.",
  alternates: { canonical: "/faq" },
};

const FAQS: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: "Ordering",
    items: [
      {
        q: "How do I order?",
        a: "Pick a kitchen (Giloz or Sefofo), browse the menu, add dishes to your cart and check out — or tap “Order on WhatsApp” and your order arrives in the kitchen's chat, pre-written.",
      },
      {
        q: "Can I order from both kitchens at once?",
        a: "One kitchen per order keeps your food hot and your delivery fast. Your cart will offer to switch kitchens if you add from the other menu.",
      },
      {
        q: "Do I need an account?",
        a: "No — guest checkout is always available. Accounts (with order history and synced wishlists) are coming soon.",
      },
    ],
  },
  {
    category: "Delivery & pickup",
    items: [
      {
        q: "Where do you deliver?",
        a: "Across Accra — from Pig-Farm and Kokomlemle to Osu, East Legon, Spintex and Tema. Your fee and ETA show at checkout based on your area.",
      },
      {
        q: "How long does delivery take?",
        a: "Most orders arrive in 25–45 minutes depending on your zone and the time of day. Pickup orders are typically ready in 20–30 minutes.",
      },
      {
        q: "Can I pick up my order?",
        a: "Yes — choose Pickup at checkout: Giloz in Pig-Farm or Sefofo in Dzorwulu.",
      },
    ],
  },
  {
    category: "Payment",
    items: [
      {
        q: "How can I pay?",
        a: "Mobile Money (MTN, Telecel) or card via Paystack, cash on delivery/pickup, or simply finish your order on WhatsApp.",
      },
      {
        q: "Are prices in cedis?",
        a: "Always. Every price you see is in Ghana Cedis (₵), no hidden charges — delivery is itemised at checkout.",
      },
    ],
  },
  {
    category: "The food",
    items: [
      {
        q: "What is Eʋe food?",
        a: "The cuisine of the Eʋe people of Ghana's Volta Region — akple with ademe or fetri detsi (okro), abolo with one-man-thousand, yakayake, and more. Deep, honest, home-style cooking.",
      },
      {
        q: "I don't know these dishes — where do I start?",
        a: "Every dish page explains what's in it. If you like comfort and greens, start with Akple & Ademe; if you want a crowd-pleaser, Banku & Grilled Tilapia never misses.",
      },
      {
        q: "Do you have vegetarian or vegan options?",
        a: "Yes — filter the menu by “Vegan” or “Vegetarian”. Boiled yam with palava sauce or garden egg stew, and the potato and vegetable salads, are favourites.",
      },
      {
        q: "How spicy is the food?",
        a: "You choose. Most mains let you pick Mild, Medium or Hot at no extra cost.",
      },
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.flatMap((c) =>
      c.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };

  return (
    <Container size="narrow" className="py-16 sm:py-24">
      <JsonLd data={jsonLd} />
      <Reveal>
        <p className="label text-brand">Good to know</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">Questions, answered</h1>
      </Reveal>

      <div className="mt-12 flex flex-col gap-10">
        {FAQS.map((cat, i) => (
          <Reveal key={cat.category} delay={Math.min(i, 3) * 0.06}>
            <section>
              <h2 className="label text-muted">{cat.category}</h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-line">
                {cat.items.map((item) => (
                  <details key={item.q} className="group border-b border-line bg-surface last:border-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="text-brand transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-sm text-muted">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
