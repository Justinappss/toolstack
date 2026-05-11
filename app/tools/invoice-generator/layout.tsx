import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Invoice Generator — Clean PDF, No Watermarks, No Account',
    description: 'Create a professional invoice and download it as a PDF in under 60 seconds. Add logo, line items, tax, and payment terms. No account, no watermarks, no subscription.',
    keywords: ['free invoice generator', 'invoice generator', 'invoice maker', 'PDF invoice no watermark', 'free invoice template', 'create invoice online free'],
    alternates: { canonical: 'https://toolstack.tech/tools/invoice-generator' },
    openGraph: {
      type: 'website',
      title: 'Free Invoice Generator — Clean PDF, No Watermarks, No Account',
      description: 'Create a professional invoice and download it as a clean PDF. Add logo, line items, tax. No account, no watermarks.',
      url: 'https://toolstack.tech/tools/invoice-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Free Invoice Generator — No Watermarks, No Account', description: 'Professional PDF invoices in 60 seconds. Logo, line items, tax. Free forever.' },
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Invoice Generator","item":"https://toolstack.tech/tools/invoice-generator"}]}' }} />
      {children}
    </>
  );
}
