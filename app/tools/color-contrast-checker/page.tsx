"use client";

import { useState, useMemo, useCallback } from "react";
import { Check, Copy, RefreshCcw, Info, ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { saveToHistory } from "@/components/HistorySidebar";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";
import { MoreTools } from "@/components/MoreTools";

// ─── UTILS ──────────────────────────────────────────────────────────────────

function hexToRgb(hex: string) {
  let c = hex.replace(/^#/, "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const num = parseInt(c, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getRatio(color1: string, color2: string) {
  try {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const l1 = luminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = luminance(rgb2.r, rgb2.g, rgb2.b);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return parseFloat(ratio.toFixed(2));
  } catch (e) {
    return 1;
  }
}

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  { step: "01", title: "Select Colours", body: "Enter a hex code or use the colour picker for your text and background colours. The tool supports real-time editing.", color: "#8b5cf6", bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.25)" },
  { step: "02", title: "Check Contrast Ratio", body: "The tool automatically calculates the relative luminance and displays the precise contrast ratio.", color: "#3b82f6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)" },
  { step: "03", title: "Verify Compliance", body: "Instantly see if your combination passes WCAG 2.1 AA and AAA standards for normal and large text sizes.", color: "#10b981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)" },
];

const FAQS = [
  {
    q: "What is colour contrast in web design?",
    a: "Colour contrast refers to the difference in light between font (or anything in the foreground) and its background. In web accessibility, it's measured as a ratio. A higher ratio means better readability for all users, particularly those with visual impairments.",
  },
  {
    q: "What are WCAG AA and AAA standards?",
    a: "WCAG (Web Content Accessibility Guidelines) defines international accessibility standards. 'AA' is the standard level required by most legislation (like the ADA or European Accessibility Act), demanding a 4.5:1 contrast for normal text. 'AAA' is the highest, strictest level, requiring a 7:1 ratio for normal text.",
  },
  {
    q: "What is considered 'large text' by WCAG?",
    a: "WCAG defines 'large text' as being at least 18pt (usually 24px) if not bold, or at least 14pt (usually 18.5px) if bold. Because larger text is naturally easier to read, the contrast requirements are slightly lower (3:1 for AA, 4.5:1 for AAA).",
  },
  {
    q: "How to fix a failing contrast ratio?",
    a: "If your combination fails, you must either darken the darker colour or lighten the lighter colour. You can use our colour pickers to slowly drag the shade until you achieve a passing 'AA' or 'AAA' green badge.",
  },
  {
    q: "Does this check UI components and icons?",
    a: "Yes. For non-text elements (like icons, input borders, and buttons), the WCAG 2.1 standard requires a contrast ratio of at least 3:1 against adjacent colours. You can use the 'Large Text / UI' result to verify these components.",
  },
  {
    q: "What is the best free colour contrast checker?",
    a: "ToolStack's Colour Contrast Checker is the most reliable, free, real-time visual checker. Unlike standard checkers, it provides a premium dark UI, instant live previews of your exact typography sizes, and 100% privacy since all calculations are processed securely in your browser.",
  },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px", borderRadius: 12,
      background: pass ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
      border: `1px solid ${pass ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{label}</span>
      <span style={{
        fontSize: 12, fontWeight: 800, textTransform: "uppercase",
        padding: "4px 10px", borderRadius: 20,
        background: pass ? "#10b981" : "#ef4444", color: "white"
      }}>
        {pass ? "Pass" : "Fail"}
      </span>
    </div>
  );
}

export default function ColorContrastChecker() {
  const [textCol, setTextCol] = useState("#ffffff");
  const [bgCol, setBgCol] = useState("#6366f1");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const ratio = useMemo(() => getRatio(textCol, bgCol), [textCol, bgCol]);

  // WCAG Requirements
  const passesAANormal = ratio >= 4.5;
  const passesAAANormal = ratio >= 7.0;
  const passesAALarge = ratio >= 3.0;
  const passesAAALarge = ratio >= 4.5;

  const handleSwap = () => {
    setTextCol(bgCol);
    setBgCol(textCol);
  };

  const handleRandom = () => {
    const rH = () => Math.floor(Math.random() * 255).toString(16).padStart(2, "0");
    setTextCol(`#${rH()}${rH()}${rH()}`);
    setBgCol(`#${rH()}${rH()}${rH()}`);
  };

  // Track History (Debounced essentially or just on unmount/blur)
  const trackHistory = useCallback(() => {
    saveToHistory({ toolName: "Contrast Checker", slug: "color-contrast-checker", data: { textCol, bgCol, ratio } });
  }, [textCol, bgCol, ratio]);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white",
    outline: "none", fontSize: 15, fontFamily: "'SF Mono', monospace",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 8,
  };
  const cardBg: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "32px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Free Colour Contrast Checker — ToolStack",
          "description": "Check your colour combinations against WCAG 2.1 accessibility guidelines. Free, visual contrast checker for AA and AAA compliance.",
          "url": "https://toolstack.tech/tools/color-contrast-checker",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["WCAG AA Testing", "WCAG AAA Testing", "Relative Luminance Calculator", "Large & Normal Text Previews", "Real-time updates"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Utility Tools", "item": "https://toolstack.tech/tools?category=utility" },
            { "@type": "ListItem", "position": 3, "name": "Colour Contrast Checker", "item": "https://toolstack.tech/tools/color-contrast-checker" },
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
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Utility Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Colour Contrast Checker</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#ddd6fe" }}>{"\u2713"} Accessibility Checker {"\u00b7"} WCAG 2.1 Compliant {"\u00b7"} Free Forever</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Colour Contrast<br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              WCAG Testing.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Ensure your website is accessible to everyone. Check text and background colour combinations against WCAG 2.1 AA and AAA relative luminance standards.
          </p>
        </div>

        {/* ── Tool Interface ──────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 64 }}>
          
          {/* LEFT: Inputs & Ratio */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={cardBg}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
                <div style={{ flex: 1 }}>
                  <p style={labelStyle}>Text Colour</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <input type="color" value={textCol} onChange={e => setTextCol(e.target.value)} onBlur={trackHistory} style={{
                      width: 48, height: 48, border: "2px solid rgba(255,255,255,0.15)", borderRadius: 12, cursor: "pointer", background: "none", padding: 0
                    }} />
                    <input type="text" value={textCol} onChange={e => setTextCol(e.target.value)} onBlur={trackHistory} style={{ ...inputStyle, textTransform: "uppercase" }} />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center", margin: "-12px 0 12px", position: "relative", zIndex: 10 }}>
                <button onClick={handleSwap} style={{
                  padding: 10, borderRadius: "50%", background: "#1e1e2d", border: "1px solid rgba(255,255,255,0.1)",
                  color: "white", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
                }} title="Swap colours">
                  <ArrowRightLeft size={16} />
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <p style={labelStyle}>Background Colour</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <input type="color" value={bgCol} onChange={e => setBgCol(e.target.value)} onBlur={trackHistory} style={{
                      width: 48, height: 48, border: "2px solid rgba(255,255,255,0.15)", borderRadius: 12, cursor: "pointer", background: "none", padding: 0
                    }} />
                    <input type="text" value={bgCol} onChange={e => setBgCol(e.target.value)} onBlur={trackHistory} style={{ ...inputStyle, textTransform: "uppercase" }} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ ...cardBg, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <p style={labelStyle}>Contrast Ratio</p>
              <h2 style={{ fontSize: 64, fontWeight: 900, color: "white", margin: "10px 0 0", lineHeight: 1 }}>{ratio}<span style={{ fontSize: 32, color: "rgba(255,255,255,0.3)" }}>:1</span></h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "16px 0 0" }}>
                {ratio >= 4.5 ? "Good contrast \u2014 highly readable." : "Poor contrast \u2014 hard to read."}
              </p>
            </div>
          </div>

          {/* RIGHT: Visual Preview & Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Visual Preview */}
            <div style={{
              background: bgCol, color: textCol, borderRadius: 24, padding: "40px",
              boxShadow: "0 16px 64px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)",
              transition: "all 0.2s ease"
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: 20 }}>Live Preview</p>
              <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.2 }}>Large Text Preview</h2>
              <p style={{ fontSize: 16, margin: 0, lineHeight: 1.6, opacity: 0.85 }}>This is normal text. It should be easy to read and comfortable for long-form content. Ensuring high contrast protects visually impaired users.</p>
            </div>

            {/* Compliance Checkers */}
            <div style={cardBg}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>Normal Text</h3>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>&lt; 18pt regular</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Badge pass={passesAANormal} label="WCAG AA (4.5:1)" />
                  <Badge pass={passesAAANormal} label="WCAG AAA (7.0:1)" />
                </div>
              </div>

              <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "24px 0" }} />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>Large Text</h3>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>&ge; 18pt or 14pt bold</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Badge pass={passesAALarge} label="WCAG AA (3.0:1)" />
                  <Badge pass={passesAAALarge} label="WCAG AAA (4.5:1)" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Test your colour palette for accessibility instantly.</p>
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

        {/* ── SEO Content (Authority Bridge) ────────────────────── */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>The Complete Guide to WCAG Colour Contrast in 2026</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            Digital accessibility is no longer optional. According to the World Health Organization, over 2.2 billion people globally have a vision impairment. Designing with adequate <strong style={{ color: "white" }}>colour contrast</strong> ensures that your text, UI components, and graphical elements are usable by everyone. Furthermore, many countries legally mandate adherence to WCAG 2.1 AA standards for commercial and public sector websites.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "What is Contrast Ratio?", d: "It is a mathematical formula measuring the difference in relative luminance between two colours. It ranges from 1:1 (no difference, e.g., white on white) to 21:1 (maximum difference, e.g., black on white). High contrast makes reading effortless." },
              { t: "The 'AA' Standard", d: "This is the global benchmark for accessibility. To pass AA, normal text (under 18pt) requires a 4.5:1 ratio. Large text (over 18pt) and meaningful UI components (like icons and input borders) require a 3:1 ratio." },
              { t: "The 'AAA' Standard", d: "This is the strictest level of accessibility, generally required for specialized software or government services. It demands a 7:1 ratio for normal text and a 4.5:1 ratio for large text. Hitting AAA guarantees maximum readability." },
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

        <MoreTools currentSlug="color-contrast-checker" />
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
