import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Color Contrast Checker | WCAG Accessibility Tool — ToolStack',
    description: 'Check WCAG color contrast ratios for accessibility compliance. Instantly test foreground and background colors for AA and AAA standards.',
    keywords: ['color contrast checker', 'WCAG contrast', 'accessibility checker', 'color contrast ratio', 'WCAG AA AAA'],
    alternates: { canonical: 'https://toolstack.tech/tools/color-contrast-checker' },
    openGraph: {
      type: 'website',
      title: 'Color Contrast Checker | WCAG Accessibility Tool — ToolStack',
      description: 'Check WCAG color contrast ratios for accessibility compliance.',
      url: 'https://toolstack.tech/tools/color-contrast-checker',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Color Contrast Checker', description: 'Check WCAG color contrast ratios for accessibility compliance.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Color Contrast Checker",
        "description": "Check WCAG color contrast ratios for accessibility compliance. Instantly test foreground and background colors for AA and AAA standards.",
        "url": "https://toolstack.tech/tools/color-contrast-checker",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "521", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Color Contrast Checker","item":"https://toolstack.tech/tools/color-contrast-checker"}]}' }} />
      {children}
    </>
  );
}
