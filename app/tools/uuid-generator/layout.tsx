import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator — Free UUID v4, v1, v5, ULID & NanoID",
  description: "Generate UUID v4, v1, v5, ULID and NanoID free in your browser. Bulk generate up to 100 unique IDs instantly — no signup, no server, 100% client-side.",
  keywords: [
    "uuid generator",
    "uuid v4 generator",
    "uuid v1 generator",
    "ulid generator",
    "nanoid generator",
    "uuid v5 generator",
    "generate uuid online",
    "bulk uuid generator",
    "free uuid generator",
    "unique id generator",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/uuid-generator",
  },
  openGraph: {
    title: "UUID Generator — Free UUID v4, v1, v5, ULID & NanoID",
    description: "Generate UUID v4, v1, v5, ULID and NanoID free in your browser. Bulk generate up to 100 IDs instantly — no signup.",
    url: "https://toolstack.tech/tools/uuid-generator",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator — Free UUID v4, v1, v5, ULID & NanoID",
    description: "Generate UUID v4, v1, v5, ULID and NanoID free. Bulk generate up to 100 IDs — no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"UUID Generator","item":"https://toolstack.tech/tools/uuid-generator"}]}' }} />
      {children}
    </>
  );
}
