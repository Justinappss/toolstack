import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hashtag Generator: The 3-Tier Strategy to Grow Your Social Reach (Free AI Tool)",
    description: "Stop using #love #photo #fun on every post. Learn the 3-tier hashtag strategy — High-Reach, Growing, and Niche tags — and generate your perfect set free with the ToolStack Hashtag Generator.",
    alternates: { canonical: "https://toolstack.tech/blog/hashtag-generator-guide" },
    openGraph: {
        title: "Hashtag Generator: The 3-Tier Strategy to Grow Your Social Reach (Free AI Tool)",
        description: "Learn the 3-tier hashtag strategy — High-Reach, Growing, and Niche tags — and generate your perfect set free. No signup.",
        url: "https://toolstack.tech/blog/hashtag-generator-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-14",
        modifiedTime: "2026-05-14",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630, alt: "Hashtag Generator Guide" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hashtag Generator: The 3-Tier Strategy to Grow Your Social Reach",
        description: "Learn the 3-tier hashtag strategy — High-Reach, Growing, and Niche tags — and generate your perfect set free.",
        images: ["https://toolstack.tech/og-image.png"],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
                            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
                            { "@type": "ListItem", "position": 3, "name": "Hashtag Generator Guide", "item": "https://toolstack.tech/blog/hashtag-generator-guide" },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "VideoObject",
                        "name": "3-Tier Hashtag Strategy for Instagram, TikTok & LinkedIn – Free Generator No Login",
                        "description": "Free hashtag generator that builds the perfect 3-tier mix for Instagram, TikTok, LinkedIn, X/Twitter, and YouTube.",
                        "thumbnailUrl": "https://img.youtube.com/vi/9IoL7S5uERQ/maxresdefault.jpg",
                        "embedUrl": "https://www.youtube.com/embed/9IoL7S5uERQ",
                        "uploadDate": "2026-05-14T00:00:00+00:00",
                        "contentUrl": "https://www.youtube.com/watch?v=9IoL7S5uERQ"
                    }),
                }}
            />
            {children}
        </>
    );
}