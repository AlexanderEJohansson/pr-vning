import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — monogram P on emerald (matches brand, no emoji). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#059669",
          borderRadius: 36,
          color: "white",
          fontSize: 100,
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
