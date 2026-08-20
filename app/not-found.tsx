import Link from "next/link";

import { PixelWordmark } from "@/components/pixel";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="safe-px relative flex flex-1 flex-col items-center justify-center gap-10 py-[max(2rem,env(safe-area-inset-bottom,0px))]"
    >
      <PixelWordmark pixel={8} gutter className="[--cell:8px]" />
      <Link
        href="/"
        className="download-key download-key-compact"
        aria-label="Return home"
      >
        Home
      </Link>
    </main>
  );
}
