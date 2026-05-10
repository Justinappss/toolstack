import type { Metadata } from "next";
import { ToolSchemaInjector } from "@/components/ui/ToolSchemaInjector";
import ShaderBanner from "@/components/ui/ShaderBanner";

export const metadata: Metadata = {
    title: "All Free Tools — Writers, Marketers & Developers",
    description: "Browse 60+ free online tools for writers, marketers and developers. AI prompts, SEO, word counter, JSON formatter, password generator and more. No signup required.",
    alternates: { canonical: "https://toolstack.tech/tools" },
    openGraph: {
        title: "All Free Tools",
        description: "60+ free tools for writers, marketers and developers. No signup. Instant results.",
        url: "https://toolstack.tech/tools",
        siteName: "ToolStack",
        type: "website",
    },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToolSchemaInjector />
            <ShaderBanner />
            <div style={{ position: "relative", zIndex: 1 }}>
                {children}
            </div>
        </>
    );
}
