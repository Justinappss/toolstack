import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ToolStack Design Studio — AI Ad & Campaign Studio for Any Brand",
  description:
    "AI ad & campaign studio. Scan any brand website to pull its identity, colors and fonts, generate on-brand campaigns and finished, ready-to-post ads with GPT-4o, and render branded visuals with AI.",
  keywords: [
    "ai carousel builder",
    "instagram carousel generator",
    "linkedin carousel maker",
    "social media post generator",
    "brand carousel tool",
    "ai social media graphics",
    "carousel post ideas",
  ],
  alternates: { canonical: "https://toolstack.tech/tools/jdesigns-studio" },
  openGraph: {
    type: "website",
    title: "ToolStack Design Studio — AI Ad & Campaign Studio for Any Brand",
    description:
      "Scan a brand, generate on-brand campaigns and finished ads with GPT-4o, and render branded visuals with AI.",
    url: "https://toolstack.tech/tools/jdesigns-studio",
    siteName: "ToolStack",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolStack Design Studio — AI Ad & Campaign Studio",
    description: "Scan a brand → on-brand campaigns → finished ads → AI visuals.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"ToolStack Design Studio","item":"https://toolstack.tech/tools/jdesigns-studio"}]}',
        }}
      />
      {children}
    </>
  );
}
