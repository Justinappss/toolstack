import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pack Break EV Calculator — Expected Value for Any Box",
    description: "Pack break EV calculator for Pokémon, sports cards and football cards. See EV per pack, net profit after eBay/Whatnot fees, and bear/base/bull scenarios. Free.",
    keywords: ["pack break ev calculator", "pack break expected value", "pokemon box ev calculator", "sports card box expected value", "trading card break ev", "hobby box ev calculator", "is this box worth it calculator"],
    alternates: { canonical: "https://toolstack.tech/tools/pack-break-ev-calculator" },
    openGraph: {
        title: "Pack Break EV Calculator — Is This Box Worth Opening?",
        description: "Calculate expected value for any trading card box break. Pokémon, sports cards, football cards. See your EV per pack, break-even point and profit scenarios. Free, instant.",
        url: "https://toolstack.tech/tools/pack-break-ev-calculator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pack Break EV Calculator",
        description: "Free tool — calculate expected value for any trading card box break. Pokémon, sports cards, football cards.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
