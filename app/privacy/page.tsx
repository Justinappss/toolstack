import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy — ToolStack",
    description: "ToolStack privacy policy. Learn how we handle data, cookies, and advertising on our free tool platform.",
    alternates: { canonical: "https://toolstack.tech/privacy" },
    openGraph: {
        title: "Privacy Policy — ToolStack",
        description: "How ToolStack handles your data and privacy.",
        url: "https://toolstack.tech/privacy",
        siteName: "ToolStack",
        type: "website",
    },
};

const SECTION: React.CSSProperties = {
    marginBottom: 36,
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

export default function PrivacyPage() {
    return (
        <div style={{ minHeight: "100vh", background: "#080810" }}>
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{ position: "absolute", top: "-10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "80px 24px 100px" }}>

                {/* Breadcrumb */}
                <nav style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 48, fontSize: 14, color: "rgba(255,255,255,0.35)" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>ToolStack</Link>
                    <span>/</span>
                    <span style={{ color: "rgba(255,255,255,0.65)" }}>Privacy Policy</span>
                </nav>

                <h1 style={{ fontSize: 40, fontWeight: 900, color: "white", marginBottom: 12, letterSpacing: "-0.02em" }}>Privacy Policy</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginBottom: 48 }}>Last updated: 13 April 2026</p>

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 36 }}>

                    <div style={SECTION}>
                        <h2 style={H2}>1. Who we are</h2>
                        <p style={P}>ToolStack (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website at toolstack.tech. We provide free online tools for writers, marketers, developers, and business professionals. For questions about this policy, contact us at <a href="mailto:hello@toolstack.tech" style={{ color: "#818cf8" }}>hello@toolstack.tech</a>.</p>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>2. Information we collect</h2>
                        <p style={P}>We collect minimal data. Specifically:</p>
                        <ul style={UL}>
                            <li style={LI}><strong style={{ color: "rgba(255,255,255,0.7)" }}>Usage data:</strong> Pages visited, time spent, referring URLs — collected automatically via server logs and analytics.</li>
                            <li style={LI}><strong style={{ color: "rgba(255,255,255,0.7)" }}>Tool inputs:</strong> Text you enter into our tools is processed to deliver results. We do not store your tool inputs on our servers after the request completes.</li>
                            <li style={LI}><strong style={{ color: "rgba(255,255,255,0.7)" }}>No account data:</strong> We do not require registration and do not collect names, email addresses, or passwords through normal tool usage.</li>
                        </ul>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>3. Cookies</h2>
                        <p style={P}>We use cookies for the following purposes:</p>
                        <ul style={UL}>
                            <li style={LI}><strong style={{ color: "rgba(255,255,255,0.7)" }}>Analytics:</strong> To understand how visitors use the site (e.g. Google Analytics). This data is aggregated and anonymous.</li>
                            <li style={LI}><strong style={{ color: "rgba(255,255,255,0.7)" }}>Advertising:</strong> Google AdSense uses cookies to display relevant ads based on your browsing behaviour. These are third-party cookies set by Google.</li>
                        </ul>
                        <p style={P}>You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>Google Ads Settings</a> or by using the <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>Digital Advertising Alliance opt-out</a>.</p>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>4. Google AdSense & advertising</h2>
                        <p style={P}>ToolStack displays advertisements served by Google AdSense. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this or other websites.</p>
                        <p style={P}>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet. You can opt out of personalised advertising as described in Section 3.</p>
                        <p style={P}>For more information, see <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>Google&apos;s advertising policies</a>.</p>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>5. Third-party AI services</h2>
                        <p style={P}>Some tools on ToolStack use the OpenAI API to process your input and generate results. Text you submit to AI-powered tools is sent to OpenAI&apos;s servers for processing. OpenAI&apos;s privacy policy applies to this data: <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#818cf8" }}>openai.com/privacy</a>.</p>
                        <p style={P}>We do not submit personally identifiable information to third-party AI services on your behalf.</p>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>6. How we use your data</h2>
                        <ul style={UL}>
                            <li style={LI}>To deliver the tool functionality you request</li>
                            <li style={LI}>To improve site performance and user experience</li>
                            <li style={LI}>To display relevant advertising via Google AdSense</li>
                            <li style={LI}>To diagnose technical issues</li>
                        </ul>
                        <p style={P}>We do not sell your personal data. We do not share your data with third parties except as described in this policy (Google Analytics, Google AdSense, OpenAI).</p>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>7. Data retention</h2>
                        <p style={P}>Tool inputs are not retained after your session ends. Analytics data is retained for up to 26 months in aggregated, anonymous form. Server logs may be retained for up to 90 days for security and debugging purposes.</p>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>8. Your rights</h2>
                        <p style={P}>Depending on your location, you may have rights under GDPR (EU/UK), CCPA (California), or other applicable laws, including the right to:</p>
                        <ul style={UL}>
                            <li style={LI}>Access the personal data we hold about you</li>
                            <li style={LI}>Request correction or deletion of your data</li>
                            <li style={LI}>Object to or restrict certain processing</li>
                            <li style={LI}>Withdraw consent at any time</li>
                        </ul>
                        <p style={P}>To exercise these rights, contact us at <a href="mailto:hello@toolstack.tech" style={{ color: "#818cf8" }}>hello@toolstack.tech</a>.</p>
                    </div>

                    <div style={SECTION}>
                        <h2 style={H2}>9. Children&apos;s privacy</h2>
                        <p style={P}>ToolStack is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.</p>
                    </div>

                    <div style={{ ...SECTION, marginBottom: 0 }}>
                        <h2 style={H2}>10. Changes to this policy</h2>
                        <p style={{ ...P, margin: 0 }}>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of ToolStack after changes constitutes your acceptance of the revised policy.</p>
                    </div>

                </div>

            </div>
        </div>
    );
}
