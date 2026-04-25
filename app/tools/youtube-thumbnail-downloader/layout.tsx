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
  return <>{children}</>;
}
