import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Free Tools — Writers, Marketers & Developers | ToolStack",
    description: "Browse 60+ free online tools for writers, marketers and developers. AI prompts, SEO, word counter, JSON formatter, password generator and more. No signup required.",
    alternates: { canonical: "https://toolstack.tech/tools" },
    openGraph: {
        title: "All Free Tools | ToolStack",
        description: "60+ free tools for writers, marketers and developers. No signup. Instant results.",
        url: "https://toolstack.tech/tools",
        siteName: "ToolStack",
        type: "website",
    },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
