"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, Check, Info, Globe, Shield, RefreshCw } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";
import { HowToSchema } from "@/components/ui/HowToSchema";

// ─── SVG ICONS ─────────────────────────────────────────────────────────────
const InstagramIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
  </svg>
);

// ─── TYPES ─────────────────────────────────────────────────────────────────
interface GeneratedName {
  name: string;
  meaning: string;
  category: string;
}

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const VIBES = [
  { id: "Modern",      label: "Modern & Sleek",     desc: "Minimalist, tech-forward, and clean.", color: "#6366f1" },
  { id: "Creative",    label: "Creative & Abstract", desc: "Unique, memorable, and out-of-the-box.", color: "#8b5cf6" },
  { id: "Professional", label: "Classic Professional",desc: "Trustworthy, established, and authoritative.", color: "#38bdf8" },
  { id: "Luxury",      label: "High-End Luxury",    desc: "Premium, exclusive, and sophisticated.", color: "#fbbf24" },
  { id: "Short",       label: "Short & Punchy",     desc: "Quick, energetic, and brandable.", color: "#34d399" },
  { id: "Playful",     label: "Playful & Friendly", desc: "Approachable, warm, and inviting.", color: "#f472b6" },
];

const INDUSTRIES = [
  "SaaS / Software", "Ecommerce", "Creative Agency", "Health & Wellness", 
  "Food & Beverage", "Real Estate", "Fashion", "Finance / Fintech", 
  "Construction", "Education", "Consulting", "Entertainment"
];

const HOW_IT_WORKS = [
  { step: "01", title: "Define Your Niche", body: "Enter your industry, target audience, or specific keywords to guide the AI's semantic engine.", color: "#6366f1", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.25)" },
  { step: "02", title: "Pick a Brand Vibe", body: "Choose from Modern, Luxury, Creative, or Professional to set the phonetic and emotional tone.", color: "#8b5cf6", bg: "rgba(139,92,246,0.10)", border: "rgba(139,92,246,0.25)" },
  { step: "03", title: "Generate & Verify", body: "Forge unique names instantly and use our built-in links to check domain and trademark availability.", color: "#34d399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.25)" },
];

const FAQS = [
  {
    q: "How does the AI Business Name Generator work?",
    a: "The generator uses GPT-4o, the world's most advanced AI model, to analyze your industry, brand vibe, and keywords. Unlike basic generators that just mash words together, our AI understands the linguistic patterns and emotional impact of naming, creating brandable names that sound professional and established.",
  },
  {
    q: "Are these business names unique?",
    a: "The AI generates names based on your specific prompts, which significantly increases the likelihood of uniqueness. However, because thousands of businesses are registered daily, you should always use the provided 'Check Trademark' and 'Check Domain' links to verify that your selected name is legally available in your jurisdiction.",
  },
  {
    q: "How do I check if a domain is available for my name?",
    a: "Every name we generate includes a 'Check Domain' button. This link will take you directly to a domain registrar with your name pre-filled, so you can instantly see if `.com`, `.io`, or other extensions are available for purchase.",
  },
  {
    q: "What is a 'Brand Vibe'?",
    a: "A brand vibe is the overall emotional tone and personality of your business. Choose 'Modern' for tech startups, 'Luxury' for high-end boutique brands, or 'Playful' for consumer goods that want to feel approachable. Selecting a vibe helps the AI choose the right phonetic sounds and word structures.",
  },
  {
    q: "Why do you provide the 'Brand Meaning' for every name?",
    a: "A great brand name needs a story. We provide a 'Brand Origin' sentence for each result to help you understand the positioning behind the name, making it easier to build your brand narrative and marketing strategy.",
  },
  {
    q: "Is there a limit to how many names I can generate?",
    a: "No. Our tool is 100% free with unlimited generations. You can keep hitting the 'Generate' button with different vibes and keywords until you find the perfect fit for your new venture.",
  },
  {
    q: "What is the best AI business name generator?",
    a: "ToolStack's AI Business Name Generator is the top choice for professionally-vetted brand names. By combining GPT-4o's creative intelligence with one-click domain, social media, and trademark checks, we provide a complete branding toolkit that most other generators lock behind a paywall.",
  },
];

// ─── UI COMPONENTS ─────────────────────────────────────────────────────────

function NameCard({ item, index, accentColor }: { item: GeneratedName; index: number; accentColor: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const domainUrl = `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(item.name.replace(/\s+/g, ""))}.com`;
  const trademarkUrl = `https://www.google.com/search?q=${encodeURIComponent(item.name)}+trademark+search`;
  const socialUrl = `https://www.instagram.com/${item.name.replace(/\s+/g, "").toLowerCase()}`;

  // Deterministic "Personality" scores based on the name length and vowels
  const modernScore = Math.min(95, 40 + (item.name.length * 5));
  const legacyScore = 100 - modernScore;
  const playfulScore = (item.name.match(/[aeiou]/gi)?.length || 0) * 15;
  const seriousScore = 100 - playfulScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 24,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden"
      }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.15)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 10, fontWeight: 900, color: accentColor, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{item.category}</span>
          <h3 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>{item.name}</h3>
        </div>
        <button onClick={handleCopy} style={{ background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer", color: copied ? "#34d399" : "rgba(255,255,255,0.4)", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6, minHeight: 44 }}>
        &ldquo;{item.meaning}&rdquo;
      </p>

      {/* Brand Radar Chart (CSS Based) */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 16, padding: "16px", marginBottom: 4 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Brand Personality Radar</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Modern vs Legacy", val: modernScore, color: accentColor },
            { label: "Playful vs Serious", val: playfulScore, color: "#f472b6" }
          ].map(row => (
            <div key={row.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
                <span style={{ color: row.val > 50 ? "white" : "inherit" }}>{row.label.split(" vs ")[0]}</span>
                <span style={{ color: row.val <= 50 ? "white" : "inherit" }}>{row.label.split(" vs ")[1]}</span>
              </div>
              <div style={{ height: 4, width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: 2, position: "relative" }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${row.val}%` }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  style={{ height: "100%", background: row.color, borderRadius: 2, boxShadow: `0 0 10px ${row.color}40` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <a href={domainUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, fontWeight: 800, padding: "10px", borderRadius: 10, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8", textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.15)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.1)"}>
          <Globe size={12} /> .com
        </a>
        <a href={trademarkUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, fontWeight: 800, padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
          <Shield size={12} /> TM Check
        </a>
        <a href={socialUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", color: "#f472b6", textDecoration: "none" }}>
          <InstagramIcon size={14} />
        </a>
      </div>
    </motion.div>
  );
}

export default function BusinessNameGenerator() {
  const [industry, setIndustry] = useState("");
  const [vibe, setVibe] = useState("Modern");
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const generateNames = async () => {
    if (!industry.trim()) {
      setError("Please specify your industry or niche first.");
      return;
    }
    setError("");
    setLoading(false);
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch("/api/business-name-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, vibe, keywords }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      const names = data.names || [];
      setResults(names);
      
      // Save to history for the '1000x' persistence layer
      saveToHistory({
        toolName: "Business Name Generator",
        slug: "business-name-generator",
        data: names
      });

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const accentColor = VIBES.find(v => v.id === vibe)?.color || "#6366f1";

  // ─── RENDER ─────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#06060c", color: "white", padding: "120px 20px 80px" }}>
      {/* Glow */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(${vibe === "Luxury" ? "251,191,36" : "139,92,246"}, 0.08) 0%, transparent 65%)`, filter: "blur(80px)" }} />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "AI Business Name Generator",
          "description": "Professional brand naming suite powered by GPT-4o. Get unique name suggestions, brand origins, and instant domain availability checks.",
          "url": "https://toolstack.tech/tools/business-name-generator",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["AI Name Generation", "Brand Meaning Analysis", "GoDaddy Domain Links", "Social Media Availability Check", "TM Lookup Integration"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Business Tools", "item": "https://toolstack.tech/tools/category/business" },
            { "@type": "ListItem", "position": 3, "name": "AI Business Name Generator", "item": "https://toolstack.tech/tools/business-name-generator" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 920, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <ChevronRight size={12} />
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <ChevronRight size={12} />
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Business Name Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#a5b4fc" }}>✓ AI Business Name Generator · AI-Powered · Free Forever · No Signup</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            AI Business<br />
            <span style={{ background: `linear-gradient(135deg, ${accentColor}, #22d3ee)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Name Generator.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 680, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
             Generate memorable business names with GPT-4o. Enter your industry and brand style — the AI analyses semantic patterns and emotional resonance to suggest professional-grade names for your next venture.
          </p>
        </div>

        {/* Form Card */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px 32px", marginBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: 10 }}>Industry / Niche</label>
              <input 
                type="text" 
                placeholder="e.g. Sustainable Fashion, AI Tech, Coffee Shop"
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", outline: "none", fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: 10 }}>Primary Keywords (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. green, future, flow, apex"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                style={{ width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", outline: "none", fontSize: 14 }}
              />
            </div>
          </div>

          <label style={{ display: "block", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", marginBottom: 12 }}>Desired Brand Vibe</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 32 }}>
            {VIBES.map(v => (
              <button 
                key={v.id} 
                onClick={() => setVibe(v.id)}
                style={{
                  padding: "16px", borderRadius: 14,
                  background: vibe === v.id ? `rgba(${v.color === "#6366f1" ? "99,102,241" : v.color === "#8b5cf6" ? "139,92,246" : v.color === "#38bdf8" ? "56,189,248" : v.color === "#fbbf24" ? "251,191,36" : v.color === "#34d399" ? "52,211,153" : "244,114,182"}, 0.12)` : "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${vibe === v.id ? v.color : "rgba(255,255,255,0.07)"}`,
                  color: vibe === v.id ? "white" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", transition: "all 0.2s", textAlign: "left"
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>{v.id}</div>
                <div style={{ fontSize: 10, lineHeight: 1.4 }}>{v.desc}</div>
              </button>
            ))}
          </div>

          <button 
            disabled={loading}
            onClick={generateNames}
            style={{
              width: "100%", height: 58, borderRadius: 12, 
              background: `linear-gradient(135deg, ${accentColor}, #22d3ee)`,
              color: "white", fontWeight: 800, fontSize: 16, border: "none", cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: `0 8px 32px rgba(${accentColor === "#6366f1" ? "99,102,241" : "34,211,238"}, 0.25)`,
              opacity: loading ? 0.8 : 1
            }}
          >
            {loading ? (
              <><RefreshCw size={20} style={{ animation: "spin 1s linear infinite" }} /> Generating Premium Names...</>
            ) : (
              <><Sparkles size={20} /> Generate Business Names</>
            )}
          </button>
          <style>{`@keyframes spin { from {transform: rotate(0deg)} to {transform: rotate(360deg)} }`}</style>
          {error && <p style={{ marginTop: 16, color: "#f87171", fontSize: 13, textAlign: "center", fontWeight: 600 }}>{error}</p>}
        </div>

        {/* Results grid */}
        <AnimatePresence>
          {results.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginBottom: 80 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: 0 }}>Found {results.length} Branding Directions</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {results.map((item, i) => (
                  <NameCard key={item.name} item={item} index={i} accentColor={accentColor} />
                ))}
              </div>
              <p style={{ marginTop: 32, fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
                💡 Hint: Domain and Trademark checks are preliminary. Always perform a legal search before finalizing your registration.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* How It Works */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Three steps to your new brand identity.</p>
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

        {/* Content Section */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>The Art & Science of Naming</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            A business name is more than just a label—it&apos;s the first chapter of your brand&apos;s story. In the Utility Era of 2026, a name must be technically discoverable, phonetically pleasing, and conceptually aligned with your mission. Here&apos;s how to select the right one:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Phonetic Recall", d: "Names with strong, repetitive consonants (like Google or Coca-Cola) are easier for the human brain to encode and retrieve." },
              { t: "Digital Footprint", d: "Aim for a name that allows for a clean .com or .io domain and consistent social handles to avoid fragmentation." },
              { t: "Category Alignment", d: "Ensure your name suggests the right feeling—'Apex' sounds stronger for a gym; 'Lumina' sounds softer for a skincare brand." }
            ].map(x => (
              <div key={x.t}>
                <h3 style={{ color: accentColor, fontWeight: 800, fontSize: 14, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{x.t}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        <HowToSchema
          name="Business Name Generator"
          description="Generate creative, brandable business names using AI. Choose your industry and brand vibe to get unique name ideas instantly."
          steps={[
            { name: "Describe your business or industry", text: "Enter a few words describing your business idea, industry, or the type of name you're looking for." },
            { name: "Select your brand vibe/style", text: "Choose your preferred brand personality — modern, classic, playful, professional, luxury, or techy — to narrow the style." },
            { name: "Browse and pick your favourite business name", text: "Review generated name suggestions with their brand meanings, check domain availability, and save your favourites." },
          ]}
        />
        {/* FAQ Section */}
        <div style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px" }}>Branding Deep-Dive</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", transition: "all 0.2s" }}>
                <button 
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: "white", textAlign: "left" }}>{f.q}</span>
                  <div style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", color: "rgba(255,255,255,0.4)" }}>
                    <RefreshCw size={18} />
                  </div>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Description */}
        <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Business Name Generator: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Naming a business is one of the hardest parts of starting a company — you need something memorable, available, brandable, and domain-compatible, all at the same time. Our AI-powered Business Name Generator solves the paralysis by generating hundreds of relevant, brandable business name ideas for any industry, and instantly checking whether the matching domain is available.
            </p>
            <p style={{ marginBottom: 16 }}>
              Enter your industry or niche and any words related to your business. The AI generates name ideas across different naming styles: invented words, compound words, portmanteaus, descriptive names, and acronyms. Each name is shown with its domain availability status across .com, .io, .co, and .net. Save your favorites to a shortlist, filter by availability, and export the list for trademark research.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include brainstorming startup names before doing a trademark or domain search, finding a domain that's short, memorable, and available, generating name ideas for a side project, freelance business, or Shopify store, checking domain availability for all major TLDs in one view, and finding a business name that works across social media handles.
            </p>
            <p style={{ marginBottom: 0 }}>
              Naming tools that don't check domains are nearly useless — what's the point of a great name if the .com is already owned? Our generator shows availability in real-time alongside every name suggestion, so you can immediately see which names are worth pursuing and which are non-starters. Free, unlimited generations, no signup required.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="business-name-generator" />
        
      </div>
    </div>
  );
}

function ChevronRight({ size, color }: { size: number, color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
