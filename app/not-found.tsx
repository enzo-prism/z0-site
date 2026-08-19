import Link from "next/link";
import { HouseIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="safe-px flex flex-1 flex-col items-center justify-center gap-8 py-[max(2rem,env(safe-area-inset-bottom,0px))]">
      <PixelWordmark pixel={8} className="[--cell:8px]" />
      <Button asChild size="icon" aria-label="Return home" className="size-11">
        <Link href="/">
          <HouseIcon />
        </Link>
      </Button>
    </main>
  );
}
