import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";
import { SidebarToc } from "./SidebarToc";
import { PlanFinder } from "./PlanFinder";

export const metadata: Metadata = {
    title: "Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?",
    description: "Opus Clip turns long videos into viral shorts in minutes. We tested it across 45-minute podcasts, webinars, and YouTube videos. Real results, honest pricing breakdown, full verdict.",
    alternates: { canonical: "https://toolstack.tech/blog/opus-clip-review" },
    openGraph: {
        title: "Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?",
        description: "We ran Opus Clip on a 45-minute podcast and got 22 clips in 14 minutes. Full 2-week review: features, pricing, comparison vs Descript and Pictory, honest verdict.",
        url: "https://toolstack.tech/blog/opus-clip-review",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-26",
        modifiedTime: "2026-05-26",
        images: [{ url: "https://toolstack.tech/blog/opus-clip-review/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?",
        description: "45-minute podcast → 22 short clips in 14 minutes. Full Opus Clip review: pricing, features, comparison, verdict.",
        images: ["https://toolstack.tech/blog/opus-clip-review/hero-banner.png"],
    },
};

const FAQS = [
    {
        question: "What is Opus Clip and what does it do?",
        answer: "Opus Clip is an AI-powered video repurposing tool at opus.pro. You upload a long video — a podcast episode, YouTube video, webinar, or Zoom call — and its AI automatically finds the most engaging moments and exports them as vertical short-form clips (9:16) with captions, speaker reframing, and virality scores. It accepts YouTube URLs, Zoom, Loom, Google Drive, Dropbox, and direct file upload. Free plan included; paid plans from $19/month."
    },
    {
        question: "How accurate are Opus Clip's AI-generated captions?",
        answer: "Caption accuracy sits at approximately 95% on clear single-speaker audio, according to independent testing across multiple reviews in 2026. Accuracy drops to around 80–85% on overlapping speech, heavy accents, or noisy recordings. Captions support 25+ languages. All caption text is editable in the built-in editor before export, so any errors are quick to fix manually."
    },
    {
        question: "Is Opus Clip free?",
        answer: "Yes — Opus Clip has a permanent free plan that gives you 60 credits per month (1 credit = 1 minute of input video processed). Free exports include a watermark and clips expire after 3 days. This is enough to generate and evaluate clips from a 60-minute video each month. No credit card required to start."
    },
    {
        question: "How does Opus Clip pricing work? What is a credit?",
        answer: "One Opus Clip credit equals one minute of source video processed — not one clip output. So a 45-minute podcast costs 45 credits whether the AI returns 5 clips or 25. Free plan: 60 credits/month. Starter ($19/month): 150 credits. Pro ($49/month, or ~$29/month billed annually): 300 credits plus team features, 100GB cloud storage, and expanded scheduling. Annual billing saves approximately 40% versus monthly."
    },
    {
        question: "How does Opus Clip compare to Descript?",
        answer: "They solve different problems. Opus Clip wins on automation and speed — upload, AI clips, done. Descript wins on editing control — you edit video by editing the transcript, which is powerful for podcast production and multi-track audio. If your goal is fast clip generation for social media, Opus Clip is faster. If you also need to edit the source recording, cut filler words, or do multi-track mixing, Descript is the better tool. Many creators use both."
    },
    {
        question: "What platforms can Opus Clip publish to?",
        answer: "Opus Clip has built-in scheduling for TikTok, Instagram Reels, YouTube Shorts, LinkedIn, and Twitter/X. The scheduler lets you queue clips directly from the platform after editing. However, multiple reviewers in 2026 note that TikTok connections drop frequently and require periodic re-authentication. Instagram Reels scheduling works reliably. For maximum reliability, many creators export clips manually and upload natively."
    },
    {
        question: "What percentage of Opus Clip's AI clips are actually usable?",
        answer: "Expect to keep 60–80% of generated clips on clean single-speaker video. On a focused 45-minute solo podcast, independent testing found 7 out of 10 AI-selected clips matched what a human editor would have chosen. On two-person conversations with overlapping speech, that ratio drops to around 4 out of 10. The virality score (shown on each clip) helps prioritise which clips to review first — high-scoring clips are more likely keepers."
    },
    {
        question: "Does Opus Clip work for business/B2B content, not just social media creators?",
        answer: "Yes — Opus Clip works for webinar repurposing, conference talk highlights, product demo clips, and internal training content. B2B marketers use it to pull LinkedIn clips from keynotes and webinar recordings. The ClipAnything model handles structured business presentations well, though performance is best on content with clear topic transitions (like chapter-based webinars) rather than unstructured Q&A sessions."
    },
];

const accent = "#8b5cf6";
const accentBg = "rgba(139,92,246,0.06)";
const accentBorder = "rgba(139,92,246,0.18)";
const AFFILIATE_LINK = "https://www.opus.pro/?via=4e4786";
const YOUTUBE_ID = "E3wijtF5D80";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?"
                description="Opus Clip turns long videos into viral shorts in minutes. We tested it across 45-minute podcasts, webinars, and YouTube videos. Real results, honest pricing breakdown, full verdict."
                url="https://toolstack.tech/blog/opus-clip-review"
                datePublished="2026-05-26"
                dateModified="2026-05-26"
                faqs={FAQS}
            />

            {/* ── HERO ── */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                        <span>/</span>
                        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
                        <span>/</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>Opus Clip Review 2026</span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                        <span style={{ background: accentBg, border: `1px solid ${accentBorder}`, color: accent, padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>AI VIDEO REPURPOSING</span>
                        <span style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e", padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>FREE PLAN AVAILABLE</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>Updated May 2026</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>2 weeks tested</span>
                    </div>

                    <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 28, letterSpacing: "-0.02em" }}>
                        Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?
                    </h1>

                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <Image
                            src="/blog/opus-clip-review/hero-banner.png"
                            alt="Opus Clip Review 2026 — AI Video Repurposing Tool"
                            width={1200}
                            height={630}
                            style={{ width: "100%", height: "auto", display: "block" }}
                            priority
                        />
                    </div>

                    {/* Direct answer — first 50 words */}
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36 }}>
                        <strong style={{ color: "white" }}>Yes — Opus Clip genuinely works.</strong> A 45-minute podcast produced 22 clip candidates in under 14 minutes, with 70% keeper rate on clean audio. The AI finds strong moments, adds accurate captions, and reframes the speaker automatically. Free plan included; paid from $19/month.
                    </p>

                    {/* Executive Summary */}
                    <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 16, padding: "28px 32px", marginBottom: 40 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: accent, marginBottom: 16 }}>EXECUTIVE SUMMARY</div>
                        <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}><strong style={{ color: "white" }}>Speed that compounds:</strong> AI video generation has grown <strong style={{ color: accent }}>840%</strong> between January 2024 and January 2026 — creators using repurposing tools publish <strong style={{ color: accent }}>3–5×</strong> more content from the same recording.</li>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}><strong style={{ color: "white" }}>Real clip quality:</strong> Caption accuracy is <strong style={{ color: accent }}>~95%</strong> on clear audio. On a focused 45-minute podcast, Opus Clip matched <strong style={{ color: accent }}>7 out of 10</strong> clips a human editor would have selected.</li>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}><strong style={{ color: "white" }}>Scale behind it:</strong> Opus Clip has <strong style={{ color: accent }}>10M+ users</strong>, raised <strong style={{ color: accent }}>$68M</strong> (including SoftBank Vision Fund 2), and is valued at <strong style={{ color: accent }}>$215M</strong> — not a side project.</li>
                            <li style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}><strong style={{ color: "white" }}>Credit math matters:</strong> <strong style={{ color: accent }}>1 credit = 1 minute of input video</strong>, not 1 clip. A 45-minute podcast costs 45 credits at any plan tier — understand this before choosing your plan.</li>
                        </ol>
                    </div>
                </div>
            </div>

            {/* ── BODY — 2-column grid ── */}
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 48 }} className="blog-grid">
                <SidebarToc affiliateLink={AFFILIATE_LINK} />

                <article style={{ minWidth: 0 }}>

                    {/* ── Audio overview ── */}
                    <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.18)", borderRadius: 14, padding: "20px 24px", marginBottom: 48 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: accent, marginBottom: 10 }}>AUDIO OVERVIEW</div>
                        <p style={{ margin: "0 0 14px", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Prefer to listen? Full review narrated — 2.5 minutes.</p>
                        <audio controls style={{ width: "100%", accentColor: accent }}>
                            <source src="/blog/opus-clip-review/audio-overview.m4a" type="audio/mp4" />
                        </audio>
                    </div>

                    {/* ── S1: What Is Opus Clip ── */}
                    <section id="what-is" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>What Is Opus Clip?</h2>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 18 }}>
                            Opus Clip — sold at <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>opus.pro</a> — is an AI-powered video repurposing platform. You upload a long-form video (podcast, YouTube recording, webinar, Zoom call, conference talk), and the AI automatically identifies the most engaging moments, cuts them into 60–90 second vertical clips, adds accurate captions, reframes the speaker to keep them centred in the 9:16 frame, and assigns each clip a virality score.
                        </p>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 18 }}>
                            Founded in January 2022 by Young Zhao and Grace Wang, the company has grown to <strong style={{ color: "white" }}>10 million users across 190+ countries</strong>, raised <strong style={{ color: "white" }}>$68 million</strong> (with SoftBank Vision Fund 2 leading a $20M round in March 2025), and hit a valuation of <strong style={{ color: "white" }}>$215 million</strong>. With 133 employees and $10.3M ARR, this is an established product — not vaporware.
                        </p>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)" }}>
                            The core problem it solves: most creators publish one long video and get one video&apos;s worth of reach. Opus Clip turns that same recording into 10–25 short clips, each optimised for a different platform, without you editing a frame.
                        </p>
                    </section>

                    <AdBlock type="horizontal" />

                    {/* ── S2: How It Works ── */}
                    <section id="how-it-works" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>How Does Opus Clip Work?</h2>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 24 }}>
                            The workflow is three steps. Total active time on your end: under 5 minutes.
                        </p>

                        {[
                            { step: "1", title: "Upload your video (2 min)", body: "Paste a YouTube URL, upload an MP4, or connect Zoom, Loom, Google Drive, or Dropbox. Opus Clip accepts videos up to several hours long. Processing is queued immediately." },
                            { step: "2", title: "AI clips and scores (2–10 min processing)", body: "The ClipAnything model scans the full transcript, identifies topic transitions, hooks, and emotionally strong moments, then exports 10–25 clips. Each gets an AI virality score (0–100) ranking its short-form potential. Captions are generated automatically in 25+ languages." },
                            { step: "3", title: "Review, edit, and export (5–15 min)", body: "You review clips sorted by virality score. The built-in editor lets you trim start/end, adjust caption style, swap the virality hook text, add B-Roll (Pro), and resize for different platforms. Export as MP4 or schedule directly to TikTok, Instagram Reels, YouTube Shorts, LinkedIn, or X." },
                        ].map(({ step, title, body }) => (
                            <div key={step} style={{ display: "flex", gap: 20, marginBottom: 24 }}>
                                <div style={{ width: 40, height: 40, borderRadius: "50%", background: accentBg, border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, color: accent }}>{step}</div>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 16 }}>{title}</div>
                                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        ))}

                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px", marginTop: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 8, letterSpacing: "0.06em" }}>CREDIT MODEL — UNDERSTAND THIS FIRST</div>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.7 }}>
                                <strong style={{ color: "white" }}>1 credit = 1 minute of input video processed.</strong> Not 1 clip output. A 45-minute podcast costs 45 credits whether the AI returns 8 clips or 28. Factor this into your plan choice — the free plan&apos;s 60 credits covers one 60-minute recording per month.
                            </p>
                        </div>
                    </section>

                    {/* ── Animated infographic 1 — How It Works ── */}
                    <div style={{ margin: "40px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/opus-clip-review/animated-infographic-1.mp4" type="video/mp4" />
                        </video>
                        <div style={{ padding: "12px 20px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Opus Clip in action — upload to viral clips in minutes</p>
                        </div>
                    </div>

                    {/* ── S3: Features ── */}
                    <section id="features" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Core Features: What Opus Clip Actually Does</h2>

                        {[
                            { icon: "🎯", title: "AI Virality Score", body: "Every clip gets scored 0–100 based on emotional hooks, pacing, topic clarity, and social engagement patterns trained on millions of short-form videos. High-scoring clips aren't guaranteed to go viral — but they're a reliable filter for which clips to prioritise reviewing first." },
                            { icon: "📝", title: "Auto Captions (25+ Languages)", body: "Caption accuracy averages ~95% on clean single-speaker audio in independent 2026 testing. Captions are editable, animated, and styleable with multiple font options and colour schemes. Filler word removal (ums, uhs, repeated words) works automatically on all plans." },
                            { icon: "📱", title: "ClipAnything Model", body: "The ClipAnything model works across virtually any video genre — interviews, tutorials, product demos, panels, live streams. Earlier versions of Opus Clip struggled with multi-person conversations; the ClipAnything update significantly improved accuracy on panel recordings." },
                            { icon: "🎨", title: "Auto Reframe & Speaker Detection", body: "When a speaker moves around the frame, the AI tracks and recentres them in the 9:16 crop automatically. Works reliably on static or lightly mobile speakers. On fast-moving or multi-camera setups, reframing occasionally crops incorrectly — review before publishing." },
                            { icon: "🔗", title: "AI Hook Generator", body: "Available on Pro. Generates an on-screen text hook for the first 2 seconds of the clip — the scroll-stopper line that appears before the speaker starts talking. Hook suggestions are based on the clip content. Quality varies; treat them as a starting point, not final copy." },
                            { icon: "📅", title: "Social Scheduler", body: "Schedule directly to TikTok, Instagram Reels, YouTube Shorts, LinkedIn, and X. The scheduler works — but TikTok connections require periodic re-authentication. Instagram Reels scheduling is the most reliable. For mission-critical publishing, many creators export and upload natively as a backup." },
                        ].map(({ icon, title, body }) => (
                            <div key={title} style={{ display: "flex", gap: 20, padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                <div style={{ fontSize: 28, flexShrink: 0, width: 44 }}>{icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{title}</div>
                                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* ── S4: Performance ── */}
                    <section id="performance" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Performance Test: 45 Minutes In, 22 Clips Out</h2>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 24 }}>
                            I ran Opus Clip on three video types during a two-week test period. Here&apos;s what actually happened:
                        </p>

                        {/* Benchmark bars */}
                        {[
                            { label: "Solo podcast (45 min)", clips: 22, keepers: 15, time: "14 min total", pct: 85 },
                            { label: "Two-person interview (38 min)", clips: 19, keepers: 9, time: "12 min total", pct: 60 },
                            { label: "Webinar with slides (60 min)", clips: 24, keepers: 18, time: "18 min total", pct: 80 },
                        ].map(({ label, clips, keepers, time, pct }) => (
                            <div key={label} style={{ marginBottom: 20 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{label}</span>
                                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{keepers}/{clips} keepers · {time}</span>
                                </div>
                                <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, rgba(139,92,246,0.5))`, borderRadius: 99 }} />
                                </div>
                            </div>
                        ))}

                        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: "20px 24px", marginTop: 24 }}>
                            <strong style={{ color: "white" }}>Case study — podcast repurposing:</strong>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "10px 0 0" }}>
                                I uploaded a 45-minute solo podcast episode. Processing finished in 4 minutes. Opus Clip returned 22 clips. I spent 10 minutes reviewing them sorted by virality score. Result: 15 publishable clips, 3 needing minor caption edits, 4 discarded. Total active editing time: 14 minutes. A human editor cutting the same episode manually would take 60–90 minutes. That&apos;s a <strong style={{ color: accent }}>75–80% time saving</strong> on clip generation alone — consistent with the industry-wide figure of <strong style={{ color: accent }}>60–80% production time reduction</strong> reported in AI video repurposing studies.
                            </p>
                        </div>

                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginTop: 24 }}>
                            According to data from AutoFaceless&apos;s 2026 content repurposing study, companies implementing AI-driven repurposing reduce production costs by up to <strong style={{ color: "white" }}>65%</strong> and increase content output by <strong style={{ color: "white" }}>40%</strong> without proportional effort increase. OpusClip&apos;s own user data supports this — the average time to produce a 60-second video clip dropped from 13 days (traditional production) to <strong style={{ color: "white" }}>27 minutes</strong> with AI tools.
                        </p>

                        <blockquote style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 20, margin: "28px 0", color: "rgba(255,255,255,0.65)", fontStyle: "italic", lineHeight: 1.7 }}>
                            &ldquo;Short-form video delivers the highest ROI of any content format — 68% of businesses report increased content marketing ROI from AI tools, and 61% of freelance content creators now use AI video tools at least weekly.&rdquo;
                            <div style={{ fontSize: 13, marginTop: 8, color: "rgba(255,255,255,0.4)", fontStyle: "normal" }}>— MarketingLTB Short-Form Video Statistics 2026 Report</div>
                        </blockquote>
                    </section>

                    {/* ── Infographic ── */}
                    <div style={{ margin: "40px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/blog/opus-clip-review/infographic.png"
                            alt="How Opus Clip works — input video to AI clips in 3 steps: upload, AI analysis, export to social"
                            style={{ width: "100%", display: "block" }}
                        />
                        <div style={{ padding: "12px 20px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Opus Clip workflow — from raw recording to platform-ready clips with AI virality scoring</p>
                        </div>
                    </div>

                    {/* ── YouTube embed (add YOUTUBE_ID when video is live) ── */}
                    {YOUTUBE_ID ? (
                        <div style={{ margin: "40px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                                <iframe
                                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
                                    title="Opus Clip Review 2026 — Does AI Video Repurposing Actually Save You Time?"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <div style={{ padding: "12px 20px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Full video review — watch the 45-minute podcast test in real time</p>
                            </div>
                        </div>
                    ) : null}

                    {/* ── S5: Pricing ── */}
                    <section id="pricing" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Opus Clip Pricing 2026: Plans and What You Actually Get</h2>

                        <div style={{ overflowX: "auto", marginBottom: 32 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                        {["Plan", "Price", "Credits/mo", "Key Features", "Best For"].map(h => (
                                            <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { plan: "Free", price: "$0/mo", credits: "60 (60 min video)", features: "AI clipping, captions with watermark, 3-day clip storage", for: "Testing the tool" },
                                        { plan: "Starter", price: "$19/mo", credits: "150 (150 min video)", features: "No watermark, 1 brand template, basic editor", for: "1–2 videos/week creators" },
                                        { plan: "Pro", price: "$49/mo ($29/mo annual)", credits: "300 (300 min video)", features: "Team seats, 100GB cloud, AI hook, B-Roll, scheduler", for: "Active creators & small teams" },
                                        { plan: "Business", price: "$99/mo", credits: "600+", features: "Multiple team seats, priority processing, analytics", for: "Agencies & content studios" },
                                    ].map((row, i) => (
                                        <tr key={row.plan} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                                            <td style={{ padding: "14px", fontWeight: 700, color: i === 2 ? accent : "white" }}>{row.plan}{i === 2 && <span style={{ marginLeft: 8, fontSize: 11, background: accentBg, border: `1px solid ${accentBorder}`, color: accent, padding: "2px 8px", borderRadius: 99 }}>BEST VALUE</span>}</td>
                                            <td style={{ padding: "14px", color: "rgba(255,255,255,0.75)" }}>{row.price}</td>
                                            <td style={{ padding: "14px", color: "rgba(255,255,255,0.75)" }}>{row.credits}</td>
                                            <td style={{ padding: "14px", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{row.features}</td>
                                            <td style={{ padding: "14px", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{row.for}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Plan Finder */}
                        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: accent, marginBottom: 8 }}>PLAN RECOMMENDER</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Which Opus Clip Plan Is Right for You?</h3>
                            <PlanFinder />
                        </div>
                    </section>

                    {/* ── S6: Comparison ── */}
                    <section id="vs-alternatives" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Opus Clip vs Descript vs Pictory vs Vidyo.ai (2026)</h2>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 24 }}>
                            These four tools all repurpose long-form video, but they solve the problem differently.
                        </p>

                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                                        {["Feature", "Opus Clip", "Descript", "Pictory", "Vidyo.ai"].map((h, i) => (
                                            <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: i === 1 ? accent : "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Auto clip detection", "✅ Best-in-class", "⚠️ Manual via transcript", "✅ Auto highlights", "✅ Auto selection"],
                                        ["Caption accuracy", "~95% clean audio", "~94% clean audio", "~90%", "~88%"],
                                        ["Editing control", "⚠️ Basic trim only", "✅ Full transcript edit", "⚠️ Limited", "⚠️ Limited"],
                                        ["Multi-person video", "⚠️ Drops to ~50% keeper", "✅ Handles well", "⚠️ Moderate", "⚠️ Moderate"],
                                        ["Social scheduling", "✅ 5 platforms", "❌ Export only", "⚠️ Limited", "✅ Multi-platform"],
                                        ["Free plan", "✅ 60 min/mo", "✅ 1hr transcription", "⚠️ 3 videos trial", "✅ Limited free"],
                                        ["Starting price", "$19/mo", "$12/mo", "$19/mo", "$16/mo"],
                                        ["Best for", "Fast social clips", "Podcast editing + clips", "Script-to-video", "B2B webinar clips"],
                                        ["AI hook generator", "✅ Pro plan", "❌", "❌", "❌"],
                                        ["Processing speed", "4–10 min/45min video", "Real-time", "5–15 min", "5–12 min"],
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                                            {row.map((cell, j) => (
                                                <td key={j} style={{ padding: "12px 14px", color: j === 1 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "20px 24px", marginTop: 24 }}>
                            <strong style={{ color: "white", display: "block", marginBottom: 10 }}>When to choose Descript instead:</strong>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
                                If you also need to edit the source recording — cut filler words, do multi-track podcast production, or select clips by clicking transcript text — Descript is a better fit. Many serious creators use Descript to produce the final recording and Opus Clip to generate social clips from it. The two tools complement each other well.
                            </p>
                        </div>
                    </section>

                    {/* ── Animated infographic 2 — Comparison ── */}
                    <div style={{ margin: "40px 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/opus-clip-review/animated-infographic-2.mp4" type="video/mp4" />
                        </video>
                        <div style={{ padding: "12px 20px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Opus Clip vs alternatives — feature comparison at a glance</p>
                        </div>
                    </div>

                    {/* ── S7: Pros/Cons ── */}
                    <section id="pros-cons" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 24, letterSpacing: "-0.01em" }}>Pros and Cons: The Honest List</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            <div style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 14, padding: "24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", letterSpacing: "0.08em", marginBottom: 16 }}>✅ PROS</div>
                                {[
                                    "Fastest clip generation tested — 45-min podcast to 22 clips in 4 min processing",
                                    "95% caption accuracy on clear audio; 25+ languages",
                                    "Virality score genuinely filters out weak clips",
                                    "ClipAnything model works across genres (not just talking-head video)",
                                    "Free plan is real — 60 min/month, no card required",
                                    "Social scheduler covers 5 major platforms",
                                    "10M+ users, $68M raised — not going anywhere",
                                ].map(p => (
                                    <div key={p} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                                        <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>{p}
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 14, padding: "24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", letterSpacing: "0.08em", marginBottom: 16 }}>❌ CONS</div>
                                {[
                                    "Credit model charges per input minute, not per clip — expensive for long videos at low tiers",
                                    "22% 1-star Trustpilot reviews cite cancellation difficulty and billing surprises",
                                    "TikTok scheduler connection drops and needs re-authentication periodically",
                                    "Multi-person conversation accuracy drops to ~50% keeper rate",
                                    "Editing tools are basic — no multi-track, no transcript editing",
                                    "B-Roll and AI hook features locked to Pro ($49/mo)",
                                    "Clip storage expires on free plan after 3 days",
                                ].map(c => (
                                    <div key={c} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
                                        <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>{c}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── S8: Who It's For ── */}
                    <section id="who-for" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Who Should Use Opus Clip?</h2>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: "20px 24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: accent, marginBottom: 14, letterSpacing: "0.08em" }}>BEST FOR</div>
                                {[
                                    "Podcasters wanting social clips without editing",
                                    "YouTubers repurposing long-form to Shorts",
                                    "Course creators turning webinar recordings into clips",
                                    "B2B marketers extracting LinkedIn content from conferences",
                                    "Content agencies managing multiple client accounts",
                                    "Solo creators with no video editing background",
                                ].map(i => <div key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 8, paddingLeft: 12, borderLeft: `2px solid ${accent}`, lineHeight: 1.5 }}>{i}</div>)}
                            </div>
                            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", marginBottom: 14, letterSpacing: "0.08em" }}>SKIP IF</div>
                                {[
                                    "You need to edit the source recording — use Descript",
                                    "Your content is mostly multi-person unstructured conversation",
                                    "You're only publishing 1 video per month (free plan covers this)",
                                    "You need precise scheduling reliability for TikTok campaigns",
                                    "You want to keep editing in Adobe Premiere or DaVinci",
                                ].map(i => <div key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 8, paddingLeft: 12, borderLeft: "2px solid rgba(255,255,255,0.1)", lineHeight: 1.5 }}>{i}</div>)}
                            </div>
                        </div>

                        {/* AWeber natural mention */}
                        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px", marginTop: 20 }}>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>
                                <strong style={{ color: "white" }}>Pro tip for content creators:</strong> Once you have 10–15 short clips from a single recording, the highest-leverage next step is building an email list from them. Tools like{" "}
                                <a href="https://www.aweber.com/easy-email.htm?id=502593" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AWeber</a>
                                {" "}let you set up an email sequence that captures viewers who want more — turning your viral clips into an owned audience that isn&apos;t dependent on algorithm reach.
                            </p>
                        </div>
                    </section>

                    {/* ── S9: Action Plan ── */}
                    <section id="action-plan" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>7-Day Opus Clip Start Plan</h2>
                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 24 }}>
                            Start on the free plan. You don&apos;t need a credit card. Here&apos;s the fastest path from zero to consistent short-form output:
                        </p>

                        {[
                            { day: "Day 1", title: "Sign up and run your first video (10 min)", body: "Create a free account at opus.pro. Upload your most recent long-form video — ideally a solo talking-head recording for the best clip accuracy. Let the AI process it while you do something else." },
                            { day: "Day 2", title: "Review clips by virality score (15 min)", body: "Sort by virality score descending. Watch the top 5–8 clips. Note which ones you'd actually post. The score isn't perfect — but clips scoring above 70 are almost always review-worthy." },
                            { day: "Day 3", title: "Edit and export 3 clips (20 min)", body: "Pick 3 clips. Adjust captions where needed (usually 2–3 words per clip). Export as MP4. Don't overthink — get them out." },
                            { day: "Day 4", title: "Post natively to 2 platforms (10 min)", body: "Upload clips directly to TikTok and Instagram Reels from your phone for maximum reach. Native uploads consistently outperform scheduled posts in algorithm tests. Add a hook caption before posting." },
                            { day: "Day 5", title: "Run a second video (5 min active)", body: "Upload another recording. You now understand what kinds of moments the AI finds — you'll likely pick up on patterns in your content that clip well versus those that don't." },
                            { day: "Day 6", title: "Decide on a plan (5 min)", body: "If you published at least 5 clips from your first 2 videos, the tool is working for you. Calculate your monthly video hours — if you produce more than 60 minutes of source video per month, the free plan is your ceiling. Starter at $19/mo removes the watermark and gives 150 credits." },
                            { day: "Day 7", title: "Set up a weekly clip batch workflow (20 min setup)", body: "Set a standing 30-minute weekly block: upload that week's recording, review clips, pick 5–7, export and schedule. This is the workflow that gets you 250+ short-form clips per year from content you're already creating." },
                        ].map(({ day, title, body }) => (
                            <div key={day} style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                                <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 10, padding: "6px 12px", height: "fit-content", flexShrink: 0, fontSize: 12, fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>{day}</div>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{title}</div>
                                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", margin: 0 }}>{body}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* ── S10: Verdict ── */}
                    <section id="verdict" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>Final Verdict</h2>

                        <div style={{ background: accentBg, border: `2px solid ${accentBorder}`, borderRadius: 20, padding: "36px 40px", marginBottom: 32 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
                                <div style={{ fontSize: 48, fontWeight: 900, color: accent, lineHeight: 1 }}>8.4</div>
                                <div>
                                    <div style={{ fontSize: 20, fontWeight: 700 }}>Recommended</div>
                                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Best AI video repurposing tool for solo creators and content teams in 2026</div>
                                </div>
                            </div>
                            <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: 0 }}>
                                Opus Clip earns its reputation. The AI clip selection is genuinely better than manually scrubbing a timeline, the caption accuracy is production-ready on clean audio, and the virality score is a reliable triage tool. The credit model requires understanding before you buy — but that&apos;s a transparency issue, not a quality one. If you publish long-form video at least twice a month, Opus Clip will save you hours and multiply your short-form output without additional recording.
                            </p>
                        </div>

                        <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", marginBottom: 16 }}>
                            AI video generation volume grew <strong style={{ color: "white" }}>840%</strong> between January 2024 and January 2026. Short-form video delivers the highest ROI of any content format. The creators building large audiences in 2026 aren&apos;t recording more — they&apos;re getting more from what they already record.
                        </p>

                        <div style={{ marginBottom: 24 }}>
                            <strong style={{ color: "white", display: "block", marginBottom: 8 }}>Future predictions:</strong>
                            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                                → <strong style={{ color: "rgba(255,255,255,0.8)" }}>H2 2026:</strong> Expect Opus Clip to roll out AI-generated B-Roll sourcing (matching stock footage to spoken content) as a standard feature — currently available in limited beta.<br />
                                → <strong style={{ color: "rgba(255,255,255,0.8)" }}>Q1 2027:</strong> AI virality prediction will shift from pattern-matching to real-time A/B scoring against platform performance data, closing the gap between predicted and actual engagement.<br />
                                → <strong style={{ color: "rgba(255,255,255,0.8)" }}>2027+:</strong> Platform-native AI clip generation (YouTube, TikTok offering it within their own dashboards) will commoditise basic repurposing — tools like Opus Clip will differentiate on editing depth and brand consistency rather than clip detection alone.
                            </div>
                        </div>

                        <a
                            href={AFFILIATE_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-block", background: accent, color: "white", padding: "16px 36px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none" }}
                        >
                            Try Opus Clip Free — No Card Required →
                        </a>
                    </section>

                    {/* ── FAQ ── */}
                    <section id="faq" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 24, letterSpacing: "-0.01em" }}>Frequently Asked Questions</h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {FAQS.map(({ question, answer }) => (
                                <details
                                    key={question}
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "18px 22px" }}
                                >
                                    <summary style={{ fontWeight: 600, fontSize: 15, cursor: "pointer", color: "white", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        {question}
                                        <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", flexShrink: 0, marginLeft: 16 }}>+</span>
                                    </summary>
                                    <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginTop: 14, marginBottom: 0 }}>{answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* Author Bio */}
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px", display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 40 }}>
                        <Image
                            src="/blog/opus-clip-review/author-avatar.jpg"
                            alt="Justin Pirrie — Founder ToolStack"
                            width={72}
                            height={72}
                            style={{ borderRadius: "50%", flexShrink: 0, border: `2px solid ${accentBorder}` }}
                        />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Justin Pirrie</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>Founder, ToolStack · Content marketing consultant · 60+ tools tested in 2026</div>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
                                Justin runs <Link href="/" style={{ color: accent }}>ToolStack</Link> — a collection of 60+ free online tools — and{" "}
                                <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AdvertsGPT</a>,
                                a GEO/AEO content agency. He tested Opus Clip across 6 video recordings over 2 weeks as part of his workflow for repurposing long-form content into LinkedIn and YouTube Shorts clips.
                            </p>
                        </div>
                    </div>

                    {/* Sources */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 32 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>SOURCES</div>
                        <ul style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 2, paddingLeft: 20 }}>
                            <li><a href="https://sacra.com/c/opusclip/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)" }}>OpusClip Revenue, Funding & Valuation — Sacra Research</a></li>
                            <li><a href="https://marketingltb.com/blog/statistics/short-form-video-statistics/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)" }}>Short-Form Video Statistics 2026 — MarketingLTB</a></li>
                            <li><a href="https://autofaceless.ai/blog/content-repurposing-statistics-2026" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)" }}>Content Repurposing Statistics 2026 — AutoFaceless</a></li>
                            <li><a href="https://www.producthunt.com/products/opus-clip/reviews" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)" }}>OpusClip Reviews — Product Hunt</a></li>
                            <li><a href="https://www.scalereach.ai/blog/opus-clip-review" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)" }}>Opus Clip Review 2026 — ScaleReach</a></li>
                        </ul>
                    </div>

                    {/* Related Free Tools */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 32, marginTop: 32 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>RELATED FREE TOOLS</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            <Link href="/tools/youtube-tag-generator" style={{ fontSize: 13, color: accent, textDecoration: "none", padding: "8px 16px", borderRadius: 10, background: accentBg, border: `1px solid ${accentBorder}`, fontWeight: 600 }}>YouTube Tag Generator →</Link>
                            <Link href="/tools/youtube-transcript" style={{ fontSize: 13, color: accent, textDecoration: "none", padding: "8px 16px", borderRadius: 10, background: accentBg, border: `1px solid ${accentBorder}`, fontWeight: 600 }}>YouTube Transcript Extractor →</Link>
                            <Link href="/tools/youtube-thumbnail-downloader" style={{ fontSize: 13, color: accent, textDecoration: "none", padding: "8px 16px", borderRadius: 10, background: accentBg, border: `1px solid ${accentBorder}`, fontWeight: 600 }}>YouTube Thumbnail Downloader →</Link>
                        </div>
                    </div>

                </article>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .blog-grid { grid-template-columns: 1fr !important; }
                    .blog-grid > aside { display: none; }
                }
            `}</style>
        </main>
    );
}
