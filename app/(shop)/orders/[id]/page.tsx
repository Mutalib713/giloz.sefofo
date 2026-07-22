"use client";

import { useParams } from "next/navigation";
import { OrderTracker } from "@/components/orders/order-tracker";

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  return <OrderTracker id={params.id} />;
}
