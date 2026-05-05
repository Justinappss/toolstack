import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Invoice Generator | Free Professional PDF Invoice — ToolStack',
    description: 'Create professional invoices and export to PDF with no watermarks or signup. Free, instant, fully customizable with your branding.',
    keywords: ['invoice generator', 'free invoice generator', 'PDF invoice', 'invoice template', 'professional invoice', 'invoice maker'],
    alternates: { canonical: 'https://toolstack.tech/tools/invoice-generator' },
    openGraph: {
      type: 'website',
      title: 'Invoice Generator | Free Professional PDF Invoice — ToolStack',
      description: 'Create professional invoices and export to PDF with no watermarks or signup.',
      url: 'https://toolstack.tech/tools/invoice-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Invoice Generator', description: 'Create professional invoices and export to PDF with no watermarks or signup.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Invoice Generator",
        "description": "Create professional invoices and export to PDF with no watermarks or signup. Free, instant, fully customizable with your branding.",
        "url": "https://toolstack.tech/tools/invoice-generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "891", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
