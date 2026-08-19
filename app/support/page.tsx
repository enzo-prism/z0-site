import type { Metadata } from "next";
import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { PublicContact } from "@/components/public-contact";

export const metadata: Metadata = {
  title: "Support",
  description: "Direct product and account support for Z0.",
};

export default function SupportPage() {
  return (
    <main
      id="main-content"
      className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16"
    >
      <PixelWordmark pixel={5} className="[--cell:5px]" />
      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Direct · private · human
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Z0 support
        </h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          Z0 is independently published by Lorenzo Quaid Sison.
        </p>
      </header>

      <section aria-labelledby="contact-title" className="space-y-3">
        <h2 id="contact-title" className="text-lg font-semibold">Contact</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Email: <PublicContact />
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Include the Z0 version, macOS version, and the smallest redacted
          diagnostic needed. Never send a password, OAuth token, account token,
          private world, or full unreviewed log.
        </p>
      </section>

      <section aria-labelledby="security-help-title" className="space-y-3 border-t border-border pt-6">
        <h2 id="security-help-title" className="text-lg font-semibold">
          Security issue
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Do not post a vulnerability or credential in a public issue. Read the
          private reporting guidance first.
        </p>
        <Link className="release-link text-sm" href="/security">
          Security policy
        </Link>
      </section>
    </main>
  );
}

