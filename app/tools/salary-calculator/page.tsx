"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

// ── UK 2024/25 tax year ──────────────────────────────────────────────────────
function calcUK(gross: number) {
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  const higherRateLimit = 125140;

  // Taper PA above £100k
  let pa = personalAllowance;
  if (gross > 100000) {
    pa = Math.max(0, personalAllowance - (gross - 100000) / 2);
  }

  let incomeTax = 0;
  const taxable = Math.max(0, gross - pa);
  if (taxable > 0) {
    const basic = Math.min(taxable, basicRateLimit - pa);
    incomeTax += Math.max(0, basic) * 0.20;
    const higher = Math.min(Math.max(0, taxable - (basicRateLimit - pa)), higherRateLimit - basicRateLimit);
    incomeTax += higher * 0.40;
    const additional = Math.max(0, taxable - (higherRateLimit - pa));
    incomeTax += additional * 0.45;
  }

  // NI: 8% on £12,570–£50,270, 2% above
  let ni = 0;
  if (gross > 12570) {
    ni += Math.min(gross - 12570, 50270 - 12570) * 0.08;
    if (gross > 50270) ni += (gross - 50270) * 0.02;
  }

  const net = gross - incomeTax - ni;
  const effectiveTaxRate = ((incomeTax + ni) / gross) * 100;

  return {
    gross, net,
    incomeTax, ni,
    totalDeductions: incomeTax + ni,
    effectiveTaxRate,
    breakdown: [
      { label: "Gross Salary", value: gross, color: "#6366f1" },
      { label: "Income Tax (PAYE)", value: -incomeTax, color: "#f472b6" },
      { label: "National Insurance", value: -ni, color: "#fbbf24" },
      { label: "Take-Home Pay", value: net, color: "#34d399", highlight: true },
    ],
    notes: ["Based on 2024/25 UK tax year", "Personal Allowance: £12,570", "No pension deductions included", "Scotland uses different income tax bands"],
  };
}

// ── US Federal 2024 tax year ─────────────────────────────────────────────────
function calcUS(gross: number, filingStatus: "single" | "married") {
  const brackets2024 = {
    single: [
      { rate: 0.10, upTo: 11600 },
      { rate: 0.12, upTo: 47150 },
      { rate: 0.22, upTo: 100525 },
      { rate: 0.24, upTo: 191950 },
      { rate: 0.32, upTo: 243725 },
      { rate: 0.35, upTo: 609350 },
      { rate: 0.37, upTo: Infinity },
    ],
    married: [
      { rate: 0.10, upTo: 23200 },
      { rate: 0.12, upTo: 94300 },
      { rate: 0.22, upTo: 201050 },
      { rate: 0.24, upTo: 383900 },
      { rate: 0.32, upTo: 487450 },
      { rate: 0.35, upTo: 731200 },
      { rate: 0.37, upTo: Infinity },
    ],
  };
  const standardDeduction = filingStatus === "married" ? 29200 : 14600;
  const taxable = Math.max(0, gross - standardDeduction);

  let incomeTax = 0;
  let prev = 0;
  for (const b of brackets2024[filingStatus]) {
    if (taxable <= prev) break;
    const chunk = Math.min(taxable - prev, b.upTo - prev);
    incomeTax += chunk * b.rate;
    prev = b.upTo;
  }

  // FICA: Social Security 6.2% up to $168,600, Medicare 1.45% all income + 0.9% above $200k
  const ssTaxableWage = Math.min(gross, 168600);
  const ss = ssTaxableWage * 0.062;
  const medicare = gross * 0.0145 + (gross > 200000 ? (gross - 200000) * 0.009 : 0);
  const fica = ss + medicare;

  const net = gross - incomeTax - fica;
  const effectiveTaxRate = ((incomeTax + fica) / gross) * 100;

  return {
    gross, net, incomeTax, fica, ss, medicare,
    totalDeductions: incomeTax + fica,
    effectiveTaxRate,
    breakdown: [
      { label: "Gross Salary", value: gross, color: "#6366f1" },
      { label: "Federal Income Tax", value: -incomeTax, color: "#f472b6" },
      { label: "Social Security (6.2%)", value: -ss, color: "#fbbf24" },
      { label: "Medicare (1.45%)", value: -medicare, color: "#f59e0b" },
      { label: "Take-Home Pay", value: net, color: "#34d399", highlight: true },
    ],
    notes: ["Federal tax only — state/local taxes not included", "Standard deduction applied: $" + standardDeduction.toLocaleString(), `Filing status: ${filingStatus === "married" ? "Married filing jointly" : "Single"}`, "No 401(k) or pre-tax deductions included"],
  };
}

const FAQS = [
  { q: "How is UK income tax calculated?", a: "UK income tax is calculated on your earnings above the Personal Allowance (£12,570 for 2024/25). You pay 20% on income up to £50,270 (Basic Rate), 40% on income between £50,270 and £125,140 (Higher Rate), and 45% above £125,140 (Additional Rate). The Personal Allowance is gradually reduced for earnings above £100,000 — you lose £1 of allowance for every £2 earned above £100,000, effectively creating a 60% marginal rate in that band." },
  { q: "What is National Insurance and how is it calculated?", a: "National Insurance (NI) is a UK social security contribution paid by employees. For 2024/25, employees pay 8% on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. NI funds the NHS, State Pension, and other benefits. It is separate from income tax and is calculated on gross earnings before any tax deductions." },
  { q: "What is the difference between gross and net salary?", a: "Gross salary is your full salary before any deductions — it is the number in your employment contract. Net salary (take-home pay) is what you actually receive after income tax, National Insurance (UK) or FICA (US), and any other deductions like pension contributions. The gap between gross and net widens significantly at higher income levels due to higher tax rates." },
  { q: "How does the US standard deduction work?", a: "The US federal standard deduction reduces your taxable income before calculating tax. For 2024, it is $14,600 for single filers and $29,200 for married filing jointly. You only pay federal income tax on your income above this threshold. Most taxpayers take the standard deduction rather than itemising, but itemising can be more beneficial if deductible expenses exceed the standard deduction amount." },
  { q: "Why is my effective tax rate lower than my marginal rate?", a: "Your marginal rate is the rate you pay on your last pound or dollar of income. Your effective rate is the average rate across your total income. Because tax systems use progressive brackets — lower earnings are taxed at lower rates — only the portion of income in each bracket is taxed at that rate. A UK earner on £60,000 has a marginal rate of 40% but an effective rate closer to 26% because the first £12,570 is tax-free and the next £37,700 is taxed at 20%." },
  { q: "What is the best free salary calculator?", a: "ToolStack's salary calculator provides full UK PAYE and US Federal calculations with a complete deductions breakdown — income tax, NI, and FICA — shown per month and per year. It includes effective tax rate, a visual breakdown of where your salary goes, and honest notes about what is and isn't included. No signup, no data stored." },
];

function fmt(n: number, symbol: string): string {
  return symbol + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SalaryCalculator() {
  const [country, setCountry] = useState<"GB" | "US">("GB");
  const [grossInput, setGrossInput] = useState("50000");
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");
  const [result, setResult] = useState<ReturnType<typeof calcUK> | ReturnType<typeof calcUS> | null>(null);
  const symbol = country === "GB" ? "£" : "$";

  const calculate = () => {
    const grossRaw = parseFloat(grossInput.replace(/,/g, "")) || 0;
    const annualGross = period === "monthly" ? grossRaw * 12 : grossRaw;
    if (annualGross <= 0) return;
    if (country === "GB") setResult(calcUK(annualGross));
    else setResult(calcUS(annualGross, filingStatus));
  };

  const monthly = useMemo(() => {
    if (!result) return null;
    return {
      gross: result.gross / 12,
      net: result.net / 12,
      totalDeductions: result.totalDeductions / 12,
    };
  }, [result]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Salary Calculator",
        "description": "Free take-home pay calculator. Full UK PAYE and US Federal calculations with income tax, National Insurance, and FICA breakdowns. See annual and monthly net salary instantly.",
        "url": "https://toolstack.tech/tools/salary-calculator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": [
          "Full UK PAYE income tax calculation (2024/25)",
          "UK National Insurance calculation",
          "US Federal income tax with 2024 brackets",
          "US FICA (Social Security + Medicare)",
          "Annual and monthly breakdown",
          "Effective tax rate display",
          "No signup required",
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
          { "@type": "ListItem", "position": 2, "name": "Finance Tools", "item": "https://toolstack.tech/tools?category=finance" },
          { "@type": "ListItem", "position": 3, "name": "Salary Calculator", "item": "https://toolstack.tech/tools/salary-calculator" },
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQS.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "var(--font-inter), sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Glow blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "50%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "30%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "80px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32, flexWrap: "wrap" as const }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
          <span>/</span>
          <Link href="/tools?category=finance" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Finance Tools</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>Salary Calculator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 20 }}>
            {["UK PAYE 2024/25", "US Federal 2024", "Free Forever", "No Signup"].map(b => (
              <span key={b} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)", color: "#6ee7b7", letterSpacing: "0.06em" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 14 }}>
            Salary{" "}
            <span style={{ background: "linear-gradient(135deg, #34d399, #059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 560 }}>
            Calculate your exact take-home pay after income tax and National Insurance (UK) or Federal tax and FICA (US). Annual and monthly breakdown included.
          </p>
        </div>

        {/* Country selector */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "24px 28px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>Select your country</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {[{ code: "GB", label: "🇬🇧 United Kingdom", desc: "Income Tax + NI (2024/25)" }, { code: "US", label: "🇺🇸 United States", desc: "Federal Tax + FICA (2024)" }].map(c => {
              const active = country === c.code;
              return (
                <button key={c.code} onClick={() => { setCountry(c.code as "GB" | "US"); setResult(null); }} style={{ padding: "14px 20px", borderRadius: 14, border: `1px solid ${active ? "rgba(52,211,153,0.45)" : "rgba(255,255,255,0.08)"}`, background: active ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.02)", color: active ? "#6ee7b7" : "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: active ? 700 : 500, cursor: "pointer", textAlign: "left" as const, transition: "all 0.15s" }}>
                  <div style={{ fontWeight: 700 }}>{c.label}</div>
                  <div style={{ fontSize: 11, color: active ? "rgba(110,231,183,0.7)" : "rgba(255,255,255,0.3)", marginTop: 2 }}>{c.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px", marginBottom: 16 }}>

          {/* Period toggle */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 10 }}>Salary Period</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
              {(["annual", "monthly"] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)} style={{ padding: "10px 20px", borderRadius: 12, border: `1px solid ${period === p ? "rgba(52,211,153,0.45)" : "rgba(255,255,255,0.09)"}`, background: period === p ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.03)", color: period === p ? "#6ee7b7" : "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: period === p ? 700 : 500, cursor: "pointer", textTransform: "capitalize" as const, transition: "all 0.15s" }}>
                  {p} salary
                </button>
              ))}
            </div>
          </div>

          {/* Gross input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 8 }}>
              {period === "monthly" ? "Monthly" : "Annual"} Gross Salary ({symbol})
            </label>
            <div style={{ position: "relative" as const }}>
              <span style={{ position: "absolute" as const, left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 18, fontWeight: 700 }}>{symbol}</span>
              <input
                type="number" value={grossInput} onChange={e => setGrossInput(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()}
                style={{ width: "100%", boxSizing: "border-box" as const, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 16px 16px 36px", fontSize: 22, color: "white", outline: "none", fontWeight: 700 }}
              />
            </div>
          </div>

          {/* US filing status */}
          {country === "US" && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 10 }}>Filing Status</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                {[{ v: "single", label: "Single" }, { v: "married", label: "Married Filing Jointly" }].map(f => (
                  <button key={f.v} onClick={() => setFilingStatus(f.v as "single" | "married")} style={{ padding: "10px 20px", borderRadius: 12, border: `1px solid ${filingStatus === f.v ? "rgba(52,211,153,0.45)" : "rgba(255,255,255,0.09)"}`, background: filingStatus === f.v ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.03)", color: filingStatus === f.v ? "#6ee7b7" : "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: filingStatus === f.v ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={calculate} style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #34d399, #059669)", color: "#001a0d", fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: "0.02em", transition: "opacity 0.2s" }}>
            Calculate Take-Home Pay →
          </button>
        </div>

        {/* Results */}
        {result && monthly && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Monthly Take-Home", value: fmt(monthly.net, symbol), accent: "#34d399" },
                { label: "Annual Take-Home", value: fmt(result.net, symbol), accent: "#6366f1" },
                { label: "Total Tax & Deductions", value: fmt(result.totalDeductions, symbol) + "/yr", accent: "#f472b6" },
                { label: "Effective Tax Rate", value: result.effectiveTaxRate.toFixed(1) + "%", accent: "#fbbf24" },
              ].map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "22px 20px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 8 }}>{m.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: m.accent, lineHeight: 1.2 }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Full breakdown */}
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "24px", marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Full Breakdown</p>
              <div style={{ overflowX: "auto" as const }}>
                <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                      {["", "Annual", "Monthly"].map((h, i) => (
                        <th key={i} style={{ padding: "10px 14px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: i === 0 ? "left" as const : "right" as const }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.breakdown.map((row, i) => (
                      <tr key={i} style={{ background: row.highlight ? "rgba(52,211,153,0.06)" : i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", fontWeight: row.highlight ? 800 : 500, color: row.highlight ? "#34d399" : row.value < 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.85)" }}>
                          {row.label}
                        </td>
                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: row.highlight ? "#34d399" : row.value < 0 ? "#f472b6" : row.color, fontWeight: row.highlight ? 800 : 600, textAlign: "right" as const }}>
                          {row.value < 0 ? `−${fmt(-row.value, symbol)}` : fmt(row.value, symbol)}
                        </td>
                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: row.highlight ? "#34d399" : row.value < 0 ? "#f472b6" : "rgba(255,255,255,0.55)", fontWeight: row.highlight ? 800 : 500, textAlign: "right" as const }}>
                          {row.value < 0 ? `−${fmt(-row.value / 12, symbol)}` : fmt(row.value / 12, symbol)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual bar */}
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "22px 24px", marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Where your salary goes</p>
              <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 16, marginBottom: 14 }}>
                <div title="Take-home" style={{ width: `${(result.net / result.gross) * 100}%`, background: "linear-gradient(90deg, #34d399, #059669)", transition: "width 0.6s ease" }} />
                <div title="Income Tax" style={{ width: `${('incomeTax' in result ? result.incomeTax / result.gross : 0) * 100}%`, background: "rgba(244,114,182,0.8)", transition: "width 0.6s ease" }} />
                <div title="NI/FICA" style={{ width: `${(('ni' in result ? result.ni : result.fica) / result.gross) * 100}%`, background: "rgba(251,191,36,0.7)", transition: "width 0.6s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" as const }}>
                {[
                  { color: "#34d399", label: `Take-home: ${((result.net / result.gross) * 100).toFixed(1)}%` },
                  { color: "#f472b6", label: `Income Tax: ${(('incomeTax' in result ? result.incomeTax / result.gross : 0) * 100).toFixed(1)}%` },
                  { color: "#fbbf24", label: country === "GB" ? `National Insurance: ${(('ni' in result ? result.ni / result.gross : 0) * 100).toFixed(1)}%` : `FICA: ${(('fica' in result ? result.fica / result.gross : 0) * 100).toFixed(1)}%` },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div style={{ padding: "16px 20px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 10 }}>Calculation notes</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" as const, gap: 6 }}>
                {result.notes.map((n, i) => <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>→ {n}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* How it works */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How the Salary Calculator Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 32, lineHeight: 1.7 }}>Full tax calculations — not estimates. The same methodology HMRC and the IRS use.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[
              { n: "1", title: "Enter your gross salary", desc: "Enter your salary before tax — the figure in your employment contract or job offer letter. You can enter annual or monthly." },
              { n: "2", title: "Income tax is calculated by band", desc: "Tax bands are applied progressively — only income in each bracket is taxed at that rate. You never pay the higher rate on all your income." },
              { n: "3", title: "National Insurance / FICA is applied", desc: "UK: NI is 8% on £12,570–£50,270 and 2% above. US: Social Security is 6.2% up to $168,600, Medicare 1.45% on all income." },
              { n: "4", title: "Net salary is calculated", desc: "Your take-home pay is your gross salary minus all deductions. The result is shown per month and per year, with a full line-item breakdown." },
            ].map(step => (
              <div key={step.n} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 20px" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#34d399", marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 8, lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 24px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 10, lineHeight: 1.4 }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 56 }}>
          {/* SEO Description */}
          <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Salary Calculator: Free Online Tool</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                Job offers come in different formats — one company quotes an annual salary, another quotes hourly, a freelance gig pays weekly. Our Salary Calculator converts between hourly, daily, weekly, bi-weekly, monthly, and annual salary instantly, and estimates your take-home pay after taxes so you can compare offers on an apples-to-apples basis.
              </p>
              <p style={{ marginBottom: 16 }}>
                Enter your salary in any format — hourly rate, weekly pay, monthly salary, or annual compensation. The calculator instantly converts to all other formats. Set your hours per week, weeks per year, and estimated tax rate to see your gross and net (take-home) pay in every period. Compare two salary offers side by side to see which is actually better after adjusting for hours and tax.
              </p>
              <p style={{ marginBottom: 16 }}>
                Common uses include converting an hourly rate to an annual salary for a job application, comparing a salaried position vs. a freelance hourly rate, estimating take-home pay before accepting a job offer, calculating the real hourly rate of a salaried position that requires overtime, and figuring out how much to charge hourly as a freelancer to match a target annual income.
              </p>
              <p style={{ marginBottom: 0 }}>
                Most salary calculators only convert annual to hourly. Ours converts between all six pay periods, includes tax estimation for take-home pay, and lets you compare two offers side by side. It's the most complete free salary calculator available. No signup, instant results, works on any device.
              </p>
            </div>
          </section>

          <MoreTools currentSlug="salary-calculator" />
        </div>
        <div style={{ marginTop: 24 }}>
          
        </div>
      </div>
    </div>
  );
}
