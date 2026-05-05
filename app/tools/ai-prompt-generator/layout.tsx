import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AI Prompt Generator | Optimised Prompts for ChatGPT & Claude — ToolStack',
    description: 'Generate optimised AI prompts for ChatGPT, Claude, and other LLMs. Get better results from AI with structured, well-crafted prompt templates.',
    keywords: ['AI prompt generator', 'ChatGPT prompts', 'Claude prompts', 'LLM prompts', 'AI writing prompts'],
    alternates: { canonical: 'https://toolstack.tech/tools/ai-prompt-generator' },
    openGraph: {
      type: 'website',
      title: 'AI Prompt Generator | Optimised Prompts for ChatGPT & Claude — ToolStack',
      description: 'Generate optimised AI prompts for ChatGPT, Claude, and other LLMs.',
      url: 'https://toolstack.tech/tools/ai-prompt-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'AI Prompt Generator', description: 'Generate optimised AI prompts for ChatGPT, Claude, and other LLMs.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "AI Prompt Generator",
        "description": "Generate optimised AI prompts for ChatGPT, Claude, and other LLMs.",
        "url": "https://toolstack.tech/tools/ai-prompt-generator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "876", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
