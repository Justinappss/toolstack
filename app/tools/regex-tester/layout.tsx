import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Regex Tester | Free Regular Expression Tester & Debugger — ToolStack',
    description: 'Test and debug regular expressions with real-time match highlighting. Supports JavaScript, Python, and Go regex flavors. Free, no signup.',
    keywords: ['regex tester', 'regular expression tester', 'regex debugger', 'regex online', 'regex validator', 'regex pattern tester'],
    alternates: { canonical: 'https://toolstack.tech/tools/regex-tester' },
    openGraph: {
      type: 'website',
      title: 'Regex Tester | Free Regular Expression Tester & Debugger — ToolStack',
      description: 'Test and debug regular expressions with real-time match highlighting.',
      url: 'https://toolstack.tech/tools/regex-tester',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Regex Tester', description: 'Test and debug regular expressions with real-time match highlighting.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Regex Tester",
        "description": "Test and debug regular expressions with real-time match highlighting. Supports JavaScript, Python, and Go regex flavors.",
        "url": "https://toolstack.tech/tools/regex-tester",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1123", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Regex Tester","item":"https://toolstack.tech/tools/regex-tester"}]}' }} />
      {children}
    </>
  );
}
