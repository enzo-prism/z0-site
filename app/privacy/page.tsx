import type { Metadata } from "next";

import { PixelWordmark } from "@/components/pixel";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Z0 runs locally on your Mac. No accounts. No telemetry.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16">
      <PixelWordmark pixel={5} className="[--cell:5px]" />
      <h1 className="text-3xl font-semibold tracking-tight text-balance">Privacy</h1>
      <div className="flex flex-col gap-4 text-sm leading-7 text-pretty text-muted-foreground">
        <p>
          Z0 is a local macOS companion. It does not create an account, does
          not phone home, and does not upload worlds, logs, or diagnostics.
        </p>
        <p>
          Overlay backups and redacted diagnostic files stay on this Mac under{" "}
          <code className="break-all font-mono text-foreground">
            ~/Library/Application Support/z0
          </code>
          . Paths and tokens are scrubbed before a diagnostic summary is
          written.
        </p>
        <p>
          Minecraft login is handled by official Technic. Z0 never constructs a
          launch command and never receives your Microsoft credentials.
        </p>
        <p>
          This website is a static product page. It does not set analytics
          cookies. The download is a zip of Z0.app served from the same host.
        </p>
      </div>
    </main>
  );
}
