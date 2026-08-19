import Image from "next/image";

import { AmbientStage } from "@/components/ambient-stage";
import { DownloadOrb } from "@/components/download-orb";
import { FlowRail } from "@/components/flow-rail";
import { PixelWordmark } from "@/components/pixel";
import { SignalGlyphs } from "@/components/signal-glyphs";
import { site } from "@/lib/site";

export function HomeView() {
  return (
    <main className="relative flex flex-1 flex-col">
      <AmbientStage />
      <h1 className="sr-only">{site.name} — {site.tagline}</h1>
      <p className="sr-only">{site.description}</p>
      <section className="relative flex flex-1 flex-col items-center justify-center gap-10 px-4 py-12 pb-16 sm:gap-12 sm:px-6">
        <div className="logo-glow">
          <Image
            src="/brand/logo.png"
            alt=""
            width={72}
            height={72}
            priority
            className="size-[72px] rounded-[18px] border border-border [image-rendering:pixelated]"
          />
        </div>
        <PixelWordmark pixel={11} boot className="origin-center max-sm:scale-[0.78]" />
        <FlowRail />
        <DownloadOrb />
        <SignalGlyphs />
      </section>
    </main>
  );
}
