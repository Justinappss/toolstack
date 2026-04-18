"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Download, Check, Type, Sparkles, Copy } from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";
import { saveToHistory } from "@/components/HistorySidebar";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";
import { MoreTools } from "@/components/MoreTools";

const FONTS = [
  { id: "sans", name: "System Sans", value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
  { id: "serif", name: "System Serif", value: "Georgia, 'Times New Roman', Times, serif" },
  { id: "mono", name: "System Mono", value: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },
  { id: "rounded", name: "Rounded", value: "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, sans-serif" },
] as const;

const POPULAR_EMOJIS = ["🛠️", "🚀", "💻", "✨", "⚡️", "🍔", "🎨", "🌿", "🔥", "💎", "🛡️", "✨", "❤️", "🕹️"];

const HOW_IT_WORKS = [
  { step: "01", title: "Design Your Icon", body: "Type a single letter or emoji. Adjust the background colour, text colour, font family, font size, and border radius to match your brand.", color: "#f43f5e", bg: "rgba(244,63,94,0.10)", border: "rgba(244,63,94,0.25)" },
  { step: "02", title: "Preview Contexturially", body: "See exactly how your new favicon will look in a browser tab. The preview updates in real-time as you tweak the design.", color: "#eab308", bg: "rgba(234,179,8,0.10)", border: "rgba(234,179,8,0.25)" },
  { step: "03", title: "Download Package", body: "Click download to instantly receive a .zip file containing all the modern, perfectly sized standard formats needed for web and mobile.", color: "#3b82f6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)" },
];

const FAQS = [
  {
    q: "What is a Favicon?",
    a: "A favicon (short for 'favorite icon') is a small, iconic image that represents your website. It's displayed in browser tabs, bookmark lists, history archives, and on mobile home screens when users save a web app.",
  },
  {
    q: "What sizes are included in the download package?",
    a: "The tool generates a .zip containing the modern standards: favicon.png (32x32) for tabs, apple-touch-icon.png (180x180) for iOS home screens, icon-192.png (192x192) for Android, and icon-512.png (512x512) for high-res splash screens and PWAs.",
  },
  {
    q: "Why do I need an Apple Touch Icon?",
    a: "When an iOS user adds your website to their home screen via Safari, Apple devices look specifically for a file named `apple-touch-icon.png`. If it's missing, the device generates a low-quality snapshot of the webpage. Our tool generates the perfect 180x180 resolution required for this.",
  },
  {
    q: "Should I use .ico or .png for my favicon?",
    a: "Modern web development has moved away from the legacy `.ico` format. All modern browsers (Chrome, Firefox, Safari, Edge) support standard `.png` favicons perfectly. They are smaller in file size and support full alpha transparency. Our tool provides standard PNGs to ensure maximum compatibility.",
  },
  {
    q: "How do I add these to my website?",
    a: "Unzip the downloaded folder and place the images in the root directory (or public directory) of your website. Then, copy the provided HTML snippet and paste it into the `<head>` section of your `index.html` or layout file.",
  },
  {
    q: "What is the best free Favicon generator?",
    a: "ToolStack's Favicon Generator is the premium free standard for 2026. Unlike older generators that still focus on outdated 16x16 .ico formats, we output the specific resolutions required for high-DPI displays and mobile configurations (like Progressive Web Apps).",
  },
];

const CODE_SNIPPET = `<!-- Place these tags in your <head> -->
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">`;

// Helper: draw to a canvas of given size and return blob
async function generateImageBlob(
  size: number,
  text: string,
  bgCol: string,
  textCol: string,
  fontFamily: string,
  fontSizeMult: number,
  radiusMult: number
): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Clear
  ctx.clearRect(0, 0, size, size);

  // Background
  const radius = size * radiusMult;
  ctx.beginPath();
  if (radius > 0) {
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
  } else {
    ctx.rect(0, 0, size, size);
  }
  ctx.closePath();
  ctx.fillStyle = bgCol;
  ctx.fill();

  // Text
  if (text) {
    const fontSize = size * fontSizeMult;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textCol;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Adjust y slightly if it's emoji or certain fonts, but middle is generally okay
    ctx.fillText(text, size / 2, size / 2 + size * 0.05);
  }

  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/png");
  });
}

export default function FaviconGenerator() {
  const [text, setText] = useState("T");
  const [bgCol, setBgCol] = useState("#f43f5e");
  const [textCol, setTextCol] = useState("#ffffff");
  const [font, setFont] = useState<string>(FONTS[0].value);
  const [radius, setRadius] = useState(0.25); // 0 to 0.5 (circle)
  const [fontSize, setFontSize] = useState(0.6); // 0.3 to 0.9

  const [previewUrl, setPreviewUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Update preview canvas
  useEffect(() => {
    let active = true;
    generateImageBlob(128, text, bgCol, textCol, font, fontSize, radius).then((blob) => {
      if (active && blob) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      }
    });
    return () => { active = false; };
  }, [text, bgCol, textCol, font, fontSize, radius]); // eslint-disable-line

  const handleDownloadZip = async () => {
    if (!text) return;
    setDownloading(true);
    try {
      const zip = new JSZip();

      // Standard configs
      const sizes = [
        { name: "favicon.png", size: 32 },
        { name: "apple-touch-icon.png", size: 180 },
        { name: "icon-192.png", size: 192 },
        { name: "icon-512.png", size: 512 },
      ];

      for (const config of sizes) {
        const blob = await generateImageBlob(
          config.size, text, bgCol, textCol, font, fontSize, radius
        );
        if (blob) zip.file(config.name, blob);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const dlUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = "toolstack-favicon-package.zip";
      a.click();
      URL.revokeObjectURL(dlUrl);

      saveToHistory({ toolName: "Favicon Generator", slug: "favicon-generator", data: { text, bgCol, textCol } });
    } catch (err) {
      console.error(err);
    }
    setDownloading(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPET);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white",
    outline: "none", fontSize: 14,
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
        <div style={{ position: "absolute", top: "5%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 65%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Free Favicon Generator — ToolStack",
          "description": "Generate beautiful favicons for your website instantly. Create from text or emojis. Generates perfectly sized standard formats.",
          "url": "https://toolstack.tech/tools/favicon-generator",
          "applicationCategory": "DesignApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["Text Mode", "Emoji Mode", "Real-Time Preview", "Zip Package Creation", "Apple Touch Icon", "Android PWA Icons"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools?category=dev" },
            { "@type": "ListItem", "position": 3, "name": "Favicon Generator", "item": "https://toolstack.tech/tools/favicon-generator" },
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
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Favicon Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#fecdd3" }}>{"\u2713"} Favicon Builder {"\u00b7"} Package ZIP Export {"\u00b7"} Free {"\u00b7"} No Signup</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Create Your Favicon<br />
            <span style={{ background: "linear-gradient(135deg, #f43f5e 0%, #3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              In Seconds.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Generate perfectly sized, modern standard favicons for your next project. Customise text, emojis, colours, and shapes, then download the full package.
          </p>
        </div>

        {/* ── Visual Builder ──────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24, marginBottom: 48 }}>
          
          {/* Controls */}
          <div style={{ ...cardBg, display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p style={labelStyle}>Text / Emoji</p>
              <input 
                type="text" 
                maxLength={2} 
                value={text} 
                onChange={e => setText(e.target.value)} 
                style={{ ...inputStyle, fontSize: 24, textAlign: "center" as const, fontWeight: 800, marginBottom: 16 }} 
                placeholder="Aa"
              />
              <p style={{ ...labelStyle, fontSize: 11 }}>Quick Emojis</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {POPULAR_EMOJIS.map((em, idx) => (
                  <button key={idx} onClick={() => setText(em)} style={{
                    width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 16, cursor: "pointer", transition: "all 0.15s"
                  }} title={em}>
                    {em}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <p style={labelStyle}>Background</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="color" value={bgCol} onChange={e => setBgCol(e.target.value)} style={{
                    width: 44, height: 44, border: "2px solid rgba(255,255,255,0.15)", borderRadius: 10, cursor: "pointer", background: "none", padding: 0
                  }} />
                  <input type="text" value={bgCol} onChange={e => setBgCol(e.target.value)} style={{ ...inputStyle, fontFamily: "monospace", textTransform: "uppercase" }} />
                </div>
              </div>
              <div>
                <p style={labelStyle}>Foreground</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="color" value={textCol} onChange={e => setTextCol(e.target.value)} style={{
                    width: 44, height: 44, border: "2px solid rgba(255,255,255,0.15)", borderRadius: 10, cursor: "pointer", background: "none", padding: 0
                  }} />
                  <input type="text" value={textCol} onChange={e => setTextCol(e.target.value)} style={{ ...inputStyle, fontFamily: "monospace", textTransform: "uppercase" }} />
                </div>
              </div>
            </div>

            <div>
              <p style={labelStyle}>Typeface</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {FONTS.map(f => (
                  <button key={f.id} onClick={() => setFont(f.value)} style={{
                    padding: "10px", borderRadius: 10, cursor: "pointer",
                    background: font === f.value ? "rgba(244,63,94,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${font === f.value ? "rgba(244,63,94,0.4)" : "rgba(255,255,255,0.1)"}`,
                    color: font === f.value ? "white" : "rgba(255,255,255,0.5)",
                    fontSize: 13, fontWeight: 700, fontFamily: f.value, transition: "all 0.15s"
                  }}>
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <p style={labelStyle}>Border Radius</p>
                <input type="range" min={0} max={0.5} step={0.05} value={radius} onChange={e => setRadius(Number(e.target.value))} style={{ width: "100%", accentColor: "#f43f5e" }} />
              </div>
              <div>
                <p style={labelStyle}>Font Scale</p>
                <input type="range" min={0.3} max={0.9} step={0.05} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} style={{ width: "100%", accentColor: "#f43f5e" }} />
              </div>
            </div>
          </div>

          {/* Preview & Contextual */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ ...cardBg, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <p style={{ ...labelStyle, marginBottom: 24 }}>Master Preview</p>
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Favicon Preview" style={{ width: 160, height: 160, boxShadow: "0 16px 40px rgba(0,0,0,0.5)" }} />
              ) : (
                <div style={{ width: 160, height: 160, background: "rgba(255,255,255,0.05)", borderRadius: 40 }} />
              )}
            </div>

            <div style={{ ...cardBg, padding: 24 }}>
              <p style={{ ...labelStyle, marginBottom: 16 }}>Browser Context</p>
              
              {/* Fake Chrome Tab */}
              <div style={{ background: "#202124", borderRadius: "12px 12px 0 0", padding: "8px 16px 0", display: "flex", gap: 8, overflow: "hidden" }}>
                <div style={{ background: "#323639", borderRadius: "8px 8px 0 0", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10, minWidth: 180 }}>
                  {previewUrl && <img src={previewUrl} style={{ width: 16, height: 16 }} alt="" />}
                  <span style={{ fontSize: 12, color: "#e8eaed", whiteSpace: "nowrap" }}>Your Website</span>
                </div>
              </div>
              <div style={{ background: "#323639", height: 24, borderRadius: "0 0 8px 8px" }} />
            </div>

            <button onClick={handleDownloadZip} disabled={downloading || !text} style={{
              width: "100%", padding: "16px", borderRadius: 16, cursor: "pointer", border: "none",
              background: downloading ? "#1e1e2d" : "#f43f5e",
              color: "white", fontSize: 16, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: "0 8px 30px rgba(244,63,94,0.3)", transition: "all 0.2s"
            }}>
              {downloading ? <><Sparkles size={18} /> Generating Package...</> : <><Download size={18} /> Download Favicon Package .zip</>}
            </button>
          </div>
        </div>

        {/* ── HTML Snippet ──────────────────────────────────────── */}
        <div style={{ ...cardBg, marginBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>Installation Instructions</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>Unzip your download, upload the files to your root folder, and paste this into your HTML `&lt;head&gt;`.</p>
            </div>
            <button onClick={handleCopyCode} style={{
              padding: "8px 16px", borderRadius: 10, background: copiedCode ? "#10b981" : "rgba(255,255,255,0.05)",
              border: `1px solid ${copiedCode ? "#10b981" : "rgba(255,255,255,0.1)"}`, color: "white",
              fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, cursor: "pointer"
            }}>
              {copiedCode ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy HTML</>}
            </button>
          </div>
          <pre style={{
            background: "#0d0d16", border: "1px solid rgba(255,255,255,0.05)", padding: 20, borderRadius: 12,
            overflowX: "auto", fontSize: 13, color: "#a5b4fc", fontFamily: "monospace", margin: 0
          }}>
            <code>{CODE_SNIPPET}</code>
          </pre>
        </div>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Three steps to perfect integration.</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>The Modern Favicon Guide for 2026</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            A favicon provides vital visual signposting in complex browser tab bars. For years, the standard approach required generating a legacy `.ico` file. In modern web architecture, this is increasingly obsolete. Adhering to contemporary best practices means generating <strong style={{ color: "white" }}>scalable PNG resolutions</strong> to satisfy Web Manifest requirements, Retina displays, and mobile operating systems.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Browser Tab Specifics", d: "The baseline `favicon.png` (32x32px) acts as the foundation. It perfectly fits the UI dimensions of Chrome, Edge, and Firefox without requiring the browser engine to dynamically upscale or downscale graphic data." },
              { t: "Apple Touch Icon Protocol", d: "When iOS users save your application to their home screen, Apple's WebClip technology requires a precise 180x180 png. Omit this, and iPhones will attempt to generate an ugly screenshot of your viewport." },
              { t: "PWA and Android Standards", d: "Modern Progressive Web Apps (PWAs) rely on Web App Manifests. Google recommends generating specific 192x192 and 512x512 maskable formats to provide pixel-perfect splash screens and Android app icons." },
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

        <MoreTools currentSlug="favicon-generator" />
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
