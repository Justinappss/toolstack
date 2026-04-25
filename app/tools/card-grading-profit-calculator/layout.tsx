import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Card Grading Profit Calculator — PSA, BGS, SGC & CSG ROI",
    description: "Calculate your profit after grading trading cards with PSA, BGS, SGC or CSG. See grading fees, eBay selling costs, net payout and ROI in seconds. Free.",
    keywords: [
        "card grading profit calculator",
        "PSA grading calculator",
        "BGS grading calculator",
        "card grading ROI",
        "is it worth grading cards",
        "PSA grading fees 2024",
        "trading card profit calculator",
        "card grading cost calculator",
        "sports card grading calculator",
        "SGC grading fees",
    ],
    alternates: { canonical: "https://toolstack.tech/tools/card-grading-profit-calculator" },
    openGraph: {
        title: "Card Grading Profit Calculator — PSA, BGS, SGC & CSG ROI",
        description: "Is grading your card worth it? Calculate fees, eBay costs and net profit for PSA, BGS, SGC and CSG instantly. Free.",
        url: "https://toolstack.tech/tools/card-grading-profit-calculator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Card Grading Profit Calculator — PSA, BGS, SGC & CSG ROI",
        description: "Calculate whether grading your trading card is profitable. Compare PSA, BGS, SGC and CSG fees instantly.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
