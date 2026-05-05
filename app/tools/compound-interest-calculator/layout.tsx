import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Compound Interest Calculator | Free Investment Growth Tool — ToolStack',
    description: 'Calculate compound interest with monthly or yearly compounding and contributions. See your investment grow over time with a year-by-year breakdown.',
    keywords: ['compound interest calculator', 'compound interest formula', 'investment returns', 'compound growth', 'savings calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/compound-interest-calculator' },
    openGraph: {
      type: 'website',
      title: 'Compound Interest Calculator | Free Investment Growth Tool — ToolStack',
      description: 'Calculate compound interest with monthly or yearly compounding and contributions.',
      url: 'https://toolstack.tech/tools/compound-interest-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Compound Interest Calculator', description: 'Calculate compound interest with monthly or yearly compounding and contributions.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Compound Interest Calculator",
        "description": "Calculate compound interest with monthly or yearly compounding and contributions. See your investment grow over time with a year-by-year breakdown.",
        "url": "https://toolstack.tech/tools/compound-interest-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "934", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
