import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Use — ToolStack",
    description: "Terms of use for ToolStack. Free tools, fair rules.",
    alternates: { canonical: "https://toolstack.tech/terms" },
    openGraph: {
        title: "Terms of Use — ToolStack",
        description: "Terms of use for ToolStack. Free tools, fair rules.",
        url: "https://toolstack.tech/terms",
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

export default function TermsPage() {
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
                    <span style={{ color: "rgba(255,255,255,0.65)" }}>Terms of Use</span>
                </nav>

                <h1 style={{ fontSize: 40, fontWeight: 900, color: "white", marginBottom: 12, letterSpacing: "-0.02em" }}>Terms of Use</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginBottom: 48 }}>Last updated: 13 April 2026</p>

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36 }}>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>1. Acceptance of terms</h2>
                        <p style={P}>By accessing or using ToolStack (&quot;the Site&quot;), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>2. Use of tools</h2>
                        <p style={P}>All tools on ToolStack are provided free of charge for personal and professional use. You may:</p>
                        <ul style={UL}>
                            <li style={LI}>Use the tools for any lawful purpose</li>
                            <li style={LI}>Use the output of our tools in your own work, projects, or publications</li>
                        </ul>
                        <p style={P}>You may not:</p>
                        <ul style={UL}>
                            <li style={LI}>Use the Site to generate content that is illegal, harmful, or violates third-party rights</li>
                            <li style={LI}>Attempt to reverse engineer, scrape at scale, or overload our systems</li>
                            <li style={LI}>Resell or white-label ToolStack&apos;s tools or outputs as your own product without permission</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>3. AI-generated content</h2>
                        <p style={P}>Some tools use AI (powered by OpenAI) to generate outputs. AI-generated content may contain errors, inaccuracies, or outdated information. You are responsible for reviewing and verifying any AI output before using it. ToolStack makes no guarantees about the accuracy or completeness of AI-generated results.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>4. Intellectual property</h2>
                        <p style={P}>The ToolStack brand, design, and underlying code are owned by ToolStack and protected by applicable intellectual property laws. Tool outputs generated using your own input belong to you.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>5. Disclaimer of warranties</h2>
                        <p style={P}>ToolStack is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee uninterrupted service, error-free results, or fitness for any particular purpose. Use the tools at your own risk.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>6. Limitation of liability</h2>
                        <p style={P}>To the fullest extent permitted by law, ToolStack shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or reliance on any tool output.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>7. Third-party services</h2>
                        <p style={P}>The Site may contain links to third-party websites (including advertsgpt.com). We are not responsible for the content or practices of third-party sites. Links do not constitute endorsements.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>8. Advertising</h2>
                        <p style={P}>ToolStack displays advertisements via Google AdSense to support the free operation of this service. By using the Site, you acknowledge that advertising may be displayed alongside tool content.</p>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <h2 style={H2}>9. Modifications</h2>
                        <p style={P}>We reserve the right to modify these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.</p>
                    </div>

                    <div style={{ marginBottom: 0 }}>
                        <h2 style={H2}>10. Contact</h2>
                        <p style={{ ...P, margin: 0 }}>Questions about these Terms? Contact us at <a href="mailto:hello@toolstack.tech" style={{ color: "#818cf8" }}>hello@toolstack.tech</a>.</p>
                    </div>

                </div>

            </div>
        </div>
    );
}
