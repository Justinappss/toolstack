import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "WHOIS Domain Lookup — Check Domain Registration, Expiry & Owner",
    description: "Look up any domain's registration date, expiry date, registrar, nameservers and status instantly. Free WHOIS checker — no signup, no limits.",
    keywords: [
        "whois lookup",
        "domain lookup",
        "domain registration checker",
        "who owns this domain",
        "domain expiry checker",
        "domain registrar lookup",
        "whois search",
        "domain info lookup",
        "check domain owner",
        "domain availability checker",
    ],
    alternates: { canonical: "https://toolstack.tech/tools/whois-lookup" },
    openGraph: {
        title: "WHOIS Domain Lookup — Check Domain Registration, Expiry & Owner",
        description: "Look up any domain's registration date, expiry, registrar and nameservers instantly. Free, no signup.",
        url: "https://toolstack.tech/tools/whois-lookup",
        siteName: "ToolStack",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "WHOIS Domain Lookup — Check Domain Registration, Expiry & Owner",
        description: "Free WHOIS lookup tool. See who owns any domain, when it expires, and which registrar it's with.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"WHOIS Domain Lookup","item":"https://toolstack.tech/tools/whois-lookup"}]}' }} />
      {children}
    </>
  );
}
