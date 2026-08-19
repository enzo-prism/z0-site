#!/usr/bin/env node

import { execFile } from "node:child_process";
import { constants } from "node:fs";
import {
  copyFile,
  mkdtemp,
  open,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, resolve } from "node:path";
import { promisify } from "node:util";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const downloadsDirectory = join(repositoryRoot, "public", "downloads");
const releaseManifestPath = join(repositoryRoot, "lib", "download-release.json");
const latestManifestPath = join(repositoryRoot, "public", "releases", "latest.json");
const lockPath = join(repositoryRoot, ".release-import.lock");

function die(message) {
  throw new Error(`release import failed: ${message}`);
}

function usage() {
  console.log(`Usage:
  node scripts/import-release.mjs --preflight \\
    --source-dir /absolute/release/output \\
    --product-repo /absolute/z0/repo \\
    --version 0.1.1 --build 2 \\
    --product-commit <40-character-sha> \\
    --notary-id <submission-uuid>

  Z0_RELEASE_IMPORT_CONFIRM=IMPORT node scripts/import-release.mjs --apply <same arguments>

Preflight performs every signature, metadata, receipt, ZIP, and checksum check
against source-dir/release-metadata.json without changing the website. Apply
additionally installs a new immutable ZIP and checksum and atomically replaces
both JSON manifests. Existing versioned download files are never overwritten.`);
}

function parseArguments(argv) {
  const values = new Map();
  let mode;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help") {
      usage();
      process.exit(0);
    }
    if (argument === "--preflight" || argument === "--apply") {
      if (mode) die("choose exactly one of --preflight or --apply");
      mode = argument.slice(2);
      continue;
    }
    if (!argument.startsWith("--")) die(`unexpected argument ${argument}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) die(`${argument} requires a value`);
    values.set(argument.slice(2), value);
    index += 1;
  }

  if (!mode) die("choose --preflight or --apply");
  const required = [
    "source-dir",
    "product-repo",
    "version",
    "build",
    "product-commit",
    "notary-id",
  ];
  for (const name of required) {
    if (!values.has(name)) die(`--${name} is required`);
  }

  return {
    mode,
    sourceDirectory: values.get("source-dir"),
    productRepository: values.get("product-repo"),
    version: values.get("version"),
    build: Number(values.get("build")),
    productSourceCommit: values.get("product-commit"),
    notaryId: values.get("notary-id"),
    siteOrigin: values.get("site-origin") ?? "https://z0-site.vercel.app",
  };
}

function validateInputs(input) {
  if (!isAbsolute(input.sourceDirectory)) die("--source-dir must be absolute");
  if (!isAbsolute(input.productRepository)) die("--product-repo must be absolute");
  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(input.version)) {
    die("--version must be semantic version text");
  }
  if (!Number.isSafeInteger(input.build) || input.build <= 0) {
    die("--build must be a positive integer");
  }
  if (!/^[0-9a-f]{40}$/.test(input.productSourceCommit)) {
    die("--product-commit must be a full lowercase Git commit");
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(input.notaryId)) {
    die("--notary-id must be a lowercase UUID");
  }
  const origin = new URL(input.siteOrigin);
  if (origin.protocol !== "https:" || origin.origin !== input.siteOrigin) {
    die("--site-origin must be an HTTPS origin with no path");
  }
}

function validateReleaseMetadata(input, metadata) {
  if (metadata === null || typeof metadata !== "object" || Array.isArray(metadata)) {
    die("release-metadata.json must contain an object");
  }
  const expectedKeys = [
    "architecture",
    "build",
    "bundleIdentifier",
    "bytes",
    "checksumFilename",
    "filename",
    "minimumSystemVersion",
    "notarization",
    "productSourceCommit",
    "releasedAt",
    "schemaVersion",
    "sha256",
    "teamIdentifier",
    "version",
  ].sort();
  const actualKeys = Object.keys(metadata).sort();
  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    die("release-metadata.json fields do not exactly match schema version 1");
  }
  if (metadata.schemaVersion !== 1) die("release metadata schemaVersion must be 1");
  if (metadata.version !== input.version) die("release metadata version does not match --version");
  if (metadata.build !== input.build) die("release metadata build does not match --build");
  if (metadata.productSourceCommit !== input.productSourceCommit) {
    die("release metadata productSourceCommit does not match --product-commit");
  }
  if (metadata.bundleIdentifier !== "app.z0.companion") {
    die("release metadata bundleIdentifier must be app.z0.companion");
  }
  if (metadata.teamIdentifier !== "L49MKXGVM4") {
    die("release metadata teamIdentifier must be L49MKXGVM4");
  }
  if (metadata.minimumSystemVersion !== "14.0") {
    die("release metadata minimumSystemVersion must be 14.0");
  }
  if (metadata.architecture !== "arm64") {
    die("release metadata architecture must be arm64");
  }
  const expectedFilename = `Z0-${input.version}-arm64-notarized.zip`;
  const expectedChecksumFilename = `Z0-${input.version}-arm64-notarized.sha256`;
  if (metadata.filename !== expectedFilename) die(`release metadata filename must be ${expectedFilename}`);
  if (metadata.checksumFilename !== expectedChecksumFilename) {
    die(`release metadata checksumFilename must be ${expectedChecksumFilename}`);
  }
  if (!Number.isSafeInteger(metadata.bytes) || metadata.bytes <= 0) {
    die("release metadata bytes must be a positive integer");
  }
  if (!/^[0-9a-f]{64}$/.test(metadata.sha256)) {
    die("release metadata sha256 must be 64 lowercase hexadecimal characters");
  }
  const releasedAt = new Date(metadata.releasedAt);
  if (Number.isNaN(releasedAt.valueOf()) || releasedAt.toISOString() !== metadata.releasedAt) {
    die("release metadata releasedAt must be a canonical ISO-8601 UTC timestamp");
  }
  const notarization = metadata.notarization;
  const notaryKeys = notarization && typeof notarization === "object"
    ? Object.keys(notarization).sort()
    : [];
  if (JSON.stringify(notaryKeys) !== JSON.stringify(["stapled", "status", "submissionId"])) {
    die("release metadata notarization fields do not match schema version 1");
  }
  if (
    notarization.status !== "accepted" ||
    notarization.submissionId !== input.notaryId ||
    notarization.stapled !== true
  ) {
    die("release metadata notarization must match the accepted stapled submission");
  }
  return metadata;
}

async function mustNotExist(path, label) {
  try {
    await stat(path);
    die(`${label} already exists and immutable releases cannot be overwritten: ${path}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

async function run(command, arguments_, options = {}) {
  try {
    return await execFileAsync(command, arguments_, {
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
      ...options,
    });
  } catch (error) {
    const detail = `${error?.stderr ?? ""}`.trim() || `${error?.stdout ?? ""}`.trim();
    die(`${basename(command)} rejected the release${detail ? `: ${detail}` : ""}`);
  }
}

async function validateSource(input, metadata, archivePath, checksumPath, extractionRoot) {
  await run("/usr/bin/git", [
    "-C",
    input.productRepository,
    "cat-file",
    "-e",
    `${input.productSourceCommit}^{commit}`,
  ]);

  const receipt = JSON.parse(
    await readFile(join(input.sourceDirectory, "notary-status.json"), "utf8"),
  );
  if (receipt?.data?.id !== input.notaryId) {
    die("notary-status.json submission ID does not match --notary-id");
  }
  if (receipt?.data?.attributes?.status !== "Accepted") {
    die("notary-status.json is not Accepted");
  }

  const archive = await readFile(archivePath);
  if (archive.length < 4 || archive.readUInt32LE(0) !== 0x04034b50) {
    die("release archive does not begin with ZIP local-file magic");
  }
  const sha256 = createHash("sha256").update(archive).digest("hex");
  const expectedSidecar = `${sha256}  ${basename(archivePath)}\n`;
  const actualSidecar = (await readFile(checksumPath, "utf8")).replaceAll("\r\n", "\n");
  if (actualSidecar !== expectedSidecar) {
    die("source checksum sidecar does not exactly match the ZIP");
  }
  if (metadata.bytes !== archive.length || metadata.sha256 !== sha256) {
    die("release-metadata.json byte count or SHA-256 does not match the ZIP");
  }

  const { stdout: zipListing } = await run("/usr/bin/unzip", ["-Z1", archivePath]);
  const entries = zipListing.split("\n").filter(Boolean);
  const requiredEntries = [
    "Z0.app/",
    "Z0.app/Contents/Info.plist",
    "Z0.app/Contents/MacOS/Z0",
    "Z0.app/Contents/_CodeSignature/CodeResources",
  ];
  for (const required of requiredEntries) {
    if (!entries.includes(required)) die(`ZIP is missing ${required}`);
  }
  for (const entry of entries) {
    if (
      entry.startsWith("/") ||
      entry.includes("\\") ||
      entry.split("/").includes("..") ||
      (entry !== "Z0.app/" && !entry.startsWith("Z0.app/"))
    ) {
      die(`ZIP contains an unsafe or unexpected path: ${entry}`);
    }
    if (
      entry.startsWith("__MACOSX/") ||
      entry.split("/").some((part) => part.startsWith("._")) ||
      entry.split("/").includes(".DS_Store")
    ) {
      die(`ZIP contains forbidden macOS metadata: ${entry}`);
    }
  }

  await run("/usr/bin/ditto", ["-x", "-k", archivePath, extractionRoot]);
  const appPath = join(extractionRoot, "Z0.app");
  const infoPath = join(appPath, "Contents", "Info.plist");
  const executablePath = join(appPath, "Contents", "MacOS", "Z0");
  const plistValue = async (key) =>
    (await run("/usr/bin/plutil", ["-extract", key, "raw", "-o", "-", infoPath])).stdout.trim();

  if ((await plistValue("CFBundleShortVersionString")) !== input.version) {
    die("app marketing version does not match --version");
  }
  if ((await plistValue("CFBundleVersion")) !== String(input.build)) {
    die("app build does not match --build");
  }
  if ((await plistValue("CFBundleIdentifier")) !== "app.z0.companion") {
    die("app bundle identifier is not app.z0.companion");
  }
  if ((await plistValue("LSMinimumSystemVersion")) !== "14.0") {
    die("app minimum system version is not 14.0");
  }
  const architectures = (await run("/usr/bin/lipo", ["-archs", executablePath])).stdout.trim();
  if (architectures !== "arm64") die(`app architecture must be arm64, found ${architectures}`);

  await run("/usr/bin/codesign", ["--verify", "--deep", "--strict", "--verbose=2", appPath]);
  const signature = await run("/usr/bin/codesign", ["-dv", "--verbose=4", appPath]);
  const signatureDetails = `${signature.stdout}\n${signature.stderr}`;
  if (!signatureDetails.includes("TeamIdentifier=L49MKXGVM4")) {
    die("Developer ID signature team is not L49MKXGVM4");
  }
  if (!signatureDetails.includes("Notarization Ticket=stapled")) {
    die("app does not carry a stapled notarization ticket");
  }
  await run("/usr/sbin/spctl", ["-a", "-vvv", "-t", "exec", appPath]);
  await run("/usr/bin/xcrun", ["stapler", "validate", appPath]);

  return { bytes: archive.length, sha256 };
}

async function atomicWrite(path, contents, suffix) {
  const temporaryPath = `${path}.${suffix}`;
  await writeFile(temporaryPath, contents, { encoding: "utf8", flag: "wx", mode: 0o644 });
  await rename(temporaryPath, path);
}

async function applyRelease(input, files, manifest, latest) {
  if (process.env.Z0_RELEASE_IMPORT_CONFIRM !== "IMPORT") {
    die("--apply requires Z0_RELEASE_IMPORT_CONFIRM=IMPORT");
  }

  const suffix = `incoming-${process.pid}-${Date.now()}`;
  const destinationArchive = join(downloadsDirectory, manifest.filename);
  const destinationChecksum = join(downloadsDirectory, manifest.checksumFilename);
  await mustNotExist(destinationArchive, "destination ZIP");
  await mustNotExist(destinationChecksum, "destination checksum");

  const stagedArchive = join(downloadsDirectory, `.${manifest.filename}.${suffix}`);
  const stagedChecksum = join(downloadsDirectory, `.${manifest.checksumFilename}.${suffix}`);
  const oldManifest = await readFile(releaseManifestPath, "utf8");
  const oldLatest = await readFile(latestManifestPath, "utf8");
  const installed = [];

  try {
    await copyFile(files.archivePath, stagedArchive, constants.COPYFILE_EXCL);
    await copyFile(files.checksumPath, stagedChecksum, constants.COPYFILE_EXCL);
    await rename(stagedArchive, destinationArchive);
    installed.push(destinationArchive);
    await rename(stagedChecksum, destinationChecksum);
    installed.push(destinationChecksum);
    await atomicWrite(releaseManifestPath, `${JSON.stringify(manifest, null, 2)}\n`, suffix);
    await atomicWrite(latestManifestPath, `${JSON.stringify(latest, null, 2)}\n`, suffix);
  } catch (error) {
    await atomicWrite(releaseManifestPath, oldManifest, `${suffix}-rollback-manifest`).catch(() => {});
    await atomicWrite(latestManifestPath, oldLatest, `${suffix}-rollback-latest`).catch(() => {});
    for (const path of [...installed, stagedArchive, stagedChecksum]) {
      await rm(path, { force: true }).catch(() => {});
    }
    throw error;
  }
}

async function main() {
  const input = parseArguments(process.argv.slice(2));
  validateInputs(input);
  const metadata = validateReleaseMetadata(
    input,
    JSON.parse(
      await readFile(join(input.sourceDirectory, "release-metadata.json"), "utf8"),
    ),
  );
  const { filename, checksumFilename } = metadata;
  const archivePath = join(input.sourceDirectory, filename);
  const checksumPath = join(input.sourceDirectory, checksumFilename);
  const destinationArchive = join(downloadsDirectory, filename);
  const destinationChecksum = join(downloadsDirectory, checksumFilename);
  await mustNotExist(destinationArchive, "destination ZIP");
  await mustNotExist(destinationChecksum, "destination checksum");

  const lock = await open(lockPath, "wx").catch((error) => {
    if (error?.code === "EEXIST") die(`another import may be running; remove stale lock after inspection: ${lockPath}`);
    throw error;
  });
  const extractionRoot = await mkdtemp(join(tmpdir(), "z0-release-import-"));

  try {
    const integrity = await validateSource(
      input,
      metadata,
      archivePath,
      checksumPath,
      extractionRoot,
    );
    const manifest = metadata;
    const latest = {
      ...metadata,
      downloadURL: `${input.siteOrigin}/downloads/${filename}`,
      releaseNotesURL: `${input.siteOrigin}/release-notes`,
    };

    if (input.mode === "apply") {
      await applyRelease(input, { archivePath, checksumPath }, manifest, latest);
      console.log(`Imported immutable release ${filename}. Run pnpm verify:download before committing.`);
    } else {
      console.log(`Preflight passed for ${filename}: ${integrity.bytes} bytes, SHA-256 ${integrity.sha256}`);
    }
  } finally {
    await lock.close();
    await rm(lockPath, { force: true });
    await rm(extractionRoot, { force: true, recursive: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
