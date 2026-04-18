"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { AdvertiseGPTBanner } from "@/components/AdvertiseGPTBanner";

/* ─── Country tipping data ─────────────────────────────── */
type CountryTip = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
  tipMin: number;
  tipMax: number;
  tipDefault: number;
  norm: string; // short cultural note
};

const COUNTRIES: CountryTip[] = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", symbol: "$", tipMin: 15, tipMax: 25, tipDefault: 18, norm: "Expected. 18–20% is standard; 25%+ for exceptional service." },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", symbol: "CA$", tipMin: 15, tipMax: 20, tipDefault: 15, norm: "Expected. 15–20% is the norm at sit-down restaurants." },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£", tipMin: 10, tipMax: 15, tipDefault: 10, norm: "Optional but appreciated. 10–12.5% is standard. Check for service charge." },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", symbol: "A$", tipMin: 0, tipMax: 15, tipDefault: 10, norm: "Optional. Staff earn good wages. 10% for great service." },
  { code: "IE", name: "Ireland", flag: "🇮🇪", currency: "EUR", symbol: "€", tipMin: 10, tipMax: 15, tipDefault: 10, norm: "Optional. 10–12.5% appreciated at restaurants." },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR", symbol: "€", tipMin: 5, tipMax: 10, tipDefault: 5, norm: "Round up or add 5–10%. Tip is given directly to server, not left on table." },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", symbol: "€", tipMin: 5, tipMax: 10, tipDefault: 5, norm: "Optional. Service charge often included. Leave change or small amount." },
  { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR", symbol: "€", tipMin: 0, tipMax: 10, tipDefault: 5, norm: "Optional. Round up or leave €1–2 per person. Cover charge (coperto) is not a tip." },
  { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR", symbol: "€", tipMin: 0, tipMax: 10, tipDefault: 5, norm: "Optional. Leave small change or €1–2 at sit-down restaurants." },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", currency: "EUR", symbol: "€", tipMin: 5, tipMax: 10, tipDefault: 5, norm: "Optional. Round up or 5–10% for good service." },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", symbol: "¥", tipMin: 0, tipMax: 0, tipDefault: 0, norm: "Do NOT tip. Tipping can be considered rude. Service is always included." },
  { code: "CN", name: "China", flag: "🇨🇳", currency: "CNY", symbol: "¥", tipMin: 0, tipMax: 0, tipDefault: 0, norm: "Not customary in most of China. Fine dining in tourist areas may expect 10%." },
  { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED", symbol: "AED", tipMin: 10, tipMax: 15, tipDefault: 10, norm: "10–15% appreciated, especially in Dubai and Abu Dhabi. Often included at hotels." },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", symbol: "₹", tipMin: 5, tipMax: 10, tipDefault: 5, norm: "5–10% at restaurants. At dhabas, rounding up the bill is common." },
  { code: "MX", name: "Mexico", flag: "🇲🇽", currency: "MXN", symbol: "MX$", tipMin: 10, tipMax: 20, tipDefault: 15, norm: "15–20% expected, similar to US norms. 10–15% at casual spots." },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", symbol: "R$", tipMin: 10, tipMax: 15, tipDefault: 10, norm: "10% service charge often added automatically. Additional tip optional." },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD", symbol: "S$", tipMin: 0, tipMax: 10, tipDefault: 0, norm: "10% service charge and GST are usually added. Extra tip not expected." },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", currency: "NZD", symbol: "NZ$", tipMin: 0, tipMax: 10, tipDefault: 0, norm: "Not expected. Staff earn minimum wage. 5–10% for excellent service is appreciated." },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF", symbol: "CHF", tipMin: 5, tipMax: 10, tipDefault: 5, norm: "Round up or leave 5–10%. Service is professional — staff are well-paid." },
  { code: "SE", name: "Sweden", flag: "🇸🇪", currency: "SEK", symbol: "kr", tipMin: 0, tipMax: 10, tipDefault: 5, norm: "Optional. 5–10% for sit-down dining. Not expected at cafes." },
];

/* ─── Service quality presets ────────────────────────────── */
const SERVICE_PRESETS = [
  { label: "Poor", emoji: "😞", modifier: -5 },
  { label: "Fair", emoji: "🙂", modifier: 0 },
  { label: "Good", emoji: "😊", modifier: 3 },
  { label: "Excellent", emoji: "🤩", modifier: 5 },
];

/* ─── Category suggestions ───────────────────────────────── */
const CATEGORIES = [
  { label: "Restaurant", icon: "🍽️", note: "Sit-down dining" },
  { label: "Bar / Café", icon: "☕", note: "Drinks and counter service" },
  { label: "Taxi / Ride-share", icon: "🚕", note: "Round up or 10–15%" },
  { label: "Hotel / Housekeeping", icon: "🏨", note: "$2–5 per night" },
  { label: "Hair / Beauty", icon: "💇", note: "15–20% of service" },
  { label: "Delivery", icon: "📦", note: "$3–5 or 15%" },
];

/* ─── JSON-LD ─────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Tip Calculator",
      "description": "Free tip calculator with bill splitter, tipping customs for 20+ countries, service quality presets and rounding options.",
      "url": "https://toolstack.tech/tools/tip-calculator",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web",
      "browserRequirements": "Requires JavaScript",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "featureList": [
        "Tipping customs for 20+ countries",
        "Bill split across any group size",
        "Service quality presets",
        "Custom tip percentage",
        "Bill rounding options",
        "Per-person amount calculation",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
        { "@type": "ListItem", "position": 2, "name": "Finance", "item": "https://toolstack.tech/tools?category=finance" },
        { "@type": "ListItem", "position": 3, "name": "Tip Calculator", "item": "https://toolstack.tech/tools/tip-calculator" },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much should I tip at a restaurant?",
          "acceptedAnswer": { "@type": "Answer", "text": "In the US and Canada, 15–20% is standard for sit-down dining, with 20–25% for exceptional service. In the UK, 10–12.5% is typical. In Japan and parts of Asia, tipping is not customary and may even be considered impolite. Use the country selector to see local norms." },
        },
        {
          "@type": "Question",
          "name": "What is the best free tip calculator?",
          "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's Tip Calculator is the most complete free option available — it includes tipping customs for 20+ countries, a bill splitter for any group size, service quality presets, and rounding options. No signup required and works on any device." },
        },
        {
          "@type": "Question",
          "name": "How do I split a bill evenly between friends?",
          "acceptedAnswer": { "@type": "Answer", "text": "Enter the total bill, choose your tip percentage, then set the number of people splitting. The calculator instantly shows each person's share including their portion of the tip. You can also round the per-person amount to the nearest dollar for easy cash payments." },
        },
        {
          "@type": "Question",
          "name": "Should I tip on the pre-tax or post-tax amount?",
          "acceptedAnswer": { "@type": "Answer", "text": "Tipping on the pre-tax (subtotal) amount is technically correct and what most etiquette guides recommend. However, tipping on the post-tax amount is common and makes the maths easier — the difference on a $50 bill is only about $0.50." },
        },
        {
          "@type": "Question",
          "name": "Do you tip in countries like Japan or Australia?",
          "acceptedAnswer": { "@type": "Answer", "text": "In Japan, tipping is not expected and can be considered rude — service excellence is a professional standard. In Australia, tipping is optional as staff earn a minimum wage; 10% for great service is appreciated. In the UAE, 10–15% is expected at restaurants. Always check local customs before you travel." },
        },
        {
          "@type": "Question",
          "name": "How much do you tip a taxi driver?",
          "acceptedAnswer": { "@type": "Answer", "text": "For taxis and ride-shares in the US, rounding up to the nearest dollar or tipping 10–15% is standard. In the UK, simply rounding up or adding £1–2 is typical. For ride-shares like Uber or Lyft, in-app tipping of $1–3 or 10–15% is appreciated but not mandatory." },
        },
        {
          "@type": "Question",
          "name": "Is a 20% tip good for a restaurant?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes — 20% is considered an excellent tip in the US and Canada and is a widely accepted standard for good service. In the UK, 20% would be considered very generous (the norm is 10–12.5%). The right tip depends heavily on the country you are dining in." },
        },
      ],
    },
  ],
};

/* ─── Helpers ─────────────────────────────────────────────── */
function fmt(amount: number, symbol: string): string {
  return `${symbol}${amount.toFixed(2)}`;
}

export default function TipCalculatorPage() {
  const [countryCode, setCountryCode] = useState("US");
  const [billAmount, setBillAmount] = useState("");
  const [tipPct, setTipPct] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [people, setPeople] = useState(1);
  const [servicePreset, setServicePreset] = useState<number | null>(1); // index into SERVICE_PRESETS
  const [roundUp, setRoundUp] = useState(false);

  const country = COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES[0];

  const handleCountryChange = useCallback((code: string) => {
    const c = COUNTRIES.find(x => x.code === code);
    if (!c) return;
    setCountryCode(code);
    setTipPct(c.tipDefault);
    setUseCustom(false);
    setServicePreset(1);
  }, []);

  const handlePreset = (idx: number) => {
    const preset = SERVICE_PRESETS[idx];
    const base = country.tipDefault;
    const newPct = Math.max(0, base + preset.modifier);
    setServicePreset(idx);
    setTipPct(newPct);
    setUseCustom(false);
  };

  const activeTipPct = useCustom && customTip !== "" ? parseFloat(customTip) || 0 : tipPct;
  const bill = parseFloat(billAmount) || 0;
  const tipAmount = bill * (activeTipPct / 100);
  const total = bill + tipAmount;
  const perPerson = people > 0 ? total / people : total;
  const perPersonRounded = Math.ceil(perPerson);
  const displayPerPerson = roundUp ? perPersonRounded : perPerson;

  /* ─── Styles ──────────────────────────────────────────────── */
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#080810",
    color: "white",
    fontFamily: "'Inter', -apple-system, sans-serif",
    position: "relative",
    overflow: "hidden",
  };
  const glow = (color: string, top: string, left: string, size = 500): React.CSSProperties => ({
    position: "absolute", top, left, width: size, height: size, borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    pointerEvents: "none", filter: "blur(80px)", zIndex: 0,
  });
  const wrapStyle: React.CSSProperties = { maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px", position: "relative", zIndex: 1 };
  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 24, padding: "28px 28px", marginBottom: 20,
  };
  const sectionTitle: React.CSSProperties = {
    fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.55)", margin: "0 0 16px",
  };
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 8, display: "block" };
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 12,
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "white", fontSize: 15, fontWeight: 600, outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={pageStyle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Ambient glows */}
      <div style={glow("rgba(16,185,129,0.12)", "-100px", "-100px")} />
      <div style={glow("rgba(99,102,241,0.08)", "40%", "60%", 400)} />
      <div style={glow("rgba(251,191,36,0.07)", "70%", "-5%", 350)} />

      <div style={wrapStyle}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>ToolStack</Link>
          <span>/</span>
          <Link href="/tools?category=finance" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Finance</Link>
          <span>/</span>
          <span style={{ color: "#34d399" }}>Tip Calculator</span>
        </nav>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { label: "Free Forever", color: "#34d399" },
              { label: "No Signup", color: "#818cf8" },
              { label: "20+ Countries", color: "#fbbf24" },
              { label: "Bill Splitter", color: "#f472b6" },
            ].map(b => (
              <span key={b.label} style={{
                fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 999,
                border: `1px solid ${b.color}40`, background: `${b.color}15`,
                color: b.color, letterSpacing: "0.04em",
              }}>{b.label}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(34px, 6vw, 52px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
            Tip Calculator &{" "}
            <span style={{ background: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Bill Splitter
            </span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Calculate the perfect tip and split the bill instantly. See local tipping customs for 20+ countries — free, no signup.
          </p>
        </div>

        {/* ── STEP 1: Country ──────────────────────────────────── */}
        <div style={cardStyle}>
          <p style={sectionTitle}>Where are you dining?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {COUNTRIES.map(c => {
              const active = c.code === countryCode;
              return (
                <button
                  key={c.code}
                  onClick={() => handleCountryChange(c.code)}
                  style={{
                    padding: "7px 13px", borderRadius: 999, border: `1px solid ${active ? "rgba(52,211,153,0.55)" : "rgba(255,255,255,0.09)"}`,
                    background: active ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.03)",
                    color: active ? "#6ee7b7" : "rgba(255,255,255,0.55)",
                    fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
                  }}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Country tipping norm */}
          <div style={{
            marginTop: 16, padding: "14px 16px", borderRadius: 12,
            background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)",
          }}>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
              <span style={{ fontWeight: 800, color: "#34d399" }}>{country.flag} {country.name} tipping norm: </span>
              {country.norm}
              {country.tipDefault === 0
                ? " Tip amount will be set to 0%."
                : ` Suggested: ${country.tipMin}–${country.tipMax}%.`}
            </p>
          </div>
        </div>

        {/* ── STEP 2: Bill amount ──────────────────────────────── */}
        <div style={cardStyle}>
          <p style={sectionTitle}>Bill details</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <div>
              <label style={labelStyle}>Bill total ({country.symbol})</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder={`e.g. ${country.symbol}45.00`}
                value={billAmount}
                onChange={e => setBillAmount(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Number of people</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => setPeople(p => Math.max(1, p - 1))}
                  aria-label="Decrease people count"
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                    color: "white", fontSize: 18, cursor: "pointer", flexShrink: 0,
                  }}
                >−</button>
                <span style={{ fontSize: 22, fontWeight: 800, color: "white", minWidth: 32, textAlign: "center" }}>{people}</span>
                <button
                  onClick={() => setPeople(p => Math.min(30, p + 1))}
                  aria-label="Increase people count"
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                    color: "white", fontSize: 18, cursor: "pointer", flexShrink: 0,
                  }}
                >+</button>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                  {people === 1 ? "Just me" : `${people} people splitting`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── STEP 3: Tip % ────────────────────────────────────── */}
        <div style={cardStyle}>
          <p style={sectionTitle}>Tip percentage</p>

          {/* Service quality presets */}
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", margin: "0 0 10px" }}>Choose service quality:</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {SERVICE_PRESETS.map((p, i) => {
              const active = servicePreset === i && !useCustom;
              return (
                <button
                  key={p.label}
                  onClick={() => handlePreset(i)}
                  style={{
                    padding: "10px 18px", borderRadius: 12, border: `1px solid ${active ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.09)"}`,
                    background: active ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.04)",
                    color: active ? "#6ee7b7" : "rgba(255,255,255,0.6)",
                    fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 72,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tip % slider + custom */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Tip %</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: "#34d399" }}>{useCustom && customTip !== "" ? (parseFloat(customTip) || 0) : tipPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={useCustom ? (parseFloat(customTip) || 0) : tipPct}
                onChange={e => { setTipPct(parseInt(e.target.value)); setUseCustom(false); setServicePreset(null); }}
                style={{ width: "100%", accentColor: "#34d399", cursor: "pointer" }}
                aria-label="Tip percentage slider"
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                <span>0%</span><span>10%</span><span>20%</span><span>30%</span><span>40%</span>
              </div>
            </div>
            <div style={{ minWidth: 100 }}>
              <label style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", display: "block", marginBottom: 6 }}>Custom %</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                placeholder="e.g. 12.5"
                value={customTip}
                onChange={e => { setCustomTip(e.target.value); setUseCustom(true); setServicePreset(null); }}
                style={{ ...inputStyle, width: 100, textAlign: "center" }}
              />
            </div>
          </div>

          {/* Quick % buttons */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            {[5, 10, 12.5, 15, 18, 20, 25].map(pct => (
              <button
                key={pct}
                onClick={() => { setTipPct(pct); setUseCustom(false); setServicePreset(null); }}
                style={{
                  padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                  border: `1px solid ${(!useCustom && tipPct === pct) ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.09)"}`,
                  background: (!useCustom && tipPct === pct) ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.04)",
                  color: (!useCustom && tipPct === pct) ? "#6ee7b7" : "rgba(255,255,255,0.55)",
                }}
              >{pct}%</button>
            ))}
          </div>
        </div>

        {/* ── RESULTS ─────────────────────────────────────────── */}
        <div style={{
          ...cardStyle,
          background: "rgba(52,211,153,0.06)",
          border: "1px solid rgba(52,211,153,0.25)",
          marginBottom: 20,
        }}>
          <p style={{ ...sectionTitle, color: "#34d399" }}>Your totals</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {[
              { label: "Tip amount", value: fmt(tipAmount, country.symbol), sub: `${activeTipPct}% of bill` },
              { label: "Total (bill + tip)", value: fmt(total, country.symbol), sub: "Full amount to pay" },
              { label: people > 1 ? `Each person pays` : "You pay", value: fmt(displayPerPerson, country.symbol), sub: people > 1 ? `Split ${people} ways` : "Total including tip", highlight: true },
            ].map(item => (
              <div key={item.label} style={{
                padding: "18px 20px", borderRadius: 16,
                background: item.highlight ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${item.highlight ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.07)"}`,
                textAlign: "center",
              }}>
                <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 8px" }}>{item.label}</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: item.highlight ? "#34d399" : "white", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{bill > 0 ? item.value : "—"}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", margin: 0 }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Round up toggle */}
          {people > 1 && (
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={() => setRoundUp(r => !r)}
                role="switch"
                aria-checked={roundUp}
                style={{
                  width: 44, height: 24, borderRadius: 999, border: "none", cursor: "pointer",
                  background: roundUp ? "#34d399" : "rgba(255,255,255,0.15)",
                  position: "relative", transition: "background 0.2s", flexShrink: 0,
                }}
              >
                <span style={{
                  position: "absolute", top: 2, left: roundUp ? 22 : 2, width: 20, height: 20,
                  borderRadius: "50%", background: "white", transition: "left 0.2s",
                }} />
              </button>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
                Round up per person to nearest {country.symbol}1 (makes cash easier)
              </span>
            </div>
          )}

          {/* Tip breakdown row */}
          {bill > 0 && (
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 12, background: "rgba(0,0,0,0.2)", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                {fmt(bill, country.symbol)} bill
              </span>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>+</span>
              <span style={{ fontSize: 13, color: "#34d399", fontWeight: 700 }}>
                {fmt(tipAmount, country.symbol)} tip ({activeTipPct}%)
              </span>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>=</span>
              <span style={{ fontSize: 13, color: "white", fontWeight: 700 }}>
                {fmt(total, country.symbol)} total
              </span>
              {people > 1 && (
                <>
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>÷</span>
                  <span style={{ fontSize: 13, color: "#818cf8", fontWeight: 700 }}>
                    {people} people = {fmt(displayPerPerson, country.symbol)} each
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── TIPPING BY CATEGORY ──────────────────────────────── */}
        <div style={cardStyle}>
          <p style={sectionTitle}>Tipping by service type</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "0 0 16px" }}>
            Suggested tips vary by service. Here are common guidelines for {country.name}:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            {CATEGORIES.map(cat => (
              <div key={cat.label} style={{
                padding: "14px 16px", borderRadius: 14,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{cat.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "white" }}>{cat.label}</span>
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.5 }}>{cat.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            How to use the tip calculator
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 28px" }}>
            Three steps to the perfect tip and split — in under 10 seconds.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              {
                step: "01", color: "#34d399",
                title: "Select your country",
                body: "Choose where you're dining. The calculator automatically loads the local tipping norm and a suggested tip percentage for that country.",
              },
              {
                step: "02", color: "#818cf8",
                title: "Enter the bill amount",
                body: "Type in your total bill. Then set how many people are splitting. The calculator handles groups of 1 to 30.",
              },
              {
                step: "03", color: "#fbbf24",
                title: "Choose your tip",
                body: "Pick a service quality preset, drag the slider, or enter a custom percentage. The totals and per-person amounts update instantly.",
              },
            ].map(item => (
              <div key={item.step} style={{
                padding: "22px", borderRadius: 18,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, marginBottom: 14,
                  background: `${item.color}18`, border: `1px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 900, color: item.color, letterSpacing: "0.04em",
                }}>{item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO CONTENT ──────────────────────────────────────── */}
        <section style={{ marginBottom: 56, padding: "32px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 16px" }}>
            Tipping etiquette: a practical guide by country
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16 }}>
            Tipping customs vary enormously around the world. In the United States and Canada, a tip is effectively mandatory — leaving nothing signals poor service and can create an uncomfortable situation for staff who depend on gratuity to supplement low base wages. The standard is 15–20% at sit-down restaurants, rising to 25% for exceptional service.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16 }}>
            In Europe, tipping norms are more relaxed. In the UK, 10–12.5% is common but always check whether a service charge has already been added to the bill — you should not pay it twice. France, Germany, Italy and Spain treat tips as genuinely optional; rounding up or leaving small change is appreciated but never expected.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16 }}>
            In Japan, tipping is considered rude — the cultural philosophy is that good service is a professional standard, not something that requires a financial reward. Many restaurants and hotels will refuse tips entirely or even return them to you.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>
            Australia and New Zealand fall in the middle: tipping is optional because staff earn a strong minimum wage, but 10% for great service is welcomed. The UAE and other Gulf countries tend to expect 10–15% at international restaurants, particularly in Dubai and Abu Dhabi.
          </p>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 28px", letterSpacing: "-0.02em" }}>
            Frequently asked questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                q: "How much should I tip at a restaurant?",
                a: "In the US, 15–20% is the standard. In Canada, 15% is the floor. In the UK, 10–12.5% is typical. In Japan, tipping is not customary. Use the country selector above to get the exact norm for where you're dining.",
              },
              {
                q: "What is the best free tip calculator?",
                a: "ToolStack's Tip Calculator is the most complete free option: it includes tipping customs for 20+ countries, a bill splitter for groups up to 30, service quality presets, a custom tip percentage input, and bill rounding. No signup, no ads, works on any device.",
              },
              {
                q: "How do I split a bill between friends?",
                a: "Enter the bill total, set your tip percentage, then increase the 'Number of people' using the +/− buttons. The 'Each person pays' amount updates instantly. Toggle 'Round up per person' to get a clean number for cash payments.",
              },
              {
                q: "Should I tip on the pre-tax or post-tax amount?",
                a: "Tipping on the pre-tax subtotal is technically correct. However, tipping on the post-tax total is common practice and the difference is minimal — on a £50 bill, it is around £0.50–1.00. Our calculator uses the bill amount you enter, so enter your pre-tax or post-tax amount as you prefer.",
              },
              {
                q: "Is a 20% tip good?",
                a: "Yes — 20% is considered excellent in the US and Canada and is a widely used benchmark for good service. In the UK, 20% would be very generous (the norm is 10–12.5%). The right tip always depends on the country, the service type, and the quality of service.",
              },
              {
                q: "Do you tip in Japan or Australia?",
                a: "In Japan, do not tip — it is considered disrespectful and servers may refuse it or find it embarrassing. In Australia, tipping is optional; staff earn a strong minimum wage and 10% for great service is appreciated but never expected. Our calculator sets the tip to 0% for Japan automatically.",
              },
              {
                q: "How much do you tip a taxi or Uber driver?",
                a: "In the US, rounding up or adding 10–15% is standard for taxis and ride-shares. In the UK, simply rounding up to the nearest pound is typical. For Uber or Lyft, in-app tipping of £1–2 or $2–3 is appreciated. In most Asian countries, taxi tipping is not expected.",
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "20px 22px", borderRadius: 16,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.q}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <MoreTools currentSlug="tip-calculator" />
        <AdvertiseGPTBanner />
      </div>
    </div>
  );
}
