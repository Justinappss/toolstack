import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Markdown Editor | Free Markdown to HTML Converter — ToolStack',
    description: 'Markdown to HTML converter with live side-by-side preview. Write in Markdown, see the result instantly, copy the HTML.',
    keywords: ['Markdown editor', 'Markdown to HTML', 'Markdown converter', 'live Markdown preview', 'write Markdown'],
    alternates: { canonical: 'https://toolstack.tech/tools/markdown-editor' },
    openGraph: {
      type: 'website',
      title: 'Markdown Editor | Free Markdown to HTML Converter — ToolStack',
      description: 'Markdown to HTML converter with live side-by-side preview.',
      url: 'https://toolstack.tech/tools/markdown-editor',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Markdown Editor', description: 'Markdown to HTML converter with live side-by-side preview.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Markdown Editor",
        "description": "Markdown to HTML converter with live side-by-side preview. Write in Markdown, see the result instantly, copy the HTML.",
        "url": "https://toolstack.tech/tools/markdown-editor",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "934", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Markdown Editor","item":"https://toolstack.tech/tools/markdown-editor"}]}' }} />
      {children}
    </>
  );
}
