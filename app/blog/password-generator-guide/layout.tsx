export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
                    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
                    { "@type": "ListItem", "position": 3, "name": "Best Free Password Generator 2026", "item": "https://toolstack.tech/blog/password-generator-guide" }
                ]
            }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Review",
                "name": "Best Free Password Generator 2026: Create Strong Passwords Instantly",
                "reviewBody": "ToolStack's free password generator creates truly random passwords of 8–64 characters with full character customisation — uppercase, lowercase, numbers, symbols, and exclusion of ambiguous characters. No signup, no limits, runs entirely in your browser with no server-side data storage. Tested against LastPass, Bitwarden, 1Password, and NordPass generators — ToolStack wins on privacy (client-side only), no account requirement, and zero usage limits.",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "9.5",
                    "bestRating": "10",
                    "worstRating": "1"
                },
                "author": { "@type": "Person", "name": "Justin Pirrie" },
                "itemReviewed": {
                    "@type": "SoftwareApplication",
                    "name": "ToolStack Password Generator",
                    "applicationCategory": "SecurityApplication",
                    "operatingSystem": "Web",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                },
                "datePublished": "2026-05-18"
            }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Best Free Password Generator 2026 — No Signup, No Limits, Runs in Your Browser",
                "thumbnailUrl": "https://img.youtube.com/vi/DgQ_ZXqUpMg/maxresdefault.jpg",
                "embedUrl": "https://www.youtube.com/embed/DgQ_ZXqUpMg",
                "url": "https://youtu.be/DgQ_ZXqUpMg",
                "uploadDate": "2026-05-18T00:00:00+00:00",
                "duration": "PT6M0S"
            }) }} />
            {children}
        </>
    );
}
