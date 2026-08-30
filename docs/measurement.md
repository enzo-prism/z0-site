# Privacy-safe measurement

Z0 measures acquisition and product success with separate, deliberately
unlinkable datasets. Website analytics must never create a cross-product user
identifier.

## Website event

The download key emits one Vercel Web Analytics custom event:

| Event | Properties | Meaning |
| --- | --- | --- |
| `Download` | `version`, `placement` (`home`, `install`, or `release-notes`) | The browser activated a download link. It does not prove that the transfer, install, first open, or first world succeeded. |

Do not add names, email addresses, account IDs, IP-derived fields, full URLs,
free-form text, home paths, tokens, or a durable client identifier. Report page
views and download clicks as aggregate website counts only.

## Product outcomes

The shipping app keeps launch receipts locally. Z0 does not upload app opens,
Technic activity, worlds, logs, or receipts. First world, successful second
launch, and recovery must be recorded through the moderated protocol in the
private companion repository. `forgeLoaded` is startup evidence, not proof that
a player entered a world.

Website and moderated-session denominators must remain separate. Do not divide
local successes by website visitors or download clicks as if the rows identify
the same people.

## Release readback

After deployment, verify that a test activation produces only the documented
event name and categorical properties. Aggregate dashboards may lag, so an
empty event report is not proof of zero downloads.
