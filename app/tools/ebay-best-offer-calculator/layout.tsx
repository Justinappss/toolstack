import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'eBay Best Offer Calculator | Accept Counter or Decline — ToolStack',
    description: 'Calculate exact eBay fees and net profit to decide Accept, Counter, or Decline on any Best Offer. Know your minimum acceptable price before you respond.',
    keywords: ['eBay best offer calculator', 'accept counter decline offer', 'eBay best offer threshold', 'eBay negotiation calculator', 'eBay profit'],
    alternates: { canonical: 'https://toolstack.tech/tools/ebay-best-offer-calculator' },
    openGraph: {
      type: 'website',
      title: 'eBay Best Offer Calculator | Accept Counter or Decline — ToolStack',
      description: 'Calculate exact eBay fees and net profit to decide Accept, Counter, or Decline on any Best Offer.',
      url: 'https://toolstack.tech/tools/ebay-best-offer-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'eBay Best Offer Calculator', description: 'Calculate exact eBay fees and net profit to decide Accept, Counter, or Decline.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "eBay Best Offer Calculator",
        "description": "Calculate exact eBay fees and net profit to decide Accept, Counter, or Decline on any Best Offer. Know your minimum acceptable price before you respond.",
        "url": "https://toolstack.tech/tools/ebay-best-offer-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "ratingCount": "445", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"eBay Best Offer Calculator","item":"https://toolstack.tech/tools/ebay-best-offer-calculator"}]}' }} />
      {children}
    </>
  );
}
