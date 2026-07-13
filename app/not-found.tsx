import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="label text-brand">404</p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">This plate is empty</h1>
      <p className="mt-4 max-w-md text-muted">
        We couldn't find that page. But there's plenty on the menu — let's get you back to the good
        stuff.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/giloz/menu">Browse the menu</Link>
        </Button>
      </div>
    </Container>
  );
}
