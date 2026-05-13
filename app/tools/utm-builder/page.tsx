"use client";

import { useState, useCallback, useEffect } from "react";
import { Link as LinkIcon, Copy, Check, Info, Trash2 } from "lucide-react";
import Link from "next/link";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const HOW_IT_WORKS = [
  { step: "01", title: "Target URL", body: "Paste the exact URL of the website or landing page you want to drive traffic to. This must be a valid HTTP or HTTPS address.", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.25)" },
  { step: "02", title: "Define Parameters", body: "Fill in the required fields (Source and Medium) and any optional identifiers like Campaign Name, Term, or Content to specify your traffic segment.", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
  { step: "03", title: "Copy & Track", body: "Copy the instantly generated UTM link and use it in your paid ads, email blasts, or social posts. Google Analytics will automatically parse the data.", color: "#f43f5e", bg: "rgba(244,63,94,0.1)", border: "rgba(244,63,94,0.25)" },
];

const FAQS = [
  {
    q: "What is a UTM parameter?",
    a: "UTM (Urchin Tracking Module) parameters are short text codes that you add to the end of a URL to track the performance of campaigns and marketing content. When a user clicks a link with UTM parameters, Google Analytics (or other tracking software) safely logs where that user came from.",
  },
  {
    q: "Do I need to fill out all the fields?",
    a: "No. Only the Target URL, Source (e.g., google, newsletter), and Medium (e.g., cpc, email) are strictly required for a basic tracking setup. The other fields (Name, Term, Content) are optional but highly recommended to get granular data on specific ad creatives or keywords.",
  },
  {
    q: "What's the difference between Source and Medium?",
    a: "The 'Source' is the specific place the traffic is coming from (e.g., 'facebook', 'newsletter_list_a', 'twitter'). The 'Medium' is the broader marketing channel or delivery method (e.g., 'cpc' for cost-per-click ads, 'social', 'email').",
  },
  {
    q: "Does adding UTM parameters affect SEO?",
    a: "Sometimes. While they don't explicitly hurt your rankings, Google considers example.com and example.com/?utm_source=... as duplicate content. Always make sure your webpage defines a canonical link tag pointing to the exact clean URL without parameters.",
  },
  {
    q: "Is this builder compatible with Google Analytics 4 (GA4)?",
    a: "Yes. GA4 flawlessly processes these exact five standard UTM parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content) automatically without any custom configuration required on your property.",
  },
  {
    q: "What is the best free UTM builder online?",
    a: "ToolStack's UTM Campaign Builder is a fast, free option that generates perfectly formatted tracking URLs in real-time with no signup required. It supports all five standard GA4 parameters, validates your URL automatically, and copies the final link with a single click.",
  },
];

export default function UTMBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    if (!url.trim()) {
      setGeneratedUrl("");
      return;
    }

    try {
      // Ensure url is valid and has protocol
      let finalUrlStr = url.trim();
      if (!finalUrlStr.startsWith("http://") && !finalUrlStr.startsWith("https://")) {
        finalUrlStr = "https://" + finalUrlStr;
      }
      
      const parsedUrl = new URL(finalUrlStr);
      
      // Add params
      const params = new URLSearchParams(parsedUrl.search);
      if (source.trim()) params.set("utm_source", source.trim());
      else params.delete("utm_source");
      
      if (medium.trim()) params.set("utm_medium", medium.trim());
      else params.delete("utm_medium");
      
      if (campaign.trim()) params.set("utm_campaign", campaign.trim());
      else params.delete("utm_campaign");
      
      if (term.trim()) params.set("utm_term", term.trim());
      else params.delete("utm_term");
      
      if (content.trim()) params.set("utm_content", content.trim());
      else params.delete("utm_content");

      parsedUrl.search = params.toString();
      setGeneratedUrl(parsedUrl.toString());
      
    } catch (e) {
      // Invalid URL base
      setGeneratedUrl("Waiting for a valid URL...");
    }
  }, [url, source, medium, campaign, term, content]);

  const handleCopy = () => {
    if (!generatedUrl || generatedUrl === "Waiting for a valid URL...") return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setUrl(""); setSource(""); setMedium(""); setCampaign(""); setTerm(""); setContent("");
  };

  const recordHistory = useCallback(() => {
    if (!url || !source) return;
    saveToHistory({
      toolName: "UTM Builder",
      slug: "utm-builder",
      data: { url: url.substring(0, 30), campaign: campaign || "None" },
    });
  }, [url, source, campaign]);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white",
    outline: "none", fontSize: 14, transition: "border 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 8,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient Glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "5%", left: "40%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 50%)", filter: "blur(100px)" }} />
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "UTM Campaign Builder",
          "description": "Instantly generate perfectly formatted campaign tracking URLs with UTM parameters for Google Analytics, Meta Ads, and more.",
          "url": "https://toolstack.tech/tools/utm-builder",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Marketing Tools", "item": "https://toolstack.tech/tools/category/marketing" },
            { "@type": "ListItem", "position": 3, "name": "UTM Builder", "item": "https://toolstack.tech/tools/utm-builder" },
          ],
        },
      ]) }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools/category/marketing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Marketing Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>UTM Builder</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#bfdbfe" }}>{"\u2713"} Real-Time Builder {"\u00b7"} GA4 Compatible {"\u00b7"} 100% Free</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Campaign URL <br />
            <span style={{ background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              UTM Builder.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Generate perfectly structured tracking links for your marketing campaigns to measure performance flawlessly in Google Analytics.
          </p>
        </div>

        {/* ── Output Box (Sticky-ish Top) ───────────────────────────────── */}
        <div style={{ 
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, 
          padding: "24px 32px", marginBottom: 32, display: "flex", flexDirection: "column", gap: 16 
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Generated Tracking Link</span>
            <button onClick={handleCopy} disabled={!generatedUrl || generatedUrl === "Waiting for a valid URL..."} style={{
              background: copied ? "#10b981" : "#3b82f6", border: "none", color: "white", padding: "8px 20px",
              borderRadius: 12, cursor: generatedUrl && generatedUrl !== "Waiting for a valid URL..." ? "pointer" : "default", opacity: generatedUrl && generatedUrl !== "Waiting for a valid URL..." ? 1 : 0.5,
              display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, transition: "all 0.2s"
            }}>
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy URL</>}
            </button>
          </div>
          <div style={{ 
            fontSize: 16, fontFamily: "monospace", color: generatedUrl === "Waiting for a valid URL..." ? "rgba(255,255,255,0.3)" : "#93c5fd",
            background: "rgba(0,0,0,0.5)", padding: 20, borderRadius: 16, wordBreak: "break-all", minHeight: 64
          }}>
            {generatedUrl || "Waiting for a valid URL..."}
          </div>
        </div>

        {/* ── Builder Form ────────────────────────────────────────────── */}
        <div style={{ 
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, 
          padding: "32px", marginBottom: 64 
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Parameter Configuration</h2>
            <button onClick={handleClear} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, fontSize: 13, transition: "color 0.2s"
            }}>
              <Trash2 size={14} /> Clear All
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Target URL */}
            <div>
              <label style={labelStyle}>Website Target URL <span style={{ color: "#ef4444" }}>*</span></label>
              <input 
                type="url" 
                value={url} 
                onChange={e => setUrl(e.target.value)} 
                onBlur={recordHistory}
                style={inputStyle} 
                placeholder="https://example.com/landing-page" 
              />
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, margin: "6px 0 0" }}>The full website URL that you want to share.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {/* Source */}
              <div>
                <label style={labelStyle}>Campaign Source <span style={{ color: "#ef4444" }}>*</span></label>
                <input 
                  type="text" 
                  value={source} 
                  onChange={e => setSource(e.target.value)} 
                  onBlur={recordHistory}
                  style={inputStyle} 
                  placeholder="e.g. google, newsletter, facebook" 
                />
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, margin: "6px 0 0" }}>The referrer (e.g., google, newsletter, facebook).</p>
              </div>

              {/* Medium */}
              <div>
                <label style={labelStyle}>Campaign Medium <span style={{ color: "#ef4444" }}>*</span></label>
                <input 
                  type="text" 
                  value={medium} 
                  onChange={e => setMedium(e.target.value)} 
                  onBlur={recordHistory}
                  style={inputStyle} 
                  placeholder="e.g. cpc, email, social" 
                />
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, margin: "6px 0 0" }}>The marketing medium (e.g., cpc, banner, email).</p>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px dashed rgba(255,255,255,0.1)", margin: "8px 0" }} />

            {/* Campaign Name */}
            <div>
              <label style={labelStyle}>Campaign Name</label>
              <input 
                type="text" 
                value={campaign} 
                onChange={e => setCampaign(e.target.value)} 
                onBlur={recordHistory}
                style={inputStyle} 
                placeholder="e.g. spring_sale_2026" 
              />
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, margin: "6px 0 0" }}>The specific product promotion or strategic campaign.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {/* Campaign Term */}
              <div>
                <label style={labelStyle}>Campaign Term</label>
                <input 
                  type="text" 
                  value={term} 
                  onChange={e => setTerm(e.target.value)} 
                  onBlur={recordHistory}
                  style={inputStyle} 
                  placeholder="e.g. running+shoes" 
                />
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, margin: "6px 0 0" }}>Identify the paid keywords (mostly used for Search Ads).</p>
              </div>

              {/* Campaign Content */}
              <div>
                <label style={labelStyle}>Campaign Content</label>
                <input 
                  type="text" 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  onBlur={recordHistory}
                  style={inputStyle} 
                  placeholder="e.g. logolink, textlink" 
                />
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 6, margin: "6px 0 0" }}>Use to differentiate A/B tests or multiple links on one page.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How to track efficiently</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Follow standard protocols to ensure accurate marketing data reporting.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} style={{ padding: "22px 20px", borderRadius: 18, background: item.bg, border: `1px solid ${item.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: item.color, marginBottom: 12 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content (Authority Bridge) ────────────────────── */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Marketing Attribution & Google Analytics 4 (GA4)</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            <strong style={{ color: "white" }}>Urchin Tracking Modules (UTMs)</strong> are the gold standard for tracking external marketing campaigns. Whether you are launching a cold email blast, a Facebook ad sprint, or partnering with an influencer, failing to attach a generated UTM link means you will lose critical source attribution in Google Analytics 4.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "The Attribution Problem", d: "Without UTM markers, standard 'Direct Traffic' becomes a black hole. When a user clicks a naked link from an SMS blast or an encrypted messaging app (like WhatsApp), GA4 drops the referrer entirely unless an explicit utm_source intercepts the process." },
              { t: "A/B Testing Precision", d: "By utilizing the utm_content field creatively, expert media buyers can isolate performance. For instance, linking the top navigation banner and the footer button on the same ad with different content tags will reveal exactly which CTA actually resulted in a sale." },
              { t: "Consistent Naming Conventions", d: "Algorithms are rigid. Ensure your team adopts a lower-case only, dash-spaced naming convention (e.g., spring-launch over Spring Launch). Inconsistency spreads your conversion data across hundreds of fractured rows in GA4 reporting." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                  width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" as const,
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: 0 }}>{faq.q}</h3>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, fontWeight: 300, flexShrink: 0, marginLeft: 12, transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: "0 22px 18px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <MoreTools currentSlug="utm-builder" />
        
      </div>
    </div>
  );
}
