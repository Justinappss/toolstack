"use client";
export const dynamic = "force-static";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const FAQS = [
  { q: "Who is playing in the 2026 Champions League final?", a: "The 2026 UEFA Champions League final is Paris Saint-Germain vs Arsenal, played on 30 May 2026 at Puskás Aréna in Budapest, Hungary." },
  { q: "What is an accumulator bet?", a: "An accumulator (or acca) is a single bet combining two or more individual selections. All selections must win for the bet to pay out. The odds multiply together, offering much larger potential returns than single bets — but the risk increases with every leg you add." },
  { q: "How do I use the UCL Final accumulator calculator?", a: "PSG vs Arsenal is pre-filled as your first selection. Enter your stake, add odds for each leg, choose your format (decimal, fractional or American), and the calculator instantly shows your combined return, profit and implied probability." },
  { q: "What are the best markets for a UCL Final accumulator?", a: "Popular UCL final acca markets include: both teams to score (BTTS), first goalscorer, correct score, anytime goalscorer combinations, and Asian handicap selections. Combining match result with BTTS or a goalscorer gives competitive odds without taking on extreme risk." },
  { q: "What is the difference between decimal, fractional and American odds?", a: "Decimal odds (e.g. 2.50) show total return per £1 staked including stake back. Fractional odds (e.g. 6/4) show profit relative to stake. American odds use +/- notation: +250 means £250 profit on a £100 stake, while -150 means you must stake £150 to win £100 profit." },
  { q: "How do you calculate accumulator returns?", a: "Convert all odds to decimal, multiply them together for combined odds, multiply by stake for total return, then subtract stake for profit. Example: 2.0 × 3.0 × 1.5 = 9.0 combined odds. £10 × 9.0 = £90 return, £80 profit." },
];

type OddsFormat = "Decimal" | "Fractional" | "American";

interface Selection {
  id: number;
  match: string;
  format: OddsFormat;
  odds: string;
}

const CURRENCIES = [
  { code: "GBP", sym: "£" },
  { code: "EUR", sym: "€" },
  { code: "USD", sym: "$" },
  { code: "AUD", sym: "A$" },
];

function toDecimal(format: OddsFormat, value: string): number | null {
  const v = value.trim();
  if (!v) return null;
  if (format === "Decimal") {
    const n = parseFloat(v);
    return n > 1 ? n : null;
  }
  if (format === "Fractional") {
    const parts = v.split("/");
    if (parts.length !== 2) return null;
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (isNaN(num) || isNaN(den) || den === 0 || num < 0) return null;
    return (num / den) + 1;
  }
  if (format === "American") {
    const n = parseFloat(v.replace("+", ""));
    if (isNaN(n) || n === 0) return null;
    if (n > 0) return (n / 100) + 1;
    return (100 / Math.abs(n)) + 1;
  }
  return null;
}

function fmt(sym: string, value: number): string {
  return `${sym}${value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const ACCENT = "#22c55e";
const ACCENT_DIM = "rgba(34,197,94,0.12)";
const ACCENT_BORDER = "rgba(34,197,94,0.3)";
const UCL_BLUE = "#1d4ed8";
const UCL_BLUE_DIM = "rgba(29,78,216,0.12)";
const UCL_BLUE_BORDER = "rgba(29,78,216,0.3)";

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.035)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 20,
  padding: "28px 32px",
  marginBottom: 20,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: "rgba(255,255,255,0.45)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  padding: "11px 14px",
  color: "white",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "UCL Final 2026 Accumulator Calculator — PSG vs Arsenal",
      description: "Free Champions League final 2026 accumulator calculator. PSG vs Arsenal, 30 May 2026. Enter 2–8 selections with decimal, fractional or American odds to calculate combined return, profit and implied probability.",
      url: "https://toolstack.tech/tools/ucl-final-accumulator-2026",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "PSG vs Arsenal pre-filled",
        "Supports decimal, fractional and American odds",
        "2–8 selections per accumulator",
        "Multi-currency: GBP, EUR, USD, AUD",
        "Live combined odds calculation",
        "Implied probability per leg and overall",
        "No signup required",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ToolStack", item: "https://toolstack.tech" },
        { "@type": "ListItem", position: 2, name: "Sports", item: "https://toolstack.tech/tools?category=sports" },
        { "@type": "ListItem", position: 3, name: "UCL Final 2026 Accumulator Calculator", item: "https://toolstack.tech/tools/ucl-final-accumulator-2026" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is playing in the 2026 Champions League final?",
          acceptedAnswer: { "@type": "Answer", text: "The 2026 UEFA Champions League final is Paris Saint-Germain vs Arsenal, played on 30 May 2026 at Puskás Aréna in Budapest, Hungary." },
        },
        {
          "@type": "Question",
          name: "What is an accumulator bet?",
          acceptedAnswer: { "@type": "Answer", text: "An accumulator (or acca) is a single bet combining two or more individual selections. All selections must win for the bet to pay out. The odds multiply together, offering much larger potential returns than single bets — but the risk increases with every leg you add." },
        },
        {
          "@type": "Question",
          name: "How do I use the UCL Final accumulator calculator?",
          acceptedAnswer: { "@type": "Answer", text: "PSG vs Arsenal is pre-filled as your first selection. Enter your stake, add odds for each leg, choose your format (decimal, fractional or American), and the calculator instantly shows your combined return, profit and implied probability." },
        },
        {
          "@type": "Question",
          name: "What are the best markets for a UCL Final accumulator?",
          acceptedAnswer: { "@type": "Answer", text: "Popular UCL final acca markets include: both teams to score (BTTS), first goalscorer, correct score, anytime goalscorer combinations, and Asian handicap selections. Combining match result with BTTS or a goalscorer gives competitive odds without taking on extreme risk." },
        },
        {
          "@type": "Question",
          name: "What is the difference between decimal, fractional and American odds?",
          acceptedAnswer: { "@type": "Answer", text: "Decimal odds (e.g. 2.50) show total return per £1 staked including stake back. Fractional odds (e.g. 6/4) show profit relative to stake. American odds use +/- notation: +250 means £250 profit on a £100 stake, while -150 means you must stake £150 to win £100 profit." },
        },
        {
          "@type": "Question",
          name: "How do you calculate accumulator returns?",
          acceptedAnswer: { "@type": "Answer", text: "Convert all odds to decimal, multiply them together for combined odds, multiply by stake for total return, then subtract stake for profit. Example: 2.0 × 3.0 × 1.5 = 9.0 combined odds. £10 × 9.0 = £90 return, £80 profit." },
        },
      ],
    },
  ],
};

export default function UCLFinalAccumulatorPage() {
  const [currIdx, setCurrIdx] = useState(0);
  const [stakeStr, setStakeStr] = useState("10");
  const [selections, setSelections] = useState<Selection[]>([
    { id: 1, match: "PSG vs Arsenal", format: "Decimal", odds: "" },
    { id: 2, match: "", format: "Decimal", odds: "" },
  ]);
  const [nextId, setNextId] = useState(3);

  const sym = CURRENCIES[currIdx].sym;
  const stake = parseFloat(stakeStr) || 0;

  const decimalOdds = selections.map(s => toDecimal(s.format, s.odds));
  const allValid = stake > 0 && decimalOdds.every(d => d !== null) && selections.length >= 2;
  const combined = allValid ? decimalOdds.reduce((acc, d) => acc * (d as number), 1) : null;
  const totalReturn = combined !== null ? stake * combined : null;
  const profit = totalReturn !== null ? totalReturn - stake : null;
  const impliedPct = combined !== null ? (1 / combined) * 100 : null;

  const addSelection = useCallback(() => {
    if (selections.length < 8) {
      setSelections(prev => [...prev, { id: nextId, match: "", format: "Decimal", odds: "" }]);
      setNextId(n => n + 1);
    }
  }, [selections.length, nextId]);

  const removeSelection = useCallback((id: number) => {
    if (selections.length > 2) {
      setSelections(prev => prev.filter(s => s.id !== id));
    }
  }, [selections.length]);

  const updateSelection = useCallback((id: number, field: keyof Selection, value: string) => {
    setSelections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }, []);

  const oddsPlaceholder = (format: OddsFormat) => {
    if (format === "Decimal") return "e.g. 2.50";
    if (format === "Fractional") return "e.g. 6/4";
    return "e.g. +150";
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(29,78,216,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "40%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 36, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools/category/sports" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Sports</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>UCL Final 2026 Accumulator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {["⭐ UCL Final 2026", "PSG vs Arsenal", "Free Forever", "No Signup"].map(b => (
              <span key={b} style={{ fontSize: 12, fontWeight: 700, color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 999, padding: "4px 12px" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            UCL Final 2026{" "}
            <span style={{ background: `linear-gradient(135deg, ${ACCENT}, #16a34a)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Accumulator Calculator
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 620, margin: "0 0 16px" }}>
            Build your Champions League final acca in seconds. PSG vs Arsenal is pre-filled — mix decimal, fractional or American odds across up to 8 selections and see your combined return instantly.
          </p>
          {/* Match badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: UCL_BLUE_DIM, border: `1px solid ${UCL_BLUE_BORDER}`, borderRadius: 12, padding: "10px 18px" }}>
            <span style={{ fontSize: 20 }}>⭐</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "white" }}>PSG vs Arsenal</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>30 May 2026 · Puskás Aréna, Budapest</div>
            </div>
          </div>
        </div>

        {/* Main tool card */}
        <div style={cardStyle}>

          {/* Stake + currency row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
            <div>
              <label style={labelStyle}>Your Stake</label>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <span style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRight: "none", borderRadius: "10px 0 0 10px", padding: "11px 14px", fontSize: 15, color: "rgba(255,255,255,0.7)", fontWeight: 700, whiteSpace: "nowrap" }}>{sym}</span>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={stakeStr}
                  onChange={e => setStakeStr(e.target.value)}
                  style={{ ...inputStyle, borderRadius: "0 10px 10px 0", borderLeft: "none" }}
                  placeholder="10.00"
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Currency</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CURRENCIES.map((c, i) => (
                  <button key={c.code} onClick={() => setCurrIdx(i)} style={{
                    padding: "10px 16px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
                    background: i === currIdx ? ACCENT_DIM : "rgba(255,255,255,0.04)",
                    border: `1px solid ${i === currIdx ? ACCENT_BORDER : "rgba(255,255,255,0.1)"}`,
                    color: i === currIdx ? ACCENT : "rgba(255,255,255,0.6)",
                    transition: "all 0.15s",
                  }}>{c.code}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Selections */}
          <label style={{ ...labelStyle, marginBottom: 16 }}>Your Selections ({selections.length}/8)</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {selections.map((sel, idx) => {
              const dec = toDecimal(sel.format, sel.odds);
              const legProb = dec !== null ? ((1 / dec) * 100).toFixed(1) : null;
              const hasOdds = dec !== null;
              return (
                <div key={sel.id} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${hasOdds ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 14,
                  padding: "16px 20px",
                  transition: "border-color 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: hasOdds ? ACCENT : "rgba(255,255,255,0.1)",
                      fontSize: 11, fontWeight: 900, color: hasOdds ? "#052e16" : "rgba(255,255,255,0.4)",
                      flexShrink: 0, transition: "background 0.2s",
                    }}>{idx + 1}</span>
                    <input
                      type="text"
                      value={sel.match}
                      onChange={e => updateSelection(sel.id, "match", e.target.value)}
                      placeholder="Match or market (optional)"
                      style={{ ...inputStyle, flex: 1 }}
                    />
                    {selections.length > 2 && (
                      <button onClick={() => removeSelection(sel.id)} style={{
                        background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                        borderRadius: 8, padding: "6px 10px", color: "#f87171", fontSize: 14, cursor: "pointer",
                        fontWeight: 700, flexShrink: 0,
                      }}>✕</button>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "end" }}>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: 8 }}>Format</label>
                      <div style={{ display: "flex", gap: 6 }}>
                        {(["Decimal", "Fractional", "American"] as OddsFormat[]).map(f => (
                          <button key={f} onClick={() => updateSelection(sel.id, "format", f)} style={{
                            padding: "7px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                            background: sel.format === f ? ACCENT_DIM : "rgba(255,255,255,0.04)",
                            border: `1px solid ${sel.format === f ? ACCENT_BORDER : "rgba(255,255,255,0.08)"}`,
                            color: sel.format === f ? ACCENT : "rgba(255,255,255,0.5)",
                            transition: "all 0.15s", whiteSpace: "nowrap",
                          }}>{f}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: 8 }}>Odds</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <input
                          type="text"
                          value={sel.odds}
                          onChange={e => updateSelection(sel.id, "odds", e.target.value)}
                          placeholder={oddsPlaceholder(sel.format)}
                          style={{ ...inputStyle, maxWidth: 140 }}
                        />
                        {legProb && (
                          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
                            {legProb}% implied
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add selection button */}
          {selections.length < 8 && (
            <button onClick={addSelection} style={{
              marginTop: 12, width: "100%", padding: "12px", borderRadius: 12,
              background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 700, cursor: "pointer",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT_BORDER; e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
            >
              + Add Selection ({selections.length}/8)
            </button>
          )}
        </div>

        {/* Results */}
        {allValid && combined !== null && totalReturn !== null && profit !== null && impliedPct !== null ? (
          <div style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 20,
            padding: "28px 32px",
            marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: ACCENT, margin: "0 0 24px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Your Accumulator
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 28 }}>
              {[
                { label: "Combined Odds", value: combined.toFixed(2) + "x", sub: "Decimal" },
                { label: "Total Return", value: fmt(sym, totalReturn), sub: "Includes stake" },
                { label: "Profit", value: fmt(sym, profit), sub: "If all legs win" },
                { label: "Implied Probability", value: impliedPct.toFixed(1) + "%", sub: "Chance of winning" },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14, padding: "18px 20px",
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>{stat.label}</p>
                  <p style={{ fontSize: 26, fontWeight: 900, color: ACCENT, margin: "0 0 4px", letterSpacing: "-0.02em" }}>{stat.value}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Per-leg breakdown */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 12px" }}>Leg Breakdown</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {selections.map((sel, idx) => {
                  const dec = decimalOdds[idx] as number;
                  const prob = ((1 / dec) * 100).toFixed(1);
                  return (
                    <div key={sel.id} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      gap: 12, padding: "10px 16px", borderRadius: 10,
                      background: "rgba(255,255,255,0.03)", flexWrap: "wrap",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 900, color: "#052e16", flexShrink: 0 }}>{idx + 1}</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                          {sel.match || `Selection ${idx + 1}`}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{sel.odds} ({sel.format})</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: ACCENT }}>{dec.toFixed(2)}x</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{prob}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {impliedPct < 10 && (
              <p style={{ marginTop: 16, fontSize: 12, color: "rgba(251,191,36,0.8)", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 10, padding: "10px 14px" }}>
                ⚠️ Your accumulator has a {impliedPct.toFixed(1)}% implied chance of winning. High-odds accas offer big returns but low probability — manage your bankroll responsibly.
              </p>
            )}
          </div>
        ) : (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: 20, padding: "32px",
            textAlign: "center", marginBottom: 20,
          }}>
            <p style={{ fontSize: 28, marginBottom: 12 }}>⭐</p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              Enter your stake and odds for each selection to calculate your UCL final accumulator return.
            </p>
          </div>
        )}

        {/* Popular markets card */}
        <div style={{ ...cardStyle, background: UCL_BLUE_DIM, border: `1px solid ${UCL_BLUE_BORDER}` }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: "white", margin: "0 0 6px" }}>Popular UCL Final Markets</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 0 20px" }}>PSG vs Arsenal · 30 May 2026 — use these as inspiration for your legs</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { market: "Match Result (1X2)", desc: "PSG win / Draw / Arsenal win. The most straightforward leg to anchor your acca." },
              { market: "Both Teams to Score", desc: "BTTS Yes/No. Both sides have attacking quality — a popular acca leg." },
              { market: "First Goalscorer", desc: "Boost your odds with a goalscorer market alongside match result." },
              { market: "Asian Handicap", desc: "Tighter margins than 1X2. Good for boosting odds on a perceived favourite." },
              { market: "Total Goals Over/Under", desc: "Over/Under 2.5 goals. UCL finals tend to be tight — under markets often value." },
              { market: "Correct Score", desc: "High-risk, high-reward leg. Combine with safer legs to balance the acca." },
            ].map(m => (
              <div key={m.market} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: "white", margin: "0 0 4px" }}>{m.market}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: "0 0 8px" }}>How It Works</h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>Four steps to build your UCL final accumulator</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {[
              { n: "1", title: "Set your stake", desc: "Enter how much you want to bet and pick your currency (GBP, EUR, USD, AUD)." },
              { n: "2", title: "Add selections", desc: "PSG vs Arsenal is pre-filled. Add 1–7 more legs from any market." },
              { n: "3", title: "Enter odds", desc: "Choose decimal, fractional or American format and type in your odds." },
              { n: "4", title: "See your return", desc: "Combined odds, profit and implied probability calculate live as you type." },
            ].map(step => (
              <div key={step.n} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: ACCENT, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Odds format guide */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Odds Format Quick Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { format: "Decimal (2.50)", desc: "Total return per £1 staked — includes your stake back. Most common in Europe and Australia.", ex: "£10 × 2.50 = £25 return (£15 profit)" },
              { format: "Fractional (6/4)", desc: "Shows profit relative to stake. 6/4 means £6 profit for every £4 staked. Standard at UK bookmakers.", ex: "£10 × (6/4 + 1) = £25 return (£15 profit)" },
              { format: "American (+150 / -200)", desc: "+150 means £150 profit on a £100 stake. -200 means stake £200 to win £100 profit. Standard in the US.", ex: "+150: £10 → £25 return | -200: £10 → £15 return" },
            ].map(o => (
              <div key={o.format} style={{ padding: "18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: ACCENT, margin: "0 0 8px" }}>{o.format}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 10px", lineHeight: 1.6 }}>{o.desc}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0, fontStyle: "italic" }}>{o.ex}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />

        {/* FAQ */}
        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 24px" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map(faq => (
              <div key={faq.q} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Authority bridge */}
        <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: "24px 28px", marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(99,102,241,0.9)", margin: "0 0 8px" }}>⭐ More ToolStack Sports Tools</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 14px", lineHeight: 1.6 }}>
            Also try our{" "}
            <Link href="/tools/world-cup-accumulator-calculator" style={{ color: "#a5b4fc", textDecoration: "none", fontWeight: 700 }}>World Cup 2026 Accumulator Calculator</Link>{" "}
            for the tournament this summer, or explore the full{" "}
            <Link href="/tools" style={{ color: "#a5b4fc", textDecoration: "none", fontWeight: 700 }}>free tool collection</Link>.
          </p>
        </div>

        <MoreTools currentSlug="ucl-final-accumulator-2026" />
      </div>
    </div>
  );
}
