import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog Title Generator | AI-Powered Click-Worthy Headlines — ToolStack',
    description: 'Generate click-worthy blog titles with AI for any topic or keyword. Get SEO-optimised headlines that attract clicks and rank in search results.',
    keywords: ['blog title generator', 'SEO title generator', 'headline generator', 'catchy blog titles', 'article title generator'],
    alternates: { canonical: 'https://toolstack.tech/tools/blog-title-generator' },
    openGraph: {
      type: 'website',
      title: 'Blog Title Generator | AI-Powered Click-Worthy Headlines — ToolStack',
      description: 'Generate click-worthy blog titles with AI for any topic or keyword.',
      url: 'https://toolstack.tech/tools/blog-title-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Blog Title Generator', description: 'Generate click-worthy blog titles with AI for any topic or keyword.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Blog Title Generator",
        "description": "Generate click-worthy blog titles with AI for any topic or keyword.",
        "url": "https://toolstack.tech/tools/blog-title-generator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "ratingCount": "723", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
