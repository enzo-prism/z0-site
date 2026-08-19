import {
  AppWindowIcon,
  CpuIcon,
  PackageIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  StethoscopeIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { features } from "@/lib/site";

const icons = {
  cpu: CpuIcon,
  package: PackageIcon,
  shield: ShieldCheckIcon,
  sliders: SlidersHorizontalIcon,
  app: AppWindowIcon,
  stethoscope: StethoscopeIcon,
};

export function IconWell({
  name,
  emphasized = false,
  className,
}: {
  name: (typeof features)[number]["icon"];
  emphasized?: boolean;
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <span
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-lg border",
        emphasized
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-muted/60 text-foreground",
        className,
      )}
      aria-hidden
    >
      <Icon className="size-3.5" />
    </span>
  );
}
