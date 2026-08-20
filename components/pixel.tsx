import { cn } from "@/lib/utils";

/** Lowercase z at x-height (5 rows) so the slashed 0 reads taller. */
const LOWERCASE_Z = [0b1111111, 0b0000110, 0b0001000, 0b0110000, 0b1111111];
const SLASHED_ZERO = [0b0111110, 0b1000011, 0b1000101, 0b1001001, 0b1010001, 0b1100001, 0b0111110];
const CHEVRON_RIGHT = [0b100, 0b010, 0b001, 0b010, 0b100];

function cells(rows: number[], columns: number) {
  const points: Array<[number, number]> = [];
  rows.forEach((bits, row) => {
    for (let column = 0; column < columns; column += 1) {
      if ((bits & (1 << (columns - 1 - column))) !== 0) {
        points.push([column, row]);
      }
    }
  });
  return points;
}

function Bitmap({
  rows,
  columns,
  pixel,
  boot = false,
  delay = 0,
  gutter = false,
  className,
}: {
  rows: number[];
  columns: number;
  pixel: number;
  boot?: boolean;
  delay?: number;
  gutter?: boolean;
  className?: string;
}) {
  const on = cells(rows, columns);
  const inset = gutter ? 0.08 : 0;
  return (
    <svg
      width={columns * pixel}
      height={rows.length * pixel}
      viewBox={`0 0 ${columns} ${rows.length}`}
      className={cn("h-auto w-auto shrink-0 fill-current", className)}
      style={{
        width: `calc(var(--cell, ${pixel}px) * ${columns})`,
        height: `calc(var(--cell, ${pixel}px) * ${rows.length})`,
      }}
      aria-hidden
    >
      {on.map(([x, y], index) => (
        <rect
          key={`${x}-${y}`}
          x={x + inset}
          y={y + inset}
          width={1 - inset * 2}
          height={1 - inset * 2}
          className={boot ? "boot-cell" : undefined}
          style={
            boot
              ? { animationDelay: `${delay + index * 11}ms` }
              : undefined
          }
        />
      ))}
    </svg>
  );
}

export function PixelWordmark({
  pixel = 5,
  boot = false,
  gutter = false,
  className,
}: {
  pixel?: number;
  boot?: boolean;
  gutter?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end gap-[var(--cell)] text-foreground [--cell:5px]",
        boot && "wordmark-boot",
        className,
      )}
      role="img"
      aria-label="z0"
    >
      <Bitmap
        rows={LOWERCASE_Z}
        columns={7}
        pixel={pixel}
        boot={boot}
        gutter={gutter}
      />
      <span className="w-[var(--cell)] shrink-0" />
      <Bitmap
        rows={SLASHED_ZERO}
        columns={7}
        pixel={pixel}
        boot={boot}
        gutter={gutter}
        delay={200}
      />
    </div>
  );
}

export function PixelChevron({ className }: { className?: string }) {
  return (
    <Bitmap
      rows={CHEVRON_RIGHT}
      columns={3}
      pixel={3}
      className={cn("[--cell:3px] opacity-80", className)}
    />
  );
}
