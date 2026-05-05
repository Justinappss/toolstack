import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'CSS Gradient Generator | Visual Gradient Builder — ToolStack',
    description: 'Visual CSS gradient builder with live preview and ready-to-copy CSS code. Build linear, radial, and conic gradients in seconds.',
    keywords: ['CSS gradient generator', 'gradient builder', 'linear gradient CSS', 'radial gradient', 'CSS gradient code', 'conic gradient'],
    alternates: { canonical: 'https://toolstack.tech/tools/css-gradient-generator' },
    openGraph: {
      type: 'website',
      title: 'CSS Gradient Generator | Visual Gradient Builder — ToolStack',
      description: 'Visual CSS gradient builder with live preview and ready-to-copy CSS code.',
      url: 'https://toolstack.tech/tools/css-gradient-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'CSS Gradient Generator', description: 'Visual CSS gradient builder with live preview and ready-to-copy CSS code.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "CSS Gradient Generator",
        "description": "Visual CSS gradient builder with live preview and ready-to-copy CSS code. Build linear, radial, and conic gradients in seconds.",
        "url": "https://toolstack.tech/tools/css-gradient-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "567", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
