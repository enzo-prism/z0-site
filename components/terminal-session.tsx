import { terminalLines } from "@/lib/site";
import { cn } from "@/lib/utils";

export function TerminalSession({ className }: { className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-background", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-[11px] text-muted-foreground">z0ctl — arm64</span>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          session
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-6 sm:p-5 sm:text-[13px]">
        {terminalLines.map((line, index) => (
          <span
            key={`${line.kind}-${index}`}
            className={cn(
              "block",
              line.kind === "prompt" && "text-foreground",
              line.kind === "ok" && "text-ok",
              line.kind === "warn" && "text-warn",
              line.kind === "dim" && "text-muted-foreground",
              line.kind === "comment" && "text-muted-foreground/80",
            )}
          >
            {line.kind === "prompt" ? (
              <>
                <span className="text-muted-foreground">$</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </span>
        ))}
        <span className="mt-1 inline-block h-4 w-2 translate-y-0.5 bg-foreground/80 motion-safe:animate-pulse" />
      </pre>
    </div>
  );
}
