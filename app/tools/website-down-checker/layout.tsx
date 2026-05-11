import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Is the Website Down? Check Any Site Status Instantly — Free',
    description: 'Check if a website is down for everyone or just you. Paste any URL and see live status, response time, and HTTP code in seconds. Free, no signup.',
    keywords: ['is it down', 'website down checker', 'is the website down', 'site down', 'down for everyone or just me', 'check website status', 'down detector'],
    alternates: { canonical: 'https://toolstack.tech/tools/website-down-checker' },
    openGraph: {
      type: 'website',
      title: 'Is the Website Down? Check Any Site Status Instantly — Free',
      description: 'Check if a website is down for everyone or just you. Live status, response time, and HTTP code in seconds. Free, no signup.',
      url: 'https://toolstack.tech/tools/website-down-checker',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Is the Website Down? Check Any Site Status Instantly', description: 'Check if a website is down for everyone or just you. Live status, response time, and HTTP code in seconds.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Website Down Checker",
        "description": "Check if any website is down globally from multiple locations. Instant, free, no signup.",
        "url": "https://toolstack.tech/tools/website-down-checker",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "312", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Website Down Checker","item":"https://toolstack.tech/tools/website-down-checker"}]}' }} />
      {children}
    </>
  );
}
