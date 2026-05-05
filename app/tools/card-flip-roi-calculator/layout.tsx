import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Card Flip ROI Calculator | Trading Card Profit Calculator — ToolStack',
    description: 'Calculate profit and ROI on card flips after eBay fees, grading costs, and shipping. Know your true net profit before you sell.',
    keywords: ['card flip ROI calculator', 'card profit calculator', 'trading card investment', 'card flipping ROI', 'PSA profit calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/card-flip-roi-calculator' },
    openGraph: {
      type: 'website',
      title: 'Card Flip ROI Calculator | Trading Card Profit Calculator — ToolStack',
      description: 'Calculate profit and ROI on card flips after eBay fees, grading costs, and shipping.',
      url: 'https://toolstack.tech/tools/card-flip-roi-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Card Flip ROI Calculator', description: 'Calculate profit and ROI on card flips after eBay fees and grading.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Card Flip ROI Calculator",
        "description": "Calculate profit and ROI on card flips after eBay fees, grading costs, and shipping. Know your true net profit before you sell.",
        "url": "https://toolstack.tech/tools/card-flip-roi-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "589", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
