"use client";
export const dynamic = "force-static";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

// ── UK 2025/26 tax year ──────────────────────────────────────────────────────
function calcUK(
  gross: number,
  pensionPct: number,
  studentLoan: "none" | "plan1" | "plan2" | "plan4"
) {
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  const higherRateLimit = 125140;

  // Salary sacrifice pension reduces gross before tax AND NI
  const pensionContribution = Math.round(gross * pensionPct / 100);
  const pensionableGross = gross - pensionContribution;

  // Taper PA above £100k (based on pre-pension gross for tapering purposes)
  let pa = personalAllowance;
  if (pensionableGross > 100000) {
    pa = Math.max(0, personalAllowance - (pensionableGross - 100000) / 2);
  }

  // Income tax on pensionable gross
  let incomeTax = 0;
  const taxable = Math.max(0, pensionableGross - pa);
  if (taxable > 0) {
    const basicBand = basicRateLimit - pa;
    const basic = Math.min(taxable, basicBand);
    incomeTax += Math.max(0, basic) * 0.20;
    const higher = Math.min(Math.max(0, taxable - basicBand), higherRateLimit - basicRateLimit);
    incomeTax += higher * 0.40;
    const additional = Math.max(0, taxable - basicBand - (higherRateLimit - basicRateLimit));
    incomeTax += additional * 0.45;
  }

  // NI on pensionable gross: 8% on £12,570–£50,270, 2% above
  let ni = 0;
  if (pensionableGross > 12570) {
    ni += Math.min(pensionableGross - 12570, 50270 - 12570) * 0.08;
    if (pensionableGross > 50270) ni += (pensionableGross - 50270) * 0.02;
  }

  // Student loan repayment (on gross, not pensionable gross)
  const slThresholds = { none: Infinity, plan1: 24990, plan2: 27295, plan4: 31395 };
  const slThreshold = slThresholds[studentLoan];
  const studentLoanRepayment = gross > slThreshold ? (gross - slThreshold) * 0.09 : 0;

  const totalDeductions = incomeTax + ni + pensionContribution + studentLoanRepayment;
  const net = gross - totalDeductions;
  const effectiveTaxRate = ((incomeTax + ni) / gross) * 100;

  const breakdown: { label: string; value: number; color: string; highlight?: boolean }[] = [
    { label: "Gross Salary", value: gross, color: "#6366f1" },
    { label: "Income Tax (PAYE)", value: -incomeTax, color: "#f472b6" },
    { label: "National Insurance", value: -ni, color: "#fbbf24" },
  ];
  if (pensionContribution > 0) breakdown.push({ label: `Pension (${pensionPct}% salary sacrifice)`, value: -pensionContribution, color: "#a78bfa" });
  if (studentLoanRepayment > 0) breakdown.push({ label: `Student Loan (${studentLoan === "plan1" ? "Plan 1" : studentLoan === "plan2" ? "Plan 2" : "Plan 4"})`, value: -studentLoanRepayment, color: "#34d399" });
  breakdown.push({ label: "Take-Home Pay", value: net, color: "#34d399", highlight: true });

  const notes = [
    "Based on 2025/26 UK tax year",
    "Personal Allowance: £12,570",
    pensionContribution > 0 ? `Pension: salary sacrifice — reduces income tax and NI` : "No pension deductions included",
    studentLoanRepayment > 0 ? `Student loan threshold: £${slThreshold.toLocaleString()}/yr` : "No student loan included",
    "Scotland uses different income tax bands",
  ].filter(Boolean);

  return { gross, net, incomeTax, ni, pensionContribution, studentLoanRepayment, totalDeductions, effectiveTaxRate, breakdown, notes };
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

  const ssTaxableWage = Math.min(gross, 168600);
  const ss = ssTaxableWage * 0.062;
  const medicare = gross * 0.0145 + (gross > 200000 ? (gross - 200000) * 0.009 : 0);
  const fica = ss + medicare;

  const net = gross - incomeTax - fica;
  const effectiveTaxRate = ((incomeTax + fica) / gross) * 100;

  return {
    gross, net, incomeTax, fica, ss, medicare,
    pensionContribution: 0, studentLoanRepayment: 0,
    totalDeductions: incomeTax + fica,
    effectiveTaxRate,
    breakdown: [
      { label: "Gross Salary", value: gross, color: "#6366f1" },
      { label: "Federal Income Tax", value: -incomeTax, color: "#f472b6" },
      { label: "Social Security (6.2%)", value: -ss, color: "#fbbf24" },
      { label: "Medicare (1.45%)", value: -medicare, color: "#f59e0b" },
      { label: "Take-Home Pay", value: net, color: "#34d399", highlight: true },
    ],
    notes: [
      "Federal tax only — state/local taxes not included",
      "Standard deduction applied: $" + standardDeduction.toLocaleString(),
      `Filing status: ${filingStatus === "married" ? "Married filing jointly" : "Single"}`,
      "No 401(k) or pre-tax deductions included",
    ],
  };
}

const FAQS = [
  { q: "How is UK income tax calculated in 2025/26?", a: "UK income tax uses progressive bands. The first £12,570 is tax-free (Personal Allowance). You pay 20% on income between £12,571 and £50,270 (Basic Rate), 40% on income between £50,271 and £125,140 (Higher Rate), and 45% above £125,140 (Additional Rate). If you earn above £100,000, the Personal Allowance tapers — creating an effective 60% marginal rate between £100,000 and £125,140." },
  { q: "What is National Insurance and how is it calculated?", a: "National Insurance (NI) is a UK social security contribution. For 2025/26, employees pay 8% on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. NI is separate from income tax and stacks on top of it — meaning a basic-rate UK earner has a combined 28% marginal rate on most of their income." },
  { q: "How does pension salary sacrifice affect my take-home pay?", a: "Salary sacrifice reduces your gross salary before income tax and National Insurance are calculated. A 5% pension contribution on a £40,000 salary reduces your pensionable gross to £38,000 — saving you roughly £480 in NI and income tax combined. This is why salary sacrifice pensions are more tax-efficient than personal pensions." },
  { q: "How is UK student loan repayment calculated?", a: "Student loan repayments are 9% of earnings above your plan threshold — not a percentage of your whole salary. Plan 1 (pre-2012 starters): 9% above £24,990. Plan 2 (post-2012): 9% above £27,295. Plan 4 (Scotland): 9% above £31,395. On a £40,000 salary with Plan 2, you repay £1,143 per year (9% of £40,000 - £27,295 = £12,705)." },
  { q: "What is the difference between gross and net salary?", a: "Gross salary is your full salary before any deductions — the number in your employment contract. Net salary (take-home pay) is what you actually receive after income tax, National Insurance, pension contributions, and student loan. The gap between gross and net widens significantly at higher income levels due to higher tax rates." },
  { q: "How does the US standard deduction work?", a: "The US federal standard deduction reduces your taxable income before calculating tax. For 2024, it is $14,600 for single filers and $29,200 for married filing jointly. You only pay federal income tax on income above this threshold. State income tax is not included in this calculator." },
  { q: "Why is my effective tax rate lower than my marginal rate?", a: "Your marginal rate is the rate on your last pound or dollar of income. Your effective rate is the average across your total income. A UK earner on £60,000 has a 40% marginal rate but an effective rate closer to 27% because the first £12,570 is tax-free and the next £37,700 is taxed at only 20%." },
  { q: "What is the best free UK salary calculator?", a: "ToolStack's salary calculator provides full UK PAYE 2025/26 calculations with income tax, National Insurance, pension salary sacrifice, and student loan deductions — shown per month and per year. It also covers US Federal tax with FICA. No signup, no data stored, fully free." },
];

function fmt(n: number, symbol: string): string {
  return symbol + Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

type UKResult = ReturnType<typeof calcUK>;
type USResult = ReturnType<typeof calcUS>;
type CalcResult = UKResult | USResult;

export default function SalaryCalculator() {
  const [country, setCountry] = useState<"GB" | "US">("GB");
  const [grossInput, setGrossInput] = useState("50000");
  const [period, setPeriod] = useState<"annual" | "monthly">("annual");
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");
  const [pensionPct, setPensionPct] = useState(0);
  const [studentLoan, setStudentLoan] = useState<"none" | "plan1" | "plan2" | "plan4">("none");
  const [result, setResult] = useState<CalcResult | null>(null);
  const symbol = country === "GB" ? "£" : "$";

  const calculate = () => {
    const grossRaw = parseFloat(grossInput.replace(/,/g, "")) || 0;
    const annualGross = period === "monthly" ? grossRaw * 12 : grossRaw;
    if (annualGross <= 0) return;
    if (country === "GB") setResult(calcUK(annualGross, pensionPct, studentLoan));
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

  const hourly = useMemo(() => {
    if (!result) return null;
    return {
      gross: result.gross / 52 / 37.5,
      net: result.net / 52 / 37.5,
    };
  }, [result]);

  const weekly = useMemo(() => {
    if (!result) return null;
    return { gross: result.gross / 52, net: result.net / 52 };
  }, [result]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Salary Calculator — UK & US Take-Home Pay",
        "description": "Free salary calculator for UK PAYE 2025/26 and US Federal 2024. Includes income tax, National Insurance, pension salary sacrifice, student loan (UK) and FICA (US). Annual and monthly breakdown.",
        "url": "https://toolstack.tech/tools/salary-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": [
          "UK PAYE income tax calculation (2025/26)",
          "UK National Insurance calculation",
          "UK pension salary sacrifice deduction",
          "UK student loan repayment (Plan 1, 2, 4)",
          "US Federal income tax with 2024 brackets",
          "US FICA (Social Security + Medicare)",
          "Annual, monthly, weekly and hourly breakdown",
          "Effective tax rate display",
          "No signup required",
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
          { "@type": "ListItem", "position": 2, "name": "Finance Tools", "item": "https://toolstack.tech/tools/category/finance" },
          { "@type": "ListItem", "position": 3, "name": "Salary Calculator", "item": "https://toolstack.tech/tools/salary-calculator" },
        ]
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
          <Link href="/tools/category/finance" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Finance Tools</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>Salary Calculator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 20 }}>
            {["UK PAYE 2025/26", "US Federal 2024", "Pension + Student Loan", "Free Forever", "No Signup"].map(b => (
              <span key={b} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)", color: "#6ee7b7", letterSpacing: "0.06em" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 14 }}>
            Salary{" "}
            <span style={{ background: "linear-gradient(135deg, #34d399, #059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 600 }}>
            UK take-home pay after income tax, National Insurance, pension and student loan (2025/26). US Federal tax and FICA (2024). Annual, monthly, weekly and hourly breakdown.
          </p>
        </div>

        {/* Country selector */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "24px 28px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>Select your country</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {[{ code: "GB", label: "🇬🇧 United Kingdom", desc: "Income Tax + NI + Pension + Student Loan (2025/26)" }, { code: "US", label: "🇺🇸 United States", desc: "Federal Tax + FICA (2024)" }].map(c => {
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

          {/* UK-only options */}
          {country === "GB" && (
            <>
              {/* Pension */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 10 }}>
                  Pension Contribution — Salary Sacrifice ({pensionPct}%)
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                  {[0, 3, 4, 5, 6, 8, 10].map(pct => (
                    <button key={pct} onClick={() => setPensionPct(pct)} style={{ padding: "10px 16px", borderRadius: 12, border: `1px solid ${pensionPct === pct ? "rgba(167,139,250,0.45)" : "rgba(255,255,255,0.09)"}`, background: pensionPct === pct ? "rgba(167,139,250,0.12)" : "rgba(255,255,255,0.03)", color: pensionPct === pct ? "#c4b5fd" : "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: pensionPct === pct ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }}>
                      {pct === 0 ? "None" : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student loan */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 10 }}>Student Loan</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                  {[
                    { v: "none", label: "None" },
                    { v: "plan1", label: "Plan 1", sub: "pre-2012 · £24,990" },
                    { v: "plan2", label: "Plan 2", sub: "post-2012 · £27,295" },
                    { v: "plan4", label: "Plan 4", sub: "Scotland · £31,395" },
                  ].map(opt => {
                    const active = studentLoan === opt.v;
                    return (
                      <button key={opt.v} onClick={() => setStudentLoan(opt.v as typeof studentLoan)} style={{ padding: "10px 16px", borderRadius: 12, border: `1px solid ${active ? "rgba(52,211,153,0.45)" : "rgba(255,255,255,0.09)"}`, background: active ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.03)", color: active ? "#6ee7b7" : "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: active ? 700 : 500, cursor: "pointer", textAlign: "left" as const, transition: "all 0.15s" }}>
                        <div>{opt.label}</div>
                        {opt.sub && <div style={{ fontSize: 10, opacity: 0.7, marginTop: 1 }}>{opt.sub}</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

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
        {result && monthly && hourly && weekly && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

            {/* Summary cards — 4 across top */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Monthly Take-Home", value: fmt(monthly.net, symbol), accent: "#34d399" },
                { label: "Annual Take-Home", value: fmt(result.net, symbol), accent: "#6366f1" },
                { label: "Weekly Take-Home", value: fmt(weekly.net, symbol), accent: "#60a5fa" },
                { label: "Effective Tax Rate", value: result.effectiveTaxRate.toFixed(1) + "%", accent: "#fbbf24" },
              ].map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "22px 20px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 8 }}>{m.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: m.accent, lineHeight: 1.2 }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Hourly breakdown card */}
            <div style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 16, padding: "18px 24px", marginBottom: 16, display: "flex", flexWrap: "wrap" as const, gap: 24 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(52,211,153,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 4px" }}>Hourly (37.5hr week)</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#34d399", margin: 0 }}>{fmt(hourly.net, symbol)}<span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>/hr net</span></p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 4px" }}>Hourly Gross</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "rgba(255,255,255,0.55)", margin: 0 }}>{fmt(hourly.gross, symbol)}<span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.3)" }}>/hr gross</span></p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 4px" }}>Total Deductions</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#f472b6", margin: 0 }}>{fmt(result.totalDeductions, symbol)}<span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.3)" }}>/yr</span></p>
              </div>
            </div>

            {/* Full breakdown table */}
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "24px", marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Full Breakdown</p>
              <div style={{ overflowX: "auto" as const }}>
                <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                      {["", "Annual", "Monthly", "Weekly"].map((h, i) => (
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
                        <td style={{ padding: "12px 14px", border: "1px solid rgba(255,255,255,0.07)", color: row.highlight ? "#34d399" : row.value < 0 ? "#f472b6" : "rgba(255,255,255,0.45)", fontWeight: row.highlight ? 800 : 500, textAlign: "right" as const }}>
                          {row.value < 0 ? `−${fmt(-row.value / 52, symbol)}` : fmt(row.value / 52, symbol)}
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
                <div title="NI/FICA" style={{ width: `${(('ni' in result ? result.ni : ('fica' in result ? result.fica : 0)) / result.gross) * 100}%`, background: "rgba(251,191,36,0.7)", transition: "width 0.6s ease" }} />
                {result.pensionContribution > 0 && <div title="Pension" style={{ width: `${(result.pensionContribution / result.gross) * 100}%`, background: "rgba(167,139,250,0.7)", transition: "width 0.6s ease" }} />}
                {result.studentLoanRepayment > 0 && <div title="Student Loan" style={{ width: `${(result.studentLoanRepayment / result.gross) * 100}%`, background: "rgba(96,165,250,0.7)", transition: "width 0.6s ease" }} />}
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const }}>
                {[
                  { color: "#34d399", label: `Take-home: ${((result.net / result.gross) * 100).toFixed(1)}%` },
                  { color: "#f472b6", label: `Income Tax: ${(('incomeTax' in result ? result.incomeTax / result.gross : 0) * 100).toFixed(1)}%` },
                  { color: "#fbbf24", label: country === "GB" ? `NI: ${(('ni' in result ? result.ni / result.gross : 0) * 100).toFixed(1)}%` : `FICA: ${(('fica' in result ? result.fica / result.gross : 0) * 100).toFixed(1)}%` },
                  ...(result.pensionContribution > 0 ? [{ color: "#a78bfa", label: `Pension: ${((result.pensionContribution / result.gross) * 100).toFixed(1)}%` }] : []),
                  ...(result.studentLoanRepayment > 0 ? [{ color: "#60a5fa", label: `Student Loan: ${((result.studentLoanRepayment / result.gross) * 100).toFixed(1)}%` }] : []),
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
              { n: "1", title: "Enter your gross salary", desc: "Enter the salary before tax — the figure in your employment contract. Toggle between annual and monthly input." },
              { n: "2", title: "Add pension & student loan (UK)", desc: "Select your pension contribution % (salary sacrifice reduces income tax and NI) and student loan plan if applicable." },
              { n: "3", title: "Income tax calculated by band", desc: "Tax bands are applied progressively — only income in each bracket is taxed at that rate. You never pay the higher rate on your full salary." },
              { n: "4", title: "Full breakdown shown", desc: "Annual, monthly, weekly and hourly take-home pay displayed with every deduction itemised. Effective tax rate calculated automatically." },
            ].map(step => (
              <div key={step.n} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 20px" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#34d399", marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 8, lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <FaqPageSchema faqs={FAQS} />
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
          <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>UK & US Salary Calculator — Free Online Tool</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                Job offers come in different formats — and the number on the offer letter is never the number in your account. This salary calculator shows your exact UK take-home pay for 2025/26 after income tax, National Insurance, pension salary sacrifice, and student loan repayments. It also covers US Federal take-home pay including FICA.
              </p>
              <p style={{ marginBottom: 16 }}>
                For UK users, pension salary sacrifice is one of the most effective ways to reduce your tax bill — it reduces both income tax and National Insurance. The calculator lets you model different contribution percentages (3%–10%) so you can see the real impact on your monthly pay before committing. Student loan repayments are also included for Plan 1, Plan 2 and Plan 4 (Scotland).
              </p>
              <p style={{ marginBottom: 0 }}>
                Results show your take-home pay broken down annually, monthly, weekly and hourly — making it easy to compare a salaried role with a day rate or freelance contract. No signup required, no data stored, fully free.
              </p>
            </div>
          </section>

          <MoreTools currentSlug="salary-calculator" />
        </div>
      </div>
    </div>
  );
}
