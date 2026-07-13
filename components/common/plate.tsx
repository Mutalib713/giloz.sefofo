import { cn } from "@/lib/cn";

/**
 * Warm "plate" placeholder rendered from a dish's tone pair. Stands in for
 * food photography until Cloudinary imagery is wired — designed to look
 * intentional, not empty.
 */
export function Plate({
  tone,
  className,
  ring = true,
}: {
  tone: [string, string];
  className?: string;
  ring?: boolean;
}) {
  return (
    <div
      className={cn("relative grid place-items-center overflow-hidden", className)}
      style={{ background: `radial-gradient(120% 100% at 50% 12%, ${tone[0]}, ${tone[1]} 74%)` }}
      aria-hidden
    >
      <span
        className="aspect-square w-[60%] rounded-full"
        style={{
          background: `radial-gradient(circle at 42% 34%, rgba(255,255,255,0.30), transparent 46%), radial-gradient(circle at 52% 62%, ${tone[0]}, ${tone[1]})`,
          boxShadow: "inset 0 8px 30px rgba(0,0,0,0.38), 0 12px 30px -14px rgba(0,0,0,0.5)",
        }}
      >
        {ring && (
          <span className="absolute inset-[22%] rounded-full border border-dashed border-white/20" />
        )}
      </span>
    </div>
  );
}
