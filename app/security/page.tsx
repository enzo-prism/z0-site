import type { Metadata } from "next";

import { DocShell } from "@/components/doc-shell";
import { PublicContact } from "@/components/public-contact";

export const metadata: Metadata = {
  title: "Security",
  description: "Security policy and private vulnerability reporting for Z0.",
};

export default function SecurityPage() {
  return (
    <DocShell kicker="Private reporting" title="Security">
      <div className="flex flex-col gap-5 text-pretty">
        <p className="doc-body">
          Report a suspected vulnerability privately to <PublicContact />.
          Include the affected Z0 version, impact, and minimal reproduction
          steps.
        </p>
        <p className="doc-body">
          Do not send passwords, OAuth tokens, Minecraft account tokens,
          private worlds, or unrelated personal data. Do not publish an
          undisclosed vulnerability in a public issue.
        </p>
        <p className="doc-body">
          Good-faith research that avoids privacy violations, data destruction,
          service disruption, and access beyond what is needed to demonstrate
          the issue is welcome. Z0 will acknowledge a valid report and
          coordinate remediation and disclosure.
        </p>
      </div>
    </DocShell>
  );
}
