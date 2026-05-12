import type { Metadata } from "next";
import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
    title: "SSL Certificate Explained: What It Is, How to Check It & When It Expires",
    description: "SSL certificates encrypt your website connection and build visitor trust. Learn what they are, how to check if yours is valid, when it expires, and what.",
    alternates: { canonical: "https://toolstack.tech/blog/ssl-certificate-checker-guide" },
    openGraph: {
        title: "SSL Certificate Explained: What It Is, How to Check It & When It Expires",
        description: "Learn what SSL certificates are, how to check validity and expiry, and what to do when one expires.",
        url: "https://toolstack.tech/blog/ssl-certificate-checker-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-04-22",
        modifiedTime: "2026-04-22",
        images: [
            {
                url: "https://toolstack.tech/og-image.png",
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SSL Certificate Explained: What It Is, How to Check It & When It Expires",
        description: "Learn what SSL certificates are, how to check validity and expiry, and what to do when one expires.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

const FAQS = [
    {
        question: "How long does an SSL certificate last?",
        answer: "Since 2020, SSL certificates are valid for a maximum of 397 days (just over 13 months). Before that, certificates could last up to two years. Let's Encrypt certificates last only 90 days but auto-renew. The shorter validity periods are intentional — they limit the window of exposure if a certificate is compromised."
    },
    {
        question: "What happens if my SSL certificate expires?",
        answer: "Browsers immediately show a full-page security warning — 'Your connection is not private' in Chrome, 'Warning: Potential Security Risk Ahead' in Firefox. Most visitors will not proceed past this warning. Your site's SEO rankings can also drop because Google uses HTTPS as a ranking signal."
    },
    {
        question: "What is the difference between DV, OV, and EV certificates?",
        answer: "DV (Domain Validated) only verifies you control the domain — issued in minutes, free via Let's Encrypt. OV (Organisation Validated) verifies your business identity — takes 1–3 days and costs money. EV (Extended Validation) is the most thorough — requires legal verification and was historically shown with a green address bar, though browsers have largely removed the visual distinction."
    },
    {
        question: "Is Let's Encrypt safe to use?",
        answer: "Yes. Let's Encrypt is a non-profit Certificate Authority trusted by all major browsers and operating systems. It issues DV certificates that provide the same encryption strength as paid certificates. The only difference is it doesn't verify your organisation identity. For most websites, Let's Encrypt is the correct choice."
    },
    {
        question: "How do I renew an SSL certificate?",
        answer: "If you're using Let's Encrypt (via most modern hosting providers), renewal is automatic via a tool called Certbot. If you're on a managed hosting platform (Cloudflare, Vercel, Netlify), SSL is fully managed — you don't need to do anything. If you have a manually installed paid certificate, you renew through your Certificate Authority before the expiry date."
    },
];

const accent = "#34d399";
const accentBg = "rgba(52,211,153,0.06)";
const accentBorder = "rgba(52,211,153,0.18)";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="SSL Certificate Explained: What It Is, How to Check It & When It Expires"
                description="SSL certificates encrypt your website connection. Learn what they are, how to check validity, and what happens when they expire."
                url="https://toolstack.tech/blog/ssl-certificate-checker-guide"
                datePublished="2026-04-22"
                dateModified="2026-04-22"
                faqs={FAQS}
            />

            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36, fontSize: 13 }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>
                        <span style={{ color: "rgba(255,255,255,0.5)" }}>SSL Certificate Guide</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.08em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 999, border: `1px solid ${accentBorder}`, background: accentBg }}>Security</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>April 19, 2026 · 7 min read</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: 28, color: "white" }}>
                        SSL Certificate Explained: What It Is, How to Check It & When It Expires
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>Founder, ToolStack · April 19, 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
                <div style={{ padding: "24px 28px", borderRadius: 20, border: `1px solid ${accentBorder}`, background: accentBg, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.12em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>TL;DR</p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" as const, gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ SSL certificates encrypt data between your browser and a website — they power the padlock icon.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ They expire after up to 397 days. An expired cert shows a security warning to all visitors.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>→ Check any website's SSL instantly with the free <Link href="/tools/ssl-checker" style={{ color: accent }}>SSL Certificate Checker</Link>.</li>
                    </ul>
                </div>

                <AdBlock type="horizontal" />

                <div style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.62)" }}>
                    <p style={{ margin: "0 0 22px" }}>
                        The padlock icon in your browser's address bar is powered by an SSL certificate. Without one, any data you send to a website — passwords, payment details, personal information — travels across the internet unencrypted and can be intercepted. With one, that data is locked in transit.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        If you manage a website or just want to verify that a site you're using is properly secured, the <Link href="/tools/ssl-checker" style={{ color: accent }}>SSL Certificate Checker</Link> shows you the full picture in seconds.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What Is an SSL Certificate?</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        SSL (Secure Sockets Layer) is the predecessor to TLS (Transport Layer Security) — but the term SSL is still universally used. An SSL/TLS certificate is a digital document that does two things:
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>1.</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Authenticates the website</strong> — Proves the site is who it claims to be, issued by a trusted Certificate Authority.
                        </li>
                        <li style={{ paddingLeft: 20, position: "relative" as const }}>
                            <span style={{ position: "absolute" as const, left: 0, color: accent }}>2.</span>
                            <strong style={{ color: "rgba(255,255,255,0.9)" }}>Enables encryption</strong> — Creates an encrypted tunnel between the browser and server using public-key cryptography.
                        </li>
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>The Three Types of SSL Certificate</h2>
                    <div style={{ overflowX: "auto" as const, margin: "0 0 24px" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 700, textAlign: "left" as const }}>Type</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "white", fontWeight: 700, textAlign: "left" as const }}>What's verified</th>
                                    <th style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", fontWeight: 700, textAlign: "left" as const }}>Best for</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["DV — Domain Validated", "You control the domain", "Blogs, personal sites, most web apps"],
                                    ["OV — Organisation Validated", "Domain + business identity", "Business websites, SaaS products"],
                                    ["EV — Extended Validated", "Full legal entity verification", "Banks, large e-commerce, enterprises"],
                                ].map(([type, verified, use], i) => (
                                    <tr key={i} style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: accent, fontWeight: 600, fontSize: 13 }}>{type}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)" }}>{verified}</td>
                                        <td style={{ padding: "12px 16px", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ margin: "0 0 22px" }}>
                        For most websites, a free DV certificate from Let's Encrypt provides identical encryption to a paid EV certificate. The difference is trust signalling, not security strength.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>How to Read SSL Certificate Details</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        When you check a certificate with the <Link href="/tools/ssl-checker" style={{ color: accent }}>SSL Checker</Link>, here's what each field means:
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column" as const, gap: 14 }}>
                        {[
                            ["Common Name (CN)", "The primary domain the certificate is issued to, e.g. example.com."],
                            ["Issuer", "The Certificate Authority that issued and vouches for the certificate."],
                            ["Valid From / Valid To", "The active window of the certificate. Outside this window, browsers reject it."],
                            ["SANs (Subject Alternative Names)", "All domains covered by this certificate. A wildcard SAN like *.example.com covers all subdomains."],
                            ["Key Strength", "The bit-length of the encryption key. 2048-bit RSA or 256-bit ECC are current standards."],
                        ].map(([label, desc]) => (
                            <li key={label as string} style={{ paddingLeft: 20, position: "relative" as const }}>
                                <span style={{ position: "absolute" as const, left: 0, color: accent }}>→</span>
                                <strong style={{ color: "rgba(255,255,255,0.9)" }}>{label}</strong> — {desc}
                            </li>
                        ))}
                    </ul>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>What Happens When an SSL Certificate Expires?</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        The moment a certificate expires, browsers stop trusting it. Chrome shows "Your connection is not private." Firefox shows "Warning: Potential Security Risk Ahead." Safari shows "This Connection Is Not Private." The vast majority of visitors will leave immediately.
                    </p>
                    <p style={{ margin: "0 0 22px" }}>
                        Beyond visitor trust, Google uses HTTPS as a ranking signal. An expired certificate effectively takes your site off HTTPS, which can negatively affect rankings. For e-commerce sites, payment processors will block transactions on sites without valid HTTPS.
                    </p>

                    <h2 style={{ fontSize: 24, fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 }}>Check Any Website's SSL Certificate</h2>
                    <p style={{ margin: "0 0 22px" }}>
                        Use the free <Link href="/tools/ssl-checker" style={{ color: accent }}>SSL Certificate Checker</Link> to inspect any domain. Enter a URL and instantly see validity status, days until expiry with a colour-coded progress bar, issuer details, and all covered domains. No signup required.
                    </p>
                </div>

                <div style={{ marginTop: 64, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 28 }}>Frequently Asked Questions</h2>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                        {FAQS.map((faq, i) => (
                            <div key={i} style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                                <p style={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 10, fontSize: 15, lineHeight: 1.4 }}>{faq.question}</p>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0 }}>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <Link href="/blog" style={{ color: "#818cf8", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                        Back to Blog
                    </Link>
                </div>
            </div>
        </main>
    );
}
