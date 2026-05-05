import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'eBay Fee & Profit Calculator | Calculate Net Profit After Fees — ToolStack',
    description: 'Calculate your exact eBay fees, PayPal fees, and net profit after all selling costs. Instant profit margin insights for eBay resellers.',
    keywords: ['eBay fee calculator', 'eBay profit calculator', 'eBay seller fees', 'eBay best offer calculator', 'reseller profit calculator', 'eBay selling costs'],
    alternates: { canonical: 'https://toolstack.tech/tools/ebay-best-offer-calculator' },
    openGraph: {
      type: 'website',
      title: 'eBay Fee & Profit Calculator | Calculate Net Profit After Fees — ToolStack',
      description: 'Calculate your exact eBay fees, PayPal fees, and net profit after all selling costs.',
      url: 'https://toolstack.tech/tools/ebay-best-offer-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'eBay Fee & Profit Calculator', description: 'Calculate your exact eBay fees and net profit after all selling costs.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "eBay Fee & Profit Calculator",
        "description": "Calculate your exact eBay fees, PayPal fees, and net profit after all selling costs. Instant profit margin insights.",
        "url": "https://toolstack.tech/tools/ebay-best-offer-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "532", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
