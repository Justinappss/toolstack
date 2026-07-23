import Link from "next/link";
import type { Metadata } from "next";
import { ArticleSchema } from "@/components/ui/ArticleSchema";
import { AdBlock } from "@/components/AdBlock";

export const metadata: Metadata = {
  title: "How a Mortgage Calculator Works (+ How Much House You Can Afford)",
  description:
    "How a mortgage calculator works — the monthly payment formula, every input explained, a worked example, the 28/36 affordability rule, and how the term and extra payments change what you pay.",
  openGraph: {
    title: "How a Mortgage Calculator Works (+ How Much House You Can Afford)",
    description:
      "The monthly payment formula, worked examples, the 28/36 affordability rule, and how loan term and extra payments change the total cost of your mortgage.",
    type: "article",
    publishedTime: "2026-07-23",
    url: "https://toolstack.tech/blog/mortgage-calculator-guide",
    images: [
      {
        url: "/blog/mortgage-calculator-guide/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "How a Mortgage Calculator Works — ToolStack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How a Mortgage Calculator Works (+ How Much House You Can Afford)",
    description:
      "The monthly payment formula, worked examples, and the 28/36 affordability rule — everything a mortgage calculator is doing behind the scenes.",
    images: ["/blog/mortgage-calculator-guide/hero-banner.png"],
  },
  keywords: [
    "how a mortgage calculator works",
    "mortgage calculator",
    "mortgage payment formula",
    "how much house can I afford",
    "monthly mortgage payment",
    "amortization",
    "28/36 rule",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://toolstack.tech/blog/mortgage-calculator-guide",
  },
};

const FAQS = [
  {
    question: "How does a mortgage calculator work?",
    answer: "A mortgage calculator applies the standard amortization formula to your loan amount, interest rate, and term to work out a fixed monthly payment that pays the loan off exactly on schedule. Each month, part of the payment covers interest on the outstanding balance and the rest reduces the principal. Early on, most of the payment is interest; over time, more goes to principal.",
  },
  {
    question: "What is the mortgage payment formula?",
    answer: "The monthly payment formula is M = P × [ r(1 + r)^n ] / [ (1 + r)^n − 1 ], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (years × 12). The calculator solves this in a fraction of a second for any combination of inputs.",
  },
  {
    question: "How much house can I afford?",
    answer: "A common guideline is the 28/36 rule: keep your monthly housing costs at or below 28% of your gross monthly income, and your total monthly debt payments at or below 36%. For example, on a £6,000 gross monthly income, aim for a mortgage payment of around £1,680 or less. Lenders use similar ratios when deciding how much to lend.",
  },
  {
    question: "What inputs do I need for a mortgage calculator?",
    answer: "At minimum you need the loan amount (property price minus your deposit), the annual interest rate, and the term in years. Better calculators also let you add a deposit, property taxes, insurance, and extra monthly payments so the estimate reflects your true cost rather than just principal and interest.",
  },
  {
    question: "How does the loan term change my payment?",
    answer: "A longer term lowers the monthly payment but increases the total interest you pay. For a £250,000 loan at 5%, a 15-year term costs about £1,977/month but only ~£106,000 in total interest, while a 30-year term drops the payment to ~£1,342 but costs ~£233,000 in interest — more than double, for the same loan.",
  },
  {
    question: "What is an amortization schedule?",
    answer: "An amortization schedule is a month-by-month table showing how each payment splits between interest and principal, and how the balance falls to zero by the end of the term. It reveals how slowly the balance drops in the early years and why overpaying early saves the most interest.",
  },
  {
    question: "Do extra payments really save money?",
    answer: "Yes — significantly. Because interest is charged on the outstanding balance, every extra pound of principal you pay removes all the future interest that pound would have accrued. On a £250,000 mortgage at 5% over 25 years, an extra £100 a month can shorten the term by roughly three years and save tens of thousands in interest.",
  },
  {
    question: "How much deposit or down payment do I need?",
    answer: "It varies by country and lender, but a larger deposit means a smaller loan, a lower monthly payment, and often a better interest rate. In the UK, 5–10% is common for first-time buyers, while 20%+ typically unlocks the best rates and avoids extra insurance costs. Reducing the loan amount is the single biggest lever on your monthly payment after the interest rate.",
  },
  {
    question: "Does a mortgage calculator include taxes and insurance?",
    answer: "A basic calculator shows only principal and interest. Your real monthly cost usually also includes property taxes, buildings insurance, and — depending on your deposit and country — mortgage insurance. Always budget for these on top of the calculator's principal-and-interest figure so you're not caught short.",
  },
  {
    question: "Is there a free mortgage calculator?",
    answer: "Yes — ToolStack's free Mortgage Calculator shows your monthly payment, total interest, and a full amortization schedule for repayment and interest-only mortgages across 15 currencies. It runs in your browser, needs no signup, and updates instantly as you change the inputs.",
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

const TERMS = [
  { term: "15 years", payment: "£1,977", interest: "£105,874" },
  { term: "20 years", payment: "£1,650", interest: "£146,019" },
  { term: "25 years", payment: "£1,461", interest: "£188,435" },
  { term: "30 years", payment: "£1,342", interest: "£233,131" },
];

export default function MortgageCalculatorGuidePage() {
  return (
    <>
      <ArticleSchema
        url="https://toolstack.tech/blog/mortgage-calculator-guide"
        headline="How a Mortgage Calculator Works (+ How Much House You Can Afford)"
        description="How a mortgage calculator works — the monthly payment formula, a worked example, the 28/36 affordability rule, and how loan term and extra payments change the total cost."
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
          <span style={{ color: "rgba(255,255,255,0.65)" }}>How a Mortgage Calculator Works</span>
        </div>

        {/* Tag pill + date + read time */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ background: "rgba(251,191,36,0.15)", color: accent, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 4 }}>
            Finance
          </span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>July 23, 2026</span>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>· 8 min read</span>
        </div>

        {/* H1 */}
        <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 24px" }}>
          How a Mortgage Calculator Works (+ How Much House You Can Afford)
        </h1>

        {/* Author row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <img src="/blog/mortgage-calculator-guide/author-avatar.jpg" alt="Justin Pirrie" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: 0 }}>Justin Pirrie</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>Founder, ToolStack · July 23, 2026</p>
          </div>
        </div>

        {/* Hero banner */}
        <div style={{ margin: "0 0 40px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
          <img
            src="/blog/mortgage-calculator-guide/hero-banner.png"
            alt="How a Mortgage Calculator Works — the monthly payment formula explained"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 120px" }}>
        {/* Direct answer paragraph */}
        <p style={{ ...pStyle, fontSize: 17, lineHeight: 1.7 }}>
          <strong>A mortgage calculator works by applying the amortization formula M = P[r(1 + r)&#8319;] / [(1 + r)&#8319; &minus; 1] to your loan amount, interest rate, and term, producing a fixed monthly payment that clears the loan exactly on schedule.</strong> Every month, part of that payment covers interest on the balance and the rest chips away at the principal &mdash; heavily weighted to interest at the start, and to principal by the end.
        </p>
        <p style={{ ...pStyle, fontSize: 17, lineHeight: 1.7 }}>
          Understanding what the calculator is doing helps you make the two decisions that matter most: <strong>how much to borrow</strong> and <strong>how long to borrow it for</strong>. This guide walks through the formula, every input, a full worked example, and the simple affordability rule lenders actually use.
        </p>

        {/* Inline CTA (green 10b981) */}
        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "20px 24px", margin: "0 0 32px" }}>
          <p style={{ margin: "0 0 10px", fontSize: 15, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
            See your monthly payment and full amortization schedule in seconds.
          </p>
          <Link
            href="/tools/mortgage-calculator"
            style={{ display: "inline-block", background: "#10b981", color: "white", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, textDecoration: "none" }}
          >
            Open the free Mortgage Calculator &rarr;
          </Link>
        </div>

        {/* Key Takeaways */}
        <div style={{ background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: 12, padding: "24px 28px", marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accent, margin: "0 0 12px" }}>Key Takeaways</p>
          <ul style={{ margin: 0, padding: "0 0 0 20px", color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.8 }}>
            <li>The payment formula is M = P[r(1+r)&#8319;] / [(1+r)&#8319; &minus; 1] &mdash; loan amount, monthly rate, and number of payments.</li>
            <li>A longer term lowers the monthly payment but sharply raises total interest.</li>
            <li>The 28/36 rule is a quick affordability check: housing &le; 28% of gross income, all debt &le; 36%.</li>
            <li>Overpaying early removes future interest and can cut years off the loan.</li>
          </ul>
        </div>

        <AdBlock type="horizontal" />

        {/* Section 1 */}
        <h2 style={h2Style}>What a Mortgage Calculator Actually Does</h2>
        <p style={pStyle}>
          A mortgage calculator turns three numbers &mdash; how much you borrow, the interest rate, and the term &mdash; into one fixed monthly payment. It solves for the payment that pays off the whole loan, plus interest, in equal instalments over the term. This process is called <strong>amortization</strong>.
        </p>
        <p style={pStyle}>
          The clever part is how each payment is split. Interest is always charged on the <em>remaining</em> balance, so in month one &mdash; when the balance is highest &mdash; most of your payment is interest. As the balance falls, the interest portion shrinks and more of each payment goes to principal. That&rsquo;s why the balance barely moves in the early years and then falls quickly near the end.
        </p>

        {/* Section 2 */}
        <h2 style={h2Style}>The Mortgage Payment Formula</h2>
        <p style={pStyle}>
          Every mortgage calculator is solving this one equation:
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", margin: "0 0 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: accent, margin: 0, letterSpacing: "0.02em" }}>
            M = P &times; [ r(1 + r)<sup style={{ fontSize: 13 }}>n</sup> ] / [ (1 + r)<sup style={{ fontSize: 13 }}>n</sup> &minus; 1 ]
          </p>
        </div>
        <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px", padding: "0 0 0 20px" }}>
          <li><strong>M</strong> = the monthly payment</li>
          <li><strong>P</strong> = the principal (property price minus your deposit)</li>
          <li><strong>r</strong> = the monthly interest rate (annual rate &divide; 12, as a decimal)</li>
          <li><strong>n</strong> = the total number of monthly payments (years &times; 12)</li>
        </ul>
        <p style={pStyle}>
          You never need to work this out by hand &mdash; that&rsquo;s the calculator&rsquo;s job &mdash; but knowing the shape of it explains why small rate changes move your payment so much: the rate appears three times, including inside an exponent.
        </p>

        {/* Section 3 */}
        <h2 style={h2Style}>Worked Example: £250,000 at 5% Over 25 Years</h2>
        <p style={pStyle}>
          Suppose you borrow £250,000 at a 5% annual rate over 25 years. Convert the inputs first: the monthly rate is 0.05 &divide; 12 = 0.004167, and the number of payments is 25 &times; 12 = 300.
        </p>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", margin: "0 0 24px" }}>
          <p style={{ fontFamily: "monospace", fontSize: 16, color: "rgba(255,255,255,0.9)", margin: 0, lineHeight: 1.7 }}>
            P = £250,000<br />
            r = 0.004167 (5% &divide; 12)<br />
            n = 300 (25 &times; 12)<br /><br />
            Monthly payment = <strong style={{ color: accent, fontSize: 18 }}>£1,461</strong><br />
            Total paid = £1,461 &times; 300 = £438,435<br />
            Total interest = <strong style={{ color: accent }}>£188,435</strong>
          </p>
        </div>
        <p style={pStyle}>
          Over 25 years you repay the £250,000 you borrowed <em>plus</em> £188,435 in interest &mdash; roughly three-quarters of the loan again. That figure is exactly why the term you choose matters so much.
        </p>

        {/* Section 4 */}
        <h2 style={h2Style}>How the Term Changes Everything</h2>
        <p style={pStyle}>
          A longer term spreads the same loan over more payments, so each one is smaller &mdash; but you pay interest for far longer. Here&rsquo;s the same £250,000 at 5% across four common terms:
        </p>
        <div style={{ overflowX: "auto", margin: "0 0 32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, color: accent }}>Term</th>
                <th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 700, color: accent }}>Monthly payment</th>
                <th style={{ textAlign: "right", padding: "10px 12px", fontWeight: 700, color: accent }}>Total interest</th>
              </tr>
            </thead>
            <tbody>
              {TERMS.map((t, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: "10px 12px" }}>{t.term}</td>
                  <td style={{ textAlign: "right", padding: "10px 12px", fontWeight: 600, color: "white" }}>{t.payment}</td>
                  <td style={{ textAlign: "right", padding: "10px 12px" }}>{t.interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={pStyle}>
          Going from 30 years to 15 more than doubles nothing about the loan &mdash; the £250,000 is identical &mdash; yet it saves about £127,000 in interest. The trade-off is a payment that&rsquo;s roughly £635 higher each month. A good mortgage calculator lets you slide the term back and forth to find the balance you can actually afford.
        </p>

        {/* Section 5 */}
        <h2 style={h2Style}>How Much House Can You Afford? The 28/36 Rule</h2>
        <p style={pStyle}>
          Before you fall in love with a listing, work out what you can comfortably carry. Lenders and financial planners lean on the <strong>28/36 rule</strong>:
        </p>
        <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px", padding: "0 0 0 20px" }}>
          <li><strong>28% &mdash; the front-end ratio:</strong> your monthly housing costs (mortgage, taxes, insurance) should stay at or below 28% of your gross monthly income.</li>
          <li><strong>36% &mdash; the back-end ratio:</strong> all your monthly debt payments combined (housing plus loans, cards, car finance) should stay at or below 36%.</li>
        </ul>
        <p style={pStyle}>
          On a £6,000 gross monthly income, that&rsquo;s about £1,680 for housing and £2,160 for total debt. Plug a payment near your 28% ceiling into the calculator, then work backwards to the loan amount &mdash; that&rsquo;s a realistic budget, not a bank&rsquo;s maximum.
        </p>

        {/* Section 6 */}
        <h2 style={h2Style}>Why Extra Payments Are So Powerful</h2>
        <p style={pStyle}>
          Because interest is charged on the outstanding balance, every extra pound of principal you pay wipes out all the future interest that pound would have generated. Overpaying early &mdash; when the balance and interest are highest &mdash; has the biggest effect.
        </p>
        <p style={pStyle}>
          On our £250,000 mortgage at 5% over 25 years, adding just £100 a month can shorten the term by roughly three years and save tens of thousands in interest. Use the calculator&rsquo;s extra-payment field to test it: even small, consistent overpayments quietly rewrite the amortization schedule in your favour.
        </p>

        {/* Section 7 */}
        <h2 style={h2Style}>What the Calculator Doesn&rsquo;t Show</h2>
        <p style={pStyle}>
          A basic mortgage calculator gives you principal and interest &mdash; the loan itself. Your real monthly outgoing is usually higher once you add:
        </p>
        <ul style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px", padding: "0 0 0 20px" }}>
          <li><strong>Property taxes</strong> (council tax in the UK, property tax in the US)</li>
          <li><strong>Buildings and contents insurance</strong></li>
          <li><strong>Mortgage insurance</strong> if your deposit is small (e.g. US PMI)</li>
          <li><strong>Service charges or ground rent</strong> on leasehold or condo properties</li>
        </ul>
        <p style={pStyle}>
          Always budget for these on top of the calculator&rsquo;s figure. The principal-and-interest number tells you what the <em>loan</em> costs; these extras tell you what the <em>home</em> costs.
        </p>

        {/* Conclusion CTA (green 10b981 + AdvertsGPT + affiliate) */}
        <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.04))", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 12, padding: "24px 28px", margin: "40px 0" }}>
          <h2 style={{ ...h2Style, margin: "0 0 12px", fontSize: "clamp(18px,2.5vw,22px)" }}>Run the Numbers on Your Own Mortgage</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, margin: "0 0 16px" }}>
            Play with the loan amount, rate, and term and watch the monthly payment and total interest update live. Our free <Link href="/tools/mortgage-calculator" style={{ color: "#10b981", fontWeight: 600, textDecoration: "underline" }}>mortgage calculator</Link> includes a full amortization schedule for repayment and interest-only mortgages in 15 currencies &mdash; no signup, no email.
          </p>
          <Link
            href="/tools/mortgage-calculator"
            style={{ display: "inline-block", background: "#10b981", color: "white", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 8, textDecoration: "none" }}
          >
            Try It Free &rarr;
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "16px 0 0", lineHeight: 1.5 }}>
            Building a property or finance brand? Grow your audience with <a href="https://www.aweber.com/easy-email.htm?id=502593" style={{ color: "#10b981", textDecoration: "underline" }}>AWeber</a> for email marketing, and spin up high-converting ad copy in seconds with <a href="https://advertsgpt.com" style={{ color: "#10b981", textDecoration: "underline" }}>AdvertsGPT</a>.
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
          Some links on this page are affiliate links. If you purchase through these links, I may earn a commission at no extra cost to you. I only recommend products I genuinely use and trust. This article is general information, not financial advice.
        </p>
      </div>
    </>
  );
}
