import type { Metadata } from "next";
import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Independent launcher",
  description:
    "How Z0 plans to authenticate, verify ownership, and launch Minecraft: Java Edition directly on macOS.",
};

export default function LauncherPage() {
  return (
    <main
      id="main-content"
      className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-9 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16"
    >
      <PixelWordmark pixel={5} className="[--cell:5px]" />

      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Independent · native · macOS
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Direct launch, without another launcher
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Z0 is building an independent native macOS launcher. A player will
          select a compatible modpack and start Minecraft: Java Edition
          directly from Z0.
        </p>
      </header>

      <section aria-labelledby="microsoft-access-title" className="space-y-3">
        <h2 id="microsoft-access-title" className="text-lg font-semibold">
          Microsoft access
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Z0 will use Microsoft&apos;s system-browser sign-in and OAuth 2.0
          Authorization Code with PKCE as a public native client, with no
          client secret. It will use Minecraft Services only to authenticate
          the player, verify ownership of Minecraft: Java Edition, and retrieve
          the profile required to launch.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Z0 never asks for or sees the player&apos;s Microsoft password. It
          never bypasses authentication, ownership, license, parental, or
          safety checks. If ownership cannot be verified, Z0 does not launch.
        </p>
      </section>

      <section aria-labelledby="downloads-title" className="space-y-3">
        <h2 id="downloads-title" className="text-lg font-semibold">
          Game files
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Minecraft files will come from Mojang or Microsoft services after a
          successful entitlement check. Z0 does not redistribute Minecraft.
          Third-party modpack files remain subject to their own licenses and
          distribution permissions.
        </p>
      </section>

      <section
        aria-labelledby="current-status-title"
        className="space-y-3 rounded-2xl border border-border bg-muted/30 p-5"
      >
        <p className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
          Current status
        </p>
        <h2 id="current-status-title" className="text-lg font-semibold">
          Approval gate is closed
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Direct launch remains disabled until Z0&apos;s AppID is approved. The
          currently downloadable Z0 {site.version} build {site.build} release
          still prepares Tekkit 2 and hands Play to official Technic.
        </p>
      </section>

      <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm" aria-label="Launcher policies">
        <Link className="release-link" href="/privacy">Privacy</Link>
        <Link className="release-link" href="/terms">Terms</Link>
        <Link className="release-link" href="/support">Support</Link>
        <Link className="release-link" href="/security">Security</Link>
      </nav>

      <p className="border-t border-border pt-6 font-mono text-[11px] leading-5 tracking-[0.04em] text-muted-foreground uppercase">
        Not an official Minecraft product. Not approved by or associated with
        Mojang or Microsoft. Z0 is not affiliated with Technic, Tekkit, or
        Forge.
      </p>
    </main>
  );
}
