import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Paraphrasing Tool | Free AI Text Rewriter Powered by GPT-4o — ToolStack',
    description: 'Rewrite text in different tones and styles with GPT-4o. Paraphrase for clarity, formality, simplicity, or creativity — free, no signup.',
    keywords: ['paraphrasing tool', 'AI paraphraser', 'text rewriter', 'reword sentence', 'paraphrase online free', 'GPT-4o paraphrase'],
    alternates: { canonical: 'https://toolstack.tech/tools/paraphrasing-tool' },
    openGraph: {
      type: 'website',
      title: 'Paraphrasing Tool | Free AI Text Rewriter Powered by GPT-4o — ToolStack',
      description: 'Rewrite text in different tones and styles with GPT-4o.',
      url: 'https://toolstack.tech/tools/paraphrasing-tool',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Paraphrasing Tool', description: 'Rewrite text in different tones and styles with GPT-4o.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Paraphrasing Tool",
        "description": "Rewrite text in different tones and styles with GPT-4o. Paraphrase for clarity, formality, simplicity, or creativity.",
        "url": "https://toolstack.tech/tools/paraphrasing-tool",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "654", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
