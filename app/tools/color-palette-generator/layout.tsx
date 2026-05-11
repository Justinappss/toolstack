import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Color Palette Generator | Free Harmonious Color Scheme Tool — ToolStack',
    description: 'Generate harmonious color palettes from any base color. Get complementary, analogous, triadic, and split-complementary schemes for UI and brand design.',
    keywords: ['color palette generator', 'color scheme generator', 'harmonious colors', 'UI color palette', 'brand color palette'],
    alternates: { canonical: 'https://toolstack.tech/tools/color-palette-generator' },
    openGraph: {
      type: 'website',
      title: 'Color Palette Generator | Free Harmonious Color Scheme Tool — ToolStack',
      description: 'Generate harmonious color palettes from any base color.',
      url: 'https://toolstack.tech/tools/color-palette-generator',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Color Palette Generator', description: 'Generate harmonious color palettes from any base color.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Color Palette Generator",
        "description": "Generate harmonious color palettes from any base color. Get complementary, analogous, triadic, and split-complementary schemes for UI and brand design.",
        "url": "https://toolstack.tech/tools/color-palette-generator",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "ratingCount": "438", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Color Palette Generator","item":"https://toolstack.tech/tools/color-palette-generator"}]}' }} />
      {children}
    </>
  );
}
