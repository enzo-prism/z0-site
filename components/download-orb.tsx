"use client";

import { track } from "@vercel/analytics";

import { AppleMark } from "@/components/apple-mark";
import { PixelChevron } from "@/components/pixel";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function DownloadKey({
  compact = false,
  className,
  titleId,
}: {
  compact?: boolean;
  className?: string;
  titleId?: string;
}) {
  return (
    <a
      href={site.download.href}
      download={site.download.filename}
      className={cn("download-key", compact && "download-key-compact", className)}
      aria-describedby={titleId ? "download-meta download-handoff" : undefined}
      onClick={() => {
        track("Download", { version: site.version });
      }}
    >
      <span className="flex items-center gap-2.5">
        <AppleMark />
        <span id={titleId}>Download</span>
      </span>
      <PixelChevron />
    </a>
  );
}

export function DownloadOrb() {
  return (
    <section
      id="download"
      tabIndex={-1}
      aria-labelledby="download-title"
      className="mt-10 flex w-full flex-col items-stretch gap-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:mt-12"
    >
      <div className="stage-enter" style={{ animationDelay: "720ms" }}>
        <DownloadKey titleId="download-title" />
      </div>
      <p
        id="download-meta"
        className="stage-enter-meta font-mono text-[10px] leading-4 tracking-[0.12em] text-muted-foreground uppercase"
        style={{ animationDelay: "820ms" }}
      >
        {site.version} · {site.download.platform} · {site.download.size}
      </p>
      <p
        id="download-handoff"
        className="stage-enter-meta text-xs leading-[1.5] text-muted-foreground"
        style={{ animationDelay: "880ms" }}
      >
        Opens Technic. You press Play.
      </p>
    </section>
  );
}
