import { ImageResponse } from "next/og";

// Open Graph card (link previews on LinkedIn, WhatsApp, X, Slack…).
// Generated in code — no static asset needed.
// Edge runtime: the Node build of @vercel/og crashes ("Invalid URL")
// when prerendering on Windows; the edge build has no such issue.
export const runtime = "edge";
export const alt = "Ahmad Raza — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcfcfa",
          color: "#16190f",
          padding: 72,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            fontFamily: "monospace",
            color: "#1f6e5a",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#1f6e5a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontStyle: "italic",
              paddingBottom: 4,
            }}
          >
            a
          </div>
          AHMAD RAZA
        </div>

        {/* 66px: satori renders in its bundled Noto Sans (Georgia is
            ignored), which is wider — at 84px the second line clips. */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 66, lineHeight: 1.05, display: "flex" }}>
            Your idea,
          </div>
          <div style={{ fontSize: 66, lineHeight: 1.05, display: "flex" }}>
            designed, built{" "}
            <span style={{ fontStyle: "italic", color: "#1f6e5a", marginLeft: 16 }}>
              and launched.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            fontFamily: "monospace",
            color: "#6b7060",
          }}
        >
          <div style={{ display: "flex" }}>Full-Stack Developer</div>
          <div style={{ display: "flex" }}>Web · Mobile · E-commerce · SEO</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
