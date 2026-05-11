import type { Metadata } from "next";

export function generateStaticParams() {
  return [
    { dialect: [] },
    { dialect: ["postgresql"] },
    { dialect: ["mysql"] },
    { dialect: ["sqlite"] },
    { dialect: ["tsql"] },
  ];
}

const formatNames: Record<string, string> = {
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  sqlite: "SQLite",
  tsql: "T-SQL",
};

export function generateMetadata({ params }: { params: { dialect?: string[] } }): Metadata {
  const dialectArg = params.dialect?.[0] || "";
  const specificName = formatNames[dialectArg] || "";
  
  const titleName = specificName ? `${specificName} Formatter` : "SQL Formatter";
  const seoUrl = `https://toolstack.tech/tools/sql-formatter${dialectArg ? `/${dialectArg}` : ""}`;

  return {
    title: `${titleName} — Beautify & Format SQL Queries Online | ToolStack`,
    description: `Free online ${titleName}. Instantly beautify raw, messy SQL queries into readable, perfectly indented syntax. Runs securely browser-side.`,
    keywords: [
      "sql formatter",
      "sql beautifier",
      "format sql query",
      "online sql formatter",
      "beautify sql code",
      `${specificName.toLowerCase()} formatter`,
    ],
    alternates: {
      canonical: seoUrl,
    },
    openGraph: {
      title: `${titleName} — Beautify & Format SQL Queries Online | ToolStack`,
      description: `Instantly beautify raw, messy SQL queries into readable, perfectly indented syntax. Runs securely in your browser.`,
      url: seoUrl,
      siteName: "ToolStack",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleName} — Beautify & Format SQL Queries Online | ToolStack`,
      description: `Instantly beautify raw, messy SQL queries into readable, perfectly indented syntax. Runs securely in your browser.`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"SQL Formatter","item":"https://toolstack.tech/tools/sql-formatter"}]}' }} />
      {children}
    </>
  );
}
