import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Card Box Break Calculator",
    description: "Calculate the break-even price per spot for any card box break. Enter box cost, spots, platform (Whatnot, eBay, local) and see profit across 50%, 75% and 100% fill rates. Free, instant, multi-currency.",
    alternates: { canonical: "https://toolstack.tech/tools/card-box-break-calculator" },
    openGraph: {
        title: "Card Box Break Calculator — Price Your Spots Profitably",
        description: "Calculate break-even price per spot for Whatnot and eBay card breaks. Multi-currency support for USD, GBP, EUR, AUD and CAD.",
        url: "https://toolstack.tech/tools/card-box-break-calculator",
        type: "website",
    },
    twitter: { card: "summary_large_image" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
