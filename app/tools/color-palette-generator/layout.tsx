import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Color Palette Generator — Free, Instant, No Signup",
    description: "Generate beautiful, professional color palettes from any description with AI. Get 5 harmonious colors with hex codes, CSS variables, Tailwind config, and usage guidance. Free, no signup.",
    keywords: [
        "color palette generator",
        "AI color palette",
        "color scheme generator",
        "color palette from description",
        "brand color palette generator",
        "free color palette tool",
        "CSS color palette",
        "Tailwind color palette",
        "color combination generator",
        "color scheme creator",
    ],
    alternates: {
        canonical: "https://toolstack.tech/tools/color-palette-generator",
    },
    openGraph: {
        title: "AI Color Palette Generator — Free, Instant, No Signup",
        description: "Describe your brand or project and get a perfect 5-color palette with hex codes, CSS variables and Tailwind config instantly.",
        url: "https://toolstack.tech/tools/color-palette-generator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Color Palette Generator — Free",
        description: "Generate professional color palettes from any description. CSS variables, Tailwind config, hex codes — all free.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
