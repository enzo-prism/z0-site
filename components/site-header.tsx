import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
      <div className="safe-px mx-auto flex h-14 max-w-5xl items-center">
        <Link
          href="/"
          className="flex min-h-11 min-w-11 items-center"
          aria-label="Z0 home"
        >
          <PixelWordmark pixel={3} className="[--cell:3px]" />
        </Link>
        <div className="ml-auto shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
