import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Base64 Encoder/Decoder | Free Online Tool — ToolStack',
    description: 'Encode and decode Base64 strings instantly in your browser. Works offline, no data sent anywhere, free forever.',
    keywords: ['Base64 encoder', 'Base64 decoder', 'encode decode Base64', 'Base64 converter', 'Base64 online'],
    alternates: { canonical: 'https://toolstack.tech/tools/base64-encoder-decoder' },
    openGraph: {
      type: 'website',
      title: 'Base64 Encoder/Decoder | Free Online Tool — ToolStack',
      description: 'Encode and decode Base64 strings instantly in your browser.',
      url: 'https://toolstack.tech/tools/base64-encoder-decoder',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings instantly in your browser.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Base64 Encoder/Decoder",
        "description": "Encode and decode Base64 strings instantly in your browser. Works offline, no data sent anywhere, free forever.",
        "url": "https://toolstack.tech/tools/base64-encoder-decoder",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "954", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Base64 Encoder/Decoder","item":"https://toolstack.tech/tools/base64-encoder-decoder"}]}' }} />
      {children}
    </>
  );
}
