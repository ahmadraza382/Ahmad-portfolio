import { ImageResponse } from "next/og";

// Favicon generated in code — the round "a" mark used in the nav.
// Edge runtime: the Node build of @vercel/og crashes ("Invalid URL")
// when prerendering on Windows; the edge build has no such issue.
export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#1f6e5a",
          color: "#ffffff",
          fontSize: 42,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          paddingBottom: 6,
        }}
      >
        a
      </div>
    ),
    { ...size }
  );
}
