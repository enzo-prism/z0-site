import type { Metadata } from "next";
import Link from "next/link";

import { DocShell } from "@/components/doc-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Launcher",
  description: "Not enabled.",
};

export default function LauncherPage() {
  return (
    <DocShell
      kicker="Independent · native · macOS"
      title="Direct launch, without another launcher"
      intro="Z0 is building an independent native macOS launcher. A player will select a compatible modpack and start Minecraft: Java Edition directly from Z0."
    >
      <section aria-labelledby="microsoft-access-title" className="doc-section">
        <h2 id="microsoft-access-title" className="doc-h2">
          Microsoft access
        </h2>
        <p className="doc-body">
          Z0 will use Microsoft&apos;s system-browser sign-in and OAuth 2.0
          Authorization Code with PKCE as a public native client, with no
          client secret. It will use Minecraft Services only to authenticate
          the player, verify ownership of Minecraft: Java Edition, and retrieve
          the profile required to launch.
        </p>
        <p className="doc-body">
          Z0 never asks for or sees the player&apos;s Microsoft password. It
          never bypasses authentication, ownership, license, parental, or
          safety checks. If ownership cannot be verified, Z0 does not launch.
        </p>
      </section>

      <section aria-labelledby="downloads-title" className="doc-section">
        <h2 id="downloads-title" className="doc-h2">
          Game files
        </h2>
        <p className="doc-body">
          Minecraft files will come from Mojang or Microsoft services after a
          successful entitlement check. Z0 does not redistribute Minecraft.
          Third-party modpack files remain subject to their own licenses and
          distribution permissions.
        </p>
      </section>

      <section
        aria-labelledby="current-status-title"
        className="doc-section doc-rule"
      >
        <p className="doc-kicker">Current status</p>
        <h2 id="current-status-title" className="doc-h2">
          Approval gate is closed
        </h2>
        <p className="doc-body">
          Direct launch remains disabled until Z0&apos;s AppID is approved. The
          currently downloadable Z0 {site.version} build {site.build} release
          still prepares Tekkit 2 and hands Play to official Technic.
        </p>
      </section>

      <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm" aria-label="Launcher policies">
        <Link className="release-link inline-flex min-h-11 items-center" href="/privacy">Privacy</Link>
        <Link className="release-link inline-flex min-h-11 items-center" href="/terms">Terms</Link>
        <Link className="release-link inline-flex min-h-11 items-center" href="/support">Support</Link>
        <Link className="release-link inline-flex min-h-11 items-center" href="/security">Security</Link>
      </nav>

      <p className="doc-rule font-mono text-[11px] leading-5 tracking-[0.04em] text-muted-foreground uppercase">
        Not an official Minecraft product. Not approved by or associated with
        Mojang or Microsoft. Z0 is not affiliated with Technic, Tekkit, or
        Forge.
      </p>
    </DocShell>
  );
}
