"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const TONES = [
  { id: "professional", label: "💼 Professional", desc: "Formal, authoritative, confident" },
  { id: "enthusiastic", label: "⚡ Enthusiastic",  desc: "Energetic, warm, passionate"     },
  { id: "concise",      label: "✦ Concise",        desc: "Direct, tight, under 250 words"  },
  { id: "creative",     label: "✿ Creative",       desc: "Distinctive voice, memorable hook" },
];

const FAQS = [
  {
    q: "Is this cover letter generator really free with unlimited uses?",
    a: "Yes — 100% free, no signup, and unlimited generations. Most competitors cap free users at 3 per day (InterviewPal), 2 total (Kickresume) or lock downloads behind a subscription (Zety). ToolStack's cover letter generator uses GPT-4o and has no limits.",
  },
  {
    q: "How is this different from Grammarly, Zety or Kickresume?",
    a: "Grammarly helps edit letters but won't write them from scratch. Zety requires creating a full resume profile and locks downloads behind a paywall. Kickresume gives you 2 free letters total. ToolStack's generator requires no account, no resume upload, no subscription — just your job details and you get a personalised letter in seconds.",
  },
  {
    q: "What information do I need to generate a cover letter?",
    a: "Three things: the job title you're applying for, the company name, and a brief description of your relevant background — your experience, key achievements and skills. The more specific your background description, the more personalised and compelling the letter will be. Adding the hiring manager's name is optional but improves the greeting.",
  },
  {
    q: "Which tone mode should I use?",
    a: "Professional is safe for most corporate roles, banking, law, consulting and senior positions. Enthusiastic works well for startups, creative agencies, sales roles and roles where energy and passion matter. Concise is ideal when a role explicitly asks for brief applications or you're applying for senior executive roles. Creative suits design, marketing, content and media roles where standing out matters.",
  },
  {
    q: "Should I edit the AI-generated cover letter?",
    a: "Yes — always. The AI creates a strong, structured first draft based on the information you provide. You should personalise it further with specific company knowledge (a recent product launch, a value you admire), exact job requirements from the posting, and your own voice. A cover letter that reads as genuinely personal always outperforms a template, however good.",
  },
  {
    q: "How do I make my cover letter stand out?",
    a: "Three things make the biggest difference: a strong first sentence (never 'I am writing to apply for...'), specific achievements with numbers where possible (e.g. 'increased sales by 34%' rather than 'drove revenue'), and a tailored closing that shows you've researched the company. Use the generated letter as a base and layer in these specifics yourself.",
  },
  {
    q: "What is the best free AI cover letter generator?",
    a: "ToolStack's cover letter generator stands out for being completely free with unlimited generations, requiring no signup or resume upload, using GPT-4o (more capable than most competitors' models), offering 4 tone modes, and producing letters that don't start with generic clichés. It's the most accessible and flexible free option available.",
  },
];

export default function CoverLetterPage() {
  const [jobTitle,       setJobTitle]       = useState("");
  const [company,        setCompany]        = useState("");
  const [background,     setBackground]     = useState("");
  const [hiringManager,  setHiringManager]  = useState("");
  const [tone,           setTone]           = useState("professional");
  const [letter,         setLetter]         = useState("");
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState("");
  const [copied,         setCopied]         = useState(false);
  const [openFaq,        setOpenFaq]        = useState<number | null>(null);

  const wordCount = letter.trim() ? letter.trim().split(/\s+/).length : 0;
  const canGenerate = jobTitle.trim() && company.trim() && background.trim().length >= 20;

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return;
    setLoading(true);
    setError("");
    setLetter("");
    setCopied(false);
    try {
      const res = await fetch("/api/cover-letter-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, company, background, tone, hiringManager }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      setLetter(data.letter ?? "");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [jobTitle, company, background, tone, hiringManager, canGenerate]);

  const handleCopy = () => {
    if (!letter) return;
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accent    = "#f43f5e";
  const accentRgb = "244,63,94";

  const fieldStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 10, color: "white",
    fontSize: 14, lineHeight: 1.6,
    outline: "none", fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.55)",
    marginBottom: 6, display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      {/* Glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.1) 0%, transparent 65%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Cover Letter Generator",
          "description": "Free AI cover letter generator powered by GPT-4o. Enter your job title, company, and background to get a personalised cover letter in seconds. 4 tone modes, no signup.",
          "url": "https://toolstack.tech/tools/cover-letter-generator",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["4 tone modes", "GPT-4o powered", "Personalised output", "ATS-friendly format", "No signup required"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Writing Tools", "item": "https://toolstack.tech/tools/category/writing" },
            { "@type": "ListItem", "position": 3, "name": "Cover Letter Generator", "item": "https://toolstack.tech/tools/cover-letter-generator" },
          ],
        },
        
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 920, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Cover Letter Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40, maxWidth: 700 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.28)`, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fda4af" }}>✦ Cover Letter Generator · GPT-4o · Unlimited · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            AI Cover Letter<br /><span style={{ background: `linear-gradient(135deg, ${accent}, #fb7185)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Generator.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Enter your job title, company, and a few sentences about your background. GPT-4o writes a personalised, ATS-friendly cover letter in seconds — in 4 tone modes. Free, no signup.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["✉ 4 tone modes", "♾ Unlimited", "🔓 No signup", "💼 GPT-4o quality", "⚡ Instant"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "28px", marginBottom: 12 }}>

          {/* Job + Company row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 16 }}>
            <div>
              <label htmlFor="job-title" style={labelStyle}>Job Title *</label>
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Marketing Manager"
                style={fieldStyle}
              />
            </div>
            <div>
              <label htmlFor="company-name" style={labelStyle}>Company *</label>
              <input
                id="company-name"
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Spotify"
                style={fieldStyle}
              />
            </div>
          </div>

          {/* Background */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label htmlFor="background" style={{ ...labelStyle, marginBottom: 0 }}>Your Background & Key Experience *</label>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{background.length}/1000</span>
            </div>
            <textarea
              id="background"
              value={background}
              onChange={e => setBackground(e.target.value.slice(0, 1000))}
              placeholder="Describe your relevant experience, key achievements and skills. The more specific, the better the letter. e.g. '5 years in B2B SaaS marketing, grew email list from 10k to 80k, led rebrands for 3 product launches...'"
              style={{ ...fieldStyle, minHeight: 120, resize: "vertical" }}
            />
          </div>

          {/* Hiring manager + tone row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label htmlFor="hiring-manager" style={labelStyle}>Hiring Manager Name <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.55)" }}>(optional)</span></label>
              <input
                id="hiring-manager"
                type="text"
                value={hiringManager}
                onChange={e => setHiringManager(e.target.value)}
                placeholder="e.g. Sarah Johnson"
                style={fieldStyle}
              />
            </div>
            <div>
              <p style={{ ...labelStyle, marginBottom: 10 }}>Tone</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TONES.map(t => {
                  const active = tone === t.id;
                  return (
                    <button key={t.id} onClick={() => setTone(t.id)} style={{
                      padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                      cursor: "pointer", transition: "all 0.15s",
                      border: `1px solid ${active ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.08)"}`,
                      background: active ? `rgba(${accentRgb},0.15)` : "rgba(255,255,255,0.04)",
                      color: active ? accent : "rgba(255,255,255,0.55)",
                    }}>{t.label}</button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Generate button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || loading}
              style={{
                padding: "15px 48px", borderRadius: 14,
                background: canGenerate && !loading ? `linear-gradient(135deg, #e11d48, ${accent})` : "rgba(255,255,255,0.06)",
                border: "none", cursor: canGenerate && !loading ? "pointer" : "not-allowed",
                fontSize: 16, fontWeight: 800, color: canGenerate && !loading ? "white" : "rgba(255,255,255,0.3)",
                boxShadow: canGenerate && !loading ? `0 8px 32px rgba(${accentRgb},0.3)` : "none",
                transition: "all 0.15s", display: "flex", alignItems: "center", gap: 10,
              }}
              onMouseEnter={e => { if (canGenerate && !loading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                  <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                  Writing your letter...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                  Generate Cover Letter — Free
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: "16px 20px", borderRadius: 12, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#fca5a5", fontSize: 14, marginBottom: 16, textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Result */}
        {(letter || loading) && (
          <div style={{ background: "rgba(255,255,255,0.035)", border: `1px solid rgba(${accentRgb},0.2)`, borderRadius: 20, padding: "28px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Your Cover Letter</p>
                {letter && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{wordCount} words</span>}
              </div>
              {letter && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={handleGenerate} style={{
                    padding: "5px 14px", borderRadius: 8, border: `1px solid rgba(${accentRgb},0.3)`,
                    background: `rgba(${accentRgb},0.08)`, color: "#fda4af",
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                  }}>↺ Regenerate</button>
                  <button onClick={handleCopy} style={{
                    padding: "5px 14px", borderRadius: 8,
                    border: `1px solid rgba(${accentRgb},0.35)`,
                    background: copied ? "rgba(52,211,153,0.15)" : `rgba(${accentRgb},0.12)`,
                    color: copied ? "#34d399" : "#fda4af",
                    fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                  }}>{copied ? "✓ Copied" : "Copy"}</button>
                </div>
              )}
            </div>

            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[90, 100, 85, 95, 75, 100, 60].map((w, i) => (
                  <div key={i} style={{ height: 14, borderRadius: 7, background: "rgba(255,255,255,0.07)", width: `${w}%`, animation: "pulse 1.4s ease-in-out infinite", animationDelay: `${i * 0.1}s` }} />
                ))}
                <style>{`@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}`}</style>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.025)", borderRadius: 12, padding: "24px 28px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.88)", margin: 0, whiteSpace: "pre-wrap" }}>{letter}</p>
              </div>
            )}
          </div>
        )}

        {/* Reset */}
        {letter && !loading && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
            <button onClick={() => { setLetter(""); setJobTitle(""); setCompany(""); setBackground(""); setHiringManager(""); }} style={{
              padding: "10px 24px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)",
            }}>← Start over</button>
          </div>
        )}

        {/* SEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 24, background: "rgba(244,63,94,0.03)", border: "1px solid rgba(244,63,94,0.18)" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Which tone mode should you use?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 24 }}>
            A <strong style={{ color: "white" }}>cover letter</strong> is your first written contact with a potential employer — and tone matters as much as content. The right tone depends on the role and company culture. A cover letter for a law firm should read very differently to one for a creative agency. GPT-4o adapts the vocabulary, sentence structure, and opening hook to match whichever tone mode you select.
          </p>

          <div style={{ overflowX: "auto", margin: "20px 0 32px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#fda4af" }}>Tone Mode</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Best for</th>
                  <th style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Avoid for</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Professional</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Finance, law, consulting, corporate</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Creative, startup, or casual roles</td>
                </tr>
                <tr style={{ background: "rgba(244,63,94,0.04)" }}>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Enthusiastic</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Startups, sales, customer-facing roles</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Senior executive or formal positions</td>
                </tr>
                <tr>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Concise</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Senior roles, executive applications</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Roles where narrative context matters</td>
                </tr>
                <tr style={{ background: "rgba(244,63,94,0.04)" }}>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "white" }}>Creative</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Design, marketing, content, media</td>
                  <td style={{ padding: "14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>Regulated industries, formal hiring</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Always edit the generated letter before sending</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.85 }}>
               GPT-4o produces a strong, structured first draft based on the details you provide — but the best cover letters include specifics only you would know: a recent product the company launched, a value you genuinely share with their team, or a specific metric from your work. Use the generated letter as a base, then add those personal details before sending. A letter that reads as genuinely personal always performs better than one that could have been written for anyone.
             </p>
          </div>
        </div>

        {/* ── SEO GUIDE ── */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "36px 36px", marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", marginBottom: 20, letterSpacing: "-0.02em" }}>The Definitive Guide to Job-Winning Cover Letters in 2026</h2>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
            <p>
              In the modern job market, where <strong style={{ color: "white" }}>Applicant Tracking Systems (ATS)</strong> and AI-driven sorting are the norm, a &quot;templated&quot; cover letter is the fastest way to the rejection pile. To stand out in 2026, your letter must transition from a summary of your past to a <strong style={{ color: "white" }}>strategic projection of your future value</strong>.
            </p>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>The 3-Part Hook Strategy</h3>
              <p>
                Forget &quot;I am writing to apply for...&quot; It&apos;s a waste of space. Start with a <strong style={{ color: "white" }}>Compelling Hook</strong>. Within the first two sentences, you must demonstrate internal company knowledge. Mention a recent product launch, a financial milestone, or a specific cultural value that resonates with your personal philosophy. Our generator is designed to weave these &quot;personalization tokens&quot; seamlessly into the narrative.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Quantifying Impact (The STAR Method)</h3>
              <p>
                Recruiters in 2026 don&apos;t care what you <em>did</em>; they care what you <em>achieved</em>. When describing your background, use <strong style={{ color: "white" }}>hard metrics</strong>. &quot;Managed a team&quot; becomes &quot;Led a team of 12 to increase operational efficiency by 22% in four months.&quot; Our GPT-4o powered engine automatically identifies opportunities in your background to structure achievements using the STAR (Situation, Task, Action, Result) method.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>3 Mistakes to Avoid in 2026</h3>
              <ul style={{ listStyleType: "circle", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                <li><strong style={{ color: "white" }}>The &quot;Me-Centric&quot; Letter:</strong> A cover letter isn&apos;t about why the job is good for you; it&apos;s about why you are good for the company. Shift the focus to their problems and your solutions.</li>
                <li><strong style={{ color: "white" }}>Ignoring the &quot;Cultural Scent&quot;:</strong> Every company has a unique voice. A cover letter for a legal firm should sound different than one for a creative startup. Use our Tone Selectors to match the vibe perfectly.</li>
                <li><strong style={{ color: "white" }}>Too Much Fluff:</strong> If a sentence doesn&apos;t provide proof of your ability, delete it. Keep it under 300 words for maximum impact.</li>
              </ul>
            </div>

            <p>
              Your cover letter is your first <strong style={{ color: "white" }}>sales document</strong>. By using ToolStack, you ensure that document is engineered with the same precision that top-tier career coaches use for executive placements—for free.
            </p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Your cover letter in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Enter your details", desc: "Add the job title, company name and a few sentences about your relevant experience. The more specific, the more personalised the letter.", color: accent, rgb: accentRgb },
              { step: "02", title: "Choose a tone", desc: "Pick Professional for corporate roles, Enthusiastic for startups, Concise for executive roles, or Creative for design and media jobs.", color: "#a78bfa", rgb: "167,139,250" },
              { step: "03", title: "Copy and personalise", desc: "GPT-4o writes a tailored cover letter in seconds. Copy it, add any specific details you know about the role, and it's ready to send.", color: "#34d399", rgb: "52,211,153" },
            ].map(s => (
              <div key={s.step} style={{ padding: "24px 22px", borderRadius: 18, background: `rgba(${s.rgb},0.06)`, border: `1px solid rgba(${s.rgb},0.15)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>STEP <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.step}</span></div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>FEATURES</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Better than the paid alternatives</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "♾",  title: "Unlimited generations",  desc: "Generate as many letters as you need — no 3-per-day cap (InterviewPal), no 2-total limit (Kickresume). Every job application, every time.", color: accent },
              { icon: "✦",  title: "GPT-4o quality",         desc: "Not the same engine as a basic template tool. GPT-4o understands tone, context and how to open strongly — no generic clichés.", color: "#a78bfa" },
              { icon: "💼", title: "4 tone modes",           desc: "Professional, Enthusiastic, Concise and Creative — matched to the role you're applying for. Not just one generic template.", color: "#38bdf8" },
              { icon: "👤", title: "Personalised output",    desc: "Uses your actual experience and the specific job details. Every letter is unique to your application, not a fill-in-the-blank template.", color: "#34d399" },
              { icon: "🔓", title: "No account required",    desc: "No signup, no resume upload, no profile creation. Just your details and a cover letter. No download paywall either.", color: "#fbbf24" },
              { icon: "⚡", title: "Results in seconds",     desc: "GPT-4o writes your letter in under 10 seconds. Apply to more jobs faster without sacrificing quality.", color: accent },
            ].map(f => (
              <div key={f.title} style={{ padding: "24px 22px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 22, marginBottom: 14, color: f.color }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <FaqPageSchema faqs={FAQS} />
        {/* FAQ */}
        <div style={{ marginTop: 64 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>FAQ</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0, textAlign: "left", lineHeight: 1.4 }}>{faq.q}</h3>
                  <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 22px 18px" }}>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Description */}
        <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Cover Letter Generator: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Cover letters are the most skipped part of any job application — but the ones that do read them are doing it because something in your resume caught their interest and they want to know more. A good cover letter turns curiosity into an interview. Our AI Cover Letter Generator takes your work history and the job description and produces a tailored, professional cover letter in under a minute.
            </p>
            <p style={{ marginBottom: 16 }}>
              Paste the job description, enter your name and role, and optionally paste your resume bullet points. The AI generates a cover letter that directly addresses the requirements in the job posting, uses your specific achievements, and matches the professional tone of the industry. You can regenerate with different tones, adjust length, and edit the output before downloading as PDF.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include applying to 10+ jobs quickly without sacrificing cover letter quality, tailoring a generic cover letter to a specific job posting's exact requirements, overcoming employment gaps by framing your experience positively, and applying to roles where you have less traditional experience but transferable skills.
            </p>
            <p style={{ marginBottom: 0 }}>
              Writing a good cover letter takes 30-60 minutes per job. Most people either skip them entirely or send the same generic letter to every posting. Ours generates genuinely tailored letters in seconds by matching your background to the specific job requirements. Free to use, no signup required, generates unlimited letters.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="cover-letter-generator" />
        
      </div>
    </div>
  );
}
