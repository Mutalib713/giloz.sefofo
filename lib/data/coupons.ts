export interface CouponOk {
  ok: true;
  code: string;
  label: string;
  /** discount in pesewas applied to subtotal */
  discount: number;
  freeDelivery: boolean;
}
export interface CouponErr {
  ok: false;
  error: string;
}

/** Demo coupon engine. Real coupons validate against Supabase via an RPC. */
export function validateCoupon(input: string, subtotal: number): CouponOk | CouponErr {
  const code = input.trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a code" };

  switch (code) {
    case "WELCOME10":
      return { ok: true, code, label: "10% off", discount: Math.round(subtotal * 0.1), freeDelivery: false };
    case "FREEDEL":
      return { ok: true, code, label: "Free delivery", discount: 0, freeDelivery: true };
    case "EVE20":
      if (subtotal < 10000) return { ok: false, error: "Spend ₵100 or more to use EVE20" };
      return { ok: true, code, label: "₵20 off", discount: 2000, freeDelivery: false };
    default:
      return { ok: false, error: "That code isn't valid" };
  }
}

export const DEMO_COUPONS = ["WELCOME10", "FREEDEL", "EVE20"] as const;
