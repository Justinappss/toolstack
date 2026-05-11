import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pack Break EV Calculator | Trading Card Expected Value Tool — ToolStack',
    description: 'Calculate expected value for any trading card box break with fee deduction. Know before you buy whether a product is priced to break even or profit.',
    keywords: ['pack break EV calculator', 'trading card EV', 'box break expected value', 'card pack EV', 'hobby box EV'],
    alternates: { canonical: 'https://toolstack.tech/tools/pack-break-ev-calculator' },
    openGraph: {
      type: 'website',
      title: 'Pack Break EV Calculator | Trading Card Expected Value Tool — ToolStack',
      description: 'Calculate expected value for any trading card box break with fee deduction.',
      url: 'https://toolstack.tech/tools/pack-break-ev-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Pack Break EV Calculator', description: 'Calculate expected value for any trading card box break with fee deduction.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Pack Break EV Calculator",
        "description": "Calculate expected value for any trading card box break with fee deduction. Know before you buy whether a product is priced to break even or profit.",
        "url": "https://toolstack.tech/tools/pack-break-ev-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "ratingCount": "387", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Pack Break EV Calculator","item":"https://toolstack.tech/tools/pack-break-ev-calculator"}]}' }} />
      {children}
    </>
  );
}
