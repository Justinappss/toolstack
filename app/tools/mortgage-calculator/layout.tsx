import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'House Hack & Mortgage ROI Calculator | Free Investment ROI Tool — ToolStack',
    description: 'Calculate ROI for house hacking strategies including multi-unit, cash-out refinance, and BRRRR methods. Complete mortgage analysis in seconds.',
    keywords: ['house hack ROI calculator', 'mortgage calculator', 'BRRRR calculator', 'real estate investment', 'house hacking calculator', 'rental property ROI'],
    alternates: { canonical: 'https://toolstack.tech/tools/mortgage-calculator' },
    openGraph: {
      type: 'website',
      title: 'House Hack & Mortgage ROI Calculator | Real Estate Investment — ToolStack',
      description: 'Calculate ROI for house hacking strategies including multi-unit, cash-out refinance, and BRRRR methods.',
      url: 'https://toolstack.tech/tools/mortgage-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'House Hack & Mortgage ROI Calculator', description: 'Calculate ROI for house hacking strategies including multi-unit and BRRRR.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "House Hack & Mortgage ROI Calculator",
        "description": "Calculate ROI for house hacking strategies including multi-unit, cash-out refinance, and BRRRR methods. Complete mortgage analysis.",
        "url": "https://toolstack.tech/tools/mortgage-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "507", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
