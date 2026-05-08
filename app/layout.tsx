import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { SmartPasteListener } from "@/components/SmartPasteListener";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "ToolStack — Free AI & Utility Tools", template: "%s | ToolStack" },
  description: "Access 57+ premium, completely free utility tools for developers, marketers, and creators. No paywalls and no forced sign-ups. Experience the frictionless arsenal.",
  keywords: ["free online tools", "ai tools", "utility tools", "prompt generator", "word counter", "seo tools"],
  metadataBase: new URL("https://toolstack.tech"),
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "ToolStack",
    title: "ToolStack — Free AI & Utility Tools",
    description: "Access 57+ premium, completely free utility tools for developers, marketers, and creators. No paywalls and no forced sign-ups. Experience the frictionless arsenal.",
    images: [
      {
        url: "https://toolstack.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolStack Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolStack — Free AI & Utility Tools",
    description: "Access 57+ premium, completely free utility tools for developers, marketers, and creators. No paywalls and no forced sign-ups. Experience the frictionless arsenal.",
    images: ["https://toolstack.tech/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MNRHVXL2X9" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MNRHVXL2X9');`}</Script>
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2395093382559560" strategy="lazyOnload" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ToolStack",
              "url": "https://toolstack.tech",
              "logo": "https://toolstack.tech/favicon.png",
              "sameAs": [
                "https://x.com/toolstack",
                "https://www.linkedin.com/company/toolstacktech"
              ],
              "description": "57+ free online AI & utility tools for writers, marketers, and developers."
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ToolStack",
              "url": "https://toolstack.tech",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://toolstack.tech/tools?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <Navbar />
        <CommandPalette />
        <SmartPasteListener />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
