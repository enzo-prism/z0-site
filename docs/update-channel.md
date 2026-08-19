# Z0 update channel

Z0 Stage 1 uses a manual, user-triggered update check. It never checks in the background and never installs an update itself.

The app reads this public document only after the user chooses **Check for Updates**:

```text
https://z0-site.vercel.app/releases/latest.json
```

The document is schema version 1 and binds one immutable download to:

- marketing version and integer build;
- exact product source commit;
- absolute HTTPS download and release-notes URLs;
- byte count and SHA-256;
- bundle ID, Developer ID team, minimum macOS version, and architecture;
- accepted Apple notary submission and stapled-ticket state.

The app must ignore unknown fields for forward compatibility, but fail closed when a required field is missing, malformed, or does not describe `app.z0.companion`, team `L49MKXGVM4`, `arm64`, an accepted notarization, and an HTTPS Z0 production URL. It compares semantic version first and build second. A newer valid record may be shown to the user; Z0 opens the download URL only after a separate explicit click.

## Import a future release

The release output must contain the notarized ZIP, its exact checksum sidecar, the accepted `notary-status.json` receipt, and pipeline-generated `release-metadata.json`. The importer requires the version, build, source commit, and notary ID again on the command line and fails if any explicit value differs from the metadata. It then derives `latest.json` by adding only the canonical download and release-notes URLs. First run the read-only preflight:

```sh
pnpm release:import -- --preflight \
  --source-dir /absolute/path/to/release-output \
  --product-repo /absolute/path/to/z0 \
  --version 0.1.1 \
  --build 2 \
  --product-commit 40-character-lowercase-commit \
  --notary-id lowercase-submission-uuid
```

After review, apply the exact same values with the explicit import confirmation:

```sh
Z0_RELEASE_IMPORT_CONFIRM=IMPORT pnpm release:import -- --apply \
  --source-dir /absolute/path/to/release-output \
  --product-repo /absolute/path/to/z0 \
  --version 0.1.1 \
  --build 2 \
  --product-commit 40-character-lowercase-commit \
  --notary-id lowercase-submission-uuid
```

The importer validates the source commit, accepted notary receipt, ZIP paths, checksum, app metadata, arm64 executable, Developer ID team, hardened signature, stapled ticket, and Gatekeeper acceptance. It refuses an existing versioned destination. New assets are staged before both JSON manifests are atomically replaced; failures restore the old manifests and remove the staged version.

Always finish with:

```sh
pnpm verify:download
pnpm lint
pnpm build
git diff --check
```

Do not overwrite or delete an already published versioned URL. Roll forward with a new version and build.
