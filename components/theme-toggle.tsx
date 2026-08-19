"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="font-mono text-xs uppercase tracking-wider"
      aria-label={
        resolvedTheme
          ? isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
          : "Toggle theme"
      }
      disabled={!resolvedTheme}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {resolvedTheme ? (isDark ? "lt" : "dk") : "··"}
    </Button>
  );
}
