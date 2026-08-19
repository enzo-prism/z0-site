import type { Metadata } from "next";
import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Install",
  description: "Install Z0 and prepare official Technic with Tekkit 2 on Apple Silicon Mac.",
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
    <main id="main-content" className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-9 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16">
      <PixelWordmark pixel={5} className="[--cell:5px]" />

      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Four steps · Stage 1
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Install Z0</h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Z0 prepares Tekkit 2 for this Mac and hands play back to official Technic.
        </p>
      </header>

      <ol className="space-y-7">
        {steps.map((step) => (
          <li key={step.number} className="grid grid-cols-[2rem_1fr] gap-3">
            <span className="pt-0.5 font-mono text-xs text-muted-foreground" aria-hidden="true">
              {step.number}
            </span>
            <div className="space-y-1.5">
              <h2 className="font-semibold">{step.title}</h2>
              <p className="text-sm leading-6 text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <nav aria-label="Required downloads" className="flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-6 text-sm">
        <a className="release-link" href={site.technicUrl} rel="noreferrer">
          Official Technic
        </a>
        <a className="release-link" href={site.rosettaUrl} rel="noreferrer">
          Rosetta 2
        </a>
        <a className="release-link" href={site.zuluUrl} rel="noreferrer">
          Azul Zulu 8
        </a>
      </nav>

      <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <a className="release-link" href={site.download.href} download={site.download.filename}>
          Download Z0 {site.version}
        </a>
        <Link className="release-link" href="/help">
          Get help
        </Link>
      </div>
    </main>
  );
}
