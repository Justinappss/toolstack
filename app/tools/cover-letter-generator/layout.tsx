import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free AI Cover Letter Generator — No Signup, No Limits | ToolStack',
    description: 'Write a tailored cover letter in seconds. Free AI cover letter generator powered by GPT-4o — 4 tone modes, no signup, unlimited uses. Just job title, company, and your background.',
    keywords: ['ai cover letter generator', 'free ai cover letter generator', 'cover letter generator free', 'cover letter ai generator', 'free cover letter generator', 'chatgpt cover letter generator', 'cover letter maker', 'ai cover letter'],
    alternates: { canonical: 'https://toolstack.tech/tools/cover-letter-generator' },
    openGraph: {
      type: 'website',
      title: 'Free AI Cover Letter Generator — No Signup, No Limits | ToolStack',
      description: 'Write a tailored cover letter in seconds. GPT-4o powered, 4 tone modes, unlimited uses, no account required.',
      url: 'https://toolstack.tech/tools/cover-letter-generator',
      siteName: 'ToolStack',
      images: [{ url: 'https://toolstack.tech/blog/thumbnail-cover-letter.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: 'Free AI Cover Letter Generator — No Signup, No Limits', description: 'GPT-4o powered, 4 tone modes, unlimited uses, no account required. Free forever.', images: ['https://toolstack.tech/blog/thumbnail-cover-letter.png'] },
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
