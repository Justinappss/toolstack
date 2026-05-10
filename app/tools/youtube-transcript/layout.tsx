import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "YouTube Transcript Extractor — Free, No Login, Markdown Output",
    description: "Extract any YouTube video transcript instantly. Download as clean Markdown with timestamps. No login, no signup, no limits. Works on any public YouTube video.",
    keywords: ["youtube transcript", "youtube transcript extractor", "extract youtube transcript", "youtube to text", "youtube transcript download", "youtube transcript markdown"],
    alternates: { canonical: "https://toolstack.tech/tools/youtube-transcript" },
    openGraph: {
      type: "website",
      title: "YouTube Transcript Extractor — Free, No Login, Markdown Output",
      description: "Extract any YouTube video transcript instantly. Download as clean Markdown with timestamps. No login, no signup, no limits.",
      url: "https://toolstack.tech/tools/youtube-transcript",
      siteName: "ToolStack",
    },
    twitter: {
      card: "summary_large_image",
      title: "YouTube Transcript Extractor — Free, No Login",
      description: "Paste any YouTube URL and get the full transcript as clean Markdown. Timestamps on/off. Free forever.",
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"YouTube Transcript Extractor","item":"https://toolstack.tech/tools/youtube-transcript"}]}' }} />
      {children}
    </>
  );
}
