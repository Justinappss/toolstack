import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Paraphrasing Tool — Rewrite Text in 6 Modes with GPT-4o',
    description: 'Rewrite any text in Standard, Fluency, Formal, Academic, Creative, or Shorten mode — powered by GPT-4o. Paste and paraphrase instantly. Free, no signup, no limits.',
    keywords: ['paraphrasing tool', 'free paraphrasing tool', 'AI paraphraser', 'rewrite text online', 'paraphrase online free', 'text rewriter GPT-4o'],
    alternates: { canonical: 'https://toolstack.tech/tools/paraphrasing-tool' },
    openGraph: {
      type: 'website',
      title: 'Free Paraphrasing Tool — Rewrite Text in 6 Modes with GPT-4o',
      description: 'Rewrite in Standard, Fluency, Formal, Academic, Creative, or Shorten mode. Powered by GPT-4o. Free, no signup.',
      url: 'https://toolstack.tech/tools/paraphrasing-tool',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Free Paraphrasing Tool — 6 Modes, GPT-4o', description: 'Standard, Fluency, Formal, Academic, Creative, Shorten. Rewrite any text instantly. Free.' },
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Paraphrasing Tool","item":"https://toolstack.tech/tools/paraphrasing-tool"}]}' }} />
      {children}
    </>
  );
}
