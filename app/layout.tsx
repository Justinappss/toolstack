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
  title: { default: "ToolStack — 60+ Free Tools for Developers & Marketers", template: "%s | ToolStack" },
  description: "60+ completely free tools for developers, marketers & creators. No paywall, no signup, no limits. JSON formatter, password generator, UTM builder & more.",
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
    title: "ToolStack — 60+ Free Tools for Developers & Marketers",
    description: "60+ completely free tools for developers, marketers & creators. No paywall, no signup, no limits. JSON formatter, password generator, UTM builder & more.",
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
    title: "ToolStack — 60+ Free Tools for Developers & Marketers",
    description: "60+ completely free tools for developers, marketers & creators. No paywall, no signup, no limits. JSON formatter, password generator, UTM builder & more.",
    images: ["https://toolstack.tech/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="fo-verify" content="495a7eb7-eb12-4f76-b34f-83f0579e9492" />
        <meta name="impact-site-verification" {...({ value: "2d586c3c-7af3-44d6-b4ac-a2b803df18fe" } as any)} />
        <meta name="google-adsense-account" content="ca-pub-9041474852138049" />
        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MNRHVXL2X9" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MNRHVXL2X9');`}</Script>
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');`}</Script>
        )}
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9041474852138049" strategy="lazyOnload" crossOrigin="anonymous" />
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
              "description": "60+ free online AI & utility tools for writers, marketers, and developers."
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
