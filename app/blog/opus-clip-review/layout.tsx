export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolstack.tech" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://toolstack.tech/blog" },
          { "@type": "ListItem", "position": 3, "name": "Opus Clip Review 2026", "item": "https://toolstack.tech/blog/opus-clip-review" }
        ]
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Review",
        "name": "Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?",
        "reviewBody": "Opus Clip is an AI-powered video repurposing tool that turns long-form videos into short viral clips for TikTok, Reels, and YouTube Shorts. With 10M+ users, $68M raised, and 95% caption accuracy, it genuinely works — a 45-minute podcast produces 22 ready-to-review clips in under 14 minutes. Free plan available. Paid plans from $19/month. Best for content creators, podcasters, and marketers who publish long-form video regularly.",
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
        "datePublished": "2026-05-26"
      }) }} />
      {/* Add VideoObject schema once YouTube video is live — replace YOUTUBE_ID below:
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Opus Clip Review 2026: Does AI Video Repurposing Actually Save You Time?",
        "description": "We tested Opus Clip on a 45-minute podcast and got 22 clips in 14 minutes. Full review of accuracy, pricing, and who it's for.",
        "thumbnailUrl": "https://img.youtube.com/vi/YOUTUBE_ID/maxresdefault.jpg",
        "embedUrl": "https://www.youtube.com/embed/YOUTUBE_ID",
        "uploadDate": "2026-05-26",
        "author": { "@type": "Person", "name": "Justin Pirrie" }
      }) }} />
      */}
      {children}
    </>
  );
}
