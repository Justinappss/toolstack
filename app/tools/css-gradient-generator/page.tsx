"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check, RotateCcw, Plus, Trash2, Sparkles } from "lucide-react";
import Link from "next/link";
import { saveToHistory } from "@/components/HistorySidebar";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";
import { MoreTools } from "@/components/MoreTools";

// ─── CONFIG ─────────────────────────────────────────────────────────────────

type GradientType = "linear" | "radial" | "conic";

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

const PRESETS: { name: string; stops: { color: string; position: number }[]; angle: number; type: GradientType }[] = [
  { name: "Ocean", stops: [{ color: "#667eea", position: 0 }, { color: "#764ba2", position: 100 }], angle: 135, type: "linear" },
  { name: "Sunset", stops: [{ color: "#f093fb", position: 0 }, { color: "#f5576c", position: 100 }], angle: 135, type: "linear" },
  { name: "Mint", stops: [{ color: "#0ba360", position: 0 }, { color: "#3cba92", position: 100 }], angle: 135, type: "linear" },
  { name: "Fire", stops: [{ color: "#f12711", position: 0 }, { color: "#f5af19", position: 100 }], angle: 135, type: "linear" },
  { name: "Night Sky", stops: [{ color: "#0f0c29", position: 0 }, { color: "#302b63", position: 50 }, { color: "#24243e", position: 100 }], angle: 135, type: "linear" },
  { name: "Peach", stops: [{ color: "#ffecd2", position: 0 }, { color: "#fcb69f", position: 100 }], angle: 135, type: "linear" },
  { name: "Sky", stops: [{ color: "#a1c4fd", position: 0 }, { color: "#c2e9fb", position: 100 }], angle: 135, type: "linear" },
  { name: "Berry", stops: [{ color: "#8e2de2", position: 0 }, { color: "#4a00e0", position: 100 }], angle: 135, type: "linear" },
  { name: "Cyber", stops: [{ color: "#00f260", position: 0 }, { color: "#0575e6", position: 100 }], angle: 135, type: "linear" },
  { name: "Aurora", stops: [{ color: "#43e97b", position: 0 }, { color: "#38f9d7", position: 50 }, { color: "#fa709a", position: 100 }], angle: 135, type: "linear" },
  { name: "Dusk", stops: [{ color: "#2c3e50", position: 0 }, { color: "#fd746c", position: 100 }], angle: 135, type: "linear" },
  { name: "Neon", stops: [{ color: "#ff00cc", position: 0 }, { color: "#333399", position: 100 }], angle: 135, type: "linear" },
];

const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const HOW_IT_WORKS = [
  { step: "01", title: "Pick Your Colours", body: "Add colour stops to the gradient bar. Click any stop to change its colour, or drag to reposition it.", color: "#6366f1", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.25)" },
  { step: "02", title: "Choose Direction", body: "Select linear, radial or conic gradient type. Adjust the angle with the visual picker or preset buttons.", color: "#38bdf8", bg: "rgba(56,189,248,0.10)", border: "rgba(56,189,248,0.25)" },
  { step: "03", title: "Copy CSS Code", body: "The CSS code updates in real-time. Copy with one click and paste directly into your stylesheet or component.", color: "#34d399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.25)" },
];

const FAQS = [
  {
    q: "What is a CSS gradient?",
    a: "A CSS gradient is a smooth transition between two or more colours, rendered natively by the browser without images. CSS supports three types: linear-gradient (colours flow in a straight line), radial-gradient (colours radiate from a centre point), and conic-gradient (colours sweep around a centre point like a colour wheel). Gradients are resolution-independent and performant.",
  },
  {
    q: "How do I use a CSS gradient as a background?",
    a: "Set the background property on any element: background: linear-gradient(135deg, #667eea 0%, #764ba2 100%). The first value is the angle, followed by colour stops with optional position percentages. You can layer multiple gradients using commas between each.",
  },
  {
    q: "What is the difference between linear and radial gradients?",
    a: "A linear gradient transitions colours along a straight line at a specified angle (e.g., top-to-bottom, left-to-right, or diagonal). A radial gradient transitions colours outward from a centre point in a circular or elliptical shape. Linear is used for backgrounds and overlays; radial is popular for spotlight effects and buttons.",
  },
  {
    q: "Can I add more than two colours to a gradient?",
    a: "Yes. CSS gradients support unlimited colour stops. Each stop can have its own position percentage. For example: linear-gradient(90deg, red 0%, yellow 25%, green 50%, blue 75%, violet 100%) creates a rainbow effect. Our tool lets you add and remove stops visually.",
  },
  {
    q: "Is this CSS gradient generator free?",
    a: "Yes, 100% free with unlimited use. No signup, no watermark, no limitations. Generate as many gradients as you need and copy the CSS code instantly. Most premium design tools charge for gradient libraries \u2014 ToolStack provides this free.",
  },
  {
    q: "What is the best CSS gradient generator?",
    a: "ToolStack\u2019s CSS Gradient Generator is the top-rated free tool for 2026. Unlike cssgradient.io (outdated UI) or webgradients.com (presets only, no editor), we offer a full visual editor with linear, radial and conic modes, 12+ curated presets, multi-stop colour control, and real-time CSS output \u2014 all in a premium dark UI.",
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

let idCounter = 0;
function uid() { return `stop-${++idCounter}-${Date.now()}`; }

function buildCSS(type: GradientType, angle: number, stops: ColorStop[]): string {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const colorStr = sorted.map(s => `${s.color} ${s.position}%`).join(", ");
  if (type === "linear") return `linear-gradient(${angle}deg, ${colorStr})`;
  if (type === "radial") return `radial-gradient(circle, ${colorStr})`;
  return `conic-gradient(from ${angle}deg, ${colorStr})`;
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function CSSGradientGenerator() {
  const [stops, setStops] = useState<ColorStop[]>([
    { id: uid(), color: "#6366f1", position: 0 },
    { id: uid(), color: "#38bdf8", position: 100 },
  ]);
  const [angle, setAngle] = useState(135);
  const [gradType, setGradType] = useState<GradientType>("linear");
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const gradient = useMemo(() => buildCSS(gradType, angle, stops), [gradType, angle, stops]);
  const cssCode = `background: ${gradient};`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    saveToHistory({ toolName: "CSS Gradient Generator", slug: "css-gradient-generator", data: { gradient, angle, gradType } });
  }, [cssCode, gradient, angle, gradType]);

  const addStop = () => {
    if (stops.length >= 8) return;
    const midPos = Math.round(stops.reduce((sum, s) => sum + s.position, 0) / stops.length);
    setStops(prev => [...prev, { id: uid(), color: "#fbbf24", position: Math.min(midPos, 95) }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter(s => s.id !== id));
  };

  const updateStop = (id: string, field: "color" | "position", value: string | number) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setStops(preset.stops.map(s => ({ ...s, id: uid() })));
    setAngle(preset.angle);
    setGradType(preset.type);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "white",
    outline: "none", fontSize: 13,
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 6,
  };
  const cardBg: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "5%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Free CSS Gradient Generator — ToolStack",
          "description": "Create beautiful CSS gradients with a visual editor. Linear, radial and conic gradients with multi-stop colours. Copy CSS code instantly.",
          "url": "https://toolstack.tech/tools/css-gradient-generator",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["Linear Gradient Builder", "Radial Gradient Builder", "Conic Gradient Builder", "12+ Curated Presets", "Multi-Stop Colour Control", "Visual Angle Picker", "Real-Time CSS Output", "One-Click Copy"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools?category=dev" },
            { "@type": "ListItem", "position": 3, "name": "CSS Gradient Generator", "item": "https://toolstack.tech/tools/css-gradient-generator" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Dev Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>CSS Gradient Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#c7d2fe" }}>{"\u2713"} CSS Gradient Generator {"\u00b7"} Visual Editor {"\u00b7"} Free Forever {"\u00b7"} No Signup</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            CSS Gradient<br />
            <span style={{ background: "linear-gradient(135deg, #6366f1 0%, #38bdf8 50%, #34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Visual Builder.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Create stunning linear, radial and conic CSS gradients with a visual editor. Pick colours, adjust angles, choose from 12+ presets and copy production-ready CSS in one click.
          </p>
        </div>

        {/* ── Live Preview ──────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            width: "100%", height: 240, borderRadius: 20, background: gradient,
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 16px 64px rgba(0,0,0,0.4), inset 0 0 120px rgba(255,255,255,0.02)",
            transition: "background 0.3s ease",
          }} />
        </div>

        {/* ── CSS Output ──────────────────────────────────────── */}
        <div style={{ ...cardBg, marginBottom: 24, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <code style={{ flex: 1, minWidth: 200, fontSize: 13, color: "#c7d2fe", fontFamily: "'SF Mono', 'Fira Code', monospace", wordBreak: "break-all", lineHeight: 1.6 }}>
            {cssCode}
          </code>
          <button onClick={handleCopy} style={{
            padding: "10px 20px", borderRadius: 12, border: "none", cursor: "pointer",
            background: copied ? "#34d399" : "#6366f1", color: "white",
            fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8,
            boxShadow: copied ? "0 4px 20px rgba(52,211,153,0.3)" : "0 4px 20px rgba(99,102,241,0.3)",
            transition: "all 0.2s", flexShrink: 0,
          }}>
            {copied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy CSS</>}
          </button>
        </div>

        {/* ── Controls ──────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 64 }}>

          {/* Left: Type + Angle + Stops */}
          <div style={cardBg}>
            {/* Gradient Type */}
            <div style={{ marginBottom: 24 }}>
              <p style={labelStyle}>Gradient Type</p>
              <div style={{ display: "flex", gap: 8 }}>
                {(["linear", "radial", "conic"] as GradientType[]).map(t => (
                  <button key={t} onClick={() => setGradType(t)} style={{
                    flex: 1, padding: "10px", borderRadius: 12, cursor: "pointer",
                    background: gradType === t ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${gradType === t ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.08)"}`,
                    color: gradType === t ? "white" : "rgba(255,255,255,0.5)",
                    fontSize: 13, fontWeight: 700, textTransform: "capitalize" as const, transition: "all 0.15s",
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Angle */}
            {gradType !== "radial" && (
              <div style={{ marginBottom: 24 }}>
                <p style={labelStyle}>Angle: {angle}°</p>
                <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} style={{ width: "100%", accentColor: "#6366f1" }} />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                  {ANGLES.map(a => (
                    <button key={a} onClick={() => setAngle(a)} style={{
                      padding: "5px 12px", borderRadius: 8, cursor: "pointer",
                      background: angle === a ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${angle === a ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.06)"}`,
                      color: angle === a ? "#c7d2fe" : "rgba(255,255,255,0.4)",
                      fontSize: 11, fontWeight: 700, transition: "all 0.15s",
                    }}>{a}°</button>
                  ))}
                </div>
              </div>
            )}

            {/* Colour Stops */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ ...labelStyle, margin: 0 }}>Colour Stops ({stops.length}/8)</p>
                <button onClick={addStop} disabled={stops.length >= 8} style={{
                  padding: "5px 12px", borderRadius: 8, cursor: stops.length >= 8 ? "not-allowed" : "pointer",
                  background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
                  color: "#c7d2fe", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4,
                  opacity: stops.length >= 8 ? 0.4 : 1,
                }}>
                  <Plus size={12} /> Add
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {stops.map((stop, i) => (
                  <div key={stop.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="color" value={stop.color} onChange={e => updateStop(stop.id, "color", e.target.value)} style={{
                      width: 36, height: 36, border: "2px solid rgba(255,255,255,0.15)", borderRadius: 10, cursor: "pointer",
                      background: "none", padding: 0,
                    }} />
                    <input value={stop.color} onChange={e => updateStop(stop.id, "color", e.target.value)} style={{ ...inputStyle, flex: 1, fontFamily: "monospace", fontSize: 12 }} />
                    <input type="number" min={0} max={100} value={stop.position} onChange={e => updateStop(stop.id, "position", Number(e.target.value))} style={{ ...inputStyle, width: 64, textAlign: "center" as const, fontSize: 12 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>%</span>
                    <button onClick={() => removeStop(stop.id)} disabled={stops.length <= 2} style={{
                      padding: 6, borderRadius: 8, cursor: stops.length <= 2 ? "not-allowed" : "pointer",
                      background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
                      color: "#f87171", opacity: stops.length <= 2 ? 0.3 : 1, transition: "all 0.15s",
                    }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Presets */}
          <div style={cardBg}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Sparkles size={16} style={{ color: "#fbbf24" }} />
              <p style={{ ...labelStyle, margin: 0 }}>Curated Presets</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
              {PRESETS.map(p => (
                <button key={p.name} onClick={() => applyPreset(p)} style={{
                  borderRadius: 14, overflow: "hidden", cursor: "pointer",
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                  padding: 0, transition: "all 0.15s",
                }}>
                  <div style={{
                    height: 56,
                    background: buildCSS(p.type, p.angle, p.stops.map((s, i) => ({ ...s, id: `p-${i}` }))),
                  }} />
                  <div style={{ padding: "8px 10px" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Three steps to production-ready CSS gradients.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} style={{ padding: "22px 20px", borderRadius: 18, background: item.bg, border: `1px solid ${item.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: item.color, marginBottom: 12 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ───────────────────────────────────────── */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>The Complete Guide to CSS Gradients in 2026</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            CSS gradients are one of the most powerful visual tools in modern web design. They eliminate the need for background images, load instantly, scale to any resolution, and are supported by every major browser. A well-crafted gradient can transform a flat interface into a <strong style={{ color: "white" }}>premium, immersive experience</strong> that holds attention and reinforces brand identity.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Linear Gradients", d: "The most common type. Colours transition along a straight line at a specified angle. Use for hero sections, buttons, and card backgrounds. The angle property controls direction \u2014 0deg is bottom-to-top, 90deg is left-to-right, 135deg is the classic diagonal." },
              { t: "Radial Gradients", d: "Colours radiate outward from a centre point. Perfect for spotlight effects, glow overlays, and button hover states. The shape can be circular or elliptical, and the centre position is adjustable for off-centre effects." },
              { t: "Conic Gradients", d: "Colours sweep around a centre point like a colour wheel. Ideal for pie charts, loading spinners, and decorative elements. Conic gradients are the newest addition to CSS and supported in all modern browsers since 2022." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                  width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" as const,
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>{faq.q}</h3>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 12, transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 22px 18px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <MoreTools currentSlug="css-gradient-generator" />
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
