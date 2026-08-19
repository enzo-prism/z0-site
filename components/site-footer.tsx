import Link from "next/link";
import { CircleHelpIcon, DownloadIcon, ListChecksIcon, ShieldIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="safe-px mx-auto flex min-h-14 max-w-5xl items-center justify-between">
        <PixelWordmark pixel={2} className="[--cell:2px]" />
        <nav className="flex items-center gap-0.5">
          <Link
            href="/install"
            aria-label="Install Z0"
            className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <ListChecksIcon aria-hidden="true" className="size-3.5" />
          </Link>
          <Link
            href="/help"
            aria-label="Z0 help"
            className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <CircleHelpIcon aria-hidden="true" className="size-3.5" />
          </Link>
          <Link
            href="/privacy"
            aria-label="Privacy"
            className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <ShieldIcon aria-hidden="true" className="size-3.5" />
          </Link>
          <a
            href={site.download.href}
            download={site.download.filename}
            aria-label={`Download Z0 ${site.version} for ${site.download.platform}`}
            className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <DownloadIcon aria-hidden="true" className="size-3.5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
