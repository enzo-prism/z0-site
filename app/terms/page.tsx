import type { Metadata } from "next";

import { DocShell } from "@/components/doc-shell";
import { PublicContact } from "@/components/public-contact";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for downloading and using Z0.",
};

export default function TermsPage() {
  return (
    <DocShell kicker="Effective August 19, 2026" title="End User Terms">
      <div className="flex flex-col gap-5 text-pretty">
        <p className="doc-body">
          By downloading or using Z0, you agree to these terms. Z0 grants you a
          personal, revocable, non-exclusive license to use the app on Macs you
          control.
        </p>
        <p className="doc-body">
          You must use a genuine Microsoft account entitled to Minecraft: Java
          Edition and follow the Microsoft Services Agreement, Minecraft EULA,
          Minecraft Usage Guidelines, and the terms and licenses of any
          third-party modpacks you choose.
        </p>
        <p className="doc-body">
          You may not use Z0 to bypass authentication, ownership, license,
          security, parental, or safety checks. Z0 does not grant rights to
          Minecraft, Technic, Tekkit, Forge, mods, or other third-party content,
          and it does not redistribute Minecraft.
        </p>
        <p className="doc-body">
          Third-party services may change or become unavailable. Z0 is provided
          as-is to the extent allowed by law. Stop using and uninstall Z0 if you
          do not accept these terms.
        </p>
        <p className="doc-body">
          Questions: <PublicContact />
        </p>
      </div>
    </DocShell>
  );
}
