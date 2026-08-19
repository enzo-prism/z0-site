import { asciiLogo } from "@/lib/site";
import { cn } from "@/lib/utils";

const CELLS = Array.from({ length: 42 * 18 }, (_, index) => {
  const alphabet = "Z0░▒·/\\|";
  return alphabet[index % alphabet.length];
}).join("");

export function AsciiRain({ className }: { className?: string }) {
  const rows = CELLS.match(/.{1,42}/g) ?? [];
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className,
      )}
      aria-hidden
    >
      <pre className="ascii-rain font-mono text-[10px] leading-[14px] tracking-[0.4em] text-foreground/12 dark:text-foreground/10 sm:text-[11px]">
        {rows.join("\n")}
      </pre>
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/55 to-background" />
    </div>
  );
}

export function AsciiMark({ className }: { className?: string }) {
  return (
    <pre
      className={cn(
        "font-mono text-[10px] leading-[12px] text-foreground/80 sm:text-xs sm:leading-[14px]",
        className,
      )}
      aria-hidden
    >
      {asciiLogo}
    </pre>
  );
}
