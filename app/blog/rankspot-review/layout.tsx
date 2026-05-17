export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"RankSpot Review 2026","item":"https://toolstack.tech/blog/rankspot-review"}]}' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Review",
        "name": "RankSpot Review 2026: Does This AI SEO Autopilot Actually Rank Your Blog?",
        "reviewBody": "RankSpot is a fully automated AI SEO blog agent that researches keywords, monitors competitors, generates images, and publishes SEO-optimized articles to your blog every day — automatically. Real users report 10,000 monthly clicks and DR growth from 0 to 29 in 6 months. Pricing starts at $39/month with a 3-article free trial at rankspot.ai. Best for SaaS founders, affiliate bloggers, and solo content marketers who need hands-off SEO publishing at volume.",
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
          "name": "RankSpot",
          "applicationCategory": "SEO Software",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free trial: 3 articles, no credit card required. Paid plans from $39/month at rankspot.ai"
          }
        },
        "datePublished": "2026-05-16"
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "RankSpot Review 2026 — AI SEO Autopilot From Setup to First Ranking Article",
        "description": "Full review of RankSpot AI SEO autopilot. Covers the 3-step setup process, competitor monitoring, content quality, pricing comparison vs Surfer SEO and Jasper, and real user results.",
        "thumbnailUrl": "https://img.youtube.com/vi/zTbdDaT3P4A/maxresdefault.jpg",
        "embedUrl": "https://www.youtube.com/embed/zTbdDaT3P4A",
        "uploadDate": "2026-05-16T00:00:00+00:00",
        "duration": "PT7M17S"
      }) }} />
      {children}
    </>
  );
}
