import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Case Converter | Free Online Text Case Converter — ToolStack',
    description: 'Convert text between UPPER, lower, Title, Sentence, camelCase, and more. Free, instant, no signup, works in your browser.',
    keywords: ['case converter', 'text case converter', 'capitalize text', 'camelCase', 'Title Case converter', 'lowercase uppercase'],
    alternates: { canonical: 'https://toolstack.tech/tools/case-converter' },
    openGraph: {
      type: 'website',
      title: 'Case Converter | Free Online Text Case Converter — ToolStack',
      description: 'Convert text between UPPER, lower, Title, Sentence, camelCase, and more.',
      url: 'https://toolstack.tech/tools/case-converter',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Case Converter', description: 'Convert text between UPPER, lower, Title, Sentence, camelCase, and more.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Case Converter",
        "description": "Convert text between UPPER, lower, Title, Sentence, camelCase, and more. Free, instant, no signup, works in your browser.",
        "url": "https://toolstack.tech/tools/case-converter",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2103", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Case Converter","item":"https://toolstack.tech/tools/case-converter"}]}' }} />
      {children}
    </>
  );
}
