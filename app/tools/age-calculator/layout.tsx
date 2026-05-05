import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Age Calculator | Calculate Exact Age in Years, Months, Days — ToolStack',
    description: 'Calculate your exact age in years, months, and days from any date of birth. Free, instant, no signup required.',
    keywords: ['age calculator', 'how old am I', 'birthday calculator', 'exact age', 'date of birth calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/age-calculator' },
    openGraph: {
      type: 'website',
      title: 'Age Calculator | Calculate Exact Age in Years, Months, Days — ToolStack',
      description: 'Calculate your exact age in years, months, and days from any date of birth.',
      url: 'https://toolstack.tech/tools/age-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Age Calculator', description: 'Calculate your exact age in years, months, and days.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Age Calculator",
        "description": "Calculate your exact age in years, months, and days from any date of birth.",
        "url": "https://toolstack.tech/tools/age-calculator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1240", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
