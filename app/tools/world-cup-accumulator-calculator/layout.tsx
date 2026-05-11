import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "World Cup 2026 Accumulator Calculator — Free Bet Builder",
    description: "Free World Cup 2026 accumulator calculator. Enter 2–8 selections with decimal, fractional or American odds and see combined return and profit instantly.",
    keywords: ["world cup 2026 accumulator calculator", "world cup bet calculator", "football accumulator calculator", "world cup acca calculator", "world cup 2026 betting calculator", "accumulator return calculator", "football bet builder free"],
    alternates: { canonical: "https://toolstack.tech/tools/world-cup-accumulator-calculator" },
    openGraph: {
        title: "World Cup 2026 Accumulator Calculator — Free Bet Builder",
        description: "Build your World Cup 2026 accumulator in seconds. Mix decimal, fractional or American odds across 2–8 selections. See your combined odds, total return and implied probability. Free, instant, no signup.",
        url: "https://toolstack.tech/tools/world-cup-accumulator-calculator",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "World Cup 2026 Accumulator Calculator",
        description: "Free — build your World Cup acca in seconds. Decimal, fractional or American odds, 2–8 selections, instant return calculation.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"World Cup 2026 Accumulator Calculator","item":"https://toolstack.tech/tools/world-cup-accumulator-calculator"}]}' }} />
      {children}
    </>
  );
}
