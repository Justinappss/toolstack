import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Grammar Checker | AI Grammar Checker Powered by GPT-4o — ToolStack',
    description: 'AI grammar, spelling, and punctuation checker powered by GPT-4o. Get instant corrections with explanations for every mistake.',
    keywords: ['grammar checker', 'AI grammar checker', 'spelling checker', 'GPT-4o grammar', 'grammar correction', 'English grammar checker'],
    alternates: { canonical: 'https://toolstack.tech/tools/grammar-checker' },
    openGraph: {
      type: 'website',
      title: 'Grammar Checker | AI Grammar Checker Powered by GPT-4o — ToolStack',
      description: 'AI grammar, spelling, and punctuation checker powered by GPT-4o.',
      url: 'https://toolstack.tech/tools/grammar-checker',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Grammar Checker', description: 'AI grammar, spelling, and punctuation checker powered by GPT-4o.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Grammar Checker",
        "description": "AI grammar, spelling, and punctuation checker powered by GPT-4o. Get instant corrections with explanations for every mistake.",
        "url": "https://toolstack.tech/tools/grammar-checker",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1423", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
