import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Lorem Ipsum Generator | Free Placeholder Text Generator — ToolStack',
    description: 'Generate placeholder text in paragraphs, sentences, words, or HTML format. Lorem ipsum, random words, or custom-length content for any design project.',
    keywords: ['Lorem Ipsum generator', 'placeholder text generator', 'lorem ipsum', 'dummy text generator', 'random text generator'],
    alternates: { canonical: 'https://toolstack.tech/tools/lorem-ipsum-generator' },
    openGraph: {
      type: 'website',
      title: 'Lorem Ipsum Generator | Free Placeholder Text Generator — ToolStack',
      description: 'Generate placeholder text in paragraphs, sentences, words, or HTML format.',
      url: 'https://toolstack.tech/tools/lorem-ipsum-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Lorem Ipsum Generator', description: 'Generate placeholder text in paragraphs, sentences, words, or HTML format.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Lorem Ipsum Generator",
        "description": "Generate placeholder text in paragraphs, sentences, words, or HTML format. Lorem ipsum, random words, or custom-length content for any design project.",
        "url": "https://toolstack.tech/tools/lorem-ipsum-generator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1678", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Lorem Ipsum Generator","item":"https://toolstack.tech/tools/lorem-ipsum-generator"}]}' }} />
      {children}
    </>
  );
}
