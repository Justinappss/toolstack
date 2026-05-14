import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleSchema } from "@/components/ui/ArticleSchema";

const FAQS = [
    {
        question: "What is a hashtag generator?",
        answer: "A hashtag generator is a tool that automatically creates relevant hashtags for your content based on your topic, platform, and preferred tone. The ToolStack Hashtag Generator uses AI to suggest a three-tier mix of high-reach, growing, and niche hashtags tailored to your post. It supports Instagram, TikTok, LinkedIn, X/Twitter, and YouTube — all free, no signup required.",
    },
    {
        question: "What is the best free wedding hashtag generator?",
        answer: "The ToolStack Hashtag Generator is the best free wedding hashtag generator because it creates AI-powered, platform-specific sets with a balanced three-tier mix. Simply describe your wedding (e.g. 'beach wedding in Bali, bride and groom names Sarah and Tom') and the tool generates personalised hashtags across high-reach, growing, and niche tiers — no signup, no credits, instant results. Perfect for brides sharing wedding content on Instagram, TikTok, and Pinterest.",
    },
    {
        question: "What are the three tiers of hashtags?",
        answer: "The three tiers are: High-Reach tags (1M+ posts — broad visibility but extreme competition, use 2-3 per set), Growing tags (100k-1M posts — the sweet spot with the best reach-to-competition ratio, use 40-50% of your set), and Niche tags (under 100k posts — small but highly engaged audiences that drive actual saves and follows). Used together, they create a funnel: high-reach gets you discovered, growing keeps you visible, and niche converts engaged viewers into followers.",
    },
    {
        question: "How many hashtags should I use on Instagram?",
        answer: "Instagram allows up to 30 hashtags per post. Research consistently shows that posts using 20-30 hashtags generate the most reach for growth-stage accounts. The ideal mix is 2-3 high-reach tags, 5-10 growing tags, and 10-15 niche tags — the ToolStack Hashtag Generator builds exactly this ratio automatically. Post hashtags in your first comment to keep the caption clean while still getting full algorithmic reach.",
    },
    {
        question: "How many hashtags should I use on TikTok?",
        answer: "TikTok recommends 5-8 hashtags per post. Unlike Instagram, more is not better on TikTok — its algorithm is topic-based and prioritises content quality over tag volume. Niche-specific hashtags outperform generic ones here. Use 1-2 growing tags and 3-6 niche tags. Place your most relevant niche hashtags in the first line of your caption. The ToolStack Hashtag Generator tailors exactly 5-8 tags when TikTok is selected as your platform.",
    },
    {
        question: "Do hashtags still work in 2026?",
        answer: "Yes — hashtags are still one of the most effective ways to categorise your content for algorithmic discovery. Every major platform (Instagram, TikTok, LinkedIn, X, YouTube) uses hashtags to understand what your post is about and who to show it to. The key change is that quality and specificity matter more than ever. A set of 5-10 well-chosen, platform-specific tags outperforms 30 generic ones every time. The ToolStack Hashtag Generator helps you build targeted sets that work with each platform's current algorithm.",
    },
    {
        question: "How do AI tools improve social media marketing?",
        answer: "AI tools improve social media marketing by automating the research and optimisation that used to take hours of manual hashtag analysis. Instead of researching trending tags, checking competition levels, and manually curating sets for each platform, tools like the ToolStack Hashtag Generator do it in seconds. Pair it with the AI Prompt Generator for crafting captions, the Meta Description Generator for optimising link previews, and AdvertiseGPT for checking your content's AI search visibility across ChatGPT, Perplexity, and Gemini.",
    },
];

const accent = "#E1306C";

const toolsLink: React.CSSProperties = {
    color: accent,
    fontWeight: 600,
    textDecoration: "none",
};

const affiliateLink: React.CSSProperties = {
    color: "#34d399",
    fontWeight: 700,
    textDecoration: "none",
};

const sectionCard: React.CSSProperties = {
    padding: "24px 28px",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    marginBottom: 24,
};

const mistakeCard: React.CSSProperties = {
    padding: "20px 24px",
    borderRadius: 14,
    border: "1px solid rgba(225,48,108,0.2)",
    background: "rgba(225,48,108,0.04)",
    marginBottom: 16,
};

const tierCard: React.CSSProperties = {
    padding: "20px 24px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    marginBottom: 16,
};

const platformCard: React.CSSProperties = {
    padding: "16px 20px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    marginBottom: 12,
};

export default function BlogPost() {
    return (
        <main style={{ minHeight: "100vh", background: "#050505", color: "white" }}>
            <ArticleSchema
                headline="Hashtag Generator: The 3-Tier Strategy to Grow Your Social Reach (Free AI Tool)"
                description="Stop using #love #photo #fun on every post. Learn the 3-tier hashtag strategy and generate your perfect set free with the ToolStack Hashtag Generator."
                url="https://toolstack.tech/blog/hashtag-generator-guide"
                datePublished="2026-05-14"
                dateModified="2026-05-14"
                faqs={FAQS}
            />

            {/* Hero */}
            <div style={{ position: "relative", overflow: "hidden", paddingTop: 140, paddingBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(225,48,108,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
                <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative" }}>
                    {/* Breadcrumb */}
                    <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                        <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
                        <span>{"›"}</span>
                        <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Blog</Link>
                        <span>{"›"}</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>Hashtag Generator Guide</span>
                    </nav>

                    {/* Tag */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 999, background: "rgba(225,48,108,0.12)", border: "1px solid rgba(225,48,108,0.25)", color: "#f9a8d4" }}>SOCIAL MEDIA</span>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>May 14, 2026 · 8 min read</span>
                    </div>

                    <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.03em", color: "white", margin: "0 0 20px" }}>
                        Hashtag Generator: The 3-Tier Strategy to{" "}
                        <span style={{ color: accent }}>Grow Your Reach</span>
                    </h1>

                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "0 0 28px" }}>
                        Stop using{" "}
                        <code style={{ background: "rgba(225,48,108,0.12)", padding: "2px 8px", borderRadius: 4, color: "#f9a8d4", fontSize: 14 }}>#love</code>{" "}
                        <code style={{ background: "rgba(225,48,108,0.12)", padding: "2px 8px", borderRadius: 4, color: "#f9a8d4", fontSize: 14 }}>#photo</code>{" "}
                        <code style={{ background: "rgba(225,48,108,0.12)", padding: "2px 8px", borderRadius: 4, color: "#f9a8d4", fontSize: 14 }}>#fun</code>{" "}
                        on every post. Learn the 3-tier hashtag framework — High-Reach, Growing, and Niche — and generate your perfect set instantly with the free ToolStack Hashtag Generator. No signup required.
                    </p>

                    {/* Author byline */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #E1306C, #bc1888)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white", flexShrink: 0 }}>JP</div>
                        <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Justin Pirrie</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Founder, ToolStack</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 100px" }}>

                {/* TL;DR */}
                <div style={{ padding: "20px 24px", borderRadius: 14, border: "1px solid rgba(225,48,108,0.25)", background: "rgba(225,48,108,0.06)", marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#f9a8d4", margin: "0 0 12px", textTransform: "uppercase" }}>TL;DR</p>
                    <ul style={{ margin: 0, padding: "0 0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Most hashtag strategies fail because creators use only high-competition tags (#love, #fitness) and ignore the "Growing" and "Niche" tiers that actually drive engagement. The <Link href="/tools/hashtag-generator" style={toolsLink}>ToolStack Hashtag Generator</Link> builds all three tiers in one click.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Each platform has a different optimal tag count — Instagram (30), TikTok (5-8), LinkedIn (3-5), X/Twitter (1-2), YouTube (15). The tool auto-adjusts the set size based on your platform selection.</li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>Generate your perfect hashtag set in seconds — free, no account needed — at the <Link href="/tools/hashtag-generator" style={toolsLink}>Hashtag Generator</Link>.</li>
                    </ul>
                </div>

                {/* YouTube Video */}
                <div style={{ marginBottom: 40, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.4)" }}>
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                        <iframe
                            src="https://www.youtube.com/embed/9IoL7S5uERQ"
                            title="3-Tier Hashtag Strategy for Instagram, TikTok & LinkedIn - Free Generator"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                        />
                    </div>
                </div>

                {/* Animated overview video */}
                <div style={{ marginBottom: 48, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.4)" }}>
                  <video width="100%" controls style={{ display: "block" }}>
                    <source src="/blog/hashtag-generator-guide/animated-overview.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div style={{ padding: "14px 20px", background: "rgba(255,255,255,0.02)" }}>
                    <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Watch: Animated overview of the 3-tier hashtag strategy for social media</p>
                  </div>
                </div>

                {/* Animated infographic 1 */}
                <div style={{ marginBottom: 48 }}>
                  <video width="100%" controls style={{ display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
                    <source src="/blog/hashtag-generator-guide/animated-infographic-1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Animated infographic 2 */}
                <div style={{ marginBottom: 48 }}>
                  <video width="100%" controls style={{ display: "block", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
                    <source src="/blog/hashtag-generator-guide/animated-infographic-2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Section 1 — Why Hashtags Fail */}
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: "40px 0 16px", letterSpacing: "-0.02em" }}>Why Most Hashtag Strategies Fail</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 16 }}>
                    You can create the best content on the platform. If your hashtags are wrong, nobody sees it. The problem is that most creators do the same thing: they grab the most popular tags they can think of —{" "}
                    <code style={{ background: "rgba(225,48,108,0.12)", padding: "2px 6px", borderRadius: 4, color: "#f9a8d4", fontSize: 13 }}>#love</code>,{" "}
                    <code style={{ background: "rgba(225,48,108,0.12)", padding: "2px 6px", borderRadius: 4, color: "#f9a8d4", fontSize: 13 }}>#fitness</code>,{" "}
                    <code style={{ background: "rgba(225,48,108,0.12)", padding: "2px 6px", borderRadius: 4, color: "#f9a8d4", fontSize: 13 }}>#marketing</code> — and paste them on every single post. These tags have hundreds of millions of posts. Your content gets buried in seconds.
                </p>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 24 }}>
                    The real mistake is treating all hashtags as equal. They are not. Here are the three most common hashtag mistakes the <Link href="/tools/hashtag-generator" style={toolsLink}>ToolStack Hashtag Generator</Link> helps you avoid:
                </p>

                <div style={{ marginBottom: 32 }}>
                    {[
                        {
                            title: "Using Only High-Competition Tags",
                            body: "Tags with 1M+ posts have massive audiences, but your post competes against millions of others. Even if you get seen, you get buried within minutes. Using only high-reach tags is like shouting into a stadium — nobody hears you specifically.",
                        },
                        {
                            title: "Copy-Pasting the Same Set Every Post",
                            body: "Instagram and TikTok penalise accounts that use identical hashtag blocks across multiple posts. The algorithm flags it as spammy behaviour and reduces your reach. You need a fresh set for every single post — manually, that's exhausting.",
                        },
                        {
                            title: "Ignoring Platform-Specific Rules",
                            body: "Using 30 Instagram-style hashtags on TikTok hurts your reach. Using 5 TikTok-style hashtags on Instagram leaves reach on the table. Each platform has a different optimal tag count and the algorithm weights tags differently. One-size-fits-all hashtagging is worse than no hashtagging.",
                        },
                    ].map(({ title, body }) => (
                        <div key={title} style={mistakeCard}>
                            <h3 style={{ fontSize: 15, fontWeight: 800, color: accent, margin: "0 0 8px" }}>{title}</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{body}</p>
                        </div>
                    ))}
                </div>

                {/* Section 2 — The 3-Tier Strategy */}
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>The 3-Tier Hashtag Strategy Explained</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 20 }}>
                    The three-tier strategy is simple: instead of using one type of hashtag, you blend three categories based on popularity. Each tier serves a different role in your content's discovery funnel. Here is exactly how it works:
                </p>

                <div style={{ marginBottom: 32 }}>
                    <div style={{ ...tierCard, border: "1px solid rgba(251,191,36,0.25)", background: "rgba(251,191,36,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <span style={{ fontSize: 20 }}>{"🔥"}</span>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fbbf24", margin: 0 }}>High Reach — 1M+ Posts</h3>
                        </div>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
                            Broad visibility tags like <code style={{ background: "rgba(251,191,36,0.12)", padding: "2px 6px", borderRadius: 4, color: "#fbbf24", fontSize: 13 }}>#wedding</code>,{" "}
                            <code style={{ background: "rgba(251,191,36,0.12)", padding: "2px 6px", borderRadius: 4, color: "#fbbf24", fontSize: 13 }}>#photography</code>, or{" "}
                            <code style={{ background: "rgba(251,191,36,0.12)", padding: "2px 6px", borderRadius: 4, color: "#fbbf24", fontSize: 13 }}>#marketingtips</code>.{" "}
                            Huge audience but extreme competition. Your post disappears in seconds. Use only 2-3 per set as a discovery entry point. Think of these as your "shout into the crowd" tags — they help the algorithm understand the general category of your content but rarely drive direct engagement.
                        </p>
                    </div>

                    <div style={{ ...tierCard, border: "1px solid rgba(56,189,248,0.25)", background: "rgba(56,189,248,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <span style={{ fontSize: 20 }}>{"📈"}</span>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#38bdf8", margin: 0 }}>Growing — 100k to 1M Posts</h3>
                        </div>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
                            The sweet spot. These tags have enough search volume to drive discovery, but not so much competition that your post gets buried instantly. Examples:{" "}
                            <code style={{ background: "rgba(56,189,248,0.12)", padding: "2px 6px", borderRadius: 4, color: "#38bdf8", fontSize: 13 }}>#beachweddingideas</code>,{" "}
                            <code style={{ background: "rgba(56,189,248,0.12)", padding: "2px 6px", borderRadius: 4, color: "#38bdf8", fontSize: 13 }}>#b2bcontentstrategy</code>.{" "}
                            Should make up 40-50% of your hashtag set. This is where the majority of your discovery and reach will come from. These tags keep your content in the feed long enough for people to actually see and engage with it.
                        </p>
                    </div>

                    <div style={{ ...tierCard, border: "1px solid rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.04)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <span style={{ fontSize: 20 }}>{"🎯"}</span>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#34d399", margin: 0 }}>Niche — Under 100k Posts</h3>
                        </div>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
                            Small audience, high engagement. Your post stays visible for hours or even days. These tags reach people actively searching for that specific topic. Examples:{" "}
                            <code style={{ background: "rgba(52,211,153,0.12)", padding: "2px 6px", borderRadius: 4, color: "#34d399", fontSize: 13 }}>#balibeachweddingvenue</code>,{" "}
                            <code style={{ background: "rgba(52,211,153,0.12)", padding: "2px 6px", borderRadius: 4, color: "#34d399", fontSize: 13 }}>#saasfounderdaily</code>.{" "}
                            These tags drive actual engagement — saves, shares, follows, and comments. If you are a wedding photographer, using{" "}
                            <code style={{ background: "rgba(52,211,153,0.12)", padding: "2px 6px", borderRadius: 4, color: "#34d399", fontSize: 13 }}>#rusticbarnweddingohio</code>{" "}
                            reaches exactly the couple searching for that specific style and location. Much more valuable than a generic tag.
                        </p>
                    </div>
                </div>

                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 40 }}>
                    The <Link href="/tools/hashtag-generator" style={toolsLink}>ToolStack Hashtag Generator</Link> builds this exact mix automatically for any topic. Type in your post idea, pick your platform and tone, and get a balanced three-tier set in seconds. It even works as a{" "}
                    <strong style={{ color: "white" }}>free wedding hashtag generator</strong>{" "}
                    — type "beach wedding in Bali, Sarah and Tom" and it generates personalised high-reach, growing, and niche tags for sharing your wedding content.
                </p>

                {/* Section 3 — Platform-Specific Limits */}
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Optimal Hashtag Counts Per Platform</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 20 }}>
                    Each platform has different rules for how many hashtags work best. The ToolStack Hashtag Generator adjusts the set size automatically when you select a platform. Here is your cheat sheet:
                </p>

                <div style={{ marginBottom: 32 }}>
                    {[
                        { platform: "Instagram", limit: "30 tags", strategy: "Full three-tier mix across all 30 slots. Post in first comment to keep caption clean while maximising reach. Use 2-3 high-reach, 5-10 growing, 10-15 niche." },
                        { platform: "TikTok", limit: "5-8 tags", strategy: "Quality over quantity. TikTok's algorithm is topic-based — niche tags outperform generic ones. Place most relevant tags in the first line of caption. 1-2 growing, 3-6 niche." },
                        { platform: "LinkedIn", limit: "3-5 tags", strategy: "Place at the very end of the post. Never interrupt narrative mid-copy. LinkedIn penalises posts that look spammy. Stick to professional niche tags." },
                        { platform: "X / Twitter", limit: "1-2 tags", strategy: "Hashtags consume character count. Posts with 1-2 hashtags outperform those with more — engagement drops sharply above 3. Keep them at the end." },
                        { platform: "YouTube", limit: "Up to 15 tags", strategy: "First 3 hashtags appear above the video title — make them count. Place the rest at the very end of the description for discovery." },
                    ].map(({ platform, limit, strategy }) => (
                        <div key={platform} style={platformCard}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <strong style={{ fontSize: 14, color: accent, fontWeight: 800 }}>{platform}</strong>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#34d399" }}>{limit}</span>
                            </div>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>{strategy}</p>
                        </div>
                    ))}
                </div>

                {/* Section 4 — How to Use the Generator */}
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: "0 0 16px", letterSpacing: "-0.02em" }}>How to Use the ToolStack Hashtag Generator</h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: 16 }}>
                    The ToolStack Hashtag Generator turns a 10-minute manual task into a 10-second workflow. Here is exactly how to use it:
                </p>

                <div style={{ ...sectionCard }}>
                    <ol style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                            <strong style={{ color: "white" }}>Describe your content.</strong> Type your topic, post idea, or caption into the text area. The more specific, the better. "Morning yoga for beginners" gets better suggestions than "yoga". For wedding content, try "Beach wedding in Cancun, bride and groom Maria and James".
                        </li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                            <strong style={{ color: "white" }}>Choose your platform.</strong> Select from Instagram, TikTok, LinkedIn, X/Twitter, or YouTube. The tool adjusts the tag count and mix ratio based on the platform you choose.
                        </li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                            <strong style={{ color: "white" }}>Pick a tone.</strong> Professional, Casual & Fun, Trendy/Viral, or Expert/Niche. This affects the style and specificity of the suggested tags.
                        </li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                            <strong style={{ color: "white" }}>AI generates your three-tier set.</strong> The tool analyses your topic and returns a curated set split into High-Reach, Growing, and Niche tiers.
                        </li>
                        <li style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                            <strong style={{ color: "white" }}>Curate and copy.</strong> Deselect any tags that do not fit. Choose your copy format (space-separated, one-per-line, or first-comment format). Copy your perfect set in one click.
                        </li>
                    </ol>
                </div>

                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "20px 0 40px" }}>
                    This whole workflow takes about 10 seconds. Generating a fresh, platform-optimised hashtag set for every single post — exactly what the algorithm rewards. Try it now at the <Link href="/tools/hashtag-generator" style={toolsLink}>Hashtag Generator</Link>.
                </p>

                {/* More ToolStack tools section */}
                <div style={{ padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#f9a8d4", margin: "0 0 12px", textTransform: "uppercase" }}>More Free Tools</p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>
                        The Hashtag Generator is part of the ToolStack ecosystem. Pair it with the <Link href="/tools/ai-prompt-generator" style={toolsLink}>AI Prompt Generator</Link> to draft engaging captions for your posts, the <Link href="/tools/word-counter" style={toolsLink}>Word Counter</Link> to check caption length and readability, or the <Link href="/tools/meta-description-generator" style={toolsLink}>Meta Description Generator</Link> to optimise link previews when sharing your content. All free, no signup.
                    </p>
                </div>

                {/* Email marketing affiliate section */}
                <div style={{ padding: "28px 32px", borderRadius: 20, border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.04)", marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#34d399", margin: "0 0 12px", textTransform: "uppercase" }}>Email Marketing</p>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Own Your Audience With Email</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 16px" }}>
                        Hashtags help you get discovered on social platforms, but you do not own that audience. Algorithm changes, platform shifts, and shadow bans can wipe out your reach overnight. Email is the only channel you control end to end — every subscriber is someone you can reach directly, anytime.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 20px" }}>
                        If you are building your email list (and you should be),{" "}
                        <a
                            href="https://www.aweber.com/easy-email.htm?id=502593"
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            style={affiliateLink}
                        >
                            AWeber
                        </a>{" "}
                        is the platform I recommend. Drag-and-drop builder, automations, smart split testing, landing pages, and a free plan up to 500 subscribers. Use hashtags to grow your social reach, then use email to keep that audience long term.
                    </p>
                    <a
                        href="https://www.aweber.com/easy-email.htm?id=502593"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "11px 22px",
                            borderRadius: 10,
                            background: "rgba(52,211,153,0.12)",
                            border: "1px solid rgba(52,211,153,0.3)",
                            color: "#34d399",
                            fontWeight: 700,
                            fontSize: 14,
                            textDecoration: "none",
                        }}
                    >
                        Try AWeber Free {"→"}
                    </a>
                </div>

                {/* AI search / AdvertsGPT section */}
                <div style={{ padding: "28px 32px", borderRadius: 20, border: "1px solid rgba(225,48,108,0.2)", background: "rgba(225,48,108,0.04)", marginBottom: 40 }}>
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", color: "#f9a8d4", margin: "0 0 12px", textTransform: "uppercase" }}>AI Search Visibility</p>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Your Content Needs AI Visibility Too</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 16px" }}>
                        Social media is one discovery channel — AI search engines are another. More people are finding content through ChatGPT, Perplexity, Gemini, and Claude every month. If your social content or landing pages are not structured for AI extraction, you are missing a growing traffic source.
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 20px" }}>
                        To check whether your content is being found and cited by AI search engines,{" "}
                        <a
                            href="https://advertsgpt.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#f9a8d4", fontWeight: 700, textDecoration: "none" }}
                        >
                            AdvertiseGPT
                        </a>{" "}
                        scores your visibility across 10 AI models in 60 seconds and shows you exactly where you are missing coverage.
                    </p>
                    <a
                        href="https://advertsgpt.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "11px 22px",
                            borderRadius: 10,
                            background: "rgba(225,48,108,0.12)",
                            border: "1px solid rgba(225,48,108,0.3)",
                            color: "#f9a8d4",
                            fontWeight: 700,
                            fontSize: 14,
                            textDecoration: "none",
                        }}
                    >
                        Check Your AI Score Free {"→"}
                    </a>
                </div>

                {/* FAQ */}
                <h2 style={{ fontSize: 26, fontWeight: 800, color: "white", margin: "0 0 24px", letterSpacing: "-0.02em" }}>Frequently Asked Questions</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
                    {FAQS.map(({ question, answer }) => (
                        <div key={question} style={sectionCard}>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: "white", margin: "0 0 10px" }}>{question}</h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{answer}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ padding: "32px", borderRadius: 20, border: "1px solid rgba(225,48,108,0.2)", background: "rgba(225,48,108,0.06)", textAlign: "center", marginBottom: 48 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Generate Your Hashtag Set — Free</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: "0 0 20px", lineHeight: 1.6 }}>No signup. No paywall. AI-powered three-tier sets for Instagram, TikTok, LinkedIn, X, and YouTube. Build your perfect mix in 10 seconds.</p>
                    <Link
                        href="/tools/hashtag-generator"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "13px 28px",
                            borderRadius: 12,
                            background: "linear-gradient(135deg, #E1306C, #bc1888)",
                            color: "white",
                            fontWeight: 800,
                            fontSize: 15,
                            textDecoration: "none",
                            boxShadow: "0 8px 24px rgba(225,48,108,0.3)",
                        }}
                    >
                        Use the Hashtag Generator Free {"→"}
                    </Link>
                </div>

                {/* Back to blog */}
                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 600 }}>
                    <ArrowLeft size={15} />
                    Back to Blog
                </Link>
            </div>
        </main>
    );
}