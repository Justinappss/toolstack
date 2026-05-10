"use client";
import Link from "next/link";

const TOOL_CATEGORIES = [
    {
        label: "AI & Writing",
        tools: [
            { label: "AI Prompt Generator", href: "/tools/ai-prompt-generator" },
            { label: "Blog Title Generator", href: "/tools/blog-title-generator" },
            { label: "Cover Letter Generator", href: "/tools/cover-letter-generator" },
            { label: "Grammar Checker", href: "/tools/grammar-checker" },
            { label: "Paraphrasing Tool", href: "/tools/paraphrasing-tool" },
            { label: "Text Summarizer", href: "/tools/text-summarizer" },
        ],
    },
    {
        label: "SEO & Marketing",
        tools: [
            { label: "Meta Description Generator", href: "/tools/meta-description-generator" },
            { label: "Email Subject Tester", href: "/tools/email-subject-line-tester" },
            { label: "Hashtag Generator", href: "/tools/hashtag-generator" },
            { label: "Word Counter", href: "/tools/word-counter" },
            { label: "Character Counter", href: "/tools/character-counter" },
            { label: "Business Name Generator", href: "/tools/business-name-generator" },
            { label: "YouTube Tag Generator", href: "/tools/youtube-tag-generator" },
            { label: "Case Converter", href: "/tools/case-converter" },
        ],
    },
    {
        label: "Utility & Dev",
        tools: [
            { label: "Password Generator", href: "/tools/password-generator" },
            { label: "QR Code Generator", href: "/tools/qr-code-generator" },
            { label: "JSON Formatter", href: "/tools/json-formatter" },
            { label: "VAT Calculator", href: "/tools/vat-calculator" },
            { label: "Invoice Generator", href: "/tools/invoice-generator" },
            { label: "Tip Calculator", href: "/tools/tip-calculator" },
            { label: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
            { label: "Percentage Calculator", href: "/tools/percentage-calculator" },
            { label: "Salary Calculator", href: "/tools/salary-calculator" },
            { label: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
            { label: "Email Signature Generator", href: "/tools/email-signature-generator" },
            { label: "CSS Gradient Generator", href: "/tools/css-gradient-generator" },
            { label: "Colour Contrast Checker", href: "/tools/color-contrast-checker" },
            { label: "AI Color Palette Generator", href: "/tools/color-palette-generator" },
            { label: "Favicon Generator", href: "/tools/favicon-generator" },
            { label: "Base64 Encoder / Decoder", href: "/tools/base64-encoder-decoder" },
            { label: "UTM Campaign Builder", href: "/tools/utm-builder" },
            { label: "Markdown Editor", href: "/tools/markdown-editor" },
            { label: "Regex Tester", href: "/tools/regex-tester" },
            { label: "SQL Formatter", href: "/tools/sql-formatter" },
            { label: "Unix Epoch Converter", href: "/tools/unix-timestamp-converter" },
            { label: "Code Diff Checker", href: "/tools/code-diff-checker" },
            { label: "JWT Decoder", href: "/tools/jwt-decoder" },
            { label: "Website Down Checker", href: "/tools/website-down-checker" },
            { label: "Age Calculator", href: "/tools/age-calculator" },
            { label: "PDF Generator", href: "/tools/pdf-generator" },
            { label: "IP Address Lookup", href: "/tools/ip-address-lookup" },
            { label: "SSL Certificate Checker", href: "/tools/ssl-checker" },
            { label: "WHOIS Domain Lookup", href: "/tools/whois-lookup" },
            { label: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
            { label: "UUID Generator", href: "/tools/uuid-generator" },
            { label: "YouTube Thumbnail Downloader", href: "/tools/youtube-thumbnail-downloader" },
            { label: "Online Stopwatch", href: "/tools/online-stopwatch" },
            { label: "Card Grading Profit Calculator", href: "/tools/card-grading-profit-calculator" },
            { label: "Whatnot Seller Fee Calculator", href: "/tools/whatnot-seller-fee-calculator" },
            { label: "Grading Company Comparison", href: "/tools/grading-company-comparison" },
            { label: "Card Flip ROI Calculator", href: "/tools/card-flip-roi-calculator" },
            { label: "Card Box Break Calculator", href: "/tools/card-box-break-calculator" },
            { label: "eBay Best Offer Calculator", href: "/tools/ebay-best-offer-calculator" },
            { label: "Panini Sticker Calculator", href: "/tools/panini-sticker-calculator" },
            { label: "Pack Break EV Calculator", href: "/tools/pack-break-ev-calculator" },
            { label: "WC 2026 Accumulator Calculator", href: "/tools/world-cup-accumulator-calculator" },
            { label: "World Cup 2026 Team Finder", href: "/tools/world-cup-team-finder" },
            { label: "YouTube Transcript Extractor", href: "/tools/youtube-transcript" },
        ],
    },
];

const COMPANY = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "All Tools", href: "/tools" },
];

const linkStyle: React.CSSProperties = {
    fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none",
    transition: "color 0.15s",
};

export function Footer() {
    return (
        <footer style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "#0a0a0f",
            padding: "56px 0 32px",
            marginTop: 80,
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

                {/* Main grid — 5 columns: brand + 3 tool categories + company */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "36px 32px",
                    marginBottom: 48,
                }}>
                    {/* Brand column */}
                    <div>
                        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <img
                                src="/favicon.png"
                                alt="ToolStack"
                                width={28}
                                height={28}
                                loading="lazy"
                                style={{ borderRadius: 7, flexShrink: 0 }}
                            />
                            <span style={{ fontSize: 15, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
                                Tool<span style={{ color: "#818cf8" }}>Stack</span>
                            </span>
                        </Link>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 180 }}>
                            Free tools for writers, marketers and developers.
                            No signup. Instant results.
                        </p>
                        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                            <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{
                                display: "inline-flex", alignItems: "center", gap: 6,
                                padding: "6px 12px", borderRadius: 8,
                                background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                                fontSize: 11, fontWeight: 700, color: "#a5b4fc", textDecoration: "none",
                            }}>
                                ⚡ AdvertsGPT
                            </a>
                            <a href="https://www.linkedin.com/company/toolstacktech" target="_blank" rel="noopener noreferrer" style={{
                                display: "inline-flex", alignItems: "center", gap: 6,
                                padding: "6px 12px", borderRadius: 8,
                                background: "rgba(10,102,194,0.1)", border: "1px solid rgba(10,102,194,0.2)",
                                fontSize: 11, fontWeight: 700, color: "#60a5fa", textDecoration: "none",
                            }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#60a5fa"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Tool category columns */}
                    {TOOL_CATEGORIES.map(cat => (
                        <div key={cat.label}>
                            <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>
                                {cat.label}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {cat.tools.map(({ label, href }) => (
                                    <Link key={href} href={href} style={linkStyle}
                                        onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Company column */}
                    <div>
                        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: 14 }}>
                            Company
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {COMPANY.map(({ label, href }) => (
                                <Link key={href} href={href} style={linkStyle}
                                    onMouseEnter={e => { e.currentTarget.style.color = "white"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust / Address bar */}
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    padding: "24px 0",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: 12,
                }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.52)", lineHeight: 1.6 }}>
                        <p style={{ margin: "0 0 4px" }}><strong style={{ color: "rgba(255,255,255,0.6)" }}>ToolStack Tech Ltd.</strong></p>
                        <p style={{ margin: "0 0 4px" }}>71-75 Shelton Street, Covent Garden</p>
                        <p style={{ margin: "0 0 4px" }}>London, WC2H 9JQ, United Kingdom</p>
                        <p style={{ margin: 0 }}>Email: contact@toolstack.tech</p>
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.52)", maxWidth: 360, textAlign: "right" }}>
                        <p style={{ margin: 0, lineHeight: 1.6 }}>ToolStack is committed to data privacy. We do not store, process, or transmit your input data to any third-party servers. All utility processing occurs locally within your browser using modern Web APIs.</p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: 24,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: 12,
                }}>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                        © {new Date().getFullYear()} ToolStack — all tools are free to use. No account required.
                    </p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                        Built with GPT-4o · Powered by Vercel
                    </p>
                </div>
            </div>
        </footer>
    );
}
