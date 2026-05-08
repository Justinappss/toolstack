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
  return children;
}
