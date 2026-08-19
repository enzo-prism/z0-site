import Image from "next/image";

import { AmbientStage } from "@/components/ambient-stage";
import { DownloadOrb } from "@/components/download-orb";
import { FlowRail } from "@/components/flow-rail";
import { PixelWordmark } from "@/components/pixel";
import { SignalGlyphs } from "@/components/signal-glyphs";
import { site } from "@/lib/site";

export function HomeView() {
  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-x-clip">
      <AmbientStage />
      <h1 className="sr-only">{site.name} — {site.tagline}</h1>
      <p className="sr-only">{site.description}</p>
      <section className="home-stage safe-px relative flex flex-1 flex-col items-center justify-center">
        <div className="logo-glow">
          <Image
            src="/brand/logo.png"
            alt=""
            width={72}
            height={72}
            priority
            className="size-14 rounded-[14px] border border-border [image-rendering:pixelated] sm:size-[72px] sm:rounded-[18px]"
          />
        </div>
        <PixelWordmark
          pixel={11}
          boot
          className="[--cell:8px] min-[400px]:[--cell:9px] sm:[--cell:11px]"
        />
        <FlowRail />
        <DownloadOrb />
        <SignalGlyphs />
      </section>
    </main>
  );
}
