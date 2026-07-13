import { Hero } from "@/components/home/hero";
import { DishMarquee } from "@/components/home/dish-marquee";
import { BrandChooser } from "@/components/home/brand-chooser";
import { SignatureDishes } from "@/components/home/signature-dishes";
import { StorySplit } from "@/components/home/story-split";
import { NaturiaStrip } from "@/components/home/naturia-strip";
import { HowItWorks } from "@/components/home/how-it-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DishMarquee />
      <BrandChooser />
      <SignatureDishes />
      <StorySplit />
      <NaturiaStrip />
      <HowItWorks />
    </>
  );
}
