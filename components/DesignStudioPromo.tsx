"use client";

import Link from "next/link";
import {
  Sparkles,
  ScanLine,
  LayoutGrid,
  Image as ImageIcon,
  Type,
  Palette,
  CalendarClock,
  PenTool,
  Ruler,
  Brush,
  Shapes,
  Layers,
  ArrowRight,
} from "lucide-react";

const TILES = [
  { label: "Brand Scan", Icon: ScanLine, accent: "#6C8CF7" },
  { label: "AI Carousels", Icon: LayoutGrid, accent: "#22C7B8" },
  { label: "Captions", Icon: Type, accent: "#8B7CF6" },
  { label: "AI Images", Icon: ImageIcon, accent: "#F2B441" },
  { label: "Brand Kit", Icon: Palette, accent: "#F2748B" },
  { label: "Scheduler", Icon: CalendarClock, accent: "#56C271" },
];

const DECO = [PenTool, Ruler, Palette, Brush, ImageIcon, Type, Shapes, Layers];

export function DesignStudioPromo() {
  return (
    <Link
      href="/tools/jdesigns-studio"
      aria-label="Open ToolStack Design Studio — AI ad & campaign tool"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
      className="ds-promo"
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 24,
          background: "linear-gradient(155deg,#EEF1FF 0%,#F2F0FF 50%,#FBF6FF 100%)",
          border: "1px solid #E4E0F5",
          padding: "40px 28px 0",
          boxShadow: "0 18px 50px -28px rgba(70,60,140,.45)",
        }}
      >
        {/* premium pill */}
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#16131F",
            color: "#F4E7C9",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: ".12em",
            padding: "6px 11px",
            borderRadius: 999,
            zIndex: 3,
          }}
        >
          <Sparkles size={12} /> PREMIUM
        </div>

        {/* soft glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -110,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle,#DCE2FF 0%,rgba(220,226,255,0) 70%)",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          {/* logo + wordmark */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13, marginBottom: 14 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 13,
                background: "#16131F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(22,19,31,.3)",
              }}
            >
              <Sparkles size={25} color="#fff" strokeWidth={2.2} />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
              <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: "italic", fontWeight: 600, fontSize: 34, letterSpacing: "-.01em", color: "#16131F" }}>
                ToolStack
              </span>
              <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: ".24em", textTransform: "uppercase", color: "#9A93B8" }}>
                Design Studio
              </span>
            </div>
          </div>

          <p style={{ maxWidth: 600, margin: "0 auto 26px", fontSize: 16.5, lineHeight: 1.5, color: "#4B4760", fontWeight: 500 }}>
            Scan any brand and craft scroll-stopping, on-brand carousels — AI ideas, captions, and
            branded visuals, ready to post. Our premium AI design studio.
          </p>

          {/* tiles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(118px,1fr))",
              gap: 16,
              maxWidth: 760,
              margin: "0 auto 26px",
            }}
          >
            {TILES.map(({ label, Icon, accent }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: 88,
                    borderRadius: 15,
                    background: "#fff",
                    boxShadow: "0 9px 22px -14px rgba(60,50,120,.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: `4px solid ${accent}`,
                  }}
                >
                  <Icon size={31} color={accent} strokeWidth={1.8} />
                </div>
                <div style={{ marginTop: 9, fontSize: 13, fontWeight: 700, color: "#3A3550" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA (styled span — block is already a Link) */}
          <span
            className="ds-promo-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#6C5CE7",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              padding: "13px 26px",
              borderRadius: 12,
              marginBottom: 30,
              boxShadow: "0 10px 24px -8px rgba(108,92,231,.6)",
            }}
          >
            Open Design Studio <ArrowRight size={17} />
          </span>
        </div>

        {/* decorative line-art baseline */}
        <div
          aria-hidden
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            opacity: 0.13,
            paddingTop: 6,
          }}
        >
          {DECO.map((Icon, i) => (
            <Icon key={i} size={i % 2 === 0 ? 46 : 34} color="#3A3550" strokeWidth={1.4} style={{ transform: `translateY(${i % 2 === 0 ? 8 : 0}px)` }} />
          ))}
        </div>
      </div>

      <style>{`
        .ds-promo { transition: transform .25s ease; }
        .ds-promo:hover { transform: translateY(-3px); }
        .ds-promo:hover .ds-promo-cta { background: #5a4bd6; }
      `}</style>
    </Link>
  );
}

export default DesignStudioPromo;
