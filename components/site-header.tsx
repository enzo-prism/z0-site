import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
      <div className="safe-px mx-auto flex h-14 max-w-5xl items-center">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center gap-2.5"
          aria-label="Z0 home"
        >
          <Image
            src="/brand/logo.png"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-md border border-border [image-rendering:pixelated]"
            priority
          />
          <PixelWordmark pixel={3} className="[--cell:3px]" />
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Button
            asChild
            size="icon"
            className="size-11"
          >
            <a
              href={site.download.href}
              download={site.download.filename}
              aria-label={`Download Z0 ${site.version} for ${site.download.platform}`}
            >
              <DownloadIcon aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
