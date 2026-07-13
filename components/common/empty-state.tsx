import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: LucideIcon;
}

export function EmptyState({ title, description, actionHref, actionLabel, icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-16 text-center">
      {Icon && (
        <span className="grid size-14 place-items-center rounded-full border border-line text-brand">
          <Icon className="size-6" />
        </span>
      )}
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="max-w-sm text-muted">{description}</p>
      {actionHref && actionLabel && (
        <Button asChild variant="secondary">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
