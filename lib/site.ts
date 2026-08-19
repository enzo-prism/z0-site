export const site = {
  name: "Z0",
  tagline: "Mac companion for official Technic",
  description:
    "Z0 tunes official Technic + Tekkit 2 for this Mac, then opens Technic so you press Play. It never launches Minecraft.",
  support:
    "Play stays in Technic. Z0 never launches Minecraft.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  version: "0.1.0",
  bundleId: "app.z0.companion",
  technicUrl: "https://www.technicpack.net/download",
  download: {
    href: "/downloads/Z0-0.1.0-macos-arm64.zip",
    filename: "Z0-0.1.0-macos-arm64.zip",
    label: "Download Z0 for Mac",
    platform: "macOS 14+ · Apple Silicon",
    size: "510 KB",
    sha256: "516c92df2c47c215414860a8630db86fff0853e58af926ac1c9662ee6c9678b5",
  },
} as const;

export const asciiLogo = String.raw`
███████╗ ██████╗
╚══███╔╝██╔═████╗
  ███╔╝ ██║██╔██║
 ███╔╝  ████╔╝██║
███████╗╚██████╔╝
╚══════╝ ╚═════╝
`.trim();

export const steps = [
  {
    n: "01",
    title: "Detect this Mac",
    body: "Chip, memory, display, storage, and Rosetta — so Balanced is sized for the machine in front of you.",
  },
  {
    n: "02",
    title: "Inspect, then backup",
    body: "Finds official Technic and Tekkit 2 1.2.6. Snapshots overlay files with SHA-256 before any write.",
  },
  {
    n: "03",
    title: "Apply Balanced",
    body: "Conservative memory + video only. On a 16 GB Mac that is 4 GB of Java heap, not 8.",
  },
  {
    n: "04",
    title: "Open Technic",
    body: "Z0 opens the official launcher and watches startup. You press Play. Restore is one click.",
  },
] as const;

export const features = [
  {
    icon: "cpu" as const,
    title: "This Mac",
    body: "Detects Apple Silicon, RAM, display scale, and free storage. Heap is clamped 3–8 GB.",
  },
  {
    icon: "package" as const,
    title: "Certified pack",
    body: "Tekkit 2 1.2.6 · Minecraft 1.12.2 · Forge 14.23.5.2860. Uncertified installs stay read-only.",
  },
  {
    icon: "shield" as const,
    title: "Verified backups",
    body: "Overlay files are snapshotted before every write. Worlds live in their own restore path.",
  },
  {
    icon: "sliders" as const,
    title: "Balanced profile",
    body: "Mac-safe video options plus this pack’s existing stack — Nothirium and VintageFix. Not shaders. Not OptiFine.",
  },
  {
    icon: "app" as const,
    title: "Play stays in Technic",
    body: "Z0 never downloads Minecraft, never installs the pack, and never constructs a launch command.",
  },
  {
    icon: "stethoscope" as const,
    title: "Redacted diagnostics",
    body: "Local summaries with paths and tokens scrubbed. CLI parity via z0ctl.",
  },
] as const;

export const requirements = [
  "macOS 14 or later, Apple Silicon",
  "Official Technic Launcher",
  "Tekkit 2 1.2.6 installed by Technic",
  "A genuine paid Minecraft account (Technic handles login)",
  "Rosetta 2 (Tekkit 2’s LWJGL 2 natives are Intel-only)",
  "Azul Zulu 8 aarch64 for the Technic launcher JVM",
] as const;

export const faqs = [
  {
    q: "Does Z0 launch Minecraft?",
    a: "No. Z0 opens official Technic and watches startup. You press Play in Technic. Z0 never constructs a game launch command.",
  },
  {
    q: "Is this an official Technic or Minecraft product?",
    a: "No. Z0 is an independent macOS companion. It is not affiliated with, endorsed by, or approved by Mojang Studios, Microsoft, Technic, or Forge.",
  },
  {
    q: "Will Tekkit 2 run natively on Apple Silicon?",
    a: "No, and Z0 will not claim that. Official Technic is opened with arm64 Java 8. Tekkit 2 Play still uses Technic’s Intel Mojang Java 8 under Rosetta.",
  },
  {
    q: "What does Balanced change?",
    a: "Memory and video options only — plus this pack’s existing performance stack (Nothirium, VintageFix, and friends). It does not mean shaders or OptiFine.",
  },
  {
    q: "Can I undo what Z0 changes?",
    a: "Yes. Apply always snapshots first. Restore overlay is one click after you quit Technic. World saves are backed up separately.",
  },
  {
    q: "Why the Gatekeeper warning?",
    a: "0.1.0 is an early developer build. It is not notarized yet. After unzipping, open Z0.app from Applications. If macOS blocks it, allow it in System Settings → Privacy & Security.",
  },
] as const;

export const terminalLines = [
  { kind: "comment" as const, text: "# z0ctl — Stage 1 companion" },
  { kind: "prompt" as const, text: "z0ctl status" },
  { kind: "ok" as const, text: "Z0 Stage 1 companion" },
  { kind: "dim" as const, text: "Mac: Apple M4 arm64 16GB" },
  { kind: "dim" as const, text: "Rosetta: installed" },
  { kind: "dim" as const, text: "Balanced heap target: 4096 MB" },
  { kind: "ok" as const, text: "Technic launcher: found" },
  { kind: "ok" as const, text: "Pack: 1.2.6  Forge: 14.23.5.2860  certified=true" },
  { kind: "dim" as const, text: "Nothirium=true  VintageFix=true  OptiFine=false" },
  { kind: "prompt" as const, text: "z0ctl apply-balanced" },
  { kind: "ok" as const, text: "overlay snapshot  ·  heap 4g  ·  guiScale retina" },
  { kind: "prompt" as const, text: "z0ctl open-technic" },
  { kind: "warn" as const, text: "watching 180s  ·  you press Play" },
] as const;
