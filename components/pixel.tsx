import { cn } from "@/lib/utils";

const Z = [0b1111111, 0b0000010, 0b0000100, 0b0001000, 0b0010000, 0b0100000, 0b1111111];
const SLASHED_ZERO = [0b0111110, 0b1000011, 0b1000101, 0b1001001, 0b1010001, 0b1100001, 0b0111110];

const HEADING: Record<string, number[]> = {
  " ": [0, 0, 0, 0, 0, 0, 0],
  "/": [0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0, 0],
  "-": [0, 0, 0, 0b11111, 0, 0, 0],
  ".": [0, 0, 0, 0, 0, 0, 0b00100],
  "0": [0b01110, 0b10001, 0b10011, 0b10101, 0b11001, 0b10001, 0b01110],
  "1": [0b00100, 0b01100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
  "2": [0b01110, 0b10001, 0b00001, 0b00010, 0b00100, 0b01000, 0b11111],
  "3": [0b01110, 0b10001, 0b00001, 0b00110, 0b00001, 0b10001, 0b01110],
  "4": [0b00010, 0b00110, 0b01010, 0b10010, 0b11111, 0b00010, 0b00010],
  "5": [0b11111, 0b10000, 0b11110, 0b00001, 0b00001, 0b10001, 0b01110],
  "6": [0b01110, 0b10000, 0b10000, 0b11110, 0b10001, 0b10001, 0b01110],
  "7": [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b01000, 0b01000],
  "8": [0b01110, 0b10001, 0b10001, 0b01110, 0b10001, 0b10001, 0b01110],
  "9": [0b01110, 0b10001, 0b10001, 0b01111, 0b00001, 0b00001, 0b01110],
  A: [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  B: [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110],
  C: [0b01110, 0b10001, 0b10000, 0b10000, 0b10000, 0b10001, 0b01110],
  D: [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
  E: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
  F: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000],
  G: [0b01110, 0b10001, 0b10000, 0b10111, 0b10001, 0b10001, 0b01110],
  H: [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  I: [0b01110, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
  J: [0b00111, 0b00010, 0b00010, 0b00010, 0b00010, 0b10010, 0b01100],
  K: [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001],
  L: [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
  M: [0b10001, 0b11011, 0b10101, 0b10101, 0b10001, 0b10001, 0b10001],
  N: [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
  O: [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  P: [0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000],
  Q: [0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b10010, 0b01101],
  R: [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
  S: [0b01111, 0b10000, 0b10000, 0b01110, 0b00001, 0b00001, 0b11110],
  T: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
  U: [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  V: [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b00100],
  W: [0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b10101, 0b01010],
  X: [0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001],
  Y: [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
  Z: [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111],
};

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
  className,
}: {
  rows: number[];
  columns: number;
  pixel: number;
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
      {on.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  );
}

export function PixelWordmark({
  pixel = 5,
  className,
}: {
  pixel?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-start text-foreground", className)}
      role="img"
      aria-label="Z0"
    >
      <Bitmap rows={Z} columns={7} pixel={pixel} />
      <span style={{ width: pixel }} />
      <Bitmap rows={SLASHED_ZERO} columns={7} pixel={pixel} />
    </div>
  );
}

export function PixelHeading({
  text,
  pixel = 2,
  tracking = 1,
  className,
}: {
  text: string;
  pixel?: number;
  tracking?: number;
  className?: string;
}) {
  const glyphs = Array.from(text.toUpperCase());
  const stride = 5 + tracking;
  const width = glyphs.length * 5 + Math.max(glyphs.length - 1, 0) * tracking;
  const rects = glyphs.flatMap((character, index) =>
    cells(HEADING[character] ?? HEADING[" "], 5).map(([x, y]) => [
      x + index * stride,
      y,
    ]),
  );

  return (
    <svg
      width={width * pixel}
      height={7 * pixel}
      viewBox={`0 0 ${width} 7`}
      className={cn("shrink-0 fill-current text-muted-foreground", className)}
      aria-hidden
    >
      {rects.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  );
}
