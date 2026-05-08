"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowRightLeft, Copy, Check, Trash2 } from "lucide-react";
import Link from "next/link";
import { saveToHistory } from "@/components/HistorySidebar";
import { MoreTools } from "@/components/MoreTools";
import { PipeDataButton } from "@/components/PipeDataButton";
import { FaqPageSchema } from "@/components/ui/FaqPageSchema";

const HOW_IT_WORKS = [
  { step: "01", title: "Select Mode", body: "Choose whether you want to Encode standard text into Base64, or Decode a Base64 string back into readable text.", color: "#6366f1", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.25)" },
  { step: "02", title: "Input Data", body: "Paste your string into the input field. The conversion runs locally in your browser to process the data securely in milliseconds.", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.25)" },
  { step: "03", title: "Copy Output", body: "Click the copy button to grab your converted string. If you enter an invalid Base64 string during decoding, you will be notified.", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)" },
];

const FAQS = [
  {
    q: "What is Base64 Encoding?",
    a: "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It translates data into a radix-64 representation. The standard Base64 alphabet uses A-Z, a-z, 0-9, +, and /.",
  },
  {
    q: "Why do we use Base64?",
    a: "Base64 is primarily used to encode binary data (like images or application files) so it can be transmitted safely over protocols that are designed to handle only textual data (like HTTP, HTML, or SMTP email systems). This prevents data corruption.",
  },
  {
    q: "Is Base64 a type of encryption?",
    a: "No. Base64 is an encoding mechanism, not encryption. It provides absolutely no security or cryptographic protection. Anyone with a standard Base64 decoder can easily reverse the string back to its original form. Do not use it to hide sensitive data.",
  },
  {
    q: "Why did I get an 'Invalid Base64 string' error?",
    a: "When decoding, the input string must be valid Base64. This means it must only contain valid characters (alphanumeric, +, /) and its length must be a multiple of 4. If it's not a multiple of 4, it should be padded with '=' characters at the end.",
  },
  {
    q: "Is this tool secure and private?",
    a: "Yes. ToolStack's Base64 converter runs 100% locally in your web browser utilizing JavaScript's native btoa() and atob() methods. Your data is never transmitted to our servers.",
  },
  {
    q: "What is the best free Base64 encoder and decoder online?",
    a: "ToolStack's Base64 Encoder & Decoder is one of the best free options available because it runs entirely in your browser — your data is never sent to a server. It supports UTF-8 encoding safely, handles invalid input gracefully with clear error messages, and produces instant results with no signup or account required.",
  },
];

export default function Base64Encoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // V2 Pipe Integration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("pipe") === "true") {
        const pipedData = localStorage.getItem("toolstack_pipe_payload");
        if (pipedData) {
          setInput(pipedData);
          localStorage.removeItem("toolstack_pipe_payload");
          window.history.replaceState({}, '', '/tools/base64-encoder-decoder');
        }
      }
    }
  }, []);

  useEffect(() => {
    setError("");
    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        // Handle utf-8 encoding safely
        const utf8str = encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (match, p1) => 
          String.fromCharCode(Number("0x" + p1))
        );
        setOutput(btoa(utf8str));
      } else {
        // Decode
        const binStr = atob(input);
        const decoded = decodeURIComponent(binStr.split("").map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        setOutput(decoded);
      }
    } catch (e) {
      setOutput("");
      if (mode === "decode") {
        setError("Invalid Base64 string. Please ensure the formatting and padding are correct.");
      } else {
        setError("Failed to encode input.");
      }
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setError("");
  };

  const toggleMode = () => {
    // Swap input and output so they can easily chain conversions
    const previousOutput = output;
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(previousOutput);
  };

  const recordHistory = useCallback(() => {
    if (!input) return;
    saveToHistory({
      toolName: "Base64 Converter",
      slug: "base64-encoder-decoder",
      data: { mode, inputPreview: input.substring(0, 30) + "..." },
    });
  }, [input, mode]);

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "white", padding: "120px 20px 80px" }}>
      {/* Ambient Glows */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "10%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%)", filter: "blur(90px)" }} />
      </div>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org", "@type": "WebApplication",
          "name": "Base64 Encoder & Decoder",
          "description": "Convert text to Base64 format or decode Base64 strings back to readable text instantly with 100% privacy.",
          "url": "https://toolstack.tech/tools/base64-encoder-decoder",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web", "browserRequirements": "Requires JavaScript",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ToolStack", "item": "https://toolstack.tech" },
            { "@type": "ListItem", "position": 2, "name": "Dev Tools", "item": "https://toolstack.tech/tools/category/dev" },
            { "@type": "ListItem", "position": 3, "name": "Base64 Encoder/Decoder", "item": "https://toolstack.tech/tools/base64-encoder-decoder" },
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
          <Link href="/tools/category/dev" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Dev Tools</Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Base64 Encoder/Decoder</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 18px", borderRadius: 999, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", color: "#c7d2fe" }}>{"\u2713"} Real-Time Encoding {"\u00b7"} UTF-8 Safe {"\u00b7"} 100% Private</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 0 18px", color: "white" }}>
            Base64 <br />
            <span style={{ background: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Encoder & Decoder.
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(255,255,255,0.45)", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, fontWeight: 400 }}>
            Instantly convert standard textual strings into Base64 format, or decode Base64 data back to readability. Processed securely in your browser.
          </p>
        </div>

        {/* ── Main Tool Workspace ───────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24, marginBottom: 64 }}>
          
          {/* Input Panel */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 8, background: "rgba(255,255,255,0.05)", padding: 4, borderRadius: 12 }}>
                <button onClick={() => { setMode("encode"); recordHistory(); }} style={{
                  padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: mode === "encode" ? "#6366f1" : "transparent",
                  color: mode === "encode" ? "white" : "rgba(255,255,255,0.6)",
                  fontSize: 13, fontWeight: 800, transition: "all 0.15s"
                }}>
                  Encode to Base64
                </button>
                <button onClick={() => { setMode("decode"); recordHistory(); }} style={{
                  padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: mode === "decode" ? "#8b5cf6" : "transparent",
                  color: mode === "decode" ? "white" : "rgba(255,255,255,0.6)",
                  fontSize: 13, fontWeight: 800, transition: "all 0.15s"
                }}>
                  Decode to Text
                </button>
              </div>
              <button onClick={handleClear} disabled={!input} style={{
                background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: input ? "pointer" : "default",
                display: "flex", alignItems: "center", gap: 6, fontSize: 13, transition: "color 0.2s"
              }}>
                <Trash2 size={14} /> Clear
              </button>
            </div>
            
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onBlur={recordHistory}
              placeholder={mode === "encode" ? "Enter standard text to encode..." : "Enter Base64 string to decode..."}
              spellCheck="false"
              style={{
                width: "100%", height: 320, padding: 24, fontSize: 15, fontFamily: "monospace",
                color: "white", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24, resize: "none", outline: "none", lineHeight: 1.6,
                boxShadow: "inset 0 4px 20px rgba(0,0,0,0.2)"
              }}
            />
          </div>

          {/* Swap Button (Mobile friendly) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", margin: "-12px 0", gridColumn: "1 / -1" }}>
            <button onClick={toggleMode} style={{
              width: 44, height: 44, borderRadius: "50%", background: "#1e1e2d", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)", zIndex: 10
            }} title="Swap input and output">
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* Output Panel */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Output</span>
              <div style={{ display: "flex", gap: 8 }}>
                <PipeDataButton payload={output} disabled={!!error} />
                <button onClick={handleCopy} disabled={!output} style={{
                background: copied ? "#10b981" : "rgba(255,255,255,0.05)", border: `1px solid ${copied ? "#10b981" : "rgba(255,255,255,0.1)"}`,
                color: "white", padding: "6px 14px", borderRadius: 8, cursor: output ? "pointer" : "default", opacity: output ? 1 : 0.5,
                display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, transition: "all 0.2s"
              }}>
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
            </div>
            
            <div style={{
              width: "100%", height: 320, padding: 24, fontSize: 15, fontFamily: "monospace", overflowY: "auto",
              color: error ? "#fca5a5" : "white", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 24, lineHeight: 1.6, position: "relative"
            }}>
              {error ? (
                <div style={{ color: "#ef4444", fontSize: 14, fontWeight: 700 }}>{error}</div>
              ) : output ? (
                <div style={{ wordBreak: "break-all" }}>{output}</div>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Awaiting input...</div>
              )}
            </div>
          </div>
          
        </div>

        {/* ── How It Works ──────────────────────────────────────── */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", marginBottom: 8 }}>How It Works</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Quick, secure, client-side conversion.</p>
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
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 20px" }}>The Comprehensive Guide to Base64 in 2026</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 32 }}>
            <strong style={{ color: "white" }}>Base64 encoding</strong> is a heavily utilized data conversion algorithm in computer science. It allows systems to process raw binary streams safely across textual networks. Because standard data transmission protocols (such as HTTP or SMTP email) can misinterpret raw binary codes as control characters, Base64 wraps this data safely in a standard 64-character alphabet.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { t: "Data Transmission", d: "It is extremely common for files such as images, cryptographic keys, and PDFs to be appended to JSON requests. Without Base64 encoding, these files would corrupt the JSON string structure." },
              { t: "Data URLs (Inline Images)", d: "Front-end developers frequently encode very small images or SVG graphics into Base64 format and inject them directly into CSS files using the data:image/png;base64,... schema to prevent secondary network requests." },
              { t: "Not for Encryption", d: "Never use Base64 to secure a password, token, or sensitive string. Encoding only alters the representation of the data perfectly reversibly. It does not obfuscate or cryptographically hash data." },
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

        {/* SEO Description */}
        <section style={{ marginTop: 48, padding: "32px 28px", borderRadius: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.02em" }}>Base64 Encoder/Decoder: Free Online Tool</h2>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Base64 encoding is everywhere in software development — API authentication headers, JSON web tokens, image data URLs, email attachments, and configuration files all commonly use it. If you work with APIs, build web applications, or deal with data in any technical capacity, at some point you'll need to encode or decode a Base64 string fast. Our tool does it instantly in your browser, with zero server round-trips.
            </p>
            <p style={{ marginBottom: 16 }}>
              Paste your text or encoded string into the input field and the tool instantly detects whether it's plain text (and encodes it) or Base64 (and decodes it). Toggle manually between encode and decode modes if you need to do the reverse. The tool highlights your input/output side by side, preserves formatting and whitespace, and handles both UTF-8 text and binary data.
            </p>
            <p style={{ marginBottom: 16 }}>
              Common uses include decoding JWT tokens to inspect the payload without sending them to a third-party decoder, encoding image files to base64 data URLs for embedding directly in HTML or CSS, decoding Basic Auth headers to check what credentials are being passed to an API, and converting text to Base64 for use in API test harnesses or curl commands.
            </p>
            <p style={{ marginBottom: 0 }}>
              Most online Base64 tools send your data to a server. Ours doesn't — everything runs in your browser using JavaScript's native atob and btoa functions. That means your data never leaves your machine, which matters when you're working with sensitive content like JWTs, credentials, or proprietary data. Free, no signup, no rate limits.
            </p>
          </div>
        </section>

        <MoreTools currentSlug="base64-encoder-decoder" />
        
      </div>
    </div>
  );
}
