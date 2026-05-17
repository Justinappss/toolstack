export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"Postiz Review 2026","item":"https://toolstack.tech/blog/postiz-review"}]}' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Review",
        "name": "Postiz Review 2026",
        "reviewBody": "Postiz is an open-source social media scheduler that added agentic AI scheduling in May 2026. Self-hostable for near-zero cost, supports 12+ platforms, and integrates with n8n, Make, and AI agents via public API. Best for automation-focused marketers and teams scaling multi-platform distribution.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "8.4",
          "bestRating": "10",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Justin Pirrie"
        },
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": "Postiz",
          "applicationCategory": "SocialMediaApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free self-hosted option. Cloud plans from ~$29/month."
          }
        },
        "datePublished": "2026-05-16"
      }) }} />
      {children}
    </>
  );
}
