import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tip Calculator — Free Bill Splitter & Tipping Guide",
  description: "Calculate tips instantly and split bills with any group size. Includes tipping customs for 20+ countries, service presets, and bill rounding. Free, no signup.",
  keywords: [
    "tip calculator",
    "tip calculator with bill splitter",
    "how much to tip",
    "restaurant tip calculator",
    "bill split calculator",
    "tipping guide by country",
    "gratuity calculator",
    "tip percentage calculator",
    "split the bill calculator",
    "how much should I tip",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/tip-calculator",
  },
  openGraph: {
    title: "Tip Calculator — Free Bill Splitter & Tipping Guide",
    description: "Calculate tips instantly and split bills with any group size. Tipping customs for 20+ countries. Free, no signup.",
    url: "https://toolstack.tech/tools/tip-calculator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tip Calculator — Free Bill Splitter & Tipping Guide",
    description: "Calculate tips, split bills and see tipping customs for 20+ countries. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"Tip Calculator","item":"https://toolstack.tech/tools/tip-calculator"}]}' }} />
      {children}
    </>
  );
}
