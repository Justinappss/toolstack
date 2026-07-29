"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

/* ── Brand accents (original neon-dusk palette — not Rockstar trade dress) ── */
const ACCENT = "#ff2e88";
const ACCENT_DIM = "rgba(255,46,136,0.1)";
const ACCENT_BORDER = "rgba(255,46,136,0.25)";
const CYAN = "#22d3ee";
const CYAN_DIM = "rgba(34,211,238,0.1)";
const CYAN_BORDER = "rgba(34,211,238,0.25)";

const RELEASE_ISO = "2026-11-19T00:00:00Z";

/* ── Confirmed edition pricing (Rockstar, pre-orders opened 25 Jun 2026) ── */
const GAME_PRICES = {
  USD: { standard: 79.99, ultimate: 99.99, sym: "$" },
  GBP: { standard: 69.99, ultimate: 89.99, sym: "£" },
} as const;

type Currency = keyof typeof GAME_PRICES;
type Edition = "standard" | "ultimate";

/* ── Console options. USD RRP as of 1 Aug 2026 (Xbox increase effective that
      date). GBP intentionally has no preset — users enter their local price
      rather than us guessing a conversion. ── */
type ConsoleOption = {
  id: string;
  label: string;
  usd: number | null;
  compatible: boolean;
  note?: string;
};

const CONSOLES: ConsoleOption[] = [
  { id: "have", label: "I already own a PS5 or Xbox Series X|S", usd: 0, compatible: true },
  { id: "ps5-digital", label: "PS5 Digital Edition", usd: 599.99, compatible: true },
  { id: "ps5-disc", label: "PS5 (disc)", usd: 649.99, compatible: true },
  { id: "ps5-pro", label: "PS5 Pro", usd: 899.99, compatible: true },
  { id: "xss-512", label: "Xbox Series S (512GB)", usd: 499.99, compatible: true },
  { id: "xss-1tb", label: "Xbox Series S (1TB)", usd: 599.99, compatible: true },
  { id: "xsx-digital", label: "Xbox Series X Digital", usd: 749.99, compatible: true },
  { id: "xsx-disc", label: "Xbox Series X (disc)", usd: 799.99, compatible: true },
  { id: "ps4", label: "I only have a PS4", usd: null, compatible: false, note: "GTA 6 is not releasing on PS4. You'd need a PS5 or Xbox Series X|S." },
  { id: "xbone", label: "I only have an Xbox One", usd: null, compatible: false, note: "GTA 6 is not releasing on Xbox One. You'd need an Xbox Series X|S or PS5." },
  { id: "pc", label: "I only have a gaming PC", usd: null, compatible: false, note: "Rockstar has not announced a PC version. GTA V and Red Dead Redemption 2 both arrived on PC months after their console launches, so a later port is plausible but unconfirmed." },
];

export default function Gta6CostCalculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [edition, setEdition] = useState<Edition>("standard");
  const [consoleId, setConsoleId] = useState("have");
  const [consoleOverride, setConsoleOverride] = useState("");
  const [wantsOnline, setWantsOnline] = useState(false);
  const [onlineCost, setOnlineCost] = useState("");
  const [wantsStorage, setWantsStorage] = useState(false);
  const [storageCost, setStorageCost] = useState("");
  const [tradeIn, setTradeIn] = useState("");

  const sym = GAME_PRICES[currency].sym;
  const selected = CONSOLES.find(c => c.id === consoleId) ?? CONSOLES[0];

  const num = (s: string) => {
    const v = parseFloat(s);
    return Number.isFinite(v) && v > 0 ? v : 0;
  };

  const onConsoleChange = useCallback((id: string) => {
    setConsoleId(id);
    setConsoleOverride("");
  }, []);

  /* Preset only fills for USD — never fabricate a GBP console price. */
  const presetConsole = currency === "USD" ? selected.usd : (selected.id === "have" ? 0 : null);

  const consolePrice = consoleOverride !== ""
    ? num(consoleOverride)
    : (presetConsole ?? 0);

  const gamePrice = GAME_PRICES[currency][edition];
  const onlinePrice = wantsOnline ? num(onlineCost) : 0;
  const storagePrice = wantsStorage ? num(storageCost) : 0;
  const tradeInValue = num(tradeIn);

  const total = Math.max(0, gamePrice + consolePrice + onlinePrice + storagePrice - tradeInValue);

  const needsConsolePrice = presetConsole === null && consoleOverride === "" && selected.compatible;

  const fmt = (n: number) =>
    `${sym}${n.toLocaleString(currency === "GBP" ? "en-GB" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const daysToGo = useMemo(() => {
    const ms = new Date(RELEASE_ISO).getTime() - Date.now();
    return Math.max(0, Math.ceil(ms / 86400000));
  }, []);

  const lines = useMemo(() => {
    const rows: { label: string; value: number; muted?: boolean }[] = [
      { label: `GTA 6 — ${edition === "ultimate" ? "Ultimate" : "Standard"} Edition`, value: gamePrice },
    ];
    if (consolePrice > 0) rows.push({ label: selected.label.replace(/^I already own.*/, "Console"), value: consolePrice });
    if (onlinePrice > 0) rows.push({ label: "Online subscription (12 months)", value: onlinePrice });
    if (storagePrice > 0) rows.push({ label: "Extra storage", value: storagePrice });
    if (tradeInValue > 0) rows.push({ label: "Trade-in credit", value: -tradeInValue, muted: true });
    return rows;
  }, [edition, gamePrice, consolePrice, onlinePrice, storagePrice, tradeInValue, selected.label]);

  /* ── Schema ── */
  const faqs = [
    {
      q: "When does GTA 6 come out?",
      a: "Grand Theft Auto VI releases on 19 November 2026 for PlayStation 5 and Xbox Series X|S. Digital pre-loads begin on 12 November 2026, a week before launch.",
    },
    {
      q: "How much does GTA 6 cost?",
      a: "The Standard Edition is $79.99 in the US and £69.99 in the UK. The Ultimate Edition is $99.99 in the US and £89.99 in the UK. Pre-orders opened on 25 June 2026.",
    },
    {
      q: "Do I need a PS5 or Xbox Series X to play GTA 6?",
      a: "Yes. GTA 6 has only been confirmed for PlayStation 5 and Xbox Series X|S. It is not releasing on PS4 or Xbox One, and Rockstar has not announced a PC version.",
    },
    {
      q: "Is GTA 6 coming to PC?",
      a: "Rockstar has not announced a PC version. Both GTA V and Red Dead Redemption 2 launched on consoles first and arrived on PC months later, so a later PC release is plausible but entirely unconfirmed.",
    },
    {
      q: "Why is the total higher than the game price?",
      a: "Because GTA 6 is console-exclusive, many players also need hardware. This calculator adds the console, optional extra storage and an online subscription if you plan to play online, then subtracts any trade-in credit — so you see the real day-one figure rather than just the box price.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "GTA 6 Cost Calculator",
        url: "https://toolstack.tech/tools/gta-6-cost-calculator",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "Calculate the true day-one cost of playing GTA 6 — game edition, console, extra storage and online subscription, minus trade-in credit.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: "ToolStack", url: "https://toolstack.tech" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
          { "@type": "ListItem", position: 2, name: "Gaming", item: "https://toolstack.tech/tools/category/gaming" },
          { "@type": "ListItem", position: 3, name: "GTA 6 Cost Calculator", item: "https://toolstack.tech/tools/gta-6-cost-calculator" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  /* ── Shared styles ── */
  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "28px 26px",
    marginBottom: 28,
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: 8,
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 15,
    color: "white",
    fontFamily: "inherit",
    outline: "none",
  };
  const toggleRow: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14.5,
    color: "rgba(255,255,255,0.75)",
    cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "8%", width: 620, height: 620, background: "radial-gradient(circle, rgba(255,46,136,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "45%", right: "-12%", width: 520, height: 520, background: "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 36, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools/category/gaming" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Gaming</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>GTA 6 Cost Calculator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {["19 Nov 2026", "PS5 & Xbox Series X|S", "Free Forever", "No Signup"].map(b => (
              <span key={b} style={{ fontSize: 12, fontWeight: 700, color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 999, padding: "4px 12px" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            GTA 6{" "}
            <span style={{ background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Cost Calculator
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 640, margin: "0 0 18px" }}>
            The box price isn&apos;t the real price. GTA 6 is console-exclusive, so a lot of people need hardware too. Pick your setup and see what day one actually costs you.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: CYAN_DIM, border: `1px solid ${CYAN_BORDER}`, borderRadius: 12, padding: "10px 18px" }}>
            <span style={{ fontSize: 20 }}>🕓</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{daysToGo} days to launch</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>19 November 2026 · pre-load opens 12 November</div>
            </div>
          </div>
        </div>

        {/* ── Tool ── */}
        <div style={cardStyle}>

          {/* Currency + edition */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={labelStyle} htmlFor="currency">Currency</label>
              <select
                id="currency"
                value={currency}
                onChange={e => { setCurrency(e.target.value as Currency); setConsoleOverride(""); }}
                style={inputStyle}
              >
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="edition">Edition</label>
              <select id="edition" value={edition} onChange={e => setEdition(e.target.value as Edition)} style={inputStyle}>
                <option value="standard">Standard — {fmt(GAME_PRICES[currency].standard)}</option>
                <option value="ultimate">Ultimate — {fmt(GAME_PRICES[currency].ultimate)}</option>
              </select>
            </div>
          </div>

          {/* Console */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle} htmlFor="console">What are you playing on?</label>
            <select id="console" value={consoleId} onChange={e => onConsoleChange(e.target.value)} style={inputStyle}>
              {CONSOLES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>

            {!selected.compatible && (
              <div style={{ marginTop: 12, background: "rgba(255,46,136,0.08)", border: `1px solid ${ACCENT_BORDER}`, borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                <strong style={{ color: ACCENT }}>Not supported.</strong> {selected.note}
              </div>
            )}

            {selected.compatible && selected.id !== "have" && (
              <div style={{ marginTop: 12 }}>
                <label style={labelStyle} htmlFor="consolePrice">
                  Console price {presetConsole !== null ? "(edit if yours differs)" : "(enter your local price)"}
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "10px 0 0 10px", padding: "11px 14px", fontSize: 15, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>{sym}</span>
                  <input
                    id="consolePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={consoleOverride !== "" ? consoleOverride : (presetConsole !== null ? String(presetConsole) : "")}
                    onChange={e => setConsoleOverride(e.target.value)}
                    placeholder={presetConsole !== null ? String(presetConsole) : "e.g. 479.99"}
                    style={{ ...inputStyle, borderRadius: "0 10px 10px 0", borderLeft: "none" }}
                  />
                </div>
                {needsConsolePrice && (
                  <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", margin: "8px 0 0", lineHeight: 1.5 }}>
                    We only pre-fill US RRPs, so enter the price you&apos;d actually pay rather than us guessing a conversion.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Optional extras */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={toggleRow}>
                <input type="checkbox" checked={wantsOnline} onChange={e => setWantsOnline(e.target.checked)} style={{ width: 17, height: 17, accentColor: ACCENT }} />
                <span>I&apos;ll play online (needs PS Plus or Xbox Game Pass Core)</span>
              </label>
              {wantsOnline && (
                <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                  <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "10px 0 0 10px", padding: "11px 14px", fontSize: 15, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>{sym}</span>
                  <input
                    type="number" min="0" step="0.01" value={onlineCost}
                    onChange={e => setOnlineCost(e.target.value)}
                    placeholder="12-month subscription price"
                    style={{ ...inputStyle, borderRadius: "0 10px 10px 0", borderLeft: "none" }}
                    aria-label="Annual online subscription cost"
                  />
                </div>
              )}
            </div>

            <div>
              <label style={toggleRow}>
                <input type="checkbox" checked={wantsStorage} onChange={e => setWantsStorage(e.target.checked)} style={{ width: 17, height: 17, accentColor: ACCENT }} />
                <span>I need extra storage (this is going to be a huge install)</span>
              </label>
              {wantsStorage && (
                <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                  <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "10px 0 0 10px", padding: "11px 14px", fontSize: 15, color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>{sym}</span>
                  <input
                    type="number" min="0" step="0.01" value={storageCost}
                    onChange={e => setStorageCost(e.target.value)}
                    placeholder="SSD or expansion card price"
                    style={{ ...inputStyle, borderRadius: "0 10px 10px 0", borderLeft: "none" }}
                    aria-label="Extra storage cost"
                  />
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle} htmlFor="tradeIn">Trade-in credit (optional)</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "10px 0 0 10px", padding: "11px 14px", fontSize: 15, color: "rgba(255,255,255,0.7)", fontWeight: 700, whiteSpace: "nowrap" }}>−{sym}</span>
                <input
                  id="tradeIn" type="number" min="0" step="0.01" value={tradeIn}
                  onChange={e => setTradeIn(e.target.value)}
                  placeholder="What you'll get for your old console"
                  style={{ ...inputStyle, borderRadius: "0 10px 10px 0", borderLeft: "none" }}
                />
              </div>
            </div>
          </div>

          {/* ── Result ── */}
          <div style={{ background: `linear-gradient(135deg, ${ACCENT_DIM}, ${CYAN_DIM})`, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 14, padding: "24px 22px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
              Your day-one cost
            </div>
            <div style={{ fontSize: "clamp(34px, 7vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 18, fontVariantNumeric: "tabular-nums" }}>
              {selected.compatible ? fmt(total) : "—"}
            </div>

            {selected.compatible ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {lines.map(l => (
                  <div key={l.label} style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 14.5, color: l.muted ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.78)" }}>
                    <span>{l.label}</span>
                    <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {l.value < 0 ? `−${fmt(Math.abs(l.value))}` : fmt(l.value)}
                    </span>
                  </div>
                ))}
                {needsConsolePrice && (
                  <div style={{ fontSize: 13, color: ACCENT, marginTop: 6 }}>
                    Add your console price above for a complete total.
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.65 }}>
                Pick a PS5 or Xbox Series X|S option above to see what upgrading would cost you.
              </p>
            )}
          </div>

          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: "16px 0 0" }}>
            Game prices are Rockstar&apos;s confirmed RRPs. Console prices are US RRPs as of 1 August 2026 and are editable — always check your retailer.
          </p>
        </div>

        {/* ── Context ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 14px" }}>What we know for certain</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[
              { k: "Release date", v: "19 November 2026" },
              { k: "Pre-load opens", v: "12 November 2026" },
              { k: "Platforms", v: "PS5, Xbox Series X|S" },
              { k: "PC version", v: "Not announced" },
              { k: "Standard Edition", v: "$79.99 / £69.99" },
              { k: "Ultimate Edition", v: "$99.99 / £89.99" },
            ].map(row => (
              <div key={row.k} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{row.k}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{row.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 18px" }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {faqs.map(f => (
              <div key={f.q}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{f.q}</h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer — nominative reference only */}
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, marginBottom: 32 }}>
          ToolStack is an independent tools site and is not affiliated with, endorsed by or sponsored by Rockstar Games or Take-Two Interactive.
          &ldquo;Grand Theft Auto&rdquo; is a trademark of its respective owner and is referenced here for identification purposes only.
        </p>

        <MoreTools currentSlug="gta-6-cost-calculator" />
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
