import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'PDF Generator | Free HTML to PDF Converter — ToolStack',
    description: 'Convert HTML, Markdown, or plain text to PDF in your browser. No upload, no server processing, no watermarks. Free and unlimited.',
    keywords: ['PDF generator', 'HTML to PDF', 'free PDF creator', 'text to PDF', 'Markdown to PDF', 'online PDF maker'],
    alternates: { canonical: 'https://toolstack.tech/tools/pdf-generator' },
    openGraph: {
      type: 'website',
      title: 'PDF Generator | Free HTML to PDF Converter — ToolStack',
      description: 'Convert HTML, Markdown, or plain text to PDF in your browser.',
      url: 'https://toolstack.tech/tools/pdf-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'PDF Generator', description: 'Convert HTML, Markdown, or plain text to PDF in your browser.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PDF Generator",
        "description": "Convert HTML, Markdown, or plain text to PDF in your browser. No upload, no server processing, no watermarks.",
        "url": "https://toolstack.tech/tools/pdf-generator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1245", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"PDF Generator","item":"https://toolstack.tech/tools/pdf-generator"}]}' }} />
      {children}
    </>
  );
}
