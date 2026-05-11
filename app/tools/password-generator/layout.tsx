import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Password Generator | Free Strong Random Password Creator — ToolStack',
    description: 'Generate strong, random passwords with customizable length, symbols, and character sets. Runs 100% in your browser — nothing is sent to any server.',
    keywords: ['password generator', 'random password generator', 'strong password generator', 'secure password creator', 'password maker'],
    alternates: { canonical: 'https://toolstack.tech/tools/password-generator' },
    openGraph: {
      type: 'website',
      title: 'Password Generator | Free Strong Random Password Creator — ToolStack',
      description: 'Generate strong, random passwords with customizable length and character sets.',
      url: 'https://toolstack.tech/tools/password-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Password Generator', description: 'Generate strong, random passwords with customizable length and character sets.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Password Generator",
        "description": "Generate strong, random passwords with customizable length, symbols, and character sets. Runs 100% in your browser.",
        "url": "https://toolstack.tech/tools/password-generator",
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1892", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Password Generator","item":"https://toolstack.tech/tools/password-generator"}]}' }} />
      {children}
    </>
  );
}
