import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ZephorTech — IT Solutions & Digital Transformation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080D14",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,118,209,0.18), transparent)",
          }}
        />

        {/* Grid pattern via border trick */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.035,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            Zephor
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#0076D1",
              letterSpacing: "-0.02em",
            }}
          >
            Tech
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            letterSpacing: "-0.01em",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          IT Solutions & Digital Transformation
        </div>

        {/* Sub-tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            maxWidth: 680,
          }}
        >
          70+ projects delivered · FinTech, SaaS, E-Commerce, Healthcare
        </div>

        {/* Bottom accent strip */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent 0%, #0076D1 50%, transparent 100%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
