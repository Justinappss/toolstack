import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTM Campaign Builder — Marketing Link Generator",
  description:
    "Free online UTM builder. Instantly generate perfectly formatted campaign tracking URLs with UTM parameters for Google Analytics, Meta Ads, and more.",
  keywords: [
    "utm builder",
    "utm generator",
    "campaign url builder",
    "tracking link creator",
    "utm parameters generator",
    "google analytics link builder",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/utm-builder",
  },
  openGraph: {
    title: "UTM Campaign Builder — Marketing Link Generator",
    description:
      "Free online UTM builder. Instantly generate perfectly formatted campaign tracking URLs with UTM parameters for Google Analytics, Meta Ads, and more.",
    url: "https://toolstack.tech/tools/utm-builder",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UTM Campaign Builder — Marketing Link Generator",
    description:
      "Instantly generate perfectly formatted tracking URLs with UTM parameters for your marketing campaigns.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"UTM Campaign Builder","item":"https://toolstack.tech/tools/utm-builder"}]}' }} />
      {children}
    </>
  );
}
