import type { Metadata } from "next";
import Link from "next/link";

import { DocShell } from "@/components/doc-shell";
import { DownloadKey } from "@/components/download-orb";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install",
  description: "Put Z0 on this Mac.",
};

const steps = [
  {
    number: "01",
    title: "Put Z0 in Applications",
    body: "Download the ZIP, open it, and move Z0.app into your Applications folder. Open Z0 normally. The current release is signed and notarized by Apple.",
  },
  {
    number: "02",
    title: "Prepare official Technic",
    body: "Install the official Technic Launcher, sign in with your genuine Minecraft account, and install Tekkit 2 1.2.6. Z0 does not install the launcher, the pack, or Minecraft.",
  },
  {
    number: "03",
    title: "Check the two runtimes",
    body: "Technic needs arm64 Azul Zulu 8. Tekkit 2 itself uses Technic’s Intel Java 8 under Rosetta 2 because its LWJGL 2 native libraries are Intel-only.",
  },
  {
    number: "04",
    title: "Tune, then play in Technic",
    body: "Open Z0, let it inspect the certified pack, and apply Balanced. Z0 creates a backup, then opens Technic. Select Tekkit 2 and press Play there.",
  },
] as const;

export default function InstallPage() {
  return (
    <DocShell
      kicker="Four steps · Stage 1"
      title="Install Z0"
      intro="Z0 prepares Tekkit 2 for this Mac and hands play back to official Technic."
    >
      <ol className="space-y-8">
        {steps.map((step) => (
          <li key={step.number} className="grid grid-cols-[2.5rem_1fr] gap-3">
            <span className="pt-1 font-mono text-[11px] tracking-[0.08em] text-muted-foreground" aria-hidden="true">
              {step.number}
            </span>
            <div className="space-y-1.5">
              <h2 className="doc-h2">{step.title}</h2>
              <p className="doc-body">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <nav aria-label="Required downloads" className="doc-rule flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <a className="release-link inline-flex min-h-11 items-center" href={site.technicUrl} rel="noreferrer">
          Official Technic
        </a>
        <a className="release-link inline-flex min-h-11 items-center" href={site.rosettaUrl} rel="noreferrer">
          Rosetta 2
        </a>
        <a className="release-link inline-flex min-h-11 items-center" href={site.zuluUrl} rel="noreferrer">
          Azul Zulu 8
        </a>
      </nav>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <DownloadKey compact />
        <Link className="release-link inline-flex min-h-11 items-center text-sm" href="/help">
          Get help
        </Link>
      </div>
    </DocShell>
  );
}
