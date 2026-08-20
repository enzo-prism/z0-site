import type { Metadata } from "next";
import Link from "next/link";

import { DocShell } from "@/components/doc-shell";
import { DownloadKey } from "@/components/download-orb";
import { requirements, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notes",
  description: `Z0 ${site.version}.`,
};

export default function ReleaseNotesPage() {
  return (
    <DocShell
      kicker={`Stage 1 · macOS · build ${site.build}`}
      title={`Z0 ${site.version}`}
      intro="Z0 prepares reversible settings and opens official Technic. You select Tekkit 2 and press Play there. Z0 0.1.2 does not launch Minecraft; independent direct launch remains disabled pending AppID approval."
    >
      <section aria-labelledby="included-title" className="doc-section">
        <h2 id="included-title" className="doc-h2">Included</h2>
        <ul className="space-y-2 text-[0.9375rem] leading-[1.67] text-muted-foreground">
          <li>Restore is now locked to the selected Tekkit 2 instance, including world backups.</li>
          <li>Tampered paths and symlink redirects fail closed before any restore write.</li>
          <li>Setup guidance now links directly to official Technic, Rosetta 2, and arm64 Zulu 8.</li>
          <li>Diagnostics can be revealed or copied, and launch receipts stay private on this Mac.</li>
          <li>A manual Check for Updates reads this verified release record only when you ask.</li>
        </ul>
      </section>

      <section aria-labelledby="boundary-title" className="doc-section">
        <h2 id="boundary-title" className="doc-h2">Stage 1 boundary</h2>
        <p className="doc-body">
          Z0 does not install Technic or Tekkit, download Minecraft, sign in to Microsoft, or launch the game. It prepares reversible settings and opens official Technic. You select Tekkit 2 and press Play there.
        </p>
      </section>

      <section aria-labelledby="requirements-title" className="doc-section">
        <h2 id="requirements-title" className="doc-h2">Requirements</h2>
        <ul className="space-y-2 text-[0.9375rem] leading-[1.67] text-muted-foreground">
          {requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="download-release-title" className="doc-section doc-rule">
        <div className="space-y-1">
          <h2 id="download-release-title" className="doc-h2">Download</h2>
          <p className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            {site.download.platform} · {site.download.size}
          </p>
        </div>
        <DownloadKey compact />
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

      <Link className="release-link inline-flex min-h-11 w-fit items-center text-sm" href="/">
        Back to Z0
      </Link>
    </DocShell>
  );
}
