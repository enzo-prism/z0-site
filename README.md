# z0 website

Marketing site for **Z0**, a macOS companion for official Technic + Tekkit 2.

- Next.js App Router on Vercel
- Dark-first HUD (cool near-black). Light via `next-themes` toggle
- Manifest-verified notarized ZIP at `/downloads/Z0-<version>-arm64-notarized.zip`
- Matching checksum at `/downloads/Z0-<version>-arm64-notarized.sha256`
- User-triggered update record at `/releases/latest.json`

Production: [z0-site.vercel.app](https://z0-site.vercel.app)  
Repo: [enzo-prism/z0-site](https://github.com/enzo-prism/z0-site) (`main` is production)

The companion product lives in the private [enzo-prism/z0](https://github.com/enzo-prism/z0) repo.

## Brand

The visual lockup is **z0**, not a matching-height **Z0**:

- Lowercase **z** at x-height (5 pixel rows), sitting on the baseline
- Slashed **0** at full cap height (7 pixel rows), so the zero reads taller
- Pickaxe mark is `public/brand/logo.png`

Product copy, metadata, and the download filename still use **Z0**. Do not restore an uppercase 7×7 Z in the wordmark.

The homepage is a dark HUD stage: dotted grid, corner brackets, LED-matrix wordmark boot, and one 2px download key. Visible type is labels only (`STAGE 1`, version/platform readout, Technic handoff). Marketing copy stays in `sr-only`, link labels, and inner pages. Layout is built for iPhone safe areas, 44px tap targets, and generous responsive whitespace. Do not add a feature grid, FAQ, or terminal mock to the home stage.

Inner pages are a manual (`components/doc-shell.tsx`): mono kicker, medium-weight title, hairline rules. The header already carries the wordmark — do not duplicate it under the title.

| Piece | File |
| --- | --- |
| Pixel wordmark | `components/pixel.tsx` (`PixelWordmark`) |
| Open Graph lockup | `app/opengraph-image.tsx` |
| Home stage | `components/home-view.tsx`, `stage-atmosphere.tsx`, `hud-frame.tsx` |
| Download key | `components/download-orb.tsx`, `lib/site.ts` |
| Inner pages | `components/doc-shell.tsx` |
| Tokens / HUD CSS | `app/globals.css` |
| Release integrity | `lib/download-release.json`, `scripts/verify-download.mjs` |
| Update channel | `public/releases/latest.json`, `docs/update-channel.md` |

## Review contact seam

The AppID-review, privacy, terms, support, and security pages use the approved
public contact address `lorenzosison@gmail.com`. A production environment may
override it with `NEXT_PUBLIC_Z0_CONTACT_EMAIL`, but any override must also be
reflected in `public/.well-known/security.txt` and the Entra app contact.

The Mac app wordmark is the same lockup in `Apps/Z0/PixelText.swift` (`Z0Wordmark`) in the product repo.

## Cursor Cloud

Cloud agents use `.cursor/environment.json` (Ubuntu 24.04, Node 22, pnpm 11.22.0). After checkout they run `bash scripts/cloud-check.sh`. Details: `docs/cursor-cloud.md`.

```sh
bash scripts/cloud-check.sh
pnpm dev
```

`cloud-check.sh` fails closed unless the release manifest, notarized ZIP,
checksum sidecar, update record, byte count, digest, provenance, notarization,
and app-bundle ZIP layout all agree. A released filename is immutable and must
never be overwritten with new bytes.

## Develop

```sh
pnpm install
pnpm dev
```

## Production

`main` auto-deploys on Vercel (team `enzo-design-prisms-projects`, project `z0-site`). To ship from this tree:

```sh
pnpm build
vercel deploy --prod --yes --scope enzo-design-prisms-projects
```

Z0 is not affiliated with Mojang, Microsoft, Technic, or Forge.
