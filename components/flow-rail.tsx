"use client";

import {
  AppWindowIcon,
  LaptopIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

const steps = [
  { icon: LaptopIcon, label: "Mac" },
  { icon: ScanSearchIcon, label: "Scan" },
  { icon: ShieldCheckIcon, label: "Save" },
  { icon: SlidersHorizontalIcon, label: "Tune" },
  { icon: AppWindowIcon, label: "Open" },
] as const;

function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function FlowRail() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) {
      return;
    }
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 1500);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <ol className="relative mx-auto flex w-full max-w-[min(20rem,100%)] items-start justify-between px-0.5 pb-7 sm:max-w-xl sm:px-0 sm:pb-6">
      <span className="flow-line absolute top-[22px] right-6 left-6 h-px sm:top-[22px] sm:right-8 sm:left-8" />
      {steps.map((step, index) => {
        const Icon = step.icon;
        const on = reduce || index === active;
        return (
          <li
            key={step.label}
            className="relative z-10 flex w-11 shrink-0 flex-col items-center sm:w-14"
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-2xl border transition-all duration-500",
                on
                  ? "scale-105 border-foreground/20 bg-foreground text-background shadow-[0_0_24px_color-mix(in_oklch,var(--foreground)_22%,transparent)] sm:scale-110"
                  : "border-border bg-background/80 text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span
              className={cn(
                "pointer-events-none absolute top-[calc(100%+0.4rem)] max-w-[4.75rem] truncate text-center font-mono text-[10px] tracking-[0.12em] whitespace-nowrap uppercase transition-opacity duration-500 sm:tracking-[0.18em]",
                on ? "text-foreground opacity-100" : "opacity-0",
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
