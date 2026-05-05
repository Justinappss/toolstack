import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'IP Address Lookup | Find My Public IP, Location & ISP — ToolStack',
    description: 'Find your public IP address, location, ISP, timezone, and coordinates instantly. No signup, no tracking, runs 100% in your browser.',
    keywords: ['IP address lookup', 'what is my IP', 'IP location', 'ISP lookup', 'IP geolocation', 'my public IP'],
    alternates: { canonical: 'https://toolstack.tech/tools/ip-address-lookup' },
    openGraph: {
      type: 'website',
      title: 'IP Address Lookup | Find My Public IP, Location & ISP — ToolStack',
      description: 'Find your public IP address, location, ISP, timezone, and coordinates instantly.',
      url: 'https://toolstack.tech/tools/ip-address-lookup',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'IP Address Lookup', description: 'Find your public IP address, location, ISP, timezone, and coordinates.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "IP Address Lookup",
        "description": "Find your public IP address, location, ISP, timezone, and coordinates instantly. No signup, no tracking, runs 100% in your browser.",
        "url": "https://toolstack.tech/tools/ip-address-lookup",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1567", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
