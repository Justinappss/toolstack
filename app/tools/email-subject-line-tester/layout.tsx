import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Email Subject Line Tester | Free Subject Line Score Tool — ToolStack',
    description: 'Test and score email subject lines for open rate optimisation. Get actionable feedback on subject line length, power words, and spam triggers.',
    keywords: ['email subject line tester', 'subject line optimizer', 'email open rate', 'subject line score', 'spam word checker'],
    alternates: { canonical: 'https://toolstack.tech/tools/email-subject-line-tester' },
    openGraph: {
      type: 'website',
      title: 'Email Subject Line Tester | Free Subject Line Score Tool — ToolStack',
      description: 'Test and score email subject lines for open rate optimisation.',
      url: 'https://toolstack.tech/tools/email-subject-line-tester',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Email Subject Line Tester', description: 'Test and score email subject lines for open rate optimisation.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Email Subject Line Tester",
        "description": "Test and score email subject lines for open rate optimisation. Get actionable feedback on subject line length, power words, and spam triggers.",
        "url": "https://toolstack.tech/tools/email-subject-line-tester",
        "applicationCategory": "MarketingApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "ratingCount": "389", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
