import Link from "next/link";
import { ArrowUpRightIcon, DownloadIcon, ShieldIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <PixelWordmark pixel={2} />
        <nav className="flex items-center gap-1">
          <Link
            href="/privacy"
            aria-label="Privacy"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <ShieldIcon className="size-3.5" />
          </Link>
          <a
            href={site.technicUrl}
            rel="noreferrer"
            aria-label="Official Technic"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <ArrowUpRightIcon className="size-3.5" />
          </a>
          <a
            href={site.download.href}
            download={site.download.filename}
            aria-label="Download Z0"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <DownloadIcon className="size-3.5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
