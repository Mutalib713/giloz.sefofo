"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { OrderTracker } from "@/components/orders/order-tracker";

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  return (
    <Container className="py-12 sm:py-16">
      <OrderTracker id={params.id} />
    </Container>
  );
}
