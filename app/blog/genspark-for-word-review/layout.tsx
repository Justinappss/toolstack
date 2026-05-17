export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://toolstack.tech/blog"},{"@type":"ListItem","position":3,"name":"Genspark for Word Review 2026","item":"https://toolstack.tech/blog/genspark-for-word-review"}]}' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Review",
        "name": "Genspark for Word Review 2026: Can This AI Add-in Beat Microsoft Copilot?",
        "reviewBody": "Genspark for Word is a Microsoft Word add-in that brings multi-model AI drafting, live web research with cited sources, rewriting, equation generation, and image insertion directly into Word. Launched April 2026 on Microsoft AppSource as part of a global Microsoft partnership. Best for consultants, researchers, content strategists, and students who work primarily in Word documents. Beats Microsoft Copilot on price at $24.99/month vs $33-66/month.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "8.6",
          "bestRating": "10",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Justin Pirrie"
        },
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": "Genspark for Word",
          "applicationCategory": "ProductivityApplication",
          "operatingSystem": "Windows, Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free tier available via Microsoft AppSource. Paid Genspark plans unlock full access."
          }
        },
        "datePublished": "2026-05-16"
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Genspark for Word Review 2026: Better Than Microsoft Copilot? (Honest 2-Week Test)",
        "description": "Hands-on review of Genspark for Word — tested across 40+ real Word sessions over two weeks. Covers AI drafting, live web research with citations, Select & Edit, pricing comparison vs Microsoft Copilot, and final 8.6/10 verdict.",
        "thumbnailUrl": "https://img.youtube.com/vi/1Cc7K8B3dKI/maxresdefault.jpg",
        "embedUrl": "https://www.youtube.com/embed/1Cc7K8B3dKI",
        "url": "https://youtu.be/1Cc7K8B3dKI",
        "uploadDate": "2026-05-17T00:00:00+00:00",
        "duration": "PT7M32S"
      }) }} />
      {children}
    </>
  );
}
