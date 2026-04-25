"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

interface AgeResult {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthdayDays: number;
    nextBirthdayDate: string;
    dayOfWeek: string;
    zodiac: string;
    zodiacSymbol: string;
    generation: string;
    generationRange: string;
    lifePercent: number;
    ageOnDate: string;
}

const DAYS_IN_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getZodiac(month: number, day: number): { sign: string; symbol: string } {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { sign: "Aries", symbol: "♈" };
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { sign: "Taurus", symbol: "♉" };
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { sign: "Gemini", symbol: "♊" };
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { sign: "Cancer", symbol: "♋" };
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { sign: "Leo", symbol: "♌" };
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { sign: "Virgo", symbol: "♍" };
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { sign: "Libra", symbol: "♎" };
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { sign: "Scorpio", symbol: "♏" };
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { sign: "Sagittarius", symbol: "♐" };
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { sign: "Capricorn", symbol: "♑" };
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { sign: "Aquarius", symbol: "♒" };
    return { sign: "Pisces", symbol: "♓" };
}

function getGeneration(year: number): { name: string; range: string } {
    if (year >= 2013) return { name: "Generation Alpha", range: "2013–present" };
    if (year >= 1997) return { name: "Generation Z", range: "1997–2012" };
    if (year >= 1981) return { name: "Millennial", range: "1981–1996" };
    if (year >= 1965) return { name: "Generation X", range: "1965–1980" };
    if (year >= 1946) return { name: "Baby Boomer", range: "1946–1964" };
    if (year >= 1928) return { name: "Silent Generation", range: "1928–1945" };
    return { name: "Greatest Generation", range: "before 1928" };
}

function formatNumber(n: number): string {
    return n.toLocaleString();
}

function calculateAge(dob: string, asOf: string): AgeResult | null {
    if (!dob || !asOf) return null;
    const birth = new Date(dob);
    const target = new Date(asOf);
    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    if (birth > target) return null;

    // Years, months, days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Total values
    const msPerDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / msPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
        nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const nextBirthdayDays = Math.ceil((nextBirthday.getTime() - target.getTime()) / msPerDay);
    const nextBirthdayDate = `${DAYS_IN_WEEK[nextBirthday.getDay()]}, ${MONTHS[nextBirthday.getMonth()]} ${nextBirthday.getDate()}, ${nextBirthday.getFullYear()}`;

    // Day of week born
    const dayOfWeek = DAYS_IN_WEEK[birth.getDay()];

    // Zodiac
    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

    // Generation
    const gen = getGeneration(birth.getFullYear());

    // Life % (80-year assumption)
    const lifePercent = Math.min(100, Math.round((years / 80) * 100));

    // Age on target date formatted
    const ageOnDate = `${years} year${years !== 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`;

    return {
        years, months, days,
        totalDays, totalWeeks, totalHours, totalMinutes,
        nextBirthdayDays, nextBirthdayDate,
        dayOfWeek,
        zodiac: zodiac.sign, zodiacSymbol: zodiac.symbol,
        generation: gen.name, generationRange: gen.range,
        lifePercent,
        ageOnDate,
    };
}

function StatCard({ label, value, sub, color, index }: { label: string; value: string; sub?: string; color: string; index: number }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), index * 80);
        return () => clearTimeout(t);
    }, [index]);

    return (
        <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            padding: "20px 22px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            display: "flex", flexDirection: "column", gap: 4,
        }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</span>
            <span style={{ fontSize: 26, fontWeight: 900, color, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{value}</span>
            {sub && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{sub}</span>}
        </div>
    );
}

const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export default function AgeCalculator() {
    const [dob, setDob] = useState("");
    const [asOf, setAsOf] = useState(todayStr());
    const [result, setResult] = useState<AgeResult | null>(null);
    const [error, setError] = useState("");

    const calculate = useCallback(() => {
        if (!dob) { setError("Please enter a date of birth."); return; }
        setError("");
        const r = calculateAge(dob, asOf);
        if (!r) {
            setError("The date of birth must be before the target date.");
            setResult(null);
        } else {
            setResult(r);
        }
    }, [dob, asOf]);

    useEffect(() => {
        if (dob) calculate();
    }, [dob, asOf, calculate]);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebApplication",
                "name": "Age Calculator",
                "description": "Calculate your exact age in years, months, days, hours and minutes. Find days until your next birthday, zodiac sign, generation, and life percentage. Free, instant, no signup.",
                "url": "https://toolstack.tech/tools/age-calculator",
                "applicationCategory": "UtilityApplication",
                "operatingSystem": "Web",
                "browserRequirements": "Requires JavaScript",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "featureList": [
                    "Exact age in years, months, and days",
                    "Total age in days, weeks, hours and minutes",
                    "Days until next birthday",
                    "Day of the week you were born",
                    "Zodiac sign calculation",
                    "Generation label (Gen Z, Millennial, etc.)",
                    "Life percentage progress",
                    "Calculate age on any past or future date",
                    "Runs entirely in your browser — 100% private",
                ],
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "Utility", "item": "https://toolstack.tech/tools?category=utility" },
                    { "@type": "ListItem", "position": 3, "name": "Age Calculator", "item": "https://toolstack.tech/tools/age-calculator" },
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How do I calculate my exact age?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Enter your date of birth in the Date of Birth field. The calculator instantly shows your exact age in years, months, and days, along with your total age in days, weeks, hours, and minutes. The calculation accounts for leap years and varying month lengths automatically." },
                    },
                    {
                        "@type": "Question",
                        "name": "What is the best free age calculator?",
                        "acceptedAnswer": { "@type": "Answer", "text": "ToolStack's Age Calculator is one of the most feature-rich free options available. Unlike basic age calculators on sites like calculatorsoup.com or timeanddate.com, it shows your exact age breakdown, total days and hours lived, days until your next birthday, zodiac sign, generation label, and a life percentage — all in a clean, ad-free interface with no signup required." },
                    },
                    {
                        "@type": "Question",
                        "name": "How many days until my next birthday?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Enter your date of birth and the calculator automatically calculates how many days remain until your next birthday, including the exact date and day of the week. The count updates each day you use it." },
                    },
                    {
                        "@type": "Question",
                        "name": "Can I calculate my age on a past or future date?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Calculate As Of field defaults to today but you can change it to any past or future date. This lets you calculate how old you were on a specific date in history, or how old you will be on a future date like a retirement date or anniversary." },
                    },
                    {
                        "@type": "Question",
                        "name": "What generation am I?",
                        "acceptedAnswer": { "@type": "Answer", "text": "The generation is determined by your birth year: Greatest Generation (before 1928), Silent Generation (1928–1945), Baby Boomer (1946–1964), Generation X (1965–1980), Millennial (1981–1996), Generation Z (1997–2012), Generation Alpha (2013–present)." },
                    },
                    {
                        "@type": "Question",
                        "name": "How is my zodiac sign calculated?",
                        "acceptedAnswer": { "@type": "Answer", "text": "Your zodiac sign is determined by your birth month and day, based on the Western tropical zodiac system. For example, born March 21 to April 19 is Aries, April 20 to May 20 is Taurus, and so on. The exact cutoff dates used follow the standard Western astrological calendar." },
                    },
                    {
                        "@type": "Question",
                        "name": "Is my date of birth stored or sent anywhere?",
                        "acceptedAnswer": { "@type": "Answer", "text": "No. The Age Calculator runs entirely in your browser. Your date of birth is never sent to any server, stored in a database, or shared with any third party. All calculations happen locally on your device." },
                    },
                ],
            },
        ],
    };

    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Background glows */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-10%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "72px 20px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>ToolStack</Link>
                    <span>›</span>
                    <Link href="/tools?category=utility" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Utility</Link>
                    <span>›</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>Age Calculator</span>
                </nav>

                {/* Hero */}
                <div style={{ marginBottom: 40 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {[
                            { label: "Instant Results", color: "#22d3ee" },
                            { label: "100% Private", color: "#34d399" },
                            { label: "No Signup", color: "#818cf8" },
                            { label: "Client-Side", color: "#fbbf24" },
                        ].map(b => (
                            <span key={b.label} style={{
                                fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999,
                                background: `rgba(${b.color === "#22d3ee" ? "34,211,238" : b.color === "#34d399" ? "52,211,153" : b.color === "#818cf8" ? "129,140,248" : "251,191,36"},0.1)`,
                                border: `1px solid ${b.color}30`,
                                color: b.color,
                            }}>{b.label}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                        Age{" "}
                        <span style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Calculator
                        </span>
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 560, lineHeight: 1.65, margin: 0 }}>
                        Find your exact age in years, months, days, hours, and minutes. Plus your zodiac sign, generation, days to your next birthday, and more.
                    </p>
                </div>

                {/* Input card */}
                <div style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 24,
                    padding: "32px",
                    marginBottom: 28,
                }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                        {/* DOB */}
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                value={dob}
                                onChange={e => setDob(e.target.value)}
                                max={todayStr()}
                                style={{
                                    width: "100%", padding: "13px 16px", borderRadius: 12,
                                    background: "rgba(255,255,255,0.05)",
                                    border: dob ? "1px solid rgba(34,211,238,0.35)" : "1px solid rgba(255,255,255,0.12)",
                                    color: "white", fontSize: 15, fontFamily: "inherit", outline: "none",
                                    boxSizing: "border-box", cursor: "pointer",
                                    colorScheme: "dark",
                                    transition: "border-color 0.2s",
                                }}
                            />
                        </div>

                        {/* As of date */}
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                                Calculate As Of
                            </label>
                            <input
                                type="date"
                                value={asOf}
                                onChange={e => setAsOf(e.target.value)}
                                style={{
                                    width: "100%", padding: "13px 16px", borderRadius: 12,
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "white", fontSize: 15, fontFamily: "inherit", outline: "none",
                                    boxSizing: "border-box", cursor: "pointer",
                                    colorScheme: "dark",
                                    transition: "border-color 0.2s",
                                }}
                                onFocus={e => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)"; }}
                                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
                            />
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "6px 0 0" }}>Defaults to today. Change to calculate age on any date.</p>
                        </div>
                    </div>

                    {error && (
                        <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", fontSize: 13, fontWeight: 600 }}>
                            {error}
                        </div>
                    )}
                </div>

                {/* Results */}
                {result && (
                    <>
                        {/* Primary age display */}
                        <div style={{
                            background: "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(99,102,241,0.06) 100%)",
                            border: "1px solid rgba(34,211,238,0.2)",
                            borderRadius: 24,
                            padding: "32px",
                            marginBottom: 20,
                            textAlign: "center",
                            position: "relative",
                            overflow: "hidden",
                        }}>
                            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(30px)" }} />
                            <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}>Your Exact Age</p>
                            <p style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, color: "white", margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1 }}>
                                <span style={{ color: "#22d3ee" }}>{result.years}</span>
                                <span style={{ fontSize: "0.4em", color: "rgba(255,255,255,0.5)", fontWeight: 600, margin: "0 6px" }}>years</span>
                                <span style={{ color: "#818cf8" }}>{result.months}</span>
                                <span style={{ fontSize: "0.4em", color: "rgba(255,255,255,0.5)", fontWeight: 600, margin: "0 6px" }}>months</span>
                                <span style={{ color: "white" }}>{result.days}</span>
                                <span style={{ fontSize: "0.4em", color: "rgba(255,255,255,0.5)", fontWeight: 600, margin: "0 6px" }}>days</span>
                            </p>
                        </div>

                        {/* Stats grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
                            <StatCard label="Total Days" value={formatNumber(result.totalDays)} sub="days lived" color="#22d3ee" index={0} />
                            <StatCard label="Total Weeks" value={formatNumber(result.totalWeeks)} sub="weeks lived" color="#818cf8" index={1} />
                            <StatCard label="Total Hours" value={formatNumber(result.totalHours)} sub="hours lived" color="#a78bfa" index={2} />
                            <StatCard label="Total Minutes" value={formatNumber(result.totalMinutes)} sub="minutes lived" color="#c084fc" index={3} />
                        </div>

                        {/* Next birthday + extras */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 20 }}>
                            {/* Next birthday */}
                            <div style={{
                                padding: "20px 22px",
                                background: "rgba(251,191,36,0.06)",
                                border: "1px solid rgba(251,191,36,0.2)",
                                borderRadius: 16,
                            }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Next Birthday</span>
                                <p style={{ fontSize: 28, fontWeight: 900, color: "#fbbf24", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                                    {result.nextBirthdayDays === 0 ? "🎂 Today!" : `${result.nextBirthdayDays} days`}
                                </p>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{result.nextBirthdayDate}</p>
                            </div>

                            {/* Day born */}
                            <div style={{
                                padding: "20px 22px",
                                background: "rgba(52,211,153,0.06)",
                                border: "1px solid rgba(52,211,153,0.2)",
                                borderRadius: 16,
                            }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Born On A</span>
                                <p style={{ fontSize: 28, fontWeight: 900, color: "#34d399", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{result.dayOfWeek}</p>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>Day of the week</p>
                            </div>

                            {/* Zodiac */}
                            <div style={{
                                padding: "20px 22px",
                                background: "rgba(232,121,249,0.06)",
                                border: "1px solid rgba(232,121,249,0.2)",
                                borderRadius: 16,
                            }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Zodiac Sign</span>
                                <p style={{ fontSize: 24, fontWeight: 900, color: "#e879f9", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                                    {result.zodiacSymbol} {result.zodiac}
                                </p>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>Western tropical zodiac</p>
                            </div>

                            {/* Generation */}
                            <div style={{
                                padding: "20px 22px",
                                background: "rgba(96,165,250,0.06)",
                                border: "1px solid rgba(96,165,250,0.2)",
                                borderRadius: 16,
                            }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Generation</span>
                                <p style={{ fontSize: 18, fontWeight: 900, color: "#60a5fa", margin: "0 0 4px", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{result.generation}</p>
                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{result.generationRange}</p>
                            </div>
                        </div>

                        {/* Life progress */}
                        <div style={{
                            padding: "24px",
                            background: "rgba(255,255,255,0.025)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 16,
                            marginBottom: 32,
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.55)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Life Progress</p>
                                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "3px 0 0" }}>Based on 80-year life expectancy</p>
                                </div>
                                <span style={{ fontSize: 24, fontWeight: 900, color: "#22d3ee" }}>{result.lifePercent}%</span>
                            </div>
                            <div style={{ height: 10, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                                <div style={{
                                    height: "100%",
                                    width: `${result.lifePercent}%`,
                                    background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                                    borderRadius: 999,
                                    transition: "width 0.8s ease",
                                }} />
                            </div>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: "10px 0 0" }}>
                                {80 - result.years > 0 ? `~${80 - result.years} years remaining based on average life expectancy` : `${result.years} years young — well past the average!`}
                            </p>
                        </div>
                    </>
                )}

                {/* Empty state */}
                {!result && !error && (
                    <div style={{
                        padding: "48px 24px", textAlign: "center",
                        background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 20, marginBottom: 32,
                    }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 18, margin: "0 auto 20px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)",
                        }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>Enter your date of birth to get started</p>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Your results appear instantly as you type</p>
                    </div>
                )}

                {/* How it works */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>What You Get</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                        {[
                            { title: "Exact age breakdown", desc: "Years, months, and days calculated precisely — accounts for leap years and varying month lengths.", icon: "📅" },
                            { title: "Total time lived", desc: "Your age expressed as total days, weeks, hours, and minutes. More than you might expect.", icon: "⏱" },
                            { title: "Birthday countdown", desc: "Exact days until your next birthday, with the date and day of the week it falls on.", icon: "🎂" },
                            { title: "Zodiac & generation", desc: "Your Western zodiac sign and which named generation you belong to, with year ranges.", icon: "✦" },
                        ].map(item => (
                            <div key={item.title} style={{
                                padding: "22px", borderRadius: 16,
                                background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
                            }}>
                                <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SEO content */}
                <section style={{ marginBottom: 48, padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>How Age is Calculated</h2>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                        <p style={{ margin: "0 0 16px" }}>
                            Calculating an exact age sounds simple, but most tools get it slightly wrong. The correct method counts <strong style={{ color: "rgba(255,255,255,0.8)" }}>complete calendar years</strong>, then the remaining complete months, then the remaining days — accounting for the fact that months have different lengths (28–31 days) and that leap years add an extra day in February.
                        </p>
                        <p style={{ margin: "0 0 16px" }}>
                            The <strong style={{ color: "rgba(255,255,255,0.8)" }}>"Calculate As Of" field</strong> lets you calculate your age on any date — not just today. This is useful for legal purposes (how old were you on a specific date?), historical curiosity, or planning ahead (how old will I be when I retire?). Simply change the date and the calculation updates instantly.
                        </p>
                        <p style={{ margin: 0 }}>
                            All calculations run entirely in your browser. Your date of birth is never sent to a server, stored, or shared. The tool works offline once the page is loaded.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section style={{ marginBottom: 56 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[
                            {
                                q: "How do I calculate my exact age?",
                                a: "Enter your date of birth in the Date of Birth field. The calculator instantly shows your exact age in years, months, and days, accounting for leap years and varying month lengths automatically.",
                            },
                            {
                                q: "What is the best free age calculator?",
                                a: "ToolStack's Age Calculator is one of the most feature-rich free options. It shows exact age breakdown, total days and hours lived, days until your next birthday, zodiac sign, generation label, and a life percentage — all in a clean, ad-free interface with no signup required.",
                            },
                            {
                                q: "How many days until my next birthday?",
                                a: "Enter your date of birth and the calculator automatically shows how many days remain until your next birthday, including the exact date and day of the week.",
                            },
                            {
                                q: "Can I calculate my age on a past or future date?",
                                a: "Yes. The 'Calculate As Of' field defaults to today but can be changed to any date. This lets you find how old you were on a specific historical date, or how old you will be on a future date.",
                            },
                            {
                                q: "What generation am I?",
                                a: "Generations: Greatest Generation (before 1928), Silent Generation (1928–1945), Baby Boomer (1946–1964), Generation X (1965–1980), Millennial (1981–1996), Generation Z (1997–2012), Generation Alpha (2013–present).",
                            },
                            {
                                q: "How is my zodiac sign determined?",
                                a: "Your zodiac sign is based on your birth month and day using the Western tropical zodiac system. For example, March 21–April 19 is Aries, April 20–May 20 is Taurus, and so on.",
                            },
                            {
                                q: "Is my date of birth stored or sent anywhere?",
                                a: "No. This calculator runs entirely in your browser. Your date of birth is never sent to any server, stored in a database, or shared with any third party.",
                            },
                        ].map(({ q, a }) => (
                            <div key={q} style={{ padding: "20px 24px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.4 }}>{q}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>{a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <MoreTools currentSlug="age-calculator" />
                
            </div>
        </div>
    );
}
