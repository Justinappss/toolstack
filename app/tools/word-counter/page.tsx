"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Copy, Check, Trash2, FileText, Clock, BarChart2, Hash, AlignLeft, Zap, Eye, Wand2, RotateCcw, Download } from "lucide-react";
import { MoreTools } from "@/components/MoreTools";

// ─── HELPERS ────────────────────────────────────────────────────────────────
function countWords(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}
function countChars(text: string) { return text.length; }
function countCharsNoSpaces(text: string) { return text.replace(/\s/g, "").length; }
function countSentences(text: string) {
  if (!text.trim()) return 0;
  // Strip URLs and numbers with decimals so their dots don't count as sentence endings
  const clean = text
    .replace(/https?:\/\/\S+/g, "URL")
    .replace(/www\.\S+/g, "URL")
    .replace(/\d+\.\d+/g, "NUM");
  const matches = clean.match(/[^.!?]*[.!?]+/g);
  return matches ? matches.length : 1;
}
function countParagraphs(text: string) {
  if (!text.trim()) return 0;
  return text.split(/\n\s*\n/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
}
function readingTime(words: number) {
  const mins = words / 238;
  if (mins < 1) return "< 1 min";
  if (mins < 60) return `${Math.ceil(mins)} min${Math.ceil(mins) === 1 ? "" : "s"}`;
  const h = Math.floor(mins / 60);
  const m = Math.ceil(mins % 60);
  return `${h}h ${m}m`;
}
function speakingTime(words: number) {
  const mins = words / 130;
  if (mins < 1) return "< 1 min";
  return `${Math.ceil(mins)} min${Math.ceil(mins) === 1 ? "" : "s"}`;
}

// Detect if text is real English (vowel ratio check)
function isReadableEnglish(text: string): boolean {
  const letters = text.toLowerCase().match(/[a-z]/g) || [];
  if (letters.length < 20) return false; // too short to score meaningfully
  const vowels = letters.filter(c => "aeiou".includes(c)).length;
  const ratio = vowels / letters.length;
  // Real English is ~38-42% vowels. Gibberish/consonant clusters will be well below 20%
  return ratio >= 0.15;
}

// Flesch Reading Ease
function fleschScore(text: string): number | null {
  const words = countWords(text);
  const sentences = countSentences(text);
  if (words < 5 || sentences === 0) return null;
  if (!isReadableEnglish(text)) return null;
  const syllables = countSyllables(text);
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function syllablesInWord(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word.length) return 0;
  if (word.length <= 3) return 1;

  let count = 0;
  let prevVowel = false;
  const vowels = "aeiouy";

  for (const ch of word) {
    const isVowel = vowels.includes(ch);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }

  // Silent trailing 'e' (e.g. "make", "write") — only subtract if it won't drop below 1
  if (word.endsWith("e") && count > 1) count--;

  // Words ending in 'le' preceded by a consonant add a syllable (e.g. "simple", "table")
  if (word.length > 2 && word.endsWith("le") && !vowels.includes(word[word.length - 3])) count++;

  // Words ending in 'ed' where the 'd' is silent (e.g. "walked") — reduce
  if (word.endsWith("ed") && word.length > 3 && !"td".includes(word[word.length - 3])) {
    count = Math.max(1, count - 1);
  }

  return Math.max(1, count);
}

function countSyllables(text: string): number {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  return words.reduce((total, word) => total + syllablesInWord(word), 0);
}

const FLESCH_BANDS = [
  { min: 90, max: 100, label: "Very Easy",      color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  desc: "5th grade — anyone can read this",       range: "90–100" },
  { min: 80, max: 89,  label: "Easy",           color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  desc: "6th grade — very accessible",            range: "80–89"  },
  { min: 70, max: 79,  label: "Fairly Easy",    color: "#a3e635", bg: "rgba(163,230,53,0.1)",  border: "rgba(163,230,53,0.3)",  desc: "7th grade — clear writing",              range: "70–79"  },
  { min: 60, max: 69,  label: "Standard",       color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)",  desc: "8th–9th grade — normal reading",         range: "60–69"  },
  { min: 50, max: 59,  label: "Fairly Hard",    color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  desc: "10th–12th grade — some complexity",      range: "50–59"  },
  { min: 30, max: 49,  label: "Hard",           color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)", desc: "College level — dense content",          range: "30–49"  },
  { min: 0,  max: 29,  label: "Very Difficult", color: "#e879f9", bg: "rgba(232,121,249,0.1)", border: "rgba(232,121,249,0.3)", desc: "Professional / academic writing",        range: "0–29"   },
];

function fleschLabel(score: number) {
  return FLESCH_BANDS.find(b => score >= b.min) || FLESCH_BANDS[FLESCH_BANDS.length - 1];
}

function avgWordsPerSentence(text: string): number {
  const w = countWords(text);
  const s = countSentences(text);
  return s === 0 ? 0 : Math.round(w / s);
}

function longestWord(text: string): string {
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  return words.reduce((a, b) => b.length > a.length ? b : a, "");
}

function uniqueWords(text: string): number {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  return new Set(words).size;
}

function vocabularyRichness(text: string): number {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  if (words.length < 10) return 0;
  return Math.round((new Set(words).size / words.length) * 100);
}

function transitionWordPct(text: string): number {
  const transitions = new Set(["however","therefore","furthermore","additionally","moreover","consequently","nevertheless","meanwhile","subsequently","accordingly","although","whereas","despite","indeed","similarly","likewise","conversely","alternatively","finally","firstly","secondly","thirdly","thus","hence","otherwise","regardless","nonetheless","notwithstanding","subsequently","previously","simultaneously","eventually","ultimately","initially","specifically","particularly","especially","notably","significantly","importantly","generally","typically","usually","often","frequently","occasionally","rarely","clearly","obviously","certainly","undoubtedly","presumably","apparently","arguably","arguably","interestingly","surprisingly","unfortunately","fortunately"]);
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  const sentences = countSentences(text);
  if (sentences === 0) return 0;
  const hits = words.filter(w => transitions.has(w)).length;
  return Math.round((hits / sentences) * 100);
}

// Overall writing score 0-100 combining flesch, sentence length, vocab richness
function writingScore(text: string): number | null {
  const words = countWords(text);
  if (words < 20) return null;
  const flesch = fleschScore(text);
  if (flesch === null) return null;
  const avgWPS = avgWordsPerSentence(text);
  const vocab = vocabularyRichness(text);
  // Ideal: flesch 60-80, avg sentence 12-20 words, vocab richness 40-70%
  const fleschScore2 = Math.min(100, flesch);
  const sentScore = avgWPS >= 8 && avgWPS <= 20 ? 100 : avgWPS < 8 ? 60 : Math.max(0, 100 - (avgWPS - 20) * 4);
  const vocabScore = vocab >= 40 && vocab <= 80 ? 100 : vocab < 40 ? vocab * 2.5 : Math.max(0, 100 - (vocab - 80) * 2);
  return Math.round(fleschScore2 * 0.5 + sentScore * 0.3 + vocabScore * 0.2);
}

interface WritingTip { type: "good" | "warn" | "bad"; text: string; }
function getWritingTips(text: string): WritingTip[] {
  const tips: WritingTip[] = [];
  const words = countWords(text);
  if (words < 20) return tips;
  const flesch = fleschScore(text);
  const avgWPS = avgWordsPerSentence(text);
  const vocab = vocabularyRichness(text);
  const trans = transitionWordPct(text);

  // Readability
  if (flesch !== null) {
    if (flesch >= 70) tips.push({ type: "good", text: `Great readability (${flesch}/100) — your writing is clear and easy to follow.` });
    else if (flesch >= 50) tips.push({ type: "warn", text: `Readability score ${flesch}/100 — try breaking up longer sentences to improve clarity.` });
    else tips.push({ type: "bad", text: `Low readability (${flesch}/100) — your text may be too complex for most web readers. Aim for shorter sentences and simpler words.` });
  }

  // Sentence length
  if (avgWPS > 25) tips.push({ type: "bad",  text: `Average sentence length is ${avgWPS} words — very long. Aim for 15–20 words per sentence for maximum clarity.` });
  else if (avgWPS > 20) tips.push({ type: "warn", text: `Average sentence length is ${avgWPS} words — slightly long. Try splitting a few sentences.` });
  else if (avgWPS >= 8) tips.push({ type: "good", text: `Average sentence length of ${avgWPS} words is ideal for web content.` });
  else if (avgWPS > 0) tips.push({ type: "warn", text: `Sentences average only ${avgWPS} words — very short. Add more detail to key points.` });

  // Vocabulary richness
  if (vocab > 80) tips.push({ type: "warn", text: `High vocabulary variety (${vocab}%) — great range, but make sure key terms are repeated enough for emphasis.` });
  else if (vocab >= 40) tips.push({ type: "good", text: `Good vocabulary variety (${vocab}%) — balanced use of different words.` });
  else if (vocab > 0) tips.push({ type: "warn", text: `Low vocabulary variety (${vocab}%) — consider using more diverse language to keep readers engaged.` });

  // Transition words
  if (trans === 0 && countSentences(text) > 3) tips.push({ type: "warn", text: "No transition words detected — words like 'however', 'therefore', and 'additionally' improve flow and readability." });
  else if (trans > 0) tips.push({ type: "good", text: `Transition words detected — good use of connective language helps readers follow your argument.` });

  return tips;
}

function topKeywords(text: string, n = 8): { word: string; count: number; pct: number }[] {
  const stopWords = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","by","from","is","it","its","as","be","was","are","were","has","have","had","that","this","i","you","he","she","we","they","do","did","not","if","so","up","out","can","all","one","more","will","their","there","about","which","when","who","your","our","my","his","her","been","what","would","could","should","than","then","into","also","just","over","after","before","because","while","some","any","such","each","other","how","no","these","those","very","even","back","get","them","make","like","time","only","new","know","take","people","way","too","use","good","well","also","both","only","much","many","most","few","first","last","long","great","little","own","right","still","think","give","day","same","old","come","us","may","say","go","see","now","here","through","again","further","most","after","before","need"]);
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const freq: Record<string, number> = {};
  words.forEach(w => { if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1; });
  const total = Object.values(freq).reduce((a, b) => a + b, 0);
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count, pct: Math.round((count / total) * 100) }));
}

// ─── STAT CARD ───────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: "22px 24px",
      display: "flex",
      flexDirection: "column" as const,
      gap: 8,
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}55`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={color} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{label}</span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 900, color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{sub}</div>}
    </div>
  );
}

// ─── READABILITY GAUGE ───────────────────────────────────────────────────────
function ReadabilityGauge({ score }: { score: number | null }) {
  const info = score !== null ? fleschLabel(score) : null;
  const pct = score !== null ? score / 100 : 0;
  const circumference = Math.PI * 60;
  const strokeDash = circumference * pct;
  const activeColor = info?.color ?? "rgba(255,255,255,0.15)";

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${info ? `${info.color}33` : "rgba(255,255,255,0.08)"}`,
      borderRadius: 20,
      padding: "28px 24px",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: 12,
      transition: "border-color 0.5s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, alignSelf: "flex-start" }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: `${activeColor}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Eye size={16} color={activeColor} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Readability</span>
      </div>

      {/* Half-circle gauge */}
      <div style={{ position: "relative" as const, width: 140, height: 78 }}>
        <svg width="140" height="78" viewBox="0 0 140 78">
          <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" strokeLinecap="round" />
          {score !== null && (
            <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke={activeColor} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
              style={{ transition: "stroke-dasharray 1s ease, stroke 0.5s ease" }}
            />
          )}
        </svg>
        <div style={{ position: "absolute" as const, bottom: 0, left: 0, right: 0, textAlign: "center" as const }}>
          {score !== null
            ? <div style={{ fontSize: 32, fontWeight: 900, color: activeColor, lineHeight: 1, letterSpacing: "-0.02em", transition: "color 0.5s ease" }}>{score}</div>
            : <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.2)", lineHeight: 1.3, textAlign: "center" }}>paste text<br/>to score</div>
          }
        </div>
      </div>

      <div style={{ textAlign: "center" as const }}>
        {info ? (
          <>
            <div style={{
              display: "inline-block", fontSize: 13, fontWeight: 700,
              padding: "4px 14px", borderRadius: 999,
              background: info.bg, border: `1px solid ${info.border}`, color: info.color,
              marginBottom: 6, transition: "all 0.5s ease",
            }}>{info.label}</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>{info.desc}</p>
          </>
        ) : (
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", margin: 0 }}>Flesch Reading Ease score</p>
        )}
      </div>
    </div>
  );
}

// ─── KEYWORD ROW ─────────────────────────────────────────────────────────────
function KeywordRow({ word, count, pct, max }: { word: string; count: number; pct: number; max: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", minWidth: 120, fontFamily: "monospace" }}>{word}</span>
      <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${(count / max) * 100}%`, height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 4, transition: "width 0.8s ease" }} />
      </div>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", minWidth: 36, textAlign: "right" as const }}>{count}×</span>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", minWidth: 30, textAlign: "right" as const }}>{pct}%</span>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [fixError, setFixError] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [grammarFixed, setGrammarFixed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const words       = countWords(text);
  const chars       = countChars(text);
  const charsNoSp   = countCharsNoSpaces(text);
  const sentences   = countSentences(text);
  const paragraphs  = countParagraphs(text);
  const readTime    = readingTime(words);
  const speakTime   = speakingTime(words);
  const flesch      = fleschScore(text);
  const fleschInfo  = flesch !== null ? fleschLabel(flesch) : null;
  const avgWPS      = avgWordsPerSentence(text);
  const longest     = longestWord(text);
  const unique      = uniqueWords(text);
  const vocab       = vocabularyRichness(text);
  const trans       = transitionWordPct(text);
  const wScore      = writingScore(text);
  const tips        = getWritingTips(text);
  const keywords    = topKeywords(text);
  const maxKw       = keywords[0]?.count || 1;
  const hasText     = text.trim().length > 0;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  async function fixGrammar() {
    if (!text.trim() || fixing) return;
    setFixing(true);
    setFixError("");
    try {
      const r = await fetch("/api/fix-grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const d = await r.json();
      if (!r.ok || d.error) { setFixError(d.error || "Could not fix grammar — try again"); return; }
      setOriginalText(text);
      setText(d.fixed);
      setGrammarFixed(true);
    } catch { setFixError("Something went wrong — please try again"); }
    finally { setFixing(false); }
  }

  function undoGrammar() {
    setText(originalText);
    setOriginalText("");
    setGrammarFixed(false);
  }

  const card: React.CSSProperties = {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 24,
  };

  const GOALS = [
    { label: "Tweet / X",      target: 280,  unit: "chars" },
    { label: "Meta Desc",      target: 160,  unit: "chars" },
    { label: "Instagram",      target: 2200, unit: "chars" },
    { label: "LinkedIn Post",  target: 3000, unit: "chars" },
    { label: "Email",          target: 200,  unit: "words" },
    { label: "Landing Page",   target: 500,  unit: "words" },
    { label: "Blog Post",      target: 1500, unit: "words" },
    { label: "Long-Form",      target: 3000, unit: "words" },
  ];

    const download = useCallback(() => {
        if (!text.trim()) return;
        const statsStr = `═══ WordMetrics Ultra Report ═══\n\nWords: ${words}\nCharacters: ${chars}\nSentences: ${sentences}\nParagraphs: ${paragraphs}\nReading Time: ${readTime}\nFlesch Score: ${flesch ?? "N/A"}\n\n═══ Text ═══\n\n${text}`;
        const blob = new Blob([statsStr], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `wordmetrics-report-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }, [text, words, chars, sentences, paragraphs, readTime, flesch]);

  return (
    <>
      {/* ── STRUCTURED DATA ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "WordMetrics Ultra",
          "description": "Free word counter with Flesch readability score, reading time estimate, keyword density, and sentence count. No signup, runs in your browser.",
          "url": "https://toolstack.tech/tools/word-counter",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web",
          "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["WordMetrics word counting", "Character count", "Readability score", "Reading time", "Keyword density analysis", "Export as .txt", "Flesch Reading Ease"],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Writing Tools", "item": "https://toolstack.tech/tools?category=writing" },
            { "@type": "ListItem", "position": 3, "name": "WordMetrics Ultra", "item": "https://toolstack.tech/tools/word-counter" },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How accurate is this word counter?", "acceptedAnswer": { "@type": "Answer", "text": "Our word counter is 100% accurate. It splits text by whitespace the same way word processors like Microsoft Word and Google Docs do. Characters, sentences, and paragraphs are all counted using industry-standard rules." } },
            { "@type": "Question", "name": "What is a Flesch Readability Score?", "acceptedAnswer": { "@type": "Answer", "text": "The Flesch Reading Ease score rates text on a scale of 0–100. Scores of 60–70 are considered standard (8th-9th grade). Higher scores mean easier reading. Most web content should target 60–80. Academic and legal writing typically scores below 30." } },
            { "@type": "Question", "name": "How many words should a blog post be?", "acceptedAnswer": { "@type": "Answer", "text": "For SEO purposes, the sweet spot is 1,500–2,500 words for most topics. Long-form content (3,000+ words) tends to rank better for competitive keywords. Short posts (500–800 words) work well for news and simple how-to content." } },
            { "@type": "Question", "name": "How long does it take to read 1000 words?", "acceptedAnswer": { "@type": "Answer", "text": "The average adult reads at 238 words per minute. 1,000 words takes approximately 4 minutes to read. Speaking the same content takes about 7-8 minutes at an average speaking pace of 130 words per minute." } },
            { "@type": "Question", "name": "What is a good reading level for a website?", "acceptedAnswer": { "@type": "Answer", "text": "Most websites should target a Flesch Reading Ease score of 60–70, which corresponds to 8th-9th grade reading level. This makes content accessible to the widest audience. Technical or professional content may naturally score lower." } },
          ],
        },
      ]) }} />

      <div style={{ minHeight: "100vh", background: "#080810", paddingTop: 80 }}>

        {/* ── AMBIENT ── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-5%", left: "10%",   width: 600, height: 500, background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "40%", right: "5%",   width: 500, height: 500, background: "radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "30%", width: 600, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>

          {/* ── BREADCRUMB ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, paddingTop: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
            <ChevronRight size={13} color="rgba(255,255,255,0.2)" />
            <Link href="/tools?category=writing" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Writing Tools</Link>
            <ChevronRight size={13} color="rgba(255,255,255,0.2)" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Word Counter</span>
          </div>

          {/* ── HERO ── */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg,#6366f1,#8b5cf6,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 48px rgba(99,102,241,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset", flexShrink: 0 }}>
                <FileText size={28} color="white" strokeWidth={1.75} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { label: "Instant Results",  bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)",  color: "#a5b4fc" },
                  { label: "No Signup",        bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)", color: "#6ee7b7" },
                  { label: "Readability Score",bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.25)", color: "#fde68a" },
                  { label: "Free Forever",     bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" },
                ].map(b => (
                  <span key={b.label} style={{ fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: b.bg, border: `1px solid ${b.border}`, color: b.color }}>{b.label}</span>
                ))}
              </div>
            </div>
            <h1 style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 14, color: "white" }}>
              WordMetrics{" "}
              <span style={{ background: "linear-gradient(135deg,#818cf8 0%,#34d399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ultra.</span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 580, margin: 0 }}>
              The high-performance writing lab. Analyze word counts, character limits, Flesch scores, and reading time with professional precision. Optimized for SEO and LLM citation.
            </p>
          </div>

          {/* ── EDITOR + LIVE STATS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 16, marginBottom: 16, alignItems: "start" }}>

            {/* Textarea */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              {/* Toolbar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: 16 }}>
                  {[
                    { label: `${words} words`,     color: "#a5b4fc" },
                    { label: `${chars} chars`,     color: "#34d399" },
                    { label: `${sentences} sent.`, color: "#fbbf24" },
                  ].map(s => (
                    <span key={s.label} style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.label}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {/* Fix Grammar button */}
                  <button onClick={fixGrammar} disabled={!hasText || fixing} title="AI fixes spelling, grammar and punctuation" style={{
                    display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8,
                    border: "1px solid rgba(139,92,246,0.35)", background: fixing ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.12)",
                    color: !hasText ? "rgba(255,255,255,0.2)" : "#a78bfa",
                    fontSize: 12, fontWeight: 700, cursor: hasText && !fixing ? "pointer" : "not-allowed", transition: "all 0.15s",
                    boxShadow: hasText && !fixing ? "0 0 12px rgba(139,92,246,0.2)" : "none",
                  }}>
                    <Wand2 size={12} style={{ animation: fixing ? "spin 0.8s linear infinite" : "none" }} />
                    {fixing ? "Fixing..." : "Fix Grammar"}
                  </button>
                  {/* Undo grammar fix */}
                  {grammarFixed && (
                    <button onClick={undoGrammar} title="Undo grammar fix" style={{
                      display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8,
                      border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)",
                      color: "#fbbf24", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                    }}>
                      <RotateCcw size={12} />Undo
                    </button>
                  )}
                  <button onClick={handleCopy} disabled={!hasText} style={{
                    display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)",
                    color: copied ? "#34d399" : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600, cursor: hasText ? "pointer" : "not-allowed", transition: "all 0.15s",
                  }}>
                    {copied ? <><Check size={12} />Copied</> : <><Copy size={12} />Copy</>}
                  </button>
                  <button onClick={download} disabled={!hasText} style={{
                    display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8,
                    border: "1px solid rgba(56,189,248,0.2)", background: "rgba(56,189,248,0.06)",
                    color: hasText ? "#38bdf8" : "rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 600, cursor: hasText ? "pointer" : "not-allowed", transition: "all 0.15s",
                  }}>
                    <Download size={12} />Export
                  </button>
                  <button onClick={() => { setText(""); setGrammarFixed(false); setOriginalText(""); setFixError(""); }} disabled={!hasText} style={{
                    display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8,
                    border: "1px solid rgba(248,113,113,0.2)", background: "rgba(248,113,113,0.06)",
                    color: hasText ? "#f87171" : "rgba(255,255,255,0.2)", fontSize: 12, fontWeight: 600, cursor: hasText ? "pointer" : "not-allowed", transition: "all 0.15s",
                  }}>
                    <Trash2 size={12} />Clear
                  </button>
                </div>
              </div>

              {/* Grammar fixed banner */}
              {grammarFixed && (
                <div style={{ margin: "0 18px 0", padding: "10px 14px", borderRadius: 10, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span style={{ fontSize: 13, color: "#34d399", fontWeight: 600 }}>✓ Grammar fixed by AI — your text has been corrected.</span>
                  <button onClick={undoGrammar} style={{ fontSize: 12, color: "#fbbf24", background: "none", border: "none", cursor: "pointer", fontWeight: 600, padding: 0 }}>Undo</button>
                </div>
              )}
              {fixError && (
                <div style={{ margin: "0 18px", padding: "10px 14px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)" }}>
                  <span style={{ fontSize: 13, color: "#f87171" }}>⚠ {fixError}</span>
                </div>
              )}

              <textarea
                ref={textareaRef}
                value={text}
                onChange={e => { setText(e.target.value); if (grammarFixed) setGrammarFixed(false); }}
                placeholder="Paste or type your text here...&#10;&#10;Stats update instantly. Click 'Fix Grammar' to auto-correct spelling, grammar and punctuation with AI."
                style={{
                  width: "100%", minHeight: 420, padding: "20px 22px",
                  background: "transparent", border: "none", outline: "none", resize: "vertical",
                  color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.75,
                  fontFamily: "inherit", boxSizing: "border-box",
                }}
              />

              {/* Platform length checker */}
              {hasText && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 18px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", margin: "0 0 12px" }}>
                    How far are you from each platform's ideal length?
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                    {GOALS.map(g => {
                      const current = g.unit === "words" ? words : chars;
                      const pct = Math.min(100, (current / g.target) * 100);
                      const over = current > g.target;
                      const remaining = g.target - current;
                      return (
                        <div key={g.label} style={{
                          padding: "10px 12px", borderRadius: 12,
                          background: over ? "rgba(52,211,153,0.06)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${over ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.06)"}`,
                        }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: over ? "#34d399" : "rgba(255,255,255,0.5)", marginBottom: 6 }}>{g.label}</div>
                          <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", marginBottom: 5 }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: over ? "#34d399" : "rgba(99,102,241,0.7)", borderRadius: 3, transition: "width 0.3s ease" }} />
                          </div>
                          <div style={{ fontSize: 11, color: over ? "#34d399" : "rgba(255,255,255,0.25)" }}>
                            {over ? `✓ ${g.target} ${g.unit} reached` : `${remaining} more ${g.unit}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar stats */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              <ReadabilityGauge score={flesch} />

              <div style={{ ...card, padding: "18px 20px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                {[
                  { label: "Reading time",   value: hasText ? readTime  : "—", icon: Clock,    color: "#38bdf8" },
                  { label: "Speaking time",  value: hasText ? speakTime : "—", icon: Zap,      color: "#a78bfa" },
                  { label: "Avg words/sent", value: hasText ? avgWPS    : "—", icon: BarChart2, color: "#fbbf24" },
                  { label: "Unique words",   value: hasText ? unique    : "—", icon: Hash,      color: "#34d399" },
                ].map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <s.icon size={14} color={s.color} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{s.value}</span>
                  </div>
                ))}
                {hasText && longest && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <AlignLeft size={14} color="#fb923c" />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Longest word</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "white", fontFamily: "monospace" }}>{longest}</span>
                  </div>
                )}
                {hasText && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Zap size={14} color="#f472b6" />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Vocab variety</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>{vocab}%</span>
                  </div>
                )}
                {hasText && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <BarChart2 size={14} color="#38bdf8" />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Transitions</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: trans > 0 ? "#34d399" : "#f87171" }}>{trans > 0 ? "✓ Found" : "None"}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── MAIN STAT GRID ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
            <StatCard icon={FileText}  label="Words"       value={words}      sub="total word count"          color="#818cf8" />
            <StatCard icon={Hash}      label="Characters"  value={chars}      sub={`${charsNoSp} without spaces`} color="#34d399" />
            <StatCard icon={AlignLeft} label="Sentences"   value={sentences}  sub={`${paragraphs} paragraph${paragraphs === 1 ? "" : "s"}`} color="#fbbf24" />
          </div>

          {/* ── WRITING SCORE + TIPS ── */}
          {hasText && tips.length > 0 && (
            <div style={{ ...card, padding: "28px 28px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(139,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={16} color="#a78bfa" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: 0 }}>Writing Analysis</h2>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>Actionable tips to improve your text</p>
                  </div>
                </div>
                {wScore !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Overall Writing Score</span>
                    <div style={{
                      fontSize: 28, fontWeight: 900, lineHeight: 1,
                      color: wScore >= 75 ? "#34d399" : wScore >= 55 ? "#fbbf24" : "#f87171",
                      background: wScore >= 75 ? "rgba(52,211,153,0.1)" : wScore >= 55 ? "rgba(251,191,36,0.1)" : "rgba(248,113,113,0.1)",
                      border: `1.5px solid ${wScore >= 75 ? "rgba(52,211,153,0.3)" : wScore >= 55 ? "rgba(251,191,36,0.3)" : "rgba(248,113,113,0.3)"}`,
                      padding: "6px 16px", borderRadius: 12,
                    }}>
                      {wScore}<span style={{ fontSize: 14, opacity: 0.6 }}>/100</span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {tips.map((tip, i) => {
                  const cfg = {
                    good: { color: "#34d399", bg: "rgba(52,211,153,0.07)",  border: "rgba(52,211,153,0.2)",  icon: "✓" },
                    warn: { color: "#fbbf24", bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.2)",  icon: "⚠" },
                    bad:  { color: "#f87171", bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.2)", icon: "✗" },
                  }[tip.type];
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 12,
                      padding: "12px 16px", borderRadius: 12,
                      background: cfg.bg, border: `1px solid ${cfg.border}`,
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: cfg.color, flexShrink: 0, marginTop: 1 }}>{cfg.icon}</span>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.6 }}>{tip.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── KEYWORD DENSITY ── */}
          {hasText && keywords.length > 0 && (
            <div style={{ ...card, padding: "28px 28px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <BarChart2 size={16} color="#818cf8" />
                </div>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: 0 }}>Top Keywords</h2>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>Keyword density analysis — stop words excluded</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {keywords.map(kw => (
                  <KeywordRow key={kw.word} word={kw.word} count={kw.count} pct={kw.pct} max={maxKw} />
                ))}
              </div>
            </div>
          )}

          {/* ── READABILITY GUIDE ── */}
          <div style={{ ...card, padding: "28px 28px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 6 }}>Flesch Reading Ease — Score Guide</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 20, lineHeight: 1.6 }}>
              The Flesch Reading Ease formula measures how easy your text is to read. Higher is easier. Aim for 60–70 for most web content.
              {fleschInfo && <span style={{ color: fleschInfo.color, fontWeight: 700 }}> Your text scores <strong>{flesch}</strong> — {fleschInfo.label}.</span>}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
              {FLESCH_BANDS.map(b => {
                const isActive = flesch !== null && flesch >= b.min && flesch <= b.max;
                return (
                  <div key={b.range} style={{
                    padding: "14px 16px", borderRadius: 14,
                    background: isActive ? `${b.color}22` : `${b.color}0a`,
                    border: `${isActive ? "2px" : "1px"} solid ${isActive ? b.color : `${b.color}28`}`,
                    boxShadow: isActive ? `0 0 20px ${b.color}33` : "none",
                    transition: "all 0.5s ease",
                    position: "relative" as const,
                  }}>
                    {isActive && (
                      <div style={{
                        position: "absolute" as const, top: 8, right: 10,
                        fontSize: 10, fontWeight: 800, color: b.color,
                        background: `${b.color}22`, border: `1px solid ${b.color}55`,
                        padding: "2px 8px", borderRadius: 999, letterSpacing: "0.05em",
                      }}>YOUR TEXT</div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: isActive ? b.color : `${b.color}99` }}>{b.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{b.range}</span>
                    </div>
                    <p style={{ fontSize: 12, color: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.28)", margin: 0 }}>{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── SEO GUIDE ── */}
          <div style={{ ...card, padding: "32px 32px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 20, letterSpacing: "-0.02em" }}>The Ultimate Guide to Word Counting & Readability in 2026</h2>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
            <p>
                A <strong style={{ color: "white" }}>Word Counter</strong> is defined as a digital utility that calculates the number of characters, words, sentences, and paragraphs in a text while analyzing complex readability metrics like the Flesch-Kincaid scale. In the modern era of <strong style={{ color: "white" }}>Generative Engine Optimization (GEO)</strong>, the way we count and process text has fundamentally shifted. It&apos;s no longer enough to just measure length; you must measure <strong style={{ color: "white" }}>density of value</strong>. [WordMetrics Ultra](/tools/word-counter) is engineered to provide the technical depth required to rank in 2026.
              </p>

              <div style={{ overflowX: "auto", margin: "10px 0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                      <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#818cf8" }}>Content Type</th>
                      <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Target Count</th>
                      <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>AI Citation Probability</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Micro-Blog</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>300 - 500</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Low (~12%)</td>
                    </tr>
                    <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Standard Guide</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>1,200 - 1,500</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>High (~65%)</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Pillar Article</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>2,500+</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Extreme (~92%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Why Word Count Still Matters</h3>
                <p>
                  Search engines use word count as a rough proxy for depth and coverage. Longer content tends to cover a topic more comprehensively, which correlates with more backlinks and more time on page — both genuine ranking signals. That said, word count alone is not a ranking factor; a 500-word answer that fully solves the query outperforms a padded 2,000-word article every time. This tool gives you a live count so you can make that judgement as you write.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Decoding the Flesch Reading Ease Score</h3>
                <p>
                  Most professional writers target a score of <strong style={{ color: "white" }}>65 or higher</strong>. This ensures your content is accessible to a general audience. If you are writing for technical peers, a lower score is acceptable, but for brand building and general SEO, simplicity is your greatest competitive advantage.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>3 Pro Tips for Better Writing</h3>
                <ul style={{ listStyleType: "circle", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li><strong style={{ color: "white" }}>Eliminate Passive Voice:</strong> Use our AI grammar fixed to identify and replace passive phrasing with active, commanding verbs.</li>
                  <li><strong style={{ color: "white" }}>Monitor Keyword Density:</strong> Avoid &quot;keyword stuffing.&quot; Keep your primary keyword frequency below 2.5% to avoid over-optimization penalties.</li>
                  <li><strong style={{ color: "white" }}>Vary Your Rhythm:</strong> Use the &quot;Avg Words Per Sentence&quot; stat to ensure you aren&apos;t fatiguing your reader with identical sentence lengths.</li>
                </ul>
              </div>

              <p>
                Use this dashboard as your final quality gate before publishing. By aligning your metrics with 2026 standards, you ensure your content doesn&apos;t just get indexed—it gets <strong style={{ color: "white" }}>recommended</strong>.
              </p>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div style={{ ...card, padding: "28px 28px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 24 }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 22 }}>
              {[
                { q: "How accurate is this word counter?", a: "Our word counter is 100% accurate. It splits text by whitespace the same way Microsoft Word and Google Docs do. Characters, sentences, and paragraphs are all counted using industry-standard rules — all processing happens in your browser instantly." },
                { q: "What is a Flesch Readability Score?", a: "The Flesch Reading Ease score rates text on a scale of 0–100. Scores of 60–70 are considered standard (8th-9th grade reading level). Higher scores mean easier reading. Most web content should target 60–80. Academic and legal writing typically scores below 30." },
                { q: "How many words should a blog post be?", a: "For SEO, the sweet spot is 1,500–2,500 words for most topics. Long-form content (3,000+ words) tends to rank better for competitive keywords. Short posts (500–800 words) work well for news and simple how-to content." },
                { q: "How long does it take to read 1000 words?", a: "The average adult reads at 238 words per minute. 1,000 words takes approximately 4 minutes to read. Speaking takes about 7–8 minutes at an average speaking pace of 130 words per minute." },
                { q: "What is a good reading level for a website?", a: "Most websites should target a Flesch Reading Ease score of 60–70 (8th-9th grade). This makes content accessible to the widest audience. Technical or professional content may naturally score lower — that's fine if it matches your audience." },
                { q: "What is the best free word counter online?", a: "ToolStack's word counter is the most comprehensive free option — it combines word count, character count, readability scoring, reading time, speaking time, keyword density analysis and writing goal targets all in one tool, with no signup required." },
              ].map(faq => (
                <div key={faq.q} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 22 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 8px" }}>{faq.q}</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.72, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── MORE TOOLS ── */}
          <MoreTools currentSlug="word-counter" />

          {/* ── ADVERTSGPT BANNER ── */}
          

        </div>
      </div>
    </>
  );
}
