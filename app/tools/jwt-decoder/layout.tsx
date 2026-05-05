import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'JWT Decoder | Free JSON Web Token Decoder — ToolStack',
    description: 'Decode any JSON Web Token instantly to view header, payload, and signature. Verify signatures and inspect token claims without sending data to any server.',
    keywords: ['JWT decoder', 'JWT parser', 'decode JWT', 'JWT viewer', 'JSON Web Token decoder', 'JWT inspection'],
    alternates: { canonical: 'https://toolstack.tech/tools/jwt-decoder' },
    openGraph: {
      type: 'website',
      title: 'JWT Decoder | Free JSON Web Token Decoder — ToolStack',
      description: 'Decode any JSON Web Token instantly to view header, payload, and signature.',
      url: 'https://toolstack.tech/tools/jwt-decoder',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'JWT Decoder', description: 'Decode any JSON Web Token instantly to view header, payload, and signature.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "JWT Decoder",
        "description": "Decode any JSON Web Token instantly to view header, payload, and signature. Verify signatures and inspect token claims without sending data to any server.",
        "url": "https://toolstack.tech/tools/jwt-decoder",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "876", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
