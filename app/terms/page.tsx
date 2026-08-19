import type { Metadata } from "next";

import { PixelWordmark } from "@/components/pixel";
import { PublicContact } from "@/components/public-contact";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for downloading and using Z0.",
};

export default function TermsPage() {
  return (
    <main
      id="main-content"
      className="safe-px mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 py-12 pb-[max(3rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:py-16"
    >
      <PixelWordmark pixel={5} className="[--cell:5px]" />
      <header className="space-y-3">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Effective August 19, 2026
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          End User Terms
        </h1>
      </header>

      <div className="flex flex-col gap-5 text-sm leading-7 text-pretty text-muted-foreground">
        <p>
          By downloading or using Z0, you agree to these terms. Z0 grants you a
          personal, revocable, non-exclusive license to use the app on Macs you
          control.
        </p>
        <p>
          You must use a genuine Microsoft account entitled to Minecraft: Java
          Edition and follow the Microsoft Services Agreement, Minecraft EULA,
          Minecraft Usage Guidelines, and the terms and licenses of any
          third-party modpacks you choose.
        </p>
        <p>
          You may not use Z0 to bypass authentication, ownership, license,
          security, parental, or safety checks. Z0 does not grant rights to
          Minecraft, Technic, Tekkit, Forge, mods, or other third-party content,
          and it does not redistribute Minecraft.
        </p>
        <p>
          Third-party services may change or become unavailable. Z0 is provided
          as-is to the extent allowed by law. Stop using and uninstall Z0 if you
          do not accept these terms.
        </p>
        <p>
          Questions: <PublicContact />
        </p>
      </div>
    </main>
  );
}

