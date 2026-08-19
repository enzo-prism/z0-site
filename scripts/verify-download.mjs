#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const manifestPath = join(repositoryRoot, "lib", "download-release.json");
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

function validateManifest(rawManifest) {
  const manifest = JSON.parse(rawManifest);
  const version = requireString(manifest.version, "version");
  const filename = requireString(manifest.filename, "filename");
  const checksumFilename = requireString(
    manifest.checksumFilename,
    "checksumFilename",
  );
  const sha256 = requireString(manifest.sha256, "sha256");

  if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) {
    fail("manifest version is not a supported semantic version");
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
  if (!Number.isSafeInteger(manifest.bytes) || manifest.bytes <= 0) {
    fail("manifest bytes must be a positive safe integer");
  }
  if (!/^[0-9a-f]{64}$/.test(sha256)) {
    fail("manifest sha256 must be 64 lowercase hexadecimal characters");
  }

  return { ...manifest, version, filename, checksumFilename, sha256 };
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
    `Verified ${manifest.filename}: ${manifest.bytes} bytes, SHA-256 ${manifest.sha256}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
