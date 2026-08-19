#!/usr/bin/env bash
# Idempotent Cursor Cloud install + verify. Runs from the repo root.
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v pnpm >/dev/null 2>&1; then
  corepack enable
  corepack prepare pnpm@11.22.0 --activate
fi

pnpm install --frozen-lockfile
pnpm verify:download
pnpm lint
pnpm build
