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
    <ol className="relative mx-auto flex w-full max-w-[20rem] items-start justify-between pb-6 sm:max-w-xl">
      <span className="flow-line absolute top-[18px] right-5 left-5 h-px sm:top-[22px] sm:right-8 sm:left-8" />
      {steps.map((step, index) => {
        const Icon = step.icon;
        const on = reduce || index === active;
        return (
          <li
            key={step.label}
            className="relative z-10 flex w-10 shrink-0 flex-col items-center sm:w-14"
          >
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-2xl border transition-all duration-500 sm:size-11",
                on
                  ? "scale-110 border-foreground/20 bg-foreground text-background shadow-[0_0_24px_color-mix(in_oklch,var(--foreground)_22%,transparent)]"
                  : "border-border bg-background/80 text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span
              className={cn(
                "pointer-events-none absolute top-[calc(100%+0.45rem)] font-mono text-[10px] tracking-[0.18em] whitespace-nowrap uppercase transition-opacity duration-500",
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
