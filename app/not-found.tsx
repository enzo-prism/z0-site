import Link from "next/link";
import { HouseIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
      <PixelWordmark pixel={8} />
      <Button asChild size="icon" aria-label="Return home">
        <Link href="/">
          <HouseIcon />
        </Link>
      </Button>
    </main>
  );
}
