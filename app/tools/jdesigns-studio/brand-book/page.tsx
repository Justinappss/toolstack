"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, ScanLine, Download, Wand2, FlaskConical } from "lucide-react";

type Swatch = { name: string; hex: string };
type Brand = {
  name: string;
  tagline: string;
  overview: string;
  palette: Swatch[];
  fonts: { display: string; body: string };
  values: string[];
  aesthetic: string[];
  tone: string[];
  coverPrompt?: string;
  renderStyle?: string;
  logo?: string;
  url?: string;
};

// remote images load via the same-origin proxy so brand-domain hotlink protection doesn't break them
const proxied = (u?: string) => (!u ? "" : u.startsWith("data:") ? u : "/api/jdesigns-studio/proxy?url=" + encodeURIComponent(u));

const RECRAFT_STYLE: Record<string, string> = {
  photographic: "realistic_image",
  illustration: "digital_illustration",
  vector: "vector_illustration",
};

async function api<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Request failed");
  return data as T;
}

function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/.{1,2}/g);
  if (!m) return { r: 0, g: 0, b: 0 };
  const [r, g, b] = m.map((x) => parseInt(x, 16));
  return { r, g, b };
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function rgbToCmyk(r: number, g: number, b: number) {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rr - k) / (1 - k)) * 100),
    m: Math.round(((1 - gg - k) / (1 - k)) * 100),
    y: Math.round(((1 - bb - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

const PAGE: React.CSSProperties = {
  position: "relative",
  width: 1040,
  height: 735,
  background: "#fff",
  borderRadius: 6,
  boxShadow: "0 18px 50px -22px rgba(0,0,0,.5)",
  overflow: "hidden",
  margin: "0 auto",
  color: "#141414",
};
const SECT: React.CSSProperties = { position: "absolute", top: 56, left: 64, fontSize: 17, fontWeight: 500 };
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function BrandBookPage() {
  const [url, setUrl] = useState("coca-cola.com");
  const [scanning, setScanning] = useState(false);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [coverLoading, setCoverLoading] = useState(false);
  const [error, setError] = useState("");
  const coverTriedRef = useRef(false);

  // once the brand is built (scan or Studio hand-off), auto-render the cover image too
  useEffect(() => {
    if (brand && !coverUrl && !coverLoading && !coverTriedRef.current) {
      coverTriedRef.current = true;
      genCover();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  useEffect(() => {
    if (!brand) return;
    const fams = [brand.fonts?.display, brand.fonts?.body]
      .filter(Boolean)
      .map((f) => `family=${f!.trim().replace(/\s+/g, "+")}:wght@400;500;600;700;800`)
      .join("&");
    if (!fams) return;
    const id = "bb-fonts";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?${fams}&display=swap`;
  }, [brand]);

  // open instantly from the Studio's deep scan — reuse the learned profile, never re-scan
  useEffect(() => {
    const norm = (s: string) => s.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "").toLowerCase();
    const u = new URLSearchParams(window.location.search).get("url");
    try {
      const stored = sessionStorage.getItem("jdesigns:brand");
      if (stored) {
        const b = JSON.parse(stored) as Brand;
        // reuse only if it's the same brand the Studio handed over
        if (!u || (b.url && norm(b.url) === norm(u))) {
          setBrand(b);
          if (b.url) setUrl(b.url);
          return;
        }
      }
    } catch {
      /* fall through to a fresh scan */
    }
    if (u) {
      setUrl(u);
      generate(u);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function generate(target?: string) {
    const u = (target ?? url).trim();
    if (!u || scanning) return;
    setScanning(true);
    setError("");
    setCoverUrl("");
    coverTriedRef.current = false;
    try {
      const { brand: b } = await api<{ brand: Brand }>("/api/jdesigns-studio/brandbook", { url: u });
      setBrand(b);
    } catch (e: any) {
      setError(e.message || "Failed to generate brand book");
    } finally {
      setScanning(false);
    }
  }

  async function genCover() {
    if (!brand || coverLoading) return;
    setCoverLoading(true);
    try {
      const { url: u } = await api<{ url: string }>("/api/jdesigns-studio/image", {
        prompt: brand.coverPrompt || `abstract on-brand cover, ${brand.aesthetic?.join(", ")}, no text`,
        model: "recraft",
        width: 1280,
        height: 905,
        style: RECRAFT_STYLE[brand.renderStyle || ""] || "realistic_image",
        colors: brand.palette.map((p) => p.hex),
      });
      setCoverUrl(u);
    } catch (e: any) {
      setError(e.message || "Cover generation failed");
    } finally {
      setCoverLoading(false);
    }
  }

  const disp = (brand?.fonts.display && `'${brand.fonts.display}', Georgia, serif`) || "Georgia, serif";
  const body = (brand?.fonts.body && `'${brand.fonts.body}', system-ui, sans-serif`) || "system-ui, sans-serif";
  const primary = brand?.palette?.[0]?.hex || "#111";

  return (
    <div style={{ minHeight: "100vh", background: "#1b1a17", color: "#fff", paddingBottom: 60 }}>
      {/* controls */}
      <div className="no-print" style={{ position: "sticky", top: 0, zIndex: 10, background: "#16151200", backdropFilter: "blur(8px)", padding: "26px 20px 18px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <FlaskConical size={20} color="#cfe06a" />
            <h1 style={{ fontFamily: "'Newsreader',Georgia,serif", fontStyle: "italic", fontSize: 30, fontWeight: 600, margin: 0 }}>Brand Book</h1>
          </div>
          <p style={{ color: "#b8b3a6", fontSize: 14, margin: "0 0 16px" }}>
            {brand ? "✓ Built from your brand scan — generate the cover, then export as PDF." : "Scan any brand and generate a shareable, on-brand brand book — export it as a PDF."}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              placeholder="brand-website.com"
              style={{ flex: "1 1 260px", height: 46, padding: "0 14px", borderRadius: 12, border: "1px solid #3a382f", background: "#26241d", color: "#fff", fontSize: 15, outline: "none" }}
            />
            <button onClick={() => generate()} disabled={scanning} style={{ height: 46, padding: "0 20px", borderRadius: 12, border: "none", background: "#cfe06a", color: "#1b1a17", fontWeight: 800, fontSize: 15, cursor: scanning ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              {scanning ? <Loader2 size={16} className="bb-spin" /> : <ScanLine size={16} />} {scanning ? "Building…" : brand ? "Re-scan" : "Generate Brand Book"}
            </button>
            {brand && (
              <>
                <button onClick={genCover} disabled={coverLoading} style={{ height: 46, padding: "0 18px", borderRadius: 12, border: "1px solid #4a4838", background: "#2a281f", color: "#e6e2d5", fontWeight: 700, fontSize: 14, cursor: coverLoading ? "default" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  {coverLoading ? <Loader2 size={15} className="bb-spin" /> : <Wand2 size={15} />} {coverUrl ? "Re-gen cover" : "Generate cover image"}
                </button>
                <button onClick={() => window.print()} style={{ height: 46, padding: "0 20px", borderRadius: 12, border: "none", background: "#fff", color: "#1b1a17", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  <Download size={16} /> Download PDF
                </button>
              </>
            )}
          </div>
          {error && <div style={{ marginTop: 12, color: "#ffb4ad", fontSize: 14 }}>{error}</div>}
          {brand && <div style={{ marginTop: 12, fontSize: 12, color: "#9a9586" }}>Tip: in the print dialog, choose <b>Save as PDF</b> and enable <b>Background graphics</b> for full colour.</div>}
        </div>
      </div>

      {!brand && !scanning && (
        <div className="no-print" style={{ textAlign: "center", color: "#7a766a", padding: "80px 20px" }}>
          <FlaskConical size={40} style={{ opacity: 0.5 }} />
          <div style={{ marginTop: 14, fontSize: 16 }}>Scan a brand above to generate its brand book.</div>
        </div>
      )}

      {!brand && scanning && (
        <div className="no-print" style={{ textAlign: "center", color: "#cfe06a", padding: "80px 20px" }}>
          <Loader2 size={40} className="bb-spin" />
          <div style={{ marginTop: 14, fontSize: 16, color: "#b8b3a6" }}>Learning the brand and building your brand book…</div>
        </div>
      )}

      {/* the book */}
      {brand && (
        <div className="book" style={{ display: "flex", flexDirection: "column", gap: 28, padding: "10px 20px" }}>
          {/* COVER */}
          <div className="page" style={{ ...PAGE, background: coverUrl ? "#000" : primary, color: "#fff" }}>
            {coverUrl && <img src={coverUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
            {coverUrl && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,.45))" }} />}
            <div style={{ position: "absolute", top: 30, right: 36, fontSize: 12, opacity: 0.85, display: "flex", alignItems: "center", gap: 7 }}>
              Brand Book by <span style={{ background: "#cfe06a", color: "#1b1a17", fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>JDesigns</span>
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}>
              {brand.logo && (
                <div style={{ background: "#fff", borderRadius: 16, padding: "16px 22px", marginBottom: 26, boxShadow: "0 8px 28px rgba(0,0,0,.3)", lineHeight: 0 }}>
                  <img src={proxied(brand.logo)} alt={brand.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ height: 64, width: "auto", maxWidth: 280, objectFit: "contain", display: "block" }} />
                </div>
              )}
              <div style={{ fontFamily: disp, fontWeight: 700, fontSize: 64, lineHeight: 1.05, textShadow: coverUrl ? "0 2px 20px rgba(0,0,0,.5)" : "none" }}>{brand.name}</div>
              <div style={{ fontFamily: body, letterSpacing: ".42em", fontSize: 22, marginTop: 14, opacity: 0.9, paddingLeft: ".42em" }}>BRAND BOOK</div>
            </div>
          </div>

          {/* 01 OVERVIEW */}
          <div className="page" style={PAGE}>
            <div style={SECT}>01 — Brand Overview</div>
            <div style={{ position: "absolute", top: 130, left: 64, width: 300, fontFamily: body, fontSize: 14, lineHeight: 1.75, color: "#3a3a3a" }}>{brand.overview}</div>
            <div style={{ position: "absolute", top: 280, left: 380, right: 64, fontFamily: disp, fontSize: 44, lineHeight: 1.15, color: "#141414" }}>&ldquo;{brand.tagline}&rdquo;</div>
            <div style={{ position: "absolute", top: 470, left: 380, display: "flex", gap: 26 }}>
              {brand.palette.map((s, i) => (
                <div key={i} style={{ width: 70, height: 70, borderRadius: "50%", background: s.hex, border: "1px solid rgba(0,0,0,.08)" }} />
              ))}
            </div>
          </div>

          {/* 02 WORDMARK */}
          <div className="page" style={{ ...PAGE, background: "#f3f3f3" }}>
            <div style={SECT}>02 — Logo</div>
            <div style={{ position: "absolute", top: 0, left: 0, right: "50%", bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #e2e2e2", padding: 40 }}>
              {brand.logo ? (
                <img src={proxied(brand.logo)} alt={brand.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ maxWidth: "78%", maxHeight: 180, objectFit: "contain" }} />
              ) : (
                <div style={{ fontFamily: disp, fontWeight: 700, fontSize: 40, color: "#141414" }}>{brand.name}</div>
              )}
            </div>
            <div style={{ position: "absolute", top: 120, left: "55%", right: 64, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#555" }}>{brand.logo ? "Logo — on light and dark" : "Wordmark — on light and dark"}</div>
              <div style={{ height: 120, background: "#fff", border: "1px solid #e2e2e2", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
                {brand.logo ? (
                  <img src={proxied(brand.logo)} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ maxHeight: 84, maxWidth: "80%", objectFit: "contain" }} />
                ) : (
                  <div style={{ fontFamily: disp, fontWeight: 700, fontSize: 24, color: "#141414" }}>{brand.name}</div>
                )}
              </div>
              <div style={{ height: 120, background: "#000", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
                {brand.logo ? (
                  <img src={proxied(brand.logo)} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} style={{ maxHeight: 84, maxWidth: "80%", objectFit: "contain" }} />
                ) : (
                  <div style={{ fontFamily: disp, fontWeight: 700, fontSize: 24, color: "#fff" }}>{brand.name}</div>
                )}
              </div>
            </div>
          </div>

          {/* 03 TYPOGRAPHY */}
          <div className="page" style={PAGE}>
            <div style={SECT}>03 — Typography</div>
            <div style={{ position: "absolute", top: 130, left: 64, width: 260, fontFamily: body, fontSize: 13.5, lineHeight: 1.7, color: "#4a4a4a" }}>
              Typefaces are the way your brand communicates its voice and tone — balancing hierarchy and readability so the brand stays recognisable and cohesive across every touchpoint.
            </div>
            {([["PRIMARY TYPEFACE", brand.fonts.display], ["SECONDARY TYPEFACE", brand.fonts.body]] as const).map(([label, font], i) => (
              <div key={i} style={{ position: "absolute", top: 130 + i * 250, left: 400, right: 64 }}>
                <div style={{ fontFamily: body, fontSize: 11, letterSpacing: ".18em", color: "#9a9a9a" }}>{label}</div>
                <div style={{ fontFamily: `'${font}', Georgia, serif`, fontSize: 48, margin: "6px 0 14px", color: "#141414" }}>{font}</div>
                <div style={{ fontFamily: `'${font}', Georgia, serif`, fontSize: 18, color: "#333", lineHeight: 1.5 }}>{ALPHA}<br />{ALPHA.toLowerCase()}<br />0123456789 !@#$%</div>
                {i === 0 && <div style={{ height: 1, background: "#eaeaea", marginTop: 26 }} />}
              </div>
            ))}
          </div>

          {/* 04 COLOUR PALETTE */}
          <div className="page" style={PAGE}>
            <div style={SECT}>04 — Colour Palette</div>
            <div style={{ position: "absolute", top: 130, left: 64, width: 250, fontFamily: body, fontSize: 13.5, lineHeight: 1.7, color: "#4a4a4a" }}>
              Colours carry your brand&apos;s personality. These are balanced for functionality and intent, delivering on the brand&apos;s mission and promise.
            </div>
            <div style={{ position: "absolute", top: 130, left: 360, right: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "34px 40px" }}>
              {brand.palette.map((s, i) => {
                const { r, g, b } = hexToRgb(s.hex);
                const hsl = rgbToHsl(r, g, b);
                const cmyk = rgbToCmyk(r, g, b);
                return (
                  <div key={i}>
                    <div style={{ height: 90, borderRadius: 8, background: s.hex, border: "1px solid rgba(0,0,0,.08)" }} />
                    <div style={{ marginTop: 10, fontFamily: body, fontSize: 14, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontFamily: body, fontSize: 11.5, color: "#666", lineHeight: 1.7, marginTop: 4 }}>
                      <div><b>Hex</b> {s.hex.toUpperCase()}</div>
                      <div><b>RGB</b> {r}, {g}, {b}</div>
                      <div><b>CMYK</b> {cmyk.c}, {cmyk.m}, {cmyk.y}, {cmyk.k}</div>
                      <div><b>HSL</b> {hsl.h}, {hsl.s}%, {hsl.l}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 05 BRAND VOICE */}
          <div className="page" style={PAGE}>
            <div style={SECT}>05 — Brand Voice</div>
            <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center" }}>
              <div style={{ fontFamily: body, fontSize: 12, letterSpacing: ".18em", color: "#9a9a9a" }}>VALUES</div>
              <div style={{ fontFamily: disp, fontSize: 34, marginTop: 10, color: "#141414" }}>&ldquo;{brand.values?.join(", ")}&rdquo;</div>
            </div>
            <div style={{ position: "absolute", top: 320, left: 64, right: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
              <div style={{ background: `${primary}1f`, borderRadius: 14, padding: "26px 30px" }}>
                <div style={{ fontFamily: body, fontSize: 12, letterSpacing: ".14em", color: "#555" }}>AESTHETIC</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
                  {brand.aesthetic?.map((a, i) => <span key={i} style={{ fontFamily: body, fontSize: 15, color: "#222" }}>{a}{i < brand.aesthetic.length - 1 ? " ·" : ""}</span>)}
                </div>
              </div>
              <div style={{ background: "#ececec", borderRadius: 14, padding: "26px 30px" }}>
                <div style={{ fontFamily: body, fontSize: 12, letterSpacing: ".14em", color: "#555" }}>TONE OF VOICE</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 16 }}>
                  {brand.tone?.map((t, i) => <span key={i} style={{ fontFamily: body, fontSize: 16, color: "#222" }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bb-spin { animation: bbspin .8s linear infinite; }
        @keyframes bbspin { to { transform: rotate(360deg); } }
        @media print {
          @page { size: A4 landscape; margin: 0; }
          .no-print { display: none !important; }
          body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .book { gap: 0 !important; padding: 0 !important; }
          .page { page-break-after: always; box-shadow: none !important; border-radius: 0 !important; margin: 0 !important; width: 100% !important; height: 100vh !important; }
        }
      `}</style>
    </div>
  );
}
