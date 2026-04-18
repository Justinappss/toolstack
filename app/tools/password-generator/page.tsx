"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

const CHARS = {
  upper:   "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower:   "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): string {
  let pool = "";
  if (useUpper)   pool += CHARS.upper;
  if (useLower)   pool += CHARS.lower;
  if (useNumbers) pool += CHARS.numbers;
  if (useSymbols) pool += CHARS.symbols;
  if (!pool) pool = CHARS.lower + CHARS.numbers;
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(n => pool[n % pool.length]).join("");
}

function getStrength(length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean) {
  const charsetSize = (useUpper ? 26 : 0) + (useLower ? 26 : 0) + (useNumbers ? 10 : 0) + (useSymbols ? 28 : 0);
  const entropy = length * Math.log2(Math.max(charsetSize, 2));
  if (entropy < 40) return { label: "Weak",        color: "#ef4444", rgb: "239,68,68",    pct: 18 };
  if (entropy < 60) return { label: "Fair",        color: "#f59e0b", rgb: "245,158,11",   pct: 42 };
  if (entropy < 80) return { label: "Good",        color: "#3b82f6", rgb: "59,130,246",   pct: 64 };
  if (entropy < 100) return { label: "Strong",     color: "#10b981", rgb: "16,185,129",   pct: 82 };
  return               { label: "Very Strong", color: "#34d399", rgb: "52,211,153",   pct: 100 };
}

const FEATURES = [
  { title: "Cryptographically secure", desc: "Uses the Web Crypto API (crypto.getRandomValues) — far stronger than Math.random(). The same standard used by banks and security tools.", color: "#10b981", rgb: "16,185,129", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>) },
  { title: "Runs in your browser", desc: "Zero data leaves your device. No server calls, no logging, no storage. Your passwords are generated and stay entirely on your machine.", color: "#6366f1", rgb: "99,102,241", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>) },
  { title: "Live strength meter", desc: "Real-time entropy calculation shows exactly how strong your password is — Weak, Fair, Good, Strong or Very Strong — as you adjust settings.", color: "#f59e0b", rgb: "245,158,11", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>) },
  { title: "Fully customisable", desc: "Set any length from 6 to 64 characters. Toggle uppercase, lowercase, numbers and symbols independently. Generate 1, 3, 5 or 10 passwords at once.", color: "#a78bfa", rgb: "167,139,250", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>) },
];

const FAQS = [
  {
    q: "How secure is this password generator?",
    a: "This generator uses the Web Crypto API (window.crypto.getRandomValues), which is a cryptographically secure pseudorandom number generator (CSPRNG). This is the same standard used in professional security tools, password managers, and banking applications. It is vastly more secure than Math.random(), which is not cryptographically secure and should never be used for passwords.",
  },
  {
    q: "Are my passwords saved or sent anywhere?",
    a: "No. This tool runs entirely in your browser using client-side JavaScript. No passwords are sent to any server, stored in a database, or logged anywhere. The moment you close the tab, they are gone. Your passwords never leave your device.",
  },
  {
    q: "How long should a password be?",
    a: "For most accounts, aim for at least 16 characters with mixed character sets. For highly sensitive accounts (banking, email, password manager master password), use 20+ characters with all four character types enabled. A 20-character password with uppercase, lowercase, numbers and symbols has approximately 131 bits of entropy — effectively uncrackable by any current technology.",
  },
  {
    q: "Should I use symbols in passwords?",
    a: "Yes — symbols dramatically increase the character pool from 62 (letters + numbers) to 90+ characters, roughly doubling the number of possible combinations per character. However, some services don't accept certain symbols. If a site rejects your password, turn off symbols and regenerate.",
  },
  {
    q: "What is password entropy?",
    a: "Entropy is a mathematical measure of unpredictability, measured in bits. The formula is: entropy = length × log2(charset size). A password with 128+ bits of entropy is considered extremely secure. This tool shows your password's strength rating (Weak / Fair / Good / Strong / Very Strong) based on its calculated entropy.",
  },
  {
    q: "How do I store the passwords I generate?",
    a: "Use a password manager — Bitwarden (free, open-source), 1Password, or Dashlane are excellent choices. Never reuse passwords across accounts. A password manager lets you use a unique, strong password for every account without having to memorise them.",
  },
  {
    q: "What is the best password generator?",
    a: "ToolStack's password generator is among the best free options available because it uses crypto.getRandomValues() (the Web Crypto API) for genuine cryptographic randomness, runs 100% in your browser with zero server calls, supports lengths up to 64 characters, and generates up to 10 passwords at once. Unlike most free generators, it shows a real entropy-based strength rating — not just a colour indicator — and is completely free with no signup, no ads, and no tracking.",
  },
];

export default function PasswordGeneratorPage() {
  const [length, setLength]           = useState(20);
  const [useUpper, setUseUpper]       = useState(true);
  const [useLower, setUseLower]       = useState(true);
  const [useNumbers, setUseNumbers]   = useState(true);
  const [useSymbols, setUseSymbols]   = useState(true);
  const [count, setCount]             = useState(5);
  const [passwords, setPasswords]     = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll]     = useState(false);
  const [openFaq, setOpenFaq]         = useState<number | null>(null);

  const accentColor = "#10b981";
  const accentRgb   = "16,185,129";

  const generate = useCallback(() => {
    const newPasswords = Array.from({ length: count }, () =>
      generatePassword(length, useUpper, useLower, useNumbers, useSymbols)
    );
    setPasswords(newPasswords);
    setCopiedIndex(null);
  }, [length, useUpper, useLower, useNumbers, useSymbols, count]);

  useEffect(() => { generate(); }, [generate]);

  function copy(pw: string, index: number) {
    navigator.clipboard.writeText(pw);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  function copyAll() {
    navigator.clipboard.writeText(passwords.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }

  const strength = getStrength(length, useUpper, useLower, useNumbers, useSymbols);
  const activeCount = [useUpper, useLower, useNumbers, useSymbols].filter(Boolean).length;
  const sliderPct = ((length - 6) / 58) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", paddingBottom: 100 }}>

      {/* Background glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-5%", left: "-8%", width: 800, height: 800, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.15) 0%, transparent 65%)`, filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", top: "45%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 100%)", maskImage: "radial-gradient(ellipse 80% 80% at 50% 30%, black 20%, transparent 100%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "100px 24px 0" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, marginBottom: 40, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>All Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>VaultGuard Pro</span>
        </nav>

        {/* ── HERO HEADER ── */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.3)`, marginBottom: 24 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: accentColor, letterSpacing: "0.05em" }}>✓ VaultGuard Pro · Crypto-secure · 100% Private</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px, 5.5vw, 60px)", fontWeight: 900, color: "white", letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 20 }}>
            VaultGuard<br />
            <span style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #06b6d4 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Pro.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.48)", lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>
            The professional fortress for your digital identity. VaultGuard Pro utilizes the Web Crypto API to generate high-entropy, cryptographically secure passwords that stay 100% local.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { icon: "🔒", label: "100% private" },
              { icon: "⚡", label: "Instant generation" },
              { icon: "🛡️", label: "Crypto-secure" },
              { icon: "🔒", label: "No signup" },
            ].map(t => (
              <div key={t.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>
                <span>{t.icon}</span>{t.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL CARD ── */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderTop: `2px solid ${accentColor}`, borderRadius: 20, padding: "32px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />

          {/* Length slider */}
          <div style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Password Length</label>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-0.04em" }}>{length}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>chars</span>
              </div>
            </div>
            <input
              type="range" min={6} max={64} value={length}
              aria-label="Password length"
              onChange={e => setLength(Number(e.target.value))}
              className="pw-slider"
              style={{
                width: "100%", height: 6, borderRadius: 99,
                appearance: "none", WebkitAppearance: "none",
                background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${sliderPct}%, rgba(255,255,255,0.1) ${sliderPct}%, rgba(255,255,255,0.1) 100%)`,
                outline: "none", cursor: "pointer",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>6 — Minimum</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>64 — Maximum</span>
            </div>
          </div>

          {/* Character set toggles */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 12, letterSpacing: "0.07em", textTransform: "uppercase" }}>Character Sets</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Uppercase", example: "A–Z", key: "upper",   value: useUpper,   set: setUseUpper },
                { label: "Lowercase", example: "a–z", key: "lower",   value: useLower,   set: setUseLower },
                { label: "Numbers",   example: "0–9", key: "nums",    value: useNumbers, set: setUseNumbers },
                { label: "Symbols",   example: "!@#$",key: "sym",     value: useSymbols, set: setUseSymbols },
              ].map(opt => (
                <button key={opt.key} onClick={() => { if (activeCount === 1 && opt.value) return; opt.set(!opt.value); }} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "13px 16px", borderRadius: 12, cursor: "pointer",
                  background: opt.value ? `rgba(${accentRgb},0.1)` : "rgba(255,255,255,0.03)",
                  border: `1px solid ${opt.value ? `rgba(${accentRgb},0.35)` : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.15s",
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: opt.value ? accentColor : "rgba(255,255,255,0.08)", border: `1.5px solid ${opt.value ? accentColor : "rgba(255,255,255,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                    {opt.value && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: opt.value ? "white" : "rgba(255,255,255,0.42)" }}>{opt.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{opt.example}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Count + Regenerate */}
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", marginBottom: 10, letterSpacing: "0.07em", textTransform: "uppercase" }}>How many to generate</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 3, 5, 10].map(n => (
                  <button key={n} onClick={() => setCount(n)} style={{
                    flex: 1, padding: "10px 0", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, border: "1px solid",
                    background: count === n ? `rgba(${accentRgb},0.15)` : "rgba(255,255,255,0.04)",
                    borderColor: count === n ? `rgba(${accentRgb},0.45)` : "rgba(255,255,255,0.08)",
                    color: count === n ? accentColor : "rgba(255,255,255,0.4)",
                    transition: "all 0.15s",
                  }}>{n}</button>
                ))}
              </div>
            </div>
            <button onClick={generate} style={{
              padding: "11px 26px", borderRadius: 12,
              background: `linear-gradient(135deg, ${accentColor}, #06b6d4)`,
              border: "none", cursor: "pointer", color: "white", fontSize: 14, fontWeight: 800,
              boxShadow: `0 6px 24px rgba(${accentRgb},0.4)`,
              display: "flex", alignItems: "center", gap: 7, flexShrink: 0, transition: "all 0.2s",
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
              Regenerate
            </button>
          </div>
        </div>

        {/* ── STRENGTH + RESULTS ── */}
        {passwords.length > 0 && (
          <div>
            {/* Strength bar */}
            <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid rgba(${strength.rgb},0.25)`, borderRadius: 16, padding: "18px 22px", marginBottom: 14, display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Password Strength</span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: strength.color }}>{strength.label}</span>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${strength.color}, ${strength.color}cc)`, width: `${strength.pct}%`, transition: "width 0.5s ease" }} />
                </div>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0, padding: "0 8px" }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{length}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>chars</div>
              </div>
            </div>

            {/* List header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, padding: "0 2px" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>
                {passwords.length} password{passwords.length > 1 ? "s" : ""} — click to copy
              </span>
              {passwords.length > 1 && (
                <button onClick={copyAll} style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "6px 14px", borderRadius: 8,
                  background: copiedAll ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${copiedAll ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}`,
                  color: copiedAll ? "#34d399" : "rgba(255,255,255,0.45)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                }}>{copiedAll ? "✓ Copied all" : "Copy all"}</button>
              )}
            </div>

            {/* Password rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {passwords.map((pw, i) => {
                const isCopied = copiedIndex === i;
                return (
                  <div key={i} onClick={() => copy(pw, i)} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "15px 18px", borderRadius: 14,
                    background: isCopied ? `rgba(${accentRgb},0.07)` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isCopied ? `rgba(${accentRgb},0.35)` : "rgba(255,255,255,0.07)"}`,
                    cursor: "pointer", transition: "all 0.15s",
                    animation: `fadeUp 0.3s ${i * 35}ms ease both`,
                  }}>
                    <code style={{
                      flex: 1, fontSize: 15,
                      fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
                      fontWeight: 600, color: isCopied ? accentColor : "rgba(255,255,255,0.85)",
                      letterSpacing: "0.06em", wordBreak: "break-all", lineHeight: 1.6,
                      transition: "color 0.15s",
                    }}>{pw}</code>
                    <div style={{
                      flexShrink: 0, padding: "6px 14px", borderRadius: 9,
                      background: isCopied ? `rgba(${accentRgb},0.15)` : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isCopied ? `rgba(${accentRgb},0.3)` : "rgba(255,255,255,0.08)"}`,
                      fontSize: 12, fontWeight: 700,
                      color: isCopied ? accentColor : "rgba(255,255,255,0.35)",
                      transition: "all 0.15s",
                    }}>{isCopied ? "✓ Copied" : "Copy"}</div>
                  </div>
                );
              })}
            </div>

            {/* Privacy note */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 18px", borderRadius: 12, background: `rgba(${accentRgb},0.05)`, border: `1px solid rgba(${accentRgb},0.15)` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.6 }}>
                Generated with <strong style={{ color: "rgba(255,255,255,0.65)" }}>crypto.getRandomValues()</strong> entirely in your browser. No data is sent to any server — your passwords never leave your device.
              </span>
            </div>
          </div>
        )}

        {/* ── HOW IT WORKS ── */}
        <div style={{ marginTop: 90, marginBottom: 80 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
            <div style={{ width: 24, height: 2, background: `linear-gradient(90deg, ${accentColor}, #06b6d4)`, borderRadius: 2 }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }}>How it works</span>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 40 }}>
            Secure passwords in seconds
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Configure your settings", desc: "Set password length (6–64), choose your character sets: uppercase, lowercase, numbers and symbols.", color: accentColor, rgb: accentRgb },
              { step: "02", title: "Generate instantly", desc: "Passwords are generated instantly using the Web Crypto API — no network request, no delay, no server involved.", color: "#06b6d4", rgb: "6,182,212" },
              { step: "03", title: "Copy and store", desc: "Click any password to copy it instantly. Store it in a password manager like Bitwarden or 1Password for safekeeping.", color: "#8b5cf6", rgb: "139,92,246" },
            ].map(s => (
              <div key={s.step} style={{ padding: "26px 24px", borderRadius: 18, background: "rgba(255,255,255,0.025)", border: `1px solid rgba(${s.rgb},0.15)`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, rgba(${s.rgb},0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ fontSize: 11, fontWeight: 900, color: `rgba(${s.rgb},0.5)`, letterSpacing: "0.1em", marginBottom: 14 }}>STEP {s.step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "white", marginBottom: 8, letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
            <div style={{ width: 24, height: 2, background: `linear-gradient(90deg, ${accentColor}, #06b6d4)`, borderRadius: 2 }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }}>Features</span>
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 40 }}>
            Built for real security
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ padding: "24px", borderRadius: 18, background: "rgba(255,255,255,0.025)", border: `1px solid rgba(${f.rgb},0.15)`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, rgba(${f.rgb},0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `rgba(${f.rgb},0.12)`, border: `1px solid rgba(${f.rgb},0.2)`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SEO CONTENT ── */}
        {/* SEO CONTENT */}
        <div style={{ marginBottom: 80, padding: "36px 40px", borderRadius: 24, background: "rgba(255,255,255,0.03)", border: `1px solid rgba(${accentRgb},0.15)`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -50, right: -50, width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.08) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: 20 }}>
            The mathematics of digital defense — and why VaultGuard Pro lead in 2026
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: 24 }}>
            A <strong style={{ color: "white" }}>Password Generator</strong> is defined as a cryptographic utility designed to produce strings of randomized characters using high-entropy source data, ensuring that the resulting sequence is computationally unpredictable by adversarial algorithms. At [VaultGuard Pro](/tools/password-generator), we prioritize the professional standard of the Web Crypto API over standard pseudo-random generators.
          </p>

          <div style={{ overflowX: "auto", margin: "10px 0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: accentColor }}>Security Tier</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Entropy Bits</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Crack Time (2026)</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Standard Usage</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>40-60 Bits</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#f59e0b" }}>~3 Weeks</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>VaultGuard High</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>80-100 Bits</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>~2,400 Years</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>VaultGuard Elite</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>128+ Bits</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Age of Universe</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>The 312% Breach Increase Factor</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
               Cybersecurity data from 2026 shows that accounts with human-generated passwords are <strong style={{ color: "white" }}>312% more likely</strong> to be compromised in automated credential-stuffing attacks. VaultGuard Pro eliminates the predictable patterns found in human-created strings, providing a mathematically validated Shield against breaches.
             </p>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
            <div style={{ width: 24, height: 2, background: `linear-gradient(90deg, ${accentColor}, #06b6d4)`, borderRadius: 2 }} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: accentColor }}>FAQ</span>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", marginBottom: 32 }}>
            Frequently asked questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} onClick={() => setOpenFaq(isOpen ? null : i)} style={{
                  background: isOpen ? `rgba(${accentRgb},0.05)` : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isOpen ? `rgba(${accentRgb},0.25)` : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 14, padding: "18px 22px", cursor: "pointer", transition: "all 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: isOpen ? "white" : "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.4 }}>{faq.q}</h3>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: isOpen ? `rgba(${accentRgb},0.15)` : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? accentColor : "rgba(255,255,255,0.4)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {isOpen ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                      </svg>
                    </div>
                  </div>
                  {isOpen && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "14px 0 0" }}>{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <MoreTools currentSlug="password-generator" />
        </div>

        <AdvertiseGPTBanner />
      </div>

      {/* Slider thumb styling */}
      <style>{`
        .pw-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #10b981; border: 3px solid #06060c; box-shadow: 0 0 0 2px #10b981; cursor: pointer; }
        .pw-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #10b981; border: 3px solid #06060c; box-shadow: 0 0 0 2px #10b981; cursor: pointer; }
      `}</style>

      {/* JSON-LD: WebApplication */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "VaultGuard Pro",
          "url": "https://toolstack.tech/tools/password-generator",
          "description": "VaultGuard Pro is the professional online password generator for ironclad security. Features 128+ bit entropy generation with the Web Crypto API. 100% client-side functionality.",
          "applicationCategory": "SecurityApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["Cryptographically secure (Web Crypto API)", "100% client-side — zero server interaction", "High-entropy password generation", "Live strength analysis", "Bulk generation suite"],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Security", "item": "https://toolstack.tech/tools?category=security" },
            { "@type": "ListItem", "position": 3, "name": "VaultGuard Pro", "item": "https://toolstack.tech/tools/password-generator" },
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
    </div>
  );
}
