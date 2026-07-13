import { Container } from "@/components/layout/container";
import { MenuGridSkeleton } from "@/components/menu/menu-grid";
import { Skeleton } from "@/components/ui/skeleton";

export default function MenuLoading() {
  return (
    <Container className="py-10">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-10 w-64" />
      <div className="mt-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-8">
        <MenuGridSkeleton />
      </div>
    </Container>
  );
}
