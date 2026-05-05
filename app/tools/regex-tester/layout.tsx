import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Regex Tester & Debugger | Free Online Tool — ToolStack',
    description: 'Test and debug regular expressions in real-time with syntax highlighting, match highlighting, and pattern explanations. Free, no signup.',
    keywords: ['regex tester', 'regular expression tester', 'regex debugger', 'online regex', 'regex pattern validator', 'regex match', 'regex cheatsheet'],
    alternates: { canonical: 'https://toolstack.tech/tools/regex-tester' },
    openGraph: {
      type: 'website',
      title: 'Regex Tester & Debugger | Free Online Tool — ToolStack',
      description: 'Test and debug regular expressions in real-time with syntax highlighting, match highlighting, and pattern explanations.',
      url: 'https://toolstack.tech/tools/regex-tester',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Regex Tester & Debugger', description: 'Test and debug regular expressions in real-time.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Regex Tester & Debugger",
        "description": "Test and debug regular expressions in real-time with syntax highlighting, match highlighting, and pattern explanations.",
        "url": "https://toolstack.tech/tools/regex-tester",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "440", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
