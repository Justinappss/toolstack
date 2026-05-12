import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Word Count Checker: Improve Your Writing Score Free",
    description: "Check your word count and Flesch readability score instantly. Learn what your score means, how to improve it, and why readable writing ranks higher — free tool, no signup.",
    alternates: { canonical: "https://toolstack.tech/blog/word-count-checker-guide" },
    openGraph: {
        title: "Word Count Checker: Improve Your Writing Score Free",
        description: "Check your word count and Flesch readability score instantly. Free tool, no signup. Learn what makes writing rank and convert.",
        url: "https://toolstack.tech/blog/word-count-checker-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-11",
        modifiedTime: "2026-05-11",
        images: [{ url: "https://toolstack.tech/blog/word-count-checker-guide/infographic.png", width: 1200, height: 630, alt: "Word Count Checker Guide Infographic" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Word Count Checker: Improve Your Writing Score Free",
        description: "Check your word count and Flesch readability score instantly — free tool, no signup.",
        images: ["https://toolstack.tech/blog/word-count-checker-guide/infographic.png"],
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
                            { "@type": "ListItem", "position": 3, "name": "Word Count Checker: Improve Your Writing Score", "item": "https://toolstack.tech/blog/word-count-checker-guide" },
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
                        "name": "Word Count Checker — How to Check and Improve Your Readability Score",
                        "description": "Check your word count and Flesch readability score free",
                        "thumbnailUrl": "https://img.youtube.com/vi/7ePaydWAWM8/maxresdefault.jpg",
                        "embedUrl": "https://www.youtube.com/embed/7ePaydWAWM8",
                        "uploadDate": "2026-05-11",
                        "duration": "PT7M"
                    }),
                }}
            />
            {children}
        </>
    );
}
