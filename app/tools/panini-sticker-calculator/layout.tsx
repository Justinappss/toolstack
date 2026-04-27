import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Panini Sticker Album Completion Calculator — Free",
    description: "Calculate how many packs and what it costs to complete any Panini sticker album. World Cup 2026, Premier League, Champions League. Free, multi-currency.",
    keywords: ["panini sticker calculator", "panini album completion calculator", "how many packs to complete panini album", "world cup 2026 sticker cost", "panini sticker cost calculator", "premier league sticker calculator"],
    alternates: { canonical: "https://toolstack.tech/tools/panini-sticker-calculator" },
    openGraph: {
        title: "Panini Sticker Album Completion Calculator — How Much Will It Cost?",
        description: "See exactly how many packs and how much money it takes to complete any Panini album. Includes World Cup 2026, Premier League and Champions League. Free, instant, no signup.",
        url: "https://toolstack.tech/tools/panini-sticker-calculator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Panini Sticker Album Completion Calculator",
        description: "Free calculator — see how many packs and how much it costs to complete any Panini sticker album.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
