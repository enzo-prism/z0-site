import { site } from "@/lib/site";

export function DownloadOrb() {
  return (
    <section
      id="download"
      tabIndex={-1}
      aria-labelledby="download-title"
      className="mt-14 flex w-full max-w-sm scroll-mt-20 flex-col items-start gap-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:mt-16"
    >
      <a
        href={site.download.href}
        download={site.download.filename}
        aria-describedby="download-meta download-handoff"
        className="flex min-h-14 w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-primary-foreground outline-none transition-opacity hover:opacity-88 focus-visible:ring-3 focus-visible:ring-ring/60 active:opacity-75"
      >
        <span id="download-title" className="text-base font-semibold tracking-tight">
          Download Z0
        </span>
      </a>

      <p id="download-meta" className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
        {site.version} · {site.download.platform}
      </p>
      <p id="download-handoff" className="text-xs leading-5 text-muted-foreground">
        Opens Technic. You press Play.
      </p>
    </section>
  );
}
