import Link from "next/link";

const links = [
  { href: "/install", label: "Install" },
  { href: "/help", label: "Help" },
  { href: "/release-notes", label: "Notes" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
  { href: "/security", label: "Security" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10 shrink-0 border-t border-border/60 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="safe-px mx-auto flex max-w-6xl flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
        <nav
          aria-label="Product and policies"
          className="grid w-full grid-cols-4 lg:flex lg:w-auto lg:flex-wrap"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              className="inline-flex min-h-11 items-center px-1 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase transition-colors hover:text-foreground sm:px-2 sm:tracking-[0.1em]"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="max-w-xl font-mono text-[10px] leading-4 tracking-[0.06em] text-muted-foreground uppercase lg:max-w-md lg:text-right">
          Not an official Minecraft product. Not approved by or associated
          with Mojang or Microsoft. Z0 is not affiliated with Technic, Tekkit,
          or Forge.
        </p>
      </div>
    </footer>
  );
}
