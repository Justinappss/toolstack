import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Age Calculator — Exact Age in Years, Months & Days | Free",
    description: "Calculate your exact age in years, months, days, hours and minutes. Find days until your next birthday, your zodiac sign, generation, and more. Free, instant, no signup.",
    keywords: [
        "age calculator",
        "how old am i",
        "age calculator in years months days",
        "exact age calculator",
        "birthday calculator",
        "days until birthday",
        "age in days calculator",
        "date of birth calculator",
        "zodiac sign calculator",
        "generation calculator",
    ],
    alternates: {
        canonical: "https://toolstack.tech/tools/age-calculator",
    },
    openGraph: {
        title: "Age Calculator — Exact Age in Years, Months & Days",
        description: "Calculate your exact age instantly. Get years, months, days, hours, zodiac sign, generation, and days until your next birthday.",
        url: "https://toolstack.tech/tools/age-calculator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Age Calculator — Free, Instant",
        description: "Calculate your exact age in years, months, days and hours. Zodiac sign, generation, days to birthday. No signup.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
