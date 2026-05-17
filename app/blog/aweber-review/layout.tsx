export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"AWeber Review 2026","item":"https://toolstack.tech/blog/aweber-review"}]}' }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Review",
                "name": "AWeber Review 2026: Still the Best Email Marketing Tool for Creators?",
                "reviewBody": "AWeber is one of the longest-standing email marketing platforms, founded in 1998 and still serving 100,000+ businesses in 2026. It offers a free plan up to 500 subscribers, Lite at $15/month, and Plus at $20/month (annual). Key strengths: 24/7 phone and live chat support, 600+ email templates, AMP emails, landing pages, and an AI writing assistant. Best for creators, bloggers, and small businesses who want reliable deliverability and real human support.",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "8.2",
                    "bestRating": "10",
                    "worstRating": "1"
                },
                "author": {
                    "@type": "Person",
                    "name": "Justin Pirrie"
                },
                "itemReviewed": {
                    "@type": "SoftwareApplication",
                    "name": "AWeber",
                    "applicationCategory": "EmailMarketingApplication",
                    "operatingSystem": "Web",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "USD",
                        "description": "Free plan available up to 500 subscribers. Paid plans from $15/month."
                    }
                },
                "datePublished": "2026-05-17"
            }) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "AWeber Review 2026: Still the Best Email Marketing Tool? (Honest Test)",
                "thumbnailUrl": "https://img.youtube.com/vi/cWiV7yX_Q5U/maxresdefault.jpg",
                "embedUrl": "https://www.youtube.com/embed/cWiV7yX_Q5U",
                "url": "https://youtu.be/cWiV7yX_Q5U",
                "uploadDate": "2026-05-17T00:00:00+00:00",
                "duration": "PT5M55S"
            }) }} />
            {children}
        </>
    );
}
