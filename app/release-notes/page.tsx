import type { Metadata } from "next";
import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { requirements, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Release notes ${site.version}`,
  description: `What is included in Z0 ${site.version} for Apple Silicon Mac.`,
};

export default function ReleaseNotesPage() {
  return (
    <main className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16">
      <PixelWordmark pixel={5} className="[--cell:5px]" />

      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Stage 1 · macOS
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Z0 {site.version}
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Z0 prepares reversible settings and opens official Technic. You select Tekkit 2 and press Play there. Z0 never launches Minecraft.
        </p>
      </header>

      <section aria-labelledby="included-title" className="space-y-3">
        <h2 id="included-title" className="text-lg font-semibold">Included</h2>
        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          <li>Detects this Mac and inspects certified Tekkit 2 1.2.6.</li>
          <li>Creates a verified backup before applying the reversible Balanced overlay.</li>
          <li>Opens official Technic and watches startup while you press Play.</li>
          <li>Keeps worlds separate from settings recovery and creates redacted local diagnostics.</li>
        </ul>
      </section>

      <section aria-labelledby="requirements-title" className="space-y-3">
        <h2 id="requirements-title" className="text-lg font-semibold">Requirements</h2>
        <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
          {requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="download-release-title" className="space-y-4 border-t border-border pt-6">
        <div className="space-y-1">
          <h2 id="download-release-title" className="text-lg font-semibold">Download</h2>
          <p className="font-mono text-xs text-muted-foreground">
            {site.download.platform} · {site.download.size}
          </p>
        </div>
        <a
          href={site.download.href}
          download={site.download.filename}
          className="inline-flex min-h-11 w-fit items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
        >
          {site.download.label}
        </a>
        <div className="space-y-2 text-xs leading-5 text-muted-foreground">
          <p>Developer ID signed, notarized, and stapled for macOS.</p>
          <p>
            SHA-256:{" "}
            <a className="release-link break-all font-mono" href={site.download.checksumHref}>
              {site.download.sha256}
            </a>
          </p>
        </div>
      </section>

      <p className="text-xs leading-5 text-muted-foreground">
        Z0 is an independent companion. It is not affiliated with, endorsed by, or approved by Mojang Studios, Microsoft, Technic, Forge, or the Tekkit team.
      </p>

      <Link className="release-link w-fit text-sm" href="/">
        Back to Z0
      </Link>
    </main>
  );
}
