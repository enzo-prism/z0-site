import Link from "next/link";
import { ArrowUpRightIcon, DownloadIcon, FileTextIcon, ShieldIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="safe-px mx-auto flex min-h-14 max-w-5xl items-center justify-between">
        <PixelWordmark pixel={2} className="[--cell:2px]" />
        <nav className="flex items-center gap-0.5">
          <Link
            href="/privacy"
            aria-label="Privacy"
            className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <ShieldIcon className="size-3.5" />
          </Link>
          <Link
            href="/release-notes"
            aria-label={`Release notes for Z0 ${site.version}`}
            className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <FileTextIcon aria-hidden="true" className="size-3.5" />
          </Link>
          <a
            href={site.technicUrl}
            rel="noreferrer"
            aria-label="Official Technic"
            className="flex size-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground"
          >
            <ArrowUpRightIcon className="size-3.5" />
          </a>
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
