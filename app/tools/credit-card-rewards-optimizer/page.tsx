"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const ACCENT = "#f59e0b";
const ACCENT_RGB = "245,158,11";

// ─── Categories ──────────────────────────────────────────────────────────────
const CATS = [
    { id: "travel",        label: "Travel",             sub: "Flights, hotels, car rental",    icon: "✈️" },
    { id: "dining",        label: "Dining",             sub: "Restaurants, cafes, takeout",    icon: "🍽️" },
    { id: "gas",           label: "Gas & Fuel",         sub: "Petrol & fuel stations",         icon: "⛽" },
    { id: "office",        label: "Office Supplies",    sub: "Staples, Amazon Business",       icon: "📎" },
    { id: "internet",      label: "Internet & Phone",   sub: "Monthly bills",                  icon: "📱" },
    { id: "advertising",   label: "Advertising",        sub: "Google, Meta, LinkedIn ads",     icon: "📣" },
    { id: "shipping",      label: "Shipping & Freight", sub: "FedEx, UPS, couriers",          icon: "📦" },
    { id: "groceries",     label: "Groceries",          sub: "Supermarkets",                   icon: "🛒" },
    { id: "other",         label: "Everything Else",    sub: "All other spend",                icon: "💳" },
] as const;

type CatId = typeof CATS[number]["id"];
type Spend = Record<CatId, number>;

const AMEX_ELIGIBLE: CatId[] = ["travel", "dining", "gas", "advertising", "shipping", "internet"];

// ─── Cards ───────────────────────────────────────────────────────────────────
type Card = {
    id: string;
    name: string;
    issuer: string;
    type: "business" | "personal";
    currency: string;
    pv: number; // cents per point/mile/dollar
    rates: Record<CatId, number>;
    amexBusinessGold?: true;
    fee: number;
    url: string; // affiliate link — add FlexOffers link here
    color: string;
    accentRgb: string;
    highlight: string;
};

const CARDS: Card[] = [
    {
        id: "chase-ink-preferred", name: "Chase Ink Business Preferred", issuer: "Chase", type: "business",
        currency: "Chase UR Points", pv: 1.8,
        rates: { travel: 3, dining: 1, gas: 1, office: 1, internet: 3, advertising: 3, shipping: 3, groceries: 1, other: 1 },
        fee: 95, url: "https://creditcards.chase.com/business-credit-cards/ink/preferred",
        color: "#3b82f6", accentRgb: "59,130,246",
        highlight: "3x on travel, internet, phone, ads & shipping",
    },
    {
        id: "chase-ink-cash", name: "Chase Ink Business Cash", issuer: "Chase", type: "business",
        currency: "Chase UR Points", pv: 1.8,
        rates: { travel: 1, dining: 2, gas: 2, office: 5, internet: 5, advertising: 1, shipping: 1, groceries: 1, other: 1 },
        fee: 0, url: "https://creditcards.chase.com/business-credit-cards/ink/cash",
        color: "#1d4ed8", accentRgb: "29,78,216",
        highlight: "5x on office supplies & internet — no annual fee",
    },
    {
        id: "chase-ink-unlimited", name: "Chase Ink Business Unlimited", issuer: "Chase", type: "business",
        currency: "Chase UR Points", pv: 1.8,
        rates: { travel: 1.5, dining: 1.5, gas: 1.5, office: 1.5, internet: 1.5, advertising: 1.5, shipping: 1.5, groceries: 1.5, other: 1.5 },
        fee: 0, url: "https://creditcards.chase.com/business-credit-cards/ink/unlimited",
        color: "#2563eb", accentRgb: "37,99,235",
        highlight: "Flat 1.5x on everything — simple, no annual fee",
    },
    {
        id: "amex-business-gold", name: "Amex Business Gold", issuer: "American Express", type: "business",
        currency: "Amex MR Points", pv: 1.8, amexBusinessGold: true,
        rates: { travel: 4, dining: 4, gas: 4, office: 1, internet: 4, advertising: 4, shipping: 4, groceries: 1, other: 1 },
        fee: 375, url: "https://www.americanexpress.com/en-us/business/credit-cards/gold/",
        color: "#d97706", accentRgb: "217,119,6",
        highlight: "4x auto-applied to your top 2 spending categories",
    },
    {
        id: "amex-blue-business-cash", name: "Amex Blue Business Cash", issuer: "American Express", type: "business",
        currency: "Cash Back", pv: 1,
        rates: { travel: 2, dining: 2, gas: 2, office: 2, internet: 2, advertising: 2, shipping: 2, groceries: 2, other: 2 },
        fee: 0, url: "https://www.americanexpress.com/en-us/business/credit-cards/blue-business-cash/",
        color: "#0d9488", accentRgb: "13,148,136",
        highlight: "Flat 2% cash back on everything — no annual fee",
    },
    {
        id: "capital-one-spark", name: "Capital One Spark Cash Plus", issuer: "Capital One", type: "business",
        currency: "Cash Back", pv: 1,
        rates: { travel: 2, dining: 2, gas: 2, office: 2, internet: 2, advertising: 2, shipping: 2, groceries: 2, other: 2 },
        fee: 150, url: "https://capitalone.com/small-business/credit-cards/spark-cash-plus/",
        color: "#dc2626", accentRgb: "220,38,38",
        highlight: "Unlimited 2% cash back, no preset spending limit",
    },
    {
        id: "chase-sapphire-preferred", name: "Chase Sapphire Preferred", issuer: "Chase", type: "personal",
        currency: "Chase UR Points", pv: 1.8,
        rates: { travel: 2, dining: 3, gas: 1, office: 1, internet: 1, advertising: 1, shipping: 1, groceries: 1, other: 1 },
        fee: 95, url: "https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred",
        color: "#1e40af", accentRgb: "30,64,175",
        highlight: "3x dining, 2x travel — best entry travel card",
    },
    {
        id: "chase-sapphire-reserve", name: "Chase Sapphire Reserve", issuer: "Chase", type: "personal",
        currency: "Chase UR Points", pv: 1.8,
        rates: { travel: 3, dining: 3, gas: 1, office: 1, internet: 1, advertising: 1, shipping: 1, groceries: 1, other: 1 },
        fee: 550, url: "https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve",
        color: "#1e3a8a", accentRgb: "30,58,138",
        highlight: "3x travel & dining + $300 annual travel credit",
    },
    {
        id: "amex-gold", name: "Amex Gold Card", issuer: "American Express", type: "personal",
        currency: "Amex MR Points", pv: 1.8,
        rates: { travel: 3, dining: 4, gas: 1, office: 1, internet: 1, advertising: 1, shipping: 1, groceries: 4, other: 1 },
        fee: 250, url: "https://www.americanexpress.com/en-us/credit-cards/gold-card/",
        color: "#b45309", accentRgb: "180,83,9",
        highlight: "4x dining & groceries — best for food spend",
    },
    {
        id: "capital-one-venture", name: "Capital One Venture", issuer: "Capital One", type: "personal",
        currency: "Capital One Miles", pv: 1.5,
        rates: { travel: 2, dining: 2, gas: 2, office: 2, internet: 2, advertising: 2, shipping: 2, groceries: 2, other: 2 },
        fee: 95, url: "https://capitalone.com/credit-cards/venture/",
        color: "#b91c1c", accentRgb: "185,28,28",
        highlight: "Flat 2x miles on everything — simple and flexible",
    },
];

// ─── Calculation ─────────────────────────────────────────────────────────────
function calcCard(card: Card, spend: Spend): { points: number; value: number; net: number } {
    let points = 0;
    if (card.amexBusinessGold) {
        const eligible = AMEX_ELIGIBLE.map(id => ({ id, amt: spend[id] })).sort((a, b) => b.amt - a.amt);
        const top2 = new Set(eligible.slice(0, 2).map(x => x.id));
        for (const cat of CATS) {
            const rate = top2.has(cat.id) ? 4 : 1;
            points += (spend[cat.id] || 0) * 12 * rate;
        }
    } else {
        for (const cat of CATS) {
            points += (spend[cat.id] || 0) * 12 * (card.rates[cat.id] || 1);
        }
    }
    const value = (points * card.pv) / 100;
    const net = value - card.fee;
    return { points, value, net };
}

function fmt$(n: number) { return "$" + Math.round(n).toLocaleString(); }
function fmtPts(n: number) { return Math.round(n).toLocaleString(); }

const FAQS = [
    { q: "How accurate is this calculator?", a: "The rewards values use conservative redemption estimates: Chase Ultimate Rewards and Amex Membership Rewards at 1.8¢ per point (transfer partner value), Capital One Miles at 1.5¢, and cash back at face value. Actual value varies based on how you redeem — transferring to airline partners typically unlocks the highest value." },
    { q: "Why is my current 1% card so much worse?", a: "A 1% flat card earns 1 cent per dollar spent. Premium travel cards earn 1.5–5x points worth 1.5–1.8¢ each, effectively giving you 2.7–9¢ per dollar in travel value on top categories. On $30,000/month of business spend, that gap can easily exceed $10,000 per year." },
    { q: "What are Chase Ultimate Rewards points worth?", a: "Chase UR points are worth 1¢ each as cash back, 1.25–1.5¢ via the Chase travel portal, and typically 1.5–2¢+ when transferred to airline partners like United, Southwest, British Airways, Air France, or hotel partners like Hyatt. This calculator uses a conservative 1.8¢ average for travel redemptions." },
    { q: "What makes Amex Business Gold special?", a: "The Amex Business Gold automatically gives 4x points on whichever two categories you spend the most in each month — from travel, dining, gas, advertising, shipping, and internet/phone. This means it self-optimises for your actual spending patterns without you having to think about it." },
    { q: "Should business owners get business or personal cards?", a: "Both, ideally. Business cards keep spending separate (important for accounting and taxes), often have higher limits, and have category bonuses optimised for business spend. Personal cards can complement them — for example, an Amex Gold for dining, paired with a Chase Ink for business categories." },
    { q: "What is the best credit card for a business spending $20,000+ per month?", a: "For high-spend businesses, the Chase Ink Business Preferred or Amex Business Gold are typically top picks. At $20K+/month, the category bonuses vastly outweigh annual fees. A combined Chase + Amex strategy — splitting spend across both issuers — often yields the highest total rewards." },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "Credit Card Rewards Optimiser",
            "description": "Enter your monthly spend by category and instantly see how much you're leaving on the table with your current card. Get a personalised recommendation for the best card for your spending profile.",
            "url": "https://toolstack.tech/tools/credit-card-rewards-optimizer",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "featureList": ["Annual rewards gap calculator", "Business and personal card comparison", "Amex Business Gold dynamic 4x optimisation", "10 top cards compared instantly", "Personalised card recommendation"],
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                { "@type": "ListItem", "position": 2, "name": "Finance", "item": "https://toolstack.tech/tools/category/finance" },
                { "@type": "ListItem", "position": 3, "name": "Credit Card Rewards Optimiser", "item": "https://toolstack.tech/tools/credit-card-rewards-optimizer" },
            ],
        },
        {
            "@type": "FAQPage",
            "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
    ],
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function CreditCardRewardsOptimizerPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [cardType, setCardType] = useState<"business" | "personal" | "both">("business");
    const [spend, setSpend] = useState<Spend>({ travel: 0, dining: 0, gas: 0, office: 0, internet: 0, advertising: 0, shipping: 0, groceries: 0, other: 0 });
    const [currentRate, setCurrentRate] = useState<number>(1);

    const totalMonthly = useMemo(() => Object.values(spend).reduce((a, b) => a + b, 0), [spend]);

    const results = useMemo(() => {
        if (totalMonthly === 0) return [];
        const filtered = CARDS.filter(c => cardType === "both" || c.type === cardType);
        return filtered
            .map(card => ({ card, ...calcCard(card, spend) }))
            .sort((a, b) => b.net - a.net);
    }, [spend, cardType, totalMonthly]);

    const currentAnnualValue = useMemo(() => (totalMonthly * 12 * currentRate) / 100, [totalMonthly, currentRate]);
    const gap = useMemo(() => results.length > 0 ? Math.max(0, results[0].net - currentAnnualValue) : 0, [results, currentAnnualValue]);

    const setSpendVal = (id: CatId, val: string) => {
        const n = parseFloat(val.replace(/,/g, "")) || 0;
        setSpend(prev => ({ ...prev, [id]: n }));
    };

    return (
        <div style={{ minHeight: "100vh", background: "#06060c" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <div style={{ background: `linear-gradient(135deg, rgba(${ACCENT_RGB},0.09) 0%, rgba(6,6,12,0) 60%)`, borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "56px 24px 40px" }}>
                <div style={{ maxWidth: 860, margin: "0 auto" }}>
                    <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                        <span>›</span>
                        <Link href="/tools/category/finance" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Finance</Link>
                        <span>›</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>Credit Card Rewards Optimiser</span>
                    </nav>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                        {[
                            { label: "10 Cards Compared", color: ACCENT },
                            { label: "Business & Personal", color: "#34d399" },
                            { label: "Annual Gap Calculator", color: "#818cf8" },
                            { label: "100% Free", color: "#22d3ee" },
                        ].map(b => (
                            <span key={b.label} style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, background: `${b.color}18`, border: `1px solid ${b.color}30`, color: b.color }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "white", margin: "0 0 12px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                        Credit Card Rewards Optimiser
                    </h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65, maxWidth: 560 }}>
                        Enter your monthly spend by category and see exactly how much you're leaving on the table — plus the best card to fix it.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>

                {/* Step indicators */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
                    {[1, 2, 3].map((s, i) => (
                        <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 13, fontWeight: 900,
                                background: step >= s ? ACCENT : "rgba(255,255,255,0.06)",
                                color: step >= s ? "#06060c" : "rgba(255,255,255,0.3)",
                                border: `2px solid ${step >= s ? ACCENT : "rgba(255,255,255,0.1)"}`,
                                flexShrink: 0, transition: "all 0.3s",
                            }}>{s}</div>
                            {i < 2 && <div style={{ flex: 1, height: 2, background: step > s ? ACCENT : "rgba(255,255,255,0.07)", margin: "0 8px", transition: "background 0.3s" }} />}
                        </div>
                    ))}
                    <div style={{ marginLeft: 12, fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                        {step === 1 ? "Card type" : step === 2 ? "Monthly spend" : "Current card"}
                    </div>
                </div>

                {/* Step 1 — Card type */}
                {step === 1 && (
                    <div style={{ padding: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 900, color: "white", margin: "0 0 8px" }}>Are you looking for a business or personal card?</h2>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>Business cards often have higher limits and bonuses optimised for business spend.</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                            {([
                                { id: "business", label: "Business card", sub: "I'm a business owner", icon: "🏢" },
                                { id: "personal", label: "Personal card", sub: "For personal spending", icon: "👤" },
                                { id: "both", label: "Show me both", sub: "Compare all options", icon: "🃏" },
                            ] as const).map(opt => (
                                <button key={opt.id} onClick={() => setCardType(opt.id)} style={{
                                    flex: "1 1 200px", padding: "20px 22px", borderRadius: 16, cursor: "pointer", textAlign: "left",
                                    background: cardType === opt.id ? `rgba(${ACCENT_RGB},0.1)` : "rgba(255,255,255,0.03)",
                                    border: `2px solid ${cardType === opt.id ? ACCENT : "rgba(255,255,255,0.08)"}`,
                                    transition: "all 0.2s",
                                }}>
                                    <div style={{ fontSize: 24, marginBottom: 8 }}>{opt.icon}</div>
                                    <div style={{ fontSize: 15, fontWeight: 800, color: "white", marginBottom: 4 }}>{opt.label}</div>
                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{opt.sub}</div>
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep(2)} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${ACCENT}, #fbbf24)`, color: "#06060c", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                            Next: Enter your spend →
                        </button>
                    </div>
                )}

                {/* Step 2 — Monthly spend */}
                {step === 2 && (
                    <div style={{ padding: 28, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 900, color: "white", margin: "0 0 8px" }}>How much do you spend per month?</h2>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>Enter approximate monthly amounts. Leave categories at $0 if not applicable.</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 12, marginBottom: 24 }}>
                            {CATS.map(cat => (
                                <div key={cat.id} style={{ padding: "14px 16px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <span style={{ fontSize: 16 }}>{cat.icon}</span>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{cat.label}</div>
                                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{cat.sub}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontWeight: 700 }}>$</span>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={spend[cat.id] || ""}
                                            onChange={e => setSpendVal(cat.id, e.target.value)}
                                            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: 16, fontWeight: 700, fontFamily: "inherit" }}
                                        />
                                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>/mo</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {totalMonthly > 0 && (
                            <div style={{ padding: "12px 16px", background: `rgba(${ACCENT_RGB},0.08)`, border: `1px solid rgba(${ACCENT_RGB},0.2)`, borderRadius: 12, marginBottom: 20 }}>
                                <span style={{ fontSize: 13, color: ACCENT, fontWeight: 700 }}>Total monthly spend: {fmt$(totalMonthly)}/mo · {fmt$(totalMonthly * 12)}/yr</span>
                            </div>
                        )}
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <button onClick={() => setStep(1)} style={{ padding: "14px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>← Back</button>
                            <button onClick={() => setStep(3)} disabled={totalMonthly === 0} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: totalMonthly === 0 ? `rgba(${ACCENT_RGB},0.3)` : `linear-gradient(135deg, ${ACCENT}, #fbbf24)`, color: totalMonthly === 0 ? "rgba(255,255,255,0.5)" : "#06060c", fontSize: 15, fontWeight: 800, cursor: totalMonthly === 0 ? "not-allowed" : "pointer" }}>
                                Next: Current card →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3 — Current card + Results */}
                {step === 3 && (
                    <div>
                        <div style={{ padding: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, marginBottom: 24 }}>
                            <h2 style={{ fontSize: 16, fontWeight: 900, color: "white", margin: "0 0 8px" }}>What does your current card earn?</h2>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "0 0 16px" }}>Select the approximate rewards rate on your current card.</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {[
                                    { label: "1% flat (basic bank card)", val: 1 },
                                    { label: "1.5% flat", val: 1.5 },
                                    { label: "2% flat", val: 2 },
                                    { label: "I don't earn rewards", val: 0 },
                                ].map(opt => (
                                    <button key={opt.val} onClick={() => setCurrentRate(opt.val)} style={{
                                        padding: "9px 18px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 700,
                                        background: currentRate === opt.val ? `rgba(${ACCENT_RGB},0.15)` : "rgba(255,255,255,0.04)",
                                        border: `1px solid ${currentRate === opt.val ? ACCENT : "rgba(255,255,255,0.1)"}`,
                                        color: currentRate === opt.val ? ACCENT : "rgba(255,255,255,0.5)",
                                    }}>{opt.label}</button>
                                ))}
                            </div>
                        </div>

                        {/* THE WOW MOMENT — gap reveal */}
                        {gap > 200 && (
                            <div style={{ padding: "28px 32px", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 20, marginBottom: 24, textAlign: "center" }}>
                                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>You're leaving on the table every year</p>
                                <p style={{ fontSize: "clamp(40px,8vw,72px)", fontWeight: 900, color: "#ef4444", margin: "0 0 8px", letterSpacing: "-0.04em", lineHeight: 1 }}>
                                    {fmt$(gap)}
                                </p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                                    Your current card earns {fmt$(currentAnnualValue)}/yr · Best alternative earns {fmt$(results[0]?.net)}/yr
                                </p>
                            </div>
                        )}
                        {gap <= 200 && gap >= 0 && results.length > 0 && (
                            <div style={{ padding: "20px 24px", background: `rgba(${ACCENT_RGB},0.07)`, border: `1px solid rgba(${ACCENT_RGB},0.2)`, borderRadius: 16, marginBottom: 24 }}>
                                <p style={{ fontSize: 14, fontWeight: 700, color: ACCENT, margin: 0 }}>
                                    Your current card is close to optimal for your spend profile. The best alternative adds {fmt$(gap)}/yr.
                                </p>
                            </div>
                        )}

                        {/* Results */}
                        <h2 style={{ fontSize: 18, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Best cards for your spend profile</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                            {results.slice(0, 5).map((r, i) => (
                                <div key={r.card.id} style={{
                                    padding: "20px 24px", borderRadius: 18,
                                    background: i === 0 ? `rgba(${r.card.accentRgb},0.08)` : "rgba(255,255,255,0.025)",
                                    border: `1px solid ${i === 0 ? `rgba(${r.card.accentRgb},0.3)` : "rgba(255,255,255,0.07)"}`,
                                    position: "relative",
                                }}>
                                    {i === 0 && (
                                        <div style={{ position: "absolute", top: -10, left: 20, fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 999, background: ACCENT, color: "#06060c" }}>
                                            BEST MATCH
                                        </div>
                                    )}
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                                        <div style={{ flex: 1, minWidth: 220 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 999, background: `rgba(${r.card.accentRgb},0.15)`, color: r.card.color }}>{r.card.issuer}</span>
                                                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 700 }}>{r.card.type === "business" ? "Business" : "Personal"} · {r.card.annualFee === 0 ? "No annual fee" : `$${r.card.fee}/yr`}</span>
                                            </div>
                                            <p style={{ fontSize: 16, fontWeight: 900, color: "white", margin: "0 0 4px" }}>{r.card.name}</p>
                                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 10px" }}>{r.card.highlight}</p>
                                            <a href={r.card.url} target="_blank" rel="noopener noreferrer sponsored" style={{ display: "inline-block", fontSize: 12, fontWeight: 800, padding: "7px 16px", borderRadius: 8, background: `rgba(${r.card.accentRgb},0.15)`, border: `1px solid rgba(${r.card.accentRgb},0.3)`, color: r.card.color, textDecoration: "none" }}>
                                                Apply now →
                                            </a>
                                        </div>
                                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                                            <p style={{ fontSize: 28, fontWeight: 900, color: i === 0 ? ACCENT : "white", margin: "0 0 2px", letterSpacing: "-0.03em" }}>{fmt$(r.net)}</p>
                                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: "0 0 4px" }}>annual value (after fee)</p>
                                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>{fmtPts(r.points)} {r.card.currency}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                            <button onClick={() => { setStep(1); setSpend({ travel: 0, dining: 0, gas: 0, office: 0, internet: 0, advertising: 0, shipping: 0, groceries: 0, other: 0 }); }} style={{ padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                                ← Start over
                            </button>
                            <button onClick={() => setStep(2)} style={{ padding: "12px 24px", borderRadius: 12, border: `1px solid rgba(${ACCENT_RGB},0.3)`, background: `rgba(${ACCENT_RGB},0.08)`, color: ACCENT, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                                Adjust spend
                            </button>
                        </div>
                    </div>
                )}

                {/* Info cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 56 }}>
                    {[
                        { icon: "💰", title: "The Gap Is Real", desc: "Business owners on a 1% card spending $30K/month typically leave $8,000–$12,000/year in rewards on the table versus a optimised card stack." },
                        { icon: "🔄", title: "Transfer Partners", desc: "Chase UR and Amex MR points are worth most when transferred to airline partners like United, Hyatt, or British Airways — not redeemed as cash." },
                        { icon: "🏢", title: "Business vs Personal", desc: "Business cards keep spending separate for tax purposes, often carry higher limits, and have bonuses designed for categories like shipping and advertising." },
                        { icon: "⚡", title: "Amex Gold Auto-Optimises", desc: "The Amex Business Gold automatically awards 4x on whichever two categories you spend most in each month — no tracking required." },
                    ].map(c => (
                        <div key={c.title} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14 }}>
                            <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{c.title}</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                        </div>
                    ))}
                </div>

                <FaqPageSchema faqs={FAQS} />

                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    {FAQS.map(({ q, a }) => (
                        <div key={q} style={{ marginBottom: 16, padding: "18px 20px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{q}</h3>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                        </div>
                    ))}
                </section>

                <MoreTools currentSlug="credit-card-rewards-optimizer" />
            </div>
        </div>
    );
}
