import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Panini Sticker Calculator | World Cup & Euro Album Cost Estimator — ToolStack',
    description: 'Calculate how many packs you need to complete a Panini sticker album. Estimate total cost with swap rates, trading, and probability math.',
    keywords: ['Panini sticker calculator', 'World Cup sticker album cost', 'Panini album calculator', 'sticker collection calculator', 'how many packs to complete album'],
    alternates: { canonical: 'https://toolstack.tech/tools/panini-sticker-calculator' },
    openGraph: {
      type: 'website',
      title: 'Panini Sticker Calculator | World Cup & Euro Album Cost Estimator — ToolStack',
      description: 'Calculate how many packs you need to complete a Panini sticker album.',
      url: 'https://toolstack.tech/tools/panini-sticker-calculator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Panini Sticker Calculator', description: 'Calculate how many packs to complete a Panini sticker album.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Panini Sticker Calculator",
        "description": "Calculate how many packs you need to complete a Panini sticker album. Estimate total cost with swap rates, trading, and probability math.",
        "url": "https://toolstack.tech/tools/panini-sticker-calculator",
        "applicationCategory": "EntertainmentApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "568", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
