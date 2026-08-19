import type { Metadata } from "next";

import { PixelWordmark } from "@/components/pixel";
import { PublicContact } from "@/components/public-contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Z0 handles local files, Microsoft sign-in, Minecraft entitlement data, and diagnostics.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16">
      <PixelWordmark pixel={5} className="[--cell:5px]" />
      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Effective August 19, 2026
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Privacy
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Z0 is independently published by Lorenzo Quaid Sison.
        </p>
      </header>

      <div className="flex flex-col gap-5 text-sm leading-7 text-pretty text-muted-foreground">
        <p>
          Z0 runs locally on your Mac. It does not operate a Z0 account
          service, use advertising or analytics trackers, sell personal data,
          or upload worlds, logs, or diagnostics to Z0 servers.
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
          The current Z0 {site.version} release hands Play to official Technic.
          It does not sign in to Microsoft or receive Microsoft or Minecraft
          tokens.
        </p>
        <p>
          When approved direct launch becomes available, Microsoft will host
          the sign-in page. Z0 will receive OAuth access and refresh tokens,
          Xbox and Minecraft service tokens, the Minecraft profile identifier
          and display name, and Minecraft: Java Edition entitlement status. Z0
          will never receive the Microsoft account password.
        </p>
        <p>
          Refresh credentials will be stored only in macOS Keychain.
          Short-lived access tokens will be kept only as needed to sign in and
          launch. This information will be used only to authenticate the
          player, verify game ownership, and start the selected game. If
          entitlement cannot be verified, Z0 will not launch.
        </p>
        <p>
          Signing out of Z0 will remove credentials stored by Z0. Local
          backups and diagnostics can be removed from Z0 or Finder. Microsoft,
          Xbox, Mojang, Technic, and modpack providers process requests under
          their own privacy terms when their services are used.
        </p>
        <p>
          This website is a static product page. It does not set analytics
          cookies. The download is a zip of Z0.app served from the same host.
        </p>
        <p>
          Privacy questions or deletion help: <PublicContact />
        </p>
      </div>
    </main>
  );
}
