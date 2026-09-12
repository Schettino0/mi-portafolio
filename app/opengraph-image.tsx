import { ImageResponse } from "next/og";

export const alt = "Eduardo Schettino — Ingeniero de Automatización y Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#111110",
          color: "#f2f0eb",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c8502a",
            marginBottom: 28,
          }}
        >
          Ingeniero de Automatización &amp; Software
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 300, lineHeight: 1 }}>
          Eduardo&nbsp;
          <span style={{ fontStyle: "italic", color: "#a8a29e" }}>Schettino</span>
        </div>
        <div style={{ fontSize: 26, color: "#78716c", marginTop: 40, letterSpacing: 2 }}>
          PLC · SCADA · HMI · AVEVA · React · TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}
