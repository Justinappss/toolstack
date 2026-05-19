import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Credit Card Rewards Optimiser — Find Your Best Card | ToolStack",
    description: "See exactly how much reward value you're leaving on the table. Enter your monthly spend and compare 10 top cards — Chase, Amex, Capital One. Free, instant, no signup.",
    keywords: ["credit card rewards optimizer", "best credit card for rewards", "credit card comparison", "travel rewards calculator", "cash back credit card calculator", "amex business gold", "chase ink rewards"],
    alternates: {
        canonical: "https://toolstack.tech/tools/credit-card-rewards-optimizer",
    },
    openGraph: {
        title: "Credit Card Rewards Optimiser — Find Your Best Card | ToolStack",
        description: "See exactly how much reward value you're leaving on the table. Enter your monthly spend and compare 10 top credit cards — Chase, Amex, Capital One. Free, instant.",
        url: "https://toolstack.tech/tools/credit-card-rewards-optimizer",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Credit Card Rewards Optimiser — Find Your Best Card | ToolStack",
        description: "See exactly how much reward value you're leaving on the table. Enter your monthly spend and compare 10 top credit cards. Free, instant, no signup.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
