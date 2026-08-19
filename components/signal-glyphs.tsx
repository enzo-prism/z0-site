import {
  CircleOffIcon,
  PackageCheckIcon,
  StethoscopeIcon,
  Undo2Icon,
} from "lucide-react";

const glyphs = [
  { icon: PackageCheckIcon, label: "Certified Tekkit 2 1.2.6" },
  { icon: Undo2Icon, label: "Restore overlay" },
  { icon: StethoscopeIcon, label: "Redacted diagnostics" },
  { icon: CircleOffIcon, label: "Never launches Minecraft" },
] as const;

export function SignalGlyphs() {
  return (
    <ul className="flex items-center gap-3">
      {glyphs.map((glyph, index) => {
        const Icon = glyph.icon;
        return (
          <li key={glyph.label}>
            <span
              title={glyph.label}
              aria-label={glyph.label}
            className="signal-glyph flex size-10 items-center justify-center rounded-xl border border-border bg-background/70 text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground"
              style={{ animationDelay: `${index * 180}ms` }}
            >
              <Icon className="size-4" />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
