"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    // This one-time render boundary keeps the server and hydration markup equal.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      aria-label={
        mounted && resolvedTheme
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className="inline-flex size-11 items-center justify-center rounded-sm border border-border bg-transparent font-mono text-[11px] tracking-[0.08em] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
      disabled={!mounted || !resolvedTheme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted && resolvedTheme ? (isDark ? "D" : "L") : "·"}
    </button>
  );
}
