import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Whatnot Profit Calculator | Calculate True Profit After Fees — ToolStack',
    description: 'Calculate your Whatnot profit margin after platform fees, payment processing, and shipping costs. Know your true bottom line before you list.',
    keywords: ['Whatnot profit calculator', 'Whatnot fee calculator', 'whatnot seller fees', 'trading card profit calculator', 'Whatnot reselling', 'whatnot commission calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/whatnot-seller-fee-calculator' },
    openGraph: {
      type: 'website',
      title: 'Whatnot Profit Calculator | Calculate True Profit After Fees — ToolStack',
      description: 'Calculate your Whatnot profit margin after platform fees, payment processing, and shipping costs.',
      url: 'https://toolstack.tech/tools/whatnot-seller-fee-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Whatnot Profit Calculator', description: 'Calculate your Whatnot profit margin after all fees.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Whatnot Profit Calculator",
        "description": "Calculate your Whatnot profit margin after platform fees, payment processing, and shipping costs. Know your true bottom line.",
        "url": "https://toolstack.tech/tools/whatnot-seller-fee-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "688", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
