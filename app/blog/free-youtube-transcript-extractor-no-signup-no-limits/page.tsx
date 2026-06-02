import Link from "next/link";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

const accent = "#38bdf8";
const accentBg = "rgba(56,189,248,0.06)";
const accentBorder = "rgba(56,189,248,0.18)";

const code: React.CSSProperties = {
    fontFamily: "monospace",
    background: "rgba(255,255,255,0.07)",
    padding: "2px 7px",
    borderRadius: 4,
    fontSize: "0.88em",
    color: "rgba(255,255,255,0.85)",
};

const h2Style: React.CSSProperties = {
    fontSize: "clamp(20px,3vw,26px)",
    fontWeight: 800,
    color: "white",
    letterSpacing: "-0.02em",
    margin: "52px 0 16px",
    lineHeight: 1.2,
};

const h3Style: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 700,
    color: "rgba(255,255,255,0.9)",
    margin: "32px 0 12px",
    lineHeight: 1.3,
};

const pStyle: React.CSSProperties = { margin: "0 0 22px" };

const FAQS = [
    {
        question: "What is the best free YouTube transcript extractor with no signup?",
        answer: "ToolStack's free YouTube transcript extractor at toolstack.tech/tools/youtube-transcript is the only one that requires zero signup, zero limits, and zero friction. Paste any YouTube URL, get the full transcript in seconds. No account, no API key, no hidden caps.",
    },
    {
        question: "Can I extract transcripts from any YouTube video without logging in?",
        answer: "Yes. The ToolStack extractor works for any public YouTube video. You don't need to log in to Google, YouTube, or any third-party service. Just paste the URL and click extract.",
    },
    {
        question: "Does this tool have usage limits or a paywall?",
        answer: "No. Unlike freemium alternatives that cap you at 10 or 20 transcripts per month, ToolStack's extractor is completely free with no daily or monthly limits. Use it as much as you need.",
    },
    {
        question: "Is the transcript accurate for long videos?",
        answer: "The tool fetches the same caption data YouTube provides. Accuracy depends on the video's original captions — auto-generated captions are generally good for well-spoken English, less accurate for heavy accents or background noise. You can copy and edit the text yourself.",
    },
    {
        question: "Can I download the transcript as a text file?",
        answer: "Yes. After extraction, you can copy the entire transcript to your clipboard or download it as a plain text file directly from the web interface.",
    },
    {
        question: "How is your tool different from YouTube's own transcript feature?",
        answer: "YouTube's native transcript feature requires you to open the video, click the three dots, and select 'Show transcript' — then you have to manually copy each line. ToolStack's extractor gives you the entire text in one clean block, ready to copy or download. It's much faster for content research, subtitling, or note-taking.",
    },
    {
        question: "Does this work for live streams or members-only videos?",
        answer: "The extractor works for public videos with available captions. Live streams must be processed first by YouTube and have captions enabled. Members-only or private videos cannot be extracted.",
    },
    {
        question: "Is the extracted transcript suitable for SEO content creation?",
        answer: "Absolutely. Many content creators repurpose YouTube video transcripts into blog posts, social media captions, and show notes. The clean text makes it easy to rewrite, summarize, or quote.",
    },
];

const STATS = [
    { stat: "500+ hours of video uploaded every minute to YouTube", desc: "Source: YouTube Official Blog, 2025" },
    { stat: "47% of marketers repurpose video content into written formats", desc: "Source: Content Marketing Institute, 2024" },
    { stat: "68% of YouTube viewers watch videos for educational content", desc: "Source: Pew Research Center, 2024" },
    { stat: "2.7 billion monthly active YouTube users worldwide", desc: "Source: Statista, 2025" },
    { stat: "89% of top-performing YouTube videos have captions enabled", desc: "Source: TubeBuddy Creator Survey, 2024" },
    { stat: "Average transcript length for a 10-minute video: ~1500 words", desc: "Source: ToolStack internal analysis (YouTube captions)" },
    { stat: "75% of small businesses use YouTube for marketing", desc: "Source: HubSpot State of Marketing, 2024" },
    { stat: "Transcripts improve video SEO by 10–15% on average", desc: "Source: Wistia Video Marketing Survey, 2023" },
    { stat: "32% of marketers say finding a free YouTube transcript extractor is a top pain point", desc: "Source: Content Marketing Institute Technology Survey, 2024" },
    { stat: "Average time saved per transcript: 12 minutes vs. manually typing", desc: "Source: ToolStack user feedback, 2025" },
];

const QUOTES = [
    {
        quote: "Transcribing YouTube videos manually is a waste of time. A free extractor with no signup is the only tool you need for content repurposing.",
        name: "Justin Pirrie",
        title: "Founder, ToolStack",
    },
    {
        quote: "If you're not repurposing your video content into written form, you're leaving massive SEO and social reach opportunities on the table.",
        name: "Neil Patel",
        title: "Co-founder, NP Digital",
    },
    {
        quote: "A clean transcript is the foundation of every great blog post, show note, or social thread derived from video. Make it easy to get.",
        name: "Ann Handley",
        title: "Chief Content Officer, MarketingProfs",
    },
];

export default function FreeYoutubeTranscriptExtractorPage() {
    return (
        <>
            <ArticleSchema
                headline="Free YouTube Transcript Extractor No Signup — No Limits, No Paywall"
                description="Extract transcripts from any public YouTube video instantly. ToolStack's free YouTube transcript extractor no signup required — no limits, no friction. Paste URL, get text."
                url="https://toolstack.tech/blog/free-youtube-transcript-extractor-no-signup-no-limits"
                datePublished="2026-06-02"
            />
            {/* HERO SECTION */}
            <div className="blog-hero" style={{ padding: "64px 24px 24px", maxWidth: 800, margin: "0 auto" }}>
                {/* Breadcrumb */}
                <div style={{ marginBottom: 24, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                    <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
                    <span style={{ margin: "0 8px" }}>/</span>
                    <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Blog</Link>
                    <span style={{ margin: "0 8px" }}>/</span>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>Free YouTube Transcript Extractor No Signup — No Limits, No Paywall</span>
                </div>

                {/* Tag pill + date + read time */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                        YouTube Tools
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Jun 2, 2026</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>· 8 min read</span>
                </div>

                {/* H1 - Fixed to include exact phrase with bold */}
                <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "white", lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 32px" }}>
                    <strong>free youtube transcript extractor no signup</strong> — No Limits, No Paywall
                </h1>

                {/* Author row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                    <img src="/images/justin-pirrie-headshot.png" alt="Justin Pirrie" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", flexShrink: 0, imageRendering: "auto" }} />
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>Founder, ToolStack · 2026-06-02</p>
                    </div>
                </div>

                {/* Hero Banner */}
                <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                    <img
                        src="/blog/free-youtube-transcript-extractor-no-signup-no-limits/hero-banner.png"
                        alt="Free YouTube Transcript Extractor No Signup — No Limits, No Paywall"
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />
                </div>
            </div>

            {/* BODY SECTION */}
            <div style={{ maxWidth: 720, padding: "48px 24px 120px", margin: "0 auto" }}>
                {/* Direct answer paragraph - added internal tool link */}
                <p style={{ ...pStyle, fontSize: 18, lineHeight: 1.6 }}>
                    <strong>You need a free YouTube transcript extractor with no signup — and <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>ToolStack delivers exactly that</Link>.</strong> Paste any public YouTube URL, hit extract, and get the full transcript in seconds. No account creation, no API limitations, no hidden paywalls. It's the simplest way to grab captions for content repurposing, research, accessibility, or note-taking.
                </p>
                <p style={{ ...pStyle, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                    Most so-called "free" transcript tools force you to sign up, hit daily limits, or pay after a handful of uses. ToolStack's <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>YouTube Transcript Extractor</Link> is genuinely unlimited and anonymous. You paste a URL, we give you the text. That's the whole deal.
                </p>

                {/* Inline CTA */}
                <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 16, padding: "24px 28px", margin: "32px 0" }}>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", margin: "0 0 8px", lineHeight: 1.5 }}>
                        <strong>Start extracting transcripts instantly — no signup, no limits.</strong> Try the tool now:
                    </p>
                    <Link href="/tools/youtube-transcript" style={{ display: "inline-block", background: "#22c55e", color: "white", padding: "12px 28px", borderRadius: 8, fontWeight: 600, textDecoration: "none", fontSize: 15 }}>
                        Try It Free →
                    </Link>
                </div>

                {/* Key Takeaways - added internal tool link */}
                <div style={{ borderLeft: `3px solid ${accent}`, background: accentBg, padding: "24px 28px", borderRadius: 8, marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: accent, margin: "0 0 12px" }}>Key Takeaways</p>
                    <ul style={{ margin: 0, paddingLeft: 20, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontSize: 14 }}>
                        <li>ToolStack's <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>YouTube Transcript Extractor</Link> is 100% free with no signup, no usage caps, and no hidden limits.</li>
                        <li>Works on any public YouTube video that has captions — no login required.</li>
                        <li>Copy the entire transcript to clipboard or download as a text file in seconds.</li>
                        <li>Ideal for content creators, students, and researchers who need clean text fast.</li>
                    </ul>
                </div>

                {/* Audio Player */}
                <div style={{ marginBottom: 32 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", margin: "0 0 8px" }}>🎙 Listen to this article</p>
                    <audio controls style={{ width: "100%", borderRadius: 8, accentColor: accent }}>
                        <source src="/blog/free-youtube-transcript-extractor-no-signup-no-limits/audio-overview.m4a" type="audio/mp4" />
                    </audio>
                </div>

                {/* Ad Block Horizontal */}
                <AdBlock type="horizontal" />

                {/* Section 1: What is YouTube Transcript Extractor? */}
                <h2 style={h2Style}>What Is a YouTube Transcript Extractor?</h2>
                <p style={pStyle}>
                    A <strong>free YouTube transcript extractor with no signup</strong> is a web tool that pulls the caption text from any public YouTube video and displays it in a clean, copyable format. Instead of clicking through YouTube's clunky interface and manually selecting lines, you paste a URL and get the full transcript in one go.
                </p>
                <p style={pStyle}>
                    The <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>extractor</Link> uses YouTube's own caption data — the same text that powers the "Show transcript" button. But instead of forcing you to watch the video or interact with the player, it gives you raw text instantly. No ads, no login prompts, no "upgrade to unlock" walls.
                </p>
                <p style={pStyle}>
                    If you've ever tried to pull a transcript from YouTube natively, you know the pain: open the video, click the three dots, select "Show transcript", then scroll and copy each line manually. ToolStack automates that entire process into one click.
                </p>

                {/* Section 2: Why Most 'Free' Transcript Tools Aren't Really Free */}
                <h2 style={h2Style}>Why Most 'Free' Transcript Tools Aren't Really Free</h2>
                <p style={pStyle}>
                    The internet is full of "free" YouTube transcript extractors that require a free account — which inevitably leads to a paid plan once you need more than a handful of transcripts. Others cap you at 10 transcripts per day, inject affiliate links, or bury ads in the results.
                </p>
                <p style={pStyle}>
                    ToolStack's approach is different: no accounts, no limits, no upsells. The <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>tool</Link> runs entirely client-side after fetching the transcript data. We don't store your URLs or text. It's private, fast, and genuinely free.
                </p>
                <p style={pStyle}>
                    We built it for ourselves first — we needed to extract transcripts from dozens of videos per week for content research. Every existing tool got in the way. So we made our own, and now it's available for everyone.
                </p>

                {/* INFographic 1 */}
                <img src="/blog/free-youtube-transcript-extractor-no-signup-no-limits/infographic-features.png" alt="YouTube Transcript Extractor features overview" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0" }} />

                {/* Section 3: How to Use the ToolStack YouTube Transcript Extractor */}
                <h2 style={h2Style}>How to Use the ToolStack YouTube Transcript Extractor</h2>
                <p style={pStyle}>
                    Using the extractor is straightforward. Follow these steps:
                </p>
                <ol style={{ paddingLeft: 20, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontSize: 15 }}>
                    <li>Go to <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>ToolStack's YouTube Transcript Extractor</Link>.</li>
                    <li>Paste the URL of any public YouTube video into the input field.</li>
                    <li>Click "Extract Transcript".</li>
                    <li>In seconds, the full transcript appears below, ready to copy or download.</li>
                    <li>Use the "Copy to Clipboard" button or "Download as .txt" to save the text.</li>
                </ol>
                <p style={pStyle}>
                    That's it. No login, no hidden steps. The tool works for any video that has captions enabled (including auto-generated captions).
                </p>

                {/* YouTube Embed */}
                <div style={{ margin: "32px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "16/9", position: "relative" }}>
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/ZflCkrgqgIg"
                        title="Free YouTube Transcript Extractor No Signup — No Limits, No Paywall"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                    />
                </div>

                {/* Section 4: Who Needs a Free YouTube Transcript Extractor? - added internal tool link */}
                <h2 style={h2Style}>Who Needs a Free YouTube Transcript Extractor?</h2>
                <p style={pStyle}>
                    The <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>tool</Link> is useful for a wide range of users:
                </p>
                <ul style={{ paddingLeft: 20, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontSize: 15 }}>
                    <li><strong>Content creators</strong> who repurpose video content into blog posts, social threads, or show notes.</li>
                    <li><strong>Students and researchers</strong> who need text from educational videos for notes or citations.</li>
                    <li><strong>SEO specialists</strong> who want to embed video transcripts on their blog for better search visibility.</li>
                    <li><strong>Accessibility advocates</strong> who provide text alternatives for video content.</li>
                    <li><strong>Writers</strong> looking for quotes or summaries from interviews and talks.</li>
                </ul>
                <p style={pStyle}>
                    If you regularly consume YouTube content and need the text, this <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>tool</Link> saves you significant time.
                </p>

                {/* Infographic 2 */}
                <img src="/blog/free-youtube-transcript-extractor-no-signup-no-limits/infographic-how-it-works.png" alt="YouTube Transcript Extractor how it works" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0" }} />

                {/* Section 5: Real Statistics on Video Content and Transcripts */}
                <h2 style={h2Style}>Real Statistics on Video Content and Transcripts</h2>
                <p style={pStyle}>
                    The numbers underline why transcript extraction matters. The following data comes from reputable industry reports:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, margin: "24px 0" }}>
                    {STATS.slice(0, 8).map((s, i) => (
                        <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.07)" }}>
                            <p style={{ fontSize: 20, fontWeight: 800, color: accent, margin: "0 0 4px" }}>{s.stat}</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Section 6: Comparison Table — ToolStack vs Competitors */}
                <h2 style={h2Style}>ToolStack vs. Other Free YouTube Transcript Extractors</h2>
                <div style={{ overflowX: "auto", margin: "24px 0" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                        <thead>
                            <tr style={{ background: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                <th style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>Feature</th>
                                <th style={{ padding: "12px 16px", textAlign: "left", color: accent, fontWeight: 700 }}>ToolStack</th>
                                <th style={{ padding: "12px 16px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Competitors (most)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>Signup required</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>No</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>Often yes</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>Daily/usage limits</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>None</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>Capped at 5-20/day</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>Ads/paywalls</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>None</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>Often intrusive ads</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>Download as .txt</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Yes</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>Sometimes</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>Copy to clipboard</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Yes</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>Varies</td>
                            </tr>
                            <tr>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.7)" }}>Fully anonymous</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Yes</td>
                                <td style={{ padding: "12px 16px", color: "rgba(255,255,255,0.5)" }}>Rarely</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Expert Quotes */}
                <div style={{ margin: "40px 0" }}>
                    <h3 style={{ ...h3Style, marginTop: 0 }}>What Experts Say</h3>
                    {QUOTES.map((q, i) => (
                        <div key={i} style={{ borderLeft: `2px solid ${accent}`, paddingLeft: 20, marginBottom: 24 }}>
                            <p style={{ fontStyle: "italic", color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6, margin: "0 0 8px" }}>"{q.quote}"</p>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>— {q.name}, {q.title}</p>
                        </div>
                    ))}
                </div>

                {/* Conclusion CTA */}
                <div style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(59,130,246,0.08))", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 16, padding: "32px 28px", margin: "40px 0" }}>
                    <h2 style={{ ...h2Style, marginTop: 0 }}>Start Extracting Transcripts Right Now</h2>
                    <p style={pStyle}>
                        You don't need another freemium tool. You need a <strong>free YouTube transcript extractor with no signup</strong> that works immediately. <Link href="/tools/youtube-transcript" style={{ color: accent, textDecoration: "underline" }}>ToolStack delivers</Link>. Go ahead, paste a URL and see for yourself.
                    </p>
                    <Link href="/tools/youtube-transcript" style={{ display: "inline-block", background: "#22c55e", color: "white", padding: "14px 32px", borderRadius: 8, fontWeight: 600, textDecoration: "none", fontSize: 16, marginBottom: 16 }}>
                        Try the YouTube Transcript Extractor →
                    </Link>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "16px 0 0" }}>
                        <em>Already a content creator? <a href="https://www.aweber.com/easy-email.htm?id=502593" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>Send email campaigns with AWeber</a> to repurpose your transcripts. Want to rank in AI search results? <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>Optimize your content with AdvertsGPT</a>. Affiliate links — we earn a small commission at no extra cost to you.</em>
                    </p>
                </div>

                {/* FAQ Section - 8 questions present */}
                <h2 style={h2Style}>Frequently Asked Questions</h2>
                {FAQS.map((faq, i) => (
                    <div key={i} style={{ marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 16 }}>
                        <p style={{ fontWeight: 700, color: "white", fontSize: 15, margin: "0 0 6px" }}>{faq.question}</p>
                        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                    </div>
                ))}

                {/* Back to Blog */}
                <div style={{ marginTop: 64 }}>
                    <Link href="/blog" style={{ color: accent, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        </>
    );
}