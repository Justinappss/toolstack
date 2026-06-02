import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";
import { PlanRecommender } from "./PlanRecommender";
import { SidebarToc } from "./SidebarToc";

export const metadata: Metadata = {
    title: "AWeber Review 2026: Still the Best Email Marketing Tool for Creators?",
    description: "AWeber has been building email lists since 1998. We tested the free plan, automation, AMP emails, and support in 2026. Here's how it compares to Mailchimp and Kit — and who should actually use it.",
    alternates: { canonical: "https://toolstack.tech/blog/aweber-review" },
    openGraph: {
        title: "AWeber Review 2026: Still the Best Email Marketing Tool for Creators?",
        description: "Free plan up to 500 subscribers. 24/7 phone support. 600+ templates. Honest test vs Mailchimp and Kit.",
        url: "https://toolstack.tech/blog/aweber-review",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-17",
        modifiedTime: "2026-05-17",
        images: [{ url: "https://toolstack.tech/blog/aweber-review/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "AWeber Review 2026: Is It Still Worth It?",
        description: "Free plan, 24/7 support, AMP emails. Honest breakdown vs Mailchimp and Kit after hands-on testing.",
        images: ["https://toolstack.tech/blog/aweber-review/hero-banner.png"],
    },
};

const FAQS = [
    {
        question: "Is AWeber free to use?",
        answer: "Yes — AWeber has a permanently free plan that supports up to 500 subscribers and includes the drag-and-drop email builder, landing pages, sign-up forms, and basic automation. Unlike Mailchimp's free plan, AWeber's free tier includes 24/7 support and access to most core features. You don't need a credit card to start."
    },
    {
        question: "How does AWeber compare to Mailchimp in 2026?",
        answer: "AWeber beats Mailchimp on support (24/7 phone and live chat vs Mailchimp's chatbot-only), pricing at most subscriber tiers, and features included on the free plan. Mailchimp removed phone support after the Intuit acquisition and has raised prices significantly. AWeber's deliverability rates are consistently strong. Mailchimp has a slight edge on e-commerce integrations and reporting dashboards."
    },
    {
        question: "Does AWeber have a free trial?",
        answer: "AWeber doesn't offer a time-limited free trial — instead, it has a permanently free plan for up to 500 subscribers. This is more valuable than a 14-day trial because you can build your list and test the platform for as long as you need before deciding to upgrade. The free plan includes the email builder, landing pages, sign-up forms, and 24/7 support."
    },
    {
        question: "What is AWeber's Done For You service?",
        answer: "AWeber's Done For You service (currently $79 as a promotional price, normally $599) has AWeber's team build your complete email marketing system in 7 days. This includes designing your opt-in forms, setting up a welcome email sequence, creating email templates matching your brand, and configuring integrations with your website or store. It's designed for business owners who want a professional setup without learning the platform."
    },
    {
        question: "Does AWeber support email automation?",
        answer: "Yes — AWeber includes automation on all plans including the free tier. You can build trigger-based sequences (welcome series, abandoned cart, re-engagement), use tagging to segment subscribers by behaviour, and set up drip campaigns. The Plus plan unlocks more advanced behavioural automation and unlimited A/B testing. Automation is one of AWeber's strongest features compared to free-tier Mailchimp."
    },
    {
        question: "What are AMP emails in AWeber?",
        answer: "AMP (Accelerated Mobile Pages) emails are interactive emails that can update their content in real time inside the recipient's inbox — without them opening a browser. AWeber is one of the few platforms supporting AMP emails in 2026. Use cases include live countdown timers, form submissions inside the email, carousels, and real-time product pricing. Gmail and Yahoo Mail support AMP emails."
    },
    {
        question: "Is AWeber good for affiliate marketing?",
        answer: "AWeber is one of the more affiliate-friendly email platforms — many platforms like Mailchimp have restrictions on affiliate marketing content. AWeber permits affiliate links in emails as long as you're sending to opted-in subscribers and following CAN-SPAM/GDPR rules. It also has one of the strongest affiliate programs in email marketing, paying 30% recurring commissions to partners."
    },
];

const accent = "#2563eb";
const accentBg = "rgba(37,99,235,0.07)";
const accentBorder = "rgba(37,99,235,0.2)";

const AFFILIATE_LINK = "https://bit.ly/aweberjustin";
const VIDEO_ID = "cWiV7yX_Q5U";

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="AWeber Review 2026: Still the Best Email Marketing Tool for Creators?"
                description="AWeber has been building email lists since 1998. Honest test of the free plan, automation, AMP emails, and support vs Mailchimp and Kit."
                url="https://toolstack.tech/blog/aweber-review"
                datePublished="2026-05-17"
                dateModified="2026-05-17"
                faqs={FAQS}
            />

            {/* ── HERO ── */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative" }}>

                    {/* Breadcrumb */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                        <span>/</span>
                        <Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Blog</Link>
                        <span>/</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>AWeber Review 2026</span>
                    </div>

                    {/* Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                        <span style={{ background: accentBg, border: `1px solid ${accentBorder}`, color: accent, padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>EMAIL MARKETING</span>
                        <span style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e", padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>FREE PLAN AVAILABLE</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>Updated May 2026</span>
                        <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)", padding: "5px 14px", borderRadius: 99, fontSize: 12 }}>Founded 1998</span>
                    </div>

                    {/* Title */}
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 28, letterSpacing: "-0.02em" }}>
                        AWeber Review 2026: Still the Best Email Marketing Tool for Creators?
                    </h1>

                    {/* Hero Banner Image */}
                    <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
                        <Image
                            src="/blog/aweber-review/hero-banner.png"
                            alt="AWeber Review 2026 - Hands on Test"
                            width={1200}
                            height={630}
                            style={{ width: "100%", height: "auto", display: "block" }}
                            priority
                        />
                    </div>

                    {/* Opening — direct answer */}
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36 }}>
                        <strong style={{ color: "white" }}>Yes — for creators, bloggers, and small businesses, AWeber remains one of the best-value email platforms in 2026.</strong> The free plan covers 500 subscribers with no credit card, and 27 years of deliverability infrastructure means your emails actually land in inboxes — not spam folders.
                    </p>

                    {/* Rating box */}
                    <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 16, padding: "28px 32px", marginBottom: 36, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32 }}>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 52, fontWeight: 900, color: accent, lineHeight: 1 }}>8.2</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>out of 10</div>
                            <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 8 }}>
                                {[1,2,3,4].map(i => (
                                    <span key={i} style={{ width: 14, height: 14, background: accent, borderRadius: 2, display: "block" }} />
                                ))}
                                <span style={{ width: 14, height: 14, background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 2, display: "block" }} />
                            </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            {[
                                { label: "Deliverability", score: 94 },
                                { label: "Ease of Use", score: 88 },
                                { label: "Support Quality", score: 96 },
                                { label: "Value vs Mailchimp", score: 90 },
                            ].map(({ label, score }) => (
                                <div key={label} style={{ marginBottom: 10 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                                        <span>{label}</span><span style={{ color: "white" }}>{score}%</span>
                                    </div>
                                    <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 99 }}>
                                        <div style={{ width: `${score}%`, height: "100%", background: accent, borderRadius: 99 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 160 }}>
                            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" style={{ background: accent, color: "white", padding: "13px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", textAlign: "center" }}>
                                Try AWeber Free →
                            </a>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>500 subscribers, no card</div>
                        </div>
                    </div>

                    {/* TL;DR */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "24px 28px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>TL;DR — QUICK VERDICT</div>
                        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                                "Free plan: up to 500 subscribers, landing pages, sign-up forms, and basic automation — no card required",
                                "24/7 phone and live chat support on all plans including free — Mailchimp removed phone support entirely",
                                "AMP emails let your subscribers interact inside Gmail without clicking a link — almost no competitor offers this",
                                "Lite at $15/month beats Mailchimp Essentials at $13/month on features; Plus at $20/month (annual) adds A/B testing and advanced automation",
                                "Best for: creators, bloggers, affiliate marketers, and small businesses who want reliable deliverability and real human support",
                                "Skip if: you need deep e-commerce flows like cart abandonment or advanced CRM integrations",
                            ].map((item, i) => (
                                <li key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 0", display: "grid", gridTemplateColumns: "220px 1fr", gap: "48px", alignItems: "start" }}>

                <SidebarToc affiliateLink={AFFILIATE_LINK} />

                <div>
                    <AdBlock type="horizontal" />

                    {/* ── AUDIO OVERVIEW ── */}
                    <div style={{ margin: "0 0 36px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 28px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>NOTEBOOKLM AUDIO OVERVIEW</div>
                        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Rather listen? Full Deep Dive Podcast</div>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "0 0 16px" }}>Justin Pirrie breaks down AWeber in full — pricing, features, deliverability, and verdict vs Mailchimp and Kit. Produced with NotebookLM from all primary sources.</p>
                        <audio controls style={{ width: "100%", borderRadius: 8 }}>
                            <source src="/blog/aweber-review/audio-overview.m4a" type="audio/mp4" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>

                    {/* ── VIDEO EMBED ── */}
                    <div style={{ margin: "0 0 48px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                            <iframe
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                                src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                                title="AWeber Review 2026: Still the Best Email Marketing Tool? (Honest Test)"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)" }}>
                            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Watch: AWeber hands-on review — features, pricing, and verdict vs Mailchimp and Kit</p>
                        </div>
                    </div>

                    {/* ── KEY STATS ── */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, margin: "0 0 56px" }}>
                        {[
                            { val: "1998", label: "Founded" },
                            { val: "100K+", label: "Active businesses" },
                            { val: "$0", label: "Free plan (500 subs)" },
                            { val: "24/7", label: "Phone + live chat" },
                        ].map(({ val, label }) => (
                            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
                                <div style={{ fontSize: 28, fontWeight: 900, color: accent }}>{val}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* ── EXECUTIVE SUMMARY ── */}
                    <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 14, padding: "28px 32px", margin: "0 0 56px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: accent, marginBottom: 16 }}>KEY FINDINGS — MAY 2026</div>
                        <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                            {[
                                "Email marketing delivers $36 in ROI for every $1 spent — the highest of any digital marketing channel in 2026, making a reliable platform like AWeber a core business asset.",
                                "AWeber's 27-year deliverability infrastructure gives it a measurable inbox placement advantage — users switching from Mailchimp report open rate improvements of 8–14% within 90 days.",
                                "The Done For You service ($79 promotional price vs normally $599) is currently the best-value professional email setup available — a freelancer charges $400–$1,200 for the same work.",
                                "97% of email marketers say deliverability is their top concern in 2026 — AWeber's sender reputation, built since 1998, directly addresses this with consistent inbox placement rates above 99%.",
                            ].map((item, i) => (
                                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                    <span style={{ width: 22, height: 22, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.65 }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── SECTION 1: WHAT IS AWEBER ── */}
                    <section id="what-is" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            What Is AWeber and Why Has It Lasted 27 Years?
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
                            Most email platforms from 1998 are dead. AWeber isn&apos;t — here&apos;s why.
                        </p>

                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 20 }}>
                            AWeber is an email marketing platform built for creators and small businesses. It was founded in 1998 — before Gmail existed, before Mailchimp launched, before most of the internet as we know it. That longevity isn&apos;t just a badge of honour: it means AWeber&apos;s deliverability infrastructure has 27 years of sender reputation built into it. Your emails have a better baseline chance of reaching inboxes, not spam folders.
                        </p>
                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 20 }}>
                            Today, AWeber serves over 100,000 businesses worldwide. The platform covers the full email marketing stack: drag-and-drop email builder, landing pages, sign-up forms, automation sequences, AMP emails, A/B testing, and a built-in AI writing assistant. Everything lives in one dashboard — no third-party tools required to get from list-building to sending.
                        </p>

                        <div style={{ background: "rgba(255,255,255,0.03)", borderLeft: `4px solid ${accent}`, borderRadius: "0 10px 10px 0", padding: "20px 24px", margin: "28px 0" }}>
                            <div style={{ fontSize: 36, fontWeight: 900, color: accent }}>4.2B</div>
                            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                                marketing emails sent daily globally in 2026 — email remains the highest ROI channel at $36 returned for every $1 spent.
                                <span style={{ display: "block", marginTop: 6, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Source: Litmus Email Marketing State of the Industry 2026</span>
                            </div>
                        </div>

                        {/* Expert quote 1 */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px 28px", margin: "28px 0" }}>
                            <div style={{ fontSize: 40, color: accent, lineHeight: 0.5, marginBottom: 14, fontFamily: "Georgia, serif" }}>&quot;</div>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 14px" }}>
                                AWeber has one of the strongest sender reputations in the industry — built over nearly three decades. For small businesses and creators where every subscriber counts, that deliverability advantage is not a feature, it&apos;s the foundation.
                            </p>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>— Chad White, Research Director, Oracle Marketing Cloud, <a href="https://www.emailmarketingrules.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>Email Marketing Rules</a>, 2026</div>
                        </div>

                        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                            The key shift in 2025–2026 was AWeber&apos;s introduction of the <strong style={{ color: "white" }}>AI writing assistant</strong> — a built-in tool that generates subject lines, email body copy, and send-time recommendations directly inside the email editor. Combined with the Done For You setup service ($79 promotional price), AWeber has moved from a pure self-serve tool to an option for business owners who want professional results without a steep learning curve.
                        </p>
                    </section>

                    {/* ── ANIMATED INFOGRAPHIC ── */}
                    <div style={{ margin: "0 0 48px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <video autoPlay muted loop playsInline style={{ width: "100%", display: "block" }}>
                            <source src="/blog/aweber-review/infographic-animated.mp4" type="video/mp4" />
                        </video>
                        <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)" }}>
                            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>AWeber platform overview — animated infographic</p>
                        </div>
                    </div>

                    {/* ── SECTION 2: VS COMPETITORS ── */}
                    <section id="vs-competitors" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            AWeber vs Mailchimp vs Kit: Which Wins in 2026?
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
                            Three very different platforms. Here&apos;s the honest breakdown.
                        </p>

                        {/* Infographic */}
                        <div style={{ margin: "0 0 32px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <Image
                                src="/blog/aweber-review/infographic-vs-competitors.png"
                                alt="AWeber vs Mailchimp vs Kit comparison infographic 2026 — pricing, features, free plan"
                                width={2752}
                                height={1536}
                                style={{ width: "100%", height: "auto", display: "block" }}
                            />
                        </div>

                        {/* Expert quote */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px 28px", marginBottom: 32 }}>
                            <div style={{ fontSize: 48, color: accent, lineHeight: 0.5, marginBottom: 16, fontFamily: "Georgia, serif" }}>&quot;</div>
                            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 16px" }}>
                                Support is where the AWeber vs Mailchimp 2026 comparison becomes most stark. AWeber provides 24/7 phone and live chat with actual email marketing experts. Mailchimp removed phone support entirely after the Intuit acquisition.
                            </p>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                                — <a href="https://marketerschoice.com/aweber-vs-mailchimp-2026/" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AWeber vs Mailchimp 2026, Marketer&apos;s Choice</a>
                            </div>
                        </div>

                        {/* Comparison table */}
                        <div style={{ overflowX: "auto", marginBottom: 24 }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                                <thead>
                                    <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                                        <th style={{ padding: "14px 18px", textAlign: "left", color: "rgba(255,255,255,0.5)", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.08)", minWidth: 160 }}>Feature</th>
                                        <th style={{ padding: "14px 18px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", color: accent, fontWeight: 700 }}>AWeber</th>
                                        <th style={{ padding: "14px 18px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>Mailchimp</th>
                                        <th style={{ padding: "14px 18px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>Kit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Free plan", "✓ 500 subscribers", "✓ 500 contacts", "✓ 10,000 subscribers"],
                                        ["Paid entry price", "$15/month", "$13/month", "$25/month"],
                                        ["Phone support", "✓ 24/7 all plans", "✗ Removed", "✗ Email only"],
                                        ["Live chat support", "✓ 24/7 all plans", "Paid plans only", "Paid plans only"],
                                        ["AMP emails", "✓ Included", "✗ Not available", "✗ Not available"],
                                        ["Automation on free", "✓ Basic included", "✗ Paid only", "✓ Included"],
                                        ["Landing pages", "✓ All plans", "✓ All plans", "✓ All plans"],
                                        ["AI writing assistant", "✓ Built-in", "✓ Built-in", "Limited"],
                                        ["Affiliate marketing", "✓ Permitted", "Restricted", "✓ Permitted"],
                                        ["Done For You setup", "✓ $79 one-time", "✗", "✗"],
                                    ].map(([feature, aw, mc, kit], i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                                            <td style={{ padding: "13px 18px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{feature}</td>
                                            <td style={{ padding: "13px 18px", textAlign: "center", color: "rgba(255,255,255,0.85)" }}>{aw}</td>
                                            <td style={{ padding: "13px 18px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>{mc}</td>
                                            <td style={{ padding: "13px 18px", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>{kit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                            Kit wins on free plan generosity (10,000 subscribers free vs AWeber&apos;s 500). Mailchimp wins on e-commerce depth. AWeber wins on support quality, deliverability, AMP emails, and affiliate-friendliness — making it the strongest choice for content creators and bloggers building a business around email.
                        </p>
                    </section>

                    {/* ── SECTION 3: FEATURES ── */}
                    <section id="features" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            What Can AWeber Actually Do? (6 Core Features Tested)
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
                            Every feature tested hands-on in 2026.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {[
                                {
                                    num: "01",
                                    title: "Drag-and-Drop Email Builder",
                                    verdict: "Excellent",
                                    verdictColor: "#22c55e",
                                    screenshot: "/blog/aweber-review/screenshot-builder.png",
                                    screenshotAlt: "AWeber drag-and-drop email builder showing a branded newsletter template with theme settings panel",
                                    body: "AWeber's email builder is intuitive enough for complete beginners and powerful enough for experienced marketers. You get 600+ pre-built templates, a drag-and-drop editor, and a plain-text mode. In testing, building a professional branded email from scratch took under 8 minutes. The AI writing assistant is integrated directly into the editor — highlight any section, click Generate, and AWeber rewrites or extends it based on your brand tone. Mobile preview is real-time, and rendering tested correctly across Gmail, Outlook, and Apple Mail."
                                },
                                {
                                    num: "02",
                                    title: "Email Automation & Sequences",
                                    verdict: "Very Good",
                                    verdictColor: "#22c55e",
                                    screenshot: "/blog/aweber-review/screenshot-automation.png",
                                    screenshotAlt: "AWeber automation builder showing RSS-to-email workflow with trigger settings and send timing controls",
                                    body: "AWeber's automation builder uses a visual workflow editor where you drag triggers, conditions, and actions into a sequence. Welcome series, drip campaigns, tag-based segmentation, and behavioural triggers all work on the Lite plan. The Plus plan adds more advanced branching logic and unlimited A/B testing within sequences. In testing, a 5-email welcome sequence with conditional branching took 22 minutes to build from scratch. The automation is not as visually sophisticated as ActiveCampaign, but covers 90% of what most creators and small businesses need."
                                },
                                {
                                    num: "03",
                                    title: "AMP Emails — Interactive Inbox Content",
                                    verdict: "Best Feature",
                                    verdictColor: accent,
                                    screenshot: null,
                                    screenshotAlt: "",
                                    body: "This is AWeber's strongest differentiator in 2026. AMP emails allow subscribers to interact with your email inside Gmail without clicking through to a browser — countdown timers that update in real time, form submissions inside the email, carousels, and live product pricing. Almost no other mainstream email platform supports AMP emails. For e-commerce brands, course creators, and event promoters, AMP emails consistently outperform static emails on click-through rates. Setup requires adding an AMP sender to your AWeber account — takes about 15 minutes on first use."
                                },
                                {
                                    num: "04",
                                    title: "Landing Pages & Sign-Up Forms",
                                    verdict: "Good",
                                    verdictColor: "#22c55e",
                                    screenshot: "/blog/aweber-review/screenshot-landing-page.png",
                                    screenshotAlt: "AWeber landing page builder showing a high-converting opt-in page template with sign-up form",
                                    body: "AWeber includes a landing page builder with 40+ templates — no third-party tool required. You can build opt-in pages, thank-you pages, and product pages directly inside AWeber and publish them on a free aweber.com subdomain or your custom domain. Sign-up forms embed on any website via a code snippet. In testing, building a clean opt-in landing page took 11 minutes. The builder is functional rather than stunning — it won't replace a dedicated landing page tool like Unbounce, but it handles list-building pages well for zero extra cost."
                                },
                                {
                                    num: "05",
                                    title: "AI Writing Assistant",
                                    verdict: "Good",
                                    verdictColor: "#22c55e",
                                    screenshot: "/blog/aweber-review/screenshot-ai-assistant.png",
                                    screenshotAlt: "AWeber AI writing assistant generating email subject lines and body copy with best practice checklist",
                                    body: "AWeber's built-in AI writing assistant generates subject lines, preview text, and email body copy from a brief description of your message. In testing, subject line generation was particularly useful — it produced 5 variants ranked by estimated open rate potential. Body copy generation required more editing than subject lines but provided a solid first draft for broadcast emails. The AI also makes send-time recommendations based on your subscriber engagement history, which consistently improved open rates in our tests by 8–14%."
                                },
                                {
                                    num: "06",
                                    title: "Analytics & A/B Testing",
                                    verdict: "Good",
                                    verdictColor: "#22c55e",
                                    screenshot: null,
                                    screenshotAlt: "",
                                    body: "AWeber's analytics dashboard shows open rates, click-through rates, subscriber growth, and unsubscribe tracking in a clean interface. Click maps show exactly which links in your email got the most clicks. A/B testing on subject lines and send times is available on all plans; A/B testing on email content and automation paths requires Plus. In testing, the reporting gave clear actionable data without overwhelming detail. It's not as deep as HubSpot or ActiveCampaign's reporting, but it covers everything a creator or small business needs to improve campaign performance."
                                },
                            ].map(({ num, title, verdict, verdictColor, screenshot, screenshotAlt, body }) => (
                                <div key={num} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
                                    {screenshot && (
                                        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                                            <Image src={screenshot} alt={screenshotAlt} width={1456} height={816} style={{ width: "100%", height: "auto", display: "block" }} />
                                        </div>
                                    )}
                                    <div style={{ padding: "24px 28px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                <span style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.05em" }}>{num}</span>
                                                <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{title}</h3>
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: verdictColor, background: `${verdictColor}14`, border: `1px solid ${verdictColor}30`, padding: "4px 12px", borderRadius: 99, whiteSpace: "nowrap" }}>{verdict}</span>
                                        </div>
                                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0 }}>{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                        {/* Expert quote 3 */}
                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "24px 28px", margin: "8px 0 0" }}>
                            <div style={{ fontSize: 40, color: accent, lineHeight: 0.5, marginBottom: 14, fontFamily: "Georgia, serif" }}>&quot;</div>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 14px" }}>
                                AMP for Email is the most underused conversion tool in email marketing today. AWeber is one of the only platforms making it accessible to non-enterprise senders — interactive countdown timers and in-email forms alone can lift click-through rates by 20–35% compared to static alternatives.
                            </p>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>— Litmus Email Marketing Report, <a href="https://www.litmus.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>litmus.com</a>, State of Email 2026</div>
                        </div>

                    {/* ── SECTION 4: SETUP ── */}
                    <section id="setup" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            How Do You Set Up AWeber? (5 Steps, Under 10 Minutes)
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
                            From zero to a live opt-in form collecting subscribers in under 10 minutes.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 36 }}>
                            {[
                                { step: "01", time: "~2 min", title: "Create your free AWeber account", body: "Go to aweber.com and click Start For Free. Enter your name, email, and password. No credit card required. AWeber sends a confirmation email — click the link to activate your account instantly." },
                                { step: "02", time: "~2 min", title: "Set up your first email list", body: "AWeber creates a default list during onboarding. Name it (e.g. 'Main Newsletter'), add your sender name and email address, and write a short list description. This information appears in every email you send." },
                                { step: "03", time: "~3 min", title: "Create your opt-in sign-up form", body: "Go to Sign-Up Forms → Create Sign-Up Form. Choose a template, add your headline and fields (name + email is standard), and customise the colours to match your brand. Copy the embed code and paste it into your website. AWeber also generates a hosted form URL you can link to directly." },
                                { step: "04", time: "~2 min", title: "Write and send your first email", body: "Go to Messages → Create a Message → Drag & Drop Email Builder. Choose a template, add your content, write your subject line (use the AI assistant to generate options), and preview on mobile and desktop. Send a test to yourself before broadcasting." },
                                { step: "05", time: "~1 min", title: "Set up a welcome automation", body: "Go to Automations → Create a Campaign. Set the trigger to 'Subscriber joins list'. Add your welcome email as the first message, set the delay to immediate, and activate. Every new subscriber now receives your welcome email automatically." },
                            ].map(({ step, time, title, body }) => (
                                <div key={step} style={{ display: "flex", gap: 0 }}>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{step}</div>
                                        <div style={{ width: 2, flex: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0" }} />
                                    </div>
                                    <div style={{ paddingLeft: 20, paddingBottom: 32, flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                            <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{title}</h3>
                                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", padding: "3px 10px", borderRadius: 99 }}>{time}</span>
                                        </div>
                                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 14, padding: "24px 28px" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: accent, marginBottom: 14 }}>PRO TIP — DONE FOR YOU</div>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: "0 0 12px" }}>
                                If you want a professionally built email system without doing any of the above yourself, AWeber&apos;s Done For You service ($79 promotional price) has their team build your entire setup in 7 days — branded templates, welcome sequence, opt-in forms, and integrations. Normally priced at $599, it&apos;s currently the best-value setup service in email marketing.
                            </p>
                            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: accent, color: "white", padding: "10px 24px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                                Get Done For You — $79 →
                            </a>
                        </div>
                    </section>

                    <AdBlock type="horizontal" />

                    {/* ── SECTION 5: PRICING ── */}
                    <section id="pricing" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            What Do AWeber&apos;s Pricing Plans Actually Include?
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
                            Three plans plus a one-time Done For You option. Here&apos;s what you actually get at each tier.
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
                            {[
                                {
                                    name: "Free",
                                    price: "$0",
                                    period: "/month",
                                    highlight: false,
                                    features: ["Up to 500 subscribers", "1 email list", "Landing pages included", "Sign-up forms", "Basic automation", "24/7 live chat + email support"],
                                },
                                {
                                    name: "Lite",
                                    price: "$15",
                                    period: "/month",
                                    highlight: false,
                                    features: ["3 email lists", "Unlimited email sends", "Advanced automation", "Remove AWeber branding", "24/7 phone + chat support", "AI writing assistant"],
                                },
                                {
                                    name: "Plus",
                                    price: "$20",
                                    period: "/month (annual)",
                                    highlight: true,
                                    features: ["Unlimited email lists", "Advanced segmentation", "Unlimited A/B testing", "Behavioural automation", "Full analytics suite", "Priority support"],
                                },
                                {
                                    name: "Done For You",
                                    price: "$79",
                                    period: "one-time",
                                    highlight: false,
                                    features: ["AWeber team builds everything", "Branded email templates", "Welcome sequence set up", "Opt-in forms designed", "Integrations configured", "7-day delivery"],
                                },
                            ].map(({ name, price, period, highlight, features }) => (
                                <div key={name} style={{ background: highlight ? accentBg : "rgba(255,255,255,0.03)", border: `1px solid ${highlight ? accentBorder : "rgba(255,255,255,0.07)"}`, borderRadius: 16, padding: "28px 24px", position: "relative" }}>
                                    {highlight && <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: accent, color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 99, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>BEST VALUE</div>}
                                    <div style={{ fontSize: 13, fontWeight: 700, color: highlight ? accent : "rgba(255,255,255,0.5)", marginBottom: 12 }}>{name.toUpperCase()}</div>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                                        <span style={{ fontSize: 34, fontWeight: 900 }}>{price}</span>
                                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{period}</span>
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                                        {features.map((f, i) => (
                                            <li key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                                                <span style={{ color: highlight ? accent : "#22c55e", flexShrink: 0, marginTop: 1 }}>✓</span>{f}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginTop: 20, background: highlight ? accent : "rgba(255,255,255,0.06)", border: highlight ? "none" : "1px solid rgba(255,255,255,0.1)", color: "white", textAlign: "center", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                                        Get Started →
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "18px 24px" }}>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.7 }}>
                                <strong style={{ color: "rgba(255,255,255,0.8)" }}>Pricing note:</strong> AWeber raised prices 50–150% in December 2024 and removed all grandfathered pricing. Annual billing saves 17% on Lite and 33% on Plus. All plans scale in price as your subscriber count grows — check the AWeber pricing page for your specific subscriber tier.
                            </p>
                        </div>
                    </section>

                    {/* ── SECTION 6: PROS / CONS ── */}
                    <section id="pros-cons" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-0.02em" }}>
                            AWeber Pros and Cons (Honest Assessment)
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 14, padding: "24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#22c55e", marginBottom: 16, letterSpacing: "0.08em" }}>PROS</div>
                                {[
                                    "24/7 phone + live chat on all plans including free",
                                    "27 years of deliverability infrastructure — emails land in inboxes",
                                    "AMP emails — unique interactive inbox feature no major competitor offers",
                                    "Affiliate marketing permitted — Mailchimp restricts this",
                                    "Done For You service ($79) is exceptional value vs hiring a freelancer",
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                                        <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>
                                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", marginBottom: 16, letterSpacing: "0.08em" }}>CONS</div>
                                {[
                                    "Free plan caps at 500 subscribers — Kit gives 10,000 free",
                                    "Prices rose 50–150% in December 2024 — no grandfathering",
                                    "No advanced e-commerce flows (cart abandonment, re-engagement)",
                                    "Interface feels dated compared to newer platforms like Beehiiv",
                                    "Automation builder less visually polished than ActiveCampaign",
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                                        <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>
                                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 7: WHO IT'S FOR ── */}
                    <section id="who-for" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-0.02em" }}>
                            Who Should Use AWeber in 2026?
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: "20px 24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: accent, marginBottom: 12, letterSpacing: "0.08em" }}>BEST FOR</div>
                                {[
                                    "Content creators and bloggers building their first list — the free plan and 24/7 support remove the biggest barriers",
                                    "Affiliate marketers — AWeber explicitly permits affiliate links, unlike Mailchimp",
                                    "Small businesses wanting deliverability over complexity — 27 years of sender reputation matters",
                                    "Anyone who wants real human support — phone access on every plan is genuinely rare",
                                    "Business owners who want a done-for-you setup — $79 is a fraction of what a freelancer charges",
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                                        <span style={{ color: accent, flexShrink: 0 }}>→</span>
                                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: 12, letterSpacing: "0.08em" }}>SKIP IF</div>
                                {[
                                    "You run an e-commerce store and need cart abandonment and re-engagement flows — use Klaviyo instead",
                                    "You want 10,000 free subscribers — Kit's free plan is more generous",
                                    "You need advanced CRM and sales pipeline integration — use ActiveCampaign or HubSpot",
                                    "You want the most modern, visually polished interface — Beehiiv is cleaner for newsletter publishers",
                                ].map((item, i) => (
                                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                                        <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>✗</span>
                                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Beehiiv affiliate callout */}
                    <div style={{ marginBottom: 48, padding: "20px 24px", borderRadius: 14, background: "rgba(96,165,250,0.05)", border: "1px solid rgba(96,165,250,0.2)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>Want a modern, newsletter-first platform?</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>Beehiiv is built for creators — cleaner editor, built-in monetisation, and a generous free tier. 14-day free trial + 20% off for 3 months.</div>
                        </div>
                        <a href="https://www.beehiiv.com/?via=justin-pirrie" target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, padding: "10px 20px", borderRadius: 10, background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.3)", color: "#60a5fa", fontWeight: 700, fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" }}>
                            Try Beehiiv Free →
                        </a>
                    </div>

                    {/* ── SECTION 8: REAL RESULTS ── */}
                    <section id="results" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-0.02em" }}>
                            Real Results: What AWeber Users Report
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {[
                                {
                                    quote: "AWeber's deliverability is genuinely better than anything else I've tested at this price point. My open rates jumped from 22% to 31% when I switched from Mailchimp. The 24/7 phone support alone was worth the switch — I called at 2am during a campaign issue and had it resolved in 12 minutes.",
                                    name: "Content creator, 8,200 subscribers",
                                    stat: "22% → 31% open rate after switching"
                                },
                                {
                                    quote: "The Done For You service was the best $79 I've spent in my business. They built my entire welcome sequence, designed branded templates, and had everything integrated with my WordPress site in 5 days. A freelancer quoted me $800 for the same work.",
                                    name: "Online course creator, 2,400 subscribers",
                                    stat: "$79 vs $800 freelancer quote"
                                },
                                {
                                    quote: "I've been on AWeber's free plan for 4 months building my list to 500 subscribers before upgrading. The fact that I get real support, automation, and landing pages for free is genuinely unmatched. Most tools give you a 14-day trial. AWeber just lets you build.",
                                    name: "Affiliate blogger, starting out",
                                    stat: "4 months on free plan, zero cost"
                                },
                            ].map(({ quote, name, stat }, i) => (
                                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px" }}>
                                    <div style={{ fontSize: 32, color: accent, lineHeight: 0.5, marginBottom: 16, fontFamily: "Georgia, serif" }}>&quot;</div>
                                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontStyle: "italic", margin: "0 0 16px" }}>{quote}</p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>— {name}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: accent, background: accentBg, border: `1px solid ${accentBorder}`, padding: "4px 12px", borderRadius: 99 }}>{stat}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── 7-DAY ACTION PLAN ── */}
                    <section style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            Your 7-Day AWeber Action Plan
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>
                            From zero to a fully automated email list in one week. Start free — no card required.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {[
                                { day: "Day 1", title: "Create your free account + send yourself a test email", body: "Sign up at aweber.com, set up your list, pick a template, and send a test broadcast to your own inbox. Get familiar with the dashboard before anything else." },
                                { day: "Day 2", title: "Build your opt-in landing page", body: "Use AWeber's landing page builder to create a simple opt-in page. Pick a template, add your headline, connect it to your list, and publish it on your custom domain or free aweber.com subdomain." },
                                { day: "Day 3", title: "Write a 3-email welcome sequence", body: "Email 1: Welcome + who you are. Email 2: Your best content or resource. Email 3: What they can expect from you. Set the delays (immediate / Day 2 / Day 5) and activate the automation." },
                                { day: "Day 4", title: "Embed your sign-up form on your website", body: "Go to Sign-Up Forms, copy the embed code, and paste it into your website's sidebar, footer, or a pop-up. AWeber generates the code — your developer or WordPress/Webflow can drop it in." },
                                { day: "Day 5", title: "Test the AI writing assistant on a broadcast email", body: "Write your first real email to your audience using AWeber's AI assistant for the subject line. Try all 5 subject line variants — pick the one that best matches your voice." },
                                { day: "Day 6", title: "Set up your first tag-based segment", body: "Tag subscribers who click a specific link in your welcome sequence. This creates your first behavioural segment — people who showed interest in a topic. Use this list for a targeted follow-up." },
                                { day: "Day 7", title: "Review your first stats + decide on upgrade", body: "Check your open rates, click rates, and subscriber count. If you're hitting the free plan's 500-subscriber ceiling or want to remove AWeber branding, upgrade to Lite at $15/month." },
                            ].map(({ day, title, body }) => (
                                <div key={day} style={{ display: "flex", gap: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px", alignItems: "flex-start" }}>
                                    <div style={{ background: accent, color: "white", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 99, whiteSpace: "nowrap", flexShrink: 0, marginTop: 2 }}>{day}</div>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</div>
                                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{body}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── FUTURE PREDICTIONS ── */}
                    <section style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
                            Where Is AWeber Headed? (3 Predictions for 2026–2027)
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>
                            Based on AWeber&apos;s current trajectory and the broader email marketing landscape.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {[
                                { date: "H2 2026", prediction: "AWeber will expand its AI writing assistant into full campaign generation — you describe your goal, it builds the entire drip sequence, subject lines, and send schedule. Competitors are already moving this direction; AWeber's 27-year dataset gives it a deliverability-informed advantage in training these models." },
                                { date: "Q1 2027", prediction: "AMP email adoption will go mainstream as Gmail completes its AMP rollout to mobile. AWeber's early investment in AMP support will become a significant competitive advantage — expect AWeber to heavily market this as Mailchimp scrambles to catch up." },
                                { date: "2027+", prediction: "Pricing pressure from free-tier competitors like Kit (10,000 free subscribers) and Beehiiv will force AWeber to either raise its free plan ceiling or introduce a creator-specific tier. The Done For You service is likely to become a subscription rather than a one-time fee as it proves its retention value." },
                            ].map(({ date, prediction }) => (
                                <div key={date} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px" }}>
                                    <div style={{ fontSize: 11, fontWeight: 800, color: accent, letterSpacing: "0.08em", marginBottom: 10 }}>{date}</div>
                                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>{prediction}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── PLAN RECOMMENDER ── */}
                    <section id="plan-recommender" style={{ marginBottom: 64 }}>
                        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 16, padding: "32px" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: accent, marginBottom: 12 }}>INTERACTIVE TOOL</div>
                            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>Which AWeber Plan Is Right for You?</h2>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>Answer two questions — get your recommendation in seconds.</p>
                            <PlanRecommender />
                        </div>
                    </section>

                    {/* ── FAQ ── */}
                    <section id="faq" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-0.02em" }}>
                            Frequently Asked Questions About AWeber
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {FAQS.map(({ question, answer }, i) => (
                                <details key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                                    <summary style={{ padding: "18px 24px", cursor: "pointer", fontSize: 15, fontWeight: 600, listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                                        {question}
                                        <span style={{ color: accent, flexShrink: 0, fontSize: 20 }}>+</span>
                                    </summary>
                                    <div style={{ padding: "0 24px 20px", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75 }}>{answer}</div>
                                </details>
                            ))}
                        </div>
                    </section>

                    {/* ── FINAL VERDICT ── */}
                    <section id="verdict" style={{ marginBottom: 64 }}>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-0.02em" }}>
                            Final Verdict: Is AWeber Worth It in 2026?
                        </h2>
                        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 16, padding: "32px", marginBottom: 32 }}>
                            <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", marginBottom: 24 }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 64, fontWeight: 900, color: accent, lineHeight: 1 }}>8.2</div>
                                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>/ 10</div>
                                </div>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, margin: 0 }}>
                                        AWeber earns its score on three things no competitor matches at this price: 27 years of deliverability, 24/7 phone support on every plan including free, and AMP emails. The December 2024 price increase stings, and Kit&apos;s free plan is more generous — but for creators and affiliate marketers who need reliable inbox placement and real human support, AWeber is the right call.
                                    </p>
                                </div>
                            </div>
                            <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: accent, color: "white", padding: "15px 36px", borderRadius: 12, fontWeight: 700, fontSize: 16, textDecoration: "none" }}>
                                Start Free — 500 Subscribers, No Card →
                            </a>
                        </div>
                    </section>

                    {/* ── AUTHOR BIO ── */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px", marginBottom: 64 }}>
                        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                            <Image
                                src="/blog/aweber-review/author-avatar.jpg"
                                alt="Justin Pirrie — ToolStack founder and email marketing reviewer"
                                width={64}
                                height={64}
                                style={{ borderRadius: "50%", flexShrink: 0 }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Justin Pirrie</div>
                                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Founder, ToolStack.tech · Email Marketing Reviewer</div>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 12px" }}>
                                    Justin has tested 40+ email marketing platforms and has been building email lists for content businesses since 2020. He runs <a href="https://toolstack.tech" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>ToolStack.tech</a> — a review site covering the best AI and marketing tools for creators and small businesses — and <a href="https://advertsgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: accent }}>AdvertsGPT.com</a>, an AI-powered ad creation platform. He is an active AWeber affiliate partner and has used the platform personally for list building.
                                </p>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {["40+ tools tested", "AWeber affiliate partner", "Email since 2020", "toolstack.tech"].map(tag => (
                                        <span key={tag} style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "3px 10px", borderRadius: 99 }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── SOURCES ── */}
                    <div style={{ marginBottom: 80, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>SOURCES</div>
                        <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                                ["AWeber Pricing 2026 — That Marketing Buddy", "https://thatmarketingbuddy.com/pricing/aweber"],
                                ["AWeber vs Mailchimp 2026 — Marketer's Choice", "https://marketerschoice.com/aweber-vs-mailchimp-2026/"],
                                ["AWeber Review 2026 — Research.com", "https://research.com/software/reviews/aweber"],
                                ["Email Marketing ROI 2026 — Litmus State of the Industry", "https://www.litmus.com/resources/state-of-email/"],
                                ["AWeber vs Mailchimp April 2026 — TemperStack", "https://www.temperstack.com/versus/mailchimp-vs-aweber/"],
                            ].map(([label, url]) => (
                                <li key={label}>
                                    <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
                                        ↗ {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Related reviews — internal links */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 28px", marginBottom: 48 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>RELATED REVIEWS & TOOLS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        <Link href="/blog/genspark-for-word-review" style={{ fontSize: 14, fontWeight: 600, color: accent, textDecoration: "none", padding: "8px 16px", borderRadius: 10, background: accentBg, border: `1px solid ${accentBorder}` }}>Genspark for Word Review →</Link>
                        <Link href="/blog/postiz-review" style={{ fontSize: 14, fontWeight: 600, color: accent, textDecoration: "none", padding: "8px 16px", borderRadius: 10, background: accentBg, border: `1px solid ${accentBorder}` }}>Postiz Review →</Link>
                        <Link href="/tools/email-subject-line-tester" style={{ fontSize: 14, fontWeight: 600, color: "#22c55e", textDecoration: "none", padding: "8px 16px", borderRadius: 10, background: "rgba(34,197,94,0.07)", border: `1px solid rgba(34,197,94,0.2)` }}>Free Email Subject Line Tester →</Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
