import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Grading Company Comparison | PSA vs BGS vs SGC vs CGC — ToolStack',
    description: 'Compare PSA vs BGS vs SGC vs CGC on fees, turnaround times, and resale value. Find the most profitable grading company for your cards.',
    keywords: ['grading company comparison', 'PSA vs BGS', 'card grading comparison', 'grading company fees', 'PSA BGS SGC CGC comparison'],
    alternates: { canonical: 'https://toolstack.tech/tools/grading-company-comparison' },
    openGraph: {
      type: 'website',
      title: 'Grading Company Comparison | PSA vs BGS vs SGC vs CGC — ToolStack',
      description: 'Compare PSA vs BGS vs SGC vs CGC on fees, turnaround times, and resale value.',
      url: 'https://toolstack.tech/tools/grading-company-comparison',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Grading Company Comparison', description: 'Compare PSA vs BGS vs SGC vs CGC on fees, turnaround times, and resale value.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Grading Company Comparison",
        "description": "Compare PSA vs BGS vs SGC vs CGC on fees, turnaround times, and resale value. Find the most profitable grading company for your cards.",
        "url": "https://toolstack.tech/tools/grading-company-comparison",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "534", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
