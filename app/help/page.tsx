import type { Metadata } from "next";
import Link from "next/link";

import { DocShell } from "@/components/doc-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help",
  description: "Short setup and diagnostic help for Z0, official Technic, and Tekkit 2.",
};

export default function HelpPage() {
  return (
    <DocShell
      kicker="Local · reversible · redacted"
      title="Help"
      intro="Start with the small checks below. Z0 never receives your Microsoft credentials, worlds, logs, or diagnostics."
    >
      <section aria-labelledby="not-found-title" className="doc-section">
        <h2 id="not-found-title" className="doc-h2">Tekkit 2 not found</h2>
        <p className="doc-body">
          Open official Technic and install Tekkit 2 1.2.6 first. If it is already installed somewhere else, use Z0’s folder chooser and select the Tekkit 2 instance that contains <code className="font-mono text-[0.8125rem] text-foreground">bin/</code> and <code className="font-mono text-[0.8125rem] text-foreground">options.txt</code>.
        </p>
      </section>

      <section aria-labelledby="runtime-title" className="doc-section">
        <h2 id="runtime-title" className="doc-h2">Java or Rosetta warning</h2>
        <p className="doc-body">
          Install arm64 Azul Zulu 8 for the Technic launcher and Apple’s Rosetta 2 for Tekkit 2’s Intel-only LWJGL 2 libraries. Z0 checks both before it opens Technic.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <a className="release-link inline-flex min-h-11 items-center" href={site.zuluUrl} rel="noreferrer">Azul Zulu 8</a>
          <a className="release-link inline-flex min-h-11 items-center" href={site.rosettaUrl} rel="noreferrer">Rosetta 2</a>
        </div>
      </section>

      <section aria-labelledby="play-title" className="doc-section">
        <h2 id="play-title" className="doc-h2">Where Play happens</h2>
        <p className="doc-body">
          Z0 0.1.2 does not launch Minecraft or build a game command. It makes a verified backup, applies the reversible Balanced overlay, and opens official Technic. Select Tekkit 2 and press Play in Technic. Independent direct launch remains disabled pending AppID approval.
        </p>
      </section>

      <section aria-labelledby="diagnostic-title" className="doc-section doc-rule">
        <h2 id="diagnostic-title" className="doc-h2">Share only a redacted summary</h2>
        <p className="doc-body">
          Run Diagnostics in Z0’s Tools panel. The summary stays on your Mac. Open and review it before sharing. Never attach a world, full launcher log, crash folder, account token, email address, server address, or unreviewed screenshot to a public issue.
        </p>
        <Link className="release-link inline-flex min-h-11 items-center text-sm" href="/support">
          Contact Z0 support
        </Link>
      </section>

      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <Link className="release-link inline-flex min-h-11 items-center" href="/install">Install steps</Link>
        <Link className="release-link inline-flex min-h-11 items-center" href="/release-notes">Release notes</Link>
        <Link className="release-link inline-flex min-h-11 items-center" href="/privacy">Privacy</Link>
      </div>
    </DocShell>
  );
}
