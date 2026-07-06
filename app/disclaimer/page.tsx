import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Disclaimer — ToolStack",
    description: "Disclaimer for ToolStack: informational use only, affiliate relationships, and no professional advice.",
    alternates: { canonical: "https://toolstack.tech/disclaimer" },
    openGraph: {
        title: "Disclaimer — ToolStack",
        description: "Disclaimer for ToolStack: informational use only, affiliate relationships, and no professional advice.",
        url: "https://toolstack.tech/disclaimer",
        siteName: "ToolStack",
        type: "website",
    },
};

const H2: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 800,
    color: "white",
    marginBottom: 12,
    marginTop: 0,
};

const P: React.CSSProperties = {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.8,
    margin: "0 0 12px 0",
};

const UL: React.CSSProperties = {
    paddingLeft: 20,
    margin: "0 0 12px 0",
    display: "flex",
    flexDirection: "column",
    gap: 6,
};

const LI: React.CSSProperties = {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.7,
};

export default function DisclaimerPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "80px 24px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48, fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
                    <span>/</span>
                    <span style={{ color: "rgba(255,255,255,0.65)" }}>Disclaimer</span>
                </nav>

                <h1 style={{ fontSize: 40, fontWeight: 900, color: "white", marginBottom: 12, letterSpacing: "-0.02em" }}>Disclaimer</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginBottom: 48 }}>Last updated: 3 June 2026</p>

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36 }}>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>1. General information only</h2>
                        <p style={P}>The tools, calculators, and articles on ToolStack (&quot;the Site&quot;) are provided for general informational and educational purposes only. While we work to keep everything accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information and tools on the Site.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>2. Not professional advice</h2>
                        <p style={P}>Several tools on ToolStack — including the mortgage calculator, salary and tax calculators, compound interest calculator, and similar financial utilities — produce estimates for illustration only. They are not financial, legal, tax, accounting, medical, or professional advice.</p>
                        <ul style={UL}>
                            <li style={LI}>Always consult a qualified professional before making financial, legal, or tax decisions.</li>
                            <li style={LI}>Results depend entirely on the figures you enter and the assumptions built into each tool.</li>
                            <li style={LI}>Real-world outcomes — interest, taxes, fees, and rates — will differ from any estimate shown here.</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>3. Affiliate disclosure</h2>
                        <p style={P}>ToolStack participates in affiliate programs. This means some links on the Site — in articles, reviews, and tool pages — are affiliate links. If you click one and make a purchase or sign up, we may earn a commission at no extra cost to you.</p>
                        <p style={P}>We only recommend products and services we believe provide genuine value. An affiliate relationship never changes our editorial opinion, and it never costs you more than the standard price. Examples of partners we may link to include email marketing and SEO tools referenced across the Site.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>4. External links</h2>
                        <p style={P}>The Site contains links to third-party websites. These are provided for convenience and reference only. ToolStack does not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party site. Visiting external links is at your own risk.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>5. AI-generated content</h2>
                        <p style={P}>Some tools and articles use AI to help generate outputs. AI can produce errors, omissions, or outdated information. You are responsible for reviewing and verifying any AI-assisted output before relying on it. ToolStack makes no guarantee about the accuracy of AI-generated results.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>6. Use at your own risk</h2>
                        <p style={P}>Your use of ToolStack and any reliance you place on the tools or information is strictly at your own risk. ToolStack will not be liable for any loss or damage arising from the use of the Site or its tools. For more detail, see our <Link href="/terms" style={{ color: "#818cf8" }}>Terms of Use</Link> and <Link href="/privacy" style={{ color: "#818cf8" }}>Privacy Policy</Link>.</p>
                    </div>

                    <div style={{ marginBottom: 0 }}>
                        <h2 style={H2}>7. Contact</h2>
                        <p style={{ ...P, margin: 0 }}>Questions about this disclaimer? Contact us at <a href="mailto:justinmakemoneyonline@gmail.com" style={{ color: "#818cf8" }}>justinmakemoneyonline@gmail.com</a>.</p>
                    </div>

                </div>

            </div>
        </div>
    );
}
