import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Which World Cup 2026 Team Should I Support? — Free Quiz",
    description: "Answer 5 quick questions and discover which World Cup 2026 team matches your football personality. Covers 24 nations, instant result, no signup needed.",
    keywords: ["which world cup team should i support 2026", "world cup 2026 team finder", "world cup team quiz 2026", "which team to support world cup 2026", "world cup 2026 neutral team", "world cup team selector quiz", "world cup 2026 which country"],
    alternates: { canonical: "https://toolstack.tech/tools/world-cup-team-finder" },
    openGraph: {
        title: "Which World Cup 2026 Team Should I Support? — Free Quiz",
        description: "5-question personality quiz — find the perfect World Cup 2026 team for you. Matched by play style, mentality and region from 24 qualified nations. Free, instant, shareable.",
        url: "https://toolstack.tech/tools/world-cup-team-finder",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Which World Cup 2026 Team Should I Support?",
        description: "Free 5-question quiz — find your perfect World Cup 2026 team from 24 nations. Instant result, no signup.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
