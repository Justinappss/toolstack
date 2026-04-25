import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Whatnot Seller Fee Calculator — Net Payout & Fee Breakdown",
    description: "Calculate your Whatnot seller fees instantly. See the 8% commission, 2.9% + $0.30 payment processing, net payout and compare against eBay fees. Free.",
    keywords: [
        "whatnot seller fee calculator",
        "whatnot fees",
        "whatnot commission calculator",
        "whatnot selling fees 2024",
        "whatnot vs ebay fees",
        "whatnot net payout calculator",
        "selling on whatnot fees",
        "whatnot payment processing fee",
        "whatnot trading cards fees",
        "live selling fee calculator",
    ],
    alternates: { canonical: "https://toolstack.tech/tools/whatnot-seller-fee-calculator" },
    openGraph: {
        title: "Whatnot Seller Fee Calculator — Net Payout & Fee Breakdown",
        description: "How much does Whatnot actually charge? Calculate commission, payment processing and net payout instantly. Compare vs eBay. Free.",
        url: "https://toolstack.tech/tools/whatnot-seller-fee-calculator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Whatnot Seller Fee Calculator — Net Payout & Fee Breakdown",
        description: "Free Whatnot fee calculator. Enter your sale price and category to see exact fees and net payout.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
