import { ImageResponse } from "next/og";

export const alt = "Prövning.se — höj gymnasiebetyg, anmäl dig och öva matte";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(145deg, #ecfdf5 0%, #ffffff 45%, #f0fdf4 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#059669",
              color: "white",
              fontSize: 40,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            P
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#064e3b",
            }}
          >
            Prövning.se
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Höj gymnasiebetyg via prövning
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#475569",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Anmälan steg för steg · gratis övning i Matematik 1–3 · inte en myndighetssajt
        </div>
      </div>
    ),
    { ...size }
  );
}
