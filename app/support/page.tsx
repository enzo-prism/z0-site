import type { Metadata } from "next";
import Link from "next/link";

import { DocShell } from "@/components/doc-shell";
import { PublicContact } from "@/components/public-contact";

export const metadata: Metadata = {
  title: "Support",
  description: "Direct product and account support for Z0.",
};

export default function SupportPage() {
  return (
    <DocShell
      kicker="Direct · private · human"
      title="Z0 support"
      intro="Z0 is independently published by Lorenzo Quaid Sison."
    >
      <section aria-labelledby="contact-title" className="doc-section">
        <h2 id="contact-title" className="doc-h2">Contact</h2>
        <p className="doc-body">
          Email: <PublicContact />
        </p>
        <p className="doc-body">
          Include the Z0 version, macOS version, and the smallest redacted
          diagnostic needed. Never send a password, OAuth token, account token,
          private world, or full unreviewed log.
        </p>
      </section>

      <section aria-labelledby="security-help-title" className="doc-section doc-rule">
        <h2 id="security-help-title" className="doc-h2">
          Security issue
        </h2>
        <p className="doc-body">
          Do not post a vulnerability or credential in a public issue. Read the
          private reporting guidance first.
        </p>
        <Link className="release-link inline-flex min-h-11 items-center text-sm" href="/security">
          Security policy
        </Link>
      </section>
    </DocShell>
  );
}
