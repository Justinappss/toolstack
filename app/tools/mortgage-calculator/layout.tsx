import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mortgage Calculator | Free Monthly Payment & Amortization Tool — ToolStack',
    description: 'Calculate monthly mortgage payments, total interest, and full amortization schedule. Compare 15-year vs 30-year mortgages side by side.',
    keywords: ['mortgage calculator', 'monthly mortgage payment', 'amortization schedule', 'mortgage loan calculator', 'home loan calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/mortgage-calculator' },
    openGraph: {
      type: 'website',
      title: 'Mortgage Calculator | Free Monthly Payment & Amortization Tool — ToolStack',
      description: 'Calculate monthly mortgage payments, total interest, and full amortization schedule.',
      url: 'https://toolstack.tech/tools/mortgage-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Mortgage Calculator', description: 'Calculate monthly mortgage payments and full amortization schedule.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Mortgage Calculator",
        "description": "Calculate monthly mortgage payments, total interest, and full amortization schedule. Compare 15-year vs 30-year mortgages side by side.",
        "url": "https://toolstack.tech/tools/mortgage-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "2156", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
