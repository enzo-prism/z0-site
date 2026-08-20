import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function DocShell({
  kicker,
  title,
  intro,
  children,
  className,
}: {
  kicker: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <main id="main-content" className={cn("doc-shell safe-px", className)}>
      <header className="space-y-3">
        <p className="doc-kicker">{kicker}</p>
        <h1 className="doc-title">{title}</h1>
        {intro ? <div className="doc-lede max-w-xl">{intro}</div> : null}
      </header>
      {children}
    </main>
  );
}
