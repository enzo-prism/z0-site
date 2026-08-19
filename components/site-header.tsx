import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";

import { PixelWordmark } from "@/components/pixel";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const links = [
  { href: "/#how", label: "How" },
  { href: "/#features", label: "Features" },
  { href: "/#download", label: "Download" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.png"
            alt="Z0"
            width={28}
            height={28}
            className="size-7 rounded-md border border-border [image-rendering:pixelated]"
            priority
          />
          <PixelWordmark pixel={3} />
        </Link>
        <nav className="ml-3 hidden items-center gap-4 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-wide text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm">
            <a href={site.download.href} download={site.download.filename}>
              <DownloadIcon data-icon="inline-start" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
