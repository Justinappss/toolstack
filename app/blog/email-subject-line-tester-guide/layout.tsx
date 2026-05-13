import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Email Subject Line Tester: Score Your Subject Lines Before You Send",
    description: "Test your email subject lines for open rate potential, spam triggers, and power words. Get a letter grade, A/B compare mode, and AI rewrite suggestions. Free, no signup.",
    alternates: { canonical: "https://toolstack.tech/blog/email-subject-line-tester-guide" },
    openGraph: {
        title: "Email Subject Line Tester: Score Your Subject Lines Before You Send",
        description: "Test your email subject lines for open rate potential, spam triggers, and power words. Get a letter grade, A/B compare mode, and AI rewrite suggestions. Free, no signup.",
        url: "https://toolstack.tech/blog/email-subject-line-tester-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-13",
        modifiedTime: "2026-05-13",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630, alt: "Email Subject Line Tester Guide" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Email Subject Line Tester: Score Your Subject Lines Before You Send",
        description: "Test your email subject lines for open rate potential, spam triggers, and power words. Free, no signup.",
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
                            { "@type": "ListItem", "position": 3, "name": "Email Subject Line Tester Guide", "item": "https://toolstack.tech/blog/email-subject-line-tester-guide" },
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
                        "name": "Email Subject Line Tester — Free Tool That Scores Your Subject Lines",
                        "description": "Score your email subject lines for open rate potential, spam triggers, power words, length and more with this free tool.",
                        "thumbnailUrl": "https://img.youtube.com/vi/iVmk92yIzHw/maxresdefault.jpg",
                        "embedUrl": "https://www.youtube.com/embed/iVmk92yIzHw",
                        "uploadDate": "2026-05-13",
                        "contentUrl": "https://www.youtube.com/watch?v=iVmk92yIzHw"
                    }),
                }}
            />
            {children}
        </>
    );
}