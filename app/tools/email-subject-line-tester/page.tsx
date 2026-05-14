"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";
import { HowToSchema } from "@/components/ui/HowToSchema";

const VIDEO_ID = "iVmk92yIzHw";

const FAQS = [
  { q: "What is a good email subject line score?", a: "A score of 80+ (grade A) is excellent. 65\u201379 (grade B) is good. Aim for at least 65." },
  { q: "What are email spam trigger words?", a: "Spam triggers are phrases flagged by filters, including " },
  { q: "What is the ideal email subject line length?", a: "40\u201360 characters. This ensures full display in Gmail desktop and mobile without clipping." },
  { q: "How do I use A/B compare mode?", a: "Click the A/B Compare button, enter two subject lines, and get instant side-by-side scores with a winner badge." },
  { q: "What are email power words?", a: "Power words trigger emotional responses \u2014 urgency (now, expires), curiosity (secret, revealed), FOMO (exclusive, rare), value (save, results) and personalisation (you, your)." },
  { q: "How do I improve my email open rate?", a: "Use 40\u201360 characters, include power words, remove spam triggers, add a number for specificity, keep punctuation to one mark, limit emojis to one." }
];


type PowerCategory = "urgency" | "curiosity" | "fomo" | "value" | "personalization";
interface PowerWord { word: string; category: PowerCategory; }
interface ScorePart { score: number; max: number; label: string; }
interface Breakdown {
    length: ScorePart;
    spam: ScorePart & { words: string[] };
    power: ScorePart & { words: PowerWord[] };
    caps: ScorePart;
    punctuation: ScorePart;
    emoji: ScorePart & { count: number };
    engagement: ScorePart & { hasNumber: boolean; isQuestion: boolean; wordCount: number };
}
interface Alternative { text: string; angle: string; angleDesc: string; }
interface QuickWin { tip: string; impact: string; icon: string; priority: number; }

const SPAM_WORDS = [
    "free offer","act now","guaranteed","click here","buy now","earn money","make money",
    "winner","congratulations","prize","limited time","last chance","exclusive deal",
    "special offer","no cost","risk free","order now","save big","incredible deal",
    "amazing deal","miracle","money back","once in a lifetime","open this","pure profit",
    "satisfaction guaranteed","you've been selected","you're a winner","free access",
    "free gift","free money","free trial","great offer","while supplies last",
    "double your","lowest price","unsecured",
];

const POWER_WORDS: Record<PowerCategory, string[]> = {
    urgency: ["now","today","tonight","deadline","expires","ending","hurry","limited",
        "final","quickly","fast","instant","immediately","soon","before","running out","last minute"],
    curiosity: ["secret","revealed","discover","truth","surprising","weird","inside",
        "never","actually","really","hidden","untold","little-known","shocking","leaked"],
    fomo: ["exclusive","members only","private","invitation","only","rare","special",
        "vip","limited edition","before it's gone","missing out","miss out","don't miss"],
    value: ["save","deal","offer","discount","gift","reward","benefit","results","growth",
        "improve","boost","better","best","proven","ultimate","expert","complete"],
    personalization: ["you","your","personally","tailored","custom","for you","your name","just for you"],
};

const CAT_COLOR: Record<PowerCategory, string> = {
    urgency: "#f59e0b", curiosity: "#8b5cf6", fomo: "#f43f5e",
    value: "#10b981", personalization: "#0ea5e9",
};
const CAT_BG: Record<PowerCategory, string> = {
    urgency: "rgba(245,158,11,0.18)", curiosity: "rgba(139,92,246,0.18)",
    fomo: "rgba(244,63,94,0.18)", value: "rgba(16,185,129,0.18)", personalization: "rgba(14,165,233,0.18)",
};
const CAT_LABEL: Record<PowerCategory, string> = {
    urgency: "Urgency", curiosity: "Curiosity", fomo: "FOMO", value: "Value", personalization: "Personalization",
};

const ANGLE_COLORS: Record<string, string> = {
    "Urgency": "#f59e0b", "Curiosity": "#8b5cf6", "Value-led": "#10b981",
    "Personalised": "#0ea5e9", "FOMO": "#f43f5e",
};

const EMAIL_CLIENTS = [
    { name: "Gmail", platform: "Desktop", subjectChars: 70, icon: "G", color: "#ea4335", bg: "rgba(234,67,53,0.08)" },
    { name: "Gmail", platform: "Mobile", subjectChars: 40, icon: "G", color: "#ea4335", bg: "rgba(234,67,53,0.08)" },
    { name: "Apple Mail", platform: "Desktop", subjectChars: 80, icon: "✉", color: "#3b82f6", bg: "rgba(59,130,246,0.08)" },
    { name: "Outlook", platform: "Desktop", subjectChars: 75, icon: "O", color: "#0078d4", bg: "rgba(0,120,212,0.08)" },
];

const TEMPLATES = [
    { label: "Urgency", icon: "⏰", text: "Only [X] hours left: [your offer here]", color: "#f59e0b" },
    { label: "Curiosity", icon: "🤔", text: "The surprising truth about [topic]", color: "#8b5cf6" },
    { label: "Numbers", icon: "🔢", text: "[N] ways to [achieve result] this week", color: "#6ee7b7" },
    { label: "Question", icon: "❓", text: "Are you making this [costly] mistake?", color: "#a78bfa" },
    { label: "FOMO", icon: "🚪", text: "Last chance: [offer] closes at midnight", color: "#f43f5e" },
    { label: "Value", icon: "💎", text: "How to [get result] without [pain point]", color: "#10b981" },
    { label: "Story", icon: "📖", text: "I [did X] — here's what happened", color: "#fbbf24" },
    { label: "Personal", icon: "👤", text: "Your [weekly] [topic] is ready", color: "#0ea5e9" },
];

function countEmojis(text: string): number {
    return [...text.matchAll(/\p{Extended_Pictographic}/gu)].length;
}

function analyse(subject: string): { score: number; breakdown: Breakdown } {
    const lower = subject.toLowerCase();
    const len = subject.length;
    const words = subject.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    let lengthScore = 0, lengthLabel = "";
    if (len >= 40 && len <= 60) { lengthScore = 20; lengthLabel = "Ideal length (40–60 chars)"; }
    else if (len >= 30 && len <= 70) { lengthScore = 13; lengthLabel = `${len} chars — close to ideal`; }
    else if (len >= 20 && len <= 80) { lengthScore = 7; lengthLabel = `${len} chars — outside ideal range`; }
    else { lengthScore = 0; lengthLabel = `${len} chars — too ${len < 20 ? "short" : "long"}`; }

    const foundSpam = SPAM_WORDS.filter(w => lower.includes(w));
    const spamScore = Math.max(0, 25 - foundSpam.length * 9);
    const spamLabel = foundSpam.length === 0 ? "No spam triggers detected" : `${foundSpam.length} spam trigger${foundSpam.length > 1 ? "s" : ""} found`;

    const foundPower: PowerWord[] = [];
    for (const [cat, wds] of Object.entries(POWER_WORDS) as [PowerCategory, string[]][]) {
        for (const w of wds) {
            if (lower.includes(w) && !foundPower.some(p => p.word === w)) foundPower.push({ word: w, category: cat });
        }
    }
    const powerScore = Math.min(15, foundPower.length * 5);
    const powerLabel = foundPower.length === 0 ? "No power words — try urgency or curiosity language" : `${foundPower.length} power word${foundPower.length > 1 ? "s" : ""} found`;

    const capsWords = subject.split(/\s+/).filter(w => w.length > 1 && w === w.toUpperCase() && /[A-Z]/.test(w));
    const capsScore = capsWords.length > 0 ? 0 : 10;
    const capsLabel = capsWords.length > 0 ? `ALL CAPS detected: ${capsWords.slice(0, 2).join(", ")}` : "No ALL CAPS — clean capitalisation";

    const totalPunct = (subject.match(/[!?]/g) || []).length;
    let punctScore = 0, punctLabel = "";
    if (totalPunct === 0) { punctScore = 10; punctLabel = "No excessive punctuation"; }
    else if (totalPunct === 1) { punctScore = 8; punctLabel = "1 ! or ? — acceptable"; }
    else if (totalPunct === 2) { punctScore = 4; punctLabel = "2 ! or ? — borderline"; }
    else { punctScore = 0; punctLabel = `${totalPunct} ! or ? — too many`; }

    const emojiCount = countEmojis(subject);
    let emojiScore = 0, emojiLabel = "";
    if (emojiCount <= 1) { emojiScore = 10; emojiLabel = emojiCount === 0 ? "No emojis — professional" : "1 emoji — perfect"; }
    else if (emojiCount === 2) { emojiScore = 5; emojiLabel = "2 emojis — trim to 1"; }
    else { emojiScore = 0; emojiLabel = `${emojiCount} emojis — too many`; }

    const hasNumber = /\d/.test(subject);
    const isQuestion = subject.trim().endsWith("?");
    let engScore = 0;
    if (wordCount >= 6 && wordCount <= 10) engScore += 5;
    else if (wordCount >= 4 && wordCount <= 12) engScore += 3;
    if (hasNumber) engScore += 3;
    if (isQuestion) engScore += 2;
    const engParts = [];
    if (wordCount >= 6 && wordCount <= 10) engParts.push(`${wordCount} words ✓`);
    else engParts.push(`${wordCount} words (aim for 6–10)`);
    if (hasNumber) engParts.push("number ✓");
    if (isQuestion) engParts.push("question ✓");
    const engLabel = engParts.join(" · ");

    return {
        score: Math.min(lengthScore + spamScore + powerScore + capsScore + punctScore + emojiScore + engScore, 100),
        breakdown: {
            length: { score: lengthScore, max: 20, label: lengthLabel },
            spam: { score: spamScore, max: 25, label: spamLabel, words: foundSpam },
            power: { score: powerScore, max: 15, label: powerLabel, words: foundPower },
            caps: { score: capsScore, max: 10, label: capsLabel },
            punctuation: { score: punctScore, max: 10, label: punctLabel },
            emoji: { score: emojiScore, max: 10, label: emojiLabel, count: emojiCount },
            engagement: { score: engScore, max: 10, label: engLabel, hasNumber, isQuestion, wordCount },
        },
    };
}

function gradeFromScore(s: number) {
    if (s >= 90) return { grade: "A+", color: "#34d399", ring: "#34d399", label: "Excellent", sub: "High open rate potential" };
    if (s >= 80) return { grade: "A", color: "#6ee7b7", ring: "#6ee7b7", label: "Great", sub: "Strong subject line" };
    if (s >= 65) return { grade: "B", color: "#fbbf24", ring: "#fbbf24", label: "Good", sub: "Small improvements available" };
    if (s >= 50) return { grade: "C", color: "#fb923c", ring: "#fb923c", label: "Average", sub: "Needs work before sending" };
    if (s >= 35) return { grade: "D", color: "#f87171", ring: "#f87171", label: "Poor", sub: "Likely to underperform" };
    return { grade: "F", color: "#ef4444", ring: "#ef4444", label: "Failing", sub: "Major issues to fix" };
}

function getQuickWins(subject: string, bd: Breakdown): QuickWin[] {
    const wins: QuickWin[] = [];
    const len = subject.length;
    if (bd.spam.words.length > 0) wins.push({ tip: `Remove spam trigger "${bd.spam.words[0]}" — it will get filtered before reaching the inbox`, impact: `+${Math.min(25, 9 * bd.spam.words.length)} pts`, icon: "🚫", priority: 10 });
    if (bd.caps.score === 0) wins.push({ tip: "Remove ALL CAPS words — they flag every major spam filter and reduce trust", impact: "+10 pts", icon: "Aa", priority: 9 });
    if (len < 40 && len > 0) wins.push({ tip: `Add ${40 - len} more characters to hit the 40-char sweet spot`, impact: `+${20 - bd.length.score} pts`, icon: "↔", priority: 8 });
    else if (len > 60) wins.push({ tip: `Trim ${len - 60} characters — Gmail Mobile clips at 40, most clients at 60–70`, impact: `+${20 - bd.length.score} pts`, icon: "↔", priority: 7 });
    if (bd.power.words.length === 0) wins.push({ tip: `Add a power word — try "exclusive", "revealed", "tonight" or "secret"`, impact: "+5–15 pts", icon: "⚡", priority: 6 });
    if (bd.punctuation.score < 8) wins.push({ tip: "Reduce to 1 punctuation mark max — multiple looks desperate", impact: `+${10 - bd.punctuation.score} pts`, icon: "!?", priority: 5 });
    if (bd.emoji.count > 1) wins.push({ tip: `Remove ${bd.emoji.count - 1} emoji — keep 1 max for credibility`, impact: `+${10 - bd.emoji.score} pts`, icon: "😊", priority: 4 });
    if (!bd.engagement.hasNumber && bd.engagement.wordCount > 0) wins.push({ tip: `Add a number (e.g. "3 reasons", "48 hours") — specificity drives clicks`, impact: "Higher CTR", icon: "🔢", priority: 3 });
    return wins.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

function HighlightedSubject({ subject, breakdown }: { subject: string; breakdown: Breakdown }) {
    if (!subject) return <span style={{ color: "rgba(255,255,255,0.18)", fontStyle: "italic" }}>Your subject line will appear highlighted here...</span>;
    const lower = subject.toLowerCase();
    const ranges: { start: number; end: number; color: string; bg: string }[] = [];
    for (const word of breakdown.spam.words) {
        let idx = lower.indexOf(word);
        while (idx !== -1) { ranges.push({ start: idx, end: idx + word.length, color: "#f87171", bg: "rgba(248,113,113,0.2)" }); idx = lower.indexOf(word, idx + 1); }
    }
    for (const pw of breakdown.power.words) {
        let idx = lower.indexOf(pw.word);
        while (idx !== -1) {
            if (!ranges.some(r => r.start <= idx && r.end >= idx + pw.word.length))
                ranges.push({ start: idx, end: idx + pw.word.length, color: CAT_COLOR[pw.category], bg: CAT_BG[pw.category] });
            idx = lower.indexOf(pw.word, idx + 1);
        }
    }
    ranges.sort((a, b) => a.start - b.start);
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    for (const r of ranges) {
        if (r.start > cursor) parts.push(<span key={cursor}>{subject.slice(cursor, r.start)}</span>);
        parts.push(<mark key={r.start} style={{ color: r.color, background: r.bg, borderRadius: 4, padding: "1px 3px", fontWeight: 700, fontStyle: "normal" }}>{subject.slice(r.start, r.end)}</mark>);
        cursor = r.end;
    }
    if (cursor < subject.length) parts.push(<span key={cursor}>{subject.slice(cursor)}</span>);
    return <>{parts}</>;
}

export default function EmailSubjectLineTesterPage() {
    const [compareMode, setCompareMode] = useState(false);
    const [subject, setSubject] = useState("");
    const [subjectB, setSubjectB] = useState("");
    const [preheader, setPreheader] = useState("");
    const [loading, setLoading] = useState(false);
    const [alternatives, setAlternatives] = useState<Alternative[]>([]);
    const [error, setError] = useState("");
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    const aA = subject.trim().length >= 2 ? analyse(subject) : null;
    const aB = subjectB.trim().length >= 2 ? analyse(subjectB) : null;
    const gA = aA ? gradeFromScore(aA.score) : null;
    const gB = aB ? gradeFromScore(aB.score) : null;
    const winB = !!(aA && aB && aB.score > aA.score);
    const winA = !!(aA && aB && aA.score >= aB.score);
    const quickWins = aA ? getQuickWins(subject, aA.breakdown) : [];

    const getAlts = useCallback(async () => {
        if (!subject.trim() || subject.trim().length < 3) return;
        setLoading(true); setError("");
        try {
            const res = await fetch("/api/email-subject-line-tester", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, score: aA?.score ?? 0, spamWords: aA?.breakdown?.spam?.words ?? [], powerWords: aA?.breakdown?.power?.words ?? [], breakdown: aA?.breakdown ? { length: { score: aA.breakdown.length.score }, power: { score: aA.breakdown.power.score }, caps: { score: aA.breakdown.caps.score }, punctuation: { score: aA.breakdown.punctuation.score }, emoji: { score: aA.breakdown.emoji.score } } : {} }),
            });
            const data = await res.json();
            if (data.error) setError(data.error);
            else setAlternatives(data.alternatives ?? []);
        } catch { setError("Failed to generate alternatives. Please try again."); }
        finally { setLoading(false); }
    }, [subject, aA]);

    const copyText = async (text: string, idx: number) => {
        await navigator.clipboard.writeText(text);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    const charCol = (len: number) => len >= 40 && len <= 60 ? "#34d399" : len > 0 ? "#fbbf24" : "rgba(255,255,255,0.2)";

    return (
        <div style={{ minHeight: "100vh", background: "#08080e", color: "white", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Email Subject Line Tester",
                "url": "https://toolstack.tech/tools/email-subject-line-tester",
                "description": "Free email subject line tester. Score your subject lines for open rate potential, spam triggers, and length. Get AI-suggested alternatives. No signup.",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "featureList": [
                  "Real-time inbox authority scoring",
                  "A/B comparison logic",
                  "Advanced spam trigger analysis",
                  "Multi-platform inbox pre-visualization",
                  "AI-powered conversion alternatives",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
                  { "@type": "ListItem", "position": 2, "name": "Marketing", "item": "https://toolstack.tech/tools/category/marketing" },
                  { "@type": "ListItem", "position": 3, "name": "Email Subject Line Tester", "item": "https://toolstack.tech/tools/email-subject-line-tester" },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Email Subject Line Tester — Free Tool That Scores Your Subject Lines",
                "description": "Score your email subject lines for open rate potential, spam triggers, power words, length and more with this free tool. No signup required.",
                "thumbnailUrl": `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
                "embedUrl": `https://www.youtube.com/embed/${VIDEO_ID}`,
                "uploadDate": "2026-05-13T00:00:00+00:00",
                "duration": "PT4M30S",
                "contentUrl": `https://www.youtube.com/watch?v=${VIDEO_ID}`,
              },
            ]) }} />

            <HowToSchema
              name="Email Subject Line Tester"
              description="Score your email subject lines instantly for open rate potential, spam triggers, power words, length and more — with AI-rewritten alternatives."
              steps={[
                { name: "Paste your email subject line", text: "Type or paste your email subject line into the tester. Optionally enter a preheader and use A/B Compare mode to test two versions side by side." },
                { name: "Review the AI-powered score and analysis", text: "Get a letter grade (A+ through F) and a breakdown across 7 factors: length, spam triggers, power words, capitalisation, punctuation, emoji, and engagement signals." },
                { name: "Refine based on suggestions and re-test", text: "Use the quick win suggestions and AI-generated alternatives to improve your subject line. Re-test until you hit your target score." },
              ]}
            />

            <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px 80px" }}>

                {/* Breadcrumb */}
                <nav style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
                    <span>/</span>
                    <Link href="/tools" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>All Tools</Link>
                    <span>/</span>
                    <span style={{ color: "#f472b6" }}>Email Subject Line Tester</span>
                </nav>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f472b6", background: "rgba(244,114,182,0.12)", border: "1px solid rgba(244,114,182,0.3)", padding: "5px 14px", borderRadius: 999 }}>✓ Email Subject Line Tester · AI-Powered · No Signup</div>
                    <h1 style={{ fontSize: "clamp(28px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 14px", color: "white" }}>
                        Email Subject<br />
                        <span style={{ background: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                          Line Tester.
                        </span>
                    </h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto 22px", lineHeight: 1.6 }}>
                        Score your email subject lines instantly. Checks for spam triggers, power words, ideal length, and capitalisation — then suggests AI-rewritten alternatives. Free, no signup.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
                        {["⚡ Real-time scoring", "🆚 A/B compare", "🚫 Spam detection", "📥 Inbox previews", "✦ AI rewrites"].map(f => (
                            <span key={f} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{f}</span>
                        ))}
                    </div>
                </div>

                {/* Mode toggle */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                    <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: 4, gap: 4 }}>
                        {([{ v: false, label: "Single" }, { v: true, label: "🆚 A/B Compare" }] as const).map(({ v, label }) => (
                            <button key={String(v)} onClick={() => setCompareMode(v)} style={{ background: compareMode === v ? "rgba(244,114,182,0.2)" : "transparent", border: compareMode === v ? "1px solid rgba(244,114,182,0.4)" : "1px solid transparent", borderRadius: 9, padding: "8px 22px", fontSize: 13, fontWeight: 700, color: compareMode === v ? "#f472b6" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.15s" }}>{label}</button>
                        ))}
                    </div>
                </div>

                {/* Templates */}
                <div style={{ marginBottom: 18, textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Start from a proven template</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
                        {TEMPLATES.map(t => (
                            <button key={t.label} onClick={() => setSubject(t.text)} style={{ background: `${t.color}12`, border: `1px solid ${t.color}30`, borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: t.color, cursor: "pointer", transition: "all 0.15s" }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${t.color}25`; e.currentTarget.style.borderColor = `${t.color}60`; }}
                                onMouseLeave={e => { e.currentTarget.style.background = `${t.color}12`; e.currentTarget.style.borderColor = `${t.color}30`; }}
                            >{t.icon} {t.label}</button>
                        ))}
                    </div>
                </div>

                {/* Input(s) */}
                <div style={{ display: "grid", gridTemplateColumns: compareMode ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr", gap: 12, marginBottom: 16 }}>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "22px 24px" }}>
                        {compareMode && <div style={{ fontSize: 11, fontWeight: 800, color: "#f472b6", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Subject A</div>}
                        <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Subject Line</label>
                        <textarea value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Your exclusive invite expires tonight at midnight" rows={2}
                            style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 15px", fontSize: 15, fontWeight: 500, color: "white", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.5 }}
                            onFocus={e => (e.currentTarget.style.borderColor = "rgba(244,114,182,0.6)")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: charCol(subject.length) }}>{subject.length} chars{subject.length >= 40 && subject.length <= 60 ? " ✓" : ""}</span>
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>Ideal: 40–60</span>
                        </div>
                        {!compareMode && (
                            <div style={{ marginTop: 14 }}>
                                <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>Preheader <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "rgba(255,255,255,0.18)" }}>(optional)</span></label>
                                <input type="text" value={preheader} onChange={e => setPreheader(e.target.value)} placeholder="e.g. Only 12 spots left — claim yours before it closes"
                                    style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 15px", fontSize: 13, color: "white", outline: "none", fontFamily: "inherit" }}
                                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(244,114,182,0.6)")}
                                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
                            </div>
                        )}
                    </div>
                    {compareMode && (
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "22px 24px" }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: "#a78bfa", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Subject B</div>
                            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Subject Line</label>
                            <textarea value={subjectB} onChange={e => setSubjectB(e.target.value)} placeholder="e.g. The secret to higher open rates revealed" rows={2}
                                style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 15px", fontSize: 15, fontWeight: 500, color: "white", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.5 }}
                                onFocus={e => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.6)")}
                                onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, color: charCol(subjectB.length) }}>{subjectB.length} chars{subjectB.length >= 40 && subjectB.length <= 60 ? " ✓" : ""}</span>
                                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>Ideal: 40–60</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── RESULTS ── */}
                {aA && gA && (
                    <>
                        {/* ── QUICK WINS ── amber, visually distinct */}
                        {quickWins.length > 0 && !compareMode && (
                            <div style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.12), rgba(245,158,11,0.06))", border: "1px solid rgba(251,191,36,0.35)", borderRadius: 18, padding: "18px 22px", marginBottom: 14 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(251,191,36,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: "#fbbf24" }}>Quick Wins</div>
                                        <div style={{ fontSize: 11, color: "rgba(251,191,36,0.6)" }}>Fix these first — biggest score gains</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {quickWins.map((w, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(0,0,0,0.2)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 12, padding: "11px 14px" }}>
                                            <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{w.icon}</div>
                                            <div style={{ flex: 1, fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>{w.tip}</div>
                                            <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 800, color: "#34d399", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)", padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{w.impact}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── SCORE PANEL(S) ── */}
                        <div style={{ display: "grid", gridTemplateColumns: compareMode ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr", gap: 12, marginBottom: 14 }}>
                            {[{ analysis: aA, grade: gA, label: compareMode ? "Subject A" : undefined, isWinner: compareMode ? winA : false, labelColor: "#f472b6" },
                              ...(compareMode && aB && gB ? [{ analysis: aB, grade: gB, label: "Subject B", isWinner: winB, labelColor: "#a78bfa" }] : []),
                              ...(compareMode && !aB ? [null] : [])
                            ].map((panel, idx) => {
                                if (panel === null) return (
                                    <div key="placeholder" style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 20, padding: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.2)", fontSize: 14 }}>
                                        Type Subject B to compare →
                                    </div>
                                );
                                const { analysis, grade, label, isWinner, labelColor } = panel!;
                                const scoreCircumference = 282.7;
                                return (
                                    <div key={idx} style={{ background: isWinner ? "rgba(52,211,153,0.04)" : "rgba(255,255,255,0.03)", border: `1px solid ${isWinner ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 20, padding: "24px", overflow: "hidden", position: "relative" }}>
                                        {isWinner && compareMode && (
                                            <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg, #34d399, #10b981)", color: "white", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", padding: "5px 14px 5px 20px", borderRadius: "0 18px 0 18px" }}>WINNER</div>
                                        )}
                                        {label && <div style={{ fontSize: 11, fontWeight: 800, color: labelColor, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>{label}</div>}

                                        {/* Big score + breakdown side by side */}
                                        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "start", marginBottom: 20 }}>
                                            {/* Score ring */}
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                                <div style={{ position: "relative", width: 110, height: 110 }}>
                                                    <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }}>
                                                        <circle cx="55" cy="55" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                                                        <circle cx="55" cy="55" r="45" fill="none" stroke={grade.ring} strokeWidth="9"
                                                            strokeDasharray={`${(analysis.score / 100) * scoreCircumference} ${scoreCircumference}`}
                                                            strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${grade.ring}60)` }} />
                                                    </svg>
                                                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                                        <div style={{ fontSize: 26, fontWeight: 900, color: grade.color, lineHeight: 1 }}>{analysis.score}</div>
                                                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>/100</div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <div style={{ fontSize: 32, fontWeight: 900, color: grade.color, lineHeight: 1, textShadow: `0 0 20px ${grade.color}60` }}>{grade.grade}</div>
                                                    <div style={{ fontSize: 12, fontWeight: 700, color: grade.color, marginTop: 3 }}>{grade.label}</div>
                                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{grade.sub}</div>
                                                </div>
                                            </div>

                                            {/* Breakdown bars */}
                                            <div>
                                                {([
                                                    { key: "length", label: "Length", icon: "↔" },
                                                    { key: "spam", label: "Spam", icon: "🚫" },
                                                    { key: "power", label: "Power Words", icon: "⚡" },
                                                    { key: "caps", label: "Caps", icon: "Aa" },
                                                    { key: "punctuation", label: "Punctuation", icon: "!?" },
                                                    { key: "emoji", label: "Emoji", icon: "😊" },
                                                    { key: "engagement", label: "Engagement", icon: "📊" },
                                                ] as const).map(item => {
                                                    const part = analysis.breakdown[item.key] as ScorePart;
                                                    const pct = (part.score / part.max) * 100;
                                                    const bc = pct >= 80 ? "#34d399" : pct >= 50 ? "#fbbf24" : "#f87171";
                                                    return (
                                                        <div key={item.key} style={{ marginBottom: 9 }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "center" }}>
                                                                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 4 }}>
                                                                    <span style={{ fontSize: 10 }}>{item.icon}</span>{item.label}
                                                                </span>
                                                                <span style={{ fontSize: 11, fontWeight: 800, color: bc }}>{part.score}/{part.max}</span>
                                                            </div>
                                                            <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
                                                                <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${bc}99, ${bc})`, borderRadius: 99, boxShadow: pct > 0 ? `0 0 6px ${bc}60` : "none" }} />
                                                            </div>
                                                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", marginTop: 2 }}>{part.label}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Subject analysis */}
                                        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 16px" }}>
                                            <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Subject Analysis</div>
                                            <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.6, marginBottom: 12, wordBreak: "break-word", fontStyle: "italic" }}>
                                                <HighlightedSubject subject={analysis === aA ? subject : subjectB} breakdown={analysis.breakdown} />
                                            </div>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                                                {analysis.breakdown.spam.words.length > 0 && (
                                                    <span style={{ fontSize: 10, fontWeight: 700, color: "#f87171", background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.25)", padding: "3px 9px", borderRadius: 999 }}>🚫 Spam trigger</span>
                                                )}
                                                {(["urgency","curiosity","fomo","value","personalization"] as PowerCategory[]).map(cat =>
                                                    analysis.breakdown.power.words.some(w => w.category === cat) ? (
                                                        <span key={cat} style={{ fontSize: 10, fontWeight: 700, color: CAT_COLOR[cat], background: CAT_BG[cat], border: `1px solid ${CAT_COLOR[cat]}35`, padding: "3px 9px", borderRadius: 999 }}>● {CAT_LABEL[cat]}</span>
                                                    ) : null
                                                )}
                                                {analysis.breakdown.engagement.hasNumber && <span style={{ fontSize: 10, fontWeight: 700, color: "#6ee7b7", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.25)", padding: "3px 9px", borderRadius: 999 }}>🔢 Number</span>}
                                                {analysis.breakdown.engagement.isQuestion && <span style={{ fontSize: 10, fontWeight: 700, color: "#a78bfa", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", padding: "3px 9px", borderRadius: 999 }}>❓ Question</span>}
                                                {analysis.breakdown.spam.words.length === 0 && analysis.breakdown.power.words.length === 0 && !analysis.breakdown.engagement.hasNumber && !analysis.breakdown.engagement.isQuestion && (
                                                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Try adding "exclusive", "revealed" or "tonight"</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ── INBOX PREVIEWS ── only in single mode */}
                        {!compareMode && (
                            <div style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Inbox Previews</div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                                    {EMAIL_CLIENTS.map(client => {
                                        const isClipped = subject.length > client.subjectChars;
                                        const trunc = (t: string, max: number) => t.length > max ? t.slice(0, max) + "…" : t;
                                        return (
                                            <div key={`${client.name}-${client.platform}`} style={{ background: client.bg, border: `1px solid ${client.color}25`, borderRadius: 16, padding: "16px" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                                                    <div style={{ width: 26, height: 26, borderRadius: 7, background: `${client.color}25`, border: `1px solid ${client.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: client.color }}>{client.icon}</div>
                                                    <div>
                                                        <div style={{ fontSize: 11, fontWeight: 700, color: "white" }}>{client.name}</div>
                                                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>{client.platform}</div>
                                                    </div>
                                                    {isClipped && <div style={{ marginLeft: "auto", fontSize: 9, fontWeight: 800, color: "#f87171", background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.3)", padding: "2px 7px", borderRadius: 999 }}>CLIPPED</div>}
                                                </div>
                                                {/* Mock email row */}
                                                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 11px" }}>
                                                    <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                                                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${client.color}30`, flexShrink: 0 }} />
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", gap: 6, marginBottom: 2 }}>
                                                                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>Sender</span>
                                                                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>12:34</span>
                                                            </div>
                                                            <div style={{ fontSize: 12, fontWeight: 700, color: subject.length > 0 ? "white" : "rgba(255,255,255,0.2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>
                                                                {trunc(subject || "Your subject line", client.subjectChars)}
                                                            </div>
                                                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                {trunc(preheader || "Preview text...", 50)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: 7, fontSize: 9, color: `${client.color}80` }}>Max {client.subjectChars} chars visible</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── AI ALTERNATIVES ── only in single mode */}
                        {!compareMode && (
                            <div style={{ background: "linear-gradient(135deg, rgba(244,114,182,0.08), rgba(236,72,153,0.04))", border: "1px solid rgba(244,114,182,0.25)", borderRadius: 20, padding: "22px 24px", marginBottom: 14 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: alternatives.length > 0 ? 18 : 0 }}>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 800, color: "white" }}>AI-Optimised Alternatives</div>
                                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>5 rewrites across urgency, curiosity, value, FOMO & personalisation — GPT-4o</div>
                                    </div>
                                    <button onClick={getAlts} disabled={loading} style={{ background: loading ? "rgba(244,114,182,0.1)" : "linear-gradient(135deg, #f472b6, #ec4899)", border: loading ? "1px solid rgba(244,114,182,0.2)" : "none", borderRadius: 12, padding: "11px 22px", fontSize: 13, fontWeight: 700, color: "white", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, boxShadow: loading ? "none" : "0 4px 20px rgba(244,114,182,0.3)", whiteSpace: "nowrap" }}>
                                        {loading ? "Generating..." : "✦ Generate Alternatives"}
                                    </button>
                                </div>
                                {error && <div style={{ fontSize: 13, color: "#f87171", marginTop: 8 }}>{error}</div>}
                                {alternatives.length > 0 && (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {alternatives.map((alt, i) => (
                                            <div key={i} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                                <div style={{ flexShrink: 0, fontSize: 10, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase" as const, color: ANGLE_COLORS[alt.angle] ?? "#a5b4fc", background: `${ANGLE_COLORS[alt.angle] ?? "#a5b4fc"}18`, border: `1px solid ${ANGLE_COLORS[alt.angle] ?? "#a5b4fc"}35`, padding: "3px 10px", borderRadius: 999 }}>{alt.angle}</div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>{alt.text}</div>
                                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{alt.angleDesc} · {alt.text.length} chars</div>
                                                </div>
                                                <button onClick={() => copyText(alt.text, i)} style={{ flexShrink: 0, background: copiedIdx === i ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${copiedIdx === i ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 9, padding: "6px 13px", fontSize: 12, fontWeight: 700, color: copiedIdx === i ? "#34d399" : "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                                                    {copiedIdx === i ? "Copied!" : "Copy"}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* SEO CONTENT */}
                <div style={{ marginTop: 72, marginBottom: 80, padding: "36px 40px", borderRadius: 24, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(244,114,182,0.2)" }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>What makes an email subject line work — and what kills it</h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85, margin: "0 0 24px" }}>
                      An <strong style={{ color: "white" }}>Email Subject Line Tester</strong> checks your line against the signals that spam filters and email clients use to decide where your message lands. Length, trigger words, punctuation patterns, and capitalisation all affect whether your email reaches the primary inbox or gets filtered before the reader ever sees it.
                    </p>

                    <div style={{ overflowX: "auto", margin: "10px 0 32px" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                        <thead>
                          <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                            <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#f472b6" }}>Signal</th>
                            <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>What to do</th>
                            <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#8b5cf6" }}>Why it matters</th>
                          </tr>
                        </thead>
                        <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                          <tr>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Length</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Keep under 50 characters</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Gmail Mobile clips at ~40 chars</td>
                          </tr>
                          <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Spam words</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Avoid &apos;FREE&apos;, &apos;Act Now&apos;, &apos;Guaranteed&apos;</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Trigger Bayesian filters on major ESPs</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Capitalisation</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Sentence case or Title Case</td>
                            <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>ALL CAPS is a spam signal and feels aggressive</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                       <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>The elements this tester checks</h3>
                       <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
                         This tool checks seven factors: character length, spam trigger word presence, use of power words (urgency, curiosity, value), capitalisation patterns, punctuation overuse, emoji count, and personalisation signals. Each factor is scored independently so you can see exactly what to fix — not just a single pass/fail number.
                       </p>
                    </div>
                </div>

                {/* How it works */}
                <div style={{ marginTop: 72, marginBottom: 48 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 6px", letterSpacing: "-0.02em" }}>How Subject Line Scoring Works</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", margin: "0 0 24px" }}>7 factors that directly influence whether your email gets opened or ignored.</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                        {[
                            { icon: "↔", title: "Ideal Length (20 pts)", desc: "40–60 characters is the sweet spot. Shorter loses context; longer clips on Gmail Mobile.", color: "#6ee7b7" },
                            { icon: "🚫", title: "Spam Triggers (25 pts)", desc: "Words like 'guaranteed', 'act now' and 'click here' trigger spam filters and kill deliverability.", color: "#f87171" },
                            { icon: "⚡", title: "Power Words (15 pts)", desc: "Urgency, curiosity, FOMO and value words drive opens — each triggers a different emotional response.", color: "#fbbf24" },
                            { icon: "Aa", title: "Capitalisation (10 pts)", desc: "ALL CAPS screams spam. Sentence case or title case builds far more trust with both readers and filters.", color: "#a78bfa" },
                            { icon: "!?", title: "Punctuation (10 pts)", desc: "One exclamation mark is fine. Two starts to look desperate. Three or more hurts open rates significantly.", color: "#fb923c" },
                            { icon: "😊", title: "Emoji (10 pts)", desc: "Zero or one emoji maximises impact. Multiple emojis reduce trust and can trigger mobile spam filters.", color: "#f472b6" },
                        ].map(item => (
                            <div key={item.title} style={{ background: `${item.color}08`, border: `1px solid ${item.color}20`, borderRadius: 16, padding: "18px 20px" }}>
                                <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                                <h3 style={{ fontSize: 13, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{item.title}</h3>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>


                <FaqPageSchema faqs={FAQS} />

                {/* Video Tutorial */}
                <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", marginBottom: 32, marginTop: 40 }}>
                  <iframe
                    width="100%"
                    height="480"
                    src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                    title="Email Subject Line Tester Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: "block" }}
                  />
                </div>

                {/* Transcript */}
                <details style={{ marginBottom: 32 }}>
                  <summary style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)", cursor: "pointer", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }}>
                    📝 Video Transcript
                  </summary>
                  <div style={{ padding: "16px 20px", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderTop: "none", borderRadius: "0 0 12px 12px" }}>
                    Your email subject line is probably landing in spam and you have no idea why. This video walks through the 7 factors Gmail and Outlook check — length, spam triggers, power words, capitalisation, punctuation, emoji, and engagement signals. Use the free Email Subject Line Tester from ToolStack to score your subject lines instantly before you send. No signup, no login required.
                  </div>
                </details>

                {/* FAQ */}
                <div style={{ marginBottom: 64 }}>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 20px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                            { q: "What is the best email subject line tester?", a: "ToolStack's free email subject line tester is the most complete option available. It scores your subject line across seven factors — length, spam triggers, power words, capitalisation, punctuation, emoji, and engagement signals — gives you a letter grade with a breakdown, shows inbox previews for Gmail and Outlook, and generates five AI-rewritten alternatives across urgency, curiosity, value, FOMO and personalisation angles. No signup required." },
                            { q: "What is a good email subject line score?", a: "A score of 80+ (grade A) is excellent and should deliver strong open rates. 65–79 (grade B) is good. Aim for at least 65 to maximise performance. Anything under 50 needs significant improvement before sending." },
                            { q: "What are email spam trigger words?", a: "Spam triggers are phrases that spam filters and email clients flag as suspicious, including 'guaranteed', 'act now', 'click here' and 'earn money'. Removing all spam triggers is the single highest-impact change you can make to improve deliverability." },
                            { q: "What is the ideal email subject line length?", a: "The ideal email subject line is 40–60 characters. This ensures full display in Gmail desktop (up to 70 chars) and Gmail mobile (up to 40 chars) without clipping. Subjects under 20 characters lack context; over 80 and most clients will truncate them." },
                            { q: "How do I use A/B compare mode?", a: "Click the 'A/B Compare' button above the input. Two subject line fields appear side by side. Enter your two versions and get instant scores for both. The winner is highlighted with a green badge — use it to pick the stronger subject line before you send." },
                            { q: "What are email power words and how do they work?", a: "Power words are emotionally charged words that drive action. Urgency words (now, tonight, expires, deadline) create time pressure. Curiosity words (secret, revealed, truth) make readers want to know more. FOMO words (exclusive, rare, limited edition) create fear of missing out. Value words (save, deal, proven, results) communicate clear benefit." },
                            { q: "How do I improve my email open rate?", a: "Keep your subject line between 40–60 characters, include 1–2 power words from the urgency or curiosity categories, remove all spam trigger words, add a specific number for credibility, limit punctuation to one mark, and use a maximum of one emoji. Use the AI alternatives feature to get 5 professionally rewritten options." },
                        ].map((faq, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px" }}>
                                <h3 style={{ fontSize: 14, fontWeight: 800, color: "white", margin: "0 0 6px" }}>{faq.q}</h3>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Description */}
                <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Email Subject Line Tester: Free Online Tool</h2>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: 16 }}>
                      Your email subject line is the gatekeeper to everything else — it determines whether your email gets opened or ignored, reported as spam, or deleted before being read. Most people write subject lines by feel. Our Email Subject Line Tester gives you data: a score based on length, word choice, emotional triggers, personalization signals, and known spam triggers.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Enter your subject line and the tester instantly analyzes it across 8 dimensions: length, personalization signals, urgency and scarcity triggers, power words, emotional resonance, spam word detection, emoji usage, and number/stats usage. Each dimension gets a sub-score and the overall subject line gets a 0-100 score.
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Common uses include testing A/B subject lines before sending a marketing campaign, checking whether a subject line triggers spam filters before a cold email blast, optimizing newsletter subject lines for maximum open rate, and validating that a subject line looks good in the mobile email preview.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Most subject line testers are either too simplistic or require a paid subscription. Ours gives you multi-dimensional scoring — emotional triggers, spam word detection, mobile preview truncation — for free, without signup. Test unlimited subject lines and iterate until you hit your target score.
                    </p>
                  </div>
                </section>

                <MoreTools currentSlug="email-subject-line-tester" />
                
            </div>
        </div>
    );
}
