import Link from "next/link";
import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

const SLUG = "lost-youtube-monetization-adsense-invalid-traffic";
const TITLE = "I Lost YouTube Monetization After Watching My Own Video";
const DESC =
  "My 28,864-subscriber YouTube channel lost monetization overnight: AdSense disabled for invalid traffic, appeal rejected. Here is the timeline, the numbers, Google's emails and what I'm doing next.";

export const metadata: Metadata = {
  title: `${TITLE} (AdSense Invalid Traffic)`,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "article",
    publishedTime: "2026-11-02",
    url: `https://toolstack.tech/blog/${SLUG}`,
    images: [{ url: `/blog/${SLUG}/hero-banner.png`, width: 1200, height: 630, alt: "I lost YouTube monetization after watching my own video — ToolStack" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`/blog/${SLUG}/hero-banner.png`],
  },
  keywords: [
    "youtube monetization disabled",
    "adsense invalid traffic",
    "adsense disabled invalid click activity",
    "adsense appeal rejected",
    "youtube earn panel error",
    "lost youtube monetization",
    "adsense account disabled youtube",
  ],
  robots: "index, follow",
  alternates: { canonical: `https://toolstack.tech/blog/${SLUG}` },
};

const FAQS = [
  {
    question: "Why was my YouTube monetization disabled for invalid traffic?",
    answer: "Google rarely says. The YouTube Earn panel only tells you the AdSense account was disabled for invalid click activity or other policy reasons, and the AdSense emails say the same thing in general terms. Common triggers include clicking your own ads, a household or shared network repeatedly clicking, click farms or bot traffic, and incentivised clicks.",
  },
  {
    question: "Can watching your own video cause invalid traffic?",
    answer: "Watching your own video is not itself a violation, but clicking ads on your own content is. I watched my own upload on my own network the night before my account was disabled and I don't know whether I clicked an ad. That is my strongest suspicion, not a proven cause, because Google does not disclose what it detected.",
  },
  {
    question: "Does Google tell you which clicks were invalid?",
    answer: "No. In my case the appeal rejection said the account could not be reinstated, with no click data, dates or sources. Google keeps its detection signals private, so creators are left guessing.",
  },
  {
    question: "How long does an AdSense invalid traffic appeal take?",
    answer: "Mine was submitted over the weekend of October 10 to 12 and rejected at 12:04 AM on Tuesday, October 13. Expect a few days, and expect a templated reply.",
  },
  {
    question: "Can I open a new AdSense account after being disabled?",
    answer: "Google's rejection email said I may not create new accounts and am not eligible for further participation in its publisher programs. Check the email you received and the AdSense program policies before trying anything, because evading a ban can make things worse.",
  },
  {
    question: "Does the channel itself get deleted?",
    answer: "No. My channel, videos and audience are all still there. Only monetization, the ability to earn ad revenue through AdSense, was removed.",
  },
  {
    question: "How can I protect my AdSense account as a YouTube creator?",
    answer: "Never click your own ads, tell family and housemates not to, avoid watching your own videos while logged in on the same network where you can accidentally click, watch for odd traffic spikes in YouTube Studio, and consider using a private window or a different account to review your own content.",
  },
];

const accent = "#f87171";
const accentBg = "rgba(239,68,68,0.06)";
const accentBorder = "rgba(239,68,68,0.2)";

const h2Style: React.CSSProperties = { fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: "52px 0 16px", lineHeight: 1.2 };
const pStyle: React.CSSProperties = { margin: "0 0 22px" };
const imgStyle: React.CSSProperties = { width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0 8px", border: "1px solid rgba(255,255,255,0.08)" };
const capStyle: React.CSSProperties = { fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 32px" };
const linkStyle: React.CSSProperties = { color: "#10b981", textDecoration: "underline" };
const quoteStyle: React.CSSProperties = { borderLeft: `3px solid ${accent}`, background: "rgba(255,255,255,0.04)", padding: "16px 20px", margin: "0 0 24px", borderRadius: "0 8px 8px 0", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.85)" };

const TRAFFIC = [
  { source: "Browse features", pct: "95.0%", views: "54,312" },
  { source: "Suggested videos", pct: "2.2%", views: "1,246" },
  { source: "Direct or unknown", pct: "1.1%", views: "649" },
];

export default function LostYouTubeMonetizationPage() {
  return (
    <>
      <ArticleSchema
        url={`https://toolstack.tech/blog/${SLUG}`}
        headline={TITLE}
        description={DESC}
        datePublished="2026-11-02"
        dateModified="2026-11-02"
        authorName="Justin Pirrie"
        authorEmail="justinmakemoneyonline@gmail.com"
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 12, display: "flex", gap: 6, alignItems: "center" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/blog" style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Blog</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>Lost YouTube Monetization</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ background: "rgba(239,68,68,0.15)", color: accent, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 4 }}>
            YouTube
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>November 2, 2026</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>· 8 min read</span>
        </div>

        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 24px" }}>
          I Lost YouTube Monetization After Watching My Own Video
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <img src={`/blog/${SLUG}/author-avatar.jpg`} alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>Founder, ToolStack · November 2, 2026</p>
          </div>
        </div>

        <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
          <img src={`/blog/${SLUG}/hero-banner.png`} alt="I lost YouTube monetization after watching my own video — 28,864 subscribers, 5.4M views, AdSense disabled" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
        <p style={{ ...pStyle, fontSize: 17, lineHeight: 1.7 }}>
          <strong>On Saturday, October 10, 2026, Google disabled the AdSense account behind my YouTube channel for &ldquo;invalid traffic,&rdquo; and on October 13 it rejected my appeal.</strong> The channel, Forgotten Towns, has 28,864 subscribers and 5.4 million views in the last year. It is still online. It just can&rsquo;t earn anything.
        </p>
        <p style={{ ...pStyle, fontSize: 17, lineHeight: 1.7 }}>
          Google won&rsquo;t say what it detected. The only unusual thing I did in that window was watch my own newest video on my own network the night before. I don&rsquo;t know whether I clicked an ad. Here is the full timeline, the real numbers, Google&rsquo;s exact words, and what I&rsquo;m doing about it.
        </p>

        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "20px 24px", margin: "0 0 32px" }}>
          <p style={{ margin: "0 0 10px", fontSize: 15, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            Building on YouTube? Our free tools help you title, tag and plan videos.
          </p>
          <Link href="/tools" style={{ display: "inline-block", background: "#047857", color: "white", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, textDecoration: "none" }}>
            Browse free ToolStack tools &rarr;
          </Link>
        </div>

        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: "24px 28px", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accent, margin: "0 0 12px" }}>Key Takeaways</p>
          <ul style={{ margin: 0, padding: "0 0 0 20px", color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.8 }}>
            <li>AdSense was disabled the morning after I watched my own video; the appeal was rejected three days later.</li>
            <li>Google gave no click data, dates or sources, so the cause is my suspicion, not a proven fact.</li>
            <li>The rejection says no further payments and no new accounts. The channel itself remains.</li>
            <li>Creators have almost no way to prove innocence against &ldquo;invalid traffic&rdquo; claims.</li>
          </ul>
        </div>

        <AdBlock type="horizontal" />

        <h2 style={h2Style}>What happened</h2>
        <p style={pStyle}>
          I opened YouTube Studio on Saturday morning and the Earn tab was broken. Step 2, the AdSense link, showed this exact message: <strong>&ldquo;disabled for invalid click activity or other policy reasons.&rdquo;</strong> Monetization was gone.
        </p>
        <img src={`/blog/${SLUG}/earn-error.png`} alt="YouTube Studio Earn panel showing the AdSense account disabled for invalid click activity or other policy reasons" style={imgStyle} />
        <p style={capStyle}>The Earn panel, Step 2. It was still showing this on October 26 and October 31.</p>
        <img src={`/blog/${SLUG}/monetization-steps.png`} alt="YouTube Partner Programme steps: Step 1 done, Step 2 errors with AdSense for YouTube account disabled for invalid click activity, Step 3 done" style={imgStyle} />
        <p style={capStyle}>The full checklist: the Partner Programme terms are accepted, and the only thing failing is the AdSense account.</p>

        <h2 style={h2Style}>The night I watched my own video</h2>
        <p style={pStyle}>
          On Friday, October 9, I posted a Virginia video, &ldquo;12 Ghost Towns in Virginia They Don&rsquo;t Want You to Find!!&rdquo; That night I watched it on my own network. I&rsquo;m in South Africa, so it was early afternoon in the US. I was watching a few YouTube videos, the autoplay landed on my own channel, and I let it play.
        </p>
        <p style={pStyle}>
          I honestly don&rsquo;t know whether I clicked an ad. It was late and I wasn&rsquo;t paying attention to that. What I do know is that the next morning the account was disabled. That is a correlation, and I&rsquo;m treating it as my main suspect rather than a verdict. Google has not told me otherwise, or told me anything at all.
        </p>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, margin: "32px 0", borderRadius: 12, overflow: "hidden" }}>
          <iframe src="https://www.youtube.com/embed/jMcmN1K983I" title="12 Ghost Towns in Virginia They Don't Want You to Find" loading="lazy" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        </div>
        <p style={pStyle}>
          One thing complicates the neat story: that Virginia video had earned about $0.12 on 57,000 views when I checked. So if my own viewing triggered something, it was probably a flag on the account rather than on that video&rsquo;s revenue.
        </p>

        <h2 style={h2Style}>What the analytics show</h2>
        <p style={pStyle}>
          If bots had flooded the channel I would expect a strange traffic source. I don&rsquo;t see one. Over 365 days the channel has 5,403,783 views, an 8:16 average view duration and about $32.9K in YouTube&rsquo;s estimated revenue. In the last 28 days, estimated revenue was roughly $397, about $803 below usual, since the shutoff.
        </p>
        <img src={`/blog/${SLUG}/365-days.png`} alt="YouTube Studio 365-day analytics: 5.4 million views, 8:16 average view duration, $32.9K estimated revenue" style={imgStyle} />
        <p style={capStyle}>365 days: 5,403,783 views and $32,925.58 estimated revenue.</p>

        <p style={pStyle}>Traffic to the Virginia video since it was published (57,171 views):</p>
        <div style={{ overflowX: "auto", margin: "0 0 24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
            <thead>
              <tr>
                {["Traffic source", "Share", "Views"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.15)", color: "white" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRAFFIC.map((r) => (
                <tr key={r.source}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{r.source}</td>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{r.pct}</td>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{r.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <img src={`/blog/${SLUG}/virginia-traffic.png`} alt="Traffic sources for the Virginia ghost towns video since publish" style={imgStyle} />
        <p style={capStyle}>Almost all of it is YouTube&rsquo;s own Browse feature, the home page recommendations.</p>

        <img src={`/blog/${SLUG}/traffic-28-days.png`} alt="Channel traffic sources over the last 28 days: Browse features 74.9 percent" style={imgStyle} />
        <p style={capStyle}>Last 28 days: Browse features 74.9%, Direct or unknown 1.8%, Shorts feed 1.1%.</p>
        <img src={`/blog/${SLUG}/geography.png`} alt="Channel geography: 95.3 percent of views from the United States" style={imgStyle} />
        <p style={capStyle}>95.3% of views come from the United States.</p>

        <p style={pStyle}>
          None of that proves nothing was wrong, and I can&rsquo;t see AdSense&rsquo;s side of the data. But the audience looks like the audience the channel is built for: American viewers finding ghost-town videos through YouTube&rsquo;s recommendations.
        </p>

        <h2 style={h2Style}>What the emails do and don&rsquo;t tell you</h2>
        <p style={pStyle}>
          The first email arrived the same morning. It cited &ldquo;invalid traffic, and/or other activity,&rdquo; a 30-day payment hold and a possible final payment. It offered an appeal. I appealed over the weekend. At 12:04 AM on Tuesday, October 13, adsense-adclicks@google.com replied:
        </p>
        <div style={quoteStyle}>
          &ldquo;We have confirmed that we are unable to reinstate your publisher account&hellip; your account will not receive further payments. You are not eligible for further participation in our publisher programs, and may not create new accounts.&rdquo;
        </div>
        <p style={pStyle}>
          Read that carefully for what it leaves out: no click count, no dates, no traffic source, no way to dispute a specific finding. It tells you the outcome and nothing about the evidence. For a creator whose income depends on the answer, that is the hardest part.
        </p>
        <p style={pStyle}>
          Meanwhile the YouTube side shows the same flat message, and a 90-day lock on re-applying is also a possibility I&rsquo;ve seen mentioned. Three weeks later the Earn panel still hasn&rsquo;t changed.
        </p>

        <h2 style={h2Style}>How to protect your own AdSense account</h2>
        <p style={pStyle}>
          I can&rsquo;t promise any of this would have saved me, since I don&rsquo;t know the cause. But these are the cheap precautions I wish I had taken:
        </p>
        <ul style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px", padding: "0 0 0 20px" }}>
          <li><strong>Never click your own ads</strong>, even by accident. Review your content in a logged-out or private window.</li>
          <li><strong>Brief everyone in your household.</strong> Shared networks look like one person to ad systems.</li>
          <li><strong>Don&rsquo;t autoplay into your own channel</strong> while logged in. Turn autoplay off before you browse.</li>
          <li><strong>Check Studio for traffic oddities</strong> such as sudden spikes from one country or an unfamiliar source.</li>
          <li><strong>Keep a second income stream.</strong> Email lists and your own products don&rsquo;t depend on one platform&rsquo;s opaque decision.</li>
        </ul>

        <h2 style={h2Style}>What I&rsquo;m doing next</h2>
        <p style={pStyle}>
          The channel still has 28,864 subscribers and the videos are still getting watched, so I&rsquo;m not walking away. I&rsquo;m documenting everything, looking at sponsorships, affiliate links and a digital product (the Virginia Ghost Towns Field Guide is already live), and I&rsquo;ll keep checking whether the account state changes. I&rsquo;m not going to try to dodge the ban with a new account.
        </p>
        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: "16px 20px", margin: "0 0 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accent, margin: "0 0 6px" }}>Update</p>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
            No change as of November 2, 2026. If Google restores the account or gives a real explanation, I&rsquo;ll add it here.
          </p>
        </div>
        <p style={pStyle}>
          The question I can&rsquo;t shake: if one accidental click, a family member or a malicious stranger can end a creator&rsquo;s AdSense account with no evidence shown and no human conversation, how is anyone supposed to defend against it?
        </p>

        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "24px 28px", margin: "40px 0" }}>
          <h2 style={{ ...h2Style, margin: "0 0 12px", fontSize: "clamp(18px,2.5vw,22px)" }}>Don&rsquo;t Depend on One Platform</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 16px" }}>
            An audience you own survives any account decision. Start building yours with <a href="https://www.aweber.com/easy-email.htm?id=502593" style={linkStyle}>AWeber</a> for email, and write ads and offers faster with <a href="https://advertsgpt.com" style={linkStyle}>AdvertsGPT</a>. More free creator tools are on the <Link href="/tools" style={linkStyle}>ToolStack tools page</Link>.
          </p>
          <Link href="/blog" style={{ display: "inline-block", background: "#047857", color: "white", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, textDecoration: "none" }}>
            Read more on the blog &rarr;
          </Link>
        </div>

        <div style={{ margin: "48px 0" }}>
          <h2 style={{ ...h2Style, margin: "0 0 24px" }}>Frequently Asked Questions</h2>
          {FAQS.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "16px 0" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{item.question}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>{item.answer}</p>
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />

        <div style={{ marginTop: 48 }}>
          <Link href="/blog" style={{ color: accent, fontSize: 14, fontWeight: 600, textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: 6 }}>
            &larr; Back to Blog
          </Link>
        </div>

        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: "40px 0 0", lineHeight: 1.4 }}>
          Some links on this page are affiliate links. If you purchase through these links, I may earn a commission at no extra cost to you. I only recommend products I genuinely use and trust.
        </p>
      </div>
    </>
  );
}
