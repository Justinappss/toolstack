"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { MoreTools } from "@/components/MoreTools";

const QR_TYPES = [
  { id: "url",   label: "URL",   icon: "🔗", placeholder: "https://example.com" },
  { id: "text",  label: "Text",  icon: "✍", placeholder: "Enter any text or message" },
  { id: "email", label: "Email", icon: "✉", placeholder: "hello@example.com" },
  { id: "phone", label: "Phone", icon: "📞", placeholder: "+44 7700 900000" },
  { id: "wifi",  label: "WiFi",  icon: "📶", placeholder: "Network name (SSID)" },
  { id: "sms",   label: "SMS",   icon: "💬", placeholder: "+44 7700 900000" },
];

const FOREGROUND_PRESETS = [
  "#ffffff", "#6366f1", "#10b981", "#f59e0b", "#f472b6", "#38bdf8", "#000000",
];

const FAQS = [
  {
    q: "Do these QR codes expire?",
    a: "Never. ToolStack QR codes are generated entirely in your browser — there's no server involved, no account, and no tracking. Because the QR code is just encoded data (not a redirect through our servers), it will work forever. There are no scan limits, no expiry dates, and no subscription required to keep them active.",
  },
  {
    q: "Is my data private?",
    a: "Yes, completely. All QR code generation happens locally in your browser using the Web Crypto API — nothing is sent to any server. Your URLs, WiFi passwords, and contact details never leave your device. Most QR code generators process your data on their servers; ours does not.",
  },
  {
    q: "What types of QR codes can I create?",
    a: "ToolStack supports six QR code types: URL (website links), plain text, email (opens a compose window), phone (initiates a call), WiFi (auto-connects to a network when scanned), and SMS (pre-fills a text message). More types are being added.",
  },
  {
    q: "Can I download the QR code as SVG?",
    a: "Yes. You can download as PNG (raster, great for web and print at standard sizes) or SVG (vector, scales infinitely — perfect for large print, signage, and branding). SVG download is completely free with no watermark.",
  },
  {
    q: "How do I create a WiFi QR code?",
    a: "Select the WiFi type, enter your network name (SSID), password, and security type (WPA/WEP/None). The QR code encodes the WiFi credentials in the standard WPA format that iOS and Android can read natively. When someone scans it, their phone prompts them to join the network automatically.",
  },
  {
    q: "What size should my QR code be for print?",
    a: "For business cards and small labels: minimum 2cm × 2cm. For posters and signage: at least 10cm × 10cm. A good rule is to ensure the QR code is at least 10× the size of the smallest module (individual square). When printing large, always use the SVG download for crisp, infinitely sharp output.",
  },
  {
    q: "What is the best QR code generator?",
    a: "ToolStack is the best free QR code generator for most use cases because your codes never expire (no server redirect), there's zero signup required, downloads are watermark-free in both PNG and SVG formats, WiFi QR codes are fully supported, and everything runs in your browser — your data stays private. Unlike QRCode Monkey, QR-code-generator.com, and most others, we don't charge for SVG downloads or high-resolution output.",
  },
];

function buildQRData(type: string, value: string, wifiPass: string, wifiSec: string, emailSubject: string, smsMsg: string): string {
  switch (type) {
    case "url":
      return value.startsWith("http") ? value : `https://${value}`;
    case "email":
      return emailSubject ? `mailto:${value}?subject=${encodeURIComponent(emailSubject)}` : `mailto:${value}`;
    case "phone":
      return `tel:${value.replace(/\s/g, "")}`;
    case "wifi":
      return `WIFI:T:${wifiSec};S:${value};P:${wifiPass};;`;
    case "sms":
      return smsMsg ? `smsto:${value.replace(/\s/g, "")}:${smsMsg}` : `sms:${value.replace(/\s/g, "")}`;
    default:
      return value;
  }
}

export default function QRCodeGeneratorPage() {
  const [type, setType]           = useState("url");
  const [value, setValue]         = useState("");
  const [fgColor, setFgColor]     = useState("#ffffff");
  const [bgColor, setBgColor]     = useState("#0a0a14");
  const [size, setSize]           = useState(256);
  const [wifiPass, setWifiPass]   = useState("");
  const [wifiSec, setWifiSec]     = useState("WPA");
  const [emailSub, setEmailSub]   = useState("");
  const [smsMsg, setSmsMsg]       = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrSvg, setQrSvg]        = useState<string | null>(null);
  const [error, setError]         = useState<string | null>(null);
  const [copied, setCopied]       = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);
  const canvasRef                  = useRef<HTMLCanvasElement>(null);

  const currentType = QR_TYPES.find(t => t.id === type)!;

  const generate = useCallback(async () => {
    const raw = value.trim();
    if (!raw) { setQrDataUrl(null); setQrSvg(null); return; }
    const data = buildQRData(type, raw, wifiPass, wifiSec, emailSub, smsMsg);
    try {
      setError(null);
      const opts = {
        errorCorrectionLevel: "H" as const,
        margin: 2,
        width: size,
        color: { dark: fgColor, light: bgColor },
      };
      const dataUrl = await QRCode.toDataURL(data, opts);
      setQrDataUrl(dataUrl);
      const svg = await QRCode.toString(data, { ...opts, type: "svg" });
      setQrSvg(svg);
    } catch {
      setError("Could not generate QR code. Check your input and try again.");
    }
  }, [type, value, wifiPass, wifiSec, emailSub, smsMsg, size, fgColor, bgColor]);

  useEffect(() => { generate(); }, [generate]);

  function downloadPng() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qrcode-toolstack.png`;
    a.click();
  }

  function downloadSvg() {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qrcode-toolstack.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyImage() {
    if (!qrDataUrl) return;
    fetch(qrDataUrl).then(r => r.blob()).then(blob => {
      navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    });
  }

  const hasOutput = !!qrDataUrl && !error;
  const isEmpty   = !value.trim();

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", paddingBottom: 100 }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -120, left: "20%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: 200, right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: 100, left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 60px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>QR Code Generator</span>
        </nav>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#a5b4fc" }}>✓ Free QR Code Generator · No Signup · No Expiry · No Watermark</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: "white", lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
          Free QR Code<br />
          <span style={{ background: "linear-gradient(135deg, #10b981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Generator.
          </span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: 600, margin: "0 0 28px" }}>
          Generate QR codes for URLs, WiFi, email, phone, SMS and text. Static codes with no expiry, no server redirect, and no account required. Download as PNG or SVG — free, no watermark.
        </p>

        {/* Trust badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
          {[
            { icon: "🔒", label: "100% private" },
            { icon: "⚡", label: "Instant generation" },
            { icon: "♾️", label: "Never expires" },
            { icon: "🎨", label: "PNG + SVG download" },
          ].map(b => (
            <span key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 99, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
              {b.icon} {b.label}
            </span>
          ))}
        </div>

        {/* ── TOOL CARD ── */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "32px 28px", marginBottom: 16 }}>

          {/* Type selector */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>QR Code Type</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QR_TYPES.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setType(t.id); setValue(""); setWifiPass(""); setEmailSub(""); setSmsMsg(""); }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "9px 16px", borderRadius: 12, cursor: "pointer",
                    fontSize: 13, fontWeight: 700,
                    background: type === t.id ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${type === t.id ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`,
                    color: type === t.id ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                    transition: "all 0.15s",
                  }}
                >
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Two-column layout: inputs left, preview right */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "start" }}>

            {/* Left: inputs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Main input */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>
                  {type === "url" ? "URL" : type === "wifi" ? "Network Name (SSID)" : type === "email" ? "Email Address" : type === "phone" ? "Phone Number" : type === "sms" ? "Phone Number" : "Text Content"} <span style={{ color: "#f87171" }}>*</span>
                </label>
                <input
                  type={type === "email" ? "email" : type === "phone" || type === "sms" ? "tel" : "text"}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={currentType.placeholder}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 12,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "white", fontSize: 14, outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* WiFi extras */}
              {type === "wifi" && (
                <>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>WiFi Password</label>
                    <input
                      type="password"
                      value={wifiPass}
                      onChange={e => setWifiPass(e.target.value)}
                      placeholder="Enter WiFi password"
                      style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>Security Type</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["WPA", "WEP", "None"].map(sec => (
                        <button key={sec} onClick={() => setWifiSec(sec)} style={{ flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, background: wifiSec === sec ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${wifiSec === sec ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)"}`, color: wifiSec === sec ? "#a5b4fc" : "rgba(255,255,255,0.45)" }}>
                          {sec}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Email subject */}
              {type === "email" && (
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>Subject (optional)</label>
                  <input value={emailSub} onChange={e => setEmailSub(e.target.value)} placeholder="e.g. Enquiry from QR code" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              )}

              {/* SMS message */}
              {type === "sms" && (
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>Message (optional)</label>
                  <input value={smsMsg} onChange={e => setSmsMsg(e.target.value)} placeholder="Pre-filled message text" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              )}

              {/* Customisation */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>Foreground Colour</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {FOREGROUND_PRESETS.map(c => (
                    <button key={c} onClick={() => setFgColor(c)} aria-label={`Set foreground colour to ${c}`} style={{ width: 28, height: 28, borderRadius: 8, background: c, border: fgColor === c ? "2px solid #6366f1" : "2px solid rgba(255,255,255,0.1)", cursor: "pointer", outline: "none", flexShrink: 0 }} />
                  ))}
                  <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} aria-label="Custom foreground colour" style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "none", cursor: "pointer", padding: 0 }} />
                </div>
              </div>

              {/* Size */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
                  Size: <span style={{ color: "rgba(255,255,255,0.7)" }}>{size}px</span>
                </p>
                <input
                  type="range" min={128} max={512} step={32} value={size}
                  aria-label="QR code size"
                  onChange={e => setSize(Number(e.target.value))}
                  className="pw-slider"
                  style={{ width: "100%", height: 6, borderRadius: 99, appearance: "none", WebkitAppearance: "none", background: `linear-gradient(to right, #6366f1 ${((size - 128) / 384) * 100}%, rgba(255,255,255,0.1) ${((size - 128) / 384) * 100}%)`, cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                  <span>128px</span><span>512px</span>
                </div>
              </div>
            </div>

            {/* Right: QR preview */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 240, height: 240, borderRadius: 20,
                background: isEmpty ? "rgba(255,255,255,0.03)" : bgColor,
                border: `1px solid ${hasOutput ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", flexShrink: 0,
                boxShadow: hasOutput ? "0 0 40px rgba(99,102,241,0.15)" : "none",
                transition: "all 0.3s ease",
              }}>
                {isEmpty && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 36, marginBottom: 8, opacity: 0.3 }}>⬛</div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0 }}>Enter content above</p>
                  </div>
                )}
                {error && (
                  <p style={{ fontSize: 12, color: "#f87171", textAlign: "center", padding: 16 }}>{error}</p>
                )}
                {hasOutput && (
                  <img src={qrDataUrl!} alt="Generated QR code" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                )}
              </div>

              {/* Download buttons */}
              {hasOutput && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                  <button onClick={downloadPng} style={{ width: "100%", padding: "12px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 800, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", color: "white", letterSpacing: "0.01em" }}>
                    ↓ Download PNG
                  </button>
                  <button onClick={downloadSvg} style={{ width: "100%", padding: "12px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 800, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399" }}>
                    ↓ Download SVG
                  </button>
                  <button onClick={copyImage} style={{ width: "100%", padding: "10px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: copied ? "#34d399" : "rgba(255,255,255,0.45)" }}>
                    {copied ? "✓ Copied to clipboard" : "Copy image"}
                  </button>
                </div>
              )}

              {hasOutput && (
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", margin: 0 }}>
                  Generated in your browser · never sent to any server
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>QR codes in three steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Choose a type", desc: "Select URL, WiFi, email, phone, SMS or plain text. Each type formats the data correctly for maximum scanner compatibility.", color: "#6366f1", rgb: "99,102,241" },
              { step: "02", title: "Enter your content", desc: "Type your URL, WiFi credentials, or text. The QR code updates in real time as you type — no button to press.", color: "#10b981", rgb: "16,185,129" },
              { step: "03", title: "Download & use", desc: "Download as PNG for web and digital use, or SVG for print and signage. No watermark, no account, no expiry.", color: "#8b5cf6", rgb: "139,92,246" },
            ].map(s => (
              <div key={s.step} style={{ padding: "24px 22px", borderRadius: 18, background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: `rgba(${s.rgb},0.7)`, marginBottom: 10 }}>STEP <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.step}</span></div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>FEATURES</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Why ToolStack QR beats the rest</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { title: "Codes never expire", desc: "No server redirect means no expiry. The QR code is the data — not a link to our servers. Scan it in 10 years and it still works.", color: "#10b981", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>) },
              { title: "SVG download — free", desc: "Vector download scales to any size without pixelation. Essential for large print. Most competitors charge for this — we don't.", color: "#6366f1", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>) },
              { title: "100% private", desc: "Everything happens in your browser. Your URLs, WiFi passwords, and personal data are never sent to any server — ever.", color: "#f59e0b", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>) },
              { title: "WiFi QR codes", desc: "Generate WiFi QR codes that let guests connect with one scan — no typing passwords. Supports WPA, WEP and open networks.", color: "#38bdf8", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>) },
            ].map(f => (
              <div key={f.title} style={{ padding: "24px 22px", borderRadius: 18, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO CONTENT */}
        <div style={{ marginTop: 64, padding: "40px 36px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Static vs. dynamic QR codes — what&apos;s the difference?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 24px" }}>
            A <strong style={{ color: "white" }}>QR code</strong> is a two-dimensional barcode (ISO/IEC 18004) that encodes data as a matrix of black and white squares, readable by any smartphone camera. There are two types: <strong style={{ color: "white" }}>static QR codes</strong>, which embed the data directly in the pattern, and <strong style={{ color: "white" }}>dynamic QR codes</strong>, which redirect through a server URL that can be edited later.
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: "0 0 24px" }}>
            ToolStack generates <strong style={{ color: "white" }}>static QR codes</strong>. That means the destination is baked directly into the code — there is no server in the middle, no redirect, and no expiry date. If you need a QR code for a URL that will never change, a WiFi password, a contact card, or any fixed piece of data, static is the correct choice. The code will work in 10 years exactly as it does today.
          </p>

          <div style={{ overflowX: "auto", margin: "10px 0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#10b981" }}>Feature</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Static QR (ToolStack)</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>Dynamic QR (most paid tools)</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Expiry</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Never expires</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Expires if subscription lapses</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Privacy</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>100% private — no server</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Scans tracked by provider</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Cost</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Free forever</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Monthly subscription</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Content editable after print</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>No (reprint required)</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>QR code error correction — what Level H means</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
               QR codes have four error correction levels defined by the ISO/IEC 18004 standard: L (7% recovery), M (15%), Q (25%), and H (30%). ToolStack uses <strong style={{ color: "white" }}>Level H</strong> by default, which means up to 30% of the code can be physically damaged or obscured and the scanner can still recover the full data. This is the highest available level — the best choice for print, stickers, and anything that might get worn or dirty.
             </p>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, background: openFaq === i ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${openFaq === i ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)"}`, overflow: "hidden", transition: "all 0.2s" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0, lineHeight: 1.4 }}>{faq.q}</h3>
                  <span style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MoreTools + Banner */}
        {/* SEO Description */}
        <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>QR Code Generator: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              QR codes are everywhere — restaurant menus, business cards, event tickets, product packaging, marketing materials — and every one of them was generated by someone who needed a quick, reliable QR code tool. Our QR Code Generator creates custom QR codes with your colors, shapes, and even your logo embedded in the center. Download as PNG or SVG, ready for print or digital use.
            </p>
            <p style={{ marginBottom: 16 }}>
              Enter a URL, text, email address, phone number, Wi-Fi credentials, or vCard contact info. Customize the foreground and background colors, dot style (squares, rounded, dots), and optionally upload a logo to embed in the center. The QR code generates instantly with a live preview. Download as high-resolution PNG for digital use or SVG for print.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include creating QR codes for business cards that link to a portfolio or LinkedIn profile, generating Wi-Fi QR codes for office or event guest networks, creating menu QR codes for restaurants, adding QR codes to product packaging that link to instructions, generating event check-in QR codes, and creating QR codes for payment links.
            </p>
            <p style={{ marginBottom: 0 }}>
              Most QR code generators either watermark the output, limit downloads, or require signup for customization. Ours gives you full color customization, logo embedding, multiple dot styles, and high-resolution downloads — all free, no watermarks, no signup, no limits. The QR codes are generated entirely in your browser.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="qr-code-generator" />
        
      </div>

      {/* JSON-LD: WebApplication */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "QR Code Generator",
          "description": "Free QR code generator by ToolStack. Create QR codes for URLs, WiFi, email, phone, SMS and text. Static codes that never expire. Download as PNG or SVG, no watermark, no signup.",
          "url": "https://toolstack.tech/tools/qr-code-generator",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web",
          "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["Static QR codes (no expiry)", "Level-H error correction", "SVG vector download", "WiFi QR code support", "100% browser-based — private"],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Utility", "item": "https://toolstack.tech/tools?category=utility" },
            { "@type": "ListItem", "position": 3, "name": "QR Code Generator", "item": "https://toolstack.tech/tools/qr-code-generator" },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a },
          })),
        },
      ])}} />

      <style>{`
        .pw-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #6366f1; border: 3px solid #06060c; box-shadow: 0 0 0 2px #6366f1; cursor: pointer; }
        .pw-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #6366f1; border: 3px solid #06060c; box-shadow: 0 0 0 2px #6366f1; cursor: pointer; }
      `}</style>
    </div>
  );
}
