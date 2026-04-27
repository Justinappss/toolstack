"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

const COUNTRIES = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", standard: 20, reduced: 5, currency: "£", currencyCode: "GBP" },
  { code: "DE", name: "Germany", flag: "🇩🇪", standard: 19, reduced: 7, currency: "€", currencyCode: "EUR" },
  { code: "FR", name: "France", flag: "🇫🇷", standard: 20, reduced: 5.5, currency: "€", currencyCode: "EUR" },
  { code: "IT", name: "Italy", flag: "🇮🇹", standard: 22, reduced: 10, currency: "€", currencyCode: "EUR" },
  { code: "ES", name: "Spain", flag: "🇪🇸", standard: 21, reduced: 10, currency: "€", currencyCode: "EUR" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", standard: 21, reduced: 9, currency: "€", currencyCode: "EUR" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", standard: 21, reduced: 6, currency: "€", currencyCode: "EUR" },
  { code: "PL", name: "Poland", flag: "🇵🇱", standard: 23, reduced: 8, currency: "zł", currencyCode: "PLN" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", standard: 25, reduced: 12, currency: "kr", currencyCode: "SEK" },
  { code: "NO", name: "Norway", flag: "🇳🇴", standard: 25, reduced: 15, currency: "kr", currencyCode: "NOK" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", standard: 25, reduced: 0, currency: "kr", currencyCode: "DKK" },
  { code: "FI", name: "Finland", flag: "🇫🇮", standard: 25.5, reduced: 14, currency: "€", currencyCode: "EUR" },
  { code: "AT", name: "Austria", flag: "🇦🇹", standard: 20, reduced: 10, currency: "€", currencyCode: "EUR" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", standard: 8.1, reduced: 2.6, currency: "CHF", currencyCode: "CHF" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", standard: 23, reduced: 9, currency: "€", currencyCode: "EUR" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", standard: 23, reduced: 6, currency: "€", currencyCode: "EUR" },
  { code: "GR", name: "Greece", flag: "🇬🇷", standard: 24, reduced: 13, currency: "€", currencyCode: "EUR" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿", standard: 21, reduced: 12, currency: "Kč", currencyCode: "CZK" },
  { code: "HU", name: "Hungary", flag: "🇭🇺", standard: 27, reduced: 18, currency: "Ft", currencyCode: "HUF" },
  { code: "RO", name: "Romania", flag: "🇷🇴", standard: 19, reduced: 9, currency: "lei", currencyCode: "RON" },
  { code: "AU", name: "Australia", flag: "🇦🇺", standard: 10, reduced: 0, currency: "$", currencyCode: "AUD" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", standard: 15, reduced: 0, currency: "$", currencyCode: "NZD" },
  { code: "AE", name: "UAE", flag: "🇦🇪", standard: 5, reduced: 0, currency: "AED", currencyCode: "AED" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", standard: 15, reduced: 0, currency: "SAR", currencyCode: "SAR" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", standard: 15, reduced: 0, currency: "R", currencyCode: "ZAR" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", standard: 9, reduced: 0, currency: "S$", currencyCode: "SGD" },
  { code: "IN", name: "India (GST)", flag: "🇮🇳", standard: 18, reduced: 5, currency: "₹", currencyCode: "INR" },
  { code: "CA", name: "Canada (GST)", flag: "🇨🇦", standard: 5, reduced: 0, currency: "CA$", currencyCode: "CAD" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", standard: 16, reduced: 0, currency: "$", currencyCode: "MXN" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", standard: 17, reduced: 0, currency: "R$", currencyCode: "BRL" },
  { code: "JP", name: "Japan", flag: "🇯🇵", standard: 10, reduced: 8, currency: "¥", currencyCode: "JPY" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", standard: 10, reduced: 0, currency: "₩", currencyCode: "KRW" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", standard: 20, reduced: 10, currency: "₺", currencyCode: "TRY" },
  { code: "RU", name: "Russia", flag: "🇷🇺", standard: 20, reduced: 10, currency: "₽", currencyCode: "RUB" },
  { code: "CUSTOM", name: "Custom rate", flag: "⚙️", standard: 20, reduced: 0, currency: "", currencyCode: "" },
];

const FAQS = [
  {
    q: "How do I add VAT to a price?",
    a: "To add VAT to a net (ex-VAT) price: multiply the net price by the VAT rate and add it to the net price. Formula: Gross = Net × (1 + VAT rate / 100). For example, a £100 net price at 20% VAT = £100 × 1.20 = £120 gross. This calculator does it instantly — just enter the net amount and select Add VAT.",
  },
  {
    q: "How do I remove VAT from a price?",
    a: "To remove (extract) VAT from a gross (VAT-inclusive) price: divide the gross price by (1 + VAT rate / 100). Formula: Net = Gross ÷ (1 + VAT rate / 100). For example, a £120 gross price at 20% VAT = £120 ÷ 1.20 = £100 net. Never make the mistake of multiplying by the VAT rate — that gives the wrong answer. Select Remove VAT above to calculate this instantly.",
  },
  {
    q: "What is the UK VAT rate in 2026?",
    a: "The UK standard VAT rate is 20% in 2026, unchanged since 2011. The reduced rate is 5%, applied to domestic energy, children's car seats, and some health products. A zero rate (0%) applies to most food, children's clothing, books, and newspapers. Some items are VAT-exempt entirely (postage, financial services, healthcare).",
  },
  {
    q: "Which country has the highest VAT rate?",
    a: "Hungary has the highest standard VAT rate in the world at 27%. Several Nordic countries (Sweden, Norway, Denmark, Finland) have 25–25.5% rates. The EU mandates a minimum standard rate of 15%, though most member states apply higher rates in practice.",
  },
  {
    q: "What is the difference between VAT and GST?",
    a: "VAT (Value Added Tax) and GST (Goods and Services Tax) are essentially the same concept — a consumption tax applied at each stage of the supply chain, with businesses reclaiming the tax they've paid on inputs. The name varies by country: the UK, EU, and most of the world call it VAT; Australia, India, Canada, New Zealand, and Singapore call it GST. The calculation method is identical.",
  },
  {
    q: "Can I calculate VAT for invoices with multiple items?",
    a: "Yes. Use the invoice calculator tab to add multiple line items, each with their own price and quantity. The tool totals the net amount, calculates the VAT, and shows the gross total — ready to copy for your invoice. This is useful for freelancers, contractors, and small businesses who invoice with multiple services or products.",
  },
  {
    q: "What is the best VAT calculator?",
    a: "ToolStack's VAT calculator is one of the best free options because it covers 40+ countries with accurate standard and reduced rates, supports both add VAT and remove VAT modes, includes a multi-line invoice calculator, shows a full calculation breakdown, and runs entirely in your browser — no signup, no data sent to any server. Unlike most UK-only VAT calculators, ours works globally.",
  },
];

type HistoryItem = {
  id: number;
  mode: string;
  amount: string;
  rate: number;
  currency: string;
  net: number;
  vatAmount: number;
  gross: number;
  country: string;
};

type LineItem = { desc: string; qty: string; price: string };

function fmt(n: number, decimals = 2) {
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function VATCalculatorPage() {
  const [tab, setTab]               = useState<"simple" | "invoice">("simple");
  const [country, setCountry]       = useState(COUNTRIES[0]);
  const [mode, setMode]             = useState<"add" | "remove">("add");
  const [amount, setAmount]         = useState("");
  const [useReduced, setUseReduced] = useState(false);
  const [customRate, setCustomRate] = useState("20");
  const [history, setHistory]       = useState<HistoryItem[]>([]);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [lines, setLines]           = useState<LineItem[]>([
    { desc: "", qty: "1", price: "" },
  ]);
  const [copiedId, setCopiedId]     = useState<number | null>(null);

  const isCustom = country.code === "CUSTOM";
  const rate = isCustom
    ? parseFloat(customRate) || 0
    : useReduced && country.reduced > 0
    ? country.reduced
    : country.standard;

  const numAmount = parseFloat(amount.replace(/,/g, "")) || 0;

  const net      = mode === "add" ? numAmount : numAmount / (1 + rate / 100);
  const gross    = mode === "add" ? numAmount * (1 + rate / 100) : numAmount;
  const vatAmt   = gross - net;
  const hasResult = rate > 0;

  function addToHistory() {
    if (!hasResult) return;
    const item: HistoryItem = {
      id: Date.now(),
      mode,
      amount,
      rate,
      currency: country.currency,
      net,
      vatAmount: vatAmt,
      gross,
      country: country.name,
    };
    setHistory(prev => [item, ...prev].slice(0, 6));
  }

  function copyResult(item: HistoryItem) {
    const text = `Net: ${item.currency}${fmt(item.net)} | VAT (${item.rate}%): ${item.currency}${fmt(item.vatAmount)} | Gross: ${item.currency}${fmt(item.gross)}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  // Invoice calculator
  function updateLine(i: number, field: keyof LineItem, val: string) {
    setLines(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: val } : l));
  }
  function addLine() { setLines(prev => [...prev, { desc: "", qty: "1", price: "" }]); }
  function removeLine(i: number) { setLines(prev => prev.filter((_, idx) => idx !== i)); }

  const invoiceLines = lines.map(l => {
    const qty   = parseFloat(l.qty) || 0;
    const price = parseFloat(l.price.replace(/,/g, "")) || 0;
    const lineNet  = qty * price;
    const lineVat  = lineNet * (rate / 100);
    const lineGross = lineNet + lineVat;
    return { ...l, lineNet, lineVat, lineGross };
  });
  const invoiceTotalNet   = invoiceLines.reduce((s, l) => s + l.lineNet, 0);
  const invoiceTotalVat   = invoiceLines.reduce((s, l) => s + l.lineVat, 0);
  const invoiceTotalGross = invoiceLines.reduce((s, l) => s + l.lineGross, 0);

  const cur = country.currency || "";

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", paddingBottom: 100 }}>
      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -120, left: "15%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: 300, right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: 100, left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 60px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>VAT Calculator</span>
        </nav>

        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 99, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", marginBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24" }}>✓ VAT Calculator · 40+ Countries · No Signup</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: "white", lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
          VAT<br /><span style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculator.</span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: 600, margin: "0 0 28px" }}>
          Add or remove VAT for 40+ countries instantly. Standard and reduced rates pre-loaded, full calculation breakdown, and a multi-line invoice calculator — free, no signup.
        </p>

        {/* Trust badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
          {[
            { icon: "🌍", label: "40+ countries" },
            { icon: "⚡", label: "Instant calculation" },
            { icon: "🔄", label: "Add & remove VAT" },
            { icon: "🧾", label: "Invoice calculator" },
          ].map(b => (
            <span key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 99, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
              {b.icon} {b.label}
            </span>
          ))}
        </div>

        {/* ── TOOL CARD ── */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "32px 28px", marginBottom: 16 }}>

          {/* Tab switcher */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4, width: "fit-content" }}>
            {(["simple", "invoice"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: tab === t ? "rgba(251,191,36,0.15)" : "transparent", color: tab === t ? "#fbbf24" : "rgba(255,255,255,0.4)", transition: "all 0.15s" }}>
                {t === "simple" ? "Simple Calculator" : "Invoice Calculator"}
              </button>
            ))}
          </div>

          {tab === "simple" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Country selector */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>Country / Region</label>
                <select
                  value={country.code}
                  onChange={e => {
                    const c = COUNTRIES.find(c => c.code === e.target.value)!;
                    setCountry(c);
                    setUseReduced(false);
                  }}
                  aria-label="Select country"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none", cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.code} value={c.code} style={{ background: "#1a1a2e", color: "white" }}>
                      {c.flag} {c.name} {c.code !== "CUSTOM" ? `— ${c.standard}% VAT` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom rate input */}
              {isCustom && (
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>Custom VAT Rate (%)</label>
                  <input type="number" value={customRate} onChange={e => setCustomRate(e.target.value)} min="0" max="100" step="0.1" aria-label="Custom VAT rate percentage" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              )}

              {/* Rate toggle (standard / reduced) */}
              {!isCustom && country.reduced > 0 && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>VAT Rate</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[
                      { label: `Standard ${country.standard}%`, val: false },
                      { label: `Reduced ${country.reduced}%`, val: true },
                    ].map(opt => (
                      <button key={String(opt.val)} onClick={() => setUseReduced(opt.val)} style={{ flex: 1, padding: "10px 14px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, background: useReduced === opt.val ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)", color: useReduced === opt.val ? "#fbbf24" : "rgba(255,255,255,0.45)", border: `1px solid ${useReduced === opt.val ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.08)"}`, transition: "all 0.15s" }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Mode</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {([["add", "Add VAT", "Net → Gross"], ["remove", "Remove VAT", "Gross → Net"]] as const).map(([val, label, sub]) => (
                    <button key={val} onClick={() => setMode(val)} style={{ flex: 1, padding: "12px 14px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 700, background: mode === val ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${mode === val ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.08)"}`, color: mode === val ? "#fbbf24" : "rgba(255,255,255,0.45)", textAlign: "center" as const, transition: "all 0.15s" }}>
                      {label}
                      <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.7, marginTop: 2 }}>{sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount input */}
              <div>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>
                  {mode === "add" ? "Net Amount (ex-VAT)" : "Gross Amount (inc-VAT)"} {cur && <span style={{ color: "rgba(255,255,255,0.2)" }}>· {cur}</span>}
                </label>
                <div style={{ position: "relative" as const }}>
                  {cur && <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 16, fontWeight: 700, pointerEvents: "none" }}>{cur}</span>}
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    onBlur={addToHistory}
                    placeholder="0.00"
                    aria-label={mode === "add" ? "Net amount excluding VAT" : "Gross amount including VAT"}
                    style={{ width: "100%", padding: `14px 14px 14px ${cur ? "36px" : "14px"}`, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: 22, fontWeight: 800, outline: "none", boxSizing: "border-box", letterSpacing: "-0.02em" }}
                  />
                </div>
              </div>

              {/* Results */}
              {hasResult && (
                <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 18, padding: "24px 22px", animation: "fadeIn 0.3s ease" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
                    {[
                      { label: "Net (ex-VAT)", value: `${cur}${fmt(net)}`, highlight: mode === "remove" },
                      { label: `VAT (${rate}%)`, value: `${cur}${fmt(vatAmt)}`, highlight: false },
                      { label: "Gross (inc-VAT)", value: `${cur}${fmt(gross)}`, highlight: mode === "add" },
                    ].map(r => (
                      <div key={r.label} style={{ textAlign: "center" as const, padding: "14px 10px", borderRadius: 14, background: r.highlight ? "rgba(251,191,36,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${r.highlight ? "rgba(251,191,36,0.25)" : "rgba(255,255,255,0.06)"}` }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>{r.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: r.highlight ? "#fbbf24" : "white", letterSpacing: "-0.02em" }}>{r.value}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "14px 0 0", textAlign: "center" as const }}>
                    {country.name} · {rate}% {useReduced ? "reduced" : "standard"} rate · {mode === "add" ? "VAT added" : "VAT extracted"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Invoice tab */}
          {tab === "invoice" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Country + rate for invoice */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>Country</label>
                  <select value={country.code} onChange={e => { const c = COUNTRIES.find(c => c.code === e.target.value)!; setCountry(c); }} aria-label="Invoice country" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: 14, outline: "none", cursor: "pointer", appearance: "none" }}>
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.code} style={{ background: "#1a1a2e", color: "white" }}>{c.flag} {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8 }}>VAT Rate (%)</label>
                  <input type="number" value={isCustom ? customRate : rate} onChange={e => { if (isCustom) setCustomRate(e.target.value); }} readOnly={!isCustom} aria-label="Invoice VAT rate" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: isCustom ? "white" : "rgba(255,255,255,0.5)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              {/* Line items */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>Line Items</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {/* Header */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 100px 36px", gap: 8, padding: "0 4px" }}>
                    {["Description", "Qty", "Unit price", "Line total", ""].map(h => (
                      <span key={h} style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>{h}</span>
                    ))}
                  </div>
                  {lines.map((line, i) => {
                    const il = invoiceLines[i];
                    return (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 120px 100px 36px", gap: 8, alignItems: "center" }}>
                        <input value={line.desc} onChange={e => updateLine(i, "desc", e.target.value)} placeholder={`Item ${i + 1}`} aria-label={`Line item ${i + 1} description`} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", fontSize: 13, outline: "none" }} />
                        <input type="number" value={line.qty} onChange={e => updateLine(i, "qty", e.target.value)} min="0" aria-label={`Line item ${i + 1} quantity`} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", fontSize: 13, outline: "none", textAlign: "center" as const }} />
                        <input type="number" value={line.price} onChange={e => updateLine(i, "price", e.target.value)} placeholder="0.00" aria-label={`Line item ${i + 1} unit price`} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white", fontSize: 13, outline: "none" }} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", textAlign: "right" as const, paddingRight: 4 }}>{cur}{fmt(il.lineNet)}</span>
                        {lines.length > 1 && (
                          <button onClick={() => removeLine(i)} aria-label={`Remove line ${i + 1}`} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                        )}
                        {lines.length === 1 && <div />}
                      </div>
                    );
                  })}
                </div>
                <button onClick={addLine} style={{ marginTop: 10, padding: "9px 18px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  + Add line item
                </button>
              </div>

              {/* Invoice totals */}
              <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 16, padding: "20px 22px" }}>
                {[
                  { label: "Subtotal (ex-VAT)", value: `${cur}${fmt(invoiceTotalNet)}` },
                  { label: `VAT (${rate}%)`, value: `${cur}${fmt(invoiceTotalVat)}` },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
                    <span>{r.label}</span><span style={{ fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{r.value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 18, fontWeight: 900, color: "white" }}>
                  <span>Total (inc-VAT)</span><span style={{ color: "#fbbf24" }}>{cur}{fmt(invoiceTotalGross)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Calculation history */}
        {history.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>Recent Calculations</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {history.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{item.country} · {item.rate}%</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Net: <strong style={{ color: "white" }}>{item.currency}{fmt(item.net)}</strong></span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>VAT: <strong style={{ color: "#fbbf24" }}>{item.currency}{fmt(item.vatAmount)}</strong></span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Gross: <strong style={{ color: "white" }}>{item.currency}{fmt(item.gross)}</strong></span>
                  </div>
                  <button onClick={() => copyResult(item)} style={{ padding: "6px 12px", borderRadius: 8, background: copiedId === item.id ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${copiedId === item.id ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}`, color: copiedId === item.id ? "#34d399" : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    {copiedId === item.id ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── HOW IT WORKS ── */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>VAT calculation in three steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Select your country", desc: "Choose from 40+ countries with pre-loaded VAT rates — standard and reduced. Or enter a custom rate for any region.", color: "#fbbf24", rgb: "251,191,36" },
              { step: "02", title: "Choose Add or Remove VAT", desc: "Add VAT to turn a net price into a gross price. Remove VAT to extract the net price and VAT amount from a gross price.", color: "#6366f1", rgb: "99,102,241" },
              { step: "03", title: "Get your breakdown", desc: "Instantly see the net amount, VAT amount, and gross total. Use the invoice tab for multiple line items.", color: "#10b981", rgb: "16,185,129" },
            ].map(s => (
              <div key={s.step} style={{ padding: "24px 22px", borderRadius: 18, background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: `rgba(${s.rgb},0.7)`, marginBottom: 10 }}>STEP <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.step}</span></div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 24, background: "rgba(251,191,36,0.03)", border: "1px solid rgba(251,191,36,0.18)" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>VAT and GST rates by country — 2026 reference guide</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
            VAT (Value Added Tax) is a consumption tax applied at each stage of a supply chain. Businesses collect it from customers and remit it to the government, while reclaiming the VAT they&apos;ve paid on their own purchases. The calculation is straightforward — but the rates vary significantly by country and by the type of goods or services being sold. ToolStack&apos;s VAT calculator covers 40+ countries with accurate standard and reduced rates pre-loaded.
          </p>

          <div style={{ overflowX: "auto", margin: "20px 0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#fbbf24" }}>Country</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Standard Rate</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Reduced Rate</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>United Kingdom</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>20%</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>5%</td>
                </tr>
                <tr style={{ background: "rgba(251,191,36,0.03)" }}>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Germany</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>19%</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>7%</td>
                </tr>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Hungary (highest in EU)</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>27%</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#34d399" }}>18%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Add VAT vs. Remove VAT — which formula to use</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
               To <strong style={{ color: "white" }}>add VAT</strong> to a net price, multiply by (1 + rate/100). A £100 net price at 20% VAT gives £120 gross. To <strong style={{ color: "white" }}>remove VAT</strong> from a gross price, divide by (1 + rate/100) — never multiply. A common mistake is to subtract 20% from the gross price, which gives the wrong answer. £120 × 0.80 = £96, not £100. The correct formula: £120 ÷ 1.20 = £100 net.
             </p>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, background: openFaq === i ? "rgba(251,191,36,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${openFaq === i ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.06)"}`, overflow: "hidden", transition: "all 0.2s" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" as const }}>
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

        <MoreTools currentSlug="vat-calculator" />
        
      </div>

      {/* JSON-LD: WebApplication */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "VAT Calculator",
        "description": "Free VAT and GST calculator for 40+ countries. Add or remove VAT, standard and reduced rates, multi-line invoice calculator. Runs in your browser — no signup.",
        "url": "https://toolstack.tech/tools/vat-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": ["40+ country VAT/GST rates", "Add VAT and remove VAT modes", "Standard and reduced rate switching", "Multi-line invoice calculator", "Full calculation breakdown", "100% client-side — no data sent"],
      })}} />

      {/* JSON-LD: BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
          { "@type": "ListItem", "position": 2, "name": "Financial Tools", "item": "https://toolstack.tech/tools?category=finance" },
          { "@type": "ListItem", "position": 3, "name": "VAT Calculator", "item": "https://toolstack.tech/tools/vat-calculator" },
        ],
      })}} />

      {/* JSON-LD: FAQPage */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      })}} />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        select option { background: #1a1a2e; }
      `}</style>
    </div>
  );
}
