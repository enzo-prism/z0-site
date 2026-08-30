# Production release control

`main` is the only production branch. Vercel's Git integration may deploy a
merge only after GitHub has proved the pull-request candidate with the exact
`verify` check.

## Required GitHub protection

- pull request required for every change;
- strict, up-to-date GitHub Actions check `verify` from app ID `15368`;
- conversations resolved before merge;
- administrators included;
- force pushes and branch deletion disabled;
- zero required approvals while `enzo-prism` is the repository's only
  collaborator, because one approval would make every merge impossible.

Independent code review is still required in the work record. Add a protected
GitHub approval requirement only after a trusted second reviewer has repository
access.

## Required verification

`pnpm check` performs immutable-download verification, lint, explicit
TypeScript checking, and the production build. CI and Cursor Cloud then run
`git diff --check`. Node is pinned to 22.x in `package.json` so local, hosted CI,
and Vercel use the same major runtime.

## Deployment sequence

1. Open a pull request from a non-production branch.
2. Wait for the exact head candidate's `verify` check.
3. Review the preview at desktop and iPhone width, including canonical tags,
   `/launcher` noindex, sitemap exclusion, the download event payload, and the
   immutable release bytes.
4. Merge only after the required check and review record are complete.
5. Read back the Vercel production deployment, commit SHA, aliases, canonical
   tags, release manifest, ZIP byte count, and checksum.

Do not use `vercel deploy --prod`, promotion, rollback, or an admin bypass as a
routine ship path. Any emergency action requires exact owner approval and a
post-action production readback.
