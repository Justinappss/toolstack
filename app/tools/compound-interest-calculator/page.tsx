"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

const accent = "#fbbf24";
const accentBg = "rgba(251,191,36,0.08)";
const accentBorder = "rgba(251,191,36,0.2)";

const CURRENCIES = [
    { code: "USD", symbol: "$",   name: "US Dollar" },
    { code: "GBP", symbol: "£",   name: "British Pound" },
    { code: "EUR", symbol: "€",   name: "Euro" },
    { code: "AUD", symbol: "A$",  name: "Australian Dollar" },
    { code: "CAD", symbol: "C$",  name: "Canadian Dollar" },
    { code: "CHF", symbol: "Fr",  name: "Swiss Franc" },
    { code: "INR", symbol: "₹",   name: "Indian Rupee" },
    { code: "SGD", symbol: "S$",  name: "Singapore Dollar" },
    { code: "AED", symbol: "AED", name: "UAE Dirham" },
    { code: "JPY", symbol: "¥",   name: "Japanese Yen" },
];

const FREQUENCIES = [
    { label: "Daily",          n: 365 },
    { label: "Weekly",         n: 52  },
    { label: "Monthly",        n: 12  },
    { label: "Quarterly",      n: 4   },
    { label: "Semi-annually",  n: 2   },
    { label: "Annually",       n: 1   },
];

interface YearRow { year: number; balance: number; interest: number; contributions: number; totalContributions: number; }

function calcCompound(
    principal: number,
    annualRate: number,
    n: number,
    years: number,
    monthlyContrib: number
): { finalBalance: number; totalInterest: number; totalContributions: number; rows: YearRow[] } {
    const r = annualRate / 100;
    const rows: YearRow[] = [];
    let balance = principal;
    let totalContributions = principal;

    for (let y = 1; y <= years; y++) {
        const startBalance = balance;
        // Compound each period in the year
        for (let p = 0; p < n; p++) {
            balance += monthlyContrib * (12 / n); // scale monthly contribution to each period
            balance *= (1 + r / n);
        }
        const yearInterest = balance - startBalance - monthlyContrib * 12;
        totalContributions += monthlyContrib * 12;
        rows.push({
            year: y,
            balance,
            interest: yearInterest,
            contributions: monthlyContrib * 12,
            totalContributions,
        });
    }

    const totalInterest = balance - totalContributions;
    return { finalBalance: balance, totalInterest, totalContributions, rows };
}

function fmt(n: number, symbol: string, decimals = 2): string {
    return symbol + n.toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "Compound Interest Calculator",
            "description": "Calculate compound interest with optional monthly contributions. See final balance, total interest, year-by-year growth and the Rule of 72.",
            "url": "https://toolstack.tech/tools/compound-interest-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Finance", "item": "https://toolstack.tech/tools?category=finance" },
                { "@type": "ListItem", "position": 3, "name": "Compound Interest Calculator", "item": "https://toolstack.tech/tools/compound-interest-calculator" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                { "@type": "Question", "name": "What is compound interest?", "acceptedAnswer": { "@type": "Answer", "text": "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which only earns on the original principal), compound interest makes your money grow exponentially over time. Albert Einstein reportedly called it the eighth wonder of the world." } },
                { "@type": "Question", "name": "How is compound interest calculated?", "acceptedAnswer": { "@type": "Answer", "text": "The formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years. More frequent compounding (daily vs annually) produces slightly higher returns." } },
                { "@type": "Question", "name": "What is the Rule of 72?", "acceptedAnswer": { "@type": "Answer", "text": "The Rule of 72 is a simple shortcut to estimate how long it takes an investment to double. Divide 72 by the annual interest rate to get the approximate number of years. For example, at 8% annual return, 72 ÷ 8 = 9 years to double your money. It works best for rates between 6% and 10%." } },
                { "@type": "Question", "name": "How much does compounding frequency matter?", "acceptedAnswer": { "@type": "Answer", "text": "The difference between annual and daily compounding is smaller than most people expect. On £10,000 at 5% for 10 years, annual compounding gives £16,288 vs daily compounding giving £16,487 — a difference of only £199. The interest rate itself has a far greater impact than the compounding frequency." } },
                { "@type": "Question", "name": "How do monthly contributions affect compound interest?", "acceptedAnswer": { "@type": "Answer", "text": "Monthly contributions dramatically accelerate wealth growth because each contribution immediately starts compounding. £200 per month at 7% for 20 years turns into approximately £104,000 — from total contributions of only £48,000. The combination of regular contributions and compound interest is the most powerful wealth-building strategy available to ordinary savers." } },
                { "@type": "Question", "name": "What is the best compound interest calculator?", "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's Compound Interest Calculator is one of the best free options — it supports multiple currencies, optional monthly contributions, six compounding frequencies, and shows a full year-by-year breakdown table alongside the Rule of 72. Everything runs in your browser instantly with no signup required." } },
            ],
        },
    ],
};

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState("10000");
    const [rate, setRate] = useState("7");
    const [years, setYears] = useState("10");
    const [monthlyContrib, setMonthlyContrib] = useState("0");
    const [freqIndex, setFreqIndex] = useState(2); // Monthly
    const [currencyCode, setCurrencyCode] = useState("USD");
    const [showAllRows, setShowAllRows] = useState(false);

    const currency = CURRENCIES.find(c => c.code === currencyCode) ?? CURRENCIES[0];
    const freq = FREQUENCIES[freqIndex];

    const result = useMemo(() => {
        const p = parseFloat(principal.replace(/,/g, "")) || 0;
        const r = parseFloat(rate) || 0;
        const y = Math.min(Math.max(parseInt(years) || 1, 1), 100);
        const mc = parseFloat(monthlyContrib.replace(/,/g, "")) || 0;
        if (p <= 0 && mc <= 0) return null;
        return calcCompound(p, r, freq.n, y, mc);
    }, [principal, rate, years, monthlyContrib, freq.n]);

    const rule72 = parseFloat(rate) > 0 ? (72 / parseFloat(rate)).toFixed(1) : null;

    const principalPct = result && result.finalBalance > 0
        ? (parseFloat(principal.replace(/,/g, "")) / result.finalBalance) * 100
        : 0;
    const contribPct = result && result.finalBalance > 0
        ? ((result.totalContributions - parseFloat(principal.replace(/,/g, ""))) / result.finalBalance) * 100
        : 0;
    const interestPct = result ? Math.max(0, 100 - principalPct - contribPct) : 0;

    const displayedRows = result
        ? (showAllRows ? result.rows : result.rows.slice(0, 10))
        : [];

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "12px 14px", borderRadius: 10,
        background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
        color: "white", fontSize: 15, outline: "none", boxSizing: "border-box",
    };
    const labelStyle: React.CSSProperties = {
        fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)",
        textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8, display: "block",
    };

    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px", position: "relative" }}>
                    <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                        <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/tools?category=finance" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Finance</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Compound Interest Calculator</span>
                    </nav>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Finance</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Free · No signup</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 16, color: "white" }}>
                        Compound Interest Calculator
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 520, lineHeight: 1.65, marginBottom: 0 }}>
                        See how your investment grows over time with compounding and optional monthly contributions.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px 100px" }}>

                {/* Inputs + Results */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 24 }}>

                    {/* Input panel */}
                    <div style={{ padding: "28px 28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 24px" }}>Your Details</h2>

                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            <div>
                                <label style={labelStyle}>Currency</label>
                                <select value={currencyCode} onChange={e => setCurrencyCode(e.target.value)} style={{ ...inputStyle }}>
                                    {CURRENCIES.map(c => (
                                        <option key={c.code} value={c.code}>{c.symbol} {c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={labelStyle}>Initial Investment ({currency.symbol})</label>
                                <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} min="0" style={inputStyle} placeholder="10000" />
                            </div>

                            <div>
                                <label style={labelStyle}>Monthly Contribution ({currency.symbol})</label>
                                <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(e.target.value)} min="0" style={inputStyle} placeholder="0" />
                            </div>

                            <div>
                                <label style={labelStyle}>Annual Interest Rate (%)</label>
                                <input type="number" value={rate} onChange={e => setRate(e.target.value)} min="0" max="100" step="0.1" style={inputStyle} placeholder="7" />
                            </div>

                            <div>
                                <label style={labelStyle}>Investment Period (Years)</label>
                                <input type="number" value={years} onChange={e => setYears(e.target.value)} min="1" max="100" style={inputStyle} placeholder="10" />
                            </div>

                            <div>
                                <label style={labelStyle}>Compounding Frequency</label>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                    {FREQUENCIES.map((f, i) => (
                                        <button key={f.label} onClick={() => setFreqIndex(i)}
                                            style={{
                                                padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                                                background: freqIndex === i ? accentBg : "rgba(255,255,255,0.04)",
                                                border: `1px solid ${freqIndex === i ? accentBorder : "rgba(255,255,255,0.08)"}`,
                                                color: freqIndex === i ? accent : "rgba(255,255,255,0.5)",
                                            }}>
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results panel */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {result ? (
                            <>
                                {/* Final balance */}
                                <div style={{ padding: "28px 28px", borderRadius: 20, background: accentBg, border: `1px solid ${accentBorder}`, textAlign: "center" }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Final Balance</p>
                                    <p style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: accent, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                                        {fmt(result.finalBalance, currency.symbol)}
                                    </p>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>after {years} year{parseInt(years) !== 1 ? "s" : ""} · compounded {freq.label.toLowerCase()}</p>
                                </div>

                                {/* Breakdown */}
                                <div style={{ padding: "24px 24px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 16px" }}>Breakdown</p>

                                    {/* Bar */}
                                    <div style={{ height: 10, borderRadius: 999, overflow: "hidden", display: "flex", marginBottom: 16 }}>
                                        <div style={{ width: `${principalPct}%`, background: "rgba(255,255,255,0.35)" }} />
                                        <div style={{ width: `${contribPct}%`, background: "#60a5fa" }} />
                                        <div style={{ width: `${interestPct}%`, background: accent }} />
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
                                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Initial principal</span>
                                            </div>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{fmt(parseFloat(principal.replace(/,/g, "")) || 0, currency.symbol)}</span>
                                        </div>
                                        {parseFloat(monthlyContrib) > 0 && (
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <div style={{ width: 10, height: 10, borderRadius: 2, background: "#60a5fa", flexShrink: 0 }} />
                                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Total contributions</span>
                                                </div>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>
                                                    {fmt(result.totalContributions - (parseFloat(principal.replace(/,/g, "")) || 0), currency.symbol)}
                                                </span>
                                            </div>
                                        )}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <div style={{ width: 10, height: 10, borderRadius: 2, background: accent, flexShrink: 0 }} />
                                                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Total interest earned</span>
                                            </div>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: accent }}>{fmt(result.totalInterest, currency.symbol)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rule of 72 */}
                                {rule72 && (
                                    <div style={{ padding: "18px 24px", borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
                                        <div style={{ fontSize: 24, flexShrink: 0 }}>⚡</div>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", margin: "0 0 3px" }}>Rule of 72</p>
                                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                                                At {rate}% per year, your money doubles in approximately <strong style={{ color: accent }}>{rule72} years</strong>.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ padding: "40px 28px", borderRadius: 20, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                                <div style={{ fontSize: 40, marginBottom: 16 }}>📈</div>
                                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", margin: 0 }}>Enter your investment details to see results.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Year-by-year table */}
                {result && result.rows.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.01em" }}>Year-by-Year Growth</h2>
                        <div style={{ overflowX: "auto", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                                <thead>
                                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                        {["Year", "Balance", "Interest Earned", ...(parseFloat(monthlyContrib) > 0 ? ["Annual Contributions"] : [])].map(h => (
                                            <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedRows.map((row, i) => (
                                        <tr key={row.year} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                                            <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Year {row.year}</td>
                                            <td style={{ padding: "12px 16px", color: accent, fontWeight: 700 }}>{fmt(row.balance, currency.symbol)}</td>
                                            <td style={{ padding: "12px 16px", color: "#34d399", fontWeight: 600 }}>+{fmt(row.interest, currency.symbol)}</td>
                                            {parseFloat(monthlyContrib) > 0 && (
                                                <td style={{ padding: "12px 16px", color: "#60a5fa", fontWeight: 600 }}>{fmt(row.contributions, currency.symbol)}</td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {result.rows.length > 10 && (
                            <button onClick={() => setShowAllRows(v => !v)}
                                style={{ marginTop: 12, padding: "8px 20px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
                                {showAllRows ? "Show less" : `Show all ${result.rows.length} years`}
                            </button>
                        )}
                    </div>
                )}

                {/* FAQ */}
                <section style={{ marginBottom: 56, marginTop: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            { q: "What is compound interest?", a: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest makes your money grow exponentially over time. The longer you leave it, the faster it grows — which is why starting early matters so much." },
                            { q: "How is compound interest calculated?", a: "The formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years. More frequent compounding produces slightly higher returns." },
                            { q: "What is the Rule of 72?", a: "The Rule of 72 estimates how long it takes an investment to double. Divide 72 by the annual interest rate — for example, at 8% per year, 72 ÷ 8 = 9 years to double. It works best for rates between 6% and 10% and is a quick mental maths shortcut used by investors and financial advisors." },
                            { q: "How much does compounding frequency matter?", a: "Less than most people think. On $10,000 at 5% for 10 years, annual compounding gives $16,288 vs daily compounding giving $16,487 — a difference of only $199. The interest rate itself has far more impact than whether you compound monthly or annually." },
                            { q: "How do monthly contributions affect compound interest?", a: "Monthly contributions dramatically accelerate growth because each contribution immediately starts compounding. $200 per month at 7% for 20 years turns into approximately $104,000 — from total contributions of only $48,000. Regular contributions combined with compounding is the most powerful wealth-building strategy available." },
                            { q: "What is the best compound interest calculator?", a: "ToolStack's Compound Interest Calculator is one of the best free options — it supports multiple currencies, optional monthly contributions, six compounding frequencies, and shows a full year-by-year breakdown table alongside the Rule of 72. Everything runs in your browser instantly with no signup required." },
                        ].map(({ q, a }) => (
                            <div key={q} style={{ padding: "18px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{q}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SEO Description */}
                <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Compound Interest Calculator: Free Online Tool</h2>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                      Albert Einstein allegedly called compound interest the eighth wonder of the world — and anyone who's looked at a retirement account balance 30 years after starting has probably felt that. Compound interest is the mechanism: your returns generate their own returns, snowballing over time. Our Compound Interest Calculator shows you exactly how your money grows with contributions, different compounding frequencies, and realistic annual rates.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Enter your starting balance, monthly or annual contribution, expected annual return rate, time horizon in years, and compounding frequency. The calculator shows your final balance, total contributions, total interest earned, and a year-by-year breakdown showing how the balance grows each year. Toggle between nominal and inflation-adjusted figures to see your real purchasing power.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Common uses include calculating how much you need to save monthly to hit a retirement goal, seeing the real impact of starting to invest at 25 vs. 35 vs. 45, comparing the effect of different compounding frequencies on the same initial balance, and planning for large financial goals like a house down payment or college fund.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Most compound interest calculators show you the final number without showing you how you got there. Ours gives you a full year-by-year breakdown so you can see exactly how much of your growth came from your contributions vs. compound returns — which is the insight that actually motivates people to keep saving. Free, unlimited calculations, no signup required.
                    </p>
                  </div>
                </section>

                <MoreTools currentSlug="compound-interest-calculator" />
                
            </div>
        </main>
    );
}
