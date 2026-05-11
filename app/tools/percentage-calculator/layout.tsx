import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Percentage Calculator | Six Free Percentage Tools — ToolStack',
    description: 'Six percentage calculators in one tool: find percentages, calculate percentage change, increase/decrease, and more. Instant results, no signup.',
    keywords: ['percentage calculator', 'percent calculator', 'percentage change calculator', 'what is X percent of Y', 'percentage increase calculator', 'percentage difference'],
    alternates: { canonical: 'https://toolstack.tech/tools/percentage-calculator' },
    openGraph: {
      type: 'website',
      title: 'Percentage Calculator | Six Free Percentage Tools — ToolStack',
      description: 'Six percentage calculators in one tool: find percentages, calculate change, and more.',
      url: 'https://toolstack.tech/tools/percentage-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Percentage Calculator', description: 'Six percentage calculators in one tool.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Percentage Calculator",
        "description": "Six percentage calculators in one tool: find percentages, calculate percentage change, increase/decrease, and more.",
        "url": "https://toolstack.tech/tools/percentage-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2567", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Percentage Calculator","item":"https://toolstack.tech/tools/percentage-calculator"}]}' }} />
      {children}
    </>
  );
}
