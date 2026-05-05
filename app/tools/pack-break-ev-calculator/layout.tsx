import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sports Card Pack Break EV Calculator | Box Break EV Tool — ToolStack',
    description: 'Calculate expected value of sports card pack breaks. Analyze box breaks, case breaks, and individual pack EV for major sports. Free and instant.',
    keywords: ['sports card pack break EV', 'box break EV calculator', 'sports card investment', 'card pack expected value', 'pack break ev calculator', 'hobby box ev calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/pack-break-ev-calculator' },
    openGraph: {
      type: 'website',
      title: 'Sports Card Pack Break EV Calculator | Box Break Expected Value — ToolStack',
      description: 'Calculate expected value of sports card pack breaks. Analyze box breaks, case breaks, and individual pack EV for major sports.',
      url: 'https://toolstack.tech/tools/pack-break-ev-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Sports Card Pack Break EV Calculator', description: 'Calculate expected value of sports card pack breaks. Free and instant.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Sports Card Pack Break EV Calculator",
        "description": "Calculate expected value of sports card pack breaks. Analyze box breaks, case breaks, and individual pack EV for major sports.",
        "url": "https://toolstack.tech/tools/pack-break-ev-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "470", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
