import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Best Free AI Cover Letter Generator (No Signup, No Limits)",
    description: "Write a tailored cover letter in seconds with ToolStack's free AI cover letter generator. GPT-4o powered, 4 tone modes, unlimited uses, no account required.",
    keywords: ["ai cover letter generator", "free ai cover letter generator", "cover letter generator free", "cover letter ai generator", "free cover letter generator", "chatgpt cover letter generator", "ai cover letter"],
    alternates: { canonical: "https://toolstack.tech/blog/cover-letter-generator-guide" },
    openGraph: {
        title: "The Best Free AI Cover Letter Generator (No Signup, No Limits)",
        description: "Stop rewriting from scratch. ToolStack's AI cover letter generator is free, unlimited, and powered by GPT-4o. No signup, no paywall, 4 tone modes.",
        url: "https://toolstack.tech/blog/cover-letter-generator-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-21",
        modifiedTime: "2026-05-21",
        images: [{ url: "https://toolstack.tech/blog/cover-letter-generator-guide/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "The Best Free AI Cover Letter Generator (No Signup, No Limits)",
        description: "Free, unlimited, GPT-4o powered. 4 tone modes. No account needed. ToolStack's cover letter generator writes a tailored letter in seconds.",
        images: ["https://toolstack.tech/blog/cover-letter-generator-guide/hero-banner.png"],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
                    { "@type": "ListItem", "position": 3, "name": "Best Free AI Cover Letter Generator", "item": "https://toolstack.tech/blog/cover-letter-generator-guide" },
                ],
            }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "The Best Free AI Cover Letter Generator (No Signup, No Limits)",
                "description": "How ToolStack's free AI cover letter generator works — GPT-4o powered, 4 tone modes, unlimited uses, no account needed.",
                "thumbnailUrl": `https://img.youtube.com/vi/QoEcFEmiHRo/maxresdefault.jpg`,
                "uploadDate": "2026-05-21",
                "embedUrl": "https://www.youtube.com/embed/QoEcFEmiHRo",
                "contentUrl": "https://youtu.be/QoEcFEmiHRo",
                "publisher": {
                    "@type": "Organization",
                    "name": "ToolStack",
                    "url": "https://toolstack.tech",
                },
            }) }} />
            {children}
        </>
    );
}
