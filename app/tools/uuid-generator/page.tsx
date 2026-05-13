"use client";
import { useState, useCallback, useEffect } from "react";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "What is a UUID?", a: "A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. It is formatted as 32 hexadecimal digits in groups of 8-4-4-4-12 separated by hyphens, e.g. 550e8400-e29b-41d4-a716-446655440000." },
  { q: "What is the difference between UUID v1 and UUID v4?", a: "UUID v1 is time-based, embedding the current timestamp and making IDs sortable by creation time. UUID v4 is completely random, providing better privacy since it reveals nothing about when or where it was created. v4 is the most widely used format." },
  { q: "What is a UUID v5 and when should I use it?", a: "UUID v5 is deterministic \u2014 it generates a UUID by hashing a namespace UUID and a name string using SHA-1. The same namespace and name always produce the same UUID. This is ideal for generating stable IDs for known entities like domain names or product SKUs." },
  { q: "What is a ULID and how does it differ from a UUID?", a: "A ULID (Universally Unique Lexicographically Sortable Identifier) encodes a millisecond timestamp in its first 10 characters, making it naturally sortable as a string. Unlike UUIDs, ULIDs sort in creation order \u2014 useful for database primary keys where chronological ordering matters." },
  { q: "Are the IDs generated client-side?", a: "Yes \u2014 all ID generation happens entirely in your browser using the Web Crypto API. No data is sent to any server, making this tool instantaneous and completely private." },
  { q: "What is the best free UUID generator?", a: "ToolStack UUID Generator supports UUID v4, v1, v5, ULID, and NanoID \u2014 all free, no signup, 100% client-side. You can generate up to 100 IDs at once with formatting options including uppercase, no-hyphens, and braces. It is the most complete free UUID tool available." },
  { q: "Are UUIDs truly unique?", a: "UUID v4 has 122 bits of randomness, giving 2^122 possible values. The probability of generating a duplicate is astronomically small \u2014 roughly 1 in 5 undecillion. For all practical purposes, UUIDs can be treated as globally unique." }
];


// --- Generators ---
function genV4(): string {
  return crypto.randomUUID();
}

function genV1(): string {
  const now = Date.now();
  const t = BigInt(now + 12219292800000) * BigInt(10000);
  const tLow = Number(t & BigInt(0xFFFFFFFF));
  const tMid = Number((t >> BigInt(32)) & BigInt(0xFFFF));
  const tHi = (Number((t >> BigInt(48)) & BigInt(0x0FFF))) | 0x1000;
  const clk = (crypto.getRandomValues(new Uint16Array(1))[0] & 0x3FFF) | 0x8000;
  const node = Array.from(crypto.getRandomValues(new Uint8Array(6))).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${tLow.toString(16).padStart(8, "0")}-${tMid.toString(16).padStart(4, "0")}-${tHi.toString(16).padStart(4, "0")}-${clk.toString(16).padStart(4, "0")}-${node}`;
}

async function genV5(ns: string, name: string): Promise<string> {
  const hex = ns.replace(/-/g, "");
  if (hex.length !== 32) throw new Error("Invalid namespace UUID");
  const nsB = new Uint8Array(16);
  for (let i = 0; i < 16; i++) nsB[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  const nameB = new TextEncoder().encode(name);
  const buf = new Uint8Array(16 + nameB.length);
  buf.set(nsB);
  buf.set(nameB, 16);
  const hash = new Uint8Array(await crypto.subtle.digest("SHA-1", buf));
  hash[6] = (hash[6] & 0x0F) | 0x50;
  hash[8] = (hash[8] & 0x3F) | 0x80;
  const h = Array.from(hash).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

const ULID_ENC = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
function genULID(): string {
  let ts = Date.now();
  let tsStr = "";
  for (let i = 9; i >= 0; i--) {
    tsStr = ULID_ENC[ts % 32] + tsStr;
    ts = Math.floor(ts / 32);
  }
  const rnd = crypto.getRandomValues(new Uint8Array(16));
  return tsStr + Array.from(rnd).map(b => ULID_ENC[b % 32]).join("");
}

function genNanoID(size = 21): string {
  const alpha = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  const b = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(b).map(x => alpha[x & 63]).join("");
}

function applyFormat(id: string, upper: boolean, noHyphens: boolean, braces: boolean): string {
  let s = upper ? id.toUpperCase() : id.toLowerCase();
  if (noHyphens) s = s.replace(/-/g, "");
  if (braces) s = `{${s}}`;
  return s;
}

type Format = "v4" | "v1" | "v5" | "ulid" | "nanoid";

const FORMATS: { id: Format; label: string; badge: string; desc: string }[] = [
  { id: "v4", label: "UUID v4", badge: "Most Popular", desc: "Random — no timestamp, most widely used standard" },
  { id: "v1", label: "UUID v1", badge: "Time-based", desc: "Embeds current timestamp — IDs sort by creation time" },
  { id: "v5", label: "UUID v5", badge: "Deterministic", desc: "SHA-1 hash of namespace + name — same inputs always produce the same UUID" },
  { id: "ulid", label: "ULID", badge: "Sortable", desc: "Lexicographically sortable — timestamp-first, 26 chars" },
  { id: "nanoid", label: "NanoID", badge: "Compact", desc: "URL-safe, compact, customisable length — ideal for URLs and database IDs" },
];

const QUANTITIES = [1, 5, 10, 25, 50, 100];

const NAMESPACES = [
  { label: "DNS", value: "6ba7b810-9dad-11d1-80b4-00c04fd430c8" },
  { label: "URL", value: "6ba7b811-9dad-11d1-80b4-00c04fd430c8" },
  { label: "OID", value: "6ba7b812-9dad-11d1-80b4-00c04fd430c8" },
  { label: "X500", value: "6ba7b814-9dad-11d1-80b4-00c04fd430c8" },
];

const accent = "#38bdf8";
const accentRgb = "56,189,248";

export default function UUIDGeneratorPage() {
  const [format, setFormat] = useState<Format>("v4");
  const [qty, setQty] = useState(5);
  const [upper, setUpper] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [braces, setBraces] = useState(false);
  const [v5Ns, setV5Ns] = useState("6ba7b810-9dad-11d1-80b4-00c04fd430c8");
  const [v5Name, setV5Name] = useState("");
  const [nanoSize, setNanoSize] = useState(21);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const ids: string[] = [];
      for (let i = 0; i < qty; i++) {
        let id: string;
        switch (format) {
          case "v4": id = genV4(); break;
          case "v1": id = genV1(); break;
          case "v5": id = await genV5(v5Ns, v5Name || "toolstack"); break;
          case "ulid": id = genULID(); break;
          case "nanoid": id = genNanoID(nanoSize); break;
          default: id = genV4();
        }
        ids.push(applyFormat(id, upper, noHyphens && (format === "v4" || format === "v1"), braces));
      }
      setResults(ids);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }, [format, qty, upper, noHyphens, braces, v5Ns, v5Name, nanoSize]);

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyOne = useCallback((id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const copyAll = useCallback(() => {
    navigator.clipboard.writeText(results.join("\n"));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 1500);
  }, [results]);

  const download = useCallback(() => {
    const blob = new Blob([results.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${format}-ids.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [results, format]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "UUID Generator",
      "description": "Free online UUID generator supporting UUID v4, v1, v5, ULID and NanoID. Generate bulk IDs instantly in your browser with no signup required.",
      "url": "https://toolstack.tech/tools/uuid-generator",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "browserRequirements": "Requires JavaScript",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "UUID v4 random generation",
        "UUID v1 time-based generation",
        "UUID v5 deterministic generation",
        "ULID sortable ID generation",
        "NanoID compact generation",
        "Bulk generation up to 100 IDs",
        "Uppercase and lowercase formatting",
        "Remove hyphens option",
        "Brace wrapping option",
        "Copy all to clipboard",
        "Download as .txt"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
        { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools/category/dev" },
        { "@type": "ListItem", "position": 3, "name": "UUID Generator", "item": "https://toolstack.tech/tools/uuid-generator" }
      ]
    }
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.07) 0%, transparent 70%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>ToolStack</a>
          <span>/</span>
          <a href="/tools/category/dev" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Dev Tools</a>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>UUID Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 20 }}>
            {["Free Forever", "No Signup", "100% Client-Side", "5 ID Formats"].map(b => (
              <span key={b} style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 12px", borderRadius: 999, border: `1px solid rgba(${accentRgb},0.25)`, background: `rgba(${accentRgb},0.08)` }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 16 }}>
            Free{" "}
            <span style={{ background: `linear-gradient(135deg, ${accent}, #818cf8)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              UUID Generator
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 600 }}>
            Generate UUID v4, v1, v5, ULID, and NanoID instantly in your browser. Bulk generate up to 100 IDs at once — no server, no signup, zero latency.
          </p>
        </div>

        {/* Tool card */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "32px", marginBottom: 24 }}>

          {/* Format selector */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 12 }}>ID Format</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {FORMATS.map(f => (
                <button key={f.id} onClick={() => setFormat(f.id)} style={{
                  padding: "8px 16px", borderRadius: 10,
                  border: `1px solid ${format === f.id ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.09)"}`,
                  background: format === f.id ? `rgba(${accentRgb},0.12)` : "rgba(255,255,255,0.03)",
                  color: format === f.id ? accent : "rgba(255,255,255,0.55)",
                  fontSize: 13, fontWeight: format === f.id ? 700 : 500,
                  cursor: "pointer", transition: "all 0.15s",
                }}>
                  {f.label}
                  <span style={{ marginLeft: 6, fontSize: 10, padding: "1px 6px", borderRadius: 999, background: format === f.id ? `rgba(${accentRgb},0.2)` : "rgba(255,255,255,0.06)", color: format === f.id ? accent : "rgba(255,255,255,0.35)" }}>{f.badge}</span>
                </button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 10, lineHeight: 1.5 }}>
              {FORMATS.find(f => f.id === format)?.desc}
            </p>
          </div>

          {/* v5 settings */}
          {format === "v5" && (
            <div style={{ marginBottom: 28, padding: 20, borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 14 }}>v5 Settings</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 6 }}>Namespace</label>
                  <select value={v5Ns} onChange={e => setV5Ns(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 12, cursor: "pointer" }}>
                    {NAMESPACES.map(n => <option key={n.value} value={n.value} style={{ background: "#1a1a2e" }}>{n.label} — {n.value}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 6 }}>Name (e.g. example.com)</label>
                  <input value={v5Name} onChange={e => setV5Name(e.target.value)} placeholder="Enter name string..." style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.05)", color: "white", fontSize: 13, boxSizing: "border-box" as const }} />
                </div>
              </div>
            </div>
          )}

          {/* NanoID size */}
          {format === "nanoid" && (
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", display: "block", marginBottom: 8 }}>
                NanoID Size: <strong style={{ color: "white" }}>{nanoSize} characters</strong>
              </label>
              <input type="range" min={8} max={64} value={nanoSize} onChange={e => setNanoSize(Number(e.target.value))} style={{ width: "100%", accentColor: accent }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
                <span>8 (compact)</span><span>21 (default)</span><span>64 (max)</span>
              </div>
            </div>
          )}

          {/* Quantity + Formatting */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 10 }}>Quantity</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {QUANTITIES.map(q => (
                  <button key={q} onClick={() => setQty(q)} style={{
                    padding: "6px 14px", borderRadius: 8,
                    border: `1px solid ${qty === q ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.08)"}`,
                    background: qty === q ? `rgba(${accentRgb},0.12)` : "rgba(255,255,255,0.03)",
                    color: qty === q ? accent : "rgba(255,255,255,0.5)",
                    fontSize: 13, fontWeight: qty === q ? 700 : 500,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>{q}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 10 }}>Formatting</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  { label: "UPPERCASE", active: upper, toggle: () => setUpper(u => !u), disabled: false },
                  { label: "No Hyphens", active: noHyphens, toggle: () => setNoHyphens(h => !h), disabled: format === "ulid" || format === "nanoid" },
                  { label: "{ Braces }", active: braces, toggle: () => setBraces(b => !b), disabled: false },
                ].map(opt => (
                  <button key={opt.label} onClick={opt.toggle} disabled={opt.disabled} style={{
                    padding: "6px 14px", borderRadius: 8,
                    border: `1px solid ${opt.active ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.08)"}`,
                    background: opt.active ? `rgba(${accentRgb},0.12)` : "rgba(255,255,255,0.03)",
                    color: opt.disabled ? "rgba(255,255,255,0.2)" : opt.active ? accent : "rgba(255,255,255,0.5)",
                    fontSize: 13, fontWeight: opt.active ? 700 : 500,
                    cursor: opt.disabled ? "not-allowed" : "pointer", transition: "all 0.15s",
                    opacity: opt.disabled ? 0.4 : 1,
                  }}>{opt.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate button */}
          <button onClick={handleGenerate} disabled={loading} style={{
            width: "100%", padding: "14px 24px", borderRadius: 12,
            background: loading ? `rgba(${accentRgb},0.15)` : `linear-gradient(135deg, rgba(${accentRgb},0.9), rgba(99,102,241,0.9))`,
            border: `1px solid rgba(${accentRgb},0.3)`,
            color: "white", fontSize: 15, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s", letterSpacing: "0.02em", minHeight: 48,
          }}>
            {loading ? "Generating..." : `Generate ${qty} ${format.toUpperCase()}${qty > 1 ? "s" : ""}`}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171", fontSize: 14, marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "24px", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                {results.length} {format.toUpperCase()} {results.length > 1 ? "IDs" : "ID"} Generated
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={copyAll} style={{
                  padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                  border: `1px solid rgba(${accentRgb},0.3)`,
                  background: allCopied ? `rgba(${accentRgb},0.2)` : `rgba(${accentRgb},0.08)`,
                  color: accent, cursor: "pointer", transition: "all 0.15s",
                }}>
                  {allCopied ? "Copied!" : "Copy All"}
                </button>
                <button onClick={download} style={{
                  padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.09)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.15s",
                }}>
                  Download .txt
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {results.map((id, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
                  padding: "10px 14px", borderRadius: 10,
                  background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)",
                  opacity: 0, animation: `fadeSlideIn 0.3s ease forwards ${i * 40}ms`,
                }}>
                  <span style={{ fontFamily: "monospace", fontSize: 13, color: "rgba(255,255,255,0.85)", wordBreak: "break-all" as const }}>{id}</span>
                  <button onClick={() => copyOne(id)} style={{
                    flexShrink: 0, padding: "5px 12px", borderRadius: 7, fontSize: 12, fontWeight: 600,
                    border: `1px solid ${copied === id ? `rgba(${accentRgb},0.4)` : "rgba(255,255,255,0.08)"}`,
                    background: copied === id ? `rgba(${accentRgb},0.12)` : "rgba(255,255,255,0.04)",
                    color: copied === id ? accent : "rgba(255,255,255,0.65)",
                    cursor: "pointer", transition: "all 0.15s", minWidth: 60,
                  }}>
                    {copied === id ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How it works / comparison */}
        <section style={{ marginTop: 64, marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>
            UUID vs ULID vs NanoID — Which Should You Use?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 32, lineHeight: 1.7 }}>
            Different ID formats suit different use cases. Here is when to reach for each one.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { id: "UUID v4", color: accent, when: "Default choice for most applications. Database primary keys, session tokens, API keys — anywhere you need globally unique IDs without exposing a timestamp.", use: "Best for: General purpose, REST APIs, database PKs" },
              { id: "UUID v1", color: "#818cf8", when: "When you need to sort records by creation time without storing a separate timestamp. The embedded timestamp makes v1 IDs naturally ordered.", use: "Best for: Event logs, audit trails, time-ordered records" },
              { id: "UUID v5", color: "#fbbf24", when: "When the same input must always produce the same UUID. Useful for generating stable IDs for known entities — e.g. a UUID for every known domain name.", use: "Best for: Deterministic IDs, content hashing, idempotent operations" },
              { id: "ULID", color: "#34d399", when: "A drop-in replacement for UUID when lexicographic sorting matters. Stores as a 26-char string, encodes timestamp first — rows sort chronologically as strings.", use: "Best for: Database PKs where sort order equals insert order" },
              { id: "NanoID", color: "#f472b6", when: "When URL-safety and compactness matter. At 21 chars it has the same collision resistance as UUID v4 but is shorter and never needs URL encoding.", use: "Best for: URL slugs, short codes, URL-safe IDs" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px 22px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: item.color, marginBottom: 10 }}>{item.id}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 10 }}>{item.when}</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.05em" }}>{item.use}</p>
              </div>
            ))}
          </div>
        </section>


        <FaqPageSchema faqs={FAQS} />

        {/* FAQ */}
        <section style={{ marginTop: 64, marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 32 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { q: "What is a UUID?", a: "A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information in computer systems. It is formatted as 32 hexadecimal digits in groups of 8-4-4-4-12 separated by hyphens, e.g. 550e8400-e29b-41d4-a716-446655440000." },
              { q: "What is the difference between UUID v1 and UUID v4?", a: "UUID v1 is time-based, embedding the current timestamp and making IDs sortable by creation time. UUID v4 is completely random, offering better privacy since it reveals nothing about when or where it was generated. v4 is the most widely used format." },
              { q: "What is UUID v5 and when should I use it?", a: "UUID v5 is deterministic — it generates a UUID by hashing a namespace UUID and a name string using SHA-1. The same namespace and name always produce the same UUID. This is ideal for generating stable IDs for known entities like domain names or product SKUs." },
              { q: "What is a ULID and how does it differ from a UUID?", a: "A ULID (Universally Unique Lexicographically Sortable Identifier) encodes a millisecond timestamp in its first 10 characters, making it naturally sortable as a string. Unlike UUIDs, ULIDs sort in creation order — useful for database primary keys where chronological ordering matters without a separate created_at column." },
              { q: "Are the IDs generated client-side? Do they leave my browser?", a: "Yes — all ID generation happens entirely in your browser using the Web Crypto API. No data is sent to any server, making this tool instantaneous and completely private." },
              { q: "What is the best free UUID generator?", a: "ToolStack UUID Generator supports UUID v4, v1, v5, ULID, and NanoID — all free, no signup, 100% client-side. You can generate up to 100 IDs at once with formatting options including uppercase, no-hyphens, and braces. It is the most complete free UUID tool available." },
              { q: "Are UUIDs truly unique? Can two be the same?", a: "UUID v4 has 122 bits of randomness, giving 2^122 possible values. The probability of generating a duplicate is astronomically small. For all practical purposes, UUIDs can be treated as globally unique identifiers." },
            ].map((faq, i) => (
              <div key={i} style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 10, lineHeight: 1.4 }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <MoreTools currentSlug="uuid-generator" />
        
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
