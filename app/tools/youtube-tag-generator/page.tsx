"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, Check, Layout, RefreshCw, Trash2, BarChart3, Info } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";

// ─── SVG ICONS ─────────────────────────────────────────────────────────────
const YoutubeIcon = ({ size = 22, color = "currentColor", fill = "none" }: { size?: number, color?: string, fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" stroke={fill === "currentColor" ? "none" : color} fill={fill === "none" ? "none" : fill} />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={fill === "none" ? color : "white"} stroke="none" />
  </svg>
);

// ─── TYPES ─────────────────────────────────────────────────────────────────
interface SEOTrinity {
  tags: {
    specific: string[];
    category: string[];
    broad: string[];
  };
  commaString: string;
  descriptionHooks: string[];
  seoScore: number;
  primaryKeyword: string;
}

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { step: "01", title: "Target Keywords", body: "Enter your video's primary topic, focusing on high-intent search terms your audience uses.", color: "#ff0000", bg: "rgba(255,0,0,0.10)", border: "rgba(255,0,0,0.25)" },
  { step: "02", title: "Contextual Analysis", body: "Our engine analyzes the semantic relationships between your niche and trending YouTube clusters.", color: "#ff4d4d", bg: "rgba(255,102,102,0.10)", border: "rgba(255,102,102,0.25)" },
  { step: "03", title: "Optimize & Rank", body: "Generate optimized tag sets, copy them in one click, and watch your video climb the search results.", color: "#34d399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.25)" },
];

const FAQS = [
  {
    q: "How many tags should I use on a YouTube video?",
    a: "YouTube allows up to 500 characters in the tag section. For optimal ranking in 2026, we recommend using 10–15 highly relevant tags that cover your primary, secondary, and long-tail keywords. Quality and relevance are more important than hitting the character limit.",
  },
  {
    q: "Do YouTube tags still help with SEO?",
    a: "Yes. While titles and descriptions are primary signals, tags help the YouTube algorithm understand the 'semantic context' of your video and prevent it from being miscategorized. They are particularly effective for reaching 'Up Next' and 'Search' placements.",
  },
  {
    q: "What is an SEO Authority Score?",
    a: "Our proprietary SEO Authority Score (0-100) measures how well your current tags match the semantic intent of your primary keyword. A score above 85 indicates your video is perfectly positioned for discovery in competitive search results.",
  },
  {
    q: "Why should I use long-tail tags?",
    a: "Long-tail tags (e.g., 'how to bake sourdough bread for beginners' instead of just 'baking') have lower competition and higher intent. These tags help you rank faster and find a more engaged audience who are looking for exactly what your video provides.",
  },
  {
    q: "Is this tag generator free to use?",
    a: "Yes. VibeSEO is 100% free with unlimited generations. No signup or credit card is required. We want to provide the same professional-grade SEO audit tools to independent creators that major studios pay thousands for.",
  },
  {
    q: "What is the best YouTube tag generator?",
    a: "ToolStack's VibeSEO YouTube Engine is the top-rated tool for 2026. By using GPT-4o to analyze semantic keyword clusters and providing a real-time SEO Authority Score, we give creators a measurable advantage over generic keyword mashers.",
  },
];

// ─── UI COMPONENTS ─────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title, color }: { icon: any, title: string, color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
        <Icon size={18} />
      </div>
      <h3 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "white", margin: 0 }}>{title}</h3>
    </div>
  );
}

function CopyBox({ label, content, color }: { label: string, content: string, color: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{label}</span>
        <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#34d399" : color, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
          {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, wordBreak: "break-all" }}>{content}</div>
    </div>
  );
}

export default function YouTubeTagGenerator() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [type, setType] = useState("Standard Video");
  const [results, setResults] = useState<SEOTrinity | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const generateSEO = async () => {
    if (!title.trim()) {
      setError("Please enter your video title first.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/youtube-tag-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, context, type }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResults(data);
      
      // Save to history for the '1000x' persistence layer
      saveToHistory({
        toolName: "YouTube Tag Generator",
        slug: "youtube-tag-generator",
        data: data
      });

    } catch (err: any) {
      setError(err.message || "Failed to generate SEO data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setTitle("");
    setContext("");
    setResults(null);
    setError("");
  };

  const youtubeRed = "#ff0000";

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", color: "white", padding: "120px 20px 80px" }}>
      {/* Dynamic Background Glow */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)", filter: "blur(90px)" }} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "AI YouTube Tag Generator",
          "description": "The ultimate YouTube SEO optimizer. Generate high-ranking tags and description hooks powered by GPT-4o.",
          "url": "https://toolstack.tech/tools/youtube-tag-generator",
          "applicationCategory": "SEOApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["AI Tag Generation", "Description Hook Optimization", "Keyword Strength Scoring", "Context Anchor Logic"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "SEO Tools", "item": "https://toolstack.tech/tools?category=seo" },
            { "@type": "ListItem", "position": 3, "name": "YouTube Tag Generator", "item": "https://toolstack.tech/tools/youtube-tag-generator" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto" }}>
        {/* Header Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>SEO Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>YouTube Tag Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(255,0,0,0.12)", border: "1px solid rgba(255,0,0,0.3)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#fca5a5" }}>✓ VibeSEO YouTube Engine · AI-Powered · Free Forever · No Signup</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            YouTube Tag<br />
            <span style={{ background: "linear-gradient(135deg, #ff0000 0%, #ff4d4d 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              SEO Engine.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 580, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
             The professional YouTube algorithm mastery suite. VibeSEO generates AI-curated keyword clusters and provides real-time authority scoring for your content.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, alignItems: "start" }}>
          
          {/* Input Panel */}
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px" }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Video Title</label>
              <textarea 
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. How to Build a PC in 2026 (Beginner Guide)"
                style={{ width: "100%", height: 80, padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, color: "white", outline: "none", fontSize: 15, resize: "none", transition: "border-color 0.2s" }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Topic / Additional Context</label>
              <input 
                type="text"
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="Keywords or brief description..."
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", outline: "none", fontSize: 15 }}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Content Focus</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {["Standard Video", "YouTube Shorts"].map(t => (
                  <button 
                    key={t}
                    onClick={() => setType(t)}
                    style={{ padding: "12px", borderRadius: 10, background: type === t ? "rgba(255,0,0,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${type === t ? youtubeRed : "rgba(255,255,255,0.08)"}`, color: type === t ? "white" : "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button 
                onClick={generateSEO}
                disabled={loading}
                style={{ flex: 2, height: 58, borderRadius: 14, background: loading ? "rgba(255,0,0,0.5)" : youtubeRed, color: "white", fontWeight: 800, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "transform 0.1s" }}
                onMouseDown={e => { e.currentTarget.style.transform = "scale(0.98)"; }}
                onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                {loading ? <><RefreshCw size={18} style={{ animation: "spin 1s linear infinite" }} /> Analysing SEO...</> : <><Sparkles size={18} /> Generate Tags</>}
              </button>
              <button onClick={clearAll} style={{ width: 58, height: 58, borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.5)" }} title="Clear">
                <Trash2 size={20} />
              </button>
            </div>
            {error && <p style={{ marginTop: 16, color: "#f87171", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{error}</p>}
          </div>

          {/* Results Panel */}
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "32px", minHeight: results ? "auto" : 480, display: "flex", flexDirection: "column", backdropFilter: "blur(10px)" }}>
            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <BarChart3 size={32} />
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 8 }}>Ready for Optimization</h4>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 240 }}>Enter your video details and hit generate to see your SEO Trinity.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* SEO Score Banner */}
                  <div style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 20, padding: "24px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: `${results.seoScore}%`, background: "linear-gradient(90deg, rgba(52,211,153,0.05) 0%, rgba(52,211,153,0.1) 100%)", zIndex: 0 }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em", color: "#34d399", marginBottom: 6 }}>Search Authority Score</div>
                      <div style={{ fontSize: 42, fontWeight: 900, color: "white", lineHeight: 1 }}>{results.seoScore}<span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>/100</span></div>
                    </div>
                    <div style={{ position: "relative", zIndex: 1, textAlign: "right" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>Primary Keyword Anchor</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "white", padding: "6px 14px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>{results.primaryKeyword}</div>
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <SectionHeader icon={Layout} title="Direct-to-Studio Tags" color={youtubeRed} />
                    <CopyBox label="Comma-Separated List (Ready for Paste)" content={results.commaString} color={youtubeRed} />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: 28 }}>
                     <SectionHeader icon={Sparkles} title="High-CTR Description Hooks" color="#a78bfa" />
                     {results.descriptionHooks.map((h, i) => (
                       <CopyBox key={i} label={`Hook Strategy: ${["Benefit-First", "Curiosity Loop", "Direct Search"][i] || "Optimized"}`} content={h} color="#a78bfa" />
                     ))}
                  </motion.div>

                  {/* Tag Diet Preview */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <SectionHeader icon={Info} title="Algorithm Context Analysis" color="#818cf8" />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {results.tags.specific.slice(0, 5).map(t => <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc" }}>#{t}</span>)}
                      {results.tags.category.slice(0, 3).map(t => <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>{t}</span>)}
                    </div>
                    
                    {/* Visual Diet Bar */}
                    <div style={{ height: 6, width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: 3, display: "flex", overflow: "hidden" }}>
                      <div style={{ width: "40%", background: "#818cf8", height: "100%" }} aria-label="Specific Context" />
                      <div style={{ width: "35%", background: "#a78bfa", height: "100%" }} aria-label="Niche Authority" />
                      <div style={{ width: "25%", background: "rgba(255,255,255,0.2)", height: "100%" }} aria-label="Broad Reach" />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <span>Specific (40%)</span>
                      <span>Category (35%)</span>
                      <span>Broad (25%)</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* How It Works */}
        <section style={{ marginTop: 80, marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Three steps to YouTube search dominance.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} style={{ padding: "22px 20px", borderRadius: 18, background: item.bg, border: `1px solid ${item.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: item.color, marginBottom: 12 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content Section */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Mastering the 2026 YouTube Algorithm</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            YouTube SEO is no longer just about keyword stuffing—it&apos;s about <strong style={{ color: "white" }}>semantic relevance</strong>. In 2026, the algorithm uses natural language processing to cluster videos into niche interest graphs. Our VibeSEO engine is built to align your metadata with these clusters.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Semantic Clustering", d: "YouTube groups videos by meaning. Our AI selects tags that act as bridge keywords to high-authority clusters in your niche." },
              { t: "Audience Intent", d: "We differentiate between 'how-to' seekers and 'entertainment' seekers, tuning your tags to the most likely viewer state." },
              { t: "Reach-Tier Strategy", d: "A mix of high-volume and long-tail tags ensures you capture both massive search spikes and steady organic traffic." }
            ].map(x => (
              <div key={x.t}>
                <h3 style={{ color: "#ff4d4d", fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{x.t}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: 80, marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", textAlign: "center", marginBottom: 40 }}>Common SEO Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 800, margin: "0 auto" }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                <button 
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{f.q}</span>
                  <div style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: youtubeRed }}>
                    <YoutubeIcon size={16} fill="currentColor" />
                  </div>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <MoreTools currentSlug="youtube-tag-generator" />
        
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      ` }} />
    </div>
  );
}
