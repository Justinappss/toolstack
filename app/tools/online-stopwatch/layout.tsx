import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Online Stopwatch | Free Timer with Lap Times & Keyboard Shortcuts — ToolStack',
    description: 'Free online stopwatch with lap times, countdown timer, and keyboard shortcuts. Works in any browser, no download required.',
    keywords: ['online stopwatch', 'stopwatch timer', 'lap timer', 'countdown timer', 'online timer'],
    alternates: { canonical: 'https://toolstack.tech/tools/online-stopwatch' },
    openGraph: {
      type: 'website',
      title: 'Online Stopwatch | Free Timer with Lap Times & Keyboard Shortcuts — ToolStack',
      description: 'Free online stopwatch with lap times, countdown timer, and keyboard shortcuts.',
      url: 'https://toolstack.tech/tools/online-stopwatch',
      siteName: 'ToolStack',
    },
    twitter: { card: 'summary_large_image', title: 'Online Stopwatch', description: 'Free online stopwatch with lap times, countdown timer, and keyboard shortcuts.' },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Online Stopwatch",
        "description": "Free online stopwatch with lap times, countdown timer, and keyboard shortcuts. Works in any browser, no download required.",
        "url": "https://toolstack.tech/tools/online-stopwatch",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "3421", "bestRating": "5", "worstRating": "1" }
      }),
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Online Stopwatch","item":"https://toolstack.tech/tools/online-stopwatch"}]}' }} />
      {children}
    </>
  );
}
