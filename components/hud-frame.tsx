import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function HudFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("hud-frame px-6 py-8 sm:px-9 sm:py-10", className)}>
      <span className="hud-corner hud-corner-tl" aria-hidden />
      <span className="hud-corner hud-corner-tr" aria-hidden />
      <span className="hud-corner hud-corner-bl" aria-hidden />
      <span className="hud-corner hud-corner-br" aria-hidden />
      {children}
    </div>
  );
}
