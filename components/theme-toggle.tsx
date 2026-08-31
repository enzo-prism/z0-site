"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const theme = mounted ? resolvedTheme : undefined;
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={
        theme
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      className="inline-flex size-11 items-center justify-center rounded-sm border border-border bg-transparent font-mono text-[11px] tracking-[0.08em] text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-40"
      disabled={!theme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {theme ? (isDark ? "D" : "L") : "·"}
    </button>
  );
}
