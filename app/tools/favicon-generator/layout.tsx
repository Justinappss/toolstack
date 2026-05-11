import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Favicon Generator | Create Text & Emoji Favicons Instantly — ToolStack',
    description: 'Create text and emoji favicons instantly with custom colors and fonts. Generate ICO, PNG, and SVG formats ready to drop into your website head.',
    keywords: ['favicon generator', 'emoji favicon', 'text favicon', 'favicon creator', 'favicon maker', 'favicon.ico'],
    alternates: { canonical: 'https://toolstack.tech/tools/favicon-generator' },
    openGraph: {
      type: 'website',
      title: 'Favicon Generator | Create Text & Emoji Favicons Instantly — ToolStack',
      description: 'Create text and emoji favicons instantly with custom colors and fonts.',
      url: 'https://toolstack.tech/tools/favicon-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Favicon Generator', description: 'Create text and emoji favicons instantly with custom colors and fonts.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Favicon Generator",
        "description": "Create text and emoji favicons instantly with custom colors and fonts. Generate ICO, PNG, and SVG formats ready to drop into your website head.",
        "url": "https://toolstack.tech/tools/favicon-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "623", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Favicon Generator","item":"https://toolstack.tech/tools/favicon-generator"}]}' }} />
      {children}
    </>
  );
}
