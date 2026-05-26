import type { Metadata } from "next";

const BASE = "https://toolstack.tech";
const SLUG = "pokemon-tcg-pocket-pull-rates";
const VIDEO_ID = "iO7YXjG0fPk";

export const metadata: Metadata = {
    alternates: { canonical: `${BASE}/blog/${SLUG}` },
    openGraph: {
        title: "Pokémon TCG Pocket Pull Rates Explained: Crown Rare, God Pack & Every Rarity | ToolStack",
        description: "The official Pokémon TCG Pocket pull rates decoded. How many packs you need for Crown Rare, God Pack, Immersive Rare and every rarity — with a free pull probability calculator.",
        url: `${BASE}/blog/${SLUG}`,
        siteName: "ToolStack",
        type: "article",
        publishedTime: "2026-05-26T08:00:00Z",
        modifiedTime: "2026-05-26T08:00:00Z",
        images: [{ url: `${BASE}/blog/${SLUG}/hero-banner.png`, width: 1200, height: 630, alt: "Pokémon TCG Pocket Pull Rates" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pokémon TCG Pocket Pull Rates Explained: Crown Rare, God Pack & Every Rarity",
        description: "The official Pokémon TCG Pocket pull rates decoded. How many packs you need for Crown Rare, God Pack, Immersive Rare and every rarity.",
        images: [`${BASE}/blog/${SLUG}/hero-banner.png`],
    },
    other: {
        "script:ld+json": JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Pokémon TCG Pocket Pull Rates Explained — Crown Rare, God Pack & Every Rarity Odds",
            description: "Full breakdown of official Pokémon TCG Pocket pull rates — Crown Rare 0.04%, God Pack 0.05%, Immersive Rare 0.222%, and what these numbers mean for your actual pack count.",
            thumbnailUrl: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
            uploadDate: "2026-05-26T00:00:00+00:00",
            duration: "PT10M",
            contentUrl: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
        }),
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}