import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compound Interest Calculator — See Your Investment Grow",
    description: "Calculate compound interest with monthly contributions. See your final balance, total interest earned and year-by-year growth. Free, instant, no signup.",
    keywords: [
        "compound interest calculator",
        "investment calculator",
        "savings calculator",
        "compound interest formula",
        "interest calculator",
        "investment growth calculator",
        "savings growth calculator",
        "compound growth calculator",
        "financial calculator",
        "money growth calculator",
    ],
    alternates: { canonical: "https://toolstack.tech/tools/compound-interest-calculator" },
    openGraph: {
        title: "Compound Interest Calculator — See Your Investment Grow",
        description: "Calculate compound interest with monthly contributions. See final balance, total interest, and year-by-year growth. Free.",
        url: "https://toolstack.tech/tools/compound-interest-calculator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Compound Interest Calculator — See Your Investment Grow",
        description: "Free compound interest calculator with monthly contributions, year-by-year breakdown, and Rule of 72.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
