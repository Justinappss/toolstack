import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Email Signature Generator | Free HTML Email Signature — ToolStack',
    description: 'Create professional HTML email signatures with social links and branding. Copy and paste into Gmail, Outlook, and Apple Mail in seconds.',
    keywords: ['email signature generator', 'HTML email signature', 'professional email signature', 'email signature template', 'business email signature'],
    alternates: { canonical: 'https://toolstack.tech/tools/email-signature-generator' },
    openGraph: {
      type: 'website',
      title: 'Email Signature Generator | Free HTML Email Signature — ToolStack',
      description: 'Create professional HTML email signatures with social links and branding.',
      url: 'https://toolstack.tech/tools/email-signature-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Email Signature Generator', description: 'Create professional HTML email signatures with social links and branding.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Email Signature Generator",
        "description": "Create professional HTML email signatures with social links and branding. Copy and paste into Gmail, Outlook, and Apple Mail in seconds.",
        "url": "https://toolstack.tech/tools/email-signature-generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "712", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
