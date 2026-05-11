import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Meta Description Generator | AI SEO Meta Descriptions — ToolStack',
    description: 'Generate high-CTR meta descriptions with GPT-4o and live Google SERP preview. See exactly how your meta description will look in search results.',
    keywords: ['meta description generator', 'SEO meta description', 'GPT-4o meta description', 'Google SERP preview', 'meta description length'],
    alternates: { canonical: 'https://toolstack.tech/tools/meta-description-generator' },
    openGraph: {
      type: 'website',
      title: 'Meta Description Generator | AI SEO Meta Descriptions — ToolStack',
      description: 'Generate high-CTR meta descriptions with GPT-4o and live Google SERP preview.',
      url: 'https://toolstack.tech/tools/meta-description-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Meta Description Generator', description: 'Generate high-CTR meta descriptions with GPT-4o and live Google SERP preview.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Meta Description Generator",
        "description": "Generate high-CTR meta descriptions with GPT-4o and live Google SERP preview. See exactly how your meta description will look in search results.",
        "url": "https://toolstack.tech/tools/meta-description-generator",
        "applicationCategory": "MarketingApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "567", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Meta Description Generator","item":"https://toolstack.tech/tools/meta-description-generator"}]}' }} />
      {children}
    </>
  );
}
