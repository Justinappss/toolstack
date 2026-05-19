import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free UTM Builder for GA4: Build Campaign URLs in 10 Seconds",
    description: "Build perfectly formatted UTM tracking URLs for GA4 in seconds. Free UTM builder with GA4-ready examples for email, Google Ads, Facebook, and LinkedIn campaigns.",
    keywords: ["free utm builder", "utm builder free", "ga4 campaign url builder utm parameters", "utm link builder", "campaign url builder", "google analytics utm builder free", "utm tracking builder"],
    alternates: { canonical: "https://toolstack.tech/blog/utm-builder-guide" },
    openGraph: {
        title: "Free UTM Builder for GA4: Build Campaign URLs in 10 Seconds",
        description: "Build perfectly formatted UTM tracking URLs for GA4 in seconds. Free, no signup, GA4-ready. Works for email, Google Ads, Facebook, and LinkedIn.",
        url: "https://toolstack.tech/blog/utm-builder-guide",
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-19",
        modifiedTime: "2026-05-19",
        images: [{ url: "https://toolstack.tech/blog/utm-builder-guide/hero-banner.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free UTM Builder for GA4: Build Campaign URLs in 10 Seconds",
        description: "Build perfectly formatted UTM tracking URLs for GA4 in seconds. Free, no signup, works for email, ads, and social.",
        images: ["https://toolstack.tech/blog/utm-builder-guide/hero-banner.png"],
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
                    { "@type": "ListItem", "position": 3, "name": "Free UTM Builder for GA4", "item": "https://toolstack.tech/blog/utm-builder-guide" },
                ],
            }) }} />
            {children}
        </>
    );
}
