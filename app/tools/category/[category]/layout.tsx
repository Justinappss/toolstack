import { Metadata } from "next";
import { CATEGORY_MAP } from "../../tool-data";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  AI: "Free AI tools for generating prompts, writing, and automation. No signup. Works with ChatGPT, Claude, and Gemini.",
  Writing: "Free writing tools for grammar, paraphrasing, summarising, word counts, and more. No signup, instant results.",
  SEO: "Free SEO tools for meta descriptions, YouTube tags, and search snippet optimisation. Boost your rankings instantly.",
  Marketing: "Free marketing tools for email subject lines, hashtags, UTM links, and campaign tracking. No signup required.",
  Social: "Free social media tools including hashtag generators and content planners. Optimised for Instagram, TikTok, and LinkedIn.",
  Security: "Free security tools including a password generator and colour contrast checker. Runs 100% in your browser.",
  Utility: "Free utility tools including QR code generator, case converter, Lorem Ipsum, age calculator, and more.",
  Finance: "Free finance calculators for VAT, invoices, mortgages, salary, tips, and compound interest. Multi-currency support.",
  Dev: "Free developer tools for JSON formatting, JWT decoding, regex testing, SQL formatting, UUID generation, and more.",
  Business: "Free business tools including a business name generator powered by GPT-4o. No signup, instant results.",
  Math: "Free maths calculators including percentage finder, increase/decrease, and percentage change. Instant results.",
  Design: "Free design tools including an AI colour palette generator and WCAG contrast checker. Hex codes and CSS variables.",
  Domain: "Free domain and network tools — check if a site is down, look up IPs, verify SSL certificates, and query WHOIS.",
  Video: "Free video tools — download YouTube videos and thumbnails in high quality. No watermarks, no signup.",
  Collectibles: "Free trading card tools — grade profit calculators, eBay fee calculators, Whatnot fees, and pack break EV.",
  Sports: "Free sports tools — World Cup 2026 accumulator calculator and team finder. Instant results, no signup.",
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryParam = category.toLowerCase();
  const activeCategory = CATEGORY_MAP[categoryParam] || "Professional";
  const description = CATEGORY_DESCRIPTIONS[activeCategory] || `A collection of free, high-performance ${activeCategory} tools. No signup, no ads, instant results.`;

  return {
    title: `Free ${activeCategory} Tools | ToolStack`,
    description,
    alternates: {
      canonical: `https://toolstack.tech/tools/category/${categoryParam}`,
    },
    openGraph: {
      title: `Free ${activeCategory} Tools | ToolStack`,
      description,
      url: `https://toolstack.tech/tools/category/${categoryParam}`,
      siteName: "ToolStack",
      type: "website",
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"}]}' }} />
      {children}
    </>
  );
}
