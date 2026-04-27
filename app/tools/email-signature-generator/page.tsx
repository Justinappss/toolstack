"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Eye, Palette } from "lucide-react";
import Link from "next/link";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";

// ─── CONFIG ─────────────────────────────────────────────────────────────────

const TEMPLATES = [
  { id: "modern", label: "Modern", desc: "Clean separator with social links." },
  { id: "classic", label: "Classic", desc: "Two-column photo layout." },
  { id: "minimal", label: "Minimal", desc: "Text-only, zero clutter." },
  { id: "bold", label: "Bold", desc: "Strong accent bar, uppercase." },
];

const ACCENT_COLORS = [
  { color: "#0077B5", label: "LinkedIn" },
  { color: "#38bdf8", label: "Sky" },
  { color: "#6366f1", label: "Indigo" },
  { color: "#34d399", label: "Emerald" },
  { color: "#f59e0b", label: "Amber" },
  { color: "#f43f5e", label: "Rose" },
  { color: "#8b5cf6", label: "Violet" },
  { color: "#1a1a1a", label: "Black" },
];

const FONTS = [
  { id: "Arial, Helvetica, sans-serif", label: "Arial" },
  { id: "Georgia, 'Times New Roman', serif", label: "Georgia" },
  { id: "Verdana, Geneva, sans-serif", label: "Verdana" },
  { id: "'Trebuchet MS', sans-serif", label: "Trebuchet" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Enter Your Details", body: "Fill in your name, title, company, and contact information. Add social media links and an optional profile photo URL.", color: "#38bdf8", bg: "rgba(56,189,248,0.10)", border: "rgba(56,189,248,0.25)" },
  { step: "02", title: "Choose Your Style", body: "Pick from 4 professional templates and customise your accent colour and font to match your brand identity.", color: "#818cf8", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.25)" },
  { step: "03", title: "Copy &amp; Paste", body: "Preview your signature in real-time, then copy the HTML with one click. Paste directly into Gmail, Outlook, or Apple Mail.", color: "#34d399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.25)" },
];

const FAQS = [
  {
    q: "How do I add this signature to Gmail?",
    a: "After copying the HTML, open Gmail \u2192 Settings \u2192 See all settings \u2192 General tab \u2192 Signature section. Click the formatting toolbar, then paste (Ctrl+V / Cmd+V). Gmail accepts rich HTML directly \u2014 your signature will appear exactly as previewed.",
  },
  {
    q: "How do I add this signature to Outlook?",
    a: "In Outlook desktop: File \u2192 Options \u2192 Mail \u2192 Signatures. Create a new signature and paste the copied HTML. In Outlook web: Settings \u2192 View all Outlook settings \u2192 Mail \u2192 Compose and reply \u2192 Email signature. Paste and save.",
  },
  {
    q: "Will the signature look the same in every email client?",
    a: "Our signatures use table-based HTML with inline styles \u2014 the gold standard for email compatibility. They render correctly in Gmail, Outlook, Apple Mail, Yahoo Mail, and Thunderbird. We avoid CSS classes, flexbox, and grid which break in email clients.",
  },
  {
    q: "Can I add my profile photo?",
    a: "Yes. Paste a direct URL to your photo in the \u2018Photo URL\u2019 field. Use a publicly accessible image URL (e.g., your LinkedIn photo, a Gravatar link, or an image hosted on Imgur). The photo will appear in the Classic and Modern templates.",
  },
  {
    q: "Is this email signature generator free?",
    a: "Yes, 100% free with unlimited use. No signup, no watermark, no \u2018powered by\u2019 branding added to your signature. Most competitors charge \u00a35\u201315/month for features we include for free like multiple templates, CTA banners, and social links.",
  },
  {
    q: "What is the best free email signature generator?",
    a: "ToolStack\u2019s Email Signature Generator is the top-rated free option for 2026. Unlike HubSpot (1 template) or SyncSignature (requires signup), we offer 4 professional templates, accent colour customisation, font selection, CTA banners, and social links \u2014 all free with no account required.",
  },
];

// ─── XSS SANITISER ──────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeUrl(u: string): string {
  const norm = /^https?:\/\//i.test(u) ? u : `https://${u}`;
  return esc(norm);
}

// ─── HTML GENERATION ────────────────────────────────────────────────────────

interface SigData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  github: string;
  photoUrl: string;
  ctaText: string;
  ctaUrl: string;
}

function buildContactLine(data: SigData, font: string): string {
  const parts: string[] = [];
  if (data.email) parts.push(`<a href="mailto:${esc(data.email)}" style="color:#555;text-decoration:none;font-family:${font};font-size:12px;">${esc(data.email)}</a>`);
  if (data.phone) parts.push(`<a href="tel:${esc(data.phone)}" style="color:#555;text-decoration:none;font-family:${font};font-size:12px;">${esc(data.phone)}</a>`);
  if (data.website) parts.push(`<a href="${safeUrl(data.website)}" style="color:#555;text-decoration:none;font-family:${font};font-size:12px;">${esc(data.website.replace(/^https?:\/\//i, ""))}</a>`);
  return parts.join(` <span style="color:#ccc;font-family:${font};">&middot;</span> `);
}

function buildSocialLine(data: SigData, accent: string, font: string): string {
  const links: string[] = [];
  if (data.linkedin) links.push(`<a href="${safeUrl(data.linkedin)}" style="color:${accent};text-decoration:none;font-family:${font};font-size:12px;font-weight:600;">LinkedIn</a>`);
  if (data.twitter) links.push(`<a href="${safeUrl(data.twitter)}" style="color:${accent};text-decoration:none;font-family:${font};font-size:12px;font-weight:600;">Twitter</a>`);
  if (data.instagram) links.push(`<a href="${safeUrl(data.instagram)}" style="color:${accent};text-decoration:none;font-family:${font};font-size:12px;font-weight:600;">Instagram</a>`);
  if (data.github) links.push(`<a href="${safeUrl(data.github)}" style="color:${accent};text-decoration:none;font-family:${font};font-size:12px;font-weight:600;">GitHub</a>`);
  if (!links.length) return "";
  return links.join(` <span style="color:#ccc;font-family:${font};">&middot;</span> `);
}

function buildCTA(data: SigData, accent: string, font: string): string {
  if (!data.ctaText || !data.ctaUrl) return "";
  return `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;"><tr><td style="background-color:${accent};padding:8px 20px;border-radius:4px;"><a href="${safeUrl(data.ctaUrl)}" style="color:#ffffff;font-family:${font};font-size:12px;font-weight:bold;text-decoration:none;">${esc(data.ctaText)}</a></td></tr></table>`;
}

function buildPhoto(url: string): string {
  if (!url) return "";
  return `<td style="padding-right:16px;vertical-align:top;"><img src="${esc(url)}" alt="Profile photo" width="72" height="72" style="border-radius:50%;width:72px;height:72px;object-fit:cover;display:block;" /></td>`;
}

function generateHTML(data: SigData, template: string, accent: string, font: string): string {
  const nameDisplay = esc(data.name || "Your Name");
  const contact = buildContactLine(data, font);
  const social = buildSocialLine(data, accent, font);
  const cta = buildCTA(data, accent, font);
  const titleEsc = esc(data.title);
  const companyEsc = esc(data.company);
  const titleCompany = [titleEsc, companyEsc].filter(Boolean).join(" | ");

  if (template === "modern") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};max-width:500px;"><tr>${buildPhoto(data.photoUrl)}<td style="border-left:2px solid ${accent};padding-left:16px;vertical-align:top;"><p style="margin:0;font-size:16px;font-weight:bold;color:#1a1a1a;">${nameDisplay}</p>${titleCompany ? `<p style="margin:2px 0 0;font-size:13px;color:#666;">${titleCompany}</p>` : ""}${contact ? `<p style="margin:8px 0 0;font-size:12px;color:#888;">${contact}</p>` : ""}${social ? `<p style="margin:6px 0 0;">${social}</p>` : ""}${cta}</td></tr></table>`;
  }

  if (template === "classic") {
    const rows: string[] = [];
    if (data.email) rows.push(`<tr><td style="font-size:12px;color:#888;padding:2px 0;font-family:${font};">\u2709\uFE0F <a href="mailto:${esc(data.email)}" style="color:#666;text-decoration:none;">${esc(data.email)}</a></td></tr>`);
    if (data.phone) rows.push(`<tr><td style="font-size:12px;color:#888;padding:2px 0;font-family:${font};">\uD83D\uDCDE <a href="tel:${esc(data.phone)}" style="color:#666;text-decoration:none;">${esc(data.phone)}</a></td></tr>`);
    if (data.website) rows.push(`<tr><td style="font-size:12px;color:#888;padding:2px 0;font-family:${font};">\uD83C\uDF10 <a href="${safeUrl(data.website)}" style="color:#666;text-decoration:none;">${esc(data.website.replace(/^https?:\/\//i, ""))}</a></td></tr>`);
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};max-width:500px;"><tr>${buildPhoto(data.photoUrl)}<td style="vertical-align:top;"><p style="margin:0;font-size:18px;font-weight:bold;color:#1a1a1a;">${nameDisplay}</p>${titleEsc ? `<p style="margin:4px 0 0;font-size:14px;color:${accent};font-weight:600;">${titleEsc}</p>` : ""}${companyEsc ? `<p style="margin:2px 0 0;font-size:13px;color:#555;">${companyEsc}</p>` : ""}${rows.length ? `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">${rows.join("")}</table>` : ""}${social ? `<p style="margin:8px 0 0;">${social}</p>` : ""}${cta}</td></tr></table>`;
  }

  if (template === "minimal") {
    const titleCompanyMinimal = [titleEsc, companyEsc].filter(Boolean).join(", ");
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};max-width:500px;"><tr><td><p style="margin:0;font-size:15px;font-weight:bold;color:#1a1a1a;">${nameDisplay}</p>${titleCompanyMinimal ? `<p style="margin:2px 0 0;font-size:13px;color:#666;">${titleCompanyMinimal}</p>` : ""}${contact ? `<p style="margin:6px 0 0;font-size:12px;color:#888;">${contact}</p>` : ""}${social ? `<p style="margin:4px 0 0;">${social}</p>` : ""}${cta}</td></tr></table>`;
  }

  // bold
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};max-width:500px;"><tr><td style="border-left:4px solid ${accent};padding-left:14px;">${data.photoUrl ? `<img src="${esc(data.photoUrl)}" alt="Profile" width="56" height="56" style="border-radius:8px;width:56px;height:56px;object-fit:cover;display:block;margin-bottom:10px;" />` : ""}<p style="margin:0;font-size:18px;font-weight:900;color:#111;text-transform:uppercase;letter-spacing:1px;">${nameDisplay}</p>${titleEsc ? `<p style="margin:4px 0 0;font-size:14px;color:${accent};font-weight:700;">${titleEsc}</p>` : ""}${companyEsc ? `<p style="margin:2px 0 0;font-size:13px;color:#444;">${companyEsc}</p>` : ""}<hr style="border:none;border-top:1px solid #ddd;margin:10px 0;" />${contact ? `<p style="margin:0;font-size:12px;color:#666;">${contact}</p>` : ""}${social ? `<p style="margin:6px 0 0;">${social}</p>` : ""}${cta}</td></tr></table>`;
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function EmailSignatureGenerator() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [template, setTemplate] = useState("modern");
  const [accent, setAccent] = useState("#0077B5");
  const [font, setFont] = useState("Arial, Helvetica, sans-serif");
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const sigData: SigData = { name, title, company, email, phone, website, linkedin, twitter, instagram, github, photoUrl, ctaText, ctaUrl };
  const html = useMemo(() => generateHTML(sigData, template, accent, font), [name, title, company, email, phone, website, linkedin, twitter, instagram, github, photoUrl, ctaText, ctaUrl, template, accent, font]);

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    saveToHistory({ toolName: "Email Signature Generator", slug: "email-signature-generator", data: { template, accent, name, title, company } });
  };

  const hasContent = name || email;

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "white",
    outline: "none", fontSize: 14, transition: "border-color 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.55)",
    textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 65%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Free Email Signature Generator",
          "description": "Create professional HTML email signatures for Gmail, Outlook and Apple Mail. 4 templates, custom colours, social links. Free, no signup.",
          "url": "https://toolstack.tech/tools/email-signature-generator",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["4 Professional Templates", "Accent Color Customization", "Font Selection", "Social Media Links", "CTA Banner", "Live Preview", "One-Click HTML Copy", "Profile Photo Support"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Utility Tools", "item": "https://toolstack.tech/tools?category=utility" },
            { "@type": "ListItem", "position": 3, "name": "Email Signature Generator", "item": "https://toolstack.tech/tools/email-signature-generator" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1040, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <Link href="/tools?category=utility" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Utility Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Email Signature Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.3)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#7dd3fc" }}>{"\u2713"} Email Signature Generator {"\u00b7"} 4 Templates {"\u00b7"} Free Forever {"\u00b7"} No Signup</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Professional Email<br />
            <span style={{ background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Signature Builder.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.6)", maxWidth: 580, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Create email-client-compatible HTML signatures in seconds. Choose a template, customise your brand colours, and copy with one click. Works in Gmail, Outlook, and Apple Mail.
          </p>
        </div>

        {/* ── Two-Panel Layout ───────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 24, alignItems: "start", marginBottom: 64 }}>

          {/* ── LEFT: Form ──────────────────────────────────────────── */}
          <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px" }}>

            {/* Template Picker */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ ...labelStyle, marginBottom: 10 }}>Template Style</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setTemplate(t.id)} style={{
                    padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                    background: template === t.id ? "rgba(56,189,248,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${template === t.id ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.08)"}`,
                    textAlign: "left", transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: template === t.id ? "white" : "rgba(255,255,255,0.7)" }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Colour */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ ...labelStyle, marginBottom: 10 }}>Accent Colour</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {ACCENT_COLORS.map(c => (
                  <button key={c.color} onClick={() => setAccent(c.color)} title={c.label} style={{
                    width: 32, height: 32, borderRadius: 10, cursor: "pointer",
                    background: c.color, border: `2px solid ${accent === c.color ? "white" : "transparent"}`,
                    boxShadow: accent === c.color ? `0 0 12px ${c.color}55` : "none",
                    transition: "all 0.15s",
                  }} />
                ))}
              </div>
            </div>

            {/* Font */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ ...labelStyle, marginBottom: 10 }}>Font</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {FONTS.map(f => (
                  <button key={f.id} onClick={() => setFont(f.id)} style={{
                    padding: "7px 14px", borderRadius: 999, cursor: "pointer",
                    background: font === f.id ? "rgba(56,189,248,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${font === f.id ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.08)"}`,
                    color: font === f.id ? "#7dd3fc" : "rgba(255,255,255,0.5)",
                    fontSize: 12, fontWeight: 700, transition: "all 0.15s",
                  }}>{f.label}</button>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div style={{ marginBottom: 20 }}>
              <p style={labelStyle}>Full Name *</p>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
              <div>
                <p style={labelStyle}>Job Title</p>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Senior Marketing Manager" style={inputStyle} />
              </div>
              <div>
                <p style={labelStyle}>Company</p>
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Acme Inc." style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
              <div>
                <p style={labelStyle}>Email *</p>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@acme.com" style={inputStyle} />
              </div>
              <div>
                <p style={labelStyle}>Phone</p>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+44 7700 900000" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
              <div>
                <p style={labelStyle}>Website</p>
                <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="acme.com" style={inputStyle} />
              </div>
              <div>
                <p style={labelStyle}>Photo URL</p>
                <input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://..." style={inputStyle} />
              </div>
            </div>

            {/* Social Links */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, marginBottom: 20 }}>
              <p style={{ ...labelStyle, marginBottom: 14 }}>Social Links (optional)</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                <div>
                  <p style={{ ...labelStyle, fontSize: 10 }}>LinkedIn</p>
                  <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." style={inputStyle} />
                </div>
                <div>
                  <p style={{ ...labelStyle, fontSize: 10 }}>Twitter / X</p>
                  <input value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="https://x.com/..." style={inputStyle} />
                </div>
                <div>
                  <p style={{ ...labelStyle, fontSize: 10 }}>Instagram</p>
                  <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://instagram.com/..." style={inputStyle} />
                </div>
                <div>
                  <p style={{ ...labelStyle, fontSize: 10 }}>GitHub</p>
                  <input value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/..." style={inputStyle} />
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
              <p style={{ ...labelStyle, marginBottom: 14 }}>CTA Banner (optional)</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                <div>
                  <p style={{ ...labelStyle, fontSize: 10 }}>Button Text</p>
                  <input value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="Book a Meeting" style={inputStyle} />
                </div>
                <div>
                  <p style={{ ...labelStyle, fontSize: 10 }}>Button URL</p>
                  <input value={ctaUrl} onChange={e => setCtaUrl(e.target.value)} placeholder="https://calendly.com/..." style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview + Copy ───────────────────────────────── */}
          <div>
            {/* Live Preview */}
            <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: "28px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Eye size={16} style={{ color: "#38bdf8" }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Live Preview</span>
                </div>
                <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.3)" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#34d399" }}>{"\u25CF"} Updates in real-time</span>
                </div>
              </div>

              {/* White email preview */}
              <div style={{
                background: "white", borderRadius: 16, padding: "28px 24px", minHeight: 120,
                border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              }}>
                {hasContent ? (
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                ) : (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <Palette size={28} style={{ color: "#ccc", marginBottom: 8 }} />
                    <p style={{ fontSize: 14, color: "#555", margin: 0 }}>Enter your name and email to see the preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Copy Button */}
            <button onClick={handleCopy} disabled={!hasContent} style={{
              width: "100%", padding: "16px", borderRadius: 14, border: "none", cursor: hasContent ? "pointer" : "not-allowed",
              background: hasContent ? (copied ? "#34d399" : "#38bdf8") : "rgba(255,255,255,0.05)",
              color: hasContent ? "white" : "rgba(255,255,255,0.3)",
              fontSize: 15, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: hasContent ? "0 8px 32px rgba(56,189,248,0.3)" : "none",
              transition: "all 0.2s", marginBottom: 12,
            }}>
              {copied ? <><Check size={18} /> HTML Copied to Clipboard</> : <><Copy size={18} /> Copy Signature HTML</>}
            </button>

            {/* Paste Instructions */}
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px 18px" }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>How to paste</p>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                <strong style={{ color: "rgba(255,255,255,0.8)" }}>Gmail:</strong> Settings {"\u2192"} Signature {"\u2192"} Paste (Ctrl+V)<br />
                <strong style={{ color: "rgba(255,255,255,0.8)" }}>Outlook:</strong> Settings {"\u2192"} Mail {"\u2192"} Compose {"\u2192"} Paste<br />
                <strong style={{ color: "rgba(255,255,255,0.8)" }}>Apple Mail:</strong> Preferences {"\u2192"} Signatures {"\u2192"} Paste
              </div>
            </div>
          </div>
        </div>

        {/* ── How It Works ──────────────────────────────────────────── */}
        <section style={{ marginTop: 40, marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 28 }}>Three steps to a professional email signature.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} style={{ padding: "22px 20px", borderRadius: 18, background: item.bg, border: `1px solid ${item.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: item.color, marginBottom: 12 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO Content ───────────────────────────────────────────── */}
        <div style={{ padding: "48px 40px", borderRadius: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>Why Your Email Signature Matters in 2026</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            Your email signature is your most-seen piece of marketing collateral. The average professional sends 40+ emails per day — that&apos;s 40 impressions of your brand, your role, and your credibility. A well-designed signature with <strong style={{ color: "white" }}>consistent branding, social proof links, and a clear CTA</strong> outperforms every other touchpoint in your digital presence.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Brand Consistency", d: "Your signature reinforces your brand identity in every conversation. Consistent colours, fonts, and layout build trust and professionalism across thousands of touchpoints." },
              { t: "Lead Generation", d: "A CTA banner in your signature turns every email into a conversion opportunity. 'Book a call' buttons in signatures generate 2\u20135x more clicks than footer links." },
              { t: "Social Proof", d: "Linking your LinkedIn, portfolio, or company website in your signature provides instant credibility verification. Recipients can validate you in one click." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{item.t}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 16, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{
                  width: "100%", padding: "18px 22px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left",
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

        {/* ── MoreTools + Banner ────────────────────────────────────── */}
        <MoreTools currentSlug="email-signature-generator" />
        
      </div>
    </div>
  );
}
