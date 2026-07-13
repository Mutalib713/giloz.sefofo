import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Container className="py-10 sm:py-14">
      <CheckoutClient />
    </Container>
  );
}
