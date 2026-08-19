import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="safe-px mx-auto flex max-w-5xl flex-col gap-4 py-5">
        <nav
          aria-label="Product and policies"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
        >
          <Link className="hover:text-foreground" href="/install">Install</Link>
          <Link className="hover:text-foreground" href="/help">Help</Link>
          <Link className="hover:text-foreground" href="/release-notes">Notes</Link>
          <Link className="hover:text-foreground" href="/privacy">Privacy</Link>
          <Link className="hover:text-foreground" href="/terms">Terms</Link>
          <Link className="hover:text-foreground" href="/support">Support</Link>
        </nav>
        <p className="max-w-3xl font-mono text-[10px] leading-4 tracking-[0.04em] text-muted-foreground uppercase">
          Not an official Minecraft product. Not approved by or associated
          with Mojang or Microsoft. Z0 is not affiliated with Technic, Tekkit,
          or Forge.
        </p>
      </div>
    </footer>
  );
}
