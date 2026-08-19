import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="safe-px mx-auto flex max-w-5xl flex-col gap-3 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PixelWordmark pixel={2} className="[--cell:2px]" />
          <nav
            aria-label="Product and policies"
            className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs text-muted-foreground"
          >
            <Link className="hover:text-foreground" href="/launcher">Launcher</Link>
            <Link className="hover:text-foreground" href="/privacy">Privacy</Link>
            <Link className="hover:text-foreground" href="/terms">Terms</Link>
            <Link className="hover:text-foreground" href="/support">Support</Link>
            <Link className="hover:text-foreground" href="/security">Security</Link>
          </nav>
        </div>
        <p className="max-w-3xl font-mono text-[10px] leading-4 tracking-[0.04em] text-muted-foreground uppercase">
          Not an official Minecraft product. Not approved by or associated
          with Mojang or Microsoft. Z0 is not affiliated with Technic, Tekkit,
          or Forge.
        </p>
      </div>
    </footer>
  );
}
