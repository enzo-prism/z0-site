import { ArrowUpRightIcon, DownloadIcon } from "lucide-react";

import { site } from "@/lib/site";

export function DownloadOrb() {
  return (
    <div id="download" className="relative">
      <a
        href={site.download.href}
        download={site.download.filename}
        aria-label={`Download Z0 for Mac, ${site.download.size}`}
        className="download-orb relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:size-[4.75rem]"
      >
        <span className="orb-ring" />
        <span className="orb-ring orb-ring-delayed" />
        <DownloadIcon className="relative size-6 sm:size-7" />
      </a>
      <a
        href={site.technicUrl}
        rel="noreferrer"
        aria-label="Get official Technic"
        title="Technic"
        className="absolute -right-3 -bottom-3 flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="flex size-8 items-center justify-center rounded-full border border-border bg-background">
          <ArrowUpRightIcon className="size-3.5" />
        </span>
      </a>
    </div>
  );
}
