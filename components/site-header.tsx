"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PixelWordmark } from "@/components/pixel";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 pt-[env(safe-area-inset-top,0px)]",
        home
          ? "bg-transparent"
          : "border-b border-border/60 bg-background/80 backdrop-blur-md",
      )}
    >
      <div className="safe-px mx-auto flex h-12 max-w-6xl items-center">
        <Link
          href="/"
          className="flex min-h-11 min-w-11 items-center"
          aria-label="Z0 home"
        >
          <PixelWordmark pixel={4} className="[--cell:4px]" />
        </Link>
        <div className="ml-auto shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
