import { cn } from "@/lib/utils";

const Z = [0b1111111, 0b0000010, 0b0000100, 0b0001000, 0b0010000, 0b0100000, 0b1111111];
const SLASHED_ZERO = [0b0111110, 0b1000011, 0b1000101, 0b1001001, 0b1010001, 0b1100001, 0b0111110];

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
  className,
}: {
  rows: number[];
  columns: number;
  pixel: number;
  boot?: boolean;
  delay?: number;
  className?: string;
}) {
  const on = cells(rows, columns);
  return (
    <svg
      width={columns * pixel}
      height={rows.length * pixel}
      viewBox={`0 0 ${columns} ${rows.length}`}
      className={cn("shrink-0 fill-current", className)}
      aria-hidden
    >
      {on.map(([x, y], index) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="1"
          height="1"
          className={boot ? "boot-cell" : undefined}
          style={
            boot
              ? { animationDelay: `${delay + index * 14}ms` }
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
  className,
}: {
  pixel?: number;
  boot?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-start text-foreground", className)}
      role="img"
      aria-label="Z0"
    >
      <Bitmap rows={Z} columns={7} pixel={pixel} boot={boot} />
      <span style={{ width: pixel }} />
      <Bitmap
        rows={SLASHED_ZERO}
        columns={7}
        pixel={pixel}
        boot={boot}
        delay={280}
      />
    </div>
  );
}
