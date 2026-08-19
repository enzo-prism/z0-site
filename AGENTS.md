<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Z0 website

Public Next.js 16 marketing site for **Z0**. Visual lockup is lowercase **z** + a taller slashed **0**. Homepage is sparse, text-light, and action-first. `main` is production (Vercel).

Read `README.md` and `docs/cursor-cloud.md` before changing brand or deploy flow.

## Cursor Cloud specific instructions

Cloud agents run on **Linux**. This repo **does** compile here.

- Install and verify: `bash scripts/cloud-check.sh`
- Dev server: `pnpm dev --hostname 0.0.0.0 --port 3000` (Cloud terminal already starts this; port **3000**)
- Do not restore a matching-height uppercase Z in `components/pixel.tsx` or `app/opengraph-image.tsx`
- Do not commit `.env*` or `.vercel`. No secrets are required to build.
- Do not `vercel deploy --prod` unless the user asked.
- Do not copy the private Mac app (`enzo-prism/z0`) into this tree.
