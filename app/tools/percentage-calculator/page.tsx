"use client";
import { useState } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const MODES = [
  {
    id: "what-is",
    label: "What is X% of Y?",
    desc: "Find a percentage of a number",
    inputs: ["Percentage (%)", "Of this number"],
    formula: (a: number, b: number) => ({ result: (a / 100) * b, label: `${a}% of ${b}`, equation: `${a} ÷ 100 × ${b} = ${((a / 100) * b).toLocaleString()}` }),
  },
  {
    id: "x-is-what",
    label: "X is what % of Y?",
    desc: "Find what percentage one number is of another",
    inputs: ["This number (X)", "Is what % of (Y)"],
    formula: (a: number, b: number) => ({ result: (a / b) * 100, label: `${a} is what % of ${b}`, equation: `${a} ÷ ${b} × 100 = ${((a / b) * 100).toFixed(4)}%` }),
    suffix: "%",
  },
  {
    id: "increase-by",
    label: "Increase X by Y%",
    desc: "Add a percentage to a number",
    inputs: ["Starting number", "Increase by (%)"],
    formula: (a: number, b: number) => {
      const result = a * (1 + b / 100);
      const increase = result - a;
      return { result, label: `${a} increased by ${b}%`, equation: `${a} × (1 + ${b} ÷ 100) = ${result.toLocaleString()}`, extra: `Increase amount: +${increase.toLocaleString(undefined, { maximumFractionDigits: 4 })}` };
    },
  },
  {
    id: "decrease-by",
    label: "Decrease X by Y%",
    desc: "Subtract a percentage from a number",
    inputs: ["Starting number", "Decrease by (%)"],
    formula: (a: number, b: number) => {
      const result = a * (1 - b / 100);
      const decrease = a - result;
      return { result, label: `${a} decreased by ${b}%`, equation: `${a} × (1 − ${b} ÷ 100) = ${result.toLocaleString()}`, extra: `Decrease amount: −${decrease.toLocaleString(undefined, { maximumFractionDigits: 4 })}` };
    },
  },
  {
    id: "pct-change",
    label: "% Change from X to Y",
    desc: "Calculate the percentage change between two values",
    inputs: ["Original value (X)", "New value (Y)"],
    formula: (a: number, b: number) => {
      const result = ((b - a) / Math.abs(a)) * 100;
      const direction = result >= 0 ? "increase" : "decrease";
      return { result: Math.abs(result), label: `${a} → ${b}`, equation: `((${b} − ${a}) ÷ |${a}|) × 100 = ${result.toFixed(4)}%`, extra: `${Math.abs(result).toFixed(2)}% ${direction}`, suffix: "%" };
    },
    suffix: "%",
  },
  {
    id: "pct-diff",
    label: "% Difference X vs Y",
    desc: "Find the relative difference between two numbers",
    inputs: ["First number (X)", "Second number (Y)"],
    formula: (a: number, b: number) => {
      const result = (Math.abs(a - b) / ((Math.abs(a) + Math.abs(b)) / 2)) * 100;
      return { result, label: `${a} vs ${b}`, equation: `|${a} − ${b}| ÷ ((|${a}| + |${b}|) ÷ 2) × 100 = ${result.toFixed(4)}%`, suffix: "%" };
    },
    suffix: "%",
  },
];

const FAQS = [
  { q: "How do I calculate what percentage X is of Y?", a: "Divide X by Y, then multiply by 100. For example, 45 is what percentage of 180? → (45 ÷ 180) × 100 = 25%. This tells you that 45 is 25% of 180. Use the 'X is what % of Y?' mode above to get this instantly." },
  { q: "What is the difference between percentage change and percentage difference?", a: "Percentage change measures how much a value changed from a starting point: ((new − old) ÷ old) × 100. It has direction — positive = increase, negative = decrease. Percentage difference compares two values without a starting point, using the average of the two as the denominator. Use percentage change when tracking before/after; use percentage difference when comparing two separate values of equal standing." },
  { q: "How do I reverse a percentage — find the original value before a percentage was applied?", a: "To reverse an increase: original = new value ÷ (1 + percentage ÷ 100). To reverse a decrease: original = new value ÷ (1 − percentage ÷ 100). For example, if a price is £130 after a 30% increase, the original was £130 ÷ 1.30 = £100. This is commonly needed when working with VAT-inclusive prices." },
  { q: "How do I calculate a percentage tip?", a: "Multiply the bill amount by the tip percentage divided by 100. For a 15% tip on a £45 bill: 45 × (15 ÷ 100) = £6.75. Use the 'What is X% of Y?' mode above — enter 15 as the percentage and 45 as the number." },
  { q: "What is percentage increase vs absolute increase?", a: "Absolute increase is the raw difference: £120 − £100 = £20. Percentage increase expresses that change relative to the starting value: (20 ÷ 100) × 100 = 20%. Use absolute increase when comparing quantities of the same unit. Use percentage increase when comparing proportional growth across different scales (e.g., revenue growth for companies of different sizes)." },
  { q: "What is the best free percentage calculator?", a: "ToolStack's percentage calculator provides six different calculation modes in one free tool: finding a percentage of a number, finding what percentage one number is of another, percentage increase, percentage decrease, percentage change, and percentage difference. All modes show the formula used so you can learn, not just get an answer. No signup required." },
];

interface CalcResult { result: number; label: string; equation: string; extra?: string; suffix?: string; }

export default function PercentageCalculator() {
  const [activeMode, setActiveMode] = useState(0);
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState("");

  const mode = MODES[activeMode];

  const calculate = () => {
    const a = parseFloat(inputA);
    const b = parseFloat(inputB);
    if (isNaN(a) || isNaN(b)) { setError("Please enter valid numbers in both fields."); setResult(null); return; }
    if ((mode.id === "x-is-what" || mode.id === "pct-change" || mode.id === "pct-diff") && b === 0) { setError("The second number cannot be zero."); setResult(null); return; }
    setError("");
    const res = mode.formula(a, b) as CalcResult;
    setResult(res);
  };

  const handleModeChange = (i: number) => {
    setActiveMode(i);
    setResult(null);
    setError("");
    setInputA("");
    setInputB("");
  };

  const formatResult = (n: number) => {
    if (Math.abs(n) >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
    return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Percentage Calculator",
        "description": "Six percentage calculators in one: find a percentage of a number, percentage increase/decrease, percentage change, percentage difference and more. Free, instant, no signup.",
        "url": "https://toolstack.tech/tools/percentage-calculator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": [
          "What is X% of Y?",
          "X is what % of Y?",
          "Increase a number by a percentage",
          "Decrease a number by a percentage",
          "Percentage change calculator",
          "Percentage difference calculator",
          "Formula shown for every calculation",
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
          { "@type": "ListItem", "position": 2, "name": "Math Tools", "item": "https://toolstack.tech/tools/category/math" },
          { "@type": "ListItem", "position": 3, "name": "Percentage Calculator", "item": "https://toolstack.tech/tools/percentage-calculator" },
        ]
      },
    ]
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", fontFamily: "var(--font-inter), sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Glow blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "50%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "30%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "80px 20px 100px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 32, flexWrap: "wrap" as const }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
          <span>/</span>
          <Link href="/tools/category/math" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Math Tools</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>Percentage Calculator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8, marginBottom: 20 }}>
            {["6 Calculators in One", "Free Forever", "No Signup", "Formula Shown"].map(b => (
              <span key={b} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)", color: "#fcd34d", letterSpacing: "0.06em" }}>{b}</span>
            ))}
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 14 }}>
            Percentage{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Calculator</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 560 }}>
            Six percentage tools in one. Find a percentage, calculate increases and decreases, work out percentage change — with the formula shown every time.
          </p>
        </div>

        {/* Mode selector */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "24px", marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>Choose calculator</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
            {MODES.map((m, i) => {
              const active = i === activeMode;
              return (
                <button key={m.id} onClick={() => handleModeChange(i)} style={{ padding: "14px 16px", borderRadius: 14, border: `1px solid ${active ? "rgba(251,191,36,0.45)" : "rgba(255,255,255,0.08)"}`, background: active ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.02)", color: active ? "#fcd34d" : "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: active ? 700 : 500, cursor: "pointer", textAlign: "left" as const, transition: "all 0.15s", lineHeight: 1.3 }}>
                  <div style={{ fontWeight: 700, marginBottom: 3, color: active ? "#fcd34d" : "rgba(255,255,255,0.75)" }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{m.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input form */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 24 }}>
            {mode.inputs.map((label, i) => (
              <div key={i}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: 8 }}>{label}</label>
                <input
                  type="number"
                  value={i === 0 ? inputA : inputB}
                  onChange={e => i === 0 ? setInputA(e.target.value) : setInputB(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && calculate()}
                  placeholder="0"
                  style={{ width: "100%", boxSizing: "border-box" as const, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 14px", fontSize: 18, color: "white", outline: "none", fontWeight: 600 }}
                />
              </div>
            ))}
          </div>

          {error && (
            <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#fca5a5", fontSize: 14, marginBottom: 16 }}>{error}</div>
          )}

          <button onClick={calculate} style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", color: "#1a1000", fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: "0.02em", transition: "opacity 0.2s" }}>
            Calculate →
          </button>
        </div>

        {/* Result */}
        {result && (
          <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 24, padding: "32px 28px", marginBottom: 16, animation: "fadeUp 0.35s ease" }}>
            <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(251,191,36,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 8 }}>Result</p>
            <p style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#fbbf24", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 12 }}>
              {formatResult(result.result)}{result.suffix ?? ""}
            </p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 16 }}>{result.label} = <strong style={{ color: "rgba(255,255,255,0.8)" }}>{formatResult(result.result)}{result.suffix ?? ""}</strong></p>

            {/* Formula */}
            <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: result.extra ? 12 : 0 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 6 }}>How it was calculated</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>{result.equation}</p>
            </div>

            {result.extra && (
              <div style={{ marginTop: 12, padding: "12px 18px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0 }}>{result.extra}</p>
              </div>
            )}

            <button onClick={() => { setResult(null); setInputA(""); setInputB(""); }} style={{ marginTop: 20, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: 13, cursor: "pointer" }}>
              Clear & recalculate
            </button>
          </div>
        )}

        {/* Reference table */}
        <section style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>Common Percentage Reference</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 24, lineHeight: 1.7 }}>Quick reference for frequently used percentage calculations.</p>
          <div style={{ overflowX: "auto" as const }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                  {["Calculation", "Formula", "Example"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "#fbbf24", fontWeight: 700, textAlign: "left" as const }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["X% of Y", "Y × (X ÷ 100)", "20% of 150 = 30"],
                  ["X is what % of Y?", "(X ÷ Y) × 100", "30 is 20% of 150"],
                  ["Increase X by Y%", "X × (1 + Y ÷ 100)", "150 + 20% = 180"],
                  ["Decrease X by Y%", "X × (1 − Y ÷ 100)", "150 − 20% = 120"],
                  ["% change X→Y", "((Y − X) ÷ |X|) × 100", "100→120 = +20%"],
                  ["% difference X vs Y", "(|X−Y| ÷ avg(X,Y)) × 100", "100 vs 120 = 18.18%"],
                ].map(([calc, formula, example], i) => (
                  <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                    <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{calc}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: 13 }}>{formula}</td>
                    <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "#fbbf24", fontFamily: "monospace", fontSize: 13 }}>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          {/* SEO Description */}
          <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Percentage Calculator: Free Online Tool</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                Percentage math comes up everywhere — discounts, tips, tax, grades, growth rates, margin calculations — and most people reach for a calculator app that can't easily express "what is 15% of 340?" or "23 is what percent of 89?" Our Percentage Calculator bundles six different percentage tools into one page, each designed for a specific type of percentage question.
              </p>
              <p style={{ marginBottom: 16 }}>
                Choose the calculation you need: "What is X% of Y?", "X is what % of Y?", "Percentage change from X to Y", "Percentage increase", "Percentage decrease", or "Percentage difference between X and Y." Enter your numbers and get instant results with the formula shown so you understand the math, not just the answer.
              </p>
              <p style={{ marginBottom: 16 }}>
                Common uses include calculating sale prices and discounts while shopping, figuring out tip amounts at restaurants, determining grade percentages for school assignments, calculating profit margins and markup percentages for business, computing year-over-year growth rates, and finding what percentage a part is of a whole for data analysis.
              </p>
              <p style={{ marginBottom: 0 }}>
                Most percentage calculators only do one thing — "what is X% of Y?" Ours handles all six common percentage questions in one tool, with the formula shown for each so you learn the math. Instant results, no ads blocking the answer, no signup required. Free and unlimited.
              </p>
            </div>
          </section>

          <MoreTools currentSlug="percentage-calculator" />
        </div>
        <div style={{ marginTop: 24 }}>
          
        </div>
      </div>
    </div>
  );
}
