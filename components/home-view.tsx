import { DownloadOrb } from "@/components/download-orb";
import { PixelWordmark } from "@/components/pixel";
import { site } from "@/lib/site";

export function HomeView() {
  return (
    <main id="main-content" className="relative flex min-h-0 flex-1 flex-col overflow-x-clip">
      <section className="safe-px flex min-h-[calc(100svh-7.5rem)] flex-1 items-center">
        <div className="mx-auto w-full max-w-5xl py-20 sm:py-28">
          <div className="max-w-3xl">
            <h1 className="sr-only">{site.name} — {site.tagline}</h1>
            <p className="sr-only">{site.description}</p>
            <PixelWordmark
              pixel={18}
              boot
              className="[--cell:12px] sm:[--cell:18px]"
            />
            <DownloadOrb />
          </div>
        </div>
      </section>
    </main>
  );
}
