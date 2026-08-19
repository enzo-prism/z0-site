import { ArrowUpRightIcon, DownloadIcon } from "lucide-react";

import { AsciiMark, AsciiRain } from "@/components/ascii-art";
import { IconWell } from "@/components/icon-well";
import { PixelHeading } from "@/components/pixel";
import { TerminalSession } from "@/components/terminal-session";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { faqs, features, requirements, site, steps } from "@/lib/site";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <PixelHeading text={children} pixel={2} />
      <Separator className="flex-1" />
    </div>
  );
}

export function HomeView() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden">
        <AsciiRain />
        <div className="relative mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <AsciiMark className="text-foreground" />
            <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {site.tagline}
            </h1>
            <p className="max-w-lg text-base text-muted-foreground text-pretty">
              Tune official Technic + Tekkit 2 for this Mac. Z0 opens the
              launcher. You press Play.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-11 px-4 text-sm">
                <a href={site.download.href} download={site.download.filename}>
                  <DownloadIcon data-icon="inline-start" />
                  {site.download.label}
                </a>
              </Button>
              <a
                href={site.technicUrl}
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Need Technic first
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              {site.download.platform} · v{site.version} · {site.download.size}
            </p>
          </div>
          <TerminalSession />
        </div>
      </section>

      <section id="how" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:px-6">
          <SectionLabel>how it works</SectionLabel>
          <ol className="flex flex-col divide-y divide-border border-y border-border">
            {steps.map((step) => (
              <li
                key={step.n}
                className="grid gap-2 py-4 sm:grid-cols-[3rem_10rem_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {step.n}
                </span>
                <h2 className="text-sm font-medium">{step.title}</h2>
                <p className="text-sm text-muted-foreground text-pretty">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:px-6">
          <SectionLabel>features</SectionLabel>
          <ul className="flex flex-col divide-y divide-border border-y border-border">
            {features.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3 py-4">
                <IconWell name={feature.icon} />
                <div className="flex min-w-0 flex-col gap-1">
                  <h2 className="text-sm font-medium">{feature.title}</h2>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {feature.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="requirements" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionLabel>requirements</SectionLabel>
            <ul className="flex flex-col gap-2.5">
              {requirements.map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-muted-foreground before:mr-2 before:text-foreground before:content-['>']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1 rounded-lg border border-border p-5 font-mono text-xs leading-6 text-muted-foreground">
            <p className="text-foreground">certified pack</p>
            <p>pack········Tekkit 2</p>
            <p>version·····1.2.6</p>
            <p>minecraft···1.12.2</p>
            <p>forge·······14.23.5.2860</p>
            <p className="pt-3">
              Balanced is memory + video only. Existing pack performance mods
              stay. No shaders. No OptiFine.
            </p>
          </div>
        </div>
      </section>

      <section id="download" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:px-6">
          <SectionLabel>download</SectionLabel>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Get Z0 for this Mac
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground text-pretty">
              Unzip and move Z0.app to Applications. Early developer build — not
              notarized. If macOS blocks it, allow Z0 in System Settings →
              Privacy &amp; Security.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-11 px-4 text-sm">
                <a href={site.download.href} download={site.download.filename}>
                  <DownloadIcon data-icon="inline-start" />
                  {site.download.label}
                </a>
              </Button>
              <a
                href={site.technicUrl}
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Official Technic
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
            <dl className="grid gap-2 font-mono text-xs text-muted-foreground sm:grid-cols-2">
              <div>
                <dt className="text-foreground">file</dt>
                <dd>{site.download.filename}</dd>
              </div>
              <div>
                <dt className="text-foreground">sha256</dt>
                <dd className="break-all">{site.download.sha256}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:px-6">
          <SectionLabel>faq</SectionLabel>
          <Accordion type="single" collapsible>
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="max-w-3xl font-mono text-[11px] leading-6 text-muted-foreground">
            Z0 is not affiliated with, endorsed by, or approved by Mojang
            Studios, Microsoft, Technic, or Forge. Z0 never downloads Minecraft,
            never installs the pack, and never constructs a launch command.
          </p>
        </div>
      </section>
    </main>
  );
}
