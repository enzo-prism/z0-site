#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const manifestPath = join(repositoryRoot, "lib", "download-release.json");
const latestPath = join(repositoryRoot, "public", "releases", "latest.json");
const downloadsDirectory = join(repositoryRoot, "public", "downloads");

function fail(message) {
  throw new Error(`download verification failed: ${message}`);
}

function requireString(value, field) {
  if (typeof value !== "string" || value.length === 0) {
    fail(`manifest ${field} must be a non-empty string`);
  }
  return value;
}

function requirePositiveInteger(value, field) {
  if (!Number.isSafeInteger(value) || value <= 0) {
    fail(`${field} must be a positive safe integer`);
  }
  return value;
}

function requireObject(value, field) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${field} must be an object`);
  }
  return value;
}

function validateManifest(rawManifest) {
  const manifest = JSON.parse(rawManifest);
  if (manifest.schemaVersion !== 1) {
    fail("manifest schemaVersion must be 1");
  }
  const version = requireString(manifest.version, "version");
  const build = requirePositiveInteger(manifest.build, "manifest build");
  const releasedAt = requireString(manifest.releasedAt, "releasedAt");
  const productSourceCommit = requireString(
    manifest.productSourceCommit,
    "productSourceCommit",
  );
  const bundleIdentifier = requireString(
    manifest.bundleIdentifier,
    "bundleIdentifier",
  );
  const teamIdentifier = requireString(
    manifest.teamIdentifier,
    "teamIdentifier",
  );
  const minimumSystemVersion = requireString(
    manifest.minimumSystemVersion,
    "minimumSystemVersion",
  );
  const architecture = requireString(manifest.architecture, "architecture");
  const filename = requireString(manifest.filename, "filename");
  const checksumFilename = requireString(
    manifest.checksumFilename,
    "checksumFilename",
  );
  const sha256 = requireString(manifest.sha256, "sha256");

  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) {
    fail("manifest version is not a supported semantic version");
  }
  const releaseDate = new Date(releasedAt);
  if (Number.isNaN(releaseDate.valueOf()) || releaseDate.toISOString() !== releasedAt) {
    fail("manifest releasedAt must be a canonical ISO-8601 UTC timestamp");
  }
  if (!/^[0-9a-f]{40}$/.test(productSourceCommit)) {
    fail("manifest productSourceCommit must be a full lowercase Git commit");
  }
  if (bundleIdentifier !== "app.z0.companion") {
    fail("manifest bundleIdentifier must be app.z0.companion");
  }
  if (!/^[A-Z0-9]{10}$/.test(teamIdentifier)) {
    fail("manifest teamIdentifier must be a 10-character Apple team ID");
  }
  if (!/^\d+\.\d+(?:\.\d+)?$/.test(minimumSystemVersion)) {
    fail("manifest minimumSystemVersion is invalid");
  }
  if (architecture !== "arm64") {
    fail("manifest architecture must be arm64");
  }
  if (filename !== `Z0-${version}-arm64-notarized.zip`) {
    fail(
      `manifest filename must be Z0-${version}-arm64-notarized.zip`,
    );
  }
  if (checksumFilename !== `Z0-${version}-arm64-notarized.sha256`) {
    fail(
      `manifest checksumFilename must be Z0-${version}-arm64-notarized.sha256`,
    );
  }
  if (/unsigned-not-for-distribution/i.test(filename + checksumFilename)) {
    fail("distribution filenames contain the forbidden unsigned marker");
  }
  requirePositiveInteger(manifest.bytes, "manifest bytes");
  if (!/^[0-9a-f]{64}$/.test(sha256)) {
    fail("manifest sha256 must be 64 lowercase hexadecimal characters");
  }

  const notarization = requireObject(manifest.notarization, "manifest notarization");
  if (notarization.status !== "accepted") {
    fail("manifest notarization status must be accepted");
  }
  if (
    typeof notarization.submissionId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
      notarization.submissionId,
    )
  ) {
    fail("manifest notarization submissionId must be a lowercase UUID");
  }
  if (notarization.stapled !== true) {
    fail("manifest notarization stapled must be true");
  }

  return {
    ...manifest,
    version,
    build,
    releasedAt,
    productSourceCommit,
    bundleIdentifier,
    teamIdentifier,
    minimumSystemVersion,
    architecture,
    filename,
    checksumFilename,
    sha256,
    notarization,
  };
}

function validateLatest(rawLatest, manifest) {
  const latest = JSON.parse(rawLatest);
  if (latest.schemaVersion !== 1) {
    fail("latest.json schemaVersion must be 1");
  }

  const mirroredFields = [
    "version",
    "build",
    "releasedAt",
    "productSourceCommit",
    "filename",
    "checksumFilename",
    "bytes",
    "sha256",
    "bundleIdentifier",
    "teamIdentifier",
    "minimumSystemVersion",
    "architecture",
  ];
  for (const field of mirroredFields) {
    if (latest[field] !== manifest[field]) {
      fail(`latest.json ${field} does not match the release manifest`);
    }
  }

  if (JSON.stringify(latest.notarization) !== JSON.stringify(manifest.notarization)) {
    fail("latest.json notarization does not match the release manifest");
  }

  const expectedDownloadURL = `https://z0-site.vercel.app/downloads/${manifest.filename}`;
  if (latest.downloadURL !== expectedDownloadURL) {
    fail(`latest.json downloadURL must be ${expectedDownloadURL}`);
  }
  if (latest.releaseNotesURL !== "https://z0-site.vercel.app/release-notes") {
    fail("latest.json releaseNotesURL must use the production release-notes page");
  }

  return latest;
}

function findEndOfCentralDirectory(archive) {
  const signature = 0x06054b50;
  const minimumOffset = Math.max(0, archive.length - 65_557);
  for (let offset = archive.length - 22; offset >= minimumOffset; offset -= 1) {
    if (archive.readUInt32LE(offset) === signature) {
      return offset;
    }
  }
  fail("ZIP end-of-central-directory record is missing");
}

function zipEntries(archive) {
  if (archive.length < 22 || archive.readUInt32LE(0) !== 0x04034b50) {
    fail("archive does not begin with ZIP local-file magic");
  }

  const eocdOffset = findEndOfCentralDirectory(archive);
  const diskNumber = archive.readUInt16LE(eocdOffset + 4);
  const centralDirectoryDisk = archive.readUInt16LE(eocdOffset + 6);
  const entryCount = archive.readUInt16LE(eocdOffset + 10);
  const centralDirectorySize = archive.readUInt32LE(eocdOffset + 12);
  const centralDirectoryOffset = archive.readUInt32LE(eocdOffset + 16);

  if (diskNumber !== 0 || centralDirectoryDisk !== 0) {
    fail("multi-disk ZIP archives are not supported");
  }
  if (
    entryCount === 0xffff ||
    centralDirectorySize === 0xffffffff ||
    centralDirectoryOffset === 0xffffffff
  ) {
    fail("ZIP64 archives are not supported for this small app bundle");
  }
  if (
    centralDirectoryOffset + centralDirectorySize > eocdOffset ||
    centralDirectoryOffset < 4
  ) {
    fail("ZIP central-directory bounds are invalid");
  }

  const entries = [];
  let offset = centralDirectoryOffset;
  for (let index = 0; index < entryCount; index += 1) {
    if (offset + 46 > archive.length || archive.readUInt32LE(offset) !== 0x02014b50) {
      fail(`ZIP central-directory entry ${index + 1} is invalid`);
    }
    const filenameLength = archive.readUInt16LE(offset + 28);
    const extraLength = archive.readUInt16LE(offset + 30);
    const commentLength = archive.readUInt16LE(offset + 32);
    const nameStart = offset + 46;
    const nameEnd = nameStart + filenameLength;
    if (nameEnd > archive.length) {
      fail(`ZIP entry ${index + 1} filename exceeds archive bounds`);
    }
    entries.push(archive.subarray(nameStart, nameEnd).toString("utf8"));
    offset = nameEnd + extraLength + commentLength;
  }
  if (offset !== centralDirectoryOffset + centralDirectorySize) {
    fail("ZIP central-directory size does not match its entries");
  }
  return entries;
}

function validateAppBundle(entries) {
  const requiredEntries = [
    "Z0.app/",
    "Z0.app/Contents/Info.plist",
    "Z0.app/Contents/MacOS/Z0",
    "Z0.app/Contents/_CodeSignature/CodeResources",
  ];
  const entrySet = new Set(entries);

  for (const entry of requiredEntries) {
    if (!entrySet.has(entry)) {
      fail(`ZIP is missing required app entry ${entry}`);
    }
  }

  for (const entry of entries) {
    if (
      entry.startsWith("/") ||
      entry.includes("\\") ||
      entry.split("/").includes("..")
    ) {
      fail(`ZIP contains an unsafe path: ${entry}`);
    }
    if (entry !== "Z0.app/" && !entry.startsWith("Z0.app/")) {
      fail(`ZIP contains an unexpected top-level entry: ${entry}`);
    }
    if (
      entry.startsWith("__MACOSX/") ||
      entry.split("/").some((component) => component.startsWith("._")) ||
      entry.split("/").includes(".DS_Store")
    ) {
      fail(`ZIP contains forbidden AppleDouble metadata: ${entry}`);
    }
  }
}

async function main() {
  const manifest = validateManifest(await readFile(manifestPath, "utf8"));
  validateLatest(await readFile(latestPath, "utf8"), manifest);
  const archivePath = join(downloadsDirectory, manifest.filename);
  const checksumPath = join(downloadsDirectory, manifest.checksumFilename);
  const archive = await readFile(archivePath);

  if (archive.byteLength !== manifest.bytes) {
    fail(
      `archive has ${archive.byteLength} bytes; manifest requires ${manifest.bytes}`,
    );
  }

  const actualDigest = createHash("sha256").update(archive).digest("hex");
  if (actualDigest !== manifest.sha256) {
    fail(`archive SHA-256 is ${actualDigest}; manifest requires ${manifest.sha256}`);
  }

  const expectedSidecar = `${manifest.sha256}  ${manifest.filename}\n`;
  const actualSidecar = (await readFile(checksumPath, "utf8")).replaceAll(
    "\r\n",
    "\n",
  );
  if (actualSidecar !== expectedSidecar) {
    fail("checksum sidecar does not exactly match the manifest and ZIP filename");
  }

  validateAppBundle(zipEntries(archive));
  console.log(
    `Verified ${manifest.filename} and latest.json: ${manifest.bytes} bytes, SHA-256 ${manifest.sha256}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
