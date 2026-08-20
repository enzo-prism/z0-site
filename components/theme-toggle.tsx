"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        resolvedTheme
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className="inline-flex size-11 items-center justify-center rounded-sm border border-border bg-transparent font-mono text-[11px] tracking-[0.08em] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
      disabled={!resolvedTheme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {resolvedTheme ? (isDark ? "D" : "L") : "·"}
    </button>
  );
}
