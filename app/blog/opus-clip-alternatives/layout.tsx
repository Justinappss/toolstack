export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
          { "@type": "ListItem", "position": 3, "name": "Is Opus Clip Still King? We Tested 3 New AI Rivals (2026)", "item": "https://toolstack.tech/blog/opus-clip-alternatives" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Review",
        "name": "Is Opus Clip Still King? We Tested 3 New AI Rivals (2026)",
        "reviewBody": "We ran the same 45-minute podcast through Opus Clip, Vidyo.ai, Captions.ai, and Submagic to find out which AI video repurposing tool wins in 2026. Opus Clip still leads on full workflow — 22 clips with an 85% keeper rate, virality scoring, B-Roll AI, and social scheduling all in one platform. Captions.ai wins on raw caption accuracy at 98%, and Submagic excels at hook rewriting, but neither matches Opus Clip's end-to-end feature set.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "8.4",
          "bestRating": "10",
          "worstRating": "1"
        },
        "author": { "@type": "Person", "name": "Justin Pirrie" },
        "itemReviewed": {
          "@type": "SoftwareApplication",
          "name": "Opus Clip",
          "applicationCategory": "Video Editing Software",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free plan available. Paid plans from $19/month at opus.pro"
          }
        },
        "datePublished": "2026-05-27"
      }) }} />
      {children}
    </>
  );
}
