import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex flex-1 flex-col items-start justify-center gap-6 px-4 py-24 sm:px-6">
      <PixelWordmark pixel={6} />
      <p className="font-mono text-sm text-muted-foreground">404 · path not found</p>
      <h1 className="text-3xl font-semibold tracking-tight">This route is uncertified.</h1>
      <Button asChild>
        <Link href="/">Return to Z0</Link>
      </Button>
      <p className="font-mono text-xs text-muted-foreground">
        $ z0ctl inspect --instance {site.name.toLowerCase()}
      </p>
    </main>
  );
}
