"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const COUNTRIES = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", symbol: "£", defaultRate: "4.5" },
  { code: "US", name: "United States",  flag: "🇺🇸", currency: "USD", symbol: "$", defaultRate: "7.0" },
  { code: "AU", name: "Australia",      flag: "🇦🇺", currency: "AUD", symbol: "A$", defaultRate: "6.0" },
  { code: "CA", name: "Canada",         flag: "🇨🇦", currency: "CAD", symbol: "C$", defaultRate: "5.5" },
  { code: "IE", name: "Ireland",        flag: "🇮🇪", currency: "EUR", symbol: "€", defaultRate: "4.0" },
  { code: "DE", name: "Germany",        flag: "🇩🇪", currency: "EUR", symbol: "€", defaultRate: "3.8" },
  { code: "FR", name: "France",         flag: "🇫🇷", currency: "EUR", symbol: "€", defaultRate: "3.9" },
  { code: "NL", name: "Netherlands",    flag: "🇳🇱", currency: "EUR", symbol: "€", defaultRate: "4.1" },
  { code: "AE", name: "UAE",            flag: "🇦🇪", currency: "AED", symbol: "AED ", defaultRate: "4.8" },
  { code: "IN", name: "India",          flag: "🇮🇳", currency: "INR", symbol: "₹", defaultRate: "8.5" },
  { code: "SG", name: "Singapore",      flag: "🇸🇬", currency: "SGD", symbol: "S$", defaultRate: "3.5" },
  { code: "CH", name: "Switzerland",    flag: "🇨🇭", currency: "CHF", symbol: "CHF ", defaultRate: "1.8" },
  { code: "SE", name: "Sweden",         flag: "🇸🇪", currency: "SEK", symbol: "kr", defaultRate: "4.2" },
  { code: "NO", name: "Norway",         flag: "🇳🇴", currency: "NOK", symbol: "kr", defaultRate: "4.8" },
  { code: "DK", name: "Denmark",        flag: "🇩🇰", currency: "DKK", symbol: "kr", defaultRate: "4.0" },
];

function fmt(n: number, symbol: string): string {
  return symbol + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

interface AmortRow { month: number; payment: number; principal: number; interest: number; balance: number; }

function calcMortgage(principal: number, annualRate: number, termYears: number, type: "repayment" | "interest-only", overpayment: number) {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  let monthly = 0;
  if (type === "interest-only") {
    monthly = r === 0 ? 0 : principal * r;
  } else {
    monthly = r === 0 ? principal / n : principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }
  const totalMonthly = monthly + overpayment;

  // Build amortisation
  const rows: AmortRow[] = [];
  let balance = principal;
  let totalInterestPaid = 0;
  let month = 0;

  while (balance > 0.01 && month < n) {
    month++;
    const interestCharge = balance * r;
    let principalCharge: number;
    if (type === "interest-only") {
      principalCharge = overpayment;
    } else {
      principalCharge = Math.min(totalMonthly - interestCharge, balance);
    }
    const actualPayment = interestCharge + principalCharge;
    balance = Math.max(0, balance - principalCharge);
    totalInterestPaid += interestCharge;
    rows.push({ month, payment: actualPayment, principal: principalCharge, interest: interestCharge, balance });
  }

  const totalPaid = rows.reduce((s, r) => s + r.payment, 0) + (type === "interest-only" ? principal : 0);
  const finalInterest = type === "interest-only" ? totalInterestPaid : totalInterestPaid;
  return { monthly, totalMonthly, totalPaid, totalInterest: finalInterest, months: month, rows };
}

const FAQS = [
  { q: "How is the monthly mortgage payment calculated?", a: "For a repayment mortgage, the formula is: M = P × [r(1+r)ⁿ] ÷ [(1+r)ⁿ − 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of months. For an interest-only mortgage, you simply pay the interest each month: M = P × r, and repay the full capital at the end of the term." },
  { q: "What is the difference between a repayment and an interest-only mortgage?", a: "With a repayment mortgage, each monthly payment covers both interest and a portion of the capital, so the loan is fully paid off at the end of the term. With an interest-only mortgage, you only pay the interest each month — the full capital amount remains outstanding and must be repaid in a lump sum at the end of the term." },
  { q: "What is an amortisation schedule?", a: "An amortisation schedule is a complete table showing every monthly payment over the life of the mortgage. It breaks each payment into its interest and capital components and shows the remaining balance after each payment. In the early years, most of your payment goes towards interest. Over time, the proportion going to capital increases." },
  { q: "Does making overpayments save money?", a: "Yes — significantly. An overpayment reduces the outstanding capital, which means less interest accrues each month. Even a small monthly overpayment can shorten the mortgage term by several years and save thousands in interest. Our calculator shows you the exact impact: enter an overpayment amount to see the revised schedule and total savings." },
  { q: "What is LTV (loan-to-value)?", a: "LTV is the ratio of your mortgage to the value of the property, expressed as a percentage. A £180,000 mortgage on a £200,000 property is a 90% LTV. Lenders use LTV to set interest rates — the lower your LTV, the better the rate you can typically access. Most competitive rates start at 60% LTV." },
  { q: "What is the best free mortgage calculator?", a: "ToolStack's mortgage calculator is completely free with no signup required. It supports repayment and interest-only mortgages, overpayments, a full amortisation schedule, and 15 currencies — all in one tool. Unlike bank calculators, it doesn't push you to apply or collect your data." },
];

export default function MortgageCalculator() {
  const [countryCode, setCountryCode] = useState("GB");
  const [loanAmount, setLoanAmount] = useState("250000");
  const [interestRate, setInterestRate] = useState("4.5");
  const [termYears, setTermYears] = useState("25");
  const [repaymentType, setRepaymentType] = useState<"repayment" | "interest-only">("repayment");
  const [overpayment, setOverpayment] = useState("0");
  const [showAmort, setShowAmort] = useState(false);
  const [amortRows, setAmortRows] = useState(12);
  const [result, setResult] = useState<ReturnType<typeof calcMortgage> | null>(null);
  const [calculated, setCalculated] = useState(false);

  const country = COUNTRIES.find(c => c.code === countryCode) ?? COUNTRIES[0];

  const handleCountryChange = useCallback((code: string) => {
    const c = COUNTRIES.find(x => x.code === code);
    if (!c) return;
    setCountryCode(code);
    setInterestRate(c.defaultRate);
  }, []);

  const calculate = () => {
    const principal = parseFloat(loanAmount.replace(/,/g, "")) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(termYears) || 0;
    const extra = parseFloat(overpayment.replace(/,/g, "")) || 0;
    if (principal <= 0 || years <= 0) return;
    const res = calcMortgage(principal, rate, years, repaymentType, extra);
    setResult(res);
    setCalculated(true);
    setShowAmort(false);
    setAmortRows(12);
  };

  const s = country.symbol;
  const interestPct = result ? (result.totalInterest / (result.totalInterest + parseFloat(loanAmount.replace(/,/g, "") || "1")) * 100) : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Mortgage Calculator",
        "description": "Free mortgage calculator. Calculate monthly payments, total interest and full amortisation schedule for repayment and interest-only mortgages. Supports 15 currencies.",
        "url": "https://toolstack.tech/tools/mortgage-calculator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": [
          "Repayment and interest-only mortgage types",
          "Full amortisation schedule",
          "Overpayment calculator",
          "15 country currencies",
          "Instant calculation — no signup",
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
          { "@type": "ListItem", "position": 2, "name": "Finance Tools", "item": "https://toolstack.tech/tools/category/finance" },
          { "@type": "ListItem", "position": 3, "name": "Mortgage Calculator", "item": "https://toolstack.tech/tools/mortgage-calculator" },
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
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "50%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "30%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "80px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32, flexWrap: "wrap" as const }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
          <span>/</span>
          <Link href="/tools/category/finance" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Finance Tools</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>Mortgage Calculator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 20 }}>
            {["Free Forever", "No Signup", "15 Currencies", "Amortisation Schedule"].map(b => (
              <span key={b} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.1)", color: "#a5b4fc", letterSpacing: "0.06em" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 14 }}>
            Mortgage{" "}
            <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 560 }}>
            Monthly payments, total interest, and full amortisation schedule — for repayment and interest-only mortgages. Overpayment calculator included.
          </p>
        </div>

        {/* Country picker */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px 28px 24px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 4px" }}>Where are you based?</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "0 0 16px" }}>Sets your currency and typical interest rate.</p>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
            {COUNTRIES.map(c => {
              const active = c.code === countryCode;
              return (
                <button key={c.code} onClick={() => handleCountryChange(c.code)} style={{ padding: "7px 14px", borderRadius: 999, border: `1px solid ${active ? "rgba(99,102,241,0.55)" : "rgba(255,255,255,0.09)"}`, background: active ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)", color: active ? "#c7d2fe" : "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
                  <span>{c.flag}</span><span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main form */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px 28px 24px", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 20 }}>
            {/* Loan Amount */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 8 }}>
                Loan Amount ({country.currency})
              </label>
              <div style={{ position: "relative" as const }}>
                <span style={{ position: "absolute" as const, left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 15, fontWeight: 700 }}>{s}</span>
                <input
                  type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)}
                  style={{ width: "100%", boxSizing: "border-box" as const, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 14px 13px 32px", fontSize: 16, color: "white", outline: "none" }}
                />
              </div>
            </div>
            {/* Interest Rate */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 8 }}>Annual Interest Rate</label>
              <div style={{ position: "relative" as const }}>
                <input
                  type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} step="0.1"
                  style={{ width: "100%", boxSizing: "border-box" as const, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 32px 13px 14px", fontSize: 16, color: "white", outline: "none" }}
                />
                <span style={{ position: "absolute" as const, right: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 15, fontWeight: 700 }}>%</span>
              </div>
            </div>
            {/* Term */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 8 }}>Mortgage Term</label>
              <select value={termYears} onChange={e => setTermYears(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 14px", fontSize: 16, color: "white", outline: "none", cursor: "pointer" }}>
                {[5,10,15,20,25,30,35,40].map(y => <option key={y} value={y} style={{ background: "#1a1a2e" }}>{y} years</option>)}
              </select>
            </div>
            {/* Overpayment */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 8 }}>Monthly Overpayment</label>
              <div style={{ position: "relative" as const }}>
                <span style={{ position: "absolute" as const, left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: 15, fontWeight: 700 }}>{s}</span>
                <input
                  type="number" value={overpayment} onChange={e => setOverpayment(e.target.value)} min="0"
                  style={{ width: "100%", boxSizing: "border-box" as const, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 14px 13px 32px", fontSize: 16, color: "white", outline: "none" }}
                />
              </div>
            </div>
          </div>

          {/* Repayment type toggle */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 10 }}>Mortgage Type</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
              {(["repayment", "interest-only"] as const).map(t => (
                <button key={t} onClick={() => setRepaymentType(t)} style={{ padding: "10px 20px", borderRadius: 12, border: `1px solid ${repaymentType === t ? "rgba(99,102,241,0.55)" : "rgba(255,255,255,0.09)"}`, background: repaymentType === t ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.03)", color: repaymentType === t ? "#c7d2fe" : "rgba(255,255,255,0.55)", fontSize: 14, fontWeight: repaymentType === t ? 700 : 500, cursor: "pointer", textTransform: "capitalize" as const, transition: "all 0.15s" }}>
                  {t.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate} style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: "0.02em", transition: "opacity 0.2s" }}>
            Calculate Mortgage →
          </button>
        </div>

        {/* Results */}
        {calculated && result && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

            {/* Key metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 16 }}>
              {[
                { label: repaymentType === "interest-only" ? "Monthly Interest" : "Monthly Payment", value: fmt(result.monthly, s), accent: "#6366f1" },
                { label: parseFloat(overpayment) > 0 ? "Monthly Total (inc. overpayment)" : null, value: parseFloat(overpayment) > 0 ? fmt(result.totalMonthly, s) : null, accent: "#8b5cf6" },
                { label: "Total Interest", value: fmt(result.totalInterest, s), accent: "#f472b6" },
                { label: "Total Amount Paid", value: fmt(result.totalPaid, s), accent: "#34d399" },
                { label: "Mortgage Term", value: `${result.months} months${result.months < parseInt(termYears) * 12 ? ` (${Math.ceil(result.months / 12)} yrs — saved ${parseInt(termYears) - Math.ceil(result.months / 12)} yrs)` : ""}`, accent: "#fbbf24" },
              ].filter(m => m.label !== null).map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.035)", border: `1px solid rgba(255,255,255,0.09)`, borderRadius: 18, padding: "22px 20px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 8 }}>{m.label}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: m.accent, lineHeight: 1.2, wordBreak: "break-word" as const }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Interest breakdown bar */}
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "22px 24px", marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Cost Breakdown</p>
              <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 14, marginBottom: 14 }}>
                <div style={{ width: `${100 - interestPct}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 0.6s ease" }} />
                <div style={{ width: `${interestPct}%`, background: "rgba(244,114,182,0.5)", transition: "width 0.6s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" as const }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Capital: {fmt(parseFloat(loanAmount.replace(/,/g, "") || "0"), s)} ({(100 - interestPct).toFixed(1)}%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(244,114,182,0.7)" }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Interest: {fmt(result.totalInterest, s)} ({interestPct.toFixed(1)}%)</span>
                </div>
              </div>
            </div>

            {/* Amortisation toggle */}
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: "22px 24px", marginBottom: 16 }}>
              <button onClick={() => setShowAmort(!showAmort)} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", padding: 0 }}>
                <span style={{ fontSize: 18, transform: showAmort ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>▶</span>
                Amortisation Schedule ({result.rows.length} payments)
              </button>
              {showAmort && (
                <div style={{ marginTop: 20, overflowX: "auto" as const }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                        {["Month", "Payment", "Principal", "Interest", "Balance"].map(h => (
                          <th key={h} style={{ padding: "10px 12px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "right" as const, whiteSpace: "nowrap" as const }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.slice(0, amortRows).map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                          <td style={{ padding: "9px 12px", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.45)", textAlign: "right" as const }}>{row.month}</td>
                          <td style={{ padding: "9px 12px", border: "1px solid rgba(255,255,255,0.06)", color: "#6366f1", fontWeight: 600, textAlign: "right" as const }}>{fmt(row.payment, s)}</td>
                          <td style={{ padding: "9px 12px", border: "1px solid rgba(255,255,255,0.06)", color: "#34d399", textAlign: "right" as const }}>{fmt(row.principal, s)}</td>
                          <td style={{ padding: "9px 12px", border: "1px solid rgba(255,255,255,0.06)", color: "#f472b6", textAlign: "right" as const }}>{fmt(row.interest, s)}</td>
                          <td style={{ padding: "9px 12px", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", textAlign: "right" as const }}>{fmt(row.balance, s)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {amortRows < result.rows.length && (
                    <button onClick={() => setAmortRows(r => Math.min(r + 24, result.rows.length))} style={{ marginTop: 12, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer" }}>
                      Show more ({result.rows.length - amortRows} remaining)
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* How it works */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How the Mortgage Calculator Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 32, lineHeight: 1.7 }}>Enter your loan details and get a full breakdown in seconds — no signup, no data stored.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
            {[
              { n: "1", title: "Enter your loan amount", desc: "Type in the total amount you need to borrow — not the property price. For a £300k property with a £60k deposit, enter £240k." },
              { n: "2", title: "Set your rate and term", desc: "Enter your agreed interest rate as a percentage and select your mortgage term. Rates are pre-filled by country but you can override them." },
              { n: "3", title: "Choose repayment type", desc: "Repayment mortgages pay off capital and interest together. Interest-only mortgages pay just the interest — the full capital is due at the end." },
              { n: "4", title: "Add overpayments (optional)", desc: "If you plan to overpay each month, enter the amount. The calculator shows how many years you save and the total interest reduction." },
            ].map(s => (
              <div key={s.n} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 20px" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#818cf8", marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 8, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{s.desc}</p>
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

        {/* SEO Description */}
        <section style={{ marginTop: 56, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>The Complete Free Mortgage & House Hack Calculator</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Whether you're buying your first home, refinancing an existing mortgage, or analysing a house hack investment strategy, ToolStack's Mortgage Calculator gives you the complete picture in seconds. Enter your loan amount, interest rate, term length, and repayment type — and instantly see your monthly payment, total interest cost, and a full month-by-month amortisation schedule.
            </p>
            <p style={{ marginBottom: 16 }}>
              Unlike bank-branded calculators that exist to funnel you into an application, ToolStack's calculator is completely independent. It doesn't collect your personal data, doesn't require signup, and doesn't push products. You get pure, accurate calculations with a focus on helping you understand the true cost of borrowing — not selling you a mortgage.
            </p>
            <p style={{ marginBottom: 16 }}>
              The overpayment calculator is where this tool really shines. Enter any monthly overpayment amount and see exactly how many years it shaves off your term and how much interest you save. Even a small monthly overpayment — £100 on a £250,000 mortgage — can save tens of thousands in interest over the life of the loan. The amortisation schedule updates in real time to show the impact.
            </p>
            <p style={{ marginBottom: 16 }}>
              Multi-country support covers 15 currencies with pre-filled typical interest rates for each market: UK (4.5%), US (7.0%), Australia (6.0%), Canada (5.5%), Germany (3.8%), Switzerland (1.8%), and more. Switch countries instantly to compare borrowing costs across markets — essential for expats, international property investors, and anyone considering buying abroad.
            </p>
            <p style={{ marginBottom: 0 }}>
              Both repayment and interest-only mortgage types are supported. Repayment mortgages show the declining balance curve as you pay down capital over time. Interest-only mortgages show the fixed monthly interest cost and highlight the capital repayment requirement at term end. For property investors evaluating buy-to-let yields, the interest-only view provides the monthly cost basis for rental ROI calculations.
            </p>
          </div>
        </section>

        {/* Related Tools */}
        <section style={{ marginTop: 24, padding: "24px 28px", borderRadius: 16, background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.12)" }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(129,140,248,0.8)", letterSpacing: "0.06em", textTransform: "uppercase" as const, margin: "0 0 8px" }}>More Finance Tools</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 12px", lineHeight: 1.6 }}>
            Calculate eBay profit, Whatnot fees, card flip ROI, and more — all free, no signup.
          </p>
          <a href="/tools/category/finance" style={{ fontSize: 13, fontWeight: 700, color: "#818cf8", textDecoration: "none" }}>View all finance tools →</a>
        </section>

        <div style={{ marginTop: 56 }}>
          <MoreTools currentSlug="mortgage-calculator" />
        </div>
        <div style={{ marginTop: 24 }}>
          
        </div>
      </div>
    </div>
  );
}
