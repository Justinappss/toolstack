import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Character Counter | Track Twitter, Instagram & LinkedIn Limits — ToolStack',
    description: 'Count characters with platform limit tracking for Twitter/X, Instagram, and more. Know exactly how many characters you have left before posting.',
    keywords: ['character counter', 'twitter character count', 'Instagram caption length', 'LinkedIn character limit', 'social media character counter'],
    alternates: { canonical: 'https://toolstack.tech/tools/character-counter' },
    openGraph: {
      type: 'website',
      title: 'Character Counter | Track Twitter, Instagram & LinkedIn Limits — ToolStack',
      description: 'Count characters with platform limit tracking for Twitter/X, Instagram, and more.',
      url: 'https://toolstack.tech/tools/character-counter',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Character Counter', description: 'Count characters with platform limit tracking for Twitter, Instagram, and more.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Character Counter",
        "description": "Count characters with platform limit tracking for Twitter, Instagram, and more. Know exactly how many characters you have left before posting.",
        "url": "https://toolstack.tech/tools/character-counter",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1876", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Character Counter","item":"https://toolstack.tech/tools/character-counter"}]}' }} />
      {children}
    </>
  );
}
