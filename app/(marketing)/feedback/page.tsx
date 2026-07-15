import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { BrandLogo } from "@/components/brand/brand-logo";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { BRANDS, BRAND_KEYS } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Tell Giloz and Sefofo how we did — rate your meal and send feedback straight to the kitchen.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  return (
    <Container className="py-16 sm:py-24">
      <Reveal>
        <p className="label text-brand">We're listening</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-7xl">Share your feedback</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Loved it, or think we can do better? Rate your meal and tell the kitchen directly — it
          goes straight to their WhatsApp so the team actually sees it.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {BRAND_KEYS.map((k, i) => {
          const b = BRANDS[k];
          return (
            <Reveal key={k} delay={i * 0.1}>
              <section
                id={k}
                data-brand={k}
                className="scroll-mt-24 rounded-3xl border border-line bg-paper p-7 text-ink"
              >
                <div className="flex items-center gap-3">
                  <BrandLogo brand={k} size={52} className="border border-line" />
                  <div>
                    <h2 className="font-serif text-2xl leading-tight">{b.name}</h2>
                    <p className="label text-muted">{b.tagline}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <FeedbackForm brand={k} />
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
