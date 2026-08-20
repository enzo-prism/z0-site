import type { Metadata } from "next";

import { DocShell } from "@/components/doc-shell";
import { PublicContact } from "@/components/public-contact";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Runs locally.",
};

export default function PrivacyPage() {
  return (
    <DocShell
      kicker="Effective August 19, 2026"
      title="Privacy"
      intro="Z0 is independently published by Lorenzo Quaid Sison."
    >
      <div className="flex flex-col gap-5 text-pretty">
        <p className="doc-body">
          Z0 runs locally on your Mac. It does not operate a Z0 account
          service, use advertising trackers, sell personal data, or upload
          worlds, logs, or diagnostics to Z0 servers.
        </p>
        <p className="doc-body">
          Overlay backups and redacted diagnostic files stay on this Mac under{" "}
          <code className="break-all font-mono text-[0.8125rem] text-foreground">
            ~/Library/Application Support/z0
          </code>
          . Paths and tokens are scrubbed before a diagnostic summary is
          written.
        </p>
        <p className="doc-body">
          The current Z0 {site.version} release hands Play to official Technic.
          It does not sign in to Microsoft or receive Microsoft or Minecraft
          tokens.
        </p>
        <p className="doc-body">
          When approved direct launch becomes available, Microsoft will host
          the sign-in page. Z0 will receive OAuth access and refresh tokens,
          Xbox and Minecraft service tokens, the Minecraft profile identifier
          and display name, and Minecraft: Java Edition entitlement status. Z0
          will never receive the Microsoft account password.
        </p>
        <p className="doc-body">
          Refresh credentials will be stored only in macOS Keychain.
          Short-lived access tokens will be kept only as needed to sign in and
          launch. This information will be used only to authenticate the
          player, verify game ownership, and start the selected game. If
          entitlement cannot be verified, Z0 will not launch.
        </p>
        <p className="doc-body">
          Signing out of Z0 will remove credentials stored by Z0. Local
          backups and diagnostics can be removed from Z0 or Finder. Microsoft,
          Xbox, Mojang, Technic, and modpack providers process requests under
          their own privacy terms when their services are used.
        </p>
        <p className="doc-body">
          This website is a static product page. It uses Vercel Web Analytics
          and Speed Insights for aggregated page views, download events, and
          Core Web Vitals. Those products do not set cookies, do not use
          advertising identifiers, and do not receive worlds, logs, or account
          data. The download is a zip of Z0.app served from the same host.
        </p>
        <p className="doc-body">
          Privacy questions or deletion help: <PublicContact />
        </p>
      </div>
    </DocShell>
  );
}
