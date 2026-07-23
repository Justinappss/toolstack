import Link from "next/link";
import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
  title: "How to Calculate VAT: Adding & Removing VAT Explained (2026)",
  description:
    "Learn how to calculate VAT the right way — add VAT to a net price, remove VAT from a gross price, and avoid the mistake everyone makes. Formulas, worked examples, and rates by country.",
  openGraph: {
    title: "How to Calculate VAT: Adding & Removing VAT Explained (2026)",
    description:
      "How to add and remove VAT with the correct formulas, worked examples in plain English, and standard VAT rates for the UK, EU, UAE and more.",
    type: "article",
    publishedTime: "2026-07-23",
    url: "https://toolstack.tech/blog/vat-calculator-guide",
    images: [
      {
        url: "/blog/vat-calculator-guide/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "How to Calculate VAT — Adding & Removing VAT Explained — ToolStack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate VAT: Adding & Removing VAT Explained (2026)",
    description:
      "The right way to add and remove VAT — formulas, worked examples, and the one mistake almost everyone makes when removing VAT from a gross price.",
    images: ["/blog/vat-calculator-guide/hero-banner.png"],
  },
  keywords: [
    "how to calculate vat",
    "vat calculator",
    "add vat",
    "remove vat",
    "vat formula",
    "how to work out vat",
    "reverse vat calculation",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://toolstack.tech/blog/vat-calculator-guide",
  },
};

const FAQS = [
  {
    question: "How do I calculate VAT on a price?",
    answer: "To add VAT to a net (VAT-exclusive) price, multiply the price by 1 plus the VAT rate as a decimal. At 20% VAT, multiply by 1.20. So £250 net becomes £250 × 1.20 = £300 gross, and the VAT itself is £50. To find just the VAT amount, multiply the net price by the rate: £250 × 0.20 = £50.",
  },
  {
    question: "How do I remove VAT from a gross price?",
    answer: "Divide the gross (VAT-inclusive) price by 1 plus the VAT rate. At 20%, divide by 1.20. So a £300 gross price becomes £300 ÷ 1.20 = £250 net, and the VAT is £300 − £250 = £50. Do NOT simply subtract 20% of the gross price — that gives the wrong answer (£60 instead of £50).",
  },
  {
    question: "What is the most common VAT calculation mistake?",
    answer: "Removing VAT by subtracting the rate directly from the gross price. Taking 20% off a £300 gross price gives £60, but the actual VAT is £50. That's because the 20% was added to the smaller net figure (£250), not the larger gross figure. Always divide the gross price by 1.20 to reverse VAT correctly.",
  },
  {
    question: "What is the standard VAT rate in the UK?",
    answer: "The UK standard VAT rate is 20%. There is also a reduced rate of 5% (on things like domestic energy and children's car seats) and a zero rate of 0% (on most food, books, and children's clothing). Businesses must register for VAT once their taxable turnover exceeds £90,000 in a 12-month period (2024/25 threshold).",
  },
  {
    question: "How do I work out the VAT amount from a total?",
    answer: "If you have a VAT-inclusive total and want just the VAT portion at 20%, divide the total by 6. A £300 gross total ÷ 6 = £50 of VAT. This shortcut works because VAT is 20% of the net price, which is 1/6 of the 120% gross total. For other rates, use gross − (gross ÷ (1 + rate)).",
  },
  {
    question: "Is VAT calculated on the net or gross price?",
    answer: "VAT is always calculated on the net (VAT-exclusive) price — the value of the goods or service before tax. The gross price is the net price plus VAT. This is why removing VAT requires division rather than subtraction: you're working backwards from the gross figure to recover the net price the VAT was based on.",
  },
  {
    question: "Do different countries use different VAT rates?",
    answer: "Yes. VAT rates vary widely: the UK and France are 20%, Germany 19%, Ireland 23%, Italy 22%, Spain 21%, the Netherlands 21%, and the UAE 5%. Some countries call it GST instead of VAT — Australia's GST is 10% and Canada's federal GST is 5%. The calculation method is identical; only the rate changes.",
  },
  {
    question: "Can businesses reclaim the VAT they pay?",
    answer: "VAT-registered businesses can usually reclaim the VAT they pay on business purchases (input VAT) by offsetting it against the VAT they charge customers (output VAT). They pay the difference to the tax authority. This is why VAT is described as a tax on the 'value added' at each stage rather than a tax on the business itself.",
  },
  {
    question: "How do I calculate VAT at a reduced rate like 5%?",
    answer: "The method is the same — just change the multiplier. To add 5% VAT, multiply the net price by 1.05. To remove 5% VAT from a gross price, divide by 1.05. For example, £100 net at 5% is £105 gross, and £105 gross reversed is £105 ÷ 1.05 = £100 net with £5 of VAT.",
  },
  {
    question: "Is there a free VAT calculator I can use?",
    answer: "Yes — ToolStack's free VAT Calculator adds or removes VAT instantly for 40+ countries at standard and reduced rates, with an invoice calculator built in. It runs entirely in your browser, needs no signup, and shows the net price, VAT amount, and gross total side by side.",
  },
];

const accent = "#fbbf24";
const accentBg = "rgba(251,191,36,0.06)";
const accentBorder = "rgba(251,191,36,0.18)";

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

const RATES = [
  { place: "United Kingdom", rate: "20%", note: "Reduced 5%, zero-rated 0%" },
  { place: "Ireland", rate: "23%", note: "Reduced 13.5% & 9%" },
  { place: "France", rate: "20%", note: "Reduced 10%, 5.5%, 2.1%" },
  { place: "Germany", rate: "19%", note: "Reduced 7%" },
  { place: "Spain", rate: "21%", note: "Reduced 10% & 4%" },
  { place: "Italy", rate: "22%", note: "Reduced 10%, 5%, 4%" },
  { place: "Netherlands", rate: "21%", note: "Reduced 9%" },
  { place: "UAE", rate: "5%", note: "Standard rate" },
  { place: "Australia (GST)", rate: "10%", note: "Called GST" },
  { place: "Canada (GST)", rate: "5%", note: "Plus provincial PST/HST" },
];

export default function VatCalculatorGuidePage() {
  return (
    <>
      <ArticleSchema
        url="https://toolstack.tech/blog/vat-calculator-guide"
        headline="How to Calculate VAT: Adding & Removing VAT Explained (2026)"
        description="Learn how to add and remove VAT correctly — the formulas, worked examples, the mistake everyone makes when reversing VAT, and standard rates by country."
        datePublished="2026-07-23"
        dateModified="2026-07-23"
        authorName="Justin Pirrie"
        authorEmail="justinmakemoneyonline@gmail.com"
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 0" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 12, display: "flex", gap: 6, alignItems: "center" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/blog" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Blog</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>How to Calculate VAT</span>
        </div>

        {/* Tag pill + date + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ background: "rgba(251,191,36,0.15)", color: accent, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 4 }}>
            Finance
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>July 23, 2026</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>· 7 min read</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 24px" }}>
          How to Calculate VAT: Adding &amp; Removing VAT Explained
        </h1>

        {/* Author row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <img src="/blog/vat-calculator-guide/author-avatar.jpg" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>Founder, ToolStack · July 23, 2026</p>
          </div>
        </div>

        {/* Hero banner */}
        <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
          <img
            src="/blog/vat-calculator-guide/hero-banner.png"
            alt="How to Calculate VAT — Adding and Removing VAT Explained"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
        {/* Direct answer paragraph */}
        <p style={{ ...pStyle, fontSize: 17, lineHeight: 1.7 }}>
          <strong>To add VAT, multiply the net price by 1 plus the VAT rate; to remove VAT, divide the gross price by 1 plus the VAT rate.</strong> At the UK&rsquo;s standard 20% rate, that means multiplying by 1.20 to add VAT and dividing by 1.20 to strip it back out. So a £250 net price becomes £300 with VAT, and a £300 gross price reverses to £250 net &mdash; with £50 of VAT either way.
        </p>
        <p style={{ ...pStyle, fontSize: 17, lineHeight: 1.7 }}>
          It sounds simple, but there&rsquo;s one mistake almost everyone makes when <strong>removing</strong> VAT &mdash; and it quietly overstates the tax every time. This guide shows the correct formulas, walks through worked examples, and lists the standard rates for the UK, EU, UAE and beyond so you can work out VAT for any country with confidence.
        </p>

        {/* Inline CTA (green 10b981) */}
        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "20px 24px", margin: "0 0 32px" }}>
          <p style={{ margin: "0 0 10px", fontSize: 15, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            Skip the maths &mdash; add or remove VAT instantly for 40+ countries.
          </p>
          <Link
            href="/tools/vat-calculator"
            style={{ display: "inline-block", background: "#10b981", color: "white", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, textDecoration: "none" }}
          >
            Open the free VAT Calculator &rarr;
          </Link>
        </div>

        {/* Key Takeaways */}
        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: "24px 28px", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accent, margin: "0 0 12px" }}>Key Takeaways</p>
          <ul style={{ margin: 0, padding: "0 0 0 20px", color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.8 }}>
            <li><strong>Add VAT:</strong> net price &times; (1 + rate). At 20%, multiply by 1.20.</li>
            <li><strong>Remove VAT:</strong> gross price &divide; (1 + rate). At 20%, divide by 1.20 &mdash; never subtract 20%.</li>
            <li>VAT is always charged on the <em>net</em> price, which is why reversing it needs division, not subtraction.</li>
            <li>Only the rate changes between countries &mdash; the method is identical everywhere.</li>
          </ul>
        </div>

        {/* Podcast */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", margin: "0 0 8px" }}>🎙 Listen to the full podcast episode</p>
          <audio controls preload="none" style={{ width: "100%", accentColor: accent }}>
            <source src="/blog/vat-calculator-guide/podcast.m4a" type="audio/mp4" />
          </audio>
        </div>

        {/* Video */}
        <div style={{ margin: "0 0 40px" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.7)", margin: "0 0 10px" }}>🎬 Watch: VAT explained in 5 minutes</p>
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <video controls preload="none" poster="/blog/vat-calculator-guide/video-poster.jpg" style={{ width: "100%", height: "auto", display: "block", background: "#000" }}>
              <source src="/blog/vat-calculator-guide/vat-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "The Great VAT Swindle — How to Calculate VAT",
              description: "A quick, fun explainer on how to add and remove VAT correctly — including the mistake almost everyone makes when reversing VAT from a gross price.",
              thumbnailUrl: "https://toolstack.tech/blog/vat-calculator-guide/video-poster.jpg",
              uploadDate: "2026-07-23",
              duration: "PT4M50S",
              contentUrl: "https://toolstack.tech/blog/vat-calculator-guide/vat-video.mp4",
            }),
          }}
        />

        <AdBlock type="horizontal" />

        {/* Section 1 */}
        <h2 style={h2Style}>What Is VAT?</h2>
        <p style={pStyle}>
          VAT &mdash; Value Added Tax &mdash; is a consumption tax added to the price of most goods and services. It&rsquo;s collected in stages along the supply chain, but ultimately it&rsquo;s the final customer who pays it. Businesses act as collectors: they charge VAT on what they sell (output VAT) and reclaim the VAT on what they buy (input VAT), handing the difference to the tax authority.
        </p>
        <p style={pStyle}>
          Two figures matter for every calculation. The <strong>net price</strong> is the value of the goods before tax. The <strong>gross price</strong> is the net price with VAT added on top. VAT is always a percentage of the net price &mdash; that single fact is the key to calculating it correctly in both directions.
        </p>

        <img src="/blog/vat-calculator-guide/comic-net-vs-gross.jpg" alt="Net price vs gross price — VAT explained as a comic" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0", border: "1px solid rgba(255,255,255,0.08)" }} />

        {/* Section 2 */}
        <h2 style={h2Style}>How to Add VAT to a Price</h2>
        <p style={pStyle}>
          Adding VAT is the easy direction. Multiply the net price by 1 plus the VAT rate expressed as a decimal:
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", margin: "0 0 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: accent, margin: 0, letterSpacing: "0.02em" }}>
            Gross = Net &times; (1 + Rate)
          </p>
        </div>
        <p style={pStyle}>
          Say you&rsquo;re a freelancer invoicing £250 of work and you need to add 20% VAT:
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", margin: "0 0 24px" }}>
          <p style={{ fontFamily: "monospace", fontSize: 16, color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.7 }}>
            Net = £250<br />
            VAT = £250 &times; 0.20 = £50<br />
            Gross = £250 &times; 1.20 = <strong style={{ color: accent }}>£300</strong>
          </p>
        </div>
        <p style={pStyle}>
          The customer pays £300, of which £50 is VAT you&rsquo;ll pass on to the tax authority. To find just the VAT amount without the total, multiply the net price by the rate on its own (£250 &times; 0.20 = £50).
        </p>

        <img src="/blog/vat-calculator-guide/comic-add-vat.jpg" alt="Adding VAT — multiply the net price by 1.20, shown as a comic panel" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0", border: "1px solid rgba(255,255,255,0.08)" }} />

        {/* Section 3 */}
        <h2 style={h2Style}>How to Remove VAT From a Price (The Right Way)</h2>
        <p style={pStyle}>
          This is where people slip up. To remove VAT from a gross, VAT-inclusive price, you <strong>divide</strong> by 1 plus the rate &mdash; you do not subtract the rate:
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", margin: "0 0 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: accent, margin: 0, letterSpacing: "0.02em" }}>
            Net = Gross &divide; (1 + Rate)
          </p>
        </div>
        <p style={pStyle}>
          Take a £300 gross price and strip out the 20% VAT:
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", margin: "0 0 24px" }}>
          <p style={{ fontFamily: "monospace", fontSize: 16, color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.7 }}>
            Gross = £300<br />
            Net = £300 &divide; 1.20 = £250<br />
            VAT = £300 &minus; £250 = <strong style={{ color: accent }}>£50</strong>
          </p>
        </div>

        {/* The mistake callout */}
        <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, padding: "20px 24px", margin: "0 0 24px" }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f87171", margin: "0 0 8px" }}>The mistake to avoid</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.6 }}>
            Subtracting 20% of the gross price gives £300 &times; 0.20 = £60 &mdash; but the real VAT is only £50. The 20% was added to the £250 net price, not the £300 gross price, so taking 20% off the larger number always overstates the VAT. Divide by 1.20 instead.
          </p>
        </div>
        <img src="/blog/vat-calculator-guide/comic-wrong-vs-right.jpg" alt="The wrong way vs the right way to remove VAT: subtracting gives £60, dividing gives the correct £50" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0", border: "1px solid rgba(255,255,255,0.08)" }} />

        <p style={pStyle}>
          Quick shortcut for 20% VAT: to get the VAT portion of a gross total, just divide by 6 (£300 &divide; 6 = £50). That works because VAT is one-sixth of a 20%-inclusive total.
        </p>

        {/* Section 4 */}
        <h2 style={h2Style}>VAT Rates by Country (2026)</h2>
        <p style={pStyle}>
          The formulas above work anywhere &mdash; you only swap in the local rate. Some countries call it GST (Goods and Services Tax), but the maths is identical. Here are the standard rates for common jurisdictions:
        </p>
        <div style={{ overflowX: "auto", margin: "0 0 32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, color: accent }}>Country</th>
                <th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 700, color: accent }}>Standard rate</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, color: accent }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {RATES.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 12px" }}>{r.place}</td>
                  <td style={{ textAlign: "right", padding: "10px 12px", fontWeight: 600, color: "white" }}>{r.rate}</td>
                  <td style={{ padding: "10px 12px", color: "rgba(255,255,255,0.6)" }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={pStyle}>
          Rates change from time to time and many countries apply reduced rates to essentials like food, energy and children&rsquo;s items. Always confirm the current rate for your specific goods, then apply the same add/remove method. The free <Link href="/tools/vat-calculator" style={{ color: accent, textDecoration: "underline" }}>VAT calculator</Link> keeps 40+ countries&rsquo; rates on hand so you don&rsquo;t have to look them up.
        </p>

        <img src="/blog/vat-calculator-guide/comic-rates-world.jpg" alt="VAT and GST rates around the world — UK 20%, Ireland 23%, Germany 19%, UAE 5% and more" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0", border: "1px solid rgba(255,255,255,0.08)" }} />

        {/* Section 5 */}
        <h2 style={h2Style}>Worked Example: A Freelancer&rsquo;s Invoice</h2>
        <p style={pStyle}>
          Imagine you&rsquo;re a VAT-registered designer billing a client £1,200 for a project, plus £150 of stock images you bought (which already included £25 of VAT you paid). Here&rsquo;s how it flows:
        </p>
        <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px", padding: "0 0 0 20px" }}>
          <li><strong>Output VAT you charge:</strong> £1,200 &times; 0.20 = £240. Your invoice total is £1,440.</li>
          <li><strong>Input VAT you paid:</strong> £25 on the stock images, which you can reclaim.</li>
          <li><strong>VAT you owe the tax authority:</strong> £240 &minus; £25 = £215.</li>
        </ul>
        <p style={pStyle}>
          You collected £240 from the client but only hand over £215, because you offset the £25 you already paid. That&rsquo;s the &ldquo;value added&rdquo; idea in action &mdash; you only remit tax on the value <em>you</em> added, not the full sale price.
        </p>

        <img src="/blog/vat-calculator-guide/comic-value-added.jpg" alt="The value-added duel: output VAT minus input VAT is what a business remits" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12, margin: "32px 0", border: "1px solid rgba(255,255,255,0.08)" }} />

        {/* Section 6 */}
        <h2 style={h2Style}>When You Might Need to Reverse VAT</h2>
        <p style={pStyle}>
          Removing VAT from a gross figure comes up more often than you&rsquo;d think:
        </p>
        <h3 style={h3Style}>Recording expenses</h3>
        <p style={pStyle}>
          A receipt usually shows the gross total. To claim the VAT back, you need to split it into net and VAT &mdash; divide by 1.20 (or the relevant rate) to find the net, then subtract to get the reclaimable VAT.
        </p>
        <h3 style={h3Style}>Pricing a product</h3>
        <p style={pStyle}>
          If you want a shelf price of exactly £9.99 including VAT, you reverse it to find your net revenue: £9.99 &divide; 1.20 = £8.33. That&rsquo;s what you actually keep before other costs.
        </p>
        <h3 style={h3Style}>Checking an invoice</h3>
        <p style={pStyle}>
          When a supplier only quotes a VAT-inclusive total, reversing the VAT lets you confirm the net cost and that the tax was applied at the correct rate.
        </p>

        {/* Conclusion CTA (green 10b981 + AdvertsGPT + affiliate) */}
        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "24px 28px", margin: "40px 0" }}>
          <h2 style={{ ...h2Style, margin: "0 0 12px", fontSize: "clamp(18px,2.5vw,22px)" }}>Add or Remove VAT in One Click</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 16px" }}>
            Once you understand the formulas, you rarely want to do them by hand. Our free <Link href="/tools/vat-calculator" style={{ color: "#10b981", fontWeight: 600, textDecoration: "underline" }}>VAT calculator</Link> adds or removes VAT for 40+ countries at standard and reduced rates, with an invoice calculator built in &mdash; no signup, no email required.
          </p>
          <Link
            href="/tools/vat-calculator"
            style={{ display: "inline-block", background: "#10b981", color: "white", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, textDecoration: "none" }}
          >
            Try It Free &rarr;
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "16px 0 0", lineHeight: 1.5 }}>
            Running a business and want to grow it? Build your customer list with <a href="https://www.aweber.com/easy-email.htm?id=502593" style={{ color: "#10b981", textDecoration: "underline" }}>AWeber</a> for email marketing, and generate high-converting ad copy in seconds with <a href="https://advertsgpt.com" style={{ color: "#10b981", textDecoration: "underline" }}>AdvertsGPT</a>.
          </p>
        </div>

        {/* FAQ */}
        <div style={{ margin: "48px 0" }}>
          <h2 style={{ ...h2Style, margin: "0 0 24px" }}>Frequently Asked Questions</h2>
          {FAQS.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "16px 0" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 6px" }}>{item.question}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>{item.answer}</p>
            </div>
          ))}
        </div>

        {/* FAQ schema */}
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

        {/* Back to Blog */}
        <div style={{ marginTop: 48 }}>
          <Link href="/blog" style={{ color: accent, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            &larr; Back to Blog
          </Link>
        </div>

        {/* Affiliate disclosure */}
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "40px 0 0", lineHeight: 1.4 }}>
          Some links on this page are affiliate links. If you purchase through these links, I may earn a commission at no extra cost to you. I only recommend products I genuinely use and trust.
        </p>
      </div>
    </>
  );
}
