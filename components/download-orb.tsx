import { ArrowUpRightIcon, DownloadIcon } from "lucide-react";

import { site } from "@/lib/site";

export function DownloadOrb() {
  return (
    <div id="download" className="relative">
      <a
        href={site.download.href}
        download={site.download.filename}
        aria-label={`Download Z0 for Mac, ${site.download.size}`}
        className="download-orb relative flex size-[4.75rem] items-center justify-center rounded-full bg-primary text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="orb-ring" />
        <span className="orb-ring orb-ring-delayed" />
        <DownloadIcon className="relative size-7" />
      </a>
      <a
        href={site.technicUrl}
        rel="noreferrer"
        aria-label="Get official Technic"
        title="Technic"
        className="absolute -right-1 -bottom-1 flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowUpRightIcon className="size-3.5" />
      </a>
    </div>
  );
}
