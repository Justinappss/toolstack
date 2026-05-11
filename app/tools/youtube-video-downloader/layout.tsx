import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free YouTube Video Downloader — MP4, No Watermarks",
  description: "Download YouTube videos and Shorts in high quality MP4 format. No ads, no watermarks, no software required. Paste the URL and download instantly — free.",
  keywords: [
    "youtube video downloader",
    "download youtube video",
    "youtube downloader free",
    "youtube to mp4",
    "download youtube shorts",
    "youtube video downloader online",
    "free youtube downloader",
    "youtube mp4 downloader",
    "youtube downloader no watermark",
    "save youtube video",
  ],
  alternates: {
    canonical: "https://toolstack.tech/tools/youtube-video-downloader",
  },
  openGraph: {
    title: "Free YouTube Video Downloader — MP4, No Watermarks",
    description: "Download YouTube videos and Shorts in high quality MP4. No ads, no watermarks, no signup. Instant results.",
    url: "https://toolstack.tech/tools/youtube-video-downloader",
    siteName: "ToolStack",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://toolstack.tech"},{"@type":"ListItem","position":2,"name":"Tools","item":"https://toolstack.tech/tools"},{"@type":"ListItem","position":3,"name":"YouTube Video Downloader","item":"https://toolstack.tech/tools/youtube-video-downloader"}]}' }} />
      {children}
    </>
  );
}
