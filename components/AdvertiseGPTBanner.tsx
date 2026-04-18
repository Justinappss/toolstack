"use client";
import { useState } from "react";
import Link from "next/link";

const AI_MODELS = ["ChatGPT", "Gemini", "Perplexity", "Claude", "Copilot", "Meta AI"];

export function AdvertiseGPTBanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      margin: "72px auto 0",
      maxWidth: 900,
      borderRadius: 24,
      position: "relative",
      overflow: "hidden",
      isolation: "isolate",
    }}>
      {/* Animated gradient border */}
      <div className="agpt-border-glow" style={{
        position: "absolute", inset: 0, borderRadius: 24,
        padding: 1,
        background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1)",
        backgroundSize: "300% 300%",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "exclude" as "xor",
        maskComposite: "exclude",
        zIndex: 1,
      }} />

      {/* Inner content */}
      <div style={{
        position: "relative",
        background: "linear-gradient(145deg, rgba(15,15,25,0.97) 0%, rgba(20,15,35,0.97) 100%)",
        borderRadius: 24,
        padding: "44px 48px 40px",
        zIndex: 2,
      }}>
        {/* Multiple glow blobs */}
        <div style={{ position: "absolute", top: -80, left: -40, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: -60, right: -30, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Top row: badge + AI model pills */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24, position: "relative" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.15))",
            border: "1px solid rgba(139,92,246,0.35)",
            borderRadius: 99, padding: "5px 16px",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", color: "#c4b5fd" }}>SCANNING 10+ AI MODELS</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {AI_MODELS.map(m => (
              <span key={m} style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                padding: "4px 10px", borderRadius: 99,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
              }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Main content row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>

          {/* Left: headline + description */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <h3 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 12px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Is your brand{" "}
              <span style={{
                background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>invisible</span>{" "}
              to AI?
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: "0 0 20px", lineHeight: 1.7, maxWidth: 420 }}>
              AdvertsGPT scans your website across <strong style={{ color: "rgba(255,255,255,0.8)" }}>10 AI models</strong> in 60 seconds — and shows you exactly how to rank in AI search results before your competitors do.
            </p>

            {/* Trust signals */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { value: "10+", label: "AI models scanned" },
                { value: "60s", label: "Full audit" },
                { value: "Free", label: "No credit card" },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: "#a78bfa", margin: "0 0 1px" }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 600 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA card */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
            padding: "28px 32px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            minWidth: 220,
          }}>
            {/* Mini score preview */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15))",
                border: "1px solid rgba(239,68,68,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 900, color: "#f87171",
              }}>32</div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 800, color: "#f87171", margin: 0 }}>POOR</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>Average brand score</p>
              </div>
            </div>

            <Link
              href="https://advertsgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                width: "100%",
                background: hovered
                  ? "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #f472b6 100%)"
                  : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                color: "white", fontWeight: 800, fontSize: 15,
                padding: "14px 28px", borderRadius: 12,
                textDecoration: "none", whiteSpace: "nowrap",
                boxShadow: hovered
                  ? "0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(236,72,153,0.2)"
                  : "0 0 32px rgba(139,92,246,0.35)",
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.25s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              Check Your AI Score
            </Link>

            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 500, textAlign: "center" }}>
              Free instant audit — takes 60 seconds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
