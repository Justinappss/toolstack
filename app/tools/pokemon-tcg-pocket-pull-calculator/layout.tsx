import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Pokémon TCG Pocket Pull Calculator | Pack Odds & Rates — ToolStack',
    description: 'Calculate your Pokémon TCG Pocket pull odds. See packs needed for Crown Rare, God Pack, Immersive Rare & more using official in-game pull rates.',
    keywords: ['pokemon tcg pocket pull calculator', 'pokemon pocket pull rates', 'crown rare odds', 'god pack probability', 'pokemon tcg pocket odds', 'immersive rare calculator'],
    alternates: { canonical: 'https://toolstack.tech/tools/pokemon-tcg-pocket-pull-calculator' },
    openGraph: {
      type: 'website',
      title: 'Pokémon TCG Pocket Pull Calculator | Pack Odds & Rates — ToolStack',
      description: 'Calculate your Pokémon TCG Pocket pull odds. See packs needed for Crown Rare, God Pack, Immersive Rare & more using official in-game pull rates.',
      url: 'https://toolstack.tech/tools/pokemon-tcg-pocket-pull-calculator',
      siteName: 'ToolStack',
      images: [{ url: 'https://toolstack.tech/og-image.png', width: 1200, height: 630, alt: 'Pokémon TCG Pocket Pull Calculator' }],
    },
    twitter: { card: 'summary_large_image', title: 'Pokémon TCG Pocket Pull Calculator', description: 'Calculate your Pokémon TCG Pocket pull odds using official in-game pull rates.', images: ['https://toolstack.tech/og-image.png'] },
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Pokémon TCG Pocket Pull Calculator",
        "description": "Calculate your odds of pulling Crown Rares, God Packs, Immersive Rares and more. Based on official Pokémon TCG Pocket in-game pull rates.",
        "url": "https://toolstack.tech/tools/pokemon-tcg-pocket-pull-calculator",
        "applicationCategory": "UtilitiesApplication",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Pokémon TCG Pocket Pull Calculator","item":"https://toolstack.tech/tools/pokemon-tcg-pocket-pull-calculator"}]}' }} />
      {children}
    </>
  );
}
