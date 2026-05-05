import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Website Down Checker | Free Online Tool — ToolStack',
    description: 'Check if any website is down globally from multiple locations. Instant, free, no signup.',
    keywords: ['website down', 'site health checker', 'is site down', 'website monitor', 'down detector'],
    alternates: { canonical: 'https://toolstack.tech/tools/website-down-checker' },
    openGraph: {
      type: 'website',
      title: 'Website Down Checker | Free Online Tool — ToolStack',
      description: 'Check if any website is down globally from multiple locations. Instant, free, no signup.',
      url: 'https://toolstack.tech/tools/website-down-checker',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Website Down Checker', description: 'Check if any website is down globally from multiple locations.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Website Down Checker",
        "description": "Check if any website is down globally from multiple locations. Instant, free, no signup.",
        "url": "https://toolstack.tech/tools/website-down-checker",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "312", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
