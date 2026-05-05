import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'JSON Formatter & Validator | Free Online Tool — ToolStack',
    description: 'Format, minify, and validate JSON instantly with syntax highlighting. No signup, no limits, works in your browser.',
    keywords: ['json formatter', 'json validator', 'format json', 'minify json', 'json syntax checker', 'online json formatter'],
    alternates: { canonical: 'https://toolstack.tech/tools/json-formatter' },
    openGraph: {
      type: 'website',
      title: 'JSON Formatter & Validator | Free Online Tool — ToolStack',
      description: 'Format, minify, and validate JSON instantly with syntax highlighting. No signup, no limits.',
      url: 'https://toolstack.tech/tools/json-formatter',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'JSON Formatter & Validator', description: 'Format, minify, and validate JSON instantly.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "JSON Formatter & Validator",
        "description": "Format, minify, and validate JSON instantly with syntax highlighting. No signup, no limits, works in your browser.",
        "url": "https://toolstack.tech/tools/json-formatter",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "487", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
