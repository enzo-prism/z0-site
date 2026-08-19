# Cursor Cloud

Cloud agents for this repo run on **Ubuntu**. Unlike the private companion (`enzo-prism/z0`), this Next.js site **does** install, lint, and build on Linux.

`main` is production. Vercel deploys from GitHub `main`.

## What the VM can do

- Edit the App Router site, pixel wordmark, and docs.
- Run `bash scripts/cloud-check.sh` (also the environment `install` script): `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm build`.
- Run `pnpm dev --hostname 0.0.0.0 --port 3000` (started as a Cloud terminal). Preview is on port **3000**.
- Open pull requests.

## What the VM must not do

- `COPY` this repo into `.cursor/Dockerfile`. Cursor checks out the commit.
- Commit `.env*`, `.vercel`, or Vercel/OIDC tokens. The static site builds without secrets.
- `vercel deploy --prod` unless the user explicitly asked to ship production.
- Copy Swift sources from `enzo-prism/z0` into this tree. Keep the Mac app and the site in their own repos.
- Restore an uppercase 7×7 **Z** in `components/pixel.tsx` / `app/opengraph-image.tsx`.

## Environment files

| File | Role |
| --- | --- |
| `.cursor/environment.json` | Dockerfile build, `ubuntu` user, `install` = cloud-check, port 3000 |
| `.cursor/Dockerfile` | Ubuntu 24.04 + Node 22 + pnpm 11.22.0 + git/sudo. No repo COPY. |
| `.cursor/rules/z0-site.mdc` | Always-on brand and ship rules |
| `.cursorignore` | Skip `.next`, `node_modules`, `.vercel` |
| `AGENTS.md` | Next.js managed block + **Cursor Cloud specific instructions** |
| `scripts/cloud-check.sh` | Idempotent install + lint + build |

`build.dockerfile` is relative to `.cursor`. `context` is omitted so the Docker context stays `.cursor` (not the whole tree). `install` runs from the repo root after checkout.

## First cloud-agent launch

Commit these files on `main`, then start a Cloud Agent on **enzo-prism/z0-site**. Cursor builds the Dockerfile from `.cursor/environment.json`.

If an old saved environment snapshot exists for this repo (from dashboard **Set up agent**), delete it in the [Cloud Agents dashboard](https://cursor.com/dashboard/cloud-agents#environments) so the Dockerfile is used.

No Cursor Secrets are required to lint or build. Production deploys stay on the GitHub ↔ Vercel connection.

## After a cloud PR

A human (or a follow-up agent with explicit permission) merges to `main` when the site should go live. Visual checks: desktop plus an iPhone-width pass. Brand lockup: `docs` in the root `README.md`.
