import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Code Diff Checker | Side-by-Side Code Comparison Tool — ToolStack',
    description: 'Compare two code blocks side-by-side and see line-by-line differences. Perfect for code reviews, debugging, and tracking changes between versions.',
    keywords: ['code diff checker', 'code comparison', 'diff tool', 'side-by-side code compare', 'code review tool'],
    alternates: { canonical: 'https://toolstack.tech/tools/code-diff-checker' },
    openGraph: {
      type: 'website',
      title: 'Code Diff Checker | Side-by-Side Code Comparison Tool — ToolStack',
      description: 'Compare two code blocks side-by-side and see line-by-line differences.',
      url: 'https://toolstack.tech/tools/code-diff-checker',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Code Diff Checker', description: 'Compare two code blocks side-by-side and see line-by-line differences.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Code Diff Checker",
        "description": "Compare two code blocks side-by-side and see line-by-line differences. Perfect for code reviews, debugging, and tracking changes between versions.",
        "url": "https://toolstack.tech/tools/code-diff-checker",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "643", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
