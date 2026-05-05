import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Salary Calculator | Free Hourly to Annual & Take-Home Pay — ToolStack',
    description: 'Convert between hourly, weekly, monthly, and annual salary. Estimate take-home pay after taxes. Compare job offers side by side.',
    keywords: ['salary calculator', 'hourly to annual salary', 'take home pay calculator', 'salary converter', 'annual salary calculator', 'pay calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/salary-calculator' },
    openGraph: {
      type: 'website',
      title: 'Salary Calculator | Free Hourly to Annual & Take-Home Pay — ToolStack',
      description: 'Convert between hourly, weekly, monthly, and annual salary.',
      url: 'https://toolstack.tech/tools/salary-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Salary Calculator', description: 'Convert between hourly, weekly, monthly, and annual salary.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Salary Calculator",
        "description": "Convert between hourly, weekly, monthly, and annual salary. Estimate take-home pay after taxes.",
        "url": "https://toolstack.tech/tools/salary-calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1456", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
