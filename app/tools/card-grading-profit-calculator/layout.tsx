import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Card Grading Profit Calculator | PSA BGS SGC Grading ROI — ToolStack',
    description: 'Calculate if grading a card is profitable after PSA, BGS, or SGC fees. Compare grading companies and find the break-even grade for profit.',
    keywords: ['card grading profit calculator', 'PSA fees', 'BGS grading', 'card grading ROI', 'grading profit', 'PSA BGS SGC comparison'],
    alternates: { canonical: 'https://toolstack.tech/tools/card-grading-profit-calculator' },
    openGraph: {
      type: 'website',
      title: 'Card Grading Profit Calculator | PSA BGS SGC Grading ROI — ToolStack',
      description: 'Calculate if grading a card is profitable after PSA, BGS, or SGC fees.',
      url: 'https://toolstack.tech/tools/card-grading-profit-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Card Grading Profit Calculator', description: 'Calculate if grading a card is profitable after PSA, BGS, or SGC fees.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Card Grading Profit Calculator",
        "description": "Calculate if grading a card is profitable after PSA, BGS, or SGC fees. Compare grading companies and find the break-even grade for profit.",
        "url": "https://toolstack.tech/tools/card-grading-profit-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "ratingCount": "478", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
