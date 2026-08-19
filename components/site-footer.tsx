import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="flex flex-col gap-3">
          <PixelWordmark pixel={3} />
          <p className="max-w-sm text-sm text-muted-foreground">
            Independent macOS companion. Not Minecraft. Not Tekkit. Not
            Technic.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground sm:items-end">
          <p>v{site.version} · {site.bundleId}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <a
              href={site.technicUrl}
              className="hover:text-foreground"
              rel="noreferrer"
            >
              Technic
            </a>
            <Link href="/#download" className="hover:text-foreground">
              Download
            </Link>
          </div>
          <p>© 2026 Z0. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
