import { DownloadOrb } from "@/components/download-orb";
import { HudFrame } from "@/components/hud-frame";
import { PixelWordmark } from "@/components/pixel";
import { StageAtmosphere } from "@/components/stage-atmosphere";
import { site } from "@/lib/site";

export function HomeView() {
  return (
    <main id="main-content" className="relative flex min-h-0 flex-1 flex-col overflow-x-clip">
      <StageAtmosphere />
      <section className="safe-px relative z-10 flex flex-1 items-center">
        <div className="w-full max-w-6xl py-10 sm:py-16">
          <div className="-translate-y-[3vh] w-fit max-w-full sm:mx-auto">
            <h1 className="sr-only">
              {site.name} — {site.tagline}
            </h1>
            <p className="sr-only">{site.description}</p>
            <HudFrame>
              <div className="flex w-min max-w-full flex-col [--cell:14px] sm:[--cell:24px] lg:[--cell:28px]">
                <p className="doc-kicker mb-8">Stage 1</p>
                <PixelWordmark
                  pixel={18}
                  boot
                  gutter
                  className="w-max [--cell:14px] sm:[--cell:24px] lg:[--cell:28px]"
                />
                <div className="mt-8 h-px w-full bg-border sm:mt-10" aria-hidden />
                <DownloadOrb />
              </div>
            </HudFrame>
          </div>
        </div>
      </section>
    </main>
  );
}
