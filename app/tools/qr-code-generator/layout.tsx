import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'QR Code Generator | Free Custom QR Codes with Logo & Colors — ToolStack',
    description: 'Generate custom QR codes with colors, logos, and shapes. Download as PNG or SVG. Free, unlimited, no watermarks, no signup.',
    keywords: ['QR code generator', 'free QR code', 'custom QR code', 'QR code with logo', 'QR code maker', 'QR code creator'],
    alternates: { canonical: 'https://toolstack.tech/tools/qr-code-generator' },
    openGraph: {
      type: 'website',
      title: 'QR Code Generator | Free Custom QR Codes with Logo & Colors — ToolStack',
      description: 'Generate custom QR codes with colors, logos, and shapes.',
      url: 'https://toolstack.tech/tools/qr-code-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'QR Code Generator', description: 'Generate custom QR codes with colors, logos, and shapes.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "QR Code Generator",
        "description": "Generate custom QR codes with colors, logos, and shapes. Download as PNG or SVG. Free, unlimited, no watermarks.",
        "url": "https://toolstack.tech/tools/qr-code-generator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3412", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"QR Code Generator","item":"https://toolstack.tech/tools/qr-code-generator"}]}' }} />
      {children}
    </>
  );
}
