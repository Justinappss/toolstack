import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Cover Letter Generator | AI Cover Letter for Any Job — ToolStack',
    description: 'Generate tailored cover letters with AI for any job application. Paste the job description and get a professional cover letter in seconds.',
    keywords: ['cover letter generator', 'job application letter', 'AI cover letter', 'cover letter maker', 'professional cover letter'],
    alternates: { canonical: 'https://toolstack.tech/tools/cover-letter-generator' },
    openGraph: {
      type: 'website',
      title: 'Cover Letter Generator | AI Cover Letter for Any Job — ToolStack',
      description: 'Generate tailored cover letters with AI for any job application.',
      url: 'https://toolstack.tech/tools/cover-letter-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Cover Letter Generator', description: 'Generate tailored cover letters with AI for any job application.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Cover Letter Generator",
        "description": "Generate tailored cover letters with AI for any job application. Paste the job description and get a professional cover letter in seconds.",
        "url": "https://toolstack.tech/tools/cover-letter-generator",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.5", "ratingCount": "312", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Cover Letter Generator","item":"https://toolstack.tech/tools/cover-letter-generator"}]}' }} />
      {children}
    </>
  );
}
