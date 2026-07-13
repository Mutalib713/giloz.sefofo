import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <p className="label text-brand">How it works</p>
          <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
            From craving to doorstep
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="flex flex-col gap-3 border-t border-line pt-6">
                <span className="tnum font-serif text-5xl text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl">{s.title}</h3>
                <p className="text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
