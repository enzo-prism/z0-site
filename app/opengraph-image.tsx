import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOWERCASE_Z = [0b1111111, 0b0000110, 0b0001000, 0b0110000, 0b1111111];
const ZERO = [0b0111110, 0b1000011, 0b1000101, 0b1001001, 0b1010001, 0b1100001, 0b0111110];

function Glyph({ rows, columns }: { rows: number[]; columns: number }) {
  const pixel = 14;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {rows.map((bits, row) => (
        <div key={row} style={{ display: "flex" }}>
          {Array.from({ length: columns }, (_, column) => {
            const on = (bits & (1 << (columns - 1 - column))) !== 0;
            return (
              <div
                key={column}
                style={{
                  width: pixel,
                  height: pixel,
                  background: on ? "#F4F1EC" : "transparent",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090A",
          color: "#F4F1EC",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              letterSpacing: 6,
              opacity: 0.5,
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            z0 / STAGE 1
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
            <Glyph rows={LOWERCASE_Z} columns={7} />
            <Glyph rows={ZERO} columns={7} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 40, letterSpacing: -1 }}>
            Mac companion for official Technic
          </div>
          <div style={{ fontSize: 22, opacity: 0.58 }}>
            Play stays in Technic. Z0 never launches Minecraft.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
