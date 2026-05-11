import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Downloader — Free HD & 4K",
  description: "Download any YouTube video thumbnail in HD, Full HD and Max resolution instantly. Paste the video URL, preview all sizes, and save for free — no signup needed.",
  keywords: [
    "youtube thumbnail downloader",
    "download youtube thumbnail",
    "youtube thumbnail grabber",
    "save youtube thumbnail",
    "youtube video thumbnail",
    "hd youtube thumbnail",
    "youtube thumbnail 1080p",
    "youtube shorts thumbnail downloader",
    "free thumbnail downloader",
    "youtube thumbnail saver",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/youtube-thumbnail-downloader",
  },
  openGraph: {
    title: "YouTube Thumbnail Downloader — Free HD & 4K",
    description: "Download any YouTube video thumbnail in HD, Full HD and Max resolution instantly. Free, no signup.",
    url: "https://toolstack.tech/tools/youtube-thumbnail-downloader",
    siteName: "ToolStack",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail Downloader — Free HD & 4K",
    description: "Download any YouTube video thumbnail in HD, Full HD and Max resolution. Free, no signup.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"YouTube Thumbnail Downloader","item":"https://toolstack.tech/tools/youtube-thumbnail-downloader"}]}' }} />
      {children}
    </>
  );
}
