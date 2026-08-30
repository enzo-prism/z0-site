import type { Metadata } from "next";
import Link from "next/link";

import { DocShell } from "@/components/doc-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Launcher",
  description: "A gated Stage 2 decision, not an enabled product.",
  alternates: { canonical: "/launcher" },
  robots: { index: false, follow: true },
};

export default function LauncherPage() {
  return (
    <DocShell
      kicker="Stage 2 · gated · not enabled"
      title="Direct launch remains conditional"
      intro="Z0 ships today as a native macOS companion for official Technic and Tekkit 2. One-click Play is an option only after platform access, provider rights, security review, and user evidence are all green."
    >
      <section aria-labelledby="provider-order-title" className="doc-section">
        <h2 id="provider-order-title" className="doc-h2">
          Provider order
        </h2>
        <ol className="space-y-2 text-[0.9375rem] leading-[1.67] text-muted-foreground">
          <li>1. Keep the current official-Technic handoff.</li>
          <li>2. Prefer a Technic-owned headless bridge if Technic gives written approval.</li>
          <li>3. Consider an independently reviewed direct provider only if every external gate passes.</li>
        </ol>
      </section>

      <section aria-labelledby="microsoft-access-title" className="doc-section">
        <h2 id="microsoft-access-title" className="doc-h2">
          Microsoft access
        </h2>
        <p className="doc-body">
          If an independent provider is approved, Z0 would use its own public
          native Microsoft registration, the system browser, and OAuth 2.0
          Authorization Code with PKCE. It would have no client secret and
          would use Minecraft Services only for player authentication,
          entitlement, and the profile required to launch.
        </p>
        <p className="doc-body">
          Z0 would never ask for or see the player&apos;s Microsoft password. It
          never bypasses authentication, ownership, license, parental, or
          safety checks. If ownership cannot be verified, Z0 does not launch.
        </p>
      </section>

      <section aria-labelledby="downloads-title" className="doc-section">
        <h2 id="downloads-title" className="doc-h2">
          Game files
        </h2>
        <p className="doc-body">
          Any independent provider would obtain Minecraft files from Mojang or
          Microsoft services only after a successful entitlement check. Z0
          does not redistribute Minecraft. Third-party files would remain
          disabled until every artifact has an approved source, digest,
          license, and distribution basis.
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
          Z0&apos;s Minecraft Services registration is not approved, Technic has
          not authorized a bridge, artifact rights are incomplete, and the
          named Stage 2 security review has not passed. The downloadable Z0 {" "}
          {site.version} build {site.build} therefore prepares Tekkit 2 and
          hands Play to official Technic.
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
