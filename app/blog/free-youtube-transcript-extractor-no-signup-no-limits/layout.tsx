import type { Metadata } from "next";

export const metadata: Metadata = {};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
                    { "@type": "ListItem", "position": 3, "name": "Free YouTube Transcript Extractor No Signup", "item": "https://toolstack.tech/blog/free-youtube-transcript-extractor-no-signup-no-limits" },
                ],
            }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Free YouTube Transcript Extractor No Signup — No Limits, No Paywall",
                "description": "Extract transcripts from any public YouTube video instantly. ToolStack's free YouTube transcript extractor no signup required — no limits, no friction. Paste URL, get text.",
                "thumbnailUrl": "https://img.youtube.com/vi/ZflCkrgqgIg/maxresdefault.jpg",
                "uploadDate": "2026-06-02",
                "duration": "PT10M",
                "embedUrl": "https://www.youtube.com/embed/ZflCkrgqgIg",
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