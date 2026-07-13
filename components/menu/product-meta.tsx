import { Flame, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getTag } from "@/lib/data/menu";
import { formatCedis } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm", className)}>
      <Star className="size-3.5 fill-brand text-brand" />
      <span className="tnum font-medium">{value.toFixed(1)}</span>
      {count != null && <span className="text-muted">({count})</span>}
    </span>
  );
}

export function Spice({ level, className }: { level: 0 | 1 | 2 | 3; className?: string }) {
  if (!level) return null;
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`Spice level ${level} of 3`}
    >
      {[1, 2, 3].map((i) => (
        <Flame key={i} className={cn("size-3.5", i <= level ? "text-brand" : "text-muted/25")} />
      ))}
    </span>
  );
}

export function PriceTag({ pesewas, className }: { pesewas: number; className?: string }) {
  return <span className={cn("tnum", className)}>{formatCedis(pesewas)}</span>;
}

export function TagBadges({ tags, className }: { tags: string[]; className?: string }) {
  const shown = tags.filter((t) => t !== "chefs-pick" && t !== "new");
  if (!shown.length) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((t) => (
        <Badge key={t} variant="outline" className="text-[0.68rem]">
          {getTag(t)?.label ?? t}
        </Badge>
      ))}
    </div>
  );
}
