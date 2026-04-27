"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MoreTools } from "@/components/MoreTools";

// ─── Lorem Ipsum corpus ──────────────────────────────────────────────────────
const SENTENCES = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  "Totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.",
  "Ut labore et dolore magnam aliquam quaerat voluptatem consequuntur magni dolores.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
  "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
  "Similique sunt in culpa qui officia deserunt mollitia animi id est laborum et dolorum fuga.",
  "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores.",
  "Omnis voluptas assumenda est omnis dolor repellendus temporibus autem quibusdam.",
  "Nam libero tempore cum soluta nobis eligendi optio cumque nihil impedit id quod maxime.",
  "Quis nostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi.",
  "Quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores.",
];

const ALL_WORDS = SENTENCES.join(" ").replace(/[.,]/g, "").split(/\s+/).filter(Boolean);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeParagraph(isFirst: boolean): string {
  const count = Math.floor(Math.random() * 3) + 4;
  const pool = isFirst ? SENTENCES : SENTENCES.slice(4);
  const start = isFirst ? [SENTENCES[0], SENTENCES[1], SENTENCES[2], SENTENCES[3]] : [];
  const rest = Array.from({ length: Math.max(0, count - start.length) }, () => pick(pool));
  return [...start, ...rest].slice(0, count).join(" ");
}

function makeListItem(): string {
  const wc = Math.floor(Math.random() * 4) + 3;
  const ws = Array.from({ length: wc }, () => pick(ALL_WORDS));
  return ws[0].charAt(0).toUpperCase() + ws[0].slice(1) + " " + ws.slice(1).join(" ");
}

function generate(
  type: "paragraphs" | "sentences" | "words" | "lists",
  count: number,
  classic: boolean,
  html: boolean,
): string {
  if (type === "paragraphs") {
    const paras = Array.from({ length: count }, (_, i) => makeParagraph(i === 0 && classic));
    return html ? paras.map(p => `<p>${p}</p>`).join("\n") : paras.join("\n\n");
  }

  if (type === "sentences") {
    const pool = classic ? SENTENCES : SENTENCES.slice(4);
    const sents = classic
      ? [SENTENCES[0], ...Array.from({ length: count - 1 }, () => pick(SENTENCES.slice(1)))]
      : Array.from({ length: count }, () => pick(pool));
    const text = sents.slice(0, count).join(" ");
    return html ? `<p>${text}</p>` : text;
  }

  if (type === "words") {
    const classicWords = SENTENCES[0].replace(/[.,]/g, "").split(" ");
    const extra = Array.from({ length: Math.max(0, count - classicWords.length) }, () => pick(ALL_WORDS));
    const pool = classic ? [...classicWords, ...extra] : Array.from({ length: count }, () => pick(ALL_WORDS));
    const text = pool.slice(0, count).join(" ");
    return html ? `<p>${text}</p>` : text;
  }

  if (type === "lists") {
    const items = Array.from({ length: count }, makeListItem);
    return html
      ? `<ul>\n${items.map(i => `  <li>${i}</li>`).join("\n")}\n</ul>`
      : items.map(i => `• ${i}`).join("\n");
  }
  return "";
}

// ─── Config ──────────────────────────────────────────────────────────────────
const TYPES = [
  { id: "paragraphs" as const, label: "Paragraphs", min: 1, max: 10, def: 3, unit: "paragraph" },
  { id: "sentences"  as const, label: "Sentences",  min: 1, max: 20, def: 5, unit: "sentence"  },
  { id: "words"      as const, label: "Words",      min: 10, max: 500, def: 100, unit: "word"  },
  { id: "lists"      as const, label: "List items", min: 3, max: 20, def: 6, unit: "item"      },
];

const FAQS = [
  {
    q: "What is Lorem Ipsum?",
    a: "Lorem Ipsum is standard placeholder text used by designers, developers and typesetters since the 1500s. It's deliberately meaningless Latin-like text so that viewers focus on the visual design rather than the content. The standard passage begins 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' and is derived from Cicero's 'de Finibus Bonorum et Malorum' (45 BC).",
  },
  {
    q: "What does 'Lorem ipsum dolor sit amet' mean?",
    a: "It's a scrambled excerpt from Cicero's philosophical work 'de Finibus Bonorum et Malorum'. The original passage reads: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit' — meaning 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.' The Lorem Ipsum version shuffles the words to be deliberately unreadable.",
  },
  {
    q: "Why do designers use Lorem Ipsum instead of real text?",
    a: "Real text distracts reviewers — clients and stakeholders start reading and commenting on the copy instead of reviewing the layout. Lorem Ipsum looks like real text visually (similar word lengths, punctuation, paragraph rhythm) without triggering the reading response. It's the professional standard for wireframes, mockups and prototypes.",
  },
  {
    q: "What's the difference between paragraphs, sentences and words modes?",
    a: "Paragraphs mode generates full blocks of 4–6 sentences each — best for page content mockups. Sentences mode generates a set number of individual sentences as one block — good for shorter text areas. Words mode generates exactly the number of words you specify — useful for tight character-limited fields. List items mode generates bullet-point items for menu mockups or feature lists.",
  },
  {
    q: "What does the HTML output option do?",
    a: "When HTML is enabled, paragraphs are wrapped in <p> tags, lists become a <ul> with <li> items, and sentence/word blocks are wrapped in a <p> tag. Copy-paste directly into your HTML template or CMS. When disabled, you get plain text with paragraph breaks — suitable for Word, Figma, Notion or any rich text editor.",
  },
  {
    q: "Can I use Lorem Ipsum on a live production website?",
    a: "For development and staging environments — yes, absolutely. For production (public-facing) websites — no. Search engines like Google may penalise pages with Lorem Ipsum as thin or duplicate content. Replace all placeholder text with real copy before launching. Screen readers also read Lorem Ipsum aloud to users with accessibility needs, which creates a confusing experience.",
  },
  {
    q: "What is the best free Lorem Ipsum generator?",
    a: "ToolStack's Lorem Ipsum generator offers four generation types (paragraphs, sentences, words and list items), adjustable counts up to 10 paragraphs or 500 words, an HTML output mode, a classic Lorem Ipsum start option, and a one-click copy — all free, with no signup and no limits on how many times you can generate.",
  },
];

export default function LoremIpsumPage() {
  const [genType, setGenType] = useState<"paragraphs" | "sentences" | "words" | "lists">("paragraphs");
  const [count, setCount]     = useState(3);
  const [classic, setClassic] = useState(true);
  const [html, setHtml]       = useState(false);
  const [seed, setSeed]       = useState(0);
  const [copied, setCopied]   = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cfg = TYPES.find(t => t.id === genType)!;

  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(generate(genType, count, classic, html));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genType, count, classic, html, seed]);

  const charCount = output.length;
  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accent    = "#a855f7";
  const accentRgb = "168,85,247";

  const toggle = (on: boolean, label: string, onChange: (v: boolean) => void): React.ReactElement => (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        display: "flex", alignItems: "center", gap: 10, background: "none",
        border: "none", cursor: "pointer", padding: 0,
      }}
    >
      <span style={{
        display: "inline-flex", width: 40, height: 22, borderRadius: 999, padding: 3,
        background: on ? `rgba(${accentRgb},0.8)` : "rgba(255,255,255,0.12)",
        transition: "background 0.2s", alignItems: "center",
      }}>
        <span style={{
          width: 16, height: 16, borderRadius: "50%", background: "white",
          transform: on ? "translateX(18px)" : "translateX(0)",
          transition: "transform 0.2s",
        }} />
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: on ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)" }}>{label}</span>
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#06060c" }}>
      {/* Glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(${accentRgb},0.12) 0%, transparent 65%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Lorem Ipsum Generator",
          "description": "Free Lorem Ipsum generator for designers and developers. Generate placeholder text in 4 formats — paragraphs, sentences, words, and list items — with optional HTML output. No signup.",
          "url": "https://toolstack.tech/tools/lorem-ipsum-generator",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": ["4 specialized generation modes", "HTML integration", "Precision count control", "Classic/Random modes", "One-click copy", "No signup required"],
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Utility", "item": "https://toolstack.tech/tools?category=utility" },
            { "@type": "ListItem", "position": 3, "name": "Lorem Ipsum Generator", "item": "https://toolstack.tech/tools/lorem-ipsum-generator" },
          ],
        },
        {
          "@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
        },
      ]) }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "120px 20px 80px" }}>

        {/* Breadcrumb */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>ToolStack</Link>
          <span>›</span>
          <Link href="/tools" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>All Tools</Link>
          <span>›</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Lorem Ipsum Generator</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 40, maxWidth: 680 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: `rgba(${accentRgb},0.1)`, border: `1px solid rgba(${accentRgb},0.28)`, marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#d8b4fe" }}>✓ Lorem Ipsum Generator · 4 Formats · HTML Output · No Signup</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Lorem Ipsum<br /><span style={{ background: `linear-gradient(135deg, ${accent}, #c084fc)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Generator.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>
            Generate placeholder text in 4 formats — paragraphs, sentences, words, or list items — with optional HTML output. Classic Lorem Ipsum start or fully randomised. Free, instant, no signup.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["¶ 4 generation formats", "{ } HTML output", "⚡ Instant generation", "🔓 No signup", "♾ Unlimited use"].map(b => (
              <span key={b} style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>{b}</span>
            ))}
          </div>
        </div>

        {/* Controls card */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "20px 24px", marginBottom: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start", justifyContent: "space-between" }}>

            {/* Type selector */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>Generate</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TYPES.map(t => {
                  const active = genType === t.id;
                  return (
                    <button key={t.id} onClick={() => { setGenType(t.id); setCount(t.def); }} style={{
                      padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700,
                      cursor: "pointer", transition: "all 0.15s",
                      border: `1px solid ${active ? `rgba(${accentRgb},0.5)` : "rgba(255,255,255,0.08)"}`,
                      background: active ? `rgba(${accentRgb},0.15)` : "rgba(255,255,255,0.04)",
                      color: active ? "#c084fc" : "rgba(255,255,255,0.55)",
                    }}>{t.label}</button>
                  );
                })}
              </div>
            </div>

            {/* Count + toggles */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 220 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: 0 }}>Amount</p>
                  <span style={{ fontSize: 13, fontWeight: 800, color: accent }}>{count} {cfg.unit}{count !== 1 ? "s" : ""}</span>
                </div>
                <input
                  type="range"
                  min={cfg.min} max={cfg.max} step={genType === "words" ? 10 : 1}
                  value={count}
                  onChange={e => setCount(Number(e.target.value))}
                  aria-label={`Number of ${cfg.unit}s`}
                  style={{ width: "100%", accentColor: accent, cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{cfg.min}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{cfg.max}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {toggle(classic, "Start classic", setClassic)}
                {toggle(html, "HTML output", setHtml)}
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div style={{ background: "rgba(255,255,255,0.035)", border: `1px solid rgba(${accentRgb},0.2)`, borderRadius: 18, padding: "20px 24px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>Output</p>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{wordCount} words · {charCount} chars</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setSeed(s => s + 1)} style={{
                padding: "5px 14px", borderRadius: 8, border: `1px solid rgba(${accentRgb},0.25)`,
                background: `rgba(${accentRgb},0.08)`, color: "#d8b4fe",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>↺ Regenerate</button>
              <button onClick={handleCopy} style={{
                padding: "5px 14px", borderRadius: 8,
                border: `1px solid rgba(${accentRgb},0.35)`,
                background: copied ? "rgba(52,211,153,0.15)" : `rgba(${accentRgb},0.12)`,
                color: copied ? "#34d399" : "#d8b4fe",
                fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              }}>
                {copied ? "✓ Copied" : "Copy"}
              </button>
            </div>
          </div>
          <div style={{
            fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.75)",
            whiteSpace: "pre-wrap", fontFamily: html ? "monospace" : "inherit",
            maxHeight: 400, overflowY: "auto",
            padding: "4px 0",
          }}>
            {output}
          </div>
        </div>

        {/* SEO CONTENT */}
        <div style={{ marginTop: 64, padding: "36px 40px", borderRadius: 20, background: `rgba(${accentRgb},0.04)`, border: `1px solid rgba(${accentRgb},0.12)` }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>When to use each Lorem Ipsum format</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 16px" }}>
            A <strong style={{ color: "white" }}>Lorem Ipsum generator</strong> produces neutral placeholder text so designers and developers can build layouts without real copy. The classic passage has been the industry standard since the 1500s because it visually mimics natural text — similar word lengths, punctuation rhythm, and sentence variety — without triggering readers to engage with the content instead of the layout.
          </p>

          <div style={{ overflowX: "auto", margin: "10px 0 24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, textAlign: "left" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: accent }}>Format</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Best for</th>
                  <th style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "#34d399" }}>Typical use</th>
                </tr>
              </thead>
              <tbody style={{ color: "rgba(255,255,255,0.4)" }}>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Paragraphs</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Page content mockups</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Blog layouts, CMS templates</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Sentences</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Short text area mockups</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Card subtitles, descriptions</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>Words</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Character-limited fields</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Button labels, nav items</td>
                </tr>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>List items</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Menu and feature mockups</td>
                  <td style={{ padding: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>Navigation, feature lists</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
             <h3 style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 10 }}>Why not use real text for mockups?</h3>
             <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
               Real text in mockups causes reviewers to focus on the copy — editing words, questioning phrasing — instead of evaluating the visual design. Lorem Ipsum eliminates that problem entirely. It also prevents accidentally using copyrighted or sensitive content in screenshots or presentations. Use placeholder text during design and development, then replace it with your real copy before going live. Never ship Lorem Ipsum on a public-facing page — search engines treat it as thin content.
             </p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div style={{ marginTop: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>Generate placeholder text in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "Choose your format", desc: "Select paragraphs, sentences, words or list items — whatever your design or code mockup needs.", color: accent, rgb: accentRgb },
              { step: "02", title: "Set the amount", desc: "Drag the slider to get exactly how much text you need — from 1 paragraph to 500 words. Toggle HTML output if needed.", color: "#38bdf8", rgb: "56,189,248" },
              { step: "03", title: "Copy and use it", desc: "Your Lorem Ipsum is already generated. Click Copy to grab it and paste directly into your design tool, IDE or CMS.", color: "#34d399", rgb: "52,211,153" },
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
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 32px", letterSpacing: "-0.02em" }}>More than a basic lipsum tool</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "¶",  title: "4 generation formats",  desc: "Paragraphs (4–6 sentences), sentences (any count), words (up to 500), or list items. Most generators only offer paragraphs.", color: accent },
              { icon: "{ }",title: "HTML output mode",       desc: "Toggle HTML on and get text wrapped in <p> tags or <ul><li> items — ready to drop into your codebase or template.", color: "#38bdf8" },
              { icon: "↺",  title: "Regenerate instantly",   desc: "Click Regenerate to get a new random variation of the same format and length. Each click produces different text.", color: "#34d399" },
              { icon: "Aa", title: "Classic start option",   desc: "Toggle 'Start classic' to always begin with the iconic 'Lorem ipsum dolor sit amet...' opening — or go fully randomised.", color: "#fbbf24" },
              { icon: "⚡", title: "Zero loading time",      desc: "No API call, no server — runs entirely in your browser. Text is generated in under a millisecond, every time.", color: "#f97316" },
              { icon: "🔓", title: "Free, no account",       desc: "Generate as many times as you need. No daily limits, no signup, no watermarks. Lorem Ipsum should be instant and free.", color: accent },
            ].map(f => (
              <div key={f.title} style={{ padding: "24px 22px", borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 22, marginBottom: 14, color: f.color }}>{f.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

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

        <MoreTools currentSlug="lorem-ipsum-generator" />
        
      </div>
    </div>
  );
}
