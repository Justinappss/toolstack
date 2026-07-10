import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Pricing } from "../Pricing";

const PRIMARY = "#6C5CE7";
const INK = "#16131F";
const ACCENT = "#F4B740";

export const metadata: Metadata = {
  title: "Pricing — ToolStack Design Studio",
  description:
    "Pro, on-brand ads for your business — no designer, no agency. Start free, use it monthly from $29, or own the whole system outright. See plans.",
  alternates: { canonical: "https://toolstack.tech/tools/jdesigns-studio/pricing" },
  openGraph: {
    type: "website",
    title: "ToolStack Design Studio — Pricing",
    description: "Start free, use it monthly, or own the whole system. On-brand ads, no designer required.",
    url: "https://toolstack.tech/tools/jdesigns-studio/pricing",
    siteName: "ToolStack",
    images: [
      {
        url: "https://toolstack.tech/jdesigns-studio-og.jpg",
        width: 1200,
        height: 630,
        alt: "ToolStack Design Studio — paste a URL, get 3 campaigns of finished on-brand ads",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolStack Design Studio — Pricing",
    description: "Start free, use it monthly, or own the whole system.",
    images: ["https://toolstack.tech/jdesigns-studio-og.jpg"],
  },
};

const PRICING_FAQS = [
  {
    q: "What do I actually get?",
    a: "Finished, ready-to-post ads on your brand — real logo, colours, fonts and voice — generated from your website. Plus a Brand Book and one-click scheduling to your channels.",
  },
  {
    q: "Is it really free to start?",
    a: "Yes — you get 5 free generations to make real ads on your brand before you pay anything. No card required. After that, Studio Pass is $29/month.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Studio Pass is month-to-month — cancel whenever. The Done-For-You Campaign Manager is a one-time purchase you keep for life, no subscription.",
  },
  {
    q: "What's the difference between the two?",
    a: "Studio Pass ($29/mo) is the hosted version — we run everything, you just create. The Done-For-You Campaign Manager ($1,000 one-time) is your own system to keep: you bring your own AI keys, so it's unlimited at the lowest cost with no monthly fee. Great if you're a heavy user or want to white-label it.",
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: "linear-gradient(160deg,#EEF1FF 0%,#F4F1FF 45%,#FBF6FF 100%)", minHeight: "100vh" }}>
      {/* nav */}
      <nav style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/tools/jdesigns-studio" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: INK }}>
          <span style={{ width: 36, height: 36, borderRadius: 10, background: INK, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Newsreader',Georgia,serif", fontWeight: 800, fontSize: 19 }}>D</span>
          <span style={{ fontFamily: "'Newsreader',Georgia,serif", fontWeight: 800, fontSize: 18 }}>ToolStack Design Studio</span>
        </Link>
        <Link
          href="/tools/jdesigns-studio"
          style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 42, padding: "0 18px", borderRadius: 11, background: PRIMARY, color: "#fff", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: `0 10px 24px -10px ${PRIMARY}` }}
        >
          Try it free <ArrowRight size={16} />
        </Link>
      </nav>

      {/* hero */}
      <header style={{ maxWidth: 760, margin: "0 auto", padding: "30px 20px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".18em", color: PRIMARY, textTransform: "uppercase", marginBottom: 14 }}>ToolStack Design Studio</div>
        <h1 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 46, fontWeight: 800, lineHeight: 1.05, color: INK, letterSpacing: "-.01em" }}>
          On-brand ads for your business.<br />No designer. No agency.
        </h1>
        <p style={{ fontSize: 17, color: "#5C5648", marginTop: 16, lineHeight: 1.55 }}>
          Paste your website and get finished, ready-to-post ads with your real logo, colours and voice — in minutes. Pick the level that fits you.
        </p>
        <Link
          href="/tools/jdesigns-studio"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 52, padding: "0 26px", borderRadius: 13, background: INK, color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none", marginTop: 22, boxShadow: "0 14px 30px -12px rgba(22,19,31,.5)" }}
        >
          Generate a free sample <ArrowRight size={18} />
        </Link>
      </header>

      <div style={{ marginTop: 18 }}>
        <Pricing primary={PRIMARY} ink={INK} accent={ACCENT} />
      </div>

      {/* pricing FAQ */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "8px 20px 56px" }}>
        <h2 style={{ fontFamily: "'Newsreader',Georgia,serif", fontSize: 26, fontWeight: 800, color: INK, marginBottom: 14, textAlign: "center" }}>Questions</h2>
        {PRICING_FAQS.map((f, i) => (
          <details key={i} style={{ borderBottom: "1px solid #E4DEEF", padding: "15px 4px" }}>
            <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: 15.5, color: INK }}>{f.q}</summary>
            <p style={{ marginTop: 9, color: "#5C5648", fontSize: 14.5, lineHeight: 1.6 }}>{f.a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
