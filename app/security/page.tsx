import type { Metadata } from "next";

import { PixelWordmark } from "@/components/pixel";
import { PublicContact } from "@/components/public-contact";

export const metadata: Metadata = {
  title: "Security",
  description: "Security policy and private vulnerability reporting for Z0.",
};

export default function SecurityPage() {
  return (
    <main
      id="main-content"
      className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16"
    >
      <PixelWordmark pixel={5} className="[--cell:5px]" />
      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Private reporting
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Security
        </h1>
      </header>

      <div className="flex flex-col gap-5 text-sm leading-7 text-pretty text-muted-foreground">
        <p>
          Report a suspected vulnerability privately to <PublicContact />.
          Include the affected Z0 version, impact, and minimal reproduction
          steps.
        </p>
        <p>
          Do not send passwords, OAuth tokens, Minecraft account tokens,
          private worlds, or unrelated personal data. Do not publish an
          undisclosed vulnerability in a public issue.
        </p>
        <p>
          Good-faith research that avoids privacy violations, data destruction,
          service disruption, and access beyond what is needed to demonstrate
          the issue is welcome. Z0 will acknowledge a valid report and
          coordinate remediation and disclosure.
        </p>
      </div>
    </main>
  );
}

