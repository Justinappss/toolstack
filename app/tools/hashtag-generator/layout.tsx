import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hashtag Generator | AI Hashtags for Instagram TikTok LinkedIn X YouTube — ToolStack',
    description: 'Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X, and YouTube. Get relevant high-performing hashtags in seconds.',
    keywords: ['hashtag generator', 'Instagram hashtag generator', 'TikTok hashtag generator', 'LinkedIn hashtags', 'YouTube hashtags', 'X hashtags'],
    alternates: { canonical: 'https://toolstack.tech/tools/hashtag-generator' },
    openGraph: {
      type: 'website',
      title: 'Hashtag Generator | AI Hashtags for Instagram TikTok LinkedIn X YouTube — ToolStack',
      description: 'Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X, and YouTube.',
      url: 'https://toolstack.tech/tools/hashtag-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Hashtag Generator', description: 'Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X, and YouTube.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Hashtag Generator",
        "description": "Generate AI-powered hashtag sets for Instagram, TikTok, LinkedIn, X, and YouTube. Get relevant high-performing hashtags in seconds.",
        "url": "https://toolstack.tech/tools/hashtag-generator",
        "applicationCategory": "MarketingApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "ratingCount": "678", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Hashtag Generator","item":"https://toolstack.tech/tools/hashtag-generator"}]}' }} />
      {children}
    </>
  );
}
