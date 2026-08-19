import { cn } from "@/lib/utils";

const glyphs = [
  { ch: "z", x: "7%", y: "14%", duration: "19s", delay: "0s" },
  { ch: "0", x: "91%", y: "18%", duration: "23s", delay: "1.2s" },
  { ch: "░", x: "14%", y: "78%", duration: "27s", delay: "0.4s" },
  { ch: "▒", x: "86%", y: "72%", duration: "21s", delay: "2s" },
  { ch: "/", x: "48%", y: "8%", duration: "25s", delay: "0.8s" },
  { ch: "0", x: "4%", y: "46%", duration: "29s", delay: "1.6s" },
  { ch: "z", x: "94%", y: "48%", duration: "24s", delay: "0.2s" },
  { ch: "·", x: "28%", y: "22%", duration: "18s", delay: "2.4s" },
  { ch: "·", x: "72%", y: "84%", duration: "20s", delay: "0.6s" },
  { ch: "█", x: "62%", y: "12%", duration: "26s", delay: "1.8s" },
] as const;

export function AmbientStage({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div className="ambient-glow ambient-glow-a" />
      <div className="ambient-glow ambient-glow-b" />
      {glyphs.map((glyph) => (
        <span
          key={`${glyph.ch}-${glyph.x}-${glyph.y}`}
          className="glyph-drift font-mono text-foreground/18 dark:text-foreground/12"
          style={{
            left: glyph.x,
            top: glyph.y,
            animationDuration: glyph.duration,
            animationDelay: glyph.delay,
          }}
        >
          {glyph.ch}
        </span>
      ))}
    </div>
  );
}
