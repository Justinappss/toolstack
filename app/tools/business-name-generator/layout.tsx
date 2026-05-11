import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Business Name Generator | AI Brand Name Generator — ToolStack',
    description: 'AI-powered brand name generator with domain availability checking. Find the perfect business name and see if the domain is available instantly.',
    keywords: ['business name generator', 'brand name generator', 'startup name generator', 'domain name generator', 'company name ideas'],
    alternates: { canonical: 'https://toolstack.tech/tools/business-name-generator' },
    openGraph: {
      type: 'website',
      title: 'Business Name Generator | AI Brand Name Generator — ToolStack',
      description: 'AI-powered brand name generator with domain availability checking.',
      url: 'https://toolstack.tech/tools/business-name-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Business Name Generator', description: 'AI-powered brand name generator with domain availability checking.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Business Name Generator",
        "description": "AI-powered brand name generator with domain availability checking. Find the perfect business name and see if the domain is available instantly.",
        "url": "https://toolstack.tech/tools/business-name-generator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "634", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Business Name Generator","item":"https://toolstack.tech/tools/business-name-generator"}]}' }} />
      {children}
    </>
  );
}
