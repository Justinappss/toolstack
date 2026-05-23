import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Google's New AI Search Bar: What It Means for Your Website Traffic (2026)",
    description: "Google redesigned its search bar for the first time in 25 years at I/O 2026. Here's exactly what changed, what happened to the blue links, and how to keep your traffic.",
    alternates: { canonical: "https://toolstack.tech/blog/google-ai-search-redesign-2026" },
    openGraph: {
        title: "Google's New AI Search Bar: What It Means for Your Website Traffic (2026)",
        description: "Google redesigned its search bar for the first time in 25 years at I/O 2026. Here's exactly what changed, what happened to the blue links, and how to keep your traffic.",
        url: "https://toolstack.tech/blog/google-ai-search-redesign-2026",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-22",
        modifiedTime: "2026-05-23",
        images: [{ url: "https://toolstack.tech/blog/google-ai-search-redesign-2026/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Google's New AI Search Bar: What It Means for Your Website Traffic (2026)",
        description: "Google redesigned its search bar for the first time in 25 years at I/O 2026. Here's exactly what changed, what happened to the blue links, and how to keep your traffic.",
        images: ["https://toolstack.tech/blog/google-ai-search-redesign-2026/hero-banner.png"],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://toolstack.tech" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://toolstack.tech/blog" },
            { "@type": "ListItem", position: 3, name: "Google AI Search Redesign 2026", item: "https://toolstack.tech/blog/google-ai-search-redesign-2026" },
        ],
    };

    const videoSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Google Just Changed Search Forever — Here's What It Means For Your Website (2026)",
        description: "Google redesigned its search bar for the first time in 25 years at I/O 2026. This video breaks down exactly what changed, what happened to the blue links, and the 5 steps to protect your website traffic.",
        thumbnailUrl: "https://toolstack.tech/blog/google-ai-search-redesign-2026/hero-banner.png",
        uploadDate: "2026-05-23",
        embedUrl: "https://www.youtube-nocookie.com/embed/x2WQWusAiAw",
        contentUrl: "https://www.youtube.com/watch?v=x2WQWusAiAw",
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
