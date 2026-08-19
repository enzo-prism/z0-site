import type { Metadata } from "next";
import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help",
  description: "Short setup and diagnostic help for Z0, official Technic, and Tekkit 2.",
};

export default function HelpPage() {
  return (
    <main id="main-content" className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-9 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16">
      <PixelWordmark pixel={5} className="[--cell:5px]" />

      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Local · reversible · redacted
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Help</h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Start with the small checks below. Z0 never receives your Microsoft credentials, worlds, logs, or diagnostics.
        </p>
      </header>

      <section aria-labelledby="not-found-title" className="space-y-3">
        <h2 id="not-found-title" className="text-lg font-semibold">Tekkit 2 not found</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Open official Technic and install Tekkit 2 1.2.6 first. If it is already installed somewhere else, use Z0’s folder chooser and select the Tekkit 2 instance that contains <code className="font-mono text-foreground">bin/</code> and <code className="font-mono text-foreground">options.txt</code>.
        </p>
      </section>

      <section aria-labelledby="runtime-title" className="space-y-3">
        <h2 id="runtime-title" className="text-lg font-semibold">Java or Rosetta warning</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Install arm64 Azul Zulu 8 for the Technic launcher and Apple’s Rosetta 2 for Tekkit 2’s Intel-only LWJGL 2 libraries. Z0 checks both before it opens Technic.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <a className="release-link" href={site.zuluUrl} rel="noreferrer">Azul Zulu 8</a>
          <a className="release-link" href={site.rosettaUrl} rel="noreferrer">Rosetta 2</a>
        </div>
      </section>

      <section aria-labelledby="play-title" className="space-y-3">
        <h2 id="play-title" className="text-lg font-semibold">Where Play happens</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Z0 0.1.2 does not launch Minecraft or build a game command. It makes a verified backup, applies the reversible Balanced overlay, and opens official Technic. Select Tekkit 2 and press Play in Technic. Independent direct launch remains disabled pending AppID approval.
        </p>
      </section>

      <section aria-labelledby="diagnostic-title" className="space-y-3 border-t border-border pt-6">
        <h2 id="diagnostic-title" className="text-lg font-semibold">Share only a redacted summary</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Run Diagnostics in Z0’s Tools panel. The summary stays on your Mac. Open and review it before sharing. Never attach a world, full launcher log, crash folder, account token, email address, server address, or unreviewed screenshot to a public issue.
        </p>
        <Link className="release-link inline-flex min-h-11 items-center text-sm" href="/support">
          Contact Z0 support
        </Link>
      </section>

      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <Link className="release-link" href="/install">Install steps</Link>
        <Link className="release-link" href="/release-notes">Release notes</Link>
        <Link className="release-link" href="/privacy">Privacy</Link>
      </div>
    </main>
  );
}
