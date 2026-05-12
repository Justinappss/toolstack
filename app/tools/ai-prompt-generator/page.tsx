"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Copy, Check, RefreshCw, Zap, Star, Download, ExternalLink, ChevronRight, Search, Code2, BarChart3, FileText, Briefcase, MessageSquare, GraduationCap, Megaphone, Lightbulb, FlaskConical } from "lucide-react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";
import { HowToSchema } from "@/components/ui/HowToSchema";

const FAQS = [
  { q: "What is a prompt framework?", a: "A prompt framework is a structured template that tells an AI model exactly what role to play, what to do, how to think, and what format to return. Frameworks like RISEN and Chain-of-Thought consistently produce higher quality outputs than plain requests because they eliminate ambiguity and give the model complete context." },
  { q: "What is RISEN prompting?", a: "RISEN stands for Role, Instructions, Steps, End Goal, and Narrowing. It is one of the most effective prompt engineering frameworks because it gives the AI complete context: who it is, what to do, how to do it, what the goal is, and what constraints to follow. RISEN prompts consistently outperform generic requests." },
  { q: "Is this AI prompt generator free?", a: "Yes \u2014 100% free, unlimited usage, no account required. All prompts are generated using GPT-4o, not a cheaper model. There is no paywall, no credit limit, and no email required." },
  { q: "Do these prompts work in Claude, Gemini, or Perplexity?", a: "Yes. Our prompt generator supports ChatGPT, Claude, Gemini, Perplexity, Grok, and Microsoft Copilot. Each model has a dedicated optimisation mode \u2014 Claude prompts use XML tags, Perplexity prompts include citation instructions, and Grok prompts are tuned for real-time data." },
  { q: "What does the prompt strength score mean?", a: "Each prompt is rated 1-100 based on specificity, role clarity, output format instructions, and constraint quality. Scores above 80 indicate prompts that will reliably produce expert-level AI output. Scores below 60 suggest the prompt may need more specificity or context." },
  { q: "What are the best AI tools for optimizing product visibility?", a: "The best AI tools for optimizing product visibility include AI prompt generators, grammar checkers, paraphrasing tools, meta description generators, and hashtag generators. These tools help you create search-optimised content that ranks higher in Google and gets discovered by AI search engines like ChatGPT and Perplexity. ToolStack offers all of these for free, no signup required." },
];


// ─── TYPES ─────────────────────────────────────────────────────────────────
interface Prompt {
  prompt: string;
  category: string;
  complexity: "beginner" | "intermediate" | "advanced";
  strength: number;
  hook: string;
  framework_used: string;
}

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const FRAMEWORKS = [
  { id: "RISEN",           label: "RISEN",           desc: "Role · Instructions · Steps · End Goal · Narrowing",  color: "#818cf8", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.3)"  },
  { id: "Chain-of-Thought",label: "Chain of Thought", desc: "Think step by step for deeper reasoning",            color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)"  },
  { id: "Few-Shot",        label: "Few-Shot",          desc: "Include examples for consistent output",             color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)"  },
  { id: "STAR",            label: "STAR",              desc: "Situation · Task · Action · Result",                  color: "#f472b6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)" },
  { id: "Zero-Shot",       label: "Zero-Shot",         desc: "Direct and precise — no examples needed",            color: "#38bdf8", bg: "rgba(56,189,248,0.1)",  border: "rgba(56,189,248,0.3)"  },
  { id: "APE",             label: "APE",               desc: "Action · Purpose · Expectation",                     color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)"  },
];

const CATEGORIES = [
  { id: "Marketing",   icon: Megaphone,      color: "#f472b6" },
  { id: "Writing",     icon: FileText,       color: "#818cf8" },
  { id: "Business",    icon: Briefcase,      color: "#fbbf24" },
  { id: "Code",        icon: Code2,          color: "#34d399" },
  { id: "Research",    icon: Search,         color: "#38bdf8" },
  { id: "Education",   icon: GraduationCap,  color: "#a78bfa" },
  { id: "Sales",       icon: BarChart3,      color: "#fb923c" },
  { id: "Social Media",icon: MessageSquare,  color: "#f87171" },
  { id: "Ideas",       icon: Lightbulb,      color: "#facc15" },
  { id: "Science",     icon: FlaskConical,   color: "#2dd4bf" },
];

const TONES = ["Professional","Casual","Creative","Technical","Persuasive","Inspirational","Witty","Educational"];

const MODELS = [
  {
    id: "ChatGPT",
    label: "ChatGPT",
    maker: "OpenAI",
    desc: "GPT-4o · Best overall",
    color: "#10a37f",
    bg: "rgba(16,163,127,0.1)",
    border: "rgba(16,163,127,0.3)",
    glow: "rgba(16,163,127,0.25)",
    openLabel: "Open in ChatGPT",
    openUrl: (p: string) => `https://chatgpt.com/?q=${encodeURIComponent(p)}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
      </svg>
    ),
  },
  {
    id: "Claude",
    label: "Claude",
    maker: "Anthropic",
    desc: "Claude 3.5 · Nuanced reasoning",
    color: "#d4793b",
    bg: "rgba(212,121,59,0.1)",
    border: "rgba(212,121,59,0.3)",
    glow: "rgba(212,121,59,0.25)",
    openLabel: "Copy & Open Claude",
    openUrl: (_p: string) => `https://claude.ai/new`,
    copyFirst: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.852-.17-.27.097-.122.401.048.136.16.16 1.85.137.996.08.527.017zM4.186 12.67l5.06-1.03.097-.255-.048-.157-.675-.048-2.886-.013-2.437-.075-1.864-.112-.306.083-.16.38.048.167.127.12 1.886.097.996.027zm.156-3.181l5.07 1.39.22-.13.09-.2-.62-.346-2.485-1.188-2.177-1.1-1.64-.947-.334-.06-.256.27.01.173.103.16 1.62.81.942.465.457.703zM6.24 7.035l4.696 3.04.245-.088.063-.222-1.18-1.07-2.12-1.74-1.907-1.56-1.605-.93-.343.017-.195.3.018.168.188.162zM9.714 4.956l3.974 4.46.258-.017.14-.2-1.645-2.21-1.568-1.935-1.218-1.61-.35-.152-.28.21.012.17.215.253.462.03zm4.386-1.955l2.534 5.666.267.045.19-.155-1.02-2.75-.968-2.36-.785-2.055-.35-.282-.262.157-.028.195.183.276.24 1.263zm4.003-.27l1.054 5.87.283.065.165-.177-.452-2.85-.427-2.53-.356-2.09-.284-.328-.286.117-.04.204.145.26.198 1.459zm3.594 1.485l-.24 5.87.277.12.222-.13.12-2.9.118-2.56.09-2.11-.18-.366-.31.06-.08.19.06.28-.078 1.546zm2.832 3.076l-1.452 5.684.227.18.255-.06.73-2.772.725-2.54.54-2.043-.06-.4-.328-.035-.115.163.027.272-.304 1.41zm1.805 4.447l-2.81 4.924.17.245.27-.01 1.416-2.487 1.257-2.313 1.057-1.822.07-.397-.284-.17-.142.11-.05.276-.954 1.323zM20.73 17.3l-3.898 3.86.098.278.268.056 1.984-1.847 1.76-1.78 1.536-1.41.211-.36-.21-.258-.164.054-.107.254-1.477 1.152z"/>
      </svg>
    ),
  },
  {
    id: "Gemini",
    label: "Gemini",
    maker: "Google",
    desc: "Gemini 1.5 · Multimodal",
    color: "#4285f4",
    bg: "rgba(66,133,244,0.1)",
    border: "rgba(66,133,244,0.3)",
    glow: "rgba(66,133,244,0.25)",
    openLabel: "Copy & Open Gemini",
    openUrl: (_p: string) => `https://gemini.google.com/app`,
    copyFirst: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.304 14.304 0 0 0 12 12 14.304 14.304 0 0 0-12 12z" fill="url(#gem-g)"/>
        <defs>
          <linearGradient id="gem-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4285f4"/>
            <stop offset="0.5" stopColor="#9b72cb"/>
            <stop offset="1" stopColor="#d96570"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: "Perplexity",
    label: "Perplexity",
    maker: "Perplexity AI",
    desc: "Real-time web search",
    color: "#20b2aa",
    bg: "rgba(32,178,170,0.1)",
    border: "rgba(32,178,170,0.3)",
    glow: "rgba(32,178,170,0.25)",
    openLabel: "Open in Perplexity",
    openUrl: (p: string) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-10 6.5a.75.75 0 0 0 .75-.75v-5.19l3.22 3.22a.75.75 0 1 0 1.06-1.06l-4.5-4.5a.75.75 0 0 0-1.06 0l-4.5 4.5a.75.75 0 1 0 1.06 1.06l3.22-3.22v5.19c0 .414.336.75.75.75zm0-13a.75.75 0 0 0-.75.75v5.19l-3.22-3.22a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0-1.06-1.06L12.75 11.44V6.25A.75.75 0 0 0 12 5.5z"/>
      </svg>
    ),
  },
  {
    id: "Grok",
    label: "Grok",
    maker: "xAI",
    desc: "xAI · Real-time X data",
    color: "#e5e7eb",
    bg: "rgba(229,231,235,0.07)",
    border: "rgba(229,231,235,0.2)",
    glow: "rgba(229,231,235,0.15)",
    openLabel: "Copy & Open Grok",
    openUrl: (_p: string) => `https://grok.com`,
    copyFirst: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    id: "Copilot",
    label: "Copilot",
    maker: "Microsoft",
    desc: "Microsoft 365 · Productivity",
    color: "#0078d4",
    bg: "rgba(0,120,212,0.1)",
    border: "rgba(0,120,212,0.3)",
    glow: "rgba(0,120,212,0.25)",
    openLabel: "Copy & Open Copilot",
    openUrl: (_p: string) => `https://copilot.microsoft.com`,
    copyFirst: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.4 0C5.1 0 0 5.1 0 11.4c0 3.3 1.4 6.3 3.7 8.4L11.4 24l7.7-4.2A11.4 11.4 0 0 0 22.8 11.4C22.8 5.1 17.7 0 11.4 0zm0 2.4c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z"/>
      </svg>
    ),
  },
] as const;

const EXAMPLES = [
  "Email marketing for SaaS startups",
  "Instagram content strategy for fitness brands",
  "Python web scraping tutorial",
  "Sales objection handling scripts",
  "SEO strategy for small business",
  "Product launch announcement",
  "Cold outreach email sequence",
  "Investor pitch deck narrative",
];

const COMPLEXITY_CONFIG: Record<string, { bg: string; border: string; text: string; label: string }> = {
  beginner:     { bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.3)",  text: "#34d399", label: "Beginner"     },
  intermediate: { bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.3)",  text: "#fbbf24", label: "Intermediate" },
  advanced:     { bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.3)", text: "#f87171", label: "Advanced"     },
};

// ─── STRENGTH BAR ────────────────────────────────────────────────────────────
function StrengthBar({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
  const color = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f87171";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 1s ease" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 28, textAlign: "right" }}>{pct}</span>
    </div>
  );
}

// ─── PROMPT CARD ─────────────────────────────────────────────────────────────
function PromptCard({ p, i, delay, modelId }: { p: Prompt; i: number; delay: number; modelId: string }) {
  const [copied, setCopied]     = useState(false);
  const [opened, setOpened]     = useState(false);
  const [faved,  setFaved]      = useState(false);
  const [visible, setVisible]   = useState(false);
  const cx = COMPLEXITY_CONFIG[p.complexity] || COMPLEXITY_CONFIG.intermediate;
  const fw = FRAMEWORKS.find(f => f.id === p.framework_used) || FRAMEWORKS[0];
  const mdl = MODELS.find(m => m.id === modelId) || MODELS[0];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  async function copy() {
    await navigator.clipboard.writeText(p.prompt);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }

  async function openInModel() {
    if ("copyFirst" in mdl && mdl.copyFirst) {
      await navigator.clipboard.writeText(p.prompt);
    }
    window.open(mdl.openUrl(p.prompt), "_blank");
    setOpened(true); setTimeout(() => setOpened(false), 2500);
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20, padding: "24px 26px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.4s ease, transform 0.4s ease, border-color 0.2s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${mdl.border}`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.2)", minWidth: 18 }}>#{i + 1}</span>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>{p.category}</span>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: cx.bg, border: `1px solid ${cx.border}`, color: cx.text }}>{cx.label}</span>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: fw.bg, border: `1px solid ${fw.border}`, color: fw.color }}>{fw.label}</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button onClick={() => setFaved(!faved)} style={{
            padding: "6px 8px", borderRadius: 8, border: "none", cursor: "pointer",
            background: faved ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.04)",
            color: faved ? "#fbbf24" : "rgba(255,255,255,0.25)", transition: "all 0.15s",
          }}>
            <Star size={14} fill={faved ? "currentColor" : "none"} />
          </button>
          <button onClick={openInModel} title={mdl.openLabel} style={{
            display: "flex", alignItems: "center", gap: 5, padding: "6px 11px", borderRadius: 8,
            border: `1px solid ${mdl.border}`, background: opened ? mdl.bg : `${mdl.bg}`,
            color: mdl.color, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "none"; }}
          >
            <ExternalLink size={12} />
            {opened ? ("copyFirst" in mdl && mdl.copyFirst ? "Copied!" : "Opened!") : mdl.label}
          </button>
          <button onClick={copy} style={{
            display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8,
            border: "1px solid rgba(99,102,241,0.3)", background: copied ? "rgba(52,211,153,0.12)" : "rgba(99,102,241,0.1)",
            color: copied ? "#34d399" : "#a5b4fc", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
          }}>
            {copied ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy</>}
          </button>
        </div>
      </div>

      {/* Hook label */}
      {p.hook && (
        <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.3)", marginBottom: 10, fontStyle: "italic" }}>
          {p.hook}
        </p>
      )}

      {/* Prompt text */}
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.82)", lineHeight: 1.78, margin: "0 0 16px" }}>{p.prompt}</p>

      {/* Strength */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>PROMPT STRENGTH</span>
        </div>
        <StrengthBar score={p.strength} />
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AIPromptGenerator() {
  const [topic,     setTopic]     = useState("");
  const [model,     setModel]     = useState("ChatGPT");
  const [framework, setFramework] = useState("RISEN");
  const [category,  setCategory]  = useState("Marketing");
  const [tone,      setTone]      = useState("Professional");
  const [count,     setCount]     = useState(10);
  const [prompts,   setPrompts]   = useState<Prompt[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [done,      setDone]      = useState(false);
  const [allCopied, setAllCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("promptcraft_pro_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.topic) setTopic(parsed.topic);
        if (parsed.model) setModel(parsed.model);
        if (parsed.framework) setFramework(parsed.framework);
        if (parsed.category) setCategory(parsed.category);
        if (parsed.tone) setTone(parsed.tone);
        if (parsed.prompts) { setPrompts(parsed.prompts); setDone(true); }
      } catch (e) { console.error("Failed to load state", e); }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    const state = { topic, model, framework, category, tone, prompts };
    localStorage.setItem("promptcraft_pro_state", JSON.stringify(state));
  }, [topic, model, framework, category, tone, prompts]);

  async function generate() {
    if (!topic.trim()) { setError("Enter a topic to generate prompts"); return; }
    setError(""); setLoading(true); setPrompts([]); setDone(false);
    try {
      const r = await fetch("/api/generate-prompts", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, model, framework, category, tone, count }),
      });
      const d = await r.json();
      if (!r.ok || d.error) { setError(d.error || "Generation failed — try again"); return; }
      setPrompts(d.prompts || []); setDone(true);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch { setError("Something went wrong — please try again"); }
    finally { setLoading(false); }
  }

  async function copyAll() {
    await navigator.clipboard.writeText(prompts.map((p, i) => `PROMPT ${i + 1} [${p.complexity.toUpperCase()}]\n${p.prompt}`).join("\n\n─────\n\n"));
    setAllCopied(true); setTimeout(() => setAllCopied(false), 2000);
  }

  function download() {
    const body = prompts.map((p, i) =>
      `═══ PROMPT ${i + 1} [${p.complexity.toUpperCase()}] · ${p.category} · Strength: ${p.strength}/100 ═══\n${p.prompt}`
    ).join("\n\n");
    const blob = new Blob([`AI PROMPTS: ${topic}\nFramework: ${framework} | Category: ${category} | Tone: ${tone}\nGenerated by ToolStack\n${"═".repeat(55)}\n\n${body}`], { type: "text/plain" });
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: `prompts-${topic.replace(/\s+/g, "-").toLowerCase()}.txt`,
    });
    a.click();
  }

  const card = { background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24 };
  const inputBase: React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 14, color: "white", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s" };

  return (
    <>
      {/* ── STRUCTURED DATA (SEO) ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AI Prompt Generator",
          "description": "Generate expert-level prompts for ChatGPT, Claude, and Gemini using RISEN, STAR, and Chain-of-Thought frameworks. Free, no signup.",
          "url": "https://toolstack.tech/tools/ai-prompt-generator",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web",
          "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": [
            "ChatGPT prompt generation",
            "Claude prompt generation",
            "Gemini prompt generation",
            "RISEN framework",
            "Chain-of-Thought framework",
            "STAR framework",
            "Prompt strength scoring",
            "One-click open in AI"
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "AI Tools", "item": "https://toolstack.tech/tools/category/ai" },
            { "@type": "ListItem", "position": 3, "name": "AI Prompt Generator", "item": "https://toolstack.tech/tools/ai-prompt-generator" },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a prompt framework?",
              "acceptedAnswer": { "@type": "Answer", "text": "A prompt framework is a structured template that tells an AI model exactly what role to play, what to do, how to think, and what format to return. Frameworks like RISEN and Chain-of-Thought consistently produce higher quality outputs than plain requests because they eliminate ambiguity and give the model complete context." }
            },
            {
              "@type": "Question",
              "name": "What is RISEN prompting?",
              "acceptedAnswer": { "@type": "Answer", "text": "RISEN stands for Role, Instructions, Steps, End Goal, and Narrowing. It is one of the most effective prompt engineering frameworks because it gives the AI complete context: who it is, what to do, how to do it, what the goal is, and what constraints to follow. RISEN prompts consistently outperform generic requests." }
            },
            {
              "@type": "Question",
              "name": "Is this AI prompt generator free?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes — 100% free, unlimited usage, no account required. All prompts are generated using GPT-4o, not a cheaper model. There is no paywall, no credit limit, and no email required." }
            },
            {
              "@type": "Question",
              "name": "Do these prompts work in Claude, Gemini, or Perplexity?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our prompt generator supports ChatGPT, Claude, Gemini, Perplexity, Grok, and Microsoft Copilot. Each model has a dedicated optimisation mode — Claude prompts use XML tags, Perplexity prompts include citation instructions, and Grok prompts are tuned for real-time data." }
            },
            {
              "@type": "Question",
              "name": "What does the prompt strength score mean?",
              "acceptedAnswer": { "@type": "Answer", "text": "Each prompt is rated 1-100 based on specificity, role clarity, output format instructions, and constraint quality. Scores above 80 indicate prompts that will reliably produce expert-level AI output. Scores below 60 suggest the prompt may need more specificity or context." }
            },
          ],
        },
      ]) }} />

      <div style={{ minHeight: "100vh", background: "#080810", paddingTop: 80 }}>

        {/* ── AMBIENT ── */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-5%", left: "15%",  width: 700, height: 500, background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",  borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "30%", right: "5%",  width: 500, height: 500, background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "30%", width: 600, height: 400, background: "radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 100px", position: "relative", zIndex: 1 }}>

          {/* ── BREADCRUMB ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40, paddingTop: 20 }}>
            <Link href="/" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>ToolStack</Link>
            <ChevronRight size={13} color="rgba(255,255,255,0.2)" />
            <Link href="/tools/category/ai" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>AI Tools</Link>
            <ChevronRight size={13} color="rgba(255,255,255,0.2)" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>AI Prompt Generator</span>
          </div>

          {/* ── HERO ── */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 48px rgba(99,102,241,0.45), 0 0 0 1px rgba(255,255,255,0.1) inset", flexShrink: 0 }}>
                <Sparkles size={30} color="white" strokeWidth={1.75} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { label: "AI-Powered",    bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.3)",  color: "#a5b4fc" },
                  { label: "Free Forever",  bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)", color: "#6ee7b7" },
                  { label: "No Signup",     bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" },
                  { label: "GPT-4o",        bg: "rgba(16,163,127,0.08)",  border: "rgba(16,163,127,0.25)", color: "#34d399" },
                ].map(b => (
                  <span key={b.label} style={{ fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 999, background: b.bg, border: `1px solid ${b.border}`, color: b.color }}>{b.label}</span>
                ))}
              </div>
            </div>

            <h1 style={{ fontSize: "clamp(40px,6.5vw,72px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 16, color: "white" }}>
              AI Prompt{" "}
              <span style={{ background: "linear-gradient(135deg,#818cf8 0%,#a78bfa 45%,#38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Generator</span>
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
              Generate expert-level prompts for ChatGPT, Claude, and Gemini using professional frameworks — RISEN, Chain-of-Thought, and STAR.
            </p>
          </div>

          {/* ── MAIN CARD ── */}
          <div style={{ ...card, padding: "36px 36px 32px", marginBottom: 16 }}>

            {/* ── MODEL SELECTOR ── */}
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 12 }}>
                Which AI are you using?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {MODELS.map(m => {
                  const sel = model === m.id;
                  return (
                    <button key={m.id} onClick={() => setModel(m.id)} style={{
                      padding: "13px 14px", borderRadius: 14, cursor: "pointer", textAlign: "left" as const,
                      transition: "all 0.18s",
                      background: sel ? m.bg : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${sel ? m.border : "rgba(255,255,255,0.07)"}`,
                      boxShadow: sel ? `0 0 20px ${m.glow}` : "none",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ color: sel ? m.color : "rgba(255,255,255,0.35)", display: "flex", flexShrink: 0 }}>{m.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: sel ? m.color : "rgba(255,255,255,0.65)" }}>{m.label}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.4, paddingLeft: 28 }}>{m.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Topic */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 10, letterSpacing: "0.01em" }}>
                What do you want prompts for? <span style={{ color: "#818cf8" }}>*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={e => { setTopic(e.target.value); setError(""); }}
                onKeyDown={e => e.key === "Enter" && generate()}
                placeholder="e.g. Email marketing for SaaS startups..."
                style={{ ...inputBase, width: "100%", padding: "17px 20px", fontSize: 16 }}
                onFocus={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.65)"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.1)"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Quick start:</span>
                {EXAMPLES.map(ex => (
                  <button key={ex} onClick={() => { setTopic(ex); setError(""); }}
                    style={{ fontSize: 12, padding: "4px 11px", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.38)", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.background = "rgba(99,102,241,0.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.38)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  >{ex}</button>
                ))}
              </div>
            </div>

            {/* ── FRAMEWORK SELECTOR ── */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 12 }}>
                Prompt Framework
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {FRAMEWORKS.map(f => (
                  <button key={f.id} onClick={() => setFramework(f.id)} style={{
                    padding: "12px 14px", borderRadius: 14, cursor: "pointer", textAlign: "left", transition: "all 0.18s",
                    background: framework === f.id ? f.bg : "rgba(255,255,255,0.03)",
                    border: `1.5px solid ${framework === f.id ? f.border : "rgba(255,255,255,0.07)"}`,
                    boxShadow: framework === f.id ? `0 0 20px ${f.bg}` : "none",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: framework === f.id ? f.color : "rgba(255,255,255,0.6)", marginBottom: 3 }}>{f.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.4 }}>{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── CATEGORY PILLS ── */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 12 }}>
                Category
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const sel = category === cat.id;
                  return (
                    <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 999, cursor: "pointer", transition: "all 0.15s",
                      background: sel ? `${cat.color}18` : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${sel ? `${cat.color}55` : "rgba(255,255,255,0.08)"}`,
                      color: sel ? cat.color : "rgba(255,255,255,0.4)",
                    }}>
                      <Icon size={13} />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── TONE + COUNT ROW ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 28 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 10 }}>Tone</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {TONES.map(t => (
                    <button key={t} onClick={() => setTone(t)} style={{
                      padding: "7px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                      background: tone === t ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${tone === t ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.07)"}`,
                      color: tone === t ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                    }}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 10 }}>Count</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {[5, 10, 15].map(n => (
                    <button key={n} onClick={() => setCount(n)} style={{
                      width: 52, padding: "8px 0", borderRadius: 10, border: count === n ? "1.5px solid rgba(99,102,241,0.5)" : "1.5px solid rgba(255,255,255,0.08)",
                      background: count === n ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                      color: count === n ? "#a5b4fc" : "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginBottom: 18, padding: "13px 17px", borderRadius: 12, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171", fontSize: 14, display: "flex", alignItems: "center", gap: 10 }}>
                ⚠ {error}
              </div>
            )}

            {/* Generate button */}
            <button onClick={generate} disabled={loading} style={{
              width: "100%", padding: "20px 32px", borderRadius: 18, border: "none", cursor: loading ? "not-allowed" : "pointer",
              background: loading ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#7c3aed 100%)",
              boxShadow: loading ? "none" : "0 8px 32px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.15) inset",
              color: "white", fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 48px rgba(99,102,241,0.65), 0 1px 0 rgba(255,255,255,0.15) inset"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; } }}
              onMouseLeave={e => { if (!loading) { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(99,102,241,0.45), 0 1px 0 rgba(255,255,255,0.15) inset"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; } }}
            >
              {loading
                ? <><RefreshCw size={20} style={{ animation: "spin 0.8s linear infinite" }} /> Generating {count} prompts with GPT-4o...</>
                : <><Zap size={20} /> Generate {count} Expert Prompts — Free</>
              }
            </button>
          </div>

          {/* ── LOADING ── */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ ...card, padding: 28 }}>
                  <div className="skeleton" style={{ height: 11, width: 120, marginBottom: 16 }} />
                  <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "85%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "70%" }} />
                </div>
              ))}
            </div>
          )}

          {/* ── RESULTS ── */}
          {done && prompts.length > 0 && (
            <div ref={resultsRef}>
              {/* Results header */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, margin: "8px 0 20px", padding: "0 4px" }}>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "white" }}>{prompts.length} prompts</span>
                  <span style={{ fontSize: 15, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>for "{topic}" · {framework} framework</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { label: allCopied ? "Copied!" : "Copy All", icon: allCopied ? <Check size={13} color="#34d399" /> : <Copy size={13} />, action: copyAll },
                    { label: "Download .txt", icon: <Download size={13} />, action: download },
                    { label: "Regenerate", icon: <RefreshCw size={13} />, action: generate, accent: true },
                  ].map(btn => (
                    <button key={btn.label} onClick={btn.action} style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                      background: btn.accent ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                      border: btn.accent ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.09)",
                      color: btn.accent ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = btn.accent ? "#a5b4fc" : "rgba(255,255,255,0.5)"; }}
                    >
                      {btn.icon}{btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {prompts.map((p, i) => (
                  <PromptCard key={i} p={p} i={i} delay={i * 80} modelId={model} />
                ))}
              </div>
            </div>
          )}

          {/* ── SEO GUIDE ── */}
          <div style={{ ...card, padding: "36px 36px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 20, letterSpacing: "-0.02em" }}>The Ultimate Guide to Prompt Engineering in 2026</h2>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
              <p>
                Prompt Engineering is defined as the strategic process of designing, refining, and optimizing natural language inputs to guide Large Language Models (LLMs) toward producing specific, high-accuracy outputs. As AI models like GPT-4o, Claude 3.5, and Gemini 1.5 become more sophisticated, the &quot;skill gap&quot; in prompt engineering is wider than ever. This generator is designed to bridge that gap using industry-recognized frameworks.
              </p>

              <div style={{ overflowX: "auto", margin: "10px 0" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                      <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#818cf8" }}>Framework</th>
                      <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Primary Use-Case</th>
                      <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Success Rate (2026)</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                    <tr>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>RISEN</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Business & Strategy</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>94%</td>
                    </tr>
                    <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Chain-of-Thought</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Complex Logic & Code</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>91%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Few-Shot</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Pattern Consistency</td>
                      <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>88%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Why Structured Frameworks Work</h3>
                <p>
                  Structured prompt frameworks like RISEN (Role, Instructions, Steps, End Goal, Narrowing) work because they force you to specify context, constraints, and desired output format explicitly. Vague prompts produce vague results. When you define the role, the task, and the output format, the model has far less room to hallucinate or go off-track. This generator automates that structure so you get consistently better output without needing to remember the framework details.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Chain-of-Thought: Unlocking Logical Reasoning</h3>
                <p>
                  For complex tasks like coding or strategic planning, <strong style={{ color: "white" }}>Chain-of-Thought (CoT)</strong> is essential. By forcing the AI to &quot;think step-by-step,&quot; you provide the model with a scratchpad for logic, which significantly increases accuracy in multi-step problem solving.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>3 Ways to Write Better AI Prompts Today</h3>
                <ul style={{ listStyleType: "circle", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                  <li><strong style={{ color: "white" }}>Be Verbose with Constraints:</strong> Tell the AI what NOT to do. This is often more important than telling it what to do.</li>
                  <li><strong style={{ color: "white" }}>Use Output Schemas:</strong> Request your data in specific formats like JSON, Markdown, or Bullet Points for easier integration.</li>
                  <li><strong style={{ color: "white" }}>Iterate, Don&apos;t Restart:</strong> Use the prompts generated here as a base and refine them through conversation with your AI of choice.</li>
                </ul>
              </div>

              <p>
                By utilizing ToolStack, you aren&apos;t just using an AI—you&apos;re <strong style={{ color: "white" }}>mastering it</strong>. Explore our 10+ prompt categories and start generating professional-grade results in seconds.
              </p>
            </div>
          </div>

          {/* ── SEO CONTENT ── */}
          <div style={{ marginTop: 80 }}>
            {/* Framework guide */}
            <div style={{ ...card, padding: "36px 36px", marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 6 }}>Which prompt framework should I use?</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 24, lineHeight: 1.6 }}>Each framework is designed for a different type of output. Pick the one that matches your goal.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
                {FRAMEWORKS.map(f => (
                  <div key={f.id} style={{ padding: "16px 18px", borderRadius: 14, background: f.bg, border: `1px solid ${f.border}` }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: f.color, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>


            <FaqPageSchema faqs={FAQS} />

            <HowToSchema
              name="AI Prompt Generator"
              description="Generate expert-level prompts for any AI model using structured frameworks — RISEN, Chain-of-Thought, and STAR."
              steps={[
                { name: "Enter your topic", text: "Describe what you need prompts for — email marketing, code, sales copy, or anything else." },
                { name: "Choose a framework and tone", text: "Select a prompt framework (RISEN, Chain-of-Thought, etc.) and tone that matches your goal." },
                { name: "Generate expert prompts", text: "Get multiple crafted prompts with strength scores, ready to copy or open directly in ChatGPT, Claude, or Gemini." },
              ]}
            />

            {/* FAQ */}
            <div style={{ ...card, padding: "36px 36px" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 24 }}>Frequently asked questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {[
                  { q: "What is a prompt framework?", a: "A prompt framework is a structured template that tells an AI model exactly what role to play, what to do, how to think, and what format to return. Frameworks like RISEN and Chain-of-Thought consistently produce higher quality outputs than plain requests because they eliminate ambiguity and give the model complete context." },
                  { q: "What is RISEN prompting?", a: "RISEN stands for Role, Instructions, Steps, End Goal, and Narrowing. It's one of the most effective prompt engineering frameworks because it gives the AI complete context: who it is, what to do, how to do it, what the goal is, and what constraints to follow. RISEN prompts consistently outperform generic requests." },
                  { q: "Is this AI prompt generator free?", a: "Yes — 100% free, unlimited usage, no account required. All prompts are generated using GPT-4o, not a cheaper model. There is no paywall, no credit limit, and no email required." },
                  { q: "Do these prompts work in Claude, Gemini, or Perplexity?", a: "Yes. Our prompt generator supports ChatGPT, Claude, Gemini, Perplexity, Grok, and Microsoft Copilot. Each model has a dedicated optimisation mode — Claude prompts use XML tags, Perplexity prompts include citation instructions, and Grok prompts are tuned for real-time data." },
                  { q: "What does the prompt strength score mean?", a: "Each prompt is rated 1-100 based on specificity, role clarity, output format instructions, and constraint quality. Scores above 80 indicate prompts that will reliably produce expert-level AI output. Scores below 60 suggest the prompt may need more specificity or context." },
                  { q: "What is the best AI prompt generator?", a: "The best AI prompt generator creates model-specific prompts using proven frameworks, not generic one-size-fits-all text. ToolStack's prompt generator uses GPT-4o, supports 6 prompt frameworks, and optimises for 6 different AI models including ChatGPT, Claude, Gemini, Perplexity, Grok, and Copilot." },
                ].map(faq => (
                  <div key={faq.q} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 22 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 8, margin: "0 0 8px" }}>{faq.q}</h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.72, margin: 0 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* More Tools */}
          {/* SEO Description */}
          <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>AI Prompt Generator: Free Online Tool</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                The quality of an AI's output is almost entirely determined by the quality of the prompt you give it. Vague prompts get vague answers. Generic prompts get generic answers. Our AI Prompt Generator helps you craft structured, specific, well-scoped prompts that get genuinely useful outputs from ChatGPT, Claude, Gemini, or any other LLM — whether you're using AI for writing, coding, research, analysis, or creative work.
              </p>
              <p style={{ marginBottom: 16 }}>
                Select your goal (write, code, explain, brainstorm, analyze, etc.), describe what you need in plain language, and the generator outputs a fully structured prompt with clear instructions, context, constraints, and format guidance. You can customize tone, audience, length, and format. The resulting prompt is ready to paste directly into any LLM interface.
              </p>
              <p style={{ marginBottom: 16 }}>
                Common uses include drafting effective cold emails and sales copy, generating structured code comments and documentation, creating detailed research briefs for AI-assisted literature reviews, writing social media caption variations with consistent brand voice, and breaking down complex tasks into AI-digestible step-by-step instructions.
              </p>
              <p style={{ marginBottom: 0 }}>
                Most "prompt templates" you find online are generic one-liners that don't account for your specific context. Ours generates fully contextualized prompts tailored to what you actually need — not a generic "act as a professional copywriter" template, but a prompt that knows your audience, your goal, and your constraints. Completely free, no signup required, unlimited prompt generations.
              </p>
            </div>
          </section>

          <MoreTools currentSlug="ai-prompt-generator" />

          <div style={{ padding: "0 0 80px" }} />

        </div>
      </div>
    </>
  );
}
