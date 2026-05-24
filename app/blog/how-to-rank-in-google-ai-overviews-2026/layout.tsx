import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Rank in Google AI Overviews: The Complete GEO Guide (2026)",
    description: "Google AI Overviews now appear on 40%+ of searches. Here's the exact 5-step GEO framework to get your website cited inside Google's AI answers — not just ranked below them.",
    alternates: { canonical: "https://toolstack.tech/blog/how-to-rank-in-google-ai-overviews-2026" },
    openGraph: {
        title: "How to Rank in Google AI Overviews: The Complete GEO Guide (2026)",
        description: "Google AI Overviews now appear on 40%+ of searches. Here's the exact 5-step GEO framework to get your website cited inside Google's AI answers — not just ranked below them.",
        url: "https://toolstack.tech/blog/how-to-rank-in-google-ai-overviews-2026",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-24",
        modifiedTime: "2026-05-24",
        images: [{ url: "https://toolstack.tech/blog/how-to-rank-in-google-ai-overviews-2026/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "How to Rank in Google AI Overviews: The Complete GEO Guide (2026)",
        description: "Google AI Overviews now appear on 40%+ of searches. Here's the exact 5-step GEO framework to get your website cited inside Google's AI answers — not just ranked below them.",
        images: ["https://toolstack.tech/blog/how-to-rank-in-google-ai-overviews-2026/hero-banner.png"],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://toolstack.tech" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://toolstack.tech/blog" },
            { "@type": "ListItem", position: 3, name: "How to Rank in Google AI Overviews 2026", item: "https://toolstack.tech/blog/how-to-rank-in-google-ai-overviews-2026" },
        ],
    };

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "How to Rank in Google AI Overviews in 2026 (Step-by-Step GEO Guide)",
        description: "The complete 5-step GEO framework to get your website cited inside Google AI Overviews — not just ranked below them.",
        thumbnailUrl: "https://toolstack.tech/blog/how-to-rank-in-google-ai-overviews-2026/hero-banner.png",
        uploadDate: "2026-05-24",
        embedUrl: "https://www.youtube-nocookie.com/embed/nymPvtY5vU8",
        contentUrl: "https://www.youtube.com/watch?v=nymPvtY5vU8",
        publisher: {
            "@type": "Organization",
            name: "ToolStack",
            url: "https://toolstack.tech",
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
            {children}
        </>
    );
}
