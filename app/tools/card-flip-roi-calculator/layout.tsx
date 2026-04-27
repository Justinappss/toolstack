import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Flip ROI Calculator — Free Sports Card Profit Tool 2026",
  description: "Calculate exact profit and ROI on any card flip. eBay fees, Whatnot, shipping costs built in. Free platform comparison — see your real take-home instantly.",
  keywords: [
    "card flip ROI calculator",
    "sports card profit calculator",
    "eBay card flip profit",
    "trading card ROI calculator",
    "sports card selling fees calculator",
    "eBay sports card fee calculator 2026",
    "card reseller profit tool",
    "how much do I make selling cards on eBay",
    "sports card flip calculator",
    "trading card profit margin",
  ],
  alternates: { canonical: "https://toolstack.tech/tools/card-flip-roi-calculator" },
  openGraph: {
    title: "Card Flip ROI Calculator — Free Sports Card Profit Tool",
    description: "See your real profit and ROI on every card flip. eBay fees, shipping, platform comparison built in.",
    url: "https://toolstack.tech/tools/card-flip-roi-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Card Flip ROI Calculator — Free Sports Card Profit Tool",
    description: "Calculate exact profit after eBay fees and shipping on any card flip. Free tool.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
