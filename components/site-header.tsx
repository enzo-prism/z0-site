import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Z0 home">
          <Image
            src="/brand/logo.png"
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-md border border-border [image-rendering:pixelated]"
            priority
          />
          <PixelWordmark pixel={3} />
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Button asChild size="icon" aria-label="Download Z0 for Mac">
            <a href={site.download.href} download={site.download.filename}>
              <DownloadIcon />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
