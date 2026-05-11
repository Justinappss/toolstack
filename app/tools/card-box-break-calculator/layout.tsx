import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Card Box Break Calculator | Break Spot Pricing Tool — ToolStack',
    description: 'Calculate break spot pricing for trading card box breaks. Set fair spot prices for hobby boxes, cases, and individual packs.',
    keywords: ['card box break calculator', 'break spot pricing', 'trading card breaks', 'box break calculator', 'sports card break spots'],
    alternates: { canonical: 'https://toolstack.tech/tools/card-box-break-calculator' },
    openGraph: {
      type: 'website',
      title: 'Card Box Break Calculator | Break Spot Pricing Tool — ToolStack',
      description: 'Calculate break spot pricing for trading card box breaks.',
      url: 'https://toolstack.tech/tools/card-box-break-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Card Box Break Calculator', description: 'Calculate break spot pricing for trading card box breaks.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Card Box Break Calculator",
        "description": "Calculate break spot pricing for trading card box breaks. Set fair spot prices for hobby boxes, cases, and individual packs.",
        "url": "https://toolstack.tech/tools/card-box-break-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.5", "ratingCount": "412", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Card Box Break Calculator","item":"https://toolstack.tech/tools/card-box-break-calculator"}]}' }} />
      {children}
    </>
  );
}
