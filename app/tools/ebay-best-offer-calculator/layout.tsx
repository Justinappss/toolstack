import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "eBay Best Offer Calculator",
    description: "Calculate the minimum Best Offer you should accept on eBay. Enter your cost, grading fees and target ROI to instantly know if an offer is worth accepting, countering or declining. Free, multi-currency.",
    alternates: { canonical: "https://toolstack.tech/tools/ebay-best-offer-calculator" },
    openGraph: {
        title: "eBay Best Offer Calculator — Accept, Counter or Decline?",
        description: "Know your break-even offer price instantly. Enter costs, eBay fees and target ROI. See profit at every offer level. Supports USD, GBP, EUR, AUD and CAD.",
        url: "https://toolstack.tech/tools/ebay-best-offer-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
