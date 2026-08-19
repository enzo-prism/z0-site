import { DownloadIcon } from "lucide-react";
import Link from "next/link";

import { requirements, site } from "@/lib/site";

export function DownloadOrb() {
  return (
    <section
      id="download"
      tabIndex={-1}
      aria-labelledby="download-title"
      className="download-panel flex w-full max-w-md scroll-mt-20 flex-col items-center gap-3 rounded-3xl border border-border/70 bg-background/72 px-4 py-4 text-center outline-none backdrop-blur-md focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-5"
    >
      <a
        href={site.download.href}
        download={site.download.filename}
        aria-describedby="download-meta download-handoff"
        className="download-control group relative flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-3 text-primary-foreground outline-none transition-transform focus-visible:ring-3 focus-visible:ring-ring/60 active:scale-[0.99]"
      >
        <span className="download-orb relative flex size-10 shrink-0 items-center justify-center rounded-full border border-primary-foreground/20">
          <span className="orb-ring" />
          <span className="orb-ring orb-ring-delayed" />
          <DownloadIcon aria-hidden="true" className="relative size-5" />
        </span>
        <span id="download-title" className="text-base font-semibold tracking-tight">
          {site.download.label}
        </span>
      </a>

      <p id="download-meta" className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
        v{site.version} · {site.download.platform} · {site.download.size}
      </p>
      <p id="download-handoff" className="text-sm leading-5 text-foreground">
        Opens official Technic. You press Play.
      </p>

      <nav
        aria-label="Download details"
        className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground"
      >
        <Link className="release-link" href="/install">
          Install
        </Link>
        <span aria-hidden="true">·</span>
        <Link className="release-link" href="/help">
          Help
        </Link>
        <span aria-hidden="true">·</span>
        <Link className="release-link" href="/release-notes">
          Release notes
        </Link>
      </nav>

      <details className="requirements w-full border-t border-border/60 pt-3 text-left">
        <summary className="mx-auto flex min-h-11 w-fit cursor-pointer items-center rounded-md px-2 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          Requirements
        </summary>
        <ul className="mx-auto max-w-sm space-y-1.5 pb-1 text-xs leading-5 text-muted-foreground">
          {requirements.map((requirement) => (
            <li key={requirement} className="flex gap-2">
              <span aria-hidden="true">—</span>
              <span>{requirement}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
