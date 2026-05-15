import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "58 Best Free Online Tools in 2026 (No Signup, No Paywall) | ToolStack",
    description: "The complete list of the best free online tools in 2026 across AI, SEO, writing, development, marketing, and more. All free, no signup, no paywall. Curated by ToolStack.",
    alternates: { canonical: "https://toolstack.tech/blog/best-free-online-tools-2026" },
    openGraph: {
        title: "58 Best Free Online Tools in 2026 (No Signup, No Paywall) | ToolStack",
        description: "The complete list of the best free online tools across AI, SEO, writing, development, and more. All free, no signup.",
        url: "https://toolstack.tech/blog/best-free-online-tools-2026",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-14",
        modifiedTime: "2026-05-14",
        images: [{ url: "https://toolstack.tech/og-image.png", width: 1200, height: 630, alt: "58 Best Free Online Tools 2026" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "58 Best Free Online Tools in 2026 (No Signup, No Paywall)",
        description: "The complete list of the best free online tools across AI, SEO, writing, development, and more. All free, no signup.",
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
                            { "@type": "ListItem", "position": 3, "name": "58 Best Free Online Tools 2026", "item": "https://toolstack.tech/blog/best-free-online-tools-2026" },
                        ],
                    }),
                }}
            />
            {children}
        </>
    );
}